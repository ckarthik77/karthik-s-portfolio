#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Daily update functions
const updateSkills = () => {
  const skillsFile = path.join(__dirname, '../src/components/Skills.tsx');
  let content = fs.readFileSync(skillsFile, 'utf8');
  
  // Random skill improvements
  const skillImprovements = [
    { skill: 'React', improvement: Math.floor(Math.random() * 5) + 1 },
    { skill: 'TypeScript', improvement: Math.floor(Math.random() * 3) + 1 },
    { skill: 'Next.js', improvement: Math.floor(Math.random() * 4) + 1 },
    { skill: 'Tailwind CSS', improvement: Math.floor(Math.random() * 2) + 1 }
  ];
  
  skillImprovements.forEach(({ skill, improvement }) => {
    const regex = new RegExp(`(name: '${skill}', level: )(\\d+)`);
    const match = content.match(regex);
    if (match) {
      const currentLevel = parseInt(match[2]);
      const newLevel = Math.min(currentLevel + improvement, 95);
      content = content.replace(regex, `$1${newLevel}`);
    }
  });
  
  fs.writeFileSync(skillsFile, content);
  return skillImprovements;
};

const updateLearning = () => {
  const aboutFile = path.join(__dirname, '../src/components/About.tsx');
  let content = fs.readFileSync(aboutFile, 'utf8');
  
  const learningTopics = [
    'Advanced React Patterns',
    'Server-Side Rendering',
    'GraphQL Integration',
    'Micro-Frontends',
    'Performance Optimization',
    'Testing Strategies',
    'CI/CD Pipelines',
    'Cloud Deployment'
  ];
  
  const randomTopic = learningTopics[Math.floor(Math.random() * learningTopics.length)];
  
  // Update learning section
  const learningRegex = /(Currently Learning<\/h3>\s*<div className="flex flex-wrap justify-center gap-4">\s*)(.*?)(<\/div>)/s;
  const match = content.match(learningRegex);
  
  if (match) {
    const newLearningSection = `
            <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm border border-blue-500/30">
              ${randomTopic}
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
            </span>`;
    
    content = content.replace(learningRegex, `$1${newLearningSection}$3`);
  }
  
  fs.writeFileSync(aboutFile, content);
  return randomTopic;
};

const updateProjects = async () => {
  const projectsFile = path.join(__dirname, '../src/components/Projects.tsx');
  let content = fs.readFileSync(projectsFile, 'utf8');
  
  // Import project generator
  const { generateAndDeployProject } = require('./project-generator');
  
  try {
    // Generate and deploy a real project
    const newProject = await generateAndDeployProject();
    
    if (newProject) {
      // Add new project to the projects array
      const projectsRegex = /(const projects = \[)(.*?)(\];)/s;
      const match = content.match(projectsRegex);
      
      if (match) {
        const newProjectString = `
    {
      title: '${newProject.name}',
      description: '${newProject.description}',
      technologies: [${newProject.technologies.map(tech => `'${tech}'`).join(', ')}],
      githubUrl: 'https://github.com/ckarthik77/${newProject.name.toLowerCase().replace(/\s+/g, '-')}',
      liveUrl: '${newProject.deploymentUrl}',
      stars: ${Math.floor(Math.random() * 20) + 5},
      forks: ${Math.floor(Math.random() * 10) + 2},
      type: '${newProject.type}',
    },`;
        
        content = content.replace(projectsRegex, `$1${newProjectString}$2$3`);
      }
      
      fs.writeFileSync(projectsFile, content);
      return newProject;
    }
  } catch (error) {
    console.error('Failed to generate project:', error);
    // Fallback to simple project addition
    return updateProjectsFallback();
  }
};

const updateProjectsFallback = () => {
  const projectsFile = path.join(__dirname, '../src/components/Projects.tsx');
  let content = fs.readFileSync(projectsFile, 'utf8');
  
  const newProjects = [
    {
      title: 'AI Chat Application',
      description: 'A modern chat application with AI integration using React and OpenAI API.',
      technologies: ['React', 'OpenAI API', 'TypeScript', 'Tailwind CSS'],
      type: 'AI/ML'
    },
    {
      title: 'E-commerce Dashboard',
      description: 'A comprehensive dashboard for e-commerce analytics and management.',
      technologies: ['Next.js', 'Chart.js', 'Prisma', 'PostgreSQL'],
      type: 'Full Stack'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates.',
      technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
      type: 'Web App'
    }
  ];
  
  const randomProject = newProjects[Math.floor(Math.random() * newProjects.length)];
  
  // Add new project to the projects array
  const projectsRegex = /(const projects = \[)(.*?)(\];)/s;
  const match = content.match(projectsRegex);
  
  if (match) {
    const newProjectString = `
    {
      title: '${randomProject.title}',
      description: '${randomProject.description}',
      technologies: [${randomProject.technologies.map(tech => `'${tech}'`).join(', ')}],
      githubUrl: 'https://github.com/ckarthik77/${randomProject.title.toLowerCase().replace(/\s+/g, '-')}',
      liveUrl: null,
      stars: ${Math.floor(Math.random() * 20) + 5},
      forks: ${Math.floor(Math.random() * 10) + 2},
      type: '${randomProject.type}',
    },`;
    
    content = content.replace(projectsRegex, `$1${newProjectString}$2$3`);
  }
  
  fs.writeFileSync(projectsFile, content);
  return randomProject;
};

const updateStats = () => {
  const heroFile = path.join(__dirname, '../src/components/Hero.tsx');
  let content = fs.readFileSync(heroFile, 'utf8');
  
  // Update some stats or achievements
  const achievements = [
    'Completed 50+ coding challenges',
    'Contributed to 10+ open source projects',
    'Built 20+ web applications',
    'Mentored 5+ junior developers',
    'Achieved 95% test coverage',
    'Optimized performance by 40%'
  ];
  
  const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
  
  // Add achievement to description
  const descRegex = /(Passionate about building innovative web applications and exploring the fascinating world of Machine Learning\.\s*Currently diving deep into React and modern web technologies\.)/;
  const newDesc = `$1 ${randomAchievement}.`;
  
  content = content.replace(descRegex, newDesc);
  fs.writeFileSync(heroFile, content);
  
  return randomAchievement;
};

// Main update function
const performDailyUpdate = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  console.log(`🔄 Performing daily update for ${today}...`);
  
  const updates = {
    skills: updateSkills(),
    learning: updateLearning(),
    projects: await updateProjects(),
    stats: updateStats()
  };
  
  console.log('✅ Daily updates completed:');
  console.log(`- Skills improved: ${updates.skills.length} skills`);
  console.log(`- Learning topic: ${updates.learning}`);
  console.log(`- New project: ${updates.projects.title}`);
  if (updates.projects.deploymentUrl) {
    console.log(`- Live URL: ${updates.projects.deploymentUrl}`);
  }
  console.log(`- Achievement: ${updates.stats}`);
  
  return updates;
};

// Run if called directly
if (require.main === module) {
  performDailyUpdate();
}

module.exports = { performDailyUpdate }; 