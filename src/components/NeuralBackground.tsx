'use client'

import React, { useEffect, useState } from 'react'

export default function NeuralBackground() {
  const [latency, setLatency] = useState(12)
  const [activePacket, setActivePacket] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => 10 + Math.floor(Math.sin(Date.now() / 1000) * 4) + Math.floor(Math.random() * 3))
      setActivePacket(prev => (prev + 1) % 12)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const nodes = [
    { x: 12, y: 22, size: 4 },
    { x: 26, y: 55, size: 5 },
    { x: 38, y: 18, size: 3.5 },
    { x: 45, y: 70, size: 5.5 },
    { x: 58, y: 34, size: 4 },
    { x: 68, y: 64, size: 5 },
    { x: 79, y: 26, size: 3.5 },
    { x: 88, y: 52, size: 4.5 },
    { x: 92, y: 30, size: 3 },
    { x: 30, y: 85, size: 4 },
    { x: 72, y: 86, size: 4.5 },
  ]

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [2, 6], [3, 4], [3, 9],
    [4, 5], [4, 6], [5, 7], [5, 10], [6, 8], [6, 7], [7, 8], [9, 10], [1, 9]
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Ambient radial glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px]" />

      {/* Subtle cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-40" />

      {/* Neural Network SVG */}
      <svg className="w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cyberLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Connections */}
        {edges.map(([from, to], i) => (
          <line
            key={`edge-${i}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke={i === activePacket ? '#00f5d4' : 'url(#cyberLineGrad)'}
            strokeWidth={i === activePacket ? '0.35' : '0.15'}
            strokeDasharray={i % 2 === 0 ? '0.8, 0.4' : undefined}
            className="transition-all duration-700"
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Pulsing outer aura on key nodes */}
            {i % 3 === 0 && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size * 0.45}
                fill="#00f5d4"
                opacity="0.15"
                className="animate-ping"
                style={{ animationDuration: `${3 + (i % 3)}s` }}
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.22}
              fill={i % 2 === 0 ? '#00f5d4' : '#a855f7'}
              opacity="0.8"
            />
          </g>
        ))}
      </svg>

      {/* Floating high-tech telemetry chips in corners */}
      <div className="hidden lg:flex absolute top-24 right-8 items-center gap-2 px-3 py-1 rounded-md bg-black/40 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>NEURAL LATENCY: {latency}ms</span>
      </div>

      <div className="hidden lg:flex absolute bottom-8 left-8 items-center gap-2 px-3 py-1 rounded-md bg-black/40 border border-lime-500/20 text-[10px] font-mono text-lime-400 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
        <span>SYS_STATUS: ONLINE / 2026.04</span>
      </div>
    </div>
  )
}
