import React, { useState } from 'react';
import { Shield, Code, Brain, Target, MessageSquare, Workflow, Zap, Settings, Box, ChevronDown, Plus, AlertTriangle, Check, Globe, Terminal, Database } from 'lucide-react';

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
}

const systemComponents: SystemComponent[] = [
  {
    id: '1',
    name: 'Guardian Defense',
    type: 'security',
    status: 'active',
    currentTask: {
      name: 'Network Vulnerability Analysis',
      progress: 65,
      steps: [
        'Port scanning',
        'Service enumeration',
        'Vulnerability assessment',
        'Report generation'
      ],
      currentStep: 2
    },
    capabilities: [
      'Threat detection',
      'Intrusion prevention',
      'Security auditing',
      'Incident response'
    ],
    metrics: {
      tasksCompleted: 128,
      learningProgress: 78,
      adaptationRate: 92
    }
  },
  {
    id: '2',
    name: '3D Model Assistant',
    type: 'development',
    status: 'processing',
    currentTask: {
      name: 'Drone Component Design',
      progress: 45,
      steps: [
        'Model specification',
        'Component design',
        'Structural analysis',
        'Export for printing'
      ],
      currentStep: 1
    },
    capabilities: [
      '3D modeling',
      'CAD optimization',
      'Print preparation',
      'Design validation'
    ],
    metrics: {
      tasksCompleted: 89,
      learningProgress: 85,
      adaptationRate: 88
    }
  }
];

export default function ActiveSystems() {
  const [components, setComponents] = useState<SystemComponent[]>(systemComponents);
  const [selectedComponent, setSelectedComponent] = useState<SystemComponent | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);
  const [message, setMessage] = useState('');

  const handleSendMessage = (componentId: string) => {
    if (!message.trim()) return;
    
    // Here you would typically handle the communication with the agent
    console.log(`Sending message to ${componentId}:`, message);
    setMessage('');
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
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {components.map(component => (
              <div
                key={component.id}
                className={`p-6 rounded-lg border transition-colors ${
                  selectedComponent?.id === component.id
                    ? 'border-blue-600 bg-gray-800'
                    : 'border-gray-700 hover:border-blue-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {component.type === 'security' && (
                      <Shield className="w-5 h-5 text-red-400 mt-0.5" />
                    )}
                    {component.type === 'development' && (
                      <Code className="w-5 h-5 text-blue-400 mt-0.5" />
                    )}
                    {component.type === 'analysis' && (
                      <Brain className="w-5 h-5 text-purple-400 mt-0.5" />
                    )}
                    
                    <div>
                      <h3 className="font-medium text-white">{component.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          component.status === 'active' ? 'bg-green-900 text-green-100' :
                          component.status === 'learning' ? 'bg-blue-900 text-blue-100' :
                          'bg-purple-900 text-purple-100'
                        }`}>
                          {component.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedComponent(
                      selectedComponent?.id === component.id ? null : component
                    )}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {component.currentTask && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">{component.currentTask.name}</span>
                        <span className="text-sm text-gray-400">
                          {component.currentTask.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${component.currentTask.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {component.currentTask.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg flex items-center gap-2 ${
                            idx === component.currentTask!.currentStep
                              ? 'bg-blue-900/20 border border-blue-800/30'
                              : idx < component.currentTask!.currentStep
                              ? 'bg-green-900/20 border border-green-800/30'
                              : 'bg-gray-800 border border-gray-700'
                          }`}
                        >
                          {idx < component.currentTask!.currentStep && (
                            <Check className="w-4 h-4 text-green-400" />
                          )}
                          {idx === component.currentTask!.currentStep && (
                            <Zap className="w-4 h-4 text-blue-400" />
                          )}
                          <span className="text-sm text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedComponent?.id === component.id && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Capabilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {component.capabilities.map((cap, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Agent Communication</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                          placeholder="Send a message to the agent..."
                        />
                        <button
                          onClick={() => handleSendMessage(component.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Send
                        </button>
                      </div>
                    </div>

                    {showMetrics && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-gray-800 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">Tasks Completed</div>
                          <div className="text-lg font-medium text-gray-200">
                            {component.metrics.tasksCompleted}
                          </div>
                        </div>
                        <div className="p-3 bg-gray-800 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">Learning</div>
                          <div className="text-lg font-medium text-gray-200">
                            {component.metrics.learningProgress}%
                          </div>
                        </div>
                        <div className="p-3 bg-gray-800 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">Adaptation</div>
                          <div className="text-lg font-medium text-gray-200">
                            {component.metrics.adaptationRate}%
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}