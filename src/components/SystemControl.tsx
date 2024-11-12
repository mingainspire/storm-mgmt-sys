import React, { useState } from 'react';
import { Plus, MessageSquare, Box, Settings, X } from 'lucide-react';

interface SystemMessage {
  id: string;
  content: string;
  source: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

const initialMessages: SystemMessage[] = [
  {
    id: '1',
    content: 'New processing pod successfully initialized',
    source: 'System',
    timestamp: new Date().toISOString(),
    type: 'success',
  },
  {
    id: '2',
    content: 'Data Collection Pod requesting additional resources',
    source: 'Data Collection Pod',
    timestamp: new Date().toISOString(),
    type: 'warning',
  },
];

export default function SystemControl() {
  const [messages, setMessages] = useState<SystemMessage[]>(initialMessages);
  const [isCreatingPod, setIsCreatingPod] = useState(false);
  const [newPodName, setNewPodName] = useState('');
  const [newPodType, setNewPodType] = useState('processing');

  const handleCreatePod = (e: React.FormEvent) => {
    e.preventDefault();
    setMessages(prev => [{
      id: Date.now().toString(),
      content: `New ${newPodType} pod "${newPodName}" is being initialized...`,
      source: 'System',
      timestamp: new Date().toISOString(),
      type: 'info'
    }, ...prev]);
    setIsCreatingPod(false);
    setNewPodName('');
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Box className="w-5 h-5" />
            Pod Management
          </h2>
          <button
            onClick={() => setIsCreatingPod(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Pod
          </button>
        </div>
        <div className="p-6">
          {isCreatingPod ? (
            <form onSubmit={handleCreatePod} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pod Name
                </label>
                <input
                  type="text"
                  value={newPodName}
                  onChange={(e) => setNewPodName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter pod name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pod Type
                </label>
                <select
                  value={newPodType}
                  onChange={(e) => setNewPodType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="processing">Processing Pod</option>
                  <option value="collection">Data Collection Pod</option>
                  <option value="analysis">Analysis Pod</option>
                  <option value="custom">Custom Pod</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Pod
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreatingPod(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Create and manage pods to organize your agent workflows. Each pod can contain multiple agents and handle specific types of tasks.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Processing Pod</span>
                    <Settings className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </div>
                  <p className="text-sm text-gray-500">3 Active Agents</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Collection Pod</span>
                    <Settings className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </div>
                  <p className="text-sm text-gray-500">2 Active Agents</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            System Messages
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 flex items-start justify-between transition-colors ${
                message.type === 'warning' ? 'bg-yellow-50' :
                message.type === 'error' ? 'bg-red-50' :
                message.type === 'success' ? 'bg-green-50' :
                'bg-blue-50'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {message.source}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{message.content}</p>
              </div>
              <button
                onClick={() => removeMessage(message.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}