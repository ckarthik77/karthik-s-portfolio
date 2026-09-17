'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, CheckCircle, Search, Sparkles, Target, Zap, Award, ArrowUpRight } from 'lucide-react'
import { sound } from '../SoundFeedback'

interface RoleProfile {
  title: string;
  companyTier: string;
  matchScore: number;
  salaryBenchmark: string;
  keySkills: { name: string; match: number; status: 'strong' | 'moderate' | 'learning' }[];
  matchHighlights: string[];
  interviewPointers: string[];
}

const ROLES: Record<string, RoleProfile> = {
  'ai-engineer': {
    title: 'Senior Applied AI / ML Engineer',
    companyTier: 'Frontier AI Labs & High-Growth Startups',
    matchScore: 96.4,
    salaryBenchmark: '$140k - $190k / Global Remote',
    keySkills: [
      { name: 'Python & PyTorch', match: 98, status: 'strong' },
      { name: 'LangChain & Vector DBs (FAISS)', match: 96, status: 'strong' },
      { name: 'FastAPI & Microservices', match: 92, status: 'strong' },
      { name: 'LLM Fine-tuning & RAG', match: 95, status: 'strong' },
      { name: 'TypeScript & React / Next.js', match: 90, status: 'strong' },
      { name: 'Docker & ML Deployment', match: 88, status: 'moderate' },
    ],
    matchHighlights: [
      'Strong dual competence in both core ML algorithms (LSTMs, Transformers) and production Full-Stack applications.',
      'Documented real-world RAG architectures with Gemini API, vector embeddings, and React frontends.',
      'Deep experience handling time-series telemetry and synthetic dataset generation.',
    ],
    interviewPointers: [
      'Be prepared to discuss chunking strategies and cosine threshold optimization in vector retrieval.',
      'Explain how you handle latency trade-offs between model size and real-time user responsiveness.',
    ]
  },
  'autonomous-systems': {
    title: 'Autonomous Systems & AV Simulation Specialist',
    companyTier: 'Smart Mobility & Robotics Institutions',
    matchScore: 94.8,
    salaryBenchmark: '$135k - $180k',
    keySkills: [
      { name: 'SUMO & TraCI Simulation', match: 99, status: 'strong' },
      { name: 'OpenStreetMap Network Topology', match: 95, status: 'strong' },
      { name: 'Computer Vision & SignDetect', match: 92, status: 'strong' },
      { name: 'Multi-Horizon Attention LSTM', match: 94, status: 'strong' },
      { name: 'Vehicle-to-Infrastructure (V2I)', match: 96, status: 'strong' },
      { name: 'C++ Real-time Systems', match: 78, status: 'learning' },
    ],
    matchHighlights: [
      'Flagship SynCity project exhibits deep practical expertise in urban traffic simulations and TraCI hooks.',
      'Proven ability to synthesize sensor datasets and deploy attention models for bottleneck flow prediction.',
    ],
    interviewPointers: [
      'Walk through how TraCI synchronizes step-by-step vehicle positioning with neural traffic signal actuation.',
      'Contrast YOLO bounding box detection with feature pyramid networks for road signs under adverse weather.',
    ]
  },
  'fullstack-ai': {
    title: 'Full-Stack AI Product Engineer',
    companyTier: 'Modern SaaS & Generative AI Ecosystems',
    matchScore: 97.2,
    salaryBenchmark: '$130k - $175k',
    keySkills: [
      { name: 'React 18 / Next.js 14 App Router', match: 98, status: 'strong' },
      { name: 'Tailwind CSS & Framer Motion', match: 97, status: 'strong' },
      { name: 'REST APIs & WebSocket Streaming', match: 94, status: 'strong' },
      { name: 'State Management & UI Performance', match: 95, status: 'strong' },
      { name: 'Generative AI Embeddings & Prompting', match: 96, status: 'strong' },
      { name: 'Cloud Serverless (Vercel/AWS)', match: 90, status: 'moderate' },
    ],
    matchHighlights: [
      'Exceptional design sensitivity: builds responsive, fluid, micro-animated user experiences.',
      'End-to-end fluency: capable of writing neural backends and wrapping them into intuitive consumer interfaces.',
    ],
    interviewPointers: [
      'Discuss how you structure client vs server components in Next.js when streaming LLM token chunks.',
      'Explain your mental model for graceful degradation when third-party AI APIs experience high latency.',
    ]
  },
}

