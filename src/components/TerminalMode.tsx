'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react'
import { sound } from './SoundFeedback'

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDemo?: (demoId: string) => void;
}

export default function TerminalMode({ isOpen, onClose, onNavigateToDemo }: TerminalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: 'boot',
      output: (
        <div className="text-slate-300 space-y-1 font-mono text-xs">
          <p className="text-cyan-400 font-bold">KARTHIKEYA.DEV TERMINAL KERNEL v2.6.0</p>
          <p>Chandika Karthik — AI Engineer, Autonomous Mobility & Full-Stack Builder</p>
          <p className="text-slate-400">Type <span className="text-lime-400">help</span> to view available commands.</p>
        </div>
      ),
    },
  ])
  const [isExpanded, setIsExpanded] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanCmd = input.trim().toLowerCase()
    if (!cleanCmd) return

    sound.playClick()
    let response: React.ReactNode = ''

    switch (cleanCmd) {
      case 'help':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">Available Commands:</p>
            <p><span className="text-lime-400 w-28 inline-block">projects</span> - List all featured projects & live sandboxes</p>
            <p><span className="text-lime-400 w-28 inline-block">weather</span> - Launch Weather Prediction AI Demo</p>
            <p><span className="text-lime-400 w-28 inline-block">rag</span> - Launch RAG Knowledge Chatbot Demo</p>
            <p><span className="text-lime-400 w-28 inline-block">syncity</span> - Launch SynCity Traffic Simulator Demo</p>
            <p><span className="text-lime-400 w-28 inline-block">jobs</span> - Launch AI Job & Resume Matcher Demo</p>
            <p><span className="text-lime-400 w-28 inline-block">vision</span> - Launch SignDetect Computer Vision Demo</p>
            <p><span className="text-lime-400 w-28 inline-block">skills</span> - Display neural & full-stack tech stack</p>
            <p><span className="text-lime-400 w-28 inline-block">map</span> - Jump to Geospatial Telemetry Radar</p>
            <p><span className="text-lime-400 w-28 inline-block">contact</span> - Display email and communication links</p>
            <p><span className="text-lime-400 w-28 inline-block">hire</span> - Open interactive hiring brief</p>
            <p><span className="text-lime-400 w-28 inline-block">clear</span> - Clear terminal buffer</p>
          </div>
        )
        break
      case 'projects':
        response = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-cyan-400 font-bold">Featured Projects:</p>
            <p>1. <span className="text-white font-bold">Weather Prediction AI</span> - Multi-horizon LSTM ensemble for atmospheric telemetry.</p>
            <p>2. <span className="text-white font-bold">AI Job Search & Matcher</span> - FAISS cosine resume alignment engine.</p>
            <p>3. <span className="text-white font-bold">RAG Chatbot</span> - FastAPI + LangChain + Gemini PDF retrieval engine.</p>
            <p>4. <span className="text-white font-bold">SynCity</span> - SUMO & TraCI autonomous vehicle-to-infrastructure simulator.</p>
            <p>5. <span className="text-white font-bold">SignDetect AI</span> - Edge-ready computer vision road perception.</p>
          </div>
        )
        break
      case 'weather':
      case 'rag':
      case 'syncity':
      case 'jobs':
      case 'vision':
        response = <span className="text-lime-400">Jumping to live demo sandbox...</span>
        onNavigateToDemo?.(cleanCmd)
        break
      case 'skills':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">Technical Core:</p>
            <p><b className="text-lime-400">AI & ML:</b> PyTorch, TensorFlow, Scikit-learn, LangChain, FAISS, LSTMs, Transformers</p>
            <p><b className="text-cyan-400">Frontend:</b> React 18, Next.js 14, TypeScript, Tailwind CSS, Framer Motion</p>
            <p><b className="text-purple-400">Systems & Backend:</b> Python, FastAPI, Node.js, Express, PostgreSQL, Docker</p>
            <p><b className="text-amber-400">Mobility Simulation:</b> SUMO, TraCI, OpenStreetMap, OpenCV</p>
          </div>
        )
        break
      case 'map':
        response = <span className="text-cyan-400">Navigating to Global Radar Map...</span>
        document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'contact':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-lime-400">Direct Comms Channel:</p>
            <p>Email: <a href="mailto:karthikeyalucky5585@gmail.com" className="text-cyan-300 underline">karthikeyalucky5585@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/ckarthik77" target="_blank" rel="noreferrer" className="text-cyan-300 underline">github.com/ckarthik77</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/karthikeya-chandika" target="_blank" rel="noreferrer" className="text-cyan-300 underline">linkedin.com/in/karthikeya-chandika</a></p>
          </div>
        )
        break
      case 'hire':
        response = <span className="text-lime-400">Routing to Quick Project Brief Builder...</span>
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      default:
        response = (
          <span className="text-red-400">
            Command not recognized: &quot;{cleanCmd}&quot;. Type <span className="text-lime-400 font-bold">help</span> for assistance.
          </span>
        )
    }

    setHistory(prev => [...prev, { cmd: input, output: response }])
    setInput('')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className={`w-full ${
            isExpanded ? 'h-[85vh] max-w-5xl' : 'h-[520px] max-w-2xl'
          } rounded-2xl bg-dark-950/95 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,245,212,0.25)] flex flex-col overflow-hidden text-xs font-mono`}
          onClick={e => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-white/10 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-slate-400 text-[11px] flex items-center gap-1.5 font-bold">
                <TerminalIcon size={13} className="text-cyan-400" />
                karthik@interactive-shell:~
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:text-white transition-all"
                title={isExpanded ? 'Restore' : 'Maximize'}
              >
                {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>
              <button onClick={onClose} className="hover:text-white transition-all" title="Close">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {item.cmd && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="text-lime-400 font-bold">karthik@portfolio:~$</span>
                    <span>{item.cmd}</span>
                  </div>
                )}
                <div className="pl-4 text-slate-300">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Prompt */}
          <form onSubmit={handleCommand} className="p-3 bg-black/90 border-t border-white/10 flex items-center gap-2">
            <span className="text-lime-400 font-bold">karthik@portfolio:~$</span>
            <input
              type="text"
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type help, weather, rag, skills, hire..."
              className="flex-1 bg-transparent text-white font-mono focus:outline-none placeholder-slate-600 text-xs"
            />
            <button type="submit" className="text-cyan-400 hover:text-cyan-300">
              <CornerDownLeft size={14} />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
