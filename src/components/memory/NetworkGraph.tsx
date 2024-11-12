import React, { useMemo, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { 
  MemoryState, 
  Pattern, 
  KnowledgeBase, 
  Directive, 
  LearningObjective,
  MemorySerializer,
  sanitizeForSharing
} from './types';

interface Node {
  id: string;
  name: string;
  type: 'pattern' | 'knowledge' | 'directive' | 'objective';
  val: number;
  color: string;
  version?: string;
  sharingPermissions?: 'private' | 'team' | 'public';
  isEncrypted?: boolean;
}

interface Link {
  source: string;
  target: string;
  type: string;
}

interface NetworkGraphProps {
  memoryState: MemoryState;
  currentUserId: string;
  width?: number;
  height?: number;
  onNodeShare?: (node: Node, sharingLevel: 'private' | 'team' | 'public') => void;
  onNodeEncrypt?: (node: Node, secretKey: string) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ 
  memoryState, 
  currentUserId,
  width = 900, 
  height = 600,
  onNodeShare,
  onNodeEncrypt
}) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [sharingLevel, setSharingLevel] = useState<'private' | 'team' | 'public'>('team');
  const [encryptionKey, setEncryptionKey] = useState('');

  const graphData = useMemo(() => {
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Process patterns
    memoryState.patterns.forEach(pattern => {
      nodes.push({
        id: pattern.id,
        name: pattern.description.substring(0, 30) + '...',
        type: 'pattern',
        val: pattern.confidence * 20,
        color: pattern.type === 'preference' ? '#3B82F6' : 
               pattern.type === 'behavior' ? '#8B5CF6' :
               pattern.type === 'skill' ? '#10B981' : '#F59E0B',
        version: pattern.version,
        sharingPermissions: pattern.sharingPermissions,
        isEncrypted: pattern.isEncrypted
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

    // Process knowledge bases
    memoryState.knowledgeBases.forEach(kb => {
      nodes.push({
        id: kb.id,
        name: kb.name,
        type: 'knowledge',
        val: 15,
        color: '#2563EB',
        version: kb.version,
        sharingPermissions: kb.sharingPermissions,
        isEncrypted: kb.isEncrypted
      });

      // Link dependencies
      kb.dependencies?.forEach(depId => {
        links.push({
          source: kb.id,
          target: depId,
          type: 'depends'
        });
      });
    });

    // Process directives
    memoryState.directives.forEach(directive => {
      nodes.push({
        id: directive.id,
        name: directive.name,
        type: 'directive',
        val: directive.priority === 'high' ? 20 :
             directive.priority === 'medium' ? 15 : 10,
        color: '#DC2626',
        version: directive.version,
        sharingPermissions: directive.sharingPermissions,
        isEncrypted: directive.isEncrypted
      });
    });

    // Process learning objectives
    memoryState.learningObjectives.forEach(objective => {
      nodes.push({
        id: objective.id,
        name: objective.name,
        type: 'objective',
        val: objective.progress * 20,
        color: '#7C3AED',
        version: objective.version,
        sharingPermissions: objective.sharingPermissions,
        isEncrypted: objective.isEncrypted
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

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  const handleShare = () => {
    if (selectedNode && onNodeShare) {
      onNodeShare(selectedNode, sharingLevel);
    }
  };

  const handleEncrypt = () => {
    if (selectedNode && onNodeEncrypt && encryptionKey) {
      onNodeEncrypt(selectedNode, encryptionKey);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 flex flex-col">
      <div className="flex-grow">
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
          onNodeClick={(node) => handleNodeClick(node as Node)}
        />
      </div>

      {selectedNode && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-2">Node Details</h3>
          <div className="text-gray-300">
            <p><strong>ID:</strong> {selectedNode.id}</p>
            <p><strong>Name:</strong> {selectedNode.name}</p>
            <p><strong>Type:</strong> {selectedNode.type}</p>
            <p><strong>Version:</strong> {selectedNode.version}</p>
            <p><strong>Sharing:</strong> {selectedNode.sharingPermissions || 'Not set'}</p>
            <p><strong>Encrypted:</strong> {selectedNode.isEncrypted ? 'Yes' : 'No'}</p>
          </div>

          <div className="mt-4 flex space-x-2">
            <select 
              value={sharingLevel} 
              onChange={(e) => setSharingLevel(e.target.value as 'private' | 'team' | 'public')}
              className="bg-gray-700 text-white p-2 rounded"
            >
              <option value="private">Private</option>
              <option value="team">Team</option>
              <option value="public">Public</option>
            </select>
            <button 
              onClick={handleShare}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Share
            </button>

            <input 
              type="text" 
              placeholder="Encryption Key" 
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded flex-grow"
            />
            <button 
              onClick={handleEncrypt}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Encrypt
            </button>
          </div>
        </div>
      )}

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
