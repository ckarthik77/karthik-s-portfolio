import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://karthik-portfolio.vercel.app'),
  title: 'Chandika Karthik | AI Engineer, Autonomous Systems & Full-Stack Builder',
  description: 'Interactive portfolio and live engineering sandboxes of Chandika Karthik. Explore real-time demos for Weather Prediction AI, AI Job Search & Talent Radar, RAG Knowledge Retrieval, SynCity AV Mobility, and SignDetect Computer Vision.',
  keywords: [
    'Chandika Karthik',
    'AI Engineer',
    'Machine Learning',
    'Weather Prediction AI',
    'RAG Chatbot',
    'SynCity',
    'SUMO Simulation',
    'TraCI',
    'Computer Vision',
    'Full Stack Developer',
    'Next.js 14',
    'FastAPI',
  ],
  authors: [{ name: 'Chandika Karthik' }],
  creator: 'Chandika Karthik',
  openGraph: {
    title: 'Chandika Karthik | AI Engineer, Autonomous Systems & Full-Stack Builder',
    description: 'Explore live interactive AI sandboxes: Weather Forecasting, RAG QA, SynCity Traffic Simulation, and Geospatial Telemetry.',
    type: 'website',
    url: 'https://karthik-portfolio.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chandika Karthik | AI Engineer & Full-Stack Builder',
    description: 'Explore live interactive AI sandboxes and creative geospatial maps.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-[#06090f] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  )
}