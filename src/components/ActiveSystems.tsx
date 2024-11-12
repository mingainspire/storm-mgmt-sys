import React, { useState } from 'react';
import { Share2, Shield, Code, Brain, Target, MessageSquare, Workflow, Zap, Settings, Box, ChevronDown, Plus, AlertTriangle, Check, Globe, Terminal, Database } from 'lucide-react';
import NetworkGraph from './memory/NetworkGraph';
import { MemoryState, MemoryPattern } from './memory/types';

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
    },
    potentialConnections: ['3D Model Assistant', 'Data Analysis Hub']
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
    },
    potentialConnections: ['Guardian Defense', 'Simulation Environment']
  }
];

export default function ActiveSystems() {
  const [components, setComponents] = useState<SystemComponent[]>(systemComponents);
  const [selectedComponent, setSelectedComponent] = useState<SystemComponent | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);
  const [message, setMessage] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'network'>('list');

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
                // ... (previous component rendering code remains the same)
                <div key={component.id}>
                  {/* Existing component card */}
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
