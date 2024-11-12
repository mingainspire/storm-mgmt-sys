import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import type { Task } from '../types';

const tasks: Task[] = [
  {
    id: '1',
    title: 'Process monthly data reports',
    status: 'in_progress',
    priority: 'high',
    assignedAgent: 'Task Processor',
    progress: 45,
    createdAt: '2024-03-10T08:00:00Z',
    deadline: '2024-03-11T17:00:00Z',
    workflow: '1',
  },
  {
    id: '2',
    title: 'Generate content for blog posts',
    status: 'pending',
    priority: 'medium',
    progress: 0,
    createdAt: '2024-03-10T09:30:00Z',
    deadline: '2024-03-12T12:00:00Z',
    workflow: '2',
  },
  {
    id: '3',
    title: 'Analyze customer feedback',
    status: 'failed',
    priority: 'high',
    progress: 65,
    createdAt: '2024-03-09T14:00:00Z',
    deadline: '2024-03-10T23:00:00Z',
    workflow: '1',
  },
];

const priorityColors = {
  low: 'bg-blue-900 text-blue-100',
  medium: 'bg-yellow-900 text-yellow-100',
  high: 'bg-red-900 text-red-100',
};

const statusColors = {
  pending: 'bg-gray-800',
  in_progress: 'bg-blue-900',
  completed: 'bg-green-900',
  failed: 'bg-red-900',
};

export default function TaskQueue() {
  return (
    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Task Queue</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          New Task
        </button>
      </div>
      <div className="divide-y divide-gray-700">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`p-6 transition-all duration-300 hover:bg-gray-700 ${
              task.status === 'in_progress' ? 'bg-gray-700' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
                <h3 className="font-medium text-white">{task.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                {new Date(task.deadline!) < new Date() && (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">
                  {new Date(task.deadline!).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Progress</span>
                  <span className="text-sm font-medium text-gray-200">
                    {task.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${statusColors[task.status]} transition-all duration-500`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
              {task.assignedAgent && (
                <div className="text-sm text-gray-300">
                  Assigned to: {task.assignedAgent}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}