'use client';

import React from 'react';
import { motion } from 'framer-motion';

const linkMotion = {
  whileHover: { scale: 1.12 },
  whileTap: { scale: 0.88 },
  transition: { type: 'spring' as const, stiffness: 420, damping: 18 },
};

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 glass border-b border-neon-blue/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#home"
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 420, damping: 18 }}
          className="text-xl font-bold text-white flex items-center space-x-2 group origin-left"
        >
          <span className="text-glow-blue group-hover:text-neon-blue transition-colors">NP</span>
          <span className="animate-pulse w-2 h-5 bg-neon-mint ml-1"></span>
        </motion.a>
        <div className="hidden md:flex space-x-8 text-sm tracking-widest uppercase">
          <motion.a
            href="#about"
            {...linkMotion}
            className="inline-block text-gray-300 hover:text-neon-blue hover:text-glow-blue transition-colors"
          >
            About
          </motion.a>
          <motion.a
            href="#experience"
            {...linkMotion}
            className="inline-block text-gray-300 hover:text-neon-mint hover:text-glow-mint transition-colors"
          >
            Experience
          </motion.a>
          <motion.a
            href="#projects"
            {...linkMotion}
            className="inline-block text-gray-300 hover:text-neon-blue hover:text-glow-blue transition-colors"
          >
            Projects
          </motion.a>
          <motion.a
            href="#skills"
            {...linkMotion}
            className="inline-block text-gray-300 hover:text-neon-mint hover:text-glow-mint transition-colors"
          >
            Skills
          </motion.a>
          <motion.a
            href="#chess"
            {...linkMotion}
            className="inline-block text-gray-300 hover:text-neon-mint hover:text-glow-mint transition-colors"
          >
            Chess
          </motion.a>
          <motion.a
            href="#booking"
            {...linkMotion}
            className="inline-block text-gray-300 hover:text-neon-blue hover:text-glow-blue transition-colors"
          >
            Contact
          </motion.a>
        </div>
        {/* Mobile Menu Icon Placeholder */}
        <div className="md:hidden text-neon-blue">
          [MENU]
        </div>
      </div>
    </nav>
  );
}
