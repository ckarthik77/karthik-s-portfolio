
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
                  <span className={`text-sm ${getPriorityColor(task.priority)}`}>
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
                  <span className={`text-sm ${getPriorityColor(task.priority)}`}>
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
                  <span className={`text-sm ${getPriorityColor(task.priority)}`}>
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
    