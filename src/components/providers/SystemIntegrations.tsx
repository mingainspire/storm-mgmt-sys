import React, { useState } from 'react';
import { useIntegrationState } from './useIntegrationState';
import { Integration } from './types';
import { Globe, Database, Cloud, Server, Plus, Settings, Trash2, Download, Upload, RefreshCcw, AlertTriangle, Check, Clock } from 'lucide-react';

export default function SystemIntegrations() {
  const { state, dispatch, exportState, importState, resetState } = useIntegrationState();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [formData, setFormData] = useState<Partial<Integration>>({
    type: 'api',
    status: 'inactive'
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    const newIntegration: Integration = {
      id: Date.now().toString(),
      name: formData.name || '',
      type: formData.type as Integration['type'],
      status: 'inactive',
      description: formData.description || '',
      endpoint: formData.endpoint,
      lastSync: new Date().toISOString(),
      metrics: {
        uptime: 100,
        latency: 0,
        requests: 0
      }
    };

    dispatch({ type: 'ADD_INTEGRATION', payload: newIntegration });
    setShowAddForm(false);
    setFormData({ type: 'api', status: 'inactive' });
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importState(file).then(success => {
        setStatusMessage(success ? 'Import successful' : 'Import failed');
        setTimeout(() => setStatusMessage(''), 3000);
      });
    }
  };

  const getIntegrationIcon = (type: Integration['type']) => {
    switch (type) {
      case 'api': return <Globe className="w-5 h-5 text-blue-400" />;
      case 'database': return <Database className="w-5 h-5 text-green-400" />;
      case 'cloud': return <Cloud className="w-5 h-5 text-purple-400" />;
      case 'service': return <Server className="w-5 h-5 text-yellow-400" />;
      default: return <Globe className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">System Integrations</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Integration
          </button>
          <button
            onClick={exportState}
            className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            title="Export Integrations"
          >
            <Download className="w-4 h-4" />
          </button>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileImport}
              className="hidden"
              id="import-integrations"
              accept=".json"
            />
            <label
              htmlFor="import-integrations"
              className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
              title="Import Integrations"
            >
              <Upload className="w-4 h-4" />
            </label>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            title="Reset Integrations"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-medium text-white mb-4">Add Integration</h3>
            <form onSubmit={handleAddIntegration} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                >
                  <option value="api">API</option>
                  <option value="database">Database</option>
                  <option value="service">Service</option>
                  <option value="cloud">Cloud</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Endpoint (Optional)
                </label>
                <input
                  type="text"
                  name="endpoint"
                  value={formData.endpoint || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Integration
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">Confirm Reset</h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to reset all integrations? This action cannot be undone.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  resetState();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {statusMessage && (
        <div className={`p-3 rounded-lg flex items-center gap-2 ${
          statusMessage.includes('failed') 
            ? 'bg-red-900/20 text-red-200' 
            : 'bg-green-900/20 text-green-200'
        }`}>
          {statusMessage.includes('failed') ? (
            <AlertTriangle className="w-4 h-4" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          <span className="text-sm">{statusMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {state.integrations.map(integration => (
          <div
            key={integration.id}
            className="p-6 bg-gray-800 rounded-lg border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getIntegrationIcon(integration.type)}
                <div>
                  <h3 className="font-medium text-white">{integration.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      integration.status === 'active'
                        ? 'bg-green-900 text-green-100'
                        : integration.status === 'error'
                        ? 'bg-red-900 text-red-100'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {integration.status}
                    </span>
                    {integration.lastSync && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(integration.lastSync).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    dispatch({
                      type: 'UPDATE_INTEGRATION',
                      payload: {
                        ...integration,
                        status: integration.status === 'active' ? 'inactive' : 'active'
                      }
                    });
                  }}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_INTEGRATION', payload: integration.id })}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            <p className="mt-2 text-gray-300 text-sm">{integration.description}</p>

            {integration.endpoint && (
              <div className="mt-2 text-sm text-gray-400">
                Endpoint: {integration.endpoint}
              </div>
            )}

            {integration.metrics && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-400">Uptime</div>
                  <div className="text-sm font-medium text-gray-200">
                    {integration.metrics.uptime}%
                  </div>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-400">Latency</div>
                  <div className="text-sm font-medium text-gray-200">
                    {integration.metrics.latency}ms
                  </div>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-400">Requests</div>
                  <div className="text-sm font-medium text-gray-200">
                    {integration.metrics.requests}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}