import React, { useState } from 'react';
import { Calendar, ListChecks, Brain, Clock, CheckCircle2, XCircle, BarChart3, Filter } from 'lucide-react';

interface TaskRecord {
  id: string;
  title: string;
  status: 'completed' | 'failed' | 'cancelled';
  completedAt: string;
  source: {
    type: 'user' | 'agent' | 'workflow' | 'system';
    name: string;
    id: string;
  };
  metrics: {
    duration: number;
    accuracy: number;
    efficiency: number;
  };
  patterns: {
    type: string;
    confidence: number;
    description: string;
  }[];
  agentsInvolved: {
    id: string;
    name: string;
    role: string;
  }[];
}

const taskHistory: TaskRecord[] = [
  {
    id: '1',
    title: 'Market Analysis Report Generation',
    status: 'completed',
    completedAt: '2024-03-10T15:30:00Z',
    source: {
      type: 'workflow',
      name: 'Market Analysis Workflow',
      id: 'workflow-1'
    },
    metrics: {
      duration: 450, // seconds
      accuracy: 0.95,
      efficiency: 0.88
    },
    patterns: [
      {
        type: 'time_preference',
        confidence: 0.92,
        description: 'User prefers reports generated before market opening'
      },
      {
        type: 'format_preference',
        confidence: 0.85,
        description: 'Consistent preference for detailed technical analysis sections'
      }
    ],
    agentsInvolved: [
      { id: 'agent-1', name: 'Data Collector', role: 'primary' },
      { id: 'agent-3', name: 'Analysis Agent', role: 'support' }
    ]
  },
  {
    id: '2',
    title: 'Customer Feedback Analysis',
    status: 'completed',
    completedAt: '2024-03-10T14:15:00Z',
    source: {
      type: 'agent',
      name: 'Feedback Analysis Agent',
      id: 'agent-4'
    },
    metrics: {
      duration: 320,
      accuracy: 0.89,
      efficiency: 0.92
    },
    patterns: [
      {
        type: 'data_preference',
        confidence: 0.88,
        description: 'User prioritizes sentiment analysis over statistical metrics'
      }
    ],
    agentsInvolved: [
      { id: 'agent-4', name: 'Feedback Analysis Agent', role: 'primary' },
      { id: 'agent-2', name: 'NLP Processor', role: 'support' }
    ]
  }
];

type ViewMode = 'list' | 'calendar' | 'analytics';

export default function TaskHistory() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedTask, setSelectedTask] = useState<TaskRecord | null>(null);
  const [showPatternInsights, setShowPatternInsights] = useState(false);

  const renderMetricsChart = (metrics: TaskRecord['metrics']) => {
    const maxValue = Math.max(metrics.accuracy, metrics.efficiency);
    const barWidth = (value: number) => `${(value / maxValue) * 100}%`;

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-24 text-sm text-gray-500">Accuracy</div>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: barWidth(metrics.accuracy) }}
            />
          </div>
          <div className="w-12 text-sm text-gray-600">{(metrics.accuracy * 100).toFixed(0)}%</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 text-sm text-gray-500">Efficiency</div>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: barWidth(metrics.efficiency) }}
            />
          </div>
          <div className="w-12 text-sm text-gray-600">{(metrics.efficiency * 100).toFixed(0)}%</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Task History & Insights</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPatternInsights(!showPatternInsights)}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                showPatternInsights 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span className="text-sm">Pattern Insights</span>
            </button>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <ListChecks className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'calendar' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Calendar className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('analytics')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'analytics' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {showPatternInsights && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-purple-900 mb-1">System Learning Patterns</h3>
                <p className="text-sm text-purple-700 mb-3">
                  Based on task history analysis, here are the identified patterns in user preferences and system performance:
                </p>
                <div className="space-y-2">
                  {taskHistory.flatMap(task => task.patterns).map((pattern, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-purple-400 mt-2" />
                      <div>
                        <p className="text-sm text-purple-800">{pattern.description}</p>
                        <p className="text-xs text-purple-600">Confidence: {(pattern.confidence * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Filter className="w-4 h-4" />
          <span>Showing {taskHistory.length} completed tasks</span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {taskHistory.map(task => (
          <div key={task.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                {task.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                ) : task.status === 'failed' ? (
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
                )}
                <div>
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <span>Initiated by: {task.source.name}</span>
                    <span>•</span>
                    <span>Completed: {new Date(task.completedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {selectedTask?.id === task.id ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            {selectedTask?.id === task.id && (
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Performance Metrics</h4>
                  {renderMetricsChart(task.metrics)}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Agents Involved</h4>
                  <div className="flex flex-wrap gap-2">
                    {task.agentsInvolved.map(agent => (
                      <div
                        key={agent.id}
                        className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center gap-2"
                      >
                        <Brain className="w-4 h-4 text-gray-500" />
                        <span>{agent.name}</span>
                        <span className="px-1.5 py-0.5 bg-gray-200 rounded-full text-xs">
                          {agent.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {task.patterns.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Learned Patterns</h4>
                    <div className="space-y-2">
                      {task.patterns.map((pattern, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-purple-50 rounded-lg border border-purple-100"
                        >
                          <div className="flex items-start gap-2">
                            <Brain className="w-4 h-4 text-purple-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-purple-900">{pattern.description}</p>
                              <p className="text-xs text-purple-700 mt-1">
                                Pattern Type: {pattern.type} • Confidence: {(pattern.confidence * 100).toFixed(0)}%
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}