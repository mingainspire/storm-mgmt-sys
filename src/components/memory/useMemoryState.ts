import { useReducer } from 'react';
import { 
  MemoryState, 
  MemoryPattern, 
  KnowledgeBase, 
  SystemMessage, 
  SystemDirective, 
  LearningObjective,
  MemoryAction
} from './types';

const initialState: MemoryState = {
  patterns: [],
  knowledge: [],
  messages: [],
  directives: [],
  learningObjectives: [],
  skillReconstruction: {
    skills: {},
    learningPatterns: {}
  }
};

function memoryReducer(state: MemoryState, action: MemoryAction): MemoryState {
  switch (action.type) {
    case 'ADD_PATTERN':
      return { ...state, patterns: [...state.patterns, action.payload] };
    
    case 'REMOVE_PATTERN':
      return { 
        ...state, 
        patterns: state.patterns.filter(p => p.id !== action.payload) 
      };
    
    case 'ADD_KNOWLEDGE':
      return { ...state, knowledge: [...state.knowledge, action.payload] };
    
    case 'REMOVE_KNOWLEDGE':
      return {
        ...state,
        knowledge: state.knowledge.filter(kb => kb.id !== action.payload)
      };
    
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(msg => msg.id !== action.payload)
      };
    
    case 'ADD_DIRECTIVE':
      return { ...state, directives: [...state.directives, action.payload] };
    
    case 'REMOVE_DIRECTIVE':
      return {
        ...state,
        directives: state.directives.filter(dir => dir.id !== action.payload)
      };
    
    case 'ADD_LEARNING_OBJECTIVE':
      return { 
        ...state, 
        learningObjectives: [...state.learningObjectives, action.payload] 
      };
    
    case 'IMPORT_STATE':
      return { 
        ...state, 
        ...action.payload,
        patterns: action.payload.patterns || state.patterns,
        knowledge: action.payload.knowledge || state.knowledge,
        messages: action.payload.messages || state.messages,
        directives: action.payload.directives || state.directives,
        learningObjectives: action.payload.learningObjectives || state.learningObjectives
      };
    
    case 'RECONSTRUCT_SKILLS': {
      const reconstructedSkills = Object.fromEntries(
        state.patterns
          .filter(p => p.type === 'skill')
          .map(skill => [
            skill.id, 
            {
              type: skill.type,
              complexity: skill.confidence,
              lastUsed: skill.timestamp || new Date().toISOString(),
              usageFrequency: 1,
              reconstructionConfidence: skill.confidence,
              dependencies: skill.context
            }
          ])
      );

      return { 
        ...state, 
        skillReconstruction: {
          skills: reconstructedSkills,
          learningPatterns: state.skillReconstruction.learningPatterns
        }
      };
    }

    default:
      return state;
  }
}

export function useMemoryState() {
  const [state, dispatch] = useReducer(memoryReducer, initialState);

  // Additional utility functions can be added here
  const addPattern = (pattern: MemoryPattern) => {
    dispatch({ type: 'ADD_PATTERN', payload: pattern });
  };

  const removePattern = (patternId: string) => {
    dispatch({ type: 'REMOVE_PATTERN', payload: patternId });
  };

  const reconstructSkills = () => {
    dispatch({ type: 'RECONSTRUCT_SKILLS' });
  };

  return { 
    state, 
    dispatch,
    addPattern,
    removePattern,
    reconstructSkills
  };
}
