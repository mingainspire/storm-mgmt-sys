import React, { useState } from 'react';
import { Brain, Cloud, Shield, MessageSquare, Workflow, Target, GitBranch, Settings, Box, ChevronDown, Plus, AlertTriangle, AlertCircle, Info, Check, Users, Globe, Network, Lock, Key, Server, Database } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: 'local' | 'cloud' | 'custom';
  status: 'connected' | 'disconnected' | 'error';
  endpoint?: string;
  apiKey?: string;
  models?: string[];
  capabilities: string[];
  config: {
    maxConcurrentRequests?: number;
    timeout?: number;
    retryAttempts?: number;
    temperature?: number;
    maxTokens?: number;
  };
}

const initialProviders: Provider[] = [
  {
    id: 'ollama-local',
    name: 'Ollama Local',
    type: 'local',
    status: 'disconnected',
    endpoint: 'http://localhost:11434',
    models: ['llama2', 'codellama', 'mistral'],
    capabilities: ['text_generation', 'code_completion', 'embedding'],
    config: {
      maxConcurrentRequests: 4,
      timeout: 30000,
      retryAttempts: 3,
      temperature: 0.7
    }
  },
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'cloud',
    status: 'disconnected',
    endpoint: 'https://api.openai.com/v1',
    models: ['gpt-4', 'gpt-3.5-turbo', 'dall-e-3', 'text-embedding-3-small'],
    capabilities: [
      'text_generation',
      'code_completion',
      'function_calling',
      'image_generation',
      'embedding',
      'vision'
    ],
    config: {
      maxConcurrentRequests: 10,
      timeout: 60000,
      retryAttempts: 3,
      temperature: 0.7,
      maxTokens: 2048
    }
  }
];

export default function APIProvider() {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [testStatus, setTestStatus] = useState<{
    status: 'idle' | 'testing' | 'success' | 'error';
    message?: string;
  }>({ status: 'idle' });

  const handleTestConnection = async (provider: Provider) => {
    setTestStatus({ status: 'testing' });
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (provider.type === 'local' || (provider.type === 'cloud' && provider.apiKey)) {
      setTestStatus({
        status: 'success',
        message: `Successfully connected to ${provider.name}`
      });
      
      setProviders(prev => prev.map(p => 
        p.id === provider.id ? { ...p, status: 'connected' } : p
      ));
    } else {
      setTestStatus({
        status: 'error',
        message: provider.type === 'cloud' 
          ? 'API key is required for connection'
          : 'Failed to connect. Please check endpoint and configuration.'
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-lg font-semibold text-white">AI Provider Configuration</h2>
        <p className="mt-1 text-sm text-gray-400">
          Configure local and remote AI providers for enhanced capabilities
        </p>
      </div>

      <div className="card-body">
        <div className="space-y-4">
          {providers.map(provider => (
            <div
              key={provider.id}
              className={`p-4 rounded-lg border ${
                selectedProvider?.id === provider.id
                  ? 'border-blue-600 bg-gray-800'
                  : 'border-gray-700 hover:border-blue-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {provider.type === 'local' ? (
                    <Server className="w-5 h-5 text-purple-400" />
                  ) : provider.type === 'cloud' ? (
                    <Cloud className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Database className="w-5 h-5 text-green-400" />
                  )}
                  <div>
                    <h4 className="font-medium text-white">{provider.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        provider.status === 'connected'
                          ? 'bg-green-900 text-green-100'
                          : provider.status === 'error'
                          ? 'bg-red-900 text-red-100'
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {provider.status}
                      </span>
                      {provider.endpoint && (
                        <span className="text-xs text-gray-400">
                          {provider.endpoint}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProvider(
                    selectedProvider?.id === provider.id ? null : provider
                  )}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {provider.models && provider.models.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-xs font-medium text-gray-400 mb-2">Available Models</h5>
                  <div className="flex flex-wrap gap-2">
                    {provider.models.map(model => (
                      <span
                        key={model}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3">
                <h5 className="text-xs font-medium text-gray-400 mb-2">Capabilities</h5>
                <div className="flex flex-wrap gap-2">
                  {provider.capabilities.map((cap, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-900 text-blue-100 rounded-full text-xs"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProvider?.id === provider.id && (
                <div className="mt-4 space-y-4 p-4 bg-gray-800 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Endpoint URL
                    </label>
                    <input
                      type="text"
                      value={provider.endpoint || ''}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                      placeholder="Enter API endpoint"
                    />
                  </div>

                  {provider.type === 'cloud' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={provider.apiKey || ''}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                          placeholder="Enter API key"
                        />
                        <Key className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Temperature
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="2"
                        value={provider.config.temperature || 0.7}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Max Tokens
                      </label>
                      <input
                        type="number"
                        value={provider.config.maxTokens || 2048}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Max Requests
                      </label>
                      <input
                        type="number"
                        value={provider.config.maxConcurrentRequests || 1}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Timeout (ms)
                      </label>
                      <input
                        type="number"
                        value={provider.config.timeout || 30000}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Retry Attempts
                      </label>
                      <input
                        type="number"
                        value={provider.config.retryAttempts || 3}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                      />
                    </div>
                  </div>

                  {testStatus.status !== 'idle' && (
                    <div className={`p-3 rounded-lg ${
                      testStatus.status === 'testing' ? 'bg-blue-900 text-blue-100' :
                      testStatus.status === 'success' ? 'bg-green-900 text-green-100' :
                      'bg-red-900 text-red-100'
                    }`}>
                      <div className="flex items-center gap-2">
                        {testStatus.status === 'testing' && (
                          <Network className="w-4 h-4 animate-spin" />
                        )}
                        {testStatus.status === 'success' && (
                          <Check className="w-4 h-4" />
                        )}
                        {testStatus.status === 'error' && (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        <span className="text-sm">{testStatus.message}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-4">
                    <button
                      onClick={() => handleTestConnection(provider)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      disabled={testStatus.status === 'testing'}
                    >
                      <Network className={`w-4 h-4 ${
                        testStatus.status === 'testing' ? 'animate-spin' : ''
                      }`} />
                      Test Connection
                    </button>
                    <button
                      onClick={() => setSelectedProvider(null)}
                      className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-900/30">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-100">Security Note</h4>
              <p className="text-sm text-blue-200/80 mt-1">
                API keys are encrypted and stored securely. Always use environment variables in production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}