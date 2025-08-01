#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  maxSkillLevel: 95,
  minSkillImprovement: 1,
  maxSkillImprovement: 3,
  learningTopics: [
    'Advanced React Patterns',
    'Server-Side Rendering',
    'GraphQL Integration',
    'Micro-Frontends',
    'Performance Optimization',
    'Testing Strategies',
    'CI/CD Pipelines',
    'Cloud Deployment',
    'Web3 Development',
    'Mobile App Development',
    'Machine Learning Integration',
    'Real-time Applications',
    'Progressive Web Apps',
    'Accessibility Best Practices',
    'Security Best Practices',
    'Database Optimization',
    'API Design Patterns',
    'State Management',
    'Component Architecture',
    'Build Tools & Bundlers',
    'Docker & Containerization',
    'Kubernetes Orchestration',
    'Serverless Architecture',
    'Edge Computing',
    'Blockchain Development'
  ],
  achievements: [
    'Completed 50+ coding challenges',
    'Contributed to 10+ open source projects',
    'Built 20+ web applications',
    'Mentored 5+ junior developers',
    'Achieved 95% test coverage',
    'Optimized performance by 40%',
    'Deployed 15+ production applications',
    'Learned 3 new frameworks this month',
    'Fixed 100+ bugs in production',
    'Improved user experience by 60%',
    'Reduced bundle size by 30%',
    'Implemented CI/CD for 8 projects',
    'Created 5 reusable component libraries',
    'Optimized database queries by 50%',
    'Built 3 full-stack applications',
    'Mentored 10+ developers',
    'Published 5 npm packages',
    'Spoke at 3 tech conferences',
    'Wrote 20+ technical blog posts',
    'Contributed to React core',
    'Optimized Core Web Vitals',
    'Implemented microservices',
    'Built real-time chat system',
    'Created design system',
    'Automated testing pipeline'
  ]
};

// Utility functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

// Daily update functions
const updateSkills = () => {
  try {
    const skillsFile = path.join(__dirname, '../src/components/Skills.tsx');
    
    if (!fs.existsSync(skillsFile)) {
      console.log('⚠️ Skills component not found, skipping skills update');
      return [];
    }
    
    let content = fs.readFileSync(skillsFile, 'utf8');
    
    // Define skills with their improvement ranges
    const skillImprovements = [
      { skill: 'React', improvement: getRandomInt(1, 3) },
      { skill: 'TypeScript', improvement: getRandomInt(1, 2) },
      { skill: 'Next.js', improvement: getRandomInt(1, 3) },
      { skill: 'Tailwind CSS', improvement: getRandomInt(1, 2) },
      { skill: 'Node.js', improvement: getRandomInt(1, 2) },
      { skill: 'Python', improvement: getRandomInt(1, 2) },
      { skill: 'MongoDB', improvement: getRandomInt(1, 2) },
      { skill: 'PostgreSQL', improvement: getRandomInt(1, 2) }
    ];
    
    let updatedSkills = [];
    
    skillImprovements.forEach(({ skill, improvement }) => {
      const regex = new RegExp(`(name: '${skill}', level: )(\\d+)`);
      const match = content.match(regex);
      
      if (match) {
        const currentLevel = parseInt(match[2]);
        const newLevel = Math.min(currentLevel + improvement, CONFIG.maxSkillLevel);
        
        if (newLevel > currentLevel) {
          content = content.replace(regex, `$1${newLevel}`);
          updatedSkills.push({ skill, oldLevel: currentLevel, newLevel });
        }
      }
    });
    
    fs.writeFileSync(skillsFile, content);
    console.log(`✅ Updated ${updatedSkills.length} skills`);
    
    return updatedSkills;
  } catch (error) {
    console.error('❌ Error updating skills:', error.message);
    return [];
  }
};

const updateLearning = () => {
  try {
    const aboutFile = path.join(__dirname, '../src/components/About.tsx');
    
    if (!fs.existsSync(aboutFile)) {
      console.log('⚠️ About component not found, skipping learning update');
      return null;
    }
    
    let content = fs.readFileSync(aboutFile, 'utf8');
    
    const randomTopic = getRandomElement(CONFIG.learningTopics);
    
    // Update learning section with new topic
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
      fs.writeFileSync(aboutFile, content);
      console.log(`✅ Updated learning topic: ${randomTopic}`);
      return randomTopic;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error updating learning:', error.message);
    return null;
  }
};

