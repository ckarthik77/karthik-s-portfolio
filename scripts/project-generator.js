#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  projectTypes: ['ai-chat-app', 'ecommerce-dashboard', 'task-manager', 'weather-app', 'social-media-dashboard'],
  deploymentPlatforms: ['vercel', 'netlify'],
  githubUsername: 'ckarthik77'
};

// Project templates with improved structure
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
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">E-commerce Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Sales</h3>
          <p className="text-3xl font-bold text-green-600">$45,231</p>
          <p className="text-sm text-green-500">+20.1% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Orders</h3>
          <p className="text-3xl font-bold text-blue-600">2,350</p>
          <p className="text-sm text-blue-500">+180.1% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Customers</h3>
          <p className="text-3xl font-bold text-purple-600">1,234</p>
          <p className="text-sm text-purple-500">+19% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
          <p className="text-3xl font-bold text-orange-600">$12,234</p>
          <p className="text-sm text-orange-500">+49% from last month</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
          <Line data={salesData} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Top Products</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Product A</span>
              <span className="font-semibold">$2,300</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Product B</span>
              <span className="font-semibold">$1,800</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Product C</span>
              <span className="font-semibold">$1,200</span>
            </div>
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
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Socket.io'],
    type: 'Web App',
    template: `
import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create a modern landing page design',
      status: 'todo',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication system',
      status: 'in-progress',
      priority: 'medium'
    }
  ]);
  
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      priority: newTask.priority as 'low' | 'medium' | 'high'
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask({ title: '', description: '', priority: 'medium' });
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Task Management</h1>
      
      {/* Add new task */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            className="p-3 border rounded-lg"
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
            className="p-3 border rounded-lg"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <button
          onClick={addTask}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
      
      {/* Task boards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">To Do</h3>
          <div className="space-y-4">
            {tasks.filter(task => task.status === 'todo').map(task => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{task.title}</h4>
                  <span className={\`text-sm \${getPriorityColor(task.priority)}\`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                <button
                  onClick={() => updateTaskStatus(task.id, 'in-progress')}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">In Progress</h3>
          <div className="space-y-4">
            {tasks.filter(task => task.status === 'in-progress').map(task => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{task.title}</h4>
                  <span className={\`text-sm \${getPriorityColor(task.priority)}\`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                <button
                  onClick={() => updateTaskStatus(task.id, 'completed')}
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Complete
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Completed</h3>
          <div className="space-y-4">
            {tasks.filter(task => task.status === 'completed').map(task => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow opacity-75">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold line-through">{task.title}</h4>
                  <span className={\`text-sm \${getPriorityColor(task.priority)}\`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
    `
  },
  
  'weather-app': {
    name: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with real-time data and forecasts.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeather API'],
    type: 'Web App',
    template: `
import React, { useState, useEffect } from 'react';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const WeatherDashboard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate weather data
    setTimeout(() => {
      setWeather({
        city: 'New York',
        temperature: 22,
        description: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '☁️'
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Weather Dashboard</h1>
      
      {weather && (
        <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">{weather.city}</h2>
            <div className="text-6xl mb-4">{weather.icon}</div>
            <div className="text-5xl font-bold mb-2">{weather.temperature}°C</div>
            <div className="text-xl">{weather.description}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💧</div>
              <div className="text-lg font-semibold">Humidity</div>
              <div className="text-2xl font-bold">{weather.humidity}%</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💨</div>
              <div className="text-lg font-semibold">Wind Speed</div>
              <div className="text-2xl font-bold">{weather.windSpeed} km/h</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Today's Forecast</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Morning</span>
              <span className="font-semibold">18°C</span>
            </div>
            <div className="flex justify-between">
              <span>Afternoon</span>
              <span className="font-semibold">24°C</span>
            </div>
            <div className="flex justify-between">
              <span>Evening</span>
              <span className="font-semibold">20°C</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Weekly Forecast</h3>
          <div className="space-y-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="flex justify-between">
                <span>{day}</span>
                <span className="font-semibold">{20 + i}°C</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Air Quality</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500 mb-2">Good</div>
            <div className="text-gray-600">AQI: 45</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
    `
  },
  
  'social-media-dashboard': {
    name: 'Social Media Dashboard',
    description: 'A comprehensive social media analytics dashboard with real-time metrics.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    type: 'Analytics',
    template: `
import React, { useState } from 'react';

interface SocialMetric {
  platform: string;
  followers: number;
  engagement: number;
  posts: number;
  growth: number;
  color: string;
}

const SocialMediaDashboard = () => {
  const [metrics] = useState<SocialMetric[]>([
    {
      platform: 'Instagram',
      followers: 15420,
      engagement: 8.5,
      posts: 234,
      growth: 12.3,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      platform: 'Twitter',
      followers: 8920,
      engagement: 6.2,
      posts: 156,
      growth: 8.7,
      color: 'bg-gradient-to-r from-blue-400 to-blue-600'
    },
    {
      platform: 'LinkedIn',
      followers: 3240,
      engagement: 4.8,
      posts: 89,
      growth: 15.2,
      color: 'bg-gradient-to-r from-blue-600 to-blue-800'
    },
    {
      platform: 'TikTok',
      followers: 45600,
      engagement: 12.1,
      posts: 567,
      growth: 23.4,
      color: 'bg-gradient-to-r from-pink-500 to-red-500'
    }
  ]);

  const [recentPosts] = useState([
    { id: 1, content: 'Just launched our new product! 🚀', platform: 'Instagram', likes: 234, comments: 45, shares: 12 },
    { id: 2, content: 'Excited to share our latest tech insights', platform: 'Twitter', likes: 156, comments: 23, shares: 8 },
    { id: 3, content: 'Building the future of web development', platform: 'LinkedIn', likes: 89, comments: 12, shares: 5 }
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Social Media Dashboard</h1>
      
      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.platform} className={\`\${metric.color} rounded-lg p-6 text-white\`}>
            <h3 className="text-lg font-semibold mb-2">{metric.platform}</h3>
            <div className="text-3xl font-bold mb-1">{metric.followers.toLocaleString()}</div>
            <div className="text-sm opacity-90">Followers</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engagement</span>
                <span>{metric.engagement}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Growth</span>
                <span className="text-green-300">+{metric.growth}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Total Reach</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {metrics.reduce((sum, m) => sum + m.followers, 0).toLocaleString()}
          </div>
          <p className="text-gray-600">Across all platforms</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Average Engagement</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {(metrics.reduce((sum, m) => sum + m.engagement, 0) / metrics.length).toFixed(1)}%
          </div>
          <p className="text-gray-600">Overall engagement rate</p>
        </div>
      </div>
      
      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{post.content}</p>
                  <p className="text-sm text-gray-500">{post.platform}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    <span className="mr-4">❤️ {post.likes}</span>
                    <span className="mr-4">💬 {post.comments}</span>
                    <span>🔄 {post.shares}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
    `
  }
};

