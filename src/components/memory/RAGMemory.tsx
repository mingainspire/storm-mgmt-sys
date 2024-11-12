import React, { useState } from 'react';
import { Brain, CheckCircle2, XCircle, MessageSquare, Target, Book, Zap, RefreshCcw, Upload, MessageCircle, Settings, Trash2, Plus, Download, AlertTriangle, Clock, Filter, Save, Upload as UploadIcon, Share2 } from 'lucide-react';
import { MemoryPattern, KnowledgeBase, SystemMessage, SystemDirective, LearningObjective } from './types';
import { useMemoryState } from './useMemoryState';
import NetworkGraph from './NetworkGraph';

interface BaseItem {
  id: string;
  timestamp?: string;
  lastUpdated?: string;
  priority?: 'low' | 'medium' | 'high';
  description?: string;
  name?: string;
  content?: string;
}

const RAGMemory: React.FC = () => {
  const { state, dispatch } = useMemoryState();
  const [activeTab, setActiveTab] = useState<'patterns' | 'knowledge' | 'communication' | 'directives' | 'learning' | 'visualization'>('patterns');
  const [activePattern, setActivePattern] = useState<'all' | 'preference' | 'behavior' | 'skill' | 'directive'>('all');
  const [newMessage, setNewMessage] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isAddingKnowledge, setIsAddingKnowledge] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const handleAddMessage = () => {
    if (!newMessage.trim()) return;

    const message: SystemMessage = {
      id: Date.now().toString(),
      content: newMessage,
      type: 'input',
      timestamp: new Date().toISOString(),
      metadata: {
        source: 'user',
        priority: 'medium',
        tags: ['user-input']
      }
    };

    dispatch({ type: 'ADD_MESSAGE', payload: message });
    setNewMessage('');
  };

  const handleSaveState = () => {
    try {
      const stateToSave = JSON.stringify(state);
      const blob = new Blob([stateToSave], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `storm-memory-state-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving state:', error);
    }
  };

  const handleLoadState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedState = JSON.parse(e.target?.result as string);
          dispatch({ type: 'IMPORT_STATE', payload: loadedState });
        } catch (error) {
          console.error('Error parsing state file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const filterByPriority = <T extends BaseItem>(items: T[]): T[] => {
    if (filterPriority === 'all') return items;
    return items.filter(item => item.priority === filterPriority);
  };

  const filterBySearch = <T extends BaseItem>(items: T[]): T[] => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.description?.toLowerCase().includes(query) ||
      item.name?.toLowerCase().includes(query) ||
      item.content?.toLowerCase().includes(query)
    );
  };

  const sortByTimestamp = <T extends BaseItem>(items: T[]): T[] => {
    return [...items].sort((a, b) => {
      const timeA = new Date(a.timestamp || a.lastUpdated || '').getTime();
      const timeB = new Date(b.timestamp || b.lastUpdated || '').getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });
  };

  const processItems = <T extends BaseItem>(items: T[]): T[] => {
    return sortByTimestamp(filterBySearch(filterByPriority(items)));
  };

  const renderPriorityBadge = (priority?: 'low' | 'medium' | 'high') => {
    const colors = {
      low: 'bg-gray-600 text-gray-100',
      medium: 'bg-blue-600 text-blue-100',
      high: 'bg-red-600 text-red-100'
    };
    return priority ? (
      <span className={`px-2 py-0.5 rounded-full text-xs ${colors[priority]}`}>
        {priority}
      </span>
    ) : null;
  };

  const renderPatternTypeButton = (type: string) => (
    <button
      key={type}
      onClick={() => setActivePattern(type as typeof activePattern)}
      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
        activePattern === type
          ? type === 'all'
            ? 'bg-gray-700 text-white'
            : type === 'preference'
            ? 'bg-blue-900 text-blue-100'
            : type === 'behavior'
            ? 'bg-purple-900 text-purple-100'
            : type === 'skill'
            ? 'bg-green-900 text-green-100'
            : 'bg-yellow-900 text-yellow-100'
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}s
    </button>
  );

  const renderPatternContent = (pattern: MemoryPattern) => (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            pattern.type === 'preference'
              ? 'bg-blue-900 text-blue-100'
              : pattern.type === 'behavior'
              ? 'bg-purple-900 text-purple-100'
              : pattern.type === 'skill'
              ? 'bg-green-900 text-green-100'
              : 'bg-yellow-900 text-yellow-100'
          }`}>
            {pattern.type}
          </span>
          {renderPriorityBadge(pattern.priority)}
          <span className="text-sm text-gray-400">
            {new Date(pattern.timestamp).toLocaleString()}
          </span>
        </div>
        <p className="text-gray-200">{pattern.description}</p>
        {pattern.impact && (
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-300 mb-1">Impact:</h4>
            <ul className="list-disc list-inside text-sm text-gray-400">
              {pattern.impact.map((imp, idx) => (
                <li key={idx}>{imp}</li>
              ))}
            </ul>
          </div>
        )}
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
        <button 
          onClick={() => dispatch({ type: 'REMOVE_PATTERN', payload: pattern.id })}
          className="p-1 hover:bg-gray-700 rounded"
        >
          <Trash2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );

  const renderTabButton = (
    tab: typeof activeTab,
    icon: React.ReactNode,
    label: string
  ) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
        activeTab === tab
          ? `bg-${tab === 'patterns' ? 'purple' : tab === 'knowledge' ? 'blue' : tab === 'communication' ? 'green' : tab === 'directives' ? 'yellow' : tab === 'visualization' ? 'indigo' : 'pink'}-900 text-${tab === 'patterns' ? 'purple' : tab === 'knowledge' ? 'blue' : tab === 'communication' ? 'green' : tab === 'directives' ? 'yellow' : tab === 'visualization' ? 'indigo' : 'pink'}-100`
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  // Rest of the component remains the same as in the previous version
  return (
    <div className="space-y-6">
      {/* Previous implementation remains the same */}
      {activeTab === 'visualization' ? (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">System Relationships</h3>
          <NetworkGraph memoryState={state} />
        </div>
      ) : activeTab === 'patterns' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            {['all', 'preference', 'behavior', 'skill', 'directive'].map(type => 
              renderPatternTypeButton(type)
            )}
          </div>

          <div className="space-y-4">
            {processItems(state.patterns)
              .filter(p => activePattern === 'all' || p.type === activePattern)
              .map(pattern => (
                <div key={pattern.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  {renderPatternContent(pattern)}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Remaining tabs and reset confirmation dialog */}
    </div>
  );
};

export default RAGMemory;
