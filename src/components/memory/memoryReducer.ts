import { MemoryState, MemoryAction } from './types';

export const initialMemoryState: MemoryState = {
  patterns: [
    {
      id: '1',
      type: 'directive',
      description: 'Prioritize user safety and data privacy in all operations',
      confidence: 1.0,
      source: 'System Core',
      timestamp: new Date().toISOString(),
      context: ['security', 'privacy', 'user protection'],
      status: 'active',
      priority: 'high',
      impact: ['All system operations', 'Data handling', 'User interactions']
    },
    {
      id: '2',
      type: 'behavior',
      description: 'Adapt communication style based on user expertise level',
      confidence: 0.95,
      source: 'Interaction Analysis',
      timestamp: new Date().toISOString(),
      context: ['communication', 'user experience', 'adaptability'],
      status: 'active',
      priority: 'medium'
    }
  ],
  knowledgeBases: [
    {
      id: '1',
      name: 'Core System Directives',
      description: 'Fundamental behavioral and operational guidelines',
      type: 'directive',
      entries: 12,
      lastUpdated: new Date().toISOString(),
      category: 'system',
      access: 'private',
      version: '1.0'
    },
    {
      id: '2',
      name: 'Learning Patterns',
      description: 'Collected learning patterns and adaptations',
      type: 'learning',
      entries: 25,
      lastUpdated: new Date().toISOString(),
      category: 'learning',
      access: 'private'
    }
  ],
  messages: [
    {
      id: '1',
      content: 'Initiating system learning protocols',
      type: 'system',
      timestamp: new Date().toISOString(),
      metadata: {
        source: 'System Core',
        priority: 'high',
        tags: ['initialization', 'learning']
      }
    }
  ],
  directives: [
    {
      id: '1',
      name: 'Privacy First',
      description: 'Ensure user data privacy and security in all operations',
      type: 'security',
      priority: 'high',
      status: 'active',
      conditions: ['All data operations', 'External communications'],
      actions: ['Encrypt sensitive data', 'Validate data access', 'Log security events'],
      constraints: ['No unauthorized data sharing', 'Minimum necessary access']
    },
    {
      id: '2',
      name: 'Adaptive Learning',
      description: 'Continuously adapt and improve based on user interactions',
      type: 'learning',
      priority: 'medium',
      status: 'active',
      conditions: ['User interactions', 'Task completion'],
      actions: ['Pattern recognition', 'Behavior adaptation', 'Performance optimization']
    }
  ],
  learningObjectives: [
    {
      id: '1',
      name: 'Communication Optimization',
      description: 'Improve response accuracy and relevance',
      status: 'in_progress',
      priority: 'high',
      progress: 65,
      metrics: {
        accuracy: 0.89,
        confidence: 0.92,
        iterations: 150
      }
    },
    {
      id: '2',
      name: 'Task Efficiency',
      description: 'Optimize task completion workflows',
      status: 'in_progress',
      priority: 'medium',
      progress: 45,
      metrics: {
        accuracy: 0.85,
        confidence: 0.88,
        iterations: 75
      }
    }
  ]
};

export function memoryReducer(state: MemoryState, action: MemoryAction): MemoryState {
  switch (action.type) {
    case 'RESET_MEMORY':
      return {
        patterns: [],
        knowledgeBases: [],
        messages: [],
        directives: [],
        learningObjectives: []
      };
    
    case 'IMPORT_STATE':
      return {
        ...action.payload,
        timestamp: new Date().toISOString()
      };
    
    case 'ADD_PATTERN':
      return {
        ...state,
        patterns: [...state.patterns, action.payload]
      };
    
    case 'REMOVE_PATTERN':
      return {
        ...state,
        patterns: state.patterns.filter(p => p.id !== action.payload)
      };
    
    case 'ADD_KNOWLEDGE':
      return {
        ...state,
        knowledgeBases: [...state.knowledgeBases, action.payload]
      };
    
    case 'REMOVE_KNOWLEDGE':
      return {
        ...state,
        knowledgeBases: state.knowledgeBases.filter(kb => kb.id !== action.payload)
      };
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(m => m.id !== action.payload)
      };

    case 'ADD_DIRECTIVE':
      return {
        ...state,
        directives: [...state.directives, action.payload]
      };

    case 'REMOVE_DIRECTIVE':
      return {
        ...state,
        directives: state.directives.filter(d => d.id !== action.payload)
      };

    case 'UPDATE_DIRECTIVE':
      return {
        ...state,
        directives: state.directives.map(d => 
          d.id === action.payload.id ? { ...d, ...action.payload } : d
        )
      };

    case 'ADD_OBJECTIVE':
      return {
        ...state,
        learningObjectives: [...state.learningObjectives, action.payload]
      };

    case 'UPDATE_OBJECTIVE':
      return {
        ...state,
        learningObjectives: state.learningObjectives.map(o => 
          o.id === action.payload.id ? { ...o, ...action.payload } : o
        )
      };

    case 'REMOVE_OBJECTIVE':
      return {
        ...state,
        learningObjectives: state.learningObjectives.filter(o => o.id !== action.payload)
      };
    
    default:
      return state;
  }
}