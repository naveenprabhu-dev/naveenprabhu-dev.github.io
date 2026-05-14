'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 2200;
const NEON_BLUE = new THREE.Color('#1faaff');
const NEON_MINT = new THREE.Color('#c4ebc8');

// Pure deterministic hash → [0,1). Used instead of Math.random so init can
// run during render without violating react-hooks/purity (eslint-config-next 16).
function hash01(seed: number): number {
  let s = seed | 0;
  s = (s ^ 61) ^ (s >>> 16);
  s = s + (s << 3);
  s = s ^ (s >>> 4);
  s = Math.imul(s, 0x27d4eb2d);
  s = s ^ (s >>> 15);
  return (s >>> 0) / 4294967296;
}

function buildCloud(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.cbrt(hash01(i * 3 + 11)) * 9;
    const theta = hash01(i * 3 + 12) * Math.PI * 2;
    const phi = Math.acos(2 * hash01(i * 3 + 13) - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function buildLattice(count: number): Float32Array {
  const side = Math.ceil(Math.cbrt(count));
  const arr = new Float32Array(count * 3);
  const step = 14 / Math.max(1, side - 1);
  for (let i = 0; i < count; i++) {
    const x = i % side;
    const y = Math.floor(i / side) % side;
    const z = Math.floor(i / (side * side));
    arr[i * 3] = x * step - 7;
    arr[i * 3 + 1] = y * step - 7;
    arr[i * 3 + 2] = z * step - 7;
  }
  return arr;
}

function buildChessboard(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  const board = 8;
  const cells = board * board;
  const step = 1.4;
  // Round-robin assignment guarantees every cell is filled before any cell
  // gets a second layer — otherwise count not a multiple of 64 leaves the
  // last cells empty (e.g. h8 with count=2200, perCell=35: i never reaches
  // floor(i/35) === 63).
  const totalLayers = Math.ceil(count / cells);
  for (let i = 0; i < count; i++) {
    const cellIdx = i % cells;
    const x = cellIdx % board;
    const y = Math.floor(cellIdx / board);
    const layer = Math.floor(i / cells);
    const jx = (hash01(i * 2 + 17) - 0.5) * step * 0.55;
    const jy = (hash01(i * 2 + 18) - 0.5) * step * 0.55;
    arr[i * 3] = (x - 3.5) * step + jx;
    arr[i * 3 + 1] = (y - 3.5) * step + jy;
    arr[i * 3 + 2] = layer * 0.05 - totalLayers * 0.025;
  }
  return arr;
}

type Resources = {
  positions: Float32Array;
  geometry: THREE.BufferGeometry;
  targets: Float32Array[];
};

function buildResources(count: number): Resources {
  const targets = [buildCloud(count), buildLattice(count), buildChessboard(count)];
  const positions = new Float32Array(count * 3);
  positions.set(targets[0]);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const col = hash01(i + 7919) > 0.65 ? NEON_MINT : NEON_BLUE;
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return { positions, geometry, targets };
}

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const morphRef = useRef(0);
  const targetRef = useRef(0);

  // Lazy-init pattern: r3f buffers live in a ref so per-frame mutation in
  // useFrame is allowed (refs are the React Compiler escape hatch for mutable state).
  const resourcesRef = useRef<Resources | null>(null);
  if (resourcesRef.current === null) {
    resourcesRef.current = buildResources(count);
  }
  const resources = resourcesRef.current;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const sectionIds = ['projects', 'chess'];
    const onScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let active = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        if (el.getBoundingClientRect().top < triggerY) active = i + 1;
      }
      targetRef.current = active;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      resourcesRef.current?.geometry.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    const r = resourcesRef.current;
    if (!r) return;
    morphRef.current += (targetRef.current - morphRef.current) * Math.min(1, delta * 1.8);
    const m = morphRef.current;
    const seg = m < 1 ? 0 : 1;
    const t = m - seg;
    const a = r.targets[seg];
    const b = r.targets[seg + 1] ?? r.targets[seg];

    const time = state.clock.elapsedTime;
    const pos = r.positions;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const driftX = Math.sin(time * 0.5 + i * 0.13) * 0.06;
      const driftY = Math.cos(time * 0.5 + i * 0.17) * 0.06;
      pos[ix] = a[ix] * (1 - t) + b[ix] * t + driftX;
      pos[ix + 1] = a[ix + 1] * (1 - t) + b[ix + 1] * t + driftY;
      pos[ix + 2] = a[ix + 2] * (1 - t) + b[ix + 2] * t;
    }

    (r.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    const points = pointsRef.current;
    if (points) {
      points.rotation.y += (mouseRef.current.x * 0.35 - points.rotation.y) * 0.04;
      points.rotation.x += (-mouseRef.current.y * 0.25 - points.rotation.x) * 0.04;
    }
  });

  return (
    // r3f attaches the geometry instance at mount; we then mutate its buffers
    // per-frame via the same ref in useFrame. Ref read in JSX is the intended
    // escape hatch for this r3f pattern.
    // eslint-disable-next-line react-hooks/refs
    <points ref={pointsRef} geometry={resources.geometry}>
      <pointsMaterial
        size={0.075}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles count={PARTICLE_COUNT} />
      </Canvas>
    </div>
  );
}
