'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Car, Network, Play, Pause, FastForward, ShieldAlert, Cpu, CheckCircle } from 'lucide-react'
import { sound } from '../SoundFeedback'

export default function SynCityDemo() {
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [simSpeed, setSimSpeed] = useState<number>(1)
  const [aiOptimized, setAiOptimized] = useState<boolean>(true)
  const [step, setStep] = useState<number>(1420)
  const [vehiclesInGrid, setVehiclesInGrid] = useState<number>(48)
  const [delayReduced, setDelayReduced] = useState<number>(37.4)
  const [throughput, setThroughput] = useState<number>(128)

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setStep(s => s + 1)
      if (Math.random() > 0.4) {
        setVehiclesInGrid(v => Math.max(35, Math.min(65, v + (Math.random() > 0.5 ? 1 : -1))))
      }
      if (aiOptimized) {
        setDelayReduced(37.4 + (Math.sin(Date.now() / 3000) * 2.2))
        setThroughput(128 + Math.floor(Math.sin(Date.now() / 2500) * 8))
      } else {
        setDelayReduced(0.0)
        setThroughput(94 + Math.floor(Math.sin(Date.now() / 2500) * 5))
      }
    }, 1000 / simSpeed)

    return () => clearInterval(interval)
  }, [isRunning, simSpeed, aiOptimized])

  const toggleRunning = () => {
    sound.playClick()
    setIsRunning(!isRunning)
  }

  const toggleOptimization = () => {
    sound.playBlip(600)
    setAiOptimized(!aiOptimized)
  }

  return (
    <div className="rounded-2xl bg-dark-900/90 border border-cyan-500/20 p-5 md:p-6 text-slate-200 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-cyan-400 font-semibold">
              SynCity SUMO & TraCI Simulation Engine
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            Synchronized Urban Traffic via Autonomous Vehicle & Infrastructure Synergy
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleOptimization}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 border ${
              aiOptimized
                ? 'bg-cyan-500 text-dark-950 border-cyan-400 shadow-[0_0_15px_rgba(0,245,212,0.4)]'
                : 'bg-white/5 border-white/20 text-slate-300'
            }`}
            data-cursor="TOGGLE"
          >
            <Cpu size={13} />
            <span>{aiOptimized ? 'AI Signal Optimization: ACTIVE' : 'Fixed Signal Timers (Static)'}</span>
          </button>
        </div>
      </div>

      {/* Simulator Canvas & Control Bar */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Animated Urban Grid */}
        <div className="lg:col-span-8 rounded-xl bg-black/60 border border-white/10 p-4 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
          {/* Simulation Header */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                TraCI Socket: CONNECTED (127.0.0.1:8813)
              </span>
              <span className="text-[10px] font-mono text-slate-400">Step: #{step}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleRunning}
                className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                data-cursor="PLAY"
              >
                {isRunning ? <Pause size={13} /> : <Play size={13} />}
              </button>
              <button
                onClick={() => setSimSpeed(s => (s === 1 ? 2 : s === 2 ? 4 : 1))}
                className="px-2 py-1 rounded-lg bg-white/10 text-xs font-mono text-cyan-300 hover:bg-white/20 transition-all"
                data-cursor="SPEED"
              >
                {simSpeed}x
              </button>
            </div>
          </div>

          {/* Graphical Street Network */}
          <div className="relative w-full h-44 my-auto flex items-center justify-center">
            {/* Grid roads */}
            <div className="absolute inset-x-0 h-8 bg-slate-900 border-y border-cyan-500/30 flex items-center justify-around">
              <div className="w-full border-t border-dashed border-cyan-500/30" />
            </div>
            <div className="absolute inset-y-0 w-8 bg-slate-900 border-x border-cyan-500/30 flex items-center justify-around">
              <div className="h-full border-l border-dashed border-cyan-500/30" />
            </div>

            {/* Central Smart Traffic Light Intersection */}
            <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-950 border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,245,212,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
              <span className="text-[9px] font-mono font-bold text-cyan-300">V2I</span>
              <span className="text-[8px] font-mono text-slate-400">HUB</span>
            </div>

            {/* Moving autonomous vehicles (Animated SVG particles) */}
            {isRunning && (
              <>
                <motion.div
                  className="absolute w-4 h-2.5 rounded-sm bg-cyan-400 shadow-[0_0_8px_#00f5d4] z-20"
                  animate={{ x: [-160, 160] }}
                  transition={{ repeat: Infinity, duration: 4 / simSpeed, ease: 'linear' }}
                  style={{ top: 'calc(50% - 10px)' }}
                />
                <motion.div
                  className="absolute w-4 h-2.5 rounded-sm bg-lime-400 shadow-[0_0_8px_#a3e635] z-20"
                  animate={{ x: [160, -160] }}
                  transition={{ repeat: Infinity, duration: 3.2 / simSpeed, ease: 'linear', delay: 1 }}
                  style={{ top: 'calc(50% + 2px)' }}
                />
                <motion.div
                  className="absolute w-2.5 h-4 rounded-sm bg-purple-400 shadow-[0_0_8px_#a855f7] z-20"
                  animate={{ y: [-80, 80] }}
                  transition={{ repeat: Infinity, duration: 3.6 / simSpeed, ease: 'linear', delay: 0.5 }}
                  style={{ left: 'calc(50% - 10px)' }}
                />
                <motion.div
                  className="absolute w-2.5 h-4 rounded-sm bg-amber-400 shadow-[0_0_8px_#fb923c] z-20"
                  animate={{ y: [80, -80] }}
                  transition={{ repeat: Infinity, duration: 4.5 / simSpeed, ease: 'linear', delay: 1.5 }}
                  style={{ left: 'calc(50% + 2px)' }}
                />
              </>
            )}
          </div>

          {/* Bottom readout */}
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              <span>Multi-Agent Reinforcement Learning: Q-Routing Active</span>
            </span>
            <span>OSM Topology: Hyderabad Hitech Corridor</span>
          </div>
        </div>

        {/* Telemetry Readouts Column */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono text-slate-400">NETWORK BOTTLENECK RELIEF</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-mono font-bold text-cyan-300">
                {aiOptimized ? `-${delayReduced.toFixed(1)}%` : '0.0%'}
              </span>
              <span className="text-xs text-slate-400">Queue Time</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {aiOptimized
                ? 'LSTM dynamically extended green phases for peak incoming platoons.'
                : 'Static timers causing unnecessary red-light vehicle queueing.'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono text-slate-400">CORRIDOR THROUGHPUT</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-mono font-bold text-lime-300">
                {throughput}
              </span>
              <span className="text-xs text-slate-400">Vehicles / min</span>
            </div>
            <span className="text-[10px] font-mono text-lime-400 block mt-1">
              {aiOptimized ? '+36.2% capacity gain' : 'Baseline flow'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-900/20 to-black border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Active AV Telemetry Agents:</span>
              <span className="text-cyan-300 font-bold">{vehiclesInGrid} nodes</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono mt-1">
              <span className="text-slate-300">CO2 Emission Index:</span>
              <span className="text-emerald-300 font-bold">
                {aiOptimized ? '-28.4% Idling' : 'High Idle Delay'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
