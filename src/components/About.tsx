'use client'

import { motion } from 'framer-motion'
import { Code, Brain, Zap, Target } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Full Stack Development',
      description: 'Building complete web applications with modern technologies and best practices.',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Machine Learning',
      description: 'Exploring AI and deep learning to create intelligent solutions.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'React Learning',
      description: 'Currently mastering React and modern frontend development.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Problem Solving',
      description: 'Passionate about solving complex problems with innovative approaches.',
    },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate developer with a keen interest in both web development and machine learning. 
            My journey in tech started with a curiosity about how things work, and it has evolved into a 
            love for creating innovative solutions that make a difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-xl text-center card-hover"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              My Journey
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              From my first "Hello World" to building complex applications, I've always been fascinated by 
              the power of code to transform ideas into reality. My current focus is on mastering React and 
              modern web development while continuing to explore the exciting world of machine learning. 
              I believe in continuous learning and staying up-to-date with the latest technologies.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm">
                React Learner
              </span>
              <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm">
                ML Enthusiast
              </span>
              <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-400 text-sm">
                Open Source Contributor
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 