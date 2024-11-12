import React, { useState, useMemo } from 'react';
import { Zap, Check, X, RefreshCcw, Target } from 'lucide-react';
import { useMemoryState } from './memory/useMemoryState';
import { MemoryState, MemoryPattern } from './memory/types';

// Duplicate SystemComponent interface from ActiveSystems
interface SystemComponent {
  id: string;
  name: string;
  type: 'security' | 'development' | 'analysis';
  status: 'active' | 'learning' | 'processing';
  currentTask?: {
    name: string;
    progress: number;
    steps: string[];
    currentStep: number;
  };
  capabilities: string[];
  metrics: {
    tasksCompleted: number;
    learningProgress: number;
    adaptationRate: number;
  };
  potentialConnections?: string[];
}

interface SystemRecommendation {
  id: string;
  name: string;
  type: 'security' | 'development' | 'analysis';
  description: string;
  potentialCapabilities: string[];
  confidence: number;
  learningSource?: string;
}

const generateRecommendations = (memoryState: MemoryState): SystemRecommendation[] => {
  // Use memory patterns to generate system recommendations
  const recommendations: SystemRecommendation[] = memoryState.patterns
    .filter((pattern: MemoryPattern) => pattern.confidence > 0.7)  // High confidence patterns
    .map((pattern: MemoryPattern) => ({
      id: `rec-${pattern.id}`,
      name: pattern.description.split(' ')[0] + ' System',
      type: pattern.type === 'directive' ? 'security' :
            pattern.type === 'skill' ? 'development' : 'analysis',
      description: pattern.description,
      potentialCapabilities: pattern.context,
      confidence: pattern.confidence,
      learningSource: pattern.source
    }));

  // Add some default recommendations if memory is sparse
  if (recommendations.length < 3) {
    recommendations.push(
      {
        id: 'rec-default-1',
        name: 'Adaptive Learning System',
        type: 'analysis',
        description: 'A flexible system for continuous learning and adaptation',
        potentialCapabilities: ['Machine learning', 'Pattern recognition', 'Predictive analysis'],
        confidence: 0.8
      },
      {
        id: 'rec-default-2',
        name: 'Collaborative Intelligence Hub',
        type: 'development',
        description: 'A platform for coordinating multi-agent collaborative tasks',
        potentialCapabilities: ['Task delegation', 'Resource optimization', 'Cross-system communication'],
        confidence: 0.75
      }
    );
  }

  return recommendations;
};

const SystemRecommendations: React.FC = () => {
  const { state, dispatch } = useMemoryState();
  const [recommendations, setRecommendations] = useState<SystemRecommendation[]>([]);
  const [approvedSystems, setApprovedSystems] = useState<SystemComponent[]>([]);

  useMemo(() => {
    const newRecommendations = generateRecommendations(state);
    setRecommendations(newRecommendations);
  }, [state]);

  const handleApprove = (recommendation: SystemRecommendation) => {
    const newSystem: SystemComponent = {
      id: recommendation.id,
      name: recommendation.name,
      type: recommendation.type,
      status: 'learning',
      capabilities: recommendation.potentialCapabilities,
      metrics: {
        tasksCompleted: 0,
        learningProgress: 0,
        adaptationRate: 0
      }
    };

    // Add to approved systems
    setApprovedSystems(prev => [...prev, newSystem]);

    // Update memory with new learning pattern
    dispatch({
      type: 'ADD_PATTERN',
      payload: {
        id: recommendation.id,
        type: recommendation.type === 'security' ? 'directive' :
              recommendation.type === 'development' ? 'skill' : 'behavior',
        description: recommendation.name,
        confidence: recommendation.confidence,
        timestamp: new Date().toISOString(),
        source: 'system-recommendation',
        context: recommendation.potentialCapabilities,
        status: 'pending'
      }
    });

    // Remove the recommendation
    setRecommendations(prev => prev.filter(rec => rec.id !== recommendation.id));
  };

  const handleReject = (recommendation: SystemRecommendation) => {
    // Optionally reduce confidence or mark as less relevant
    setRecommendations(prev => prev.filter(rec => rec.id !== recommendation.id));
  };

  const regenerateRecommendations = () => {
    const newRecommendations = generateRecommendations(state);
    setRecommendations(newRecommendations);
  };

  return (
    <div className="space-y-6 bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          System Recommendations
        </h2>
        <button 
          onClick={regenerateRecommendations}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-gray-400 text-center py-4">
          No new system recommendations at this time.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map(recommendation => (
            <div 
              key={recommendation.id} 
              className="bg-gray-700 rounded-lg p-4 space-y-3 border border-gray-600"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">{recommendation.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs mt-1 inline-block ${
                    recommendation.type === 'security' 
                      ? 'bg-red-900 text-red-100' 
                      : recommendation.type === 'development'
                      ? 'bg-blue-900 text-blue-100'
                      : 'bg-purple-900 text-purple-100'
                  }`}>
                    {recommendation.type}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {(recommendation.confidence * 100).toFixed(0)}% Confidence
                </span>
              </div>
              <p className="text-gray-300 text-sm">{recommendation.description}</p>
              <div className="space-y-1">
                <h4 className="text-xs text-gray-400">Potential Capabilities:</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.potentialCapabilities.map((cap, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 bg-gray-600 text-gray-200 rounded-full text-xs"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleReject(recommendation)}
                  className="p-2 bg-red-900/20 hover:bg-red-900/40 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
                <button
                  onClick={() => handleApprove(recommendation)}
                  className="p-2 bg-green-900/20 hover:bg-green-900/40 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4 text-green-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SystemRecommendations;
