'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CloudRain, Sun, Wind, Droplets, Compass, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react'
import { sound } from '../SoundFeedback'

interface CityData {
  city: string;
  country: string;
  temp: number;
  condition: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  airQuality: string;
  confidence: number;
  lstmAttention: number[];
  forecast: { day: string; temp: number; pop: number }[];
}

const CITIES: Record<string, CityData> = {
  'Hyderabad': {
    city: 'Hyderabad',
    country: 'IN',
    temp: 29,
    condition: 'Partly Cloudy / Thermal Updraft',
    humidity: 58,
    pressure: 1012,
    windSpeed: 14,
    airQuality: 'Moderate (AQI 72)',
    confidence: 96.4,
    lstmAttention: [0.88, 0.94, 0.76, 0.92, 0.85],
    forecast: [
      { day: 'Mon', temp: 30, pop: 20 },
      { day: 'Tue', temp: 31, pop: 15 },
      { day: 'Wed', temp: 28, pop: 45 },
      { day: 'Thu', temp: 29, pop: 30 },
      { day: 'Fri', temp: 32, pop: 10 },
      { day: 'Sat', temp: 31, pop: 15 },
      { day: 'Sun', temp: 30, pop: 25 },
    ]
  },
  'Tokyo': {
    city: 'Tokyo',
    country: 'JP',
    temp: 18,
    condition: 'Light Rain / Coastal Front',
    humidity: 78,
    pressure: 1008,
    windSpeed: 21,
    airQuality: 'Good (AQI 24)',
    confidence: 94.2,
    lstmAttention: [0.91, 0.89, 0.95, 0.83, 0.79],
    forecast: [
      { day: 'Mon', temp: 17, pop: 65 },
      { day: 'Tue', temp: 19, pop: 40 },
      { day: 'Wed', temp: 21, pop: 20 },
      { day: 'Thu', temp: 20, pop: 15 },
      { day: 'Fri', temp: 18, pop: 35 },
      { day: 'Sat', temp: 19, pop: 50 },
      { day: 'Sun', temp: 22, pop: 10 },
    ]
  },
  'San Francisco': {
    city: 'San Francisco',
    country: 'US',
    temp: 16,
    condition: 'Marine Layer Fog',
    humidity: 82,
    pressure: 1016,
    windSpeed: 24,
    airQuality: 'Good (AQI 31)',
    confidence: 97.1,
    lstmAttention: [0.95, 0.92, 0.88, 0.91, 0.94],
    forecast: [
      { day: 'Mon', temp: 15, pop: 10 },
      { day: 'Tue', temp: 17, pop: 5 },
      { day: 'Wed', temp: 18, pop: 0 },
      { day: 'Thu', temp: 16, pop: 15 },
      { day: 'Fri', temp: 15, pop: 20 },
      { day: 'Sat', temp: 16, pop: 10 },
      { day: 'Sun', temp: 17, pop: 5 },
    ]
  },
  'London': {
    city: 'London',
    country: 'UK',
    temp: 14,
    condition: 'Overcast & Low Pressure',
    humidity: 76,
    pressure: 1004,
    windSpeed: 18,
    airQuality: 'Good (AQI 38)',
    confidence: 93.8,
    lstmAttention: [0.84, 0.90, 0.86, 0.92, 0.88],
    forecast: [
      { day: 'Mon', temp: 14, pop: 55 },
      { day: 'Tue', temp: 13, pop: 70 },
      { day: 'Wed', temp: 15, pop: 30 },
      { day: 'Thu', temp: 16, pop: 25 },
      { day: 'Fri', temp: 14, pop: 45 },
      { day: 'Sat', temp: 13, pop: 60 },
      { day: 'Sun', temp: 15, pop: 35 },
    ]
  },
}

