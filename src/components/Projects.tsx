import React from 'react';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const projects = [
    {
      title: 'Clinlink',
      description: 'A full stack application that allows clinicians to find and reach out to relevant researchers to collaborate on clinical problems.',
      githubUrl: 'https://github.com',
      liveUrl: 'https://clinlink.org'
    },
    {
      title: 'BeAlive',
      description: 'A simple chrome extension that blocks websites and improves your well-being.',
      githubUrl: 'https://github.com/naveenprabhu-dev/be-alive',
      liveUrl: 'https://chromewebstore.google.com/detail/bealive-block-websites-an/ghhkgkeicbbofgphbfppiggadciagnhd',
    },
    {
      title: 'Human Eval Bar',
      description: 'A custom chess engine built in C++ with a React frontend. Evaluates positions and provides top moves for competitive preparation.',
      githubUrl: 'https://github.com',
    },
    {
      title: 'US Chess Insights',
      description: 'Given the birth date of a US Chess member, this scraper finds the amount of games, months, and the win % that the player achieved to reach various rating milestones. Great for understanding how long chess improvement really takes!',
      githubUrl: 'https://github.com/naveenprabhu-dev/chess-uscf-rating-progression',
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-12 text-center uppercase tracking-widest">
        <span className="text-neon-blue glow-blue">System</span>.Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}
