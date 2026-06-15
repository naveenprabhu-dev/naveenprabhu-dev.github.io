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
            Hey there! I&apos;m a BS/MS student in Computer Science at UNC Chapel Hill, and an aspiring AI/ML engineer. I did my undergraduate degrees at UNC in Computer Science and Psychology. I&apos;m also a competitive chess player and coach — would love to take on new students who want to get better. Feel free to reach out below!
          </p>
        </div>
      </div>

      <div id="experience" className="mt-20">
        <h3 className="text-2xl font-bold text-white mb-10 flex items-center uppercase tracking-widest">
          <span className="text-neon-mint mr-3">&gt;</span> Experience
        </h3>
        <div className="flex flex-col space-y-6 ml-2">
          <ExperienceItem
            title="Software / AI Intern"
            company="Chessvia.ai"
            duration="May 2026 – Present"
            link="https://chessvia.ai"
            description="I help build the AI-powered training side of this chess improvement platform. I shipped an Insights engine that breaks down a player's chess.com and Lichess games against real peer baselines (mined from hundreds of thousands of games) across openings, pawn structures, time controls, and every phase of the game — then turns the weak spots into personalized lesson plans and targeted drills from a million-puzzle library.\n\nI also built a historical-games study mode with guided and challenge walkthroughs, embedded Stockfish both in-browser and server-side so off-script moves get analyzed live, and created 'Chessy,' an in-context chat coach that can reason about the current position and call the engine on demand."
          />
          <ExperienceItem
            title="Machine Learning Researcher"
            company="REU-FoDOMMaT"
            duration="May 2025 – August 2025"
            link="https://reu.ncsa.illinois.edu/"
            description="Spent the summer in this NSF-funded REU at UIUC, working under Dr. Zhi-Pei Liang on predicting risk for brain diseases by accurately quantifying brain metabolites. I trained a Physics-Informed Bayesian CNN with built-in uncertainty estimation that cut error substantially against the LCModel gold standard — roughly halving the MAE for Glu and Gln, and lowering it by about a third for NAA, Cho, and mIns."
          />
          <ExperienceItem
            title="Undergraduate Teaching Assistant"
            company="Discrete Structures (COMP 283) & Algorithms (COMP 550)"
            duration="Jan 2025 – Present"
            description="I run 6+ weekly office hours, helping over 150 students with topics from induction to dynamic programming to graphs. I also lead review sessions and host in-class lectures going over practice problems before exams. I've supported Discrete Structures (COMP 283) for one semester and Algorithms (COMP 550) for two."
          />
          <ExperienceItem
            title="Research Assistant"
            company="Gates Lab"
            duration="Jan 2025 – Dec 2025"
            link="https://gateslab.web.unc.edu/"
            reportUrl="/gates-lab-report.pdf"
            reportLabel="Read my report"
            description="I worked on improving vector auto-regressive (VAR) models — a tool for forecasting how a set of variables, like a person's emotions, evolve over time as a multivariate time series. These models tend to struggle when each person has only a little data, so I explored a regularization idea borrowed from optimal transport: using the Wasserstein distance to pull each person's model toward patterns shared across everyone.\n\nThe key twist was how we defined 'distance' between variables — instead of treating emotions as unrelated, I derived that distance from word-embedding spaces (BERT, RoBERTa, XLNet), so the model knows that 'sad' and 'depressed' sit closer together than 'sad' and 'happy.' Tested on a multivariate emotion-survey dataset, this semantically-guided regularization gave a small but consistent forecasting improvement over standard OLS — and a substantial one for a subset of individuals — suggesting that baking real-world meaning into the penalty genuinely helps."
          />
        </div>
      </div>
    </section>
  );
}