export default function WeatherDemo() {
  const [selectedCity, setSelectedCity] = useState<string>('Hyderabad')
  const [isInferencing, setIsInferencing] = useState<boolean>(false)
  const [customSearch, setCustomSearch] = useState<string>('')

  const data = CITIES[selectedCity] || CITIES['Hyderabad']

  const handleSelectCity = (name: string) => {
    sound.playClick()
    setSelectedCity(name)
  }

  const runModelInference = () => {
    sound.playBlip(750)
    setIsInferencing(true)
    setTimeout(() => {
      setIsInferencing(false)
      sound.playSuccess()
    }, 800)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customSearch.trim()) return
    // Match city if exists, else synthesize
    const match = Object.keys(CITIES).find(k => k.toLowerCase() === customSearch.trim().toLowerCase())
    if (match) {
      setSelectedCity(match)
    } else {
      setSelectedCity('Tokyo')
    }
    runModelInference()
  }

  return (
    <div className="rounded-2xl bg-dark-900/90 border border-cyan-500/20 p-5 md:p-6 text-slate-200 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-cyan-400 font-semibold">
              DeepLearning Weather Transformer v2.4
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            Neural Atmospheric Multi-Horizon Forecaster
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runModelInference}
            disabled={isInferencing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono hover:bg-cyan-500/20 transition-all disabled:opacity-50"
            data-cursor="INFER"
          >
            <RefreshCw size={13} className={isInferencing ? 'animate-spin' : ''} />
            <span>{isInferencing ? 'Calculating weights...' : 'Run Neural Inference'}</span>
          </button>
        </div>
      </div>

      {/* Preset Selector & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4">
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(CITIES).map(city => (
            <button
              key={city}
              onClick={() => handleSelectCity(city)}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                selectedCity === city
                  ? 'bg-cyan-500 text-dark-950 font-bold shadow-[0_0_12px_rgba(0,245,212,0.4)]'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300'
              }`}
              data-cursor="SELECT"
            >
              {city}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5 text-xs">
          <input
            type="text"
            placeholder="Simulate location..."
            value={customSearch}
            onChange={e => setCustomSearch(e.target.value)}
            className="px-3 py-1 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </form>
      </div>

      {/* Main Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {/* Current Core Temp */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-cyan-500/5 border border-cyan-500/20 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono text-cyan-400">{data.country} // NODE</span>
              <h5 className="text-2xl font-bold text-white">{data.city}</h5>
              <p className="text-xs text-slate-400 mt-0.5">{data.condition}</p>
            </div>
            <Sun className="text-amber-400 animate-spin" style={{ animationDuration: '20s' }} size={28} />
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-mono font-bold text-cyan-300">
              {data.temp}°C
            </span>
            <span className="text-xs font-mono text-slate-400">
              ({Math.round(data.temp * 1.8 + 32)}°F)
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Model Confidence</span>
            <span className="text-lime-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={12} /> {data.confidence}%
            </span>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Droplets size={13} className="text-blue-400" />
              <span>Humidity</span>
            </div>
            <span className="text-lg font-mono font-bold text-white mt-1">{data.humidity}%</span>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-blue-400 h-full" style={{ width: `${data.humidity}%` }} />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Wind size={13} className="text-cyan-400" />
              <span>Wind Speed</span>
            </div>
            <span className="text-lg font-mono font-bold text-white mt-1">{data.windSpeed} km/h</span>
            <span className="text-[10px] font-mono text-slate-500">Vector NNW</span>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Compass size={13} className="text-purple-400" />
              <span>Atm. Pressure</span>
            </div>
            <span className="text-lg font-mono font-bold text-white mt-1">{data.pressure} hPa</span>
            <span className="text-[10px] font-mono text-slate-500">Barometric Steady</span>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <CloudRain size={13} className="text-emerald-400" />
              <span>Air Quality</span>
            </div>
            <span className="text-sm font-mono font-semibold text-emerald-300 mt-1">{data.airQuality}</span>
            <span className="text-[10px] font-mono text-slate-500">Sensor Mesh</span>
          </div>
        </div>

        {/* Attention LSTM Weights */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                <Cpu size={13} /> LSTM Attention Heads
              </span>
              <span className="text-[10px] font-mono text-slate-500">5-Layer GRU</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Temporal attention weights assigned to past atmospheric telemetry horizons:
            </p>
          </div>

          <div className="space-y-1.5 my-3">
            {data.lstmAttention.map((weight, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-500 w-12 text-[10px]">H-{idx * 6}h</span>
                <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${weight * 100}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />
                </div>
                <span className="text-cyan-300 text-[10px] w-8 text-right">
                  {(weight * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-mono text-slate-400 bg-black/30 px-2.5 py-1 rounded border border-white/5">
            Loss: <span className="text-lime-400">0.0142 RMSE</span> | Inference: <span className="text-cyan-400">8.2ms</span>
          </div>
        </div>
      </div>

      {/* 7-Day Neural Multi-Horizon Prediction Curve */}
      <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-mono text-slate-400">
            7-DAY PREDICTIVE HORIZON (MULTI-TASK HEAD)
          </span>
          <span className="text-[11px] font-mono text-cyan-400">
            Probability of Rain & Temperature
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {data.forecast.map((fc, i) => (
            <div
              key={fc.day}
              className={`p-2 rounded-lg border transition-all ${
                i === 0
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                  : 'bg-white/5 border-white/5 text-slate-300 hover:border-white/20'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-400 block">{fc.day}</span>
              <span className="text-sm font-mono font-bold block my-1">{fc.temp}°</span>
              <div className="flex items-center justify-center gap-0.5 text-[10px] font-mono text-blue-400">
                <Droplets size={10} />
                <span>{fc.pop}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
