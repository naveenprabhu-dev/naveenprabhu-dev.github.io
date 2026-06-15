'use client';

import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  skills?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  skills,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), {
    stiffness: 150,
    damping: 14,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), {
    stiffness: 150,
    damping: 14,
  });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className="p-6 border border-neon-blue/30 bg-background/80 backdrop-blur-md transition-[box-shadow,border-color] duration-300 hover:border-neon-blue/60 hover-glow-blue flex flex-col justify-between group rounded-sm will-change-transform"
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-xl font-bold mb-3 transition-colors duration-300 text-neon-mint text-glow-mint group-hover:text-white">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>
        {skills && skills.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-6" aria-label="Skills used">
            {skills.map((skill) => (
              <li
                key={skill}
                className="text-[11px] tracking-wider uppercase text-neon-blue/90 border border-neon-blue/30 bg-neon-blue/5 rounded-sm px-2 py-0.5"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex space-x-4" style={{ transform: 'translateZ(15px)' }}>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-400 hover:text-neon-blue transition-colors duration-200"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            GitHub
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-400 hover:text-neon-blue transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Site
          </a>
        )}
      </div>
    </motion.div>
  );
}
