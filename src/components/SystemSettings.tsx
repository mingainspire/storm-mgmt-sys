import React, { useState } from 'react';
import { Brain, Cloud, Shield, MessageSquare, Workflow, Target, GitBranch, Settings, Box, ChevronDown, Plus, AlertTriangle, AlertCircle, Info, Check, Users, Globe, Network, Lock, Key, Server, Database } from 'lucide-react';
import LocalAIProvider from './providers/LocalAIProvider';
import APIProvider from './providers/APIProvider';
import RAGMemory from './memory/RAGMemory';
import SystemIntegrations from './providers/SystemIntegrations';

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState<'memory' | 'integrations' | 'local-ai' | 'api'>('memory');

  return (
    <div className="card">
      <div className="border-b border-gray-700">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'memory'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <Brain className="w-5 h-5" />
            System Memory
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'integrations'
                ? 'border-green-500 text-green-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <GitBranch className="w-5 h-5" />
            System Integrations
          </button>
          <button
            onClick={() => setActiveTab('local-ai')}
            className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'local-ai'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <Server className="w-5 h-5" />
            Local AI
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'api'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <Network className="w-5 h-5" />
            API Configuration
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'memory' && <RAGMemory />}
        {activeTab === 'integrations' && <SystemIntegrations />}
        {activeTab === 'local-ai' && <LocalAIProvider />}
        {activeTab === 'api' && <APIProvider />}
      </div>
    </div>
  );
}