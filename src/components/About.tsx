'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Cpu, Terminal, Network, Sparkles, Heart, Compass, BookOpen, Music, Code2, ArrowUpRight } from 'lucide-react'

export default function About() {
  const pillars = [
    {
      icon: Brain,
      title: 'Neural & Time-Series AI',
      color: 'cyan',
      description: 'Designing deep architectures with LSTMs, GRUs, and Transformers for micro-climate atmospheric predictions and sequential telemetry.',
    },
    {
      icon: Network,
      title: 'Urban Mobility & SUMO',
      color: 'lime',
      description: 'Simulating complex multi-agent vehicular networks with SUMO and TraCI to eliminate corridor bottlenecks with dynamic signal actuation.',
    },
    {
      icon: Terminal,
      title: 'Full-Stack Product Craft',
      color: 'purple',
      description: 'Building ultra-responsive Next.js & React interfaces hooked to asynchronous FastAPI vector retrieval services and Gemini LLMs.',
    },
    {
      icon: Cpu,
      title: 'Edge Computer Vision',
      color: 'amber',
      description: 'Deploying optimized convolutional models (YOLO, OpenCV) capable of sub-15ms frame evaluation for real-time traffic safety.',
    },
  ]

  const passions = [
    { label: 'Autonomous Driving & SUMO', icon: Compass },
    { label: 'Generative AI & Vector Stores', icon: Sparkles },
    { label: 'Atmospheric Physics & Weather', icon: Brain },
    { label: 'Open Source Community', icon: Code2 },
    { label: 'Electronic Sound Design', icon: Music },
  ]

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>01 // THE HUMAN & ENGINEERING STORY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Curiosity turned into <span className="gradient-text">production code</span>.
          </h2>
          <p className="text-slate-400 text-base md:text-lg mt-4 leading-relaxed">
            I am Chandika Karthik — an AI engineer and full-stack technologist based in India.
            My work lives at the intersection where statistical models meet human-centric software.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-cyan-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Philosophy & Human Touch Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Narrative */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 md:p-10 border border-white/10 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-bold">
                ENGINEERING PHILOSOPHY
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                &ldquo;Learn the system, locate the friction, build a clearer way through.&rdquo;
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether diagnosing vehicular queue propagation in a multi-intersection simulation or
                optimizing vector recall latency in FAISS, I treat software engineering not as an
                abstract exercise, but as a discipline of crafting tangible artifacts that solve
                palpable bottlenecks.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                I enjoy taking complex, opaque concepts—such as multi-horizon LSTM attention maps or
                asynchronous TCP socket listeners in TraCI—and translating them into interactive web
                surfaces where anyone can test parameters, inspect predictions, and observe the results in real time.
              </p>
            </div>

            {/* Passions chips */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <span className="text-[11px] font-mono text-slate-400 block mb-3">
                THINGS I THINK &amp; BUILD AROUND:
              </span>
              <div className="flex flex-wrap gap-2">
                {passions.map(p => {
                  const Icon = p.icon
                  return (
                    <span
                      key={p.label}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                    >
                      <Icon size={13} className="text-cyan-400" />
                      <span>{p.label}</span>
                    </span>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Facts / Human Profile */}
          <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-dark-900 to-black border border-cyan-500/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5 flex items-center justify-center shadow-[0_0_25px_rgba(0,245,212,0.3)]">
                <div className="w-full h-full bg-dark-950 rounded-2xl flex items-center justify-center font-mono font-black text-2xl text-cyan-300">
                  CK
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">Chandika Karthik</h4>
                <p className="text-xs font-mono text-cyan-400">Hyderabad, India // Remote Global</p>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                  <span className="text-slate-500">Degree:</span>
                  <span>B.Tech in AI &amp; Data Science</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                  <span className="text-slate-500">Focus:</span>
                  <span>Machine Learning &amp; Mobility</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10 text-slate-300">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-lime-400 font-bold">Open to Opportunities</span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span className="text-slate-500">Working Style:</span>
                  <span>Autonomous &amp; Systems-First</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/ckarthik77"
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200 hover:text-white hover:border-cyan-400/40 flex items-center justify-center gap-1.5 transition-all"
              data-cursor="GITHUB"
            >
              <span>Explore GitHub Repository</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}