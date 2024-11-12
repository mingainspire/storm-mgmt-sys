import React, { useState } from 'react';
import { Calendar, Clock, Brain, Zap, Users, ArrowLeft, ArrowRight, BarChart3, GitBranch, Network, Globe, Workflow } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  type: 'task' | 'pattern' | 'resource' | 'milestone' | 'communication';
  status: 'completed' | 'active' | 'upcoming' | 'suggested';
  startTime: string;
  endTime?: string;
  source: {
    type: 'user' | 'agent' | 'workflow' | 'system';
    name: string;
    id: string;
  };
  resources: {
    id: string;
    name: string;
    type: 'agent' | 'pod' | 'workflow';
    load: number;
  }[];
  patterns?: {
    type: string;
    confidence: number;
    description: string;
  }[];
  suggestedBy?: {
    type: 'agent' | 'orchestrator' | 'workflow';
    name: string;
    reason: string;
  };
  systemContext?: {
    role: 'primary' | 'secondary' | 'support';
    capabilities: string[];
    connectedSystems: {
      id: string;
      name: string;
      type: string;
      relationship: string;
    }[];
  };
}

// Helper function to generate calendar days
const generateCalendarDays = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const days = [];
  
  // Add empty days for padding
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }
  
  // Add actual days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  
  return days;
};

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Creative Lab Resource Allocation',
    type: 'resource',
    status: 'active',
    startTime: '2024-03-10T09:00:00Z',
    endTime: '2024-03-10T17:00:00Z',
    source: {
      type: 'system',
      name: 'Resource Orchestrator',
      id: 'system-1'
    },
    resources: [
      { id: 'agent-1', name: 'Creative Agent', type: 'agent', load: 0.8 },
      { id: 'agent-2', name: 'Design Assistant', type: 'agent', load: 0.6 },
      { id: 'pod-1', name: 'Creative Pod', type: 'pod', load: 0.75 }
    ],
    patterns: [
      {
        type: 'resource_usage',
        confidence: 0.89,
        description: 'Peak creative productivity observed during morning hours'
      }
    ],
    suggestedBy: {
      type: 'orchestrator',
      name: 'Main Orchestrator',
      reason: 'Detected increased demand for creative tasks'
    },
    systemContext: {
      role: 'primary',
      capabilities: ['resource_management', 'creative_workflow', 'pattern_recognition'],
      connectedSystems: [
        {
          id: 'sys-1',
          name: 'Content Generation System',
          type: 'creative',
          relationship: 'collaborative'
        },
        {
          id: 'sys-2',
          name: 'Asset Management System',
          type: 'storage',
          relationship: 'dependent'
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Cross-System Communication Protocol Update',
    type: 'communication',
    status: 'active',
    startTime: '2024-03-10T08:30:00Z',
    source: {
      type: 'system',
      name: 'System Orchestrator',
      id: 'system-2'
    },
    resources: [
      { id: 'pod-4', name: 'Communication Pod', type: 'pod', load: 0.7 },
      { id: 'workflow-2', name: 'Integration Workflow', type: 'workflow', load: 0.6 }
    ],
    systemContext: {
      role: 'primary',
      capabilities: ['system_integration', 'protocol_management', 'security'],
      connectedSystems: [
        {
          id: 'sys-3',
          name: 'External API Gateway',
          type: 'integration',
          relationship: 'bidirectional'
        }
      ]
    }
  }
];

export default function TimelineView() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [showPatterns, setShowPatterns] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'timeline' | 'calendar'>('timeline');

  const calendarDays = generateCalendarDays(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suggested': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderResourceLoad = (load: number) => {
    const getLoadColor = (value: number) => {
      if (value > 0.8) return 'bg-red-500';
      if (value > 0.6) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    return (
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${getLoadColor(load)} transition-all duration-300`}
          style={{ width: `${load * 100}%` }}
        />
      </div>
    );
  };

  const renderCalendarView = () => (
    <div className="p-6">
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {weekDays.map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`bg-white p-2 min-h-[100px] ${
              day?.toDateString() === new Date().toDateString()
                ? 'bg-blue-50'
                : ''
            }`}
          >
            {day && (
              <>
                <div className="text-sm font-medium text-gray-900 mb-2">
                  {day.getDate()}
                </div>
                {timelineEvents
                  .filter(event => new Date(event.startTime).toDateString() === day.toDateString())
                  .map(event => (
                    <div
                      key={event.id}
                      className={`px-2 py-1 rounded-md text-xs mb-1 cursor-pointer ${
                        getStatusColor(event.status)
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      {event.title}
                    </div>
                  ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSystemContext = (context: TimelineEvent['systemContext']) => {
    if (!context) return null;

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Network className="w-4 h-4" />
          System Context & Integration
        </h4>
        
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600 mb-2">System Role & Capabilities</div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                context.role === 'primary' 
                  ? 'bg-blue-100 text-blue-800' 
                  : context.role === 'secondary'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {context.role} system
              </span>
              {context.capabilities.map((cap, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-2">Connected Systems</div>
            <div className="space-y-2">
              {context.connectedSystems.map((sys, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{sys.name}</span>
                    <span className="text-xs text-gray-500">({sys.type})</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {sys.relationship}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Timeline & Resource View</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPatterns(!showPatterns)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                  showPatterns 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span className="text-sm">Patterns</span>
              </button>
              <button
                onClick={() => setViewType(viewType === 'timeline' ? 'calendar' : 'timeline')}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
              >
                {viewType === 'timeline' ? (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Calendar</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Timeline</span>
                  </>
                )}
              </button>
            </div>
            {viewType === 'timeline' && (
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setTimeRange('day')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    timeRange === 'day' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setTimeRange('week')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    timeRange === 'week' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    timeRange === 'month' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  Month
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-900">
            {currentDate.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric'
            })}
          </span>
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
          >
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {viewType === 'calendar' ? (
        renderCalendarView()
      ) : (
        <div className="divide-y divide-gray-100">
          {timelineEvents.map(event => (
            <div 
              key={event.id}
              className={`p-6 ${
                selectedEvent?.id === event.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  {event.type === 'task' && <Clock className="w-5 h-5 text-blue-500 mt-0.5" />}
                  {event.type === 'pattern' && <Brain className="w-5 h-5 text-purple-500 mt-0.5" />}
                  {event.type === 'resource' && <Users className="w-5 h-5 text-green-500 mt-0.5" />}
                  {event.type === 'milestone' && <GitBranch className="w-5 h-5 text-yellow-500 mt-0.5" />}
                  {event.type === 'communication' && <Network className="w-5 h-5 text-blue-500 mt-0.5" />}
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(event.startTime).toLocaleTimeString()}
                        {event.endTime && ` - ${new Date(event.endTime).toLocaleTimeString()}`}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  {selectedEvent?.id === event.id ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {selectedEvent?.id === event.id && (
                <div className="mt-4 space-y-4">
                  {event.suggestedBy && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-900">
                            Suggested by {event.suggestedBy.name}
                          </p>
                          <p className="text-sm text-blue-700 mt-1">
                            Reason: {event.suggestedBy.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Resource Allocation</h4>
                    <div className="space-y-3">
                      {event.resources.map(resource => (
                        <div key={resource.id} className="flex items-center gap-3">
                          <div className="w-32 text-sm text-gray-600">{resource.name}</div>
                          <div className="flex-1">
                            {renderResourceLoad(resource.load)}
                          </div>
                          <div className="w-16 text-sm text-gray-600 text-right">
                            {(resource.load * 100).toFixed(0)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {showPatterns && event.patterns && event.patterns.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Related Patterns</h4>
                      <div className="space-y-2">
                        {event.patterns.map((pattern, idx) => (
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

                  {event.systemContext && renderSystemContext(event.systemContext)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}