'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, BrainCircuit, Database, Network, Cpu, Terminal, Sparkles, CheckCircle2 } from 'lucide-react'
import { sound } from './SoundFeedback'

interface SkillGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  tagline: string;
  accent: string;
  skills: { name: string; level: number; note: string }[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'learn',
    label: 'AI & Neural Systems',
    icon: BrainCircuit,
    tagline: 'Deep architectures, time-series forecasting, and computer vision models.',
    accent: 'cyan',
    skills: [
      { name: 'PyTorch & TensorFlow', level: 92, note: 'CNNs, LSTMs, Attention GRUs' },
      { name: 'Time-Series & Forecasting', level: 94, note: 'Multi-horizon weather & traffic prediction' },
      { name: 'Computer Vision & OpenCV', level: 88, note: 'SignDetect, YOLO, safety filtering' },
      { name: 'Scikit-Learn & NumPy', level: 95, note: 'Feature engineering, clustering, PCA' },
    ],
  },
  {
    id: 'rag',
    label: 'Generative AI & RAG',
    icon: Sparkles,
    tagline: 'Contextual retrieval engines, vector databases, and LLM synthesis pipelines.',
    accent: 'purple',
    skills: [
      { name: 'LangChain & Prompting', level: 93, note: 'Grounded document question answering' },
      { name: 'FAISS & Vector Similarity', level: 95, note: 'Sub-5ms inner product cosine indexing' },
      { name: 'Gemini API & LLM Orchestration', level: 94, note: 'Streaming tokens, structured output' },
      { name: 'FastAPI Microservices', level: 90, note: 'High-throughput async endpoint backends' },
    ],
  },
  {
    id: 'simulate',
    label: 'Mobility & Simulation',
    icon: Network,
    tagline: 'Digital twins where vehicles, signals, and infrastructure cooperate.',
    accent: 'lime',
    skills: [
      { name: 'SUMO & TraCI Simulation', level: 96, note: 'SynCity real-time micro-simulation' },
      { name: 'OpenStreetMap Network Topology', level: 92, note: 'Road graph extraction & lane modeling' },
      { name: 'V2I & Traffic Actuation', level: 94, note: 'Dynamic green phase scheduling' },
      { name: 'Telemetry Logging & Analysis', level: 90, note: 'Time-step speed, delay, CO2 metrics' },
    ],
  },
  {
    id: 'build',
    label: 'Full-Stack Architecture',
    icon: Code2,
    tagline: 'Modern, high-performance web products that feel intuitive and fast.',
    accent: 'amber',
    skills: [
      { name: 'React 18 & Next.js 14', level: 95, note: 'App Router, SSR, Server Actions' },
      { name: 'TypeScript & JavaScript (ES6+)', level: 92, note: 'Type-safe scalable architectures' },
      { name: 'Tailwind CSS & Framer Motion', level: 96, note: 'Cyber-luxe UI, fluid micro-animations' },
      { name: 'Node.js, Express & SQL', level: 88, note: 'REST APIs, PostgreSQL, schema design' },
    ],
  },
]

export default function Skills() {
  const [activeGroupId, setActiveGroupId] = useState<string>('learn')

  const activeGroup = SKILL_GROUPS.find(g => g.id === activeGroupId) || SKILL_GROUPS[0]
  const ActiveIcon = activeGroup.icon

  const handleSelectGroup = (id: string) => {
    sound.playClick()
    setActiveGroupId(id)
  }

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold">
                02 // TECHNICAL MATRIX & CAPABILITIES
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Tools, models, and <span className="gradient-text">systems</span>.
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
              Organized by discipline: from mathematical model creation to user-facing web engineering.
            </p>
          </div>

          {/* Group Switcher Tabs */}
          <div className="flex flex-wrap p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            {SKILL_GROUPS.map((group) => {
              const Icon = group.icon
              const isSelected = activeGroupId === group.id
              return (
                <button
                  key={group.id}
                  onClick={() => handleSelectGroup(group.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500 text-dark-950 font-bold shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  data-cursor="STACK"
                >
                  <Icon size={13} />
                  <span>{group.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Skill Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Active Category Highlights */}
          <div className="lg:col-span-4 glass-card rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col justify-between h-full">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_20px_rgba(0,245,212,0.2)]">
                <ActiveIcon size={26} />
              </div>

              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                DOMAIN FOCUS
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                {activeGroup.label}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {activeGroup.tagline}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span>Domain Status:</span>
                <span className="text-lime-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Active Research
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Code Standards:</span>
                <span className="text-cyan-300">Clean, Typed, Tested</span>
              </div>
            </div>
          </div>

          {/* Skill Bars Column */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 md:p-8 border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {activeGroup.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-sm font-semibold text-white">
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                          // {skill.note}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full bg-dark-950 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive Technology Ecosystem Grid */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Terminal size={14} className="text-cyan-400" />
            <span>ADDITIONAL TOOLING IN KARTHIK&apos;S WORKFLOW:</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {['Docker', 'Git / GitHub CI', 'Jupyter Lab', 'Postman', 'VS Code', 'Vercel CLI', 'Linux / Bash'].map(tool => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}