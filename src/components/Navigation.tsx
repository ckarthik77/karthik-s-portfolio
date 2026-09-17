'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, Terminal, Volume2, VolumeX, Sparkles, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from './SoundFeedback'

interface NavigationProps {
  onOpenTerminal: () => void;
}

export default function Navigation({ onOpenTerminal }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSound = () => {
    sound.enabled = !soundEnabled
    setSoundEnabled(!soundEnabled)
    if (!soundEnabled) {
      sound.playSuccess()
    }
  }

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects & Demos', href: '#projects', badge: 'LIVE' },
    { name: 'Radar Map', href: '#map' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group text-white font-mono font-bold tracking-wider text-sm"
            data-cursor="HOME"
          >
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-dark-950 font-black text-base shadow-[0_0_15px_rgba(0,245,212,0.4)] group-hover:scale-105 transition-transform">
              K
            </span>
            <span>
              KARTHIKEYA<span className="text-cyan-400">.</span>DEV
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-all flex items-center gap-1.5"
                data-cursor="GO"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-lime-400 text-dark-950">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
                soundEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
              }`}
              title={soundEnabled ? 'Audio Feedback Enabled' : 'Enable Subtle Futuristic Audio'}
              data-cursor="SOUND"
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            {/* Terminal Drawer Launcher */}
            <button
              onClick={() => {
                sound.playClick()
                onOpenTerminal()
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition-all flex items-center gap-1.5"
              title="Launch Developer CLI"
              data-cursor="CLI"
            >
              <Terminal size={13} className="text-cyan-400" />
              <span>Terminal</span>
              <kbd className="px-1 py-0.5 rounded bg-black/40 text-[9px] text-slate-500 font-mono">
                ~
              </kbd>
            </button>

            {/* Availability Pill */}
            <a
              href="#contact"
              className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1.5 hover:bg-emerald-500/20 transition-all"
              data-cursor="CONNECT"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden lg:inline">Available 2026</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                sound.playClick()
                onOpenTerminal()
              }}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400"
              title="Terminal"
            >
              <Terminal size={17} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-950/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 space-y-2"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-mono text-slate-200 hover:text-cyan-300 hover:bg-white/5"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-lime-400 text-dark-950">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={toggleSound}
                className="flex items-center gap-2 text-xs font-mono text-slate-300"
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span>Sound Feedback: {soundEnabled ? 'ON' : 'OFF'}</span>
              </button>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-xs font-mono text-emerald-400"
              >
                Available 2026
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}