export interface MemoryPattern {
  id: string;
  type: 'preference' | 'behavior' | 'skill' | 'directive';
  description: string;
  confidence: number;
  source: string;
  timestamp: string;
  context: string[];
  status: 'active' | 'pending' | 'archived';
  priority?: 'low' | 'medium' | 'high';
  impact?: string[];
  relatedPatterns?: string[];
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  type: 'document' | 'conversation' | 'directive' | 'learning' | 'system';
  entries: number;
  lastUpdated: string;
  category?: string;
  tags?: string[];
  access?: 'public' | 'private' | 'shared';
  format?: string;
  source?: string;
  version?: string;
  dependencies?: string[];
}

export interface SystemDirective {
  id: string;
  name: string;
  description: string;
  type: 'behavior' | 'communication' | 'learning' | 'security' | 'integration';
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'inactive' | 'pending';
  conditions?: string[];
  actions?: string[];
  constraints?: string[];
  metadata?: {
    author?: string;
    created?: string;
    modified?: string;
    version?: string;
  };
}

export interface SystemMessage {
  id: string;
  content: string;
  type: 'input' | 'response' | 'error' | 'success' | 'system' | 'directive';
  timestamp: string;
  metadata?: {
    source?: string;
    context?: string;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
  };
  relatedMessages?: string[];
}

export interface LearningObjective {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  metrics?: {
    accuracy?: number;
    confidence?: number;
    iterations?: number;
  };
  dependencies?: string[];
  outcomes?: string[];
}

export interface MemoryState {
  patterns: MemoryPattern[];
  knowledgeBases: KnowledgeBase[];
  messages: SystemMessage[];
  directives: SystemDirective[];
  learningObjectives: LearningObjective[];
}

export interface MemoryAction {
  type: 'RESET_MEMORY' | 'IMPORT_STATE' | 'ADD_PATTERN' | 'REMOVE_PATTERN' | 
        'ADD_KNOWLEDGE' | 'REMOVE_KNOWLEDGE' | 'ADD_MESSAGE' | 'REMOVE_MESSAGE' |
        'ADD_DIRECTIVE' | 'REMOVE_DIRECTIVE' | 'UPDATE_DIRECTIVE' |
        'ADD_OBJECTIVE' | 'UPDATE_OBJECTIVE' | 'REMOVE_OBJECTIVE';
  payload?: any;
}