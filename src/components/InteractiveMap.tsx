'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, MapPin, Radio, Wifi, Compass, Layers, ExternalLink, Clock, Zap } from 'lucide-react'
import { sound } from './SoundFeedback'

interface MapNode {
  id: string;
  name: string;
  country: string;
  coords: string;
  lat: number;
  lng: number; // For SVG projection x, y percentage
  svgX: number;
  svgY: number;
  type: string;
  description: string;
  activeProject: string;
  latency: number;
  timezoneOffset: number; // hours from UTC
  link: string;
}

const NODES: MapNode[] = [
  {
    id: 'hyderabad',
    name: 'Hyderabad (T-Hub / Cyberabad)',
    country: 'India',
    coords: '17.3850° N, 78.4867° E',
    lat: 17.3850,
    lng: 78.4867,
    svgX: 68,
    svgY: 48,
    type: 'PRIMARY BASE // AI & DATA SCIENCE',
    description: 'Core innovation base: Deep learning architectures, SynCity SUMO simulation, and RAG pipelines.',
    activeProject: 'SynCity & RAG Chatbot Engine',
    latency: 8,
    timezoneOffset: 5.5,
    link: 'https://github.com/ckarthik77/SynCity',
  },
  {
    id: 'san-francisco',
    name: 'San Francisco & Silicon Valley',
    country: 'United States',
    coords: '37.7749° N, 122.4194° W',
    lat: 37.7749,
    lng: -122.4194,
    svgX: 18,
    svgY: 34,
    type: 'FRONTIER AI // CLOUD DEPLOYMENTS',
    description: 'Vercel serverless edge deployment nodes, Next.js application frameworks, and open LLM tooling.',
    activeProject: 'Global Edge Cloud & AI Job Matcher',
    latency: 142,
    timezoneOffset: -7,
    link: 'https://karthik-portfolio.vercel.app',
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    coords: '51.5074° N, 0.1278° W',
    lat: 51.5074,
    lng: -0.1278,
    svgX: 47,
    svgY: 26,
    type: 'OPEN SOURCE // DISTRIBUTED SYSTEMS',
    description: 'Open source community collaboration, developer tools, and algorithm benchmarking.',
    activeProject: 'JavaScript Algorithms & Open Source',
    latency: 88,
    timezoneOffset: 1,
    link: 'https://github.com/ckarthik77/welcome-to-open-source',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    coords: '35.6762° N, 139.6503° E',
    lat: 35.6762,
    lng: 139.6503,
    svgX: 84,
    svgY: 36,
    type: 'AUTONOMOUS MOBILITY // ROBOTICS',
    description: 'Vision perception experiments, intelligent infrastructure research, and camera frame optimization.',
    activeProject: 'SignDetect AI Computer Vision',
    latency: 110,
    timezoneOffset: 9,
    link: 'https://github.com/ckarthik77/Sign-detection',
  },
  {
    id: 'zurich',
    name: 'Zurich',
    country: 'Switzerland',
    coords: '47.3769° N, 8.5417° E',
    lat: 47.3769,
    lng: 8.5417,
    svgX: 51,
    svgY: 30,
    type: 'SIMULATION // APPLIED ALGORITHMS',
    description: 'Urban mobility modeling, micro-simulation optimization, and traffic queue reduction experiments.',
    activeProject: 'TraCI Telemetry Framework',
    latency: 94,
    timezoneOffset: 2,
    link: 'https://github.com/ckarthik77/SynCity',
  },
]

