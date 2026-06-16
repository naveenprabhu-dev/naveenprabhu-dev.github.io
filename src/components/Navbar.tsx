'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const linkMotion = {
  whileHover: { scale: 1.12 },
  whileTap: { scale: 0.88 },
  transition: { type: 'spring' as const, stiffness: 420, damping: 18 },
};

const links = [
  { href: '#about', label: 'About', accent: 'blue' },
  { href: '#experience', label: 'Experience', accent: 'mint' },
  { href: '#projects', label: 'Projects', accent: 'blue' },
  { href: '#skills', label: 'Skills', accent: 'mint' },
  { href: '#chess', label: 'Chess', accent: 'blue' },
  { href: '#booking', label: 'Contact', accent: 'mint' },
] as const;

const accentClass = (accent: 'blue' | 'mint') =>
  accent === 'blue'
    ? 'hover:text-neon-blue hover:text-glow-blue'
    : 'hover:text-neon-mint hover:text-glow-mint';

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

        {/* Desktop links */}
        <div className="hidden md:flex space-x-8 text-sm tracking-widest uppercase">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              {...linkMotion}
              className={`inline-block text-gray-300 transition-colors ${accentClass(link.accent)}`}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 -mr-2 text-neon-blue"
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              open ? 'translate-y-1.5 rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current my-1 transition-opacity duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              open ? '-translate-y-1.5 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden glass border-t border-neon-blue/20"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 text-sm tracking-widest uppercase">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-gray-300 transition-colors ${accentClass(link.accent)}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
