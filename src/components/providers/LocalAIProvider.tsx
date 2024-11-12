import React, { useState } from 'react';
import { Brain, Server, Shield, Network, Target, Settings, Box, ChevronDown, Plus, AlertTriangle, Check, Globe, Terminal, Database } from 'lucide-react';

interface LocalModel {
  id: string;
  name: string;
  type: 'llm' | 'embedding' | 'image';
  status: 'installed' | 'available' | 'downloading';
  size: string;
  capabilities: string[];
  requirements: {
    cpu: string;
    ram: string;
    disk: string;
  };
}

const availableModels: LocalModel[] = [
  {
    id: 'llama2',
    name: 'Llama 2 7B',
    type: 'llm',
    status: 'available',
    size: '3.9GB',
    capabilities: ['text_generation', 'chat', 'completion'],
    requirements: {
      cpu: '4 cores',
      ram: '8GB',
      disk: '6GB'
    }
  },
  {
    id: 'codellama',
    name: 'CodeLlama 7B',
    type: 'llm',
    status: 'available',
    size: '4.1GB',
    capabilities: ['code_completion', 'code_explanation', 'debugging'],
    requirements: {
      cpu: '4 cores',
      ram: '8GB',
      disk: '6GB'
    }
  },
  {
    id: 'mistral',
    name: 'Mistral 7B',
    type: 'llm',
    status: 'available',
    size: '4.1GB',
    capabilities: ['text_generation', 'chat', 'analysis'],
    requirements: {
      cpu: '4 cores',
      ram: '8GB',
      disk: '6GB'
    }
  }
];

export default function LocalAIProvider() {
  const [models, setModels] = useState<LocalModel[]>(availableModels);
  const [selectedModel, setSelectedModel] = useState<LocalModel | null>(null);
  const [installStatus, setInstallStatus] = useState<{
    status: 'idle' | 'installing' | 'success' | 'error';
    message?: string;
  }>({ status: 'idle' });

  const handleInstall = async (model: LocalModel) => {
    setInstallStatus({ status: 'installing', message: `Installing ${model.name}...` });
    
    // Simulate installation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setInstallStatus({
      status: 'success',
      message: `Successfully installed ${model.name}`
    });
    
    setModels(prev => prev.map(m => 
      m.id === model.id ? { ...m, status: 'installed' } : m
    ));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Local AI Models</h2>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Custom Model
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-green-400" />
              <h3 className="font-medium text-green-100">Local Processing</h3>
            </div>
            <p className="text-sm text-green-200">
              Run AI models locally without external dependencies
            </p>
          </div>
          <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/30">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <h3 className="font-medium text-purple-100">Privacy First</h3>
            </div>
            <p className="text-sm text-purple-200">
              All data stays on your machine
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {models.map(model => (
            <div
              key={model.id}
              className={`p-4 rounded-lg border transition-colors ${
                selectedModel?.id === model.id
                  ? 'border-green-700 bg-green-900/20'
                  : 'border-gray-700 hover:border-green-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {model.type === 'llm' ? (
                    <Brain className="w-5 h-5 text-green-400 mt-0.5" />
                  ) : model.type === 'embedding' ? (
                    <Network className="w-5 h-5 text-blue-400 mt-0.5" />
                  ) : (
                    <Globe className="w-5 h-5 text-purple-400 mt-0.5" />
                  )}
                  
                  <div>
                    <h3 className="font-medium text-white">{model.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        model.status === 'installed'
                          ? 'bg-green-900 text-green-100'
                          : model.status === 'downloading'
                          ? 'bg-blue-900 text-blue-100'
                          : 'bg-gray-800 text-gray-300'
                      }`}>
                        {model.status}
                      </span>
                      <span className="text-sm text-gray-400">{model.size}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModel(
                    selectedModel?.id === model.id ? null : model
                  )}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {selectedModel?.id === model.id && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Capabilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {model.capabilities.map((cap, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">System Requirements</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <div className="text-xs text-gray-400">CPU</div>
                        <div className="text-sm font-medium text-gray-200">
                          {model.requirements.cpu}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <div className="text-xs text-gray-400">RAM</div>
                        <div className="text-sm font-medium text-gray-200">
                          {model.requirements.ram}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <div className="text-xs text-gray-400">Disk</div>
                        <div className="text-sm font-medium text-gray-200">
                          {model.requirements.disk}
                        </div>
                      </div>
                    </div>
                  </div>

                  {installStatus.status !== 'idle' && (
                    <div className={`p-3 rounded-lg ${
                      installStatus.status === 'installing' ? 'bg-blue-900/20 text-blue-200' :
                      installStatus.status === 'success' ? 'bg-green-900/20 text-green-200' :
                      'bg-red-900/20 text-red-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        {installStatus.status === 'installing' && (
                          <Terminal className="w-4 h-4 animate-spin" />
                        )}
                        {installStatus.status === 'success' && (
                          <Check className="w-4 h-4" />
                        )}
                        {installStatus.status === 'error' && (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        <span className="text-sm">{installStatus.message}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-4">
                    {model.status === 'available' && (
                      <button
                        onClick={() => handleInstall(model)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        disabled={installStatus.status === 'installing'}
                      >
                        <Database className={`w-4 h-4 ${
                          installStatus.status === 'installing' ? 'animate-spin' : ''
                        }`} />
                        Install Model
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedModel(null)}
                      className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}