export default function InteractiveMap() {
  const [selectedNode, setSelectedNode] = useState<MapNode>(NODES[0])
  const [activeViewMode, setActiveViewMode] = useState<'global' | 'syncity' | 'radar'>('global')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [localTimes, setLocalTimes] = useState<Record<string, string>>({})

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const times: Record<string, string> = {}
      NODES.forEach(node => {
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
        const nodeTime = new Date(utc + (3600000 * node.timezoneOffset))
        times[node.id] = nodeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      })
      setLocalTimes(times)
    }

    updateTimes()
    const timer = setInterval(updateTimes, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleNodeClick = (node: MapNode) => {
    sound.playBlip(850)
    setSelectedNode(node)
  }

  return (
    <section id="map" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold">
                04 // GEOSPATIAL INTELLIGENCE & TELEMETRY
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Global <span className="gradient-text">Research Footprint</span>.
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
              Real-time interactive geospatial radar tracking research hubs, simulation networks, and deployment endpoints.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <button
              onClick={() => {
                sound.playClick()
                setActiveViewMode('global')
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeViewMode === 'global' ? 'bg-cyan-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              data-cursor="MODE"
            >
              Global Nodes
            </button>
            <button
              onClick={() => {
                sound.playClick()
                setActiveViewMode('syncity')
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeViewMode === 'syncity' ? 'bg-cyan-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              data-cursor="MODE"
            >
              SynCity Mesh
            </button>
            <button
              onClick={() => {
                sound.playClick()
                setActiveViewMode('radar')
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeViewMode === 'radar' ? 'bg-cyan-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              data-cursor="MODE"
            >
              Satellite Radar
            </button>
          </div>
        </div>

        {/* Map Stage Container */}
        <div
          className="glass-card rounded-3xl p-4 md:p-8 border border-white/10 relative overflow-hidden select-none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setMousePos({
              x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
              y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
            })
          }}
        >
          {/* Radar Sweep Effect (Visible in radar/all modes) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
            <div className="w-[120%] h-[120%] -left-[10%] -top-[10%] absolute radar-sweep rounded-full bg-gradient-to-tr from-transparent via-cyan-500/10 to-transparent" />
          </div>

          {/* Interactive World Map Canvas/SVG */}
          <div className="relative w-full aspect-[2/1] min-h-[340px] md:min-h-[460px] bg-dark-950/80 rounded-2xl border border-cyan-500/20 overflow-hidden flex items-center justify-center">
            {/* Latitude / Longitude Matrix Grid */}
            <div className="absolute inset-0 cyber-grid-bg opacity-30" />

            {/* Latitude lines */}
            {[20, 40, 60, 80].map(lat => (
              <div
                key={`lat-${lat}`}
                className="absolute inset-x-0 border-t border-cyan-500/10"
                style={{ top: `${lat}%` }}
              />
            ))}
            {/* Longitude lines */}
            {[20, 40, 60, 80].map(lng => (
              <div
                key={`lng-${lng}`}
                className="absolute inset-y-0 border-l border-cyan-500/10"
                style={{ left: `${lng}%` }}
              />
            ))}

            {/* Stylized Vector World Continents Silhouettes in SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Simplified world map shapes */}
              {/* North America */}
              <path
                d="M 120 100 Q 180 80 250 110 T 260 200 T 210 260 T 140 200 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              {/* South America */}
              <path
                d="M 240 280 Q 290 310 280 390 T 220 440 T 210 320 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              {/* Europe */}
              <path
                d="M 450 110 Q 520 100 540 160 T 470 190 T 430 140 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              {/* Africa */}
              <path
                d="M 460 210 Q 550 220 540 330 T 480 390 T 440 250 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              {/* Asia */}
              <path
                d="M 550 90 Q 750 80 820 160 T 780 280 T 630 260 T 560 170 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />
              {/* Australia */}
              <path
                d="M 760 340 Q 840 330 850 400 T 780 420 T 740 370 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1"
              />

              {/* Connecting Flight/Data Arcs from Hyderabad (svgX: 680, svgY: 240) */}
              {NODES.filter(n => n.id !== 'hyderabad').map(node => (
                <path
                  key={`arc-${node.id}`}
                  d={`M 680 240 Q ${(680 + node.svgX * 10) / 2} ${Math.min(240, node.svgY * 5) - 40} ${node.svgX * 10} ${node.svgY * 5}`}
                  fill="none"
                  stroke="url(#arcGradient)"
                  strokeWidth="1.5"
                  strokeDasharray="4, 4"
                  className="animate-pulse"
                />
              ))}
            </svg>

            {/* Interactive Pins / Nodes */}
            {NODES.map(node => {
              const isSelected = selectedNode.id === node.id
              return (
                <div
                  key={node.id}
                  className="absolute cursor-pointer transition-transform duration-300"
                  style={{
                    left: `${node.svgX}%`,
                    top: `${node.svgY}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => handleNodeClick(node)}
                  data-cursor={node.id.toUpperCase()}
                >
                  {/* Outer Pulsing Beacon */}
                  <div
                    className={`w-10 h-10 -ml-5 -mt-5 absolute rounded-full ${
                      isSelected
                        ? 'bg-cyan-400/30 animate-ping'
                        : 'bg-cyan-500/10 hover:bg-cyan-500/20'
                    }`}
                  />

                  {/* Core Pin Dot */}
                  <div
                    className={`relative w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-cyan-400 border-white shadow-[0_0_20px_#00f5d4] scale-125'
                        : 'bg-dark-950 border-cyan-400 hover:scale-110'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Label Pill */}
                  <div
                    className={`absolute top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-cyan-400 text-dark-950 font-bold shadow-[0_0_10px_rgba(0,245,212,0.5)]'
                        : 'bg-black/75 text-slate-300 border border-white/10 hover:text-white'
                    }`}
                  >
                    {node.name.split(' ')[0]}
                  </div>
                </div>
              )
            })}

            {/* HUD Overlay in Corner */}
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-cyan-500/30 rounded-xl p-2.5 text-[10px] font-mono text-slate-300 pointer-events-none space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Radio size={12} className="animate-pulse" />
                <span>ACTIVE HUD TRACKER</span>
              </div>
              <div>COORDS: {mousePos.x}°N, {mousePos.y}°E</div>
              <div>RADAR BAND: X-BAND 9.4 GHz</div>
              <div className="text-lime-400">NODES ONLINE: 5 / 5 OPERATIONAL</div>
            </div>
          </div>

          {/* Node Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-5 md:p-6 rounded-2xl bg-white/5 border border-cyan-500/30 backdrop-blur-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-8 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold">
                    {selectedNode.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <MapPin size={12} className="text-cyan-400" />
                    {selectedNode.coords}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>{selectedNode.name}</span>
                  <span className="text-slate-400 font-normal text-lg">({selectedNode.country})</span>
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {selectedNode.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                  <span className="text-cyan-300">
                    Active Focus: <b className="text-white">{selectedNode.activeProject}</b>
                  </span>
                </div>
              </div>

              {/* Node Telemetry Card */}
              <div className="md:col-span-4 p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock size={12} className="text-cyan-400" /> Local Time:
                  </span>
                  <span className="text-white font-bold">{localTimes[selectedNode.id] || '--:--'}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Wifi size={12} className="text-lime-400" /> Ping Latency:
                  </span>
                  <span className="text-lime-300 font-bold">{selectedNode.latency} ms</span>
                </div>

                <a
                  href={selectedNode.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 w-full py-2 px-3 rounded-lg bg-cyan-500 text-dark-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,245,212,0.3)]"
                  data-cursor="NODE"
                >
                  <span>Inspect Active Repository</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
