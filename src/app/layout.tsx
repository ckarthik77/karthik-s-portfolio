import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Karthik - Full Stack Developer & ML Enthusiast',
  description: 'Portfolio of Karthik, a Full Stack Developer and Machine Learning enthusiast. Specializing in React, Python, and Deep Learning.',
  keywords: ['Full Stack Developer', 'Machine Learning', 'React', 'Python', 'Deep Learning', 'Portfolio'],
  authors: [{ name: 'Karthik' }],
  creator: 'Karthik',
  openGraph: {
    title: 'Karthik - Full Stack Developer & ML Enthusiast',
    description: 'Portfolio of Karthik, a Full Stack Developer and Machine Learning enthusiast.',
    type: 'website',
    url: 'https://karthik-portfolio.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karthik - Full Stack Developer & ML Enthusiast',
    description: 'Portfolio of Karthik, a Full Stack Developer and Machine Learning enthusiast.',
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
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
} 