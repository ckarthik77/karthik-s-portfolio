'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'

export default function Home() {
  useEffect(() => {
    // Easter egg in console
    console.log('%c🚀 Welcome to Karthik\'s Portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;')
    console.log('%c💻 Built with Next.js, TypeScript, and Tailwind CSS', 'color: #8b5cf6; font-size: 14px;')
    console.log('%c🤖 ML & Full Stack Development', 'color: #10b981; font-size: 14px;')
    
    // Add smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const id = target.getAttribute('href')?.slice(1)
        const element = document.getElementById(id!)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    
    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <main className="min-h-screen gradient-bg">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
} 