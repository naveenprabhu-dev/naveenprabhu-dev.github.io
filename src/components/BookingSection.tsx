'use client';

import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { motion, AnimatePresence } from 'framer-motion';

const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME || 'your-cal-handle';

export default function BookingSection() {
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: 'portfolio' });
      cal('ui', {
        theme: 'dark',
        cssVarsPerTheme: {
          dark: {
            'cal-brand': '#1faaff',
            'cal-bg': '#0e131f',
            'cal-text': '#ededed',
            'cal-text-muted': '#c4ebc8',
          },
          light: {
            'cal-brand': '#1faaff',
          },
        },
        hideEventTypeDetails: false,
      });
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => setReserved(true),
      });
    })();
  }, []);

  return (
    <section id="booking" className="py-20 px-6 max-w-4xl mx-auto">
      <div className="glass p-10 border-2 border-neon-blue glow-blue relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-mint via-neon-blue to-neon-mint opacity-60" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue opacity-5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-mint opacity-5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-3 uppercase tracking-widest text-glow-blue text-center">
            <span className="text-neon-mint mr-3">&gt;</span> Reserve A Slot
          </h3>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto leading-relaxed">
            Want to talk shop — chess, code, or anything in between? Pick a time below.
          </p>

          <AnimatePresence mode="wait">
            {reserved ? (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="text-center py-16"
              >
                <div className="inline-block border-2 border-neon-mint glow-mint p-10">
                  <div className="text-neon-mint text-glow-mint text-2xl md:text-3xl font-mono tracking-widest uppercase">
                    &gt; RESERVATION_CONFIRMED
                  </div>
                  <div className="text-gray-400 text-xs font-mono mt-4 tracking-widest">
                    TRANSMISSION RECEIVED &middot; CHECK YOUR INBOX
                  </div>
                  <motion.div
                    className="mt-6 text-neon-blue text-glow-blue font-mono text-sm tracking-widest"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    {'█▓▒░ AWAITING_HANDSHAKE ░▒▓█'}
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cal"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="border border-neon-blue/30 bg-background/60"
              >
                <Cal
                  namespace="portfolio"
                  calLink={CAL_USERNAME}
                  style={{ width: '100%', height: '620px', overflow: 'scroll' }}
                  config={{ layout: 'month_view', theme: 'dark' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
