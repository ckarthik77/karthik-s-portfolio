#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Project templates
const projectTemplates = {
  'ai-chat-app': {
    name: 'AI Chat Application',
    description: 'A modern chat application with AI integration using React and OpenAI API.',
    technologies: ['React', 'OpenAI API', 'TypeScript', 'Tailwind CSS'],
    type: 'AI/ML',
    template: `
import React, { useState } from 'react';

const AIChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI Chat Application</h1>
      <div className="bg-gray-800 rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={\`mb-4 \${msg.role === 'user' ? 'text-right' : 'text-left'}\`}>
            <div className={\`inline-block p-3 rounded-lg \${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}\`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-gray-400">
            AI is thinking...
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-3 bg-gray-700 rounded-lg text-white"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatApp;
    `
  },
  
  'ecommerce-dashboard': {
    name: 'E-commerce Dashboard',
    description: 'A comprehensive dashboard for e-commerce analytics and management.',
    technologies: ['Next.js', 'Chart.js', 'Prisma', 'PostgreSQL'],
    type: 'Full Stack',
    template: `
import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

const EcommerceDashboard = () => {
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const productData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home'],
    datasets: [{
      data: [300, 50, 100, 80],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0'
      ]
    }]
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">E-commerce Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Sales</h3>
          <p className="text-3xl font-bold text-green-400">$45,231</p>
          <p className="text-green-600 text-sm">+20.1% from last month</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Orders</h3>
          <p className="text-3xl font-bold text-blue-400">2,350</p>
          <p className="text-blue-600 text-sm">+180.1% from last month</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Customers</h3>
          <p className="text-3xl font-bold text-purple-400">1,234</p>
          <p className="text-purple-600 text-sm">+19% from last month</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Products</h3>
          <p className="text-3xl font-bold text-yellow-400">456</p>
          <p className="text-yellow-600 text-sm">+12% from last month</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Sales Trend</h3>
          <Line data={salesData} />
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Product Categories</h3>
          <Doughnut data={productData} />
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;
    `
  },
  
  'task-manager': {
    name: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
    type: 'Web App',
    template: `
import React, { useState, useEffect } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Task Management App</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 p-3 bg-gray-700 rounded-lg text-white"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={\`px-4 py-2 rounded \${filter === 'all' ? 'bg-blue-600' : 'bg-gray-700'}\`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={\`px-4 py-2 rounded \${filter === 'active' ? 'bg-blue-600' : 'bg-gray-700'}\`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={\`px-4 py-2 rounded \${filter === 'completed' ? 'bg-blue-600' : 'bg-gray-700'}\`}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={\`flex items-center justify-between p-4 bg-gray-800 rounded-lg \${task.completed ? 'opacity-60' : ''}\`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5"
              />
              <span className={\`\${task.completed ? 'line-through' : ''}\`}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center text-gray-400">
        {filteredTasks.length} tasks
      </div>
    </div>
  );
};

export default TaskManager;
    `
  }
};

// Generate and deploy a new project
const generateProject = async (projectType) => {
  const template = projectTemplates[projectType];
  if (!template) {
    throw new Error(`Unknown project type: ${projectType}`);
  }

  console.log(`🚀 Generating ${template.name}...`);

  // Create project directory
  const projectDir = path.join(__dirname, '../projects', projectType);
  if (!fs.existsSync(path.dirname(projectDir))) {
    fs.mkdirSync(path.dirname(projectDir), { recursive: true });
  }
  fs.mkdirSync(projectDir, { recursive: true });

  // Create package.json for the project
  const packageJson = {
    name: projectType,
    version: "1.0.0",
    description: template.description,
    main: "index.js",
    scripts: {
      "dev": "next dev",
      "build": "next build",
      "start": "next start"
    },
    dependencies: {
      "react": "^18.0.0",
      "react-dom": "^18.0.0",
      "next": "^14.0.0",
      "typescript": "^5.0.0",
      "@types/react": "^18.0.0",
      "@types/node": "^20.0.0"
    }
  };

  // Write project files
  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2));
  fs.writeFileSync(path.join(projectDir, 'next.config.js'), 'module.exports = {}');
  fs.writeFileSync(path.join(projectDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: "es5",
      lib: ["dom", "dom.iterable", "es6"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "node",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
    exclude: ["node_modules"]
  }, null, 2));

  // Create pages directory and main component
  const pagesDir = path.join(projectDir, 'pages');
  fs.mkdirSync(pagesDir, { recursive: true });
  fs.writeFileSync(path.join(pagesDir, '_app.tsx'), `
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
  `);

  fs.writeFileSync(path.join(pagesDir, 'index.tsx'), template.template);

  // Create styles
  const stylesDir = path.join(projectDir, 'styles');
  fs.mkdirSync(stylesDir, { recursive: true });
  fs.writeFileSync(path.join(stylesDir, 'globals.css'), `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #111827;
  color: white;
}
  `);

  // Create tailwind config
  fs.writeFileSync(path.join(projectDir, 'tailwind.config.js'), `
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
  `);

  // Create README
  fs.writeFileSync(path.join(projectDir, 'README.md'), `
# ${template.name}

${template.description}

## Technologies Used
${template.technologies.map(tech => `- ${tech}`).join('\n')}

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.
  `);

  console.log(`✅ ${template.name} generated successfully!`);
  
  return {
    name: template.name,
    description: template.description,
    technologies: template.technologies,
    type: template.type,
    directory: projectDir
  };
};

// Deploy project to Vercel
const deployProject = async (projectDir, projectName) => {
  console.log(`🚀 Deploying ${projectName} to Vercel...`);
  
  try {
    // Change to project directory
    process.chdir(projectDir);
    
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    // Build project
    console.log('🔨 Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Deploy to Vercel
    console.log('🌐 Deploying to Vercel...');
    const deployOutput = execSync('npx vercel --prod --yes', { 
      stdio: 'pipe',
      encoding: 'utf8'
    });
    
    // Extract deployment URL
    const urlMatch = deployOutput.match(/https:\/\/[^\s]+/);
    const deploymentUrl = urlMatch ? urlMatch[0] : null;
    
    console.log(`✅ ${projectName} deployed successfully!`);
    console.log(`🌐 Live URL: ${deploymentUrl}`);
    
    return deploymentUrl;
  } catch (error) {
    console.error(`❌ Failed to deploy ${projectName}:`, error.message);
    return null;
  }
};

// Main function to generate and deploy a project
const generateAndDeployProject = async () => {
  const projectTypes = Object.keys(projectTemplates);
  const randomProjectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
  
  try {
    const project = await generateProject(randomProjectType);
    const deploymentUrl = await deployProject(project.directory, project.name);
    
    return {
      ...project,
      deploymentUrl
    };
  } catch (error) {
    console.error('❌ Project generation failed:', error.message);
    return null;
  }
};

// Export for use in daily updates
module.exports = { generateAndDeployProject };

// Run if called directly
if (require.main === module) {
  generateAndDeployProject().then(result => {
    if (result) {
      console.log('🎉 Project generation and deployment completed!');
      console.log(`📁 Project: ${result.name}`);
      console.log(`🌐 URL: ${result.deploymentUrl}`);
    }
  });
} 