export default function JobSearchDemo() {
  const [selectedRoleKey, setSelectedRoleKey] = useState<string>('ai-engineer')
  const [customRoleInput, setCustomRoleInput] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)

  const activeProfile = ROLES[selectedRoleKey] || ROLES['ai-engineer']

  const handleSelectRole = (key: string) => {
    sound.playClick()
    setSelectedRoleKey(key)
  }

  const handleSimulateCustomMatch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customRoleInput.trim()) return
    sound.playBlip(900)
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      sound.playSuccess()
    }, 600)
  }

  return (
    <div className="rounded-2xl bg-dark-900/90 border border-lime-500/20 p-5 md:p-6 text-slate-200 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-lime-400 font-semibold">
              Semantic Talent Matcher & AI Job Radar
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            Real-Time Resume & Capability Vector Alignment
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-300 text-xs font-mono flex items-center gap-1.5">
            <Sparkles size={12} /> FAISS Vector Cosine Scoring
          </span>
        </div>
      </div>

      {/* Role Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSelectRole('ai-engineer')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
              selectedRoleKey === 'ai-engineer'
                ? 'bg-lime-400 text-dark-950 font-bold shadow-[0_0_12px_rgba(163,230,53,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:border-lime-400/40 hover:text-lime-300'
            }`}
            data-cursor="SELECT"
          >
            <Briefcase size={13} />
            <span>AI / ML Engineer</span>
          </button>

          <button
            onClick={() => handleSelectRole('autonomous-systems')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
              selectedRoleKey === 'autonomous-systems'
                ? 'bg-lime-400 text-dark-950 font-bold shadow-[0_0_12px_rgba(163,230,53,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:border-lime-400/40 hover:text-lime-300'
            }`}
            data-cursor="SELECT"
          >
            <Target size={13} />
            <span>Autonomous Systems</span>
          </button>

          <button
            onClick={() => handleSelectRole('fullstack-ai')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
              selectedRoleKey === 'fullstack-ai'
                ? 'bg-lime-400 text-dark-950 font-bold shadow-[0_0_12px_rgba(163,230,53,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:border-lime-400/40 hover:text-lime-300'
            }`}
            data-cursor="SELECT"
          >
            <Zap size={13} />
            <span>Full-Stack AI Product</span>
          </button>
        </div>

        <form onSubmit={handleSimulateCustomMatch} className="flex items-center gap-1.5">
          <input
            type="text"
            placeholder="Test custom job spec..."
            value={customRoleInput}
            onChange={e => setCustomRoleInput(e.target.value)}
            className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
          <button
            type="submit"
            className="p-1.5 bg-lime-500/20 text-lime-300 border border-lime-500/30 rounded-lg hover:bg-lime-500/30 transition-all"
            data-cursor="SEARCH"
          >
            <Search size={14} />
          </button>
        </form>
      </div>

      {/* Main Alignment Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-4">
        {/* Match Score Card */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-gradient-to-br from-white/5 to-lime-500/5 border border-lime-500/20 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-lime-400 block mb-1">
              TARGET SPECIFICATION
            </span>
            <h5 className="text-xl font-bold text-white leading-snug">
              {activeProfile.title}
            </h5>
            <p className="text-xs text-slate-400 mt-1">{activeProfile.companyTier}</p>
          </div>

          <div className="my-6">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">Match Alignment</span>
              <span className="text-4xl font-mono font-bold text-lime-300">
                {activeProfile.matchScore}%
              </span>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-lime-400 via-cyan-400 to-emerald-400 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${activeProfile.matchScore}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1.5 block">
              Confidence tier: <b className="text-lime-400">Exceptional Fit (Top 2%)</b>
            </span>
          </div>

          <div className="pt-3 border-t border-white/10 text-xs font-mono flex items-center justify-between text-slate-300">
            <span>Market Benchmark:</span>
            <span className="text-white font-semibold">{activeProfile.salaryBenchmark}</span>
          </div>
        </div>

        {/* Skill Overlap Breakdown */}
        <div className="lg:col-span-8 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-lime-400 flex items-center gap-1.5">
                <Award size={13} /> Vector Skill Density & Overlap
              </span>
              <span className="text-[10px] font-mono text-slate-400">Karthik's Stack vs Benchmark</span>
            </div>

            <div className="space-y-2.5">
              {activeProfile.keySkills.map(skill => (
                <div key={skill.name} className="text-xs font-mono">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-200">{skill.name}</span>
                    <span className="text-lime-300 font-bold">{skill.match}% Match</span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        skill.status === 'strong'
                          ? 'bg-gradient-to-r from-lime-400 to-cyan-400'
                          : 'bg-amber-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.match}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <span className="text-[11px] font-mono text-cyan-300 block mb-1.5">
              AI CANDIDATE EVALUATION SUMMARY:
            </span>
            <ul className="space-y-1">
              {activeProfile.matchHighlights.map((h, i) => (
                <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                  <CheckCircle size={12} className="text-lime-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Suggested Interview Pointers Generator */}
      <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="font-mono text-lime-400 text-[11px] font-bold">
            RECOMMENDED TECHNICAL INTERVIEW TOPICS:
          </span>
          <p className="text-slate-300 text-[11px]">
            {activeProfile.interviewPointers[0]}
          </p>
        </div>

        <a
          href="mailto:karthikeyalucky5585@gmail.com?subject=Interview%20Invitation%20for%20Karthik"
          className="shrink-0 px-4 py-2 rounded-lg bg-lime-400 text-dark-950 font-semibold text-xs flex items-center gap-1.5 hover:bg-lime-300 transition-all"
          data-cursor="HIRE"
        >
          <span>Schedule Technical Screen</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  )
}
