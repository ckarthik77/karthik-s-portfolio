'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, GitBranch } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Deep Learning Project',
      description: 'A comprehensive deep learning project exploring neural networks and AI algorithms. Built with Python and modern ML frameworks.',
      technologies: ['Python', 'TensorFlow', 'Jupyter', 'Deep Learning'],
      githubUrl: 'https://github.com/ckarthik77/deep-learning-project',
      liveUrl: null,
      stars: 12,
      forks: 5,
      type: 'ML/AI',
    },
    {
      title: 'Welcome to Open Source',
      description: 'My first contribution to open source projects. Learning the collaborative development process and community guidelines.',
      technologies: ['Open Source', 'Git', 'GitHub', 'Collaboration'],
      githubUrl: 'https://github.com/ckarthik77/welcome-to-open-source',
      liveUrl: null,
      stars: 8,
      forks: 3,
      type: 'Open Source',
    },
    {
      title: 'JavaScript Algorithms',
      description: 'A collection of JavaScript algorithms and data structures. Forked from a popular repository to learn and practice.',
      technologies: ['JavaScript', 'Algorithms', 'Data Structures', 'ES6+'],
      githubUrl: 'https://github.com/ckarthik77/javascript-algorithms',
      liveUrl: null,
      stars: 15,
      forks: 7,
      type: 'Learning',
    },
  ]

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my work and contributions. From machine learning experiments to open source contributions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass p-6 rounded-xl card-hover"
            >
              {/* Project Type Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.type === 'ML/AI' ? 'bg-blue-500/20 text-blue-400' :
                  project.type === 'Open Source' ? 'bg-green-500/20 text-green-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {project.type}
                </span>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star size={14} />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitBranch size={14} />
                    <span>{project.forks}</span>
                  </div>
                </div>
              </div>

              {/* Project Title */}
              <h3 className="text-xl font-bold mb-3 text-white">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Links */}
              <div className="flex space-x-3">
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  <Github size={16} />
                  <span>View Code</span>
                </motion.a>
                
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 glass rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              More Projects Coming Soon!
            </h3>
            <p className="text-gray-400 mb-6">
              I'm constantly working on new projects and learning new technologies. 
              Check back soon for more updates!
            </p>
            <motion.a
              href="https://github.com/ckarthik77"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg transition-all duration-300"
            >
              <Github size={20} />
              <span>View All Projects</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 