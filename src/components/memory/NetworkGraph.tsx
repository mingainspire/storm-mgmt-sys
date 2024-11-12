import React, { useMemo } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { MemoryState } from './types';

interface Node {
  id: string;
  name: string;
  type: 'pattern' | 'knowledge' | 'directive' | 'objective';
  val: number; // size of node
  color: string;
}

interface Link {
  source: string;
  target: string;
  type: string;
}

interface NetworkGraphProps {
  memoryState: MemoryState;
  width?: number;
  height?: number;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ 
  memoryState, 
  width = 900, 
  height = 600 
}) => {
  const graphData = useMemo(() => {
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Add patterns
    memoryState.patterns.forEach(pattern => {
      nodes.push({
        id: pattern.id,
        name: pattern.description.substring(0, 30) + '...',
        type: 'pattern',
        val: pattern.confidence * 20,
        color: pattern.type === 'preference' ? '#3B82F6' : 
               pattern.type === 'behavior' ? '#8B5CF6' :
               pattern.type === 'skill' ? '#10B981' : '#F59E0B'
      });

      // Link related patterns
      pattern.relatedPatterns?.forEach(relatedId => {
        links.push({
          source: pattern.id,
          target: relatedId,
          type: 'related'
        });
      });
    });

    // Add knowledge bases
    memoryState.knowledgeBases.forEach(kb => {
      nodes.push({
        id: kb.id,
        name: kb.name,
        type: 'knowledge',
        val: 15,
        color: '#2563EB'
      });

      // Link to related knowledge bases through dependencies
      kb.dependencies?.forEach(depId => {
        links.push({
          source: kb.id,
          target: depId,
          type: 'depends'
        });
      });
    });

    // Add directives
    memoryState.directives.forEach(directive => {
      nodes.push({
        id: directive.id,
        name: directive.name,
        type: 'directive',
        val: directive.priority === 'high' ? 20 :
             directive.priority === 'medium' ? 15 : 10,
        color: '#DC2626'
      });
    });

    // Add learning objectives
    memoryState.learningObjectives.forEach(objective => {
      nodes.push({
        id: objective.id,
        name: objective.name,
        type: 'objective',
        val: objective.progress * 20,
        color: '#7C3AED'
      });

      // Link dependencies
      objective.dependencies?.forEach(depId => {
        links.push({
          source: objective.id,
          target: depId,
          type: 'depends'
        });
      });
    });

    return { nodes, links };
  }, [memoryState]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <ForceGraph2D
        graphData={graphData}
        width={width}
        height={height}
        nodeLabel="name"
        nodeColor={node => (node as Node).color}
        nodeVal={node => (node as Node).val}
        linkColor={() => '#ffffff30'}
        linkWidth={2}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        backgroundColor="#111827"
        onNodeClick={(node) => {
          console.log('Clicked node:', node);
          // TODO: Add node detail view
        }}
        onLinkClick={(link) => {
          console.log('Clicked link:', link);
          // TODO: Add link detail view
        }}
      />
      <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
          <span>Patterns</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
          <span>Knowledge</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#DC2626]" />
          <span>Directives</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7C3AED]" />
          <span>Objectives</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;