const updateProjects = async () => {
  try {
    const projectsFile = path.join(__dirname, '../src/components/Projects.tsx');
    
    if (!fs.existsSync(projectsFile)) {
      console.log('⚠️ Projects component not found, skipping projects update');
      return null;
    }
    
    let content = fs.readFileSync(projectsFile, 'utf8');
    
    // Try to generate a real project first
    try {
      const { generateAndDeployProject } = require('./project-generator');
      const newProject = await generateAndDeployProject();
      
      if (newProject && newProject.name) {
        // Add new project to the projects array
        const projectsRegex = /(const projects = \[)(.*?)(\];)/s;
        const match = content.match(projectsRegex);
        
        if (match) {
          const newProjectString = `
    {
      title: '${newProject.name}',
      description: '${newProject.description}',
      technologies: [${newProject.technologies.map(tech => `'${tech}'`).join(', ')}],
      githubUrl: '${newProject.githubUrl || `https://github.com/ckarthik77/${newProject.name.toLowerCase().replace(/\s+/g, '-')}`}',
      liveUrl: '${newProject.deploymentUrl || null}',
      stars: ${getRandomInt(5, 25)},
      forks: ${getRandomInt(2, 12)},
      type: '${newProject.type}',
    },`;
          
          content = content.replace(projectsRegex, `$1${newProjectString}$2$3`);
          fs.writeFileSync(projectsFile, content);
          
          console.log(`✅ Added new project: ${newProject.name}`);
          if (newProject.deploymentUrl) {
            console.log(`   Live URL: ${newProject.deploymentUrl}`);
          }
          if (newProject.githubUrl) {
            console.log(`   GitHub URL: ${newProject.githubUrl}`);
          }
          
          return newProject;
        }
      }
    } catch (error) {
      console.log('⚠️ Project generation failed, using fallback:', error.message);
    }
    
    // Fallback to simple project addition
    return updateProjectsFallback();
  } catch (error) {
    console.error('❌ Error updating projects:', error.message);
    return null;
  }
};

const updateProjectsFallback = () => {
  try {
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
      },
      {
        title: 'Portfolio Generator',
        description: 'An automated portfolio generator with dynamic content updates.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub API'],
        type: 'Tool'
      },
      {
        title: 'Weather Dashboard',
        description: 'A beautiful weather dashboard with real-time data and forecasts.',
        technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
        type: 'Web App'
      }
    ];
    
    const randomProject = getRandomElement(newProjects);
    
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
      stars: ${getRandomInt(5, 25)},
      forks: ${getRandomInt(2, 12)},
      type: '${randomProject.type}',
    },`;
      
      content = content.replace(projectsRegex, `$1${newProjectString}$2$3`);
      fs.writeFileSync(projectsFile, content);
      
      console.log(`✅ Added fallback project: ${randomProject.title}`);
      return randomProject;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error in projects fallback:', error.message);
    return null;
  }
};

const updateStats = () => {
  try {
    const heroFile = path.join(__dirname, '../src/components/Hero.tsx');
    
    if (!fs.existsSync(heroFile)) {
      console.log('⚠️ Hero component not found, skipping stats update');
      return null;
    }
    
    let content = fs.readFileSync(heroFile, 'utf8');
    
    const randomAchievement = getRandomElement(CONFIG.achievements);
    
    // Add achievement to description
    const descRegex = /(Passionate about building innovative web applications and exploring the fascinating world of Machine Learning\.\s*Currently diving deep into React and modern web technologies\.)/;
    const newDesc = `$1 ${randomAchievement}.`;
    
    content = content.replace(descRegex, newDesc);
    fs.writeFileSync(heroFile, content);
    
    console.log(`✅ Added achievement: ${randomAchievement}`);
    return randomAchievement;
  } catch (error) {
    console.error('❌ Error updating stats:', error.message);
    return null;
  }
};

// Main update function
const performDailyUpdate = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  console.log(`\n🤖 Starting daily portfolio update for ${today}...`);
  console.log('=' .repeat(50));
  
  const startTime = Date.now();
  
  try {
    const updates = {
      skills: updateSkills(),
      learning: updateLearning(),
      projects: await updateProjects(),
      stats: updateStats()
    };
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n' + '=' .repeat(50));
    console.log('✅ Daily updates completed successfully!');
    console.log(`⏱️  Total time: ${duration}s`);
    console.log('\n📊 Update Summary:');
    console.log(`- Skills improved: ${updates.skills.length} skills`);
    
    if (updates.learning) {
      console.log(`- Learning topic: ${updates.learning}`);
    }
    
    if (updates.projects) {
      console.log(`- New project: ${updates.projects.title}`);
      if (updates.projects.deploymentUrl) {
        console.log(`  Live URL: ${updates.projects.deploymentUrl}`);
      }
      if (updates.projects.githubUrl) {
        console.log(`  GitHub URL: ${updates.projects.githubUrl}`);
      }
    }
    
    if (updates.stats) {
      console.log(`- Achievement: ${updates.stats}`);
    }
    
    console.log('\n🎉 Portfolio updated successfully!');
    
    return updates;
  } catch (error) {
    console.error('❌ Fatal error during daily update:', error.message);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  performDailyUpdate()
    .then(() => {
      console.log('\n✨ Daily update completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Daily update failed:', error.message);
      process.exit(1);
    });
}

module.exports = { performDailyUpdate }; 