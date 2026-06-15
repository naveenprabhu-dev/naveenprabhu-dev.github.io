import React from 'react';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const projects = [
    {
      title: 'Clinlink',
      description: 'A platform that lets clinicians post the problems they are facing and quietly matches them with researchers who can actually help. Under the hood it leans on pgvector and OpenAI embeddings to connect the two groups by meaning rather than keywords, with a Hugging Face transformer pipeline that explains, in plain terms, why each match was made.',
      skills: ['Next.js', 'React', 'TypeScript', 'Python', 'Docker'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://clinlink.org'
    },
    {
      title: 'BeAlive',
      description: 'A simple chrome extension that blocks websites and improves your well-being.',
      skills: ['JavaScript', 'HTML', 'CSS', 'Chrome Extension'],
      githubUrl: 'https://github.com/naveenprabhu-dev/be-alive',
      liveUrl: 'https://chromewebstore.google.com/detail/bealive-block-websites-an/ghhkgkeicbbofgphbfppiggadciagnhd',
    },
    {
      title: 'Human Eval Bar',
      description: 'A chess evaluation bar that replaces Stockfish by predicting practical win/draw/loss odds: factoring in time remaining and player ELOs, not just the engine’s best move. Built an ETL pipeline over Chess.com data and trained neural nets (with an XGBoost baseline) on positions encoded with time remaining, Elo, and piece configuration. Main blocker is uniqueness of chess positions; since it’s near impossible that two data points (positions) are exactly the same, the model can’t learn in a traditional ML sense and will have to rely on heuristics of the position.',
      skills: ['Python', 'PyTorch', 'XGBoost', 'NumPy'],
      githubUrl: 'https://github.com',
    },
    {
      title: 'US Chess Insights',
      description: 'Given the birth date of a US Chess member, this scraper finds the amount of games, months, and the win % that the player achieved to reach various rating milestones. Great for understanding how long chess improvement really takes!',
      skills: ['Python', 'Flask', 'BeautifulSoup', 'SQLite'],
      githubUrl: 'https://github.com/naveenprabhu-dev/chess-uscf-rating-progression',
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-12 text-center uppercase tracking-widest">
        Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}
