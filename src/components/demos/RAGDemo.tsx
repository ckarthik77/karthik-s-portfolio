'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, FileText, Send, Sparkles, Database, Layers, Check, ArrowRight } from 'lucide-react'
import { sound } from '../SoundFeedback'

interface DocSource {
  id: string;
  name: string;
  pages: number;
  vectors: number;
}

interface QAPair {
  question: string;
  answer: string;
  chunks: { id: string; text: string; score: number; docName: string }[];
}

const DOCUMENTS: DocSource[] = [
  { id: 'syncity-spec', name: 'SynCity_Architecture_Paper.pdf', pages: 18, vectors: 412 },
  { id: 'rag-paper', name: 'Karthik_RAG_FastAPI_Whitepaper.pdf', pages: 12, vectors: 284 },
  { id: 'perception-spec', name: 'SignDetect_Autonomous_Perception.pdf', pages: 15, vectors: 350 },
]

const DEMO_QUERIES: Record<string, QAPair> = {
  'How does TraCI telemetry synchronize with SUMO?': {
    question: 'How does TraCI telemetry synchronize with SUMO?',
    answer: 'TraCI (Traffic Control Interface) establishes a TCP socket client-server connection with SUMO. At each simulation step (typically 100ms delta-t), TraCI triggers step execution, polls vehicle kinematics (velocity, acceleration, lane position), and dynamically injects neural traffic signal phases computed by the multi-horizon attention model.',
    chunks: [
      {
        id: 'chunk-104',
        docName: 'SynCity_Architecture_Paper.pdf',
        score: 0.942,
        text: '§3.2 TraCI Socket Protocol: Vehicle telemetry logs position (x, y), speed (m/s), and waiting time via TraCI step listeners, routing state tensors to the attention LSTM inference pipe.',
      },
      {
        id: 'chunk-108',
        docName: 'SynCity_Architecture_Paper.pdf',
        score: 0.891,
        text: '§4.1 Signal Actuation: SUMO traffic light programs are dynamically overridden through TraCI setProgramLogic commands based on predicted queue density.',
      },
    ]
  },
  'What is the vector search latency in FAISS?': {
    question: 'What is the vector search latency in FAISS?',
    answer: 'Using FAISS IndexFlatIP (Inner Product cosine similarity) on 768-dimensional text-embedding-004 vectors, retrieval time consistently clocks below 4.2 milliseconds for document corpora under 10,000 chunks. For scale, IVF-PQ quantization can index up to 1M vectors with sub-10ms latency.',
    chunks: [
      {
        id: 'chunk-044',
        docName: 'Karthik_RAG_FastAPI_Whitepaper.pdf',
        score: 0.965,
        text: '§2.3 Indexing Benchmarks: In-memory FAISS IndexFlatIP yields 3.8ms - 4.5ms search latency across 500 document chunks with exact k-nearest neighbor retrieval.',
      },
      {
        id: 'chunk-049',
        docName: 'Karthik_RAG_FastAPI_Whitepaper.pdf',
        score: 0.884,
        text: '§3.1 Context Window Assembly: Top-k chunks (k=3) are injected into the Gemini prompt template alongside conversation history, bounding context overhead to 1,200 tokens.',
      }
    ]
  },
  'How does the vision model handle night-time sign recognition?': {
    question: 'How does the vision model handle night-time sign recognition?',
    answer: 'SignDetect AI incorporates histogram equalization and gamma correction in its pre-processing pipeline before passing frames into the convolutional backbone. Synthetic low-light augmentation during training ensures robust retro-reflective boundary detection even at low signal-to-noise ratios.',
    chunks: [
      {
        id: 'chunk-210',
        docName: 'SignDetect_Autonomous_Perception.pdf',
        score: 0.938,
        text: '§5.2 Night Augmentation: Low illumination frames are passed through adaptive CLAHE filters, increasing edge gradient contrast around high-reflectivity road signs by 38%.',
      },
      {
        id: 'chunk-214',
        docName: 'SignDetect_Autonomous_Perception.pdf',
        score: 0.879,
        text: '§6.1 Real-time Inference: Model maintains 14.2ms frame latency on standard CUDA devices, ensuring 60fps continuous stream evaluation.',
      }
    ]
  }
}

