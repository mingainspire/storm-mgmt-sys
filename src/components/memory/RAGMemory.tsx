import React, { useState } from 'react';
import { Brain, CheckCircle2, XCircle, MessageSquare, Target, Book, Zap, RefreshCcw, Upload, MessageCircle, Settings, Trash2, Plus, Download, AlertTriangle, Clock, Filter } from 'lucide-react';
import { MemoryPattern, KnowledgeBase, SystemMessage, SystemDirective, LearningObjective } from './types';
import { useMemoryState } from './useMemoryState';

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
  const [activeTab, setActiveTab] = useState<'patterns' | 'knowledge' | 'communication' | 'directives' | 'learning'>('patterns');
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

  const renderProgressBar = (progress: number) => (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className="bg-blue-600 rounded-full h-2"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

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

  const renderTabButton = (
    tab: typeof activeTab,
    icon: React.ReactNode,
    label: string
  ) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
        activeTab === tab
          ? `bg-${tab === 'patterns' ? 'purple' : tab === 'knowledge' ? 'blue' : tab === 'communication' ? 'green' : tab === 'directives' ? 'yellow' : 'pink'}-900 text-${tab === 'patterns' ? 'purple' : tab === 'knowledge' ? 'blue' : tab === 'communication' ? 'green' : tab === 'directives' ? 'yellow' : 'pink'}-100`
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {icon}
      {label}
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

  const renderKnowledgeBaseContent = (kb: KnowledgeBase) => (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-white">{kb.name}</h4>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            kb.access === 'private'
              ? 'bg-red-900 text-red-100'
              : kb.access === 'shared'
              ? 'bg-yellow-900 text-yellow-100'
              : 'bg-green-900 text-green-100'
          }`}>
            {kb.access}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-2">{kb.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{kb.entries} entries</span>
          <span>Version: {kb.version || '1.0'}</span>
          <span>Updated: {new Date(kb.lastUpdated).toLocaleDateString()}</span>
        </div>
        {kb.tags && (
          <div className="flex flex-wrap gap-2 mt-2">
            {kb.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-700 rounded-lg">
          <Settings className="w-4 h-4 text-gray-400" />
        </button>
        <button 
          onClick={() => dispatch({ type: 'REMOVE_KNOWLEDGE', payload: kb.id })}
          className="p-2 hover:bg-gray-700 rounded-lg"
        >
          <Trash2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );

  const renderMessageContent = (message: SystemMessage) => (
    <div className={`p-4 rounded-lg ${
      message.type === 'input'
        ? 'bg-gray-800 border border-gray-700'
        : message.type === 'system'
        ? 'bg-yellow-900/20 border border-yellow-800/30'
        : message.type === 'error'
        ? 'bg-red-900/20 border border-red-800/30'
        : message.type === 'success'
        ? 'bg-green-900/20 border border-green-800/30'
        : 'bg-blue-900/20 border border-blue-800/30'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 mb-2">
          {message.type === 'input' ? (
            <MessageCircle className="w-4 h-4 text-gray-400" />
          ) : message.type === 'system' ? (
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          ) : message.type === 'error' ? (
            <XCircle className="w-4 h-4 text-red-400" />
          ) : message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Brain className="w-4 h-4 text-blue-400" />
          )}
          <span className="text-sm text-gray-400">
            {new Date(message.timestamp).toLocaleString()}
          </span>
          {message.metadata?.priority && renderPriorityBadge(message.metadata.priority)}
        </div>
      </div>
      <p className="text-gray-200">{message.content}</p>
      {message.metadata?.tags && (
        <div className="flex flex-wrap gap-2 mt-2">
          {message.metadata.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const renderDirectiveContent = (directive: SystemDirective) => (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-medium text-white">{directive.name}</h4>
          {renderPriorityBadge(directive.priority)}
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            directive.status === 'active'
              ? 'bg-green-900 text-green-100'
              : directive.status === 'inactive'
              ? 'bg-red-900 text-red-100'
              : 'bg-yellow-900 text-yellow-100'
          }`}>
            {directive.status}
          </span>
        </div>
        <p className="text-gray-300 mb-2">{directive.description}</p>
        
        {directive.conditions && (
          <div className="mb-2">
            <h5 className="text-sm font-medium text-gray-300 mb-1">Conditions:</h5>
            <ul className="list-disc list-inside text-sm text-gray-400">
              {directive.conditions.map((condition, idx) => (
                <li key={idx}>{condition}</li>
              ))}
            </ul>
          </div>
        )}
        
        {directive.actions && (
          <div className="mb-2">
            <h5 className="text-sm font-medium text-gray-300 mb-1">Actions:</h5>
            <ul className="list-disc list-inside text-sm text-gray-400">
              {directive.actions.map((action, idx) => (
                <li key={idx}>{action}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => {
            const newStatus = directive.status === 'active' ? 'inactive' : 'active';
            dispatch({
              type: 'UPDATE_DIRECTIVE',
              payload: { ...directive, status: newStatus }
            });
          }}
          className="p-2 hover:bg-gray-700 rounded-lg"
        >
          {directive.status === 'active' ? (
            <XCircle className="w-4 h-4 text-gray-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
          )}
        </button>
        <button 
          onClick={() => dispatch({ type: 'REMOVE_DIRECTIVE', payload: directive.id })}
          className="p-2 hover:bg-gray-700 rounded-lg"
        >
          <Trash2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );

  const renderLearningObjectiveContent = (objective: LearningObjective) => (
    <>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-white">{objective.name}</h4>
            {renderPriorityBadge(objective.priority)}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              objective.status === 'completed'
                ? 'bg-green-900 text-green-100'
                : objective.status === 'failed'
                ? 'bg-red-900 text-red-100'
                : objective.status === 'in_progress'
                ? 'bg-blue-900 text-blue-100'
                : 'bg-yellow-900 text-yellow-100'
            }`}>
              {objective.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-gray-300">{objective.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              const newStatus = objective.status === 'in_progress' ? 'completed' : 'in_progress';
              dispatch({
                type: 'UPDATE_OBJECTIVE',
                payload: { ...objective, status: newStatus }
              });
            }}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            {objective.status === 'completed' ? (
              <RefreshCcw className="w-4 h-4 text-gray-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <button 
            onClick={() => dispatch({ type: 'REMOVE_OBJECTIVE', payload: objective.id })}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      {renderProgressBar(objective.progress)}
      
      {objective.metrics && (
        <div className="mt-3 grid grid-cols-3 gap-4">
          {objective.metrics.accuracy !== undefined && (
            <div>
              <span className="text-sm text-gray-400">Accuracy</span>
              <p className="text-gray-200">{(objective.metrics.accuracy * 100).toFixed(1)}%</p>
            </div>
          )}
          {objective.metrics.confidence !== undefined && (
            <div>
              <span className="text-sm text-gray-400">Confidence</span>
              <p className="text-gray-200">{(objective.metrics.confidence * 100).toFixed(1)}%</p>
            </div>
          )}
          {objective.metrics.iterations !== undefined && (
            <div>
              <span className="text-sm text-gray-400">Iterations</span>
              <p className="text-gray-200">{objective.metrics.iterations}</p>
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {renderTabButton('patterns', <Brain className="w-4 h-4" />, 'Patterns')}
          {renderTabButton('knowledge', <Book className="w-4 h-4" />, 'Knowledge Base')}
          {renderTabButton('communication', <MessageSquare className="w-4 h-4" />, 'Communication')}
          {renderTabButton('directives', <Target className="w-4 h-4" />, 'Directives')}
          {renderTabButton('learning', <Zap className="w-4 h-4" />, 'Learning')}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 w-64"
            />
            <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
          </div>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as 'all' | 'low' | 'medium' | 'high')}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <Clock className={`w-4 h-4 text-gray-400 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
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
            {processItems(state.knowledgeBases).map(kb => (
              <div key={kb.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                {renderKnowledgeBaseContent(kb)}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'communication' && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            {processItems(state.messages).map(message => (
              <div key={message.id}>
                {renderMessageContent(message)}
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

      {activeTab === 'directives' && (
        <div className="space-y-4">
          {processItems(state.directives).map(directive => (
            <div key={directive.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              {renderDirectiveContent(directive)}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'learning' && (
        <div className="space-y-4">
          {processItems(state.learningObjectives).map(objective => (
            <div key={objective.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              {renderLearningObjectiveContent(objective)}
            </div>
          ))}
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-medium text-white mb-4">Reset Memory?</h3>
            <p className="text-gray-300 mb-6">
              This will clear all learned patterns, knowledge bases, communication history,
              directives, and learning objectives. This action cannot be undone.
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
                  dispatch({ type: 'RESET_MEMORY' });
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
