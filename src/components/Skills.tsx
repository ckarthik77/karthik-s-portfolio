'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Skills = () => {
  const [animateSkills, setAnimateSkills] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true)
        }
      },
      { threshold: 0.3 }
    )

    const skillsSection = document.getElementById('skills')
    if (skillsSection) {
      observer.observe(skillsSection)
    }

    return () => observer.disconnect()
  }, [])

  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML', level: 85 },
        { name: 'CSS', level: 80 },
        { name: 'JavaScript', level: 75 },
        { name: 'React', level: 88 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'APIs', level: 75 },
        { name: 'Node.js', level: 65 },
      ],
    },
    {
      category: 'ML & AI',
      skills: [
        { name: 'Deep Learning', level: 70 },
        { name: 'Data Science', level: 75 },
        { name: 'Jupyter Notebook', level: 80 },
      ],
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'GitHub', level: 80 },
        { name: 'VS Code', level: 90 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A collection of technologies and tools I've been working with. 
            Always learning and expanding my skill set.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        animate={animateSkills ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              Currently Learning
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm border border-blue-500/30">
                React Hooks
              </span>
              <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm border border-purple-500/30">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm border border-green-500/30">
                Next.js
              </span>
              <span className="px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-400 text-sm border border-yellow-500/30">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-pink-500/20 rounded-full text-pink-400 text-sm border border-pink-500/30">
                Framer Motion
              </span>
              <span className="px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-400 text-sm border border-indigo-500/30">
                Advanced ML
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills 