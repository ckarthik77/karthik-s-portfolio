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

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input };
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
      const assistantMessage: Message = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, assistantMessage]);
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
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    type: 'Full Stack',
    template: `
import React from 'react';

const EcommerceDashboard = () => {
  const stats = [
    { label: 'Total Sales', value: '$45,231', change: '+20.1%', color: 'text-green-400' },
    { label: 'Orders', value: '2,350', change: '+180.1%', color: 'text-blue-400' },
    { label: 'Customers', value: '1,234', change: '+19%', color: 'text-purple-400' },
    { label: 'Products', value: '456', change: '+12%', color: 'text-yellow-400' }
  ];

  const recentOrders = [
    { id: 1, customer: 'John Doe', amount: '$299.00', status: 'Completed' },
    { id: 2, customer: 'Jane Smith', amount: '$199.00', status: 'Processing' },
    { id: 3, customer: 'Bob Johnson', amount: '$599.00', status: 'Completed' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">E-commerce Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm">{stat.label}</h3>
            <p className={\`text-3xl font-bold \${stat.color}\`}>{stat.value}</p>
            <p className="text-green-600 text-sm">{stat.change} from last month</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-400">{order.amount}</p>
                </div>
                <span className={\`px-2 py-1 rounded text-xs \${order.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-600'}\`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              Add New Product
            </button>
            <button className="w-full p-3 bg-green-600 hover:bg-green-700 rounded transition-colors">
              View Analytics
            </button>
            <button className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded transition-colors">
              Manage Orders
            </button>
          </div>
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

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
  createdAt: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
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
      "next": "^14.0.0"
    },
    devDependencies: {
      "typescript": "^5.0.0",
      "@types/react": "^18.0.0",
      "@types/react-dom": "^18.0.0",
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

// Deploy project to Vercel and GitHub
const deployProject = async (projectDir, projectName) => {
  console.log(`🚀 Deploying ${projectName} to Vercel and GitHub...`);
  
  try {
    // Change to project directory
    process.chdir(projectDir);
    
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    // Build project
    console.log('🔨 Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Initialize Git repository
    console.log('📝 Initializing Git repository...');
    execSync('git init', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Initial commit"', { stdio: 'inherit' });
    
    // Create GitHub repository using GitHub CLI
    const repoName = projectName.toLowerCase().replace(/\s+/g, '-');
    console.log(`🐙 Creating GitHub repository: ${repoName}...`);
    
    try {
      // Create repository on GitHub
      execSync(`gh repo create ${repoName} --public --source=. --remote=origin --push`, { 
        stdio: 'inherit',
        env: { ...process.env, GITHUB_TOKEN: process.env.GITHUB_TOKEN }
      });
      
      console.log(`✅ GitHub repository created: https://github.com/ckarthik77/${repoName}`);
    } catch (ghError) {
      console.log('⚠️ GitHub CLI not available, creating repository manually...');
      // Fallback: Create repository manually
      const githubUrl = `https://github.com/ckarthik77/${repoName}`;
      console.log(`📋 Please create repository manually: ${githubUrl}`);
      console.log('📋 Then run: git remote add origin https://github.com/ckarthik77/${repoName}.git');
      console.log('📋 Then run: git push -u origin main');
    }
    
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
    console.log(`🐙 GitHub URL: https://github.com/ckarthik77/${repoName}`);
    
    return {
      deploymentUrl,
      githubUrl: `https://github.com/ckarthik77/${repoName}`
    };
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
    const deploymentResult = await deployProject(project.directory, project.name);
    
    return {
      ...project,
      deploymentUrl: deploymentResult?.deploymentUrl,
      githubUrl: deploymentResult?.githubUrl
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