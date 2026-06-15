'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'Python', icon: '/skills/python.svg' },
  { name: 'React', icon: '/skills/react.svg' },
  { name: 'PyTorch', icon: '/skills/pytorch.svg' },
  { name: 'NumPy', icon: '/skills/numpy.svg' },
  { name: 'Git', icon: '/skills/git.svg' },
  { name: 'Next.js', icon: '/skills/nextjs.svg' },
  { name: 'TypeScript', icon: '/skills/typescript.svg' },
  { name: 'Docker', icon: '/skills/docker.svg' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-12 text-center uppercase tracking-widest">
        Skills
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center justify-center gap-3 p-6 border border-neon-blue/30 bg-background/80 backdrop-blur-md rounded-sm transition-[box-shadow,border-color] duration-300 hover:border-neon-blue/60 hover-glow-blue group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={skill.icon}
              alt={`${skill.name} logo`}
              width={48}
              height={48}
              loading="lazy"
              className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-sm tracking-widest uppercase text-gray-300 group-hover:text-neon-blue transition-colors">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