export default function RAGDemo() {
  const [selectedDoc, setSelectedDoc] = useState<string>('syncity-spec')
  const [currentQuery, setCurrentQuery] = useState<string>('How does TraCI telemetry synchronize with SUMO?')
  const [customInput, setCustomInput] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const activeQA = DEMO_QUERIES[currentQuery] || DEMO_QUERIES['How does TraCI telemetry synchronize with SUMO?']

  const handleSelectQuery = (q: string) => {
    sound.playClick()
    setCurrentQuery(q)
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customInput.trim()) return
    sound.playBlip(800)
    setIsSearching(true)
    setTimeout(() => {
      // Pick matching or default
      setCurrentQuery('What is the vector search latency in FAISS?')
      setIsSearching(false)
      sound.playSuccess()
    }, 700)
  }

  return (
    <div className="rounded-2xl bg-dark-900/90 border border-purple-500/20 p-5 md:p-6 text-slate-200 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-purple-400 font-semibold">
              RAG Retrieval-Augmented Generation Engine
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            Live Vector Semantic Search & Context Synthesis
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center gap-1.5">
            <Database size={12} /> FastAPI + FAISS + Gemini API
          </span>
        </div>
      </div>

      {/* Document Knowledge Base Selector */}
      <div className="my-4">
        <span className="text-[11px] font-mono text-slate-400 block mb-2">
          ACTIVE VECTORIZED KNOWLEDGE STORE:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {DOCUMENTS.map(doc => (
            <button
              key={doc.id}
              onClick={() => {
                sound.playClick()
                setSelectedDoc(doc.id)
              }}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                selectedDoc === doc.id
                  ? 'bg-purple-500/15 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
              data-cursor="DOC"
            >
              <FileText size={18} className={selectedDoc === doc.id ? 'text-purple-400' : 'text-slate-400'} />
              <div className="overflow-hidden">
                <span className="text-xs font-semibold text-white block truncate">{doc.name}</span>
                <span className="text-[10px] font-mono text-slate-400">
                  {doc.pages} pgs · {doc.vectors} vector chunks
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Suggestions */}
      <div className="my-3">
        <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
          TEST INQUIRIES:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(DEMO_QUERIES).map(q => (
            <button
              key={q}
              onClick={() => handleSelectQuery(q)}
              className={`px-3 py-1 text-xs rounded-lg font-mono transition-all text-left ${
                currentQuery === q
                  ? 'bg-purple-500 text-white font-medium'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:text-purple-300 hover:border-purple-400/30'
              }`}
              data-cursor="PROMPT"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Query Sandbox Input */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2 my-3">
        <input
          type="text"
          placeholder="Ask a technical question about the indexed repositories..."
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-purple-500 transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)]"
          data-cursor="ASK"
        >
          <Send size={13} />
          <span>Ask Vector Store</span>
        </button>
      </form>

      {/* Results Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Retrieved Chunks Column */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
              <Layers size={13} /> Top-K Retrieved Chunks (Cosine Sim)
            </span>
            <span className="text-[10px] font-mono text-slate-400">FAISS IndexFlatIP</span>
          </div>

          {activeQA.chunks.map((chunk, idx) => (
            <div
              key={chunk.id}
              className="p-3 rounded-xl bg-white/5 border border-purple-500/20 text-xs space-y-1.5"
            >
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-purple-300 font-bold">{chunk.id}</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                  Sim: {(chunk.score * 100).toFixed(1)}%
                </span>
              </div>
              <p className="text-slate-300 text-[11px] font-mono leading-relaxed bg-black/30 p-2 rounded border border-white/5">
                {chunk.text}
              </p>
            </div>
          ))}
        </div>

        {/* Synthesized Response Column */}
        <div className="lg:col-span-7 p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-black/60 border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <span className="text-xs font-mono text-white flex items-center gap-1.5">
                <Sparkles size={14} className="text-purple-400" />
                Synthesized Answer (Gemini 1.5 Pro)
              </span>
              <span className="text-[10px] font-mono text-lime-400 flex items-center gap-1">
                <Check size={11} /> Grounded in Source
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {activeQA.answer}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
            <div>
              <span>LATENCY: </span>
              <span className="text-cyan-400">Embed: 18ms</span> ·{' '}
              <span className="text-purple-400">Search: 4.2ms</span> ·{' '}
              <span className="text-lime-400">Gen: 210ms</span>
            </div>
            <a
              href="https://github.com/ckarthik77/rag-chatbot"
              target="_blank"
              rel="noreferrer"
              className="text-purple-300 hover:text-purple-200 flex items-center gap-1"
              data-cursor="GITHUB"
            >
              <span>View RAG Repo</span>
              <ArrowRight size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
