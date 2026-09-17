'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [activeLabel, setActiveLabel] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })

      // Check if target or ancestor has data-cursor
      const target = (e.target as HTMLElement).closest('[data-cursor]')
      if (target) {
        setActiveLabel(target.getAttribute('data-cursor') || '')
        setIsHovered(true)
      } else {
        const isClickable = (e.target as HTMLElement).closest('button, a, input, [role="button"]')
        if (isClickable) {
          setActiveLabel('')
          setIsHovered(true)
        } else {
          setActiveLabel('')
          setIsHovered(false)
        }
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f5d4]"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
          transition: 'transform 0.05s linear',
        }}
      />

      {/* Trailing Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border flex items-center justify-center transition-all duration-200 ${
          isHovered
            ? 'w-14 h-14 -ml-7 -mt-7 border-cyan-400/80 bg-cyan-500/10 backdrop-blur-[2px] shadow-[0_0_15px_rgba(0,245,212,0.3)]'
            : 'w-8 h-8 -ml-4 -mt-4 border-cyan-400/30'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        {activeLabel && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase px-1">
            {activeLabel}
          </span>
        )}
      </motion.div>
    </div>
  )
}
