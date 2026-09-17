'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, CheckCircle, Copy, Sparkles, ArrowUp, MessageSquare } from 'lucide-react'
import QuickBriefBuilder from './QuickBriefBuilder'
import { sound } from './SoundFeedback'

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formSent, setFormSent] = useState(false)

  const handleCopyEmail = () => {
    sound.playClick()
    navigator.clipboard.writeText('karthikeyalucky5585@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formMessage.trim()) return

    sound.playSuccess()
    const mailSubject = encodeURIComponent(`Portfolio Message from ${formName}`)
    const mailBody = encodeURIComponent(`From: ${formName} (${formEmail})\n\nMessage:\n${formMessage}`)
    window.location.href = `mailto:karthikeyalucky5585@gmail.com?subject=${mailSubject}&body=${mailBody}`
    setFormSent(true)
  }

  const scrollToTop = () => {
    sound.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>05 // OPEN CHANNELS & COLLABORATION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Let&apos;s engineer <span className="gradient-text">what comes next</span>.
          </h2>
          <p className="text-slate-400 text-base md:text-lg mt-4 leading-relaxed">
            Whether you are hiring for an AI / Machine Learning role, developing autonomous systems,
            or looking to collaborate on research, my inbox is always open.
          </p>
        </div>

        {/* Quick Brief Builder */}
        <div className="mb-14">
          <QuickBriefBuilder />
        </div>

        {/* Direct Comms & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Comms Card */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase block mb-1">
                DIRECT CHANNELS
              </span>
              <h3 className="text-2xl font-bold text-white">
                Connect Directly
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Response time typically within 24 hours. Based in Hyderabad (IST, UTC+5:30), flexible for global timezones.
              </p>
            </div>

            {/* Email Card with 1-click copy */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-3">
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-slate-400 block">PRIMARY INBOX</span>
                <span className="text-xs md:text-sm font-mono text-cyan-300 font-semibold truncate block">
                  karthikeyalucky5585@gmail.com
                </span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="shrink-0 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all"
                title="Copy Email"
                data-cursor="COPY"
              >
                {copiedEmail ? <CheckCircle size={16} className="text-lime-400" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Social Channels List */}
            <div className="space-y-2.5">
              <a
                href="https://www.linkedin.com/in/karthikeya-chandika"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
                data-cursor="LINKEDIN"
              >
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-cyan-400" />
                  <span>linkedin.com/in/karthikeya-chandika</span>
                </div>
                <span className="text-slate-500">↗</span>
              </a>

              <a
                href="https://github.com/ckarthik77"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
                data-cursor="GITHUB"
              >
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-lime-400" />
                  <span>github.com/ckarthik77</span>
                </div>
                <span className="text-slate-500">↗</span>
              </a>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 md:p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Send a Quick Note
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out your thought or proposal and we&apos;ll open your default mail client with everything formatted.
            </p>

            <form onSubmit={handleDirectSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  YOUR NAME / ORGANIZATION:
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Elena Rostova / Autonomous AI Lab"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  YOUR EMAIL ADDRESS:
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={e => setFormEmail(e.target.value)}
                  placeholder="e.g. elena@domain.com"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  MESSAGE / PROJECT DETAILS:
                </label>
                <textarea
                  required
                  rows={4}
                  value={formMessage}
                  onChange={e => setFormMessage(e.target.value)}
                  placeholder="Tell me about the role, project, or technical question..."
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full cyber-btn-primary !py-3 text-xs"
                data-cursor="DISPATCH"
              >
                <Send size={14} />
                <span>Launch Mail Client with Pre-filled Message</span>
              </button>

              {formSent && (
                <p className="text-xs font-mono text-lime-400 text-center mt-2 flex items-center justify-center gap-1.5">
                  <CheckCircle size={13} />
                  <span>Mail client triggered! Looking forward to connecting.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <span>CHANDIKA KARTHIKEYA © 2026</span>
            <span className="mx-2">·</span>
            <span>HYDERABAD, INDIA</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-cyan-400 flex items-center gap-1">
              <Sparkles size={12} /> CRAFTED WITH REACT &amp; NEXT.JS
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all flex items-center gap-1"
              data-cursor="TOP"
            >
              <ArrowUp size={14} />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}