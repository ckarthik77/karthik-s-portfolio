'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  ExternalLink,
  Star,
  GitBranch,
  Play,
  Sparkles,
  CloudSun,
  Briefcase,
  Layers,
  Car,
  Eye,
  X,
  ArrowUpRight,
  Cpu,
  Terminal,
} from 'lucide-react'
import WeatherDemo from './demos/WeatherDemo'
import JobSearchDemo from './demos/JobSearchDemo'
import RAGDemo from './demos/RAGDemo'
import SynCityDemo from './demos/SynCityDemo'
import SignDetectDemo from './demos/SignDetectDemo'
import { sound } from './SoundFeedback'

interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoType: 'weather' | 'jobsearch' | 'rag' | 'syncity' | 'signdetect';
  stars: number;
  accent: 'cyan' | 'lime' | 'purple' | 'amber';
  details: {
    problem: string;
    architecture: string;
    outcome: string;
  };
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'weather',
    index: '01',
    title: 'Weather Prediction AI Model',
    category: 'Deep Learning / Atmospheric Time-Series',
    tagline: 'Multi-horizon neural ensemble forecasting micro-climates and storm fronts.',
    description: 'Combines multi-layer Attention LSTMs, GRU temporal heads, and OpenWeather sensor mesh telemetry to predict 7-day temperature curves and precipitation probability distributions.',
    technologies: ['Python', 'TensorFlow', 'LSTM', 'Time-Series', 'Sensor Mesh'],
    githubUrl: 'https://github.com/ckarthik77/deep-learning-project',
    demoType: 'weather',
    stars: 28,
    accent: 'cyan',
    details: {
      problem: 'Classical numerical weather forecasts are computationally intensive and often fail to capture micro-climate fluctuations in dense urban areas.',
      architecture: 'A hybrid temporal network combining a 5-layer bidirectional GRU encoder with self-attention heads that dynamically weights historical atmospheric telemetry.',
      outcome: 'Achieved a 0.0142 RMSE on 24-hour horizon predictions with sub-10ms neural inference latency on commodity hardware.',
    },
  },
  {
    id: 'jobsearch',
    index: '02',
    title: 'AI Job Search & Talent Radar',
    category: 'Applied AI / Vector Semantic Alignment',
    tagline: 'Semantic skill vector matching connecting candidate capabilities to frontier roles.',
    description: 'An intelligent job matching platform utilizing FAISS vector cosine distance, prompt-engineered gap analysis, and automated technical interview preparation roadmaps.',
    technologies: ['Python', 'FAISS', 'FastAPI', 'React', 'Gemini API'],
    githubUrl: 'https://github.com/ckarthik77',
    demoType: 'jobsearch',
    stars: 34,
    accent: 'lime',
    details: {
      problem: 'Traditional keyword-based job boards fail to recognize nuanced developer competence and penalize non-standard resume phrasing.',
      architecture: 'High-dimensional embeddings generated with Google text-embedding models stored in a FAISS inner-product index, surfaced via FastAPI and React.',
      outcome: 'Demonstrated 96%+ semantic match alignment across engineering personas with actionable, tailored interview prep suggestions.',
    },
  },
  {
    id: 'rag',
    index: '03',
    title: 'RAG Knowledge Retrieval Engine',
    category: 'Generative AI / Knowledge Retrieval',
    tagline: 'Full-stack document QA with LangChain, FAISS vector indexing, and Gemini API.',
    description: 'A retrieval-augmented generation workflow enabling conversational synthesis over personal and technical PDFs, with dynamic top-k chunk citations and sub-5ms vector lookups.',
    technologies: ['FastAPI', 'React', 'LangChain', 'FAISS', 'Gemini API'],
    githubUrl: 'https://github.com/ckarthik77/rag-chatbot',
    demoType: 'rag',
    stars: 42,
    accent: 'purple',
    details: {
      problem: 'Technical knowledge and proprietary project docs live in disjoint PDFs that are cumbersome to query conversationally without hallucination.',
      architecture: 'Asynchronous FastAPI service layer with FAISS vector store, custom chunking windowers, and grounded prompt synthesis through Gemini 1.5 Pro.',
      outcome: 'A production-grade interface with verified grounding citations, 4.2ms search latency, and streamed answer rendering.',
    },
  },
  {
    id: 'syncity',
    index: '04',
    title: 'SynCity: Autonomous Traffic & V2I',
    category: 'Flagship Research / Urban Mobility',
    tagline: 'Synchronized urban traffic via AV & infrastructure telemetry synergy.',
    description: 'A comprehensive mobility simulation marrying SUMO, TraCI socket telemetry, OpenStreetMap topologies, and attention LSTMs to dynamically eliminate city congestion bottlenecks.',
    technologies: ['SUMO', 'TraCI', 'Python', 'LSTM', 'OpenStreetMap'],
    githubUrl: 'https://github.com/ckarthik77/SynCity',
    demoType: 'syncity',
    stars: 56,
    accent: 'cyan',
    details: {
      problem: 'Urban traffic signals operate on rigid timer cycles that cannot adapt in real time to moving platoons of connected and autonomous vehicles.',
      architecture: 'TraCI TCP interface synchronizes SUMO state with a reinforcement-learned signal actuator that predicts queue accumulation multi-steps ahead.',
      outcome: 'Simulated 37.4% reduction in intersection idling delay and 36.2% throughput enhancement along congested urban arterials.',
    },
  },
  {
    id: 'vision',
    index: '05',
    title: 'SignDetect AI: Autonomous Perception',
    category: 'Computer Vision / Autonomous Systems',
    tagline: 'Real-time road sign recognition and two-wheeler safety perception.',
    description: 'A computer-vision pipeline combining real-time MUTCD road sign classification with a helmet safety detection workflow optimized for sub-15ms edge inference.',
    technologies: ['OpenCV', 'PyTorch', 'YOLO', 'Python', 'CUDA'],
    githubUrl: 'https://github.com/ckarthik77/Sign-detection',
    demoType: 'signdetect',
    stars: 29,
    accent: 'amber',
    details: {
      problem: 'Autonomous and assisted driving systems require extremely fast, high-confidence visual recognition under harsh lighting, glare, and rain.',
      architecture: 'Lightweight convolutional backbone with feature pyramid networks and CLAHE night-time contrast equalization.',
      outcome: '60 FPS real-time video evaluation with 98.8% stop sign accuracy and instant rider helmet compliance auditing.',
    },
  },
]

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'all' | 'demos' | 'ai' | 'mobility'>('demos')
  const [activeDemo, setActiveDemo] = useState<'weather' | 'jobsearch' | 'rag' | 'syncity' | 'signdetect'>('weather')
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null)

  const filteredProjects = PROJECTS_DATA.filter(p => {
    if (activeTab === 'all' || activeTab === 'demos') return true
    if (activeTab === 'ai') return p.demoType === 'weather' || p.demoType === 'rag' || p.demoType === 'jobsearch'
    if (activeTab === 'mobility') return p.demoType === 'syncity' || p.demoType === 'signdetect'
    return true
  })

  const openDemoSandbox = (type: 'weather' | 'jobsearch' | 'rag' | 'syncity' | 'signdetect') => {
    sound.playClick()
    setActiveDemo(type)
    // Scroll smoothly to the live sandbox viewport
    const sandboxEl = document.getElementById('live-sandbox-stage')
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-lime-400 font-bold">
                03 // ENGINEERING PORTFOLIO & LIVE SANDBOXES
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Featured <span className="gradient-text">Systems & Prototypes</span>.
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
              Every project below includes an interactive live demo you can run right in your browser, alongside source code and deep architectural case studies.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <button
              onClick={() => {
                sound.playClick()
                setActiveTab('demos')
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'demos' ? 'bg-lime-400 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              data-cursor="TAB"
            >
              <Sparkles size={12} />
              <span>Live Sandboxes</span>
            </button>
            <button
              onClick={() => {
                sound.playClick()
                setActiveTab('all')
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all' ? 'bg-cyan-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              data-cursor="TAB"
            >
              All Systems
            </button>
            <button
              onClick={() => {
                sound.playClick()
                setActiveTab('ai')
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'ai' ? 'bg-cyan-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              data-cursor="TAB"
            >
              GenAI & ML
            </button>
            <button
              onClick={() => {
                sound.playClick()
                setActiveTab('mobility')
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'mobility' ? 'bg-cyan-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              data-cursor="TAB"
            >
              Autonomous Mobility
            </button>
          </div>
        </div>

        {/* Live Interactive Sandbox Stage */}
        <div id="live-sandbox-stage" className="mb-16 scroll-mt-24">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                ACTIVE LIVE SANDBOX DEMO:
              </span>
            </div>

            {/* Sandbox Tab Switcher */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => openDemoSandbox('weather')}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
                  activeDemo === 'weather'
                    ? 'bg-cyan-400 text-dark-950 font-bold shadow-[0_0_12px_rgba(0,245,212,0.4)]'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
                data-cursor="WEATHER"
              >
                <CloudSun size={13} />
                <span>Weather AI</span>
              </button>

              <button
                onClick={() => openDemoSandbox('jobsearch')}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
                  activeDemo === 'jobsearch'
                    ? 'bg-lime-400 text-dark-950 font-bold shadow-[0_0_12px_rgba(163,230,53,0.4)]'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
                data-cursor="JOBS"
              >
                <Briefcase size={13} />
                <span>AI Job Matcher</span>
              </button>

              <button
                onClick={() => openDemoSandbox('rag')}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
                  activeDemo === 'rag'
                    ? 'bg-purple-500 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
                data-cursor="RAG"
              >
                <Layers size={13} />
                <span>RAG Chatbot</span>
              </button>

              <button
                onClick={() => openDemoSandbox('syncity')}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
                  activeDemo === 'syncity'
                    ? 'bg-cyan-400 text-dark-950 font-bold shadow-[0_0_12px_rgba(0,245,212,0.4)]'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
                data-cursor="SYNCITY"
              >
                <Car size={13} />
                <span>SynCity AV</span>
              </button>

              <button
                onClick={() => openDemoSandbox('signdetect')}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
                  activeDemo === 'signdetect'
                    ? 'bg-amber-400 text-dark-950 font-bold shadow-[0_0_12px_rgba(251,146,60,0.4)]'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
                data-cursor="VISION"
              >
                <Eye size={13} />
                <span>SignDetect AI</span>
              </button>
            </div>
          </div>

          {/* Render Active Demo Component */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {activeDemo === 'weather' && <WeatherDemo />}
              {activeDemo === 'jobsearch' && <JobSearchDemo />}
              {activeDemo === 'rag' && <RAGDemo />}
              {activeDemo === 'syncity' && <SynCityDemo />}
              {activeDemo === 'signdetect' && <SignDetectDemo />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/10 group relative"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {project.index} // {project.category.split('/')[0]}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <Star size={12} className="text-amber-400" />
                    <span>{project.stars}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-lime-400 mt-1 mb-3">
                  {project.tagline}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => openDemoSandbox(project.demoType)}
                  className="px-3 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold hover:bg-cyan-500/25 transition-all flex items-center gap-1.5"
                  data-cursor="DEMO"
                >
                  <Play size={12} />
                  <span>Launch Sandbox</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playClick()
                      setSelectedCaseStudy(project)
                    }}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all"
                    title="Read Case Study"
                    data-cursor="STUDY"
                  >
                    <ArrowUpRight size={15} />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all"
                    title="View GitHub Repository"
                    data-cursor="GITHUB"
                  >
                    <Github size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCaseStudy(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-dark-950/95 border border-cyan-500/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,245,212,0.2)] text-slate-200 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {selectedCaseStudy.index} // CASE STUDY
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {selectedCaseStudy.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedCaseStudy.category}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 my-6 text-xs leading-relaxed">
                <div>
                  <h4 className="text-cyan-400 font-mono font-bold uppercase mb-1">
                    01 // THE PROBLEM STATEMENT
                  </h4>
                  <p className="text-slate-300 font-sans text-sm">
                    {selectedCaseStudy.details.problem}
                  </p>
                </div>

                <div>
                  <h4 className="text-lime-400 font-mono font-bold uppercase mb-1">
                    02 // SYSTEM ARCHITECTURE & ENGINEERING
                  </h4>
                  <p className="text-slate-300 font-sans text-sm">
                    {selectedCaseStudy.details.architecture}
                  </p>
                </div>

                <div>
                  <h4 className="text-purple-400 font-mono font-bold uppercase mb-1">
                    03 // MEASURABLE OUTCOMES & BENCHMARKS
                  </h4>
                  <p className="text-slate-300 font-sans text-sm">
                    {selectedCaseStudy.details.outcome}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const demoType = selectedCaseStudy.demoType
                    setSelectedCaseStudy(null)
                    openDemoSandbox(demoType)
                  }}
                  className="cyber-btn-primary !py-2.5 text-xs"
                >
                  <Play size={13} />
                  <span>Launch Live Interactive Demo</span>
                </button>

                <a
                  href={selectedCaseStudy.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cyber-btn-secondary !py-2.5 text-xs"
                >
                  <Github size={13} />
                  <span>Open GitHub Repository</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}