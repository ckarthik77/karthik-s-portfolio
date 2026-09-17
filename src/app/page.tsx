'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'
import NeuralBackground from '@/components/NeuralBackground'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import InteractiveMap from '@/components/InteractiveMap'
import Contact from '@/components/Contact'
import TerminalMode from '@/components/TerminalMode'

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false)

  useEffect(() => {
    // Console Easter Egg for engineers
    console.log(
      '%c🚀 Welcome to Chandika Karthik\'s Portfolio Systems!',
      'color: #00f5d4; font-size: 16px; font-weight: bold;'
    )
    console.log(
      '%c💻 Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion',
      'color: #a3e635; font-size: 12px;'
    )
    console.log(
      '%c📡 Press `~` or click Terminal in the header to open interactive CLI mode',
      'color: #a855f7; font-size: 12px;'
    )

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        // Prevent typing backtick into focused input if toggling terminal
        if (!(e.target as HTMLElement).matches('input, textarea')) {
          e.preventDefault()
          setTerminalOpen(prev => !prev)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main className="min-h-screen bg-[#06090f] text-slate-100 relative selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Dynamic Custom Cursor */}
      <CustomCursor />

      {/* Global Neural Network Background */}
      <NeuralBackground />

      {/* Top Header Navigation */}
      <Navigation onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Page Sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <InteractiveMap />
        <Contact />
      </div>

      {/* Interactive Developer CLI Terminal */}
      <TerminalMode
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onNavigateToDemo={(demoId) => {
          setTerminalOpen(false)
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
    </main>
  )
}