// Utility functions
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate project structure
const generateProjectStructure = (projectType, projectName) => {
  const template = projectTemplates[projectType];
  if (!template) {
    throw new Error(`Unknown project type: ${projectType}`);
  }

  const projectDir = path.join(__dirname, '../projects', projectName.toLowerCase().replace(/\s+/g, '-'));
  
  // Create project directory
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  // Create package.json
  const packageJson = {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint'
    },
    dependencies: {
      next: '14.0.4',
      react: '^18',
      'react-dom': '^18',
      typescript: '^5',
      '@types/node': '^20',
      '@types/react': '^18',
      '@types/react-dom': '^18',
      tailwindcss: '^3.3.0',
      autoprefixer: '^10.0.1',
      postcss: '^8'
    }
  };

  // Add specific dependencies based on project type
  if (projectType === 'ai-chat-app') {
    packageJson.dependencies['openai'] = '^4.0.0';
  } else if (projectType === 'ecommerce-dashboard') {
    packageJson.dependencies['chart.js'] = '^4.0.0';
    packageJson.dependencies['react-chartjs-2'] = '^5.0.0';
  } else if (projectType === 'weather-app') {
    packageJson.dependencies['axios'] = '^1.0.0';
  }

  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create Next.js configuration
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 13+ uses app directory by default
}

