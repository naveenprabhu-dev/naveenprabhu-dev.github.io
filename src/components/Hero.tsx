import React from 'react';
import ExperienceItem from './ExperienceItem';

export default function Hero() {
  return (
    <section id="about" className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight uppercase">
          Naveen <span className="text-neon-blue text-glow-blue">Prabhu</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-neon-mint font-medium mb-8 uppercase tracking-widest text-glow-mint">
          BS/MS Student at UNC Chapel Hill <br className="hidden md:block" /> | Computer Science & Psychology
        </h2>
        <div className="glass p-6 border-l-4 border-neon-blue">
          <p className="text-gray-300 text-lg leading-relaxed">
            I am a BS/MS student at UNC Chapel Hill specialized in Computer Science. I completed my undergraduate studies at UNC with a double major in Computer Science and Psychology. I am passionate about Machine Learning, AI, and Software Engineering. I find deep fulfillment in the process of building and the iterative journey of incrementally getting better.
          </p>
        </div>
      </div>

      <div id="experience" className="mt-20">
        <h3 className="text-2xl font-bold text-white mb-10 flex items-center uppercase tracking-widest">
          <span className="text-neon-mint mr-3">&gt;</span> Experience & Education
        </h3>
        <div className="flex flex-col space-y-6 ml-2">
          <ExperienceItem
            title="BS/MS in Computer Science"
            company="UNC Chapel Hill"
            duration="2020 - Present"
            description="Specializing in Computer Science with a strong focus on Machine Learning and AI. Completed undergraduate studies with a double major in Computer Science and Psychology."
          />
          <ExperienceItem
            title="Software Engineering Intern"
            company="Tech Company Placeholder"
            duration="Summer 2024"
            description="Developed scalable backend services using Node.js and TypeScript. Collaborated with cross-functional teams to deliver high-quality software."
          />
        </div>
      </div>
    </section>
  );
}
