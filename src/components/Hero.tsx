'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ChevronDown, Github, Linkedin, Mail, Play, MapPin, Sparkles, ArrowRight, Brain, Activity, Cpu } from 'lucide-react'
import { sound } from './SoundFeedback'

export default function Hero() {
  const scrollToDemos = () => {
    sound.playClick()
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToMap = () => {
    sound.playClick()
    document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(0,245,212,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold">AI & DATA SCIENCE RESEARCHER</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">OPEN FOR HIGH-IMPACT ROLES 2026</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Engineering intelligence into{' '}
            <span className="gradient-text">everyday systems</span>.
          </h1>

          {/* Dynamic Typewriter Sequence */}
          <div className="text-lg sm:text-2xl md:text-3xl font-mono text-slate-300 font-semibold h-10 flex items-center justify-center gap-2">
            <span className="text-slate-500">~/role:</span>
            <TypeAnimation
              sequence={[
                'AI & Machine Learning Engineer',
                2200,
                'Autonomous Mobility Researcher',
                2200,
                'RAG & Generative AI Specialist',
                2200,
                'Full-Stack Systems Technologist',
                2200,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              className="text-cyan-400 font-mono"
            />
          </div>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed pt-2">
            I design and ship applied machine learning models, urban mobility simulators (SUMO/TraCI),
            and production full-stack interfaces that make complex neural architectures intuitive and useful.
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center items-center mt-10"
        >
          <button
            onClick={scrollToDemos}
            className="cyber-btn-primary"
            data-cursor="DEMOS"
          >
            <Play size={16} />
            <span>Explore Live Interactive Sandboxes</span>
          </button>

          <button
            onClick={scrollToMap}
            className="cyber-btn-secondary"
            data-cursor="MAP"
          >
            <MapPin size={16} className="text-cyan-400" />
            <span>Interactive Radar Map</span>
          </button>
        </motion.div>

        {/* Telemetry Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-16 max-w-4xl w-full"
        >
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-300">5+</span>
            <span className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wider text-center">
              Active AI Sandboxes
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-lime-300">-37.4%</span>
            <span className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wider text-center">
              SynCity Traffic Delay
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-purple-300">&lt; 4.2ms</span>
            <span className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wider text-center">
              FAISS Vector Latency
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-300">98.8%</span>
            <span className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wider text-center">
              SignDetect Accuracy
            </span>
          </div>
        </motion.div>

        {/* Social Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-3 mt-10"
        >
          <a
            href="https://github.com/ckarthik77"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
            title="GitHub Profile"
            data-cursor="GITHUB"
          >
            <Github size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/karthikeya-chandika"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
            title="LinkedIn Profile"
            data-cursor="LINKEDIN"
          >
            <Linkedin size={18} />
          </a>

          <a
            href="mailto:karthikeyalucky5585@gmail.com"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
            title="Email Direct"
            data-cursor="MAIL"
          >
            <Mail size={18} />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-12">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-slate-500 hover:text-cyan-400 transition-colors animate-bounce"
            aria-label="Scroll to About"
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}