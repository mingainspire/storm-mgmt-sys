import React, { useState } from 'react';
import { Brain, Scale, BookOpen, Music, Users, Search, Database } from 'lucide-react';

interface SystemConnection {
  id: string;
  type: 'social' | 'education' | 'legal' | 'entertainment' | 'research';
  name: string;
  status: 'connected' | 'pending' | 'learning';
  description: string;
  capabilities: string[];
  integrations: {
    type: string;
    name: string;
    status: 'active' | 'available';
  }[];
}

const systemConnections: SystemConnection[] = [
  {
    id: '1',
    type: 'legal',
    name: 'Legal Assistant Framework',
    status: 'connected',
    description: 'AI-powered legal research and document analysis system',
    capabilities: [
      'Document Analysis',
      'Case Law Research',
      'Contract Review',
      'Legal Writing Assistance'
    ],
    integrations: [
      {
        type: 'database',
        name: 'Legal Precedent Database',
        status: 'active'
      },
      {
        type: 'service',
        name: 'Document Processing Engine',
        status: 'active'
      }
    ]
  },
  {
    id: '2',
    type: 'education',
    name: 'Educational Content System',
    status: 'learning',
    description: 'Adaptive learning and content generation platform',
    capabilities: [
      'Course Generation',
      'Progress Tracking',
      'Interactive Exercises',
      'Performance Analytics'
    ],
    integrations: [
      {
        type: 'service',
        name: 'Content Recommendation Engine',
        status: 'active'
      },
      {
        type: 'database',
        name: 'Learning Materials Repository',
        status: 'available'
      }
    ]
  }
];

export default function SystemIntegration() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

  return (
    <div className="bg-gray-800 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">System Integration</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                showSuggestions 
                  ? 'bg-purple-900 text-purple-100' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span className="text-sm">AI Suggestions</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {systemConnections.map(connection => (
            <div
              key={connection.id}
              className="p-6 bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {connection.type === 'legal' && (
                    <Scale className="w-5 h-5 text-purple-400" />
                  )}
                  {connection.type === 'education' && (
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  )}
                  {connection.type === 'entertainment' && (
                    <Music className="w-5 h-5 text-green-400" />
                  )}
                  {connection.type === 'social' && (
                    <Users className="w-5 h-5 text-yellow-400" />
                  )}
                  {connection.type === 'research' && (
                    <Search className="w-5 h-5 text-red-400" />
                  )}
                  
                  <div>
                    <h3 className="font-medium text-white">{connection.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        connection.status === 'connected' 
                          ? 'bg-green-900 text-green-100' 
                          : connection.status === 'learning'
                          ? 'bg-blue-900 text-blue-100'
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {connection.status}
                      </span>
                      <span className="text-sm text-gray-400">{connection.type}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-gray-300">{connection.description}</p>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-200 mb-2">Capabilities</h4>
                <div className="flex flex-wrap gap-2">
                  {connection.capabilities.map((cap, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-200 mb-2">Available Integrations</h4>
                <div className="space-y-2">
                  {connection.integrations.map((integration, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-200">{integration.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        integration.status === 'active'
                          ? 'bg-green-900 text-green-100'
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {integration.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showSuggestions && (
          <div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-medium text-white">AI Suggestions</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Based on your usage patterns and system requirements, here are some recommended integrations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="w-4 h-4 text-purple-400" />
                  <h4 className="font-medium text-gray-200">Legal Research Assistant</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Enhanced legal document analysis and case law research capabilities
                </p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <h4 className="font-medium text-gray-200">Educational Content Generator</h4>
                </div>
                <p className="text-sm text-gray-300">
                  Create personalized learning materials and interactive exercises
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}