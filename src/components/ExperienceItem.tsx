'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ExperienceItemProps {
  title: string;
  company: string;
  duration: string;
  description?: string;
  link?: string;
  reportUrl?: string;
  reportLabel?: string;
}

export default function ExperienceItem({
  title,
  company,
  duration,
  description,
  link,
  reportUrl,
  reportLabel,
}: ExperienceItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 160,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 160,
    damping: 16,
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
    <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-neon-blue before:rounded-full before:glow-blue before:border-2 before:border-background">
      <div className="absolute left-[5px] top-5 bottom-[-1.5rem] w-0.5 bg-gradient-to-b from-neon-blue/50 to-transparent"></div>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
        className="glass p-5 rounded-sm border border-neon-blue/20 hover:border-neon-blue/60 hover-glow-blue transition-[box-shadow,border-color] duration-300 will-change-transform"
      >
        <div style={{ transform: 'translateZ(15px)' }}>
          <h4 className="text-lg font-bold text-white">{title}</h4>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-1 mb-3">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-blue font-medium underline underline-offset-4 decoration-neon-blue/50 hover:decoration-neon-blue hover:text-glow-blue transition-colors"
              >
                {company}
              </a>
            ) : (
              <span className="text-neon-blue font-medium">{company}</span>
            )}
            <span className="text-sm text-gray-400 font-mono tracking-wider">{duration}</span>
          </div>
          {description && (
            <>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neon-mint hover:text-glow-mint transition-colors"
              >
                {open ? 'Hide details' : 'See details'}
                <span
                  className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.p
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden text-gray-300 text-sm leading-relaxed"
                  >
                    {description.split('\n\n').map((para, i) => (
                      <span key={i} className="block pt-3">
                        {para}
                      </span>
                    ))}
                    {reportUrl && (
                      <a
                        href={reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-neon-blue font-medium underline underline-offset-4 decoration-neon-blue/50 hover:decoration-neon-blue hover:text-glow-blue transition-colors"
                      >
                        {reportLabel ?? 'Read the report'} →
                      </a>
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
