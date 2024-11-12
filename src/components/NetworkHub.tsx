import React, { useState } from 'react';
import { Brain, GitBranch, Network, Target, Users, MessageSquare, Workflow, Zap, Settings, Server, Database, Cloud, Box, Plus, Shield, Lock } from 'lucide-react';

interface NetworkEntity {
  id: string;
  name: string;
  type: 'connection' | 'system' | 'framework' | 'tool';
  description: string;
  status: 'active' | 'pending' | 'configuring';
  config?: {
    endpoint?: string;
    protocol?: string;
    requirements?: {
      cpu: string;
      memory: string;
    };
  };
  security: {
    encryption: string;
    authentication: string;
  };
}

const NetworkHub: React.FC = () => {
  const [isAddingEntity, setIsAddingEntity] = useState(false);
  const [newEntity, setNewEntity] = useState<Partial<NetworkEntity>>({
    type: 'connection',
    status: 'configuring',
  });

  const handleAddEntity = () => {
    setIsAddingEntity(true);
  };

  const handleEntitySubmit = () => {
    console.log('New entity:', newEntity);
    setIsAddingEntity(false);
    setNewEntity({ type: 'connection', status: 'configuring' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Network Hub</h2>
            <button
              onClick={handleAddEntity}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Network
            </button>
          </div>
        </div>

        {isAddingEntity && (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-md">
              <h3 className="text-lg font-medium text-white mb-4">Add Network Entity</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    value={newEntity.type}
                    onChange={(e) => setNewEntity({ ...newEntity, type: e.target.value as NetworkEntity['type'] })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                  >
                    <option value="connection">Connection</option>
                    <option value="system">System</option>
                    <option value="framework">Framework</option>
                    <option value="tool">Tool</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newEntity.name || ''}
                    onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newEntity.description || ''}
                    onChange={(e) => setNewEntity({ ...newEntity, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>

                {(newEntity.type === 'connection' || newEntity.type === 'system') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Endpoint
                    </label>
                    <input
                      type="text"
                      value={newEntity.config?.endpoint || ''}
                      onChange={(e) => setNewEntity({
                        ...newEntity,
                        config: { ...newEntity.config, endpoint: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                      placeholder="Enter endpoint URL"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 pt-4">
                  <button
                    onClick={handleEntitySubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Add Entity
                  </button>
                  <button
                    onClick={() => setIsAddingEntity(false)}
                    className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-5 h-5 text-blue-400" />
                <h3 className="font-medium text-white">Network Systems</h3>
              </div>
              <p className="text-sm text-gray-300">
                Manage and monitor connected systems and frameworks
              </p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="font-medium text-white">Security Status</h3>
              </div>
              <p className="text-sm text-gray-300">
                All network connections are encrypted and secure
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <div className="flex items-start gap-2">
              <Lock className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-white">Network Security</h4>
                <p className="text-sm text-gray-300 mt-1">
                  All network communications are encrypted end-to-end and authenticated using secure protocols
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkHub;