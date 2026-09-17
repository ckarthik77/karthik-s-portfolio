'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Shield, Camera, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'
import { sound } from '../SoundFeedback'

interface Scenario {
  id: string;
  name: string;
  lighting: string;
  fps: number;
  latency: number;
  detections: { label: string; conf: number; box: { top: number; left: number; width: number; height: number }; warning?: boolean }[];
}

const SCENARIOS: Record<string, Scenario> = {
  'intersection': {
    id: 'intersection',
    name: 'Dense Urban Junction',
    lighting: 'Daylight / 10,000 Lux',
    fps: 64,
    latency: 13.8,
    detections: [
      { label: 'Stop Sign (MUTCD R1-1)', conf: 98.8, box: { top: 22, left: 18, width: 22, height: 32 } },
      { label: 'Pedestrian Crosswalk', conf: 95.2, box: { top: 48, left: 52, width: 34, height: 36 } },
      { label: 'Traffic Signal [GREEN]', conf: 99.1, box: { top: 12, left: 62, width: 14, height: 26 } },
    ]
  },
  'highway': {
    id: 'highway',
    name: 'High-Speed Express Corridor',
    lighting: 'Overcast / High Glare',
    fps: 68,
    latency: 12.4,
    detections: [
      { label: 'Speed Limit 100 km/h', conf: 97.6, box: { top: 24, left: 28, width: 20, height: 30 } },
      { label: 'Lane Departure Warning', conf: 94.4, box: { top: 58, left: 15, width: 68, height: 28 } },
    ]
  },
  'night-safety': {
    id: 'night-safety',
    name: 'Low-Light Two-Wheeler Safety Check',
    lighting: 'Night-time / Sodium Lamps (25 Lux)',
    fps: 58,
    latency: 14.6,
    detections: [
      { label: 'No-Helmet Rider Detected', conf: 93.4, box: { top: 28, left: 35, width: 30, height: 44 }, warning: true },
      { label: 'Caution: Reduced Visibility', conf: 91.0, box: { top: 10, left: 10, width: 80, height: 80 } },
    ]
  }
}

export default function SignDetectDemo() {
  const [activeScenarioKey, setActiveScenarioKey] = useState<string>('intersection')
  const [showFeatureMap, setShowFeatureMap] = useState<boolean>(false)

  const scenario = SCENARIOS[activeScenarioKey] || SCENARIOS['intersection']

  const handleSelectScenario = (key: string) => {
    sound.playClick()
    setActiveScenarioKey(key)
  }

  const toggleFeatureMap = () => {
    sound.playBlip(700)
    setShowFeatureMap(!showFeatureMap)
  }

  return (
    <div className="rounded-2xl bg-dark-900/90 border border-amber-500/20 p-5 md:p-6 text-slate-200 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-amber-400 font-semibold">
              SignDetect Autonomous Perception Model
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            Real-Time Traffic Sign & Helmet Safety Bounding Box Stream
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFeatureMap}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 border ${
              showFeatureMap
                ? 'bg-amber-500 text-dark-950 font-bold border-amber-400'
                : 'bg-white/5 border-white/20 text-slate-300'
            }`}
            data-cursor="MAP"
          >
            <Eye size={13} />
            <span>{showFeatureMap ? 'Heatmap: GRAD-CAM ON' : 'Standard RGB Camera'}</span>
          </button>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="flex flex-wrap gap-2 my-4">
        {Object.entries(SCENARIOS).map(([key, item]) => (
          <button
            key={key}
            onClick={() => handleSelectScenario(key)}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
              activeScenarioKey === key
                ? 'bg-amber-400 text-dark-950 font-bold shadow-[0_0_12px_rgba(251,146,60,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:border-amber-400/40 hover:text-amber-300'
            }`}
            data-cursor="SCENE"
          >
            <Camera size={13} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Camera Stream Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-2">
        {/* Viewport with bounding boxes */}
        <div className="lg:col-span-8 rounded-xl bg-slate-950 border border-amber-500/30 relative overflow-hidden min-h-[260px] flex items-center justify-center">
          {/* Subtle grid pattern / camera crosshair */}
          <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
          <div className="absolute top-2 left-2 flex items-center gap-2 text-[10px] font-mono text-slate-400 z-10 bg-black/60 px-2.5 py-1 rounded">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>REC // SENSOR_FRAME: 1920x1080@60FPS</span>
          </div>

          {/* Detections Overlay */}
          {scenario.detections.map((det, i) => (
            <motion.div
              key={`${scenario.id}-${i}`}
              className={`absolute border-2 rounded transition-all pointer-events-none flex flex-col justify-start ${
                det.warning
                  ? 'border-red-500 bg-red-500/15 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                  : 'border-amber-400 bg-amber-400/10 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
              }`}
              style={{
                top: `${det.box.top}%`,
                left: `${det.box.left}%`,
                width: `${det.box.width}%`,
                height: `${det.box.height}%`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div
                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-t tracking-wider text-black flex items-center justify-between ${
                  det.warning ? 'bg-red-500 text-white' : 'bg-amber-400'
                }`}
              >
                <span>{det.label}</span>
                <span>{det.conf}%</span>
              </div>
            </motion.div>
          ))}

          {/* Camera reticle in center */}
          <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>

        {/* Inference Telemetry Column */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono text-slate-400">TENSORRT INFERENCE LATENCY</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-mono font-bold text-amber-300">
                {scenario.latency} ms
              </span>
              <span className="text-xs text-slate-400 font-mono">({scenario.fps} FPS)</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Guarantees sub-15ms real-time control loop for autonomous vehicle emergency braking.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono text-slate-400">ACTIVE DETECTIONS SUMMARY</span>
            <div className="space-y-1.5 mt-2">
              {scenario.detections.map((det, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-mono">
                  <span className={det.warning ? 'text-red-400 font-bold' : 'text-slate-300'}>
                    {det.label}
                  </span>
                  <span className="text-amber-300 font-bold">{det.conf}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>BACKBONE: YOLOv8-Nano / FPN</span>
            <span className="text-amber-400">EDGE-READY (ONNX)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
