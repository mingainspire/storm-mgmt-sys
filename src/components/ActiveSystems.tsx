import React, { useState, useEffect } from 'react';
import { Share2, Shield, Code, Brain, Target, MessageSquare, Workflow, Zap, Settings, Box, ChevronDown, Plus, AlertTriangle, Check, Globe, Terminal, Database } from 'lucide-react';
import NetworkGraph from './memory/NetworkGraph';
import { MemoryState, MemoryPattern } from './memory/types';
import { useIntegrationState } from './providers/useIntegrationState';

interface SystemComponent {
  id: string;
  name: string;
  type: 'security' | 'development' | 'analysis';
  status: 'active' | 'learning' | 'processing';
  currentTask?: {
    name: string;
    progress: number;
    steps: string[];
    currentStep: number;
  };
  capabilities: string[];
  metrics: {
    tasksCompleted: number;
    learningProgress: number;
    adaptationRate: number;
  };
  potentialConnections?: string[];
}

export default function ActiveSystems() {
  const { state } = useIntegrationState();
  const [components, setComponents] = useState<SystemComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<SystemComponent | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);
  const [message, setMessage] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'network'>('list');

  useEffect(() => {
    const fetchedComponents = state.integrations.map(integration => ({
      id: integration.id,
      name: integration.name,
      type: integration.type === 'api' ? 'analysis' : integration.type === 'database' ? 'development' : 'security',
      status: integration.status === 'active' ? 'active' : 'processing',
      currentTask: {
        name: 'Sample Task',
        progress: 50,
        steps: ['Step 1', 'Step 2', 'Step 3'],
        currentStep: 1
      },
      capabilities: ['Capability 1', 'Capability 2'],
      metrics: {
        tasksCompleted: integration.metrics.requests,
        learningProgress: integration.metrics.uptime,
        adaptationRate: integration.metrics.latency
      },
      potentialConnections: []
    }));
    setComponents(fetchedComponents);
  }, [state]);

  const handleSendMessage = (componentId: string) => {
    if (!message.trim()) return;
    
    console.log(`Sending message to ${componentId}:`, message);
    setMessage('');
  };

  const networkGraphState: MemoryState = {
    patterns: components.map(component => ({
      id: component.id,
      type: component.type === 'security' ? 'directive' : 
             component.type === 'development' ? 'skill' : 'behavior',
      description: component.name,
      confidence: component.metrics.learningProgress / 100,
      timestamp: new Date().toISOString(),
      source: 'active-systems',
      context: component.capabilities,
      status: component.status === 'active' ? 'active' : 
              component.status === 'learning' ? 'pending' : 'archived',
      impact: component.potentialConnections,
      priority: component.metrics.adaptationRate > 90 ? 'high' : 
                component.metrics.adaptationRate > 70 ? 'medium' : 'low'
    })),
    knowledgeBases: [],
    messages: [],
    directives: [],
    learningObjectives: []
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Active Systems</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMetrics(!showMetrics)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  showMetrics 
                    ? 'bg-blue-900 text-blue-100' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Target className="w-4 h-4" />
                <span className="text-sm">Progress</span>
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'network' : 'list')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  viewMode === 'network'
                    ? 'bg-indigo-900 text-indigo-100'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Visualization</span>
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {components.map(component => (
                <div key={component.id} className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {component.type === 'security' ? (
                        <Shield className="w-5 h-5 text-red-500 mt-0.5" />
                      ) : component.type === 'development' ? (
                        <Code className="w-5 h-5 text-green-500 mt-0.5" />
                      ) : (
                        <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium text-white">{component.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            component.status === 'active' ? 'bg-green-100 text-green-800' :
                            component.status === 'learning' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {component.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {showMetrics && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-blue-600">Tasks Completed</div>
                        <div className="text-lg font-semibold text-blue-900">
                          {component.metrics.tasksCompleted}
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-green-600">Learning Progress</div>
                        <div className="text-lg font-semibold text-green-900">
                          {component.metrics.learningProgress}%
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm text-purple-600">Adaptation Rate</div>
                        <div className="text-lg font-semibold text-purple-900">
                          {component.metrics.adaptationRate}ms
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedComponent?.id === component.id && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Capabilities</h4>
                        <div className="flex flex-wrap gap-2">
                          {component.capabilities.map((cap, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Potential Connections</h4>
                        <div className="flex flex-wrap gap-2">
                          {component.potentialConnections?.map((conn, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center gap-2"
                            >
                              <Globe className="w-3 h-3" />
                              {conn}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">System Relationships</h3>
              <NetworkGraph memoryState={networkGraphState} />
              <div className="mt-4 text-sm text-gray-400">
                Visualization shows potential connections and capabilities between active systems
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
