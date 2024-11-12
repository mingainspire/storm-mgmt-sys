import React from 'react';
import { Brain, Code, Terminal, Globe, Database, Workflow, FileText, Blocks, Cpu, Network, GitBranch, Settings, Lightbulb, Users, ArrowRight, Scale, Target, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CoreSystem {
  id: string;
  name: string;
  description: string;
  type: 'pod' | 'service' | 'skill';
  icon: LucideIcon;
  capabilities: string[];
  integrations: string[];
}

const coreSystems: CoreSystem[] = [
  {
    id: 'orchestrator',
    name: 'System Orchestrator',
    description: 'The foundation that helps you build and coordinate everything else, learning and growing together',
    type: 'pod',
    icon: Brain,
    capabilities: [
      'Workflow Management',
      'Resource Allocation',
      'Pattern Learning',
      'System Growth'
    ],
    integrations: ['All Systems', 'External APIs']
  },
  {
    id: 'creative',
    name: 'Creative Lab',
    description: 'Modular creative tools that adapt to your style and needs',
    type: 'pod',
    icon: Lightbulb,
    capabilities: [
      'Content Generation',
      'Design Assistance',
      'Asset Creation',
      'Style Learning'
    ],
    integrations: ['Orchestrator', 'File System', 'Resource Pod']
  },
  {
    id: 'resource',
    name: 'Resource Pod',
    description: 'Efficient resource management and allocation across systems',
    type: 'pod',
    icon: Scale,
    capabilities: [
      'Load Balancing',
      'Resource Optimization',
      'Performance Monitoring',
      'Scaling Management'
    ],
    integrations: ['Orchestrator', 'All Pods']
  },
  {
    id: 'learning',
    name: 'Pattern Recognition',
    description: 'Learns from interactions to improve system capabilities',
    type: 'pod',
    icon: Target,
    capabilities: [
      'Behavior Analysis',
      'Preference Learning',
      'Pattern Detection',
      'Adaptation Suggestions'
    ],
    integrations: ['Orchestrator', 'All Systems']
  }
];

export default function SystemGuide() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Start Small, Build Together</h2>
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Foundation System</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Begin with the Orchestrator - your companion in building a personalized ecosystem of tools and workflows.
          Together, we'll learn, adapt, and grow based on your needs and patterns.
        </p>
      </div>

      <div className="p-6">
        {/* Learning Journey */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-medium text-purple-900">Our Learning Journey</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <h4 className="font-medium text-purple-900">You Define Goals</h4>
                </div>
                <p className="text-sm text-purple-700">
                  Share what you want to achieve, and we'll break it down into manageable steps
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Workflow className="w-4 h-4 text-purple-500" />
                  <h4 className="font-medium text-purple-900">We Build Together</h4>
                </div>
                <p className="text-sm text-purple-700">
                  Create workflows and tools that fit your needs, learning from each interaction
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <h4 className="font-medium text-purple-900">System Grows</h4>
                </div>
                <p className="text-sm text-purple-700">
                  As patterns emerge, we'll suggest new tools and improvements
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modular Architecture */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <Blocks className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium text-green-900">Modular by Design</h3>
            </div>
            <p className="text-sm text-green-800 mb-4">
              Each capability lives in its own pod, using only the resources it needs. The orchestrator 
              coordinates these pods efficiently, whether they're using:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="text-sm font-medium text-green-900 mb-2">Local Models</h4>
                <p className="text-xs text-green-700">
                  Efficient Ollama models for quick, offline processing
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="text-sm font-medium text-green-900 mb-2">Specialized Agents</h4>
                <p className="text-xs text-green-700">
                  Purpose-built agents for specific tasks
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="text-sm font-medium text-green-900 mb-2">External APIs</h4>
                <p className="text-xs text-green-700">
                  When additional capabilities are needed
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="text-sm font-medium text-green-900 mb-2">Custom Tools</h4>
                <p className="text-xs text-green-700">
                  Tools built based on your specific needs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Systems */}
        <h3 className="text-lg font-medium text-gray-900 mb-4">Starting with the Essentials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreSystems.map(system => {
            const Icon = system.icon;
            return (
              <div
                key={system.id}
                className={`p-6 rounded-lg border transition-colors ${
                  system.id === 'orchestrator'
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    system.id === 'orchestrator' ? 'bg-blue-100' : 'bg-gray-50'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      system.id === 'orchestrator' ? 'text-blue-600' : 'text-blue-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{system.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        system.type === 'pod' 
                          ? 'bg-purple-100 text-purple-800'
                          : system.type === 'service'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {system.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{system.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">Capabilities</h4>
                        <div className="flex flex-wrap gap-2">
                          {system.capabilities.map((cap, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">Integrates With</h4>
                        <div className="flex flex-wrap gap-2">
                          {system.integrations.map((integration, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs"
                            >
                              {integration}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Growth Path */}
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-100">
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="w-5 h-5 text-yellow-700" />
            <h3 className="font-medium text-yellow-900">Your System Will Grow</h3>
          </div>
          <p className="text-sm text-yellow-800 mb-4">
            As we learn together, the orchestrator will help you build specialized tools and systems:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">Development Tools</h4>
              <p className="text-xs text-yellow-700">
                Code completion, project management, and development workflows
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">Content Creation</h4>
              <p className="text-xs text-yellow-700">
                Writing assistance, design tools, and asset management
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">Custom Solutions</h4>
              <p className="text-xs text-yellow-700">
                Specialized tools based on your unique needs and patterns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}