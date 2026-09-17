'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, Copy, Sparkles, MessageSquare, Coffee, Heart } from 'lucide-react'
import { sound } from './SoundFeedback'

export default function QuickBriefBuilder() {
  const [roleType, setRoleType] = useState('Full-Time AI / ML Engineer')
  const [timeline, setTimeline] = useState('Immediate / Next 30 Days')
  const [primaryFocus, setPrimaryFocus] = useState('RAG & LLM Systems')
  const [copied, setCopied] = useState(false)

  const emailSubject = encodeURIComponent(`Collaboration Inquiry: ${roleType} (${timeline})`)
  const emailBody = encodeURIComponent(
`Hi Karthik,

I came across your portfolio and interactive project demos. We are looking for talent in ${primaryFocus} and are interested in discussing an opportunity for a ${roleType}.

Timeline: ${timeline}
Key focus areas: ${primaryFocus}

Looking forward to connecting!
`
  )

  const mailtoUrl = `mailto:karthikeyalucky5585@gmail.com?subject=${emailSubject}&body=${emailBody}`

  const handleCopy = () => {
    sound.playClick()
    navigator.clipboard.writeText(decodeURIComponent(emailBody))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <Sparkles size={13} /> Quick Collaboration Brief
          </span>
          <h4 className="text-xl md:text-2xl font-bold text-white mt-1">
            Let&apos;s build something exceptional together.
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Q2/Q3 2026 Opportunities</span>
        </div>
      </div>

      <div className="space-y-5">
        {/* Step 1: Engagement Type */}
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-2">
            01 // WHAT KIND OF OPPORTUNITY OR PROJECT?
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              'Full-Time AI / ML Engineer',
              'Autonomous Systems & AV Simulation',
              'Full-Stack AI Product Builder',
              'Open-Source / Technical Advisory',
            ].map(item => (
              <button
                key={item}
                onClick={() => {
                  sound.playClick()
                  setRoleType(item)
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  roleType === item
                    ? 'bg-cyan-500 text-dark-950 font-bold shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:border-white/20'
                }`}
                data-cursor="SELECT"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Primary Tech Focus */}
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-2">
            02 // PRIMARY TECHNICAL FOCUS:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              'RAG & LLM Systems',
              'Weather & Time-Series Neural Models',
              'SUMO / TraCI Traffic Simulation',
              'Next.js & Full-Stack AI Products',
            ].map(item => (
              <button
                key={item}
                onClick={() => {
                  sound.playClick()
                  setPrimaryFocus(item)
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  primaryFocus === item
                    ? 'bg-lime-400 text-dark-950 font-bold shadow-[0_0_12px_rgba(163,230,53,0.3)]'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:border-white/20'
                }`}
                data-cursor="SELECT"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Timeline */}
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-2">
            03 // TARGET TIMELINE:
          </label>
          <div className="flex flex-wrap gap-2">
            {['Immediate / Next 30 Days', 'Summer 2026', 'Fall 2026', 'Flexible / Coffee Chat'].map(item => (
              <button
                key={item}
                onClick={() => {
                  sound.playClick()
                  setTimeline(item)
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  timeline === item
                    ? 'bg-purple-500 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:border-white/20'
                }`}
                data-cursor="SELECT"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-400 font-sans max-w-md">
            Direct channel to Karthik&apos;s personal inbox. Pre-formatted with your selected parameters for rapid response.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
              data-cursor="COPY"
            >
              {copied ? <Check size={13} className="text-lime-400" /> : <Copy size={13} />}
              <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
            </button>

            <a
              href={mailtoUrl}
              className="cyber-btn-primary !py-2.5 !px-5 text-xs"
              data-cursor="SEND"
            >
              <span>Send via Mail Client</span>
              <Send size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