module.exports = nextConfig`;

  fs.writeFileSync(path.join(projectDir, 'next.config.js'), nextConfig);

  // Create TypeScript configuration
  const tsConfig = `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;

  fs.writeFileSync(path.join(projectDir, 'tsconfig.json'), tsConfig);

  // Create Tailwind configuration
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

  fs.writeFileSync(path.join(projectDir, 'tailwind.config.js'), tailwindConfig);

  // Create PostCSS configuration
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

  fs.writeFileSync(path.join(projectDir, 'postcss.config.js'), postcssConfig);

  // Create source directory structure
  const srcDir = path.join(projectDir, 'src');
  fs.mkdirSync(srcDir, { recursive: true });

  // Create app directory for Next.js 13+ app router
  const appDir = path.join(srcDir, 'app');
  fs.mkdirSync(appDir, { recursive: true });

  // Create layout.tsx
  const layoutContent = `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${template.name}',
  description: '${template.description}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}`;

  fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutContent);

  // Create globals.css
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;

  fs.writeFileSync(path.join(appDir, 'globals.css'), globalsCss);

  // Create page.tsx with the template
  const pageContent = `import ${template.name.replace(/\s+/g, '')} from '@/components/${template.name.replace(/\s+/g, '')}'

export default function Home() {
  return <${template.name.replace(/\s+/g, '')} />
}`;

  fs.writeFileSync(path.join(appDir, 'page.tsx'), pageContent);

  // Create components directory and main component
  const componentsDir = path.join(srcDir, 'components');
  fs.mkdirSync(componentsDir, { recursive: true });

  const componentName = template.name.replace(/\s+/g, '');
  const componentFile = path.join(componentsDir, `${componentName}.tsx`);
  fs.writeFileSync(componentFile, template.template);

  // Create README.md
  const readmeContent = `# ${template.name}

${template.description}

## Technologies Used

${template.technologies.map(tech => `- ${tech}`).join('\n')}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Modern React with TypeScript
- Tailwind CSS for styling
- Next.js for server-side rendering
- Responsive design
- Real-time updates

## Deployment

This project can be deployed to Vercel, Netlify, or any other platform that supports Next.js applications.
`;

  fs.writeFileSync(path.join(projectDir, 'README.md'), readmeContent);

  return projectDir;
};

// Deploy project to Vercel
const deployProject = async (projectDir, projectName) => {
  try {
    console.log(`🚀 Deploying ${projectName} to Vercel...`);
    
    // Check if Vercel CLI is available
    try {
      execSync('vercel --version', { stdio: 'pipe' });
    } catch (error) {
      console.log('⚠️ Vercel CLI not found, skipping deployment');
      return null;
    }

    // Change to project directory
    process.chdir(projectDir);

    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Deploy to Vercel
    console.log('🌐 Deploying to Vercel...');
    const deployOutput = execSync('vercel --prod --yes', { 
      stdio: 'pipe',
      encoding: 'utf8'
    });

    // Extract deployment URL from output
    const urlMatch = deployOutput.match(/https:\/\/[^\s]+/);
    const deploymentUrl = urlMatch ? urlMatch[0] : null;

    if (deploymentUrl) {
      console.log(`✅ Deployed successfully: ${deploymentUrl}`);
      return deploymentUrl;
    } else {
      console.log('⚠️ Could not extract deployment URL');
      return null;
    }
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    return null;
  }
};

// Create GitHub repository
const createGitHubRepo = async (projectName) => {
  try {
    console.log(`📝 Creating GitHub repository for ${projectName}...`);
    
    // Check if GitHub CLI is available
    try {
      execSync('gh --version', { stdio: 'pipe' });
    } catch (error) {
      console.log('⚠️ GitHub CLI not found, skipping repository creation');
      return null;
    }

    const repoName = projectName.toLowerCase().replace(/\s+/g, '-');
    const repoUrl = `https://github.com/${CONFIG.githubUsername}/${repoName}`;

    // Create repository
    execSync(`gh repo create ${repoName} --public --description "${projectName} - A modern web application"`, {
      stdio: 'inherit'
    });

    console.log(`✅ GitHub repository created: ${repoUrl}`);
    return repoUrl;
  } catch (error) {
    console.error('❌ GitHub repository creation failed:', error.message);
    return null;
  }
};

// Main function to generate and deploy project
const generateAndDeployProject = async () => {
  try {
    const projectType = getRandomElement(CONFIG.projectTypes);
    const template = projectTemplates[projectType];
    
    if (!template) {
      throw new Error(`Unknown project type: ${projectType}`);
    }

    console.log(`🎯 Generating ${template.name}...`);
    
    // Generate project structure
    const projectDir = generateProjectStructure(projectType, template.name);
    console.log(`✅ Project structure created in: ${projectDir}`);

    // Create GitHub repository
    const githubUrl = await createGitHubRepo(template.name);

    // Deploy to Vercel
    const deploymentUrl = await deployProject(projectDir, template.name);

    return {
      name: template.name,
      description: template.description,
      technologies: template.technologies,
      type: template.type,
      githubUrl,
      deploymentUrl,
      projectDir
    };
  } catch (error) {
    console.error('❌ Project generation failed:', error.message);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  generateAndDeployProject()
    .then((result) => {
      console.log('\n🎉 Project generated successfully!');
      console.log(`Name: ${result.name}`);
      console.log(`Description: ${result.description}`);
      console.log(`Technologies: ${result.technologies.join(', ')}`);
      if (result.githubUrl) {
        console.log(`GitHub: ${result.githubUrl}`);
      }
      if (result.deploymentUrl) {
        console.log(`Live URL: ${result.deploymentUrl}`);
      }
    })
    .catch((error) => {
      console.error('\n💥 Project generation failed:', error.message);
      process.exit(1);
    });
}

module.exports = { generateAndDeployProject }; 