import React, { useState } from 'react';
import { Brain, CheckCircle2, XCircle, MessageSquare, Target, GitBranch, Book, Zap, Database, RefreshCcw, Upload, MessageCircle, Settings, Trash2, Plus, Download, AlertTriangle } from 'lucide-react';

interface MemoryPattern {
  id: string;
  type: 'preference' | 'behavior' | 'skill';
  description: string;
  confidence: number;
  source: string;
  timestamp: string;
  context: string[];
  status: 'active' | 'pending' | 'archived';
}

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  type: 'document' | 'conversation' | 'directive';
  entries: number;
  lastUpdated: string;
}

interface SystemMessage {
  id: string;
  content: string;
  type: 'input' | 'response' | 'error' | 'success';
  timestamp: string;
}

const RAGMemory: React.FC = () => {
  const [patterns, setPatterns] = useState<MemoryPattern[]>([
    {
      id: '1',
      type: 'preference',
      description: 'User prefers dark mode interfaces with high contrast',
      confidence: 0.92,
      source: 'UI Interaction Analysis',
      timestamp: new Date().toISOString(),
      context: ['interface preferences', 'accessibility', 'visual design'],
      status: 'active'
    },
    {
      id: '2',
      type: 'behavior',
      description: 'Frequently uses code completion for Python development',
      confidence: 0.88,
      source: 'Development Pattern Analysis',
      timestamp: new Date().toISOString(),
      context: ['coding patterns', 'tool usage', 'development workflow'],
      status: 'active'
    }
  ]);

  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    {
      id: '1',
      name: 'Development Guidelines',
      description: 'Core development practices and coding standards',
      type: 'document',
      entries: 15,
      lastUpdated: new Date().toISOString()
    },
    {
      id: '2',
      name: 'System Directives',
      description: 'Primary system behavior and response patterns',
      type: 'directive',
      entries: 8,
      lastUpdated: new Date().toISOString()
    }
  ]);

  const [messages, setMessages] = useState<SystemMessage[]>([
    {
      id: '1',
      content: 'How do you handle error scenarios in API responses?',
      type: 'input',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      content: 'I follow a structured approach for error handling, including status codes, error messages, and recovery suggestions.',
      type: 'response',
      timestamp: new Date().toISOString()
    }
  ]);

  const [activePattern, setActivePattern] = useState<'all' | 'preference' | 'behavior' | 'skill'>('all');
  const [activeTab, setActiveTab] = useState<'patterns' | 'knowledge' | 'communication'>('patterns');
  const [newMessage, setNewMessage] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isAddingKnowledge, setIsAddingKnowledge] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'importing'>('idle');

  const handleAddMessage = () => {
    if (!newMessage.trim()) return;

    const message: SystemMessage = {
      id: Date.now().toString(),
      content: newMessage,
      type: 'input',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleExportMemory = () => {
    const exportData = {
      patterns,
      knowledgeBases,
      messages,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'system-memory.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'patterns'
                ? 'bg-purple-900 text-purple-100'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Brain className="w-4 h-4" />
            Patterns
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'knowledge'
                ? 'bg-blue-900 text-blue-100'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Book className="w-4 h-4" />
            Knowledge Base
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'communication'
                ? 'bg-green-900 text-green-100'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Communication
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportMemory}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Memory
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeTab === 'patterns' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setActivePattern('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activePattern === 'all'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Patterns
            </button>
            <button
              onClick={() => setActivePattern('preference')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activePattern === 'preference'
                  ? 'bg-blue-900 text-blue-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Preferences
            </button>
            <button
              onClick={() => setActivePattern('behavior')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activePattern === 'behavior'
                  ? 'bg-purple-900 text-purple-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Behaviors
            </button>
            <button
              onClick={() => setActivePattern('skill')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activePattern === 'skill'
                  ? 'bg-green-900 text-green-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Skills
            </button>
          </div>

          <div className="space-y-4">
            {patterns
              .filter(p => activePattern === 'all' || p.type === activePattern)
              .map(pattern => (
                <div
                  key={pattern.id}
                  className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          pattern.type === 'preference'
                            ? 'bg-blue-900 text-blue-100'
                            : pattern.type === 'behavior'
                            ? 'bg-purple-900 text-purple-100'
                            : 'bg-green-900 text-green-100'
                        }`}>
                          {pattern.type}
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(pattern.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-200">{pattern.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pattern.context.map((ctx, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                          >
                            {ctx}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {(pattern.confidence * 100).toFixed(0)}% confidence
                      </span>
                      <button className="p-1 hover:bg-gray-700 rounded">
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Knowledge Bases</h3>
            <button
              onClick={() => setIsAddingKnowledge(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Knowledge Base
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeBases.map(kb => (
              <div
                key={kb.id}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-white mb-1">{kb.name}</h4>
                    <p className="text-sm text-gray-400 mb-2">{kb.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        {kb.entries} entries
                      </span>
                      <span className="text-sm text-gray-400">
                        Updated: {new Date(kb.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-700 rounded-lg">
                      <Settings className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-lg">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'communication' && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.type === 'input'
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-blue-900/20 border border-blue-800/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    {message.type === 'input' ? (
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Brain className="w-4 h-4 text-blue-400" />
                    )}
                    <span className="text-sm text-gray-400">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-200">{message.content}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
              onKeyPress={(e) => e.key === 'Enter' && handleAddMessage()}
            />
            <button
              onClick={handleAddMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-medium text-white mb-4">Reset Memory?</h3>
            <p className="text-gray-300 mb-6">
              This will clear all learned patterns, knowledge bases, and communication history.
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPatterns([]);
                  setKnowledgeBases([]);
                  setMessages([]);
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RAGMemory;