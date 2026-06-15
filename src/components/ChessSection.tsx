import React from 'react';

export default function ChessSection() {
  return (
    <section id="chess" className="py-20 px-6 max-w-4xl mx-auto">
      <div className="glass p-10 border-2 border-neon-blue relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-mint via-neon-blue to-neon-mint opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue opacity-5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-mint opacity-5 blur-3xl rounded-full"></div>
        
        <div className="flex flex-col items-center text-center relative z-10">
          <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest text-glow-blue">
            CHESS
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed">
            Beyond engineering, I am an active competitive chess player with the title of <span className="text-neon-mint font-bold">National Master (NM)</span>. I also love teaching and contributing to others’ growth. I take on students of all levels; take a look at my chess website below. I enjoy writing about various topics related to chess, please subscribe to my substack if you’re interested!
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="https://nmprabhu.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-transparent border border-neon-blue text-neon-blue font-bold uppercase tracking-widest transition-all duration-300 hover:bg-neon-blue hover:text-black hover-glow-blue"
            >
              Visit nmprabhu.com
            </a>
            <a 
              href="https://substack.com/@naveenprabhu/reads" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-transparent border border-neon-blue text-neon-blue font-bold uppercase tracking-widest transition-all duration-300 hover:bg-neon-blue hover:text-black hover-glow-blue"
            >
              Read My Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
