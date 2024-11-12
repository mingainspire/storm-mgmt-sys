import React, { useState, useRef, useEffect } from 'react';
import { Brain, GitBranch, Network, Target, Users, MessageSquare, Workflow, Zap, Settings, Wrench, Repeat, FileText, Globe, Database, Layout, BarChart3, Code, Terminal, Check } from 'lucide-react';

type WorkflowPattern = 'reflection' | 'tool-use' | 'planning' | 'multi-agent';

interface WorkflowNode {
  id: string;
  type: 'agent' | 'tool' | 'task' | 'output';
  name: string;
  x: number;
  y: number;
  radius: number;
}

interface WorkflowConnection {
  source: string;
  target: string;
  type: 'control' | 'data' | 'feedback';
}

const WorkflowVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePattern, setActivePattern] = useState<WorkflowPattern>('reflection');
  const [darkMode] = useState(true);

  const getPatternNodes = (pattern: WorkflowPattern, width: number, height: number): WorkflowNode[] => {
    const centerX = width / 2;
    const centerY = height / 2;

    switch (pattern) {
      case 'reflection':
        return [
          { id: 'user', type: 'agent', name: 'User', x: centerX - 200, y: centerY - 100, radius: 30 },
          { id: 'reflector', type: 'agent', name: 'Reflector', x: centerX, y: centerY - 100, radius: 30 },
          { id: 'input', type: 'task', name: 'Input Text', x: centerX - 100, y: centerY + 50, radius: 25 },
          { id: 'output', type: 'output', name: 'Output Text', x: centerX + 100, y: centerY + 50, radius: 25 }
        ];

      case 'tool-use':
        return [
          { id: 'user', type: 'agent', name: 'User', x: centerX - 200, y: centerY, radius: 30 },
          { id: 'tool1', type: 'tool', name: 'Tool A', x: centerX, y: centerY - 80, radius: 25 },
          { id: 'tool2', type: 'tool', name: 'Tool B', x: centerX, y: centerY, radius: 25 },
          { id: 'tool3', type: 'tool', name: 'Tool C', x: centerX, y: centerY + 80, radius: 25 },
          { id: 'source', type: 'output', name: 'Information Sources', x: centerX + 200, y: centerY, radius: 35 }
        ];

      case 'planning':
        return [
          { id: 'user', type: 'agent', name: 'User', x: centerX - 200, y: centerY, radius: 30 },
          { id: 'planner', type: 'agent', name: 'Planning', x: centerX - 50, y: centerY - 80, radius: 30 },
          { id: 'task', type: 'task', name: 'Generated Task', x: centerX + 50, y: centerY, radius: 25 },
          { id: 'executor', type: 'agent', name: 'Single Task Agent', x: centerX + 150, y: centerY + 80, radius: 30 }
        ];

      case 'multi-agent':
        return [
          { id: 'user', type: 'agent', name: 'User', x: centerX - 200, y: centerY, radius: 30 },
          { id: 'engineer', type: 'agent', name: 'Software Engineer', x: centerX, y: centerY - 100, radius: 30 },
          { id: 'analyst', type: 'agent', name: 'Market Research Analyst', x: centerX - 50, y: centerY + 50, radius: 30 },
          { id: 'manager', type: 'agent', name: 'Project Manager', x: centerX + 150, y: centerY, radius: 30 },
          { id: 'developer', type: 'agent', name: 'Content Developer', x: centerX + 50, y: centerY + 100, radius: 30 }
        ];

      default:
        return [];
    }
  };

  const getPatternConnections = (pattern: WorkflowPattern): WorkflowConnection[] => {
    switch (pattern) {
      case 'reflection':
        return [
          { source: 'user', target: 'reflector', type: 'control' },
          { source: 'reflector', target: 'input', type: 'data' },
          { source: 'input', target: 'output', type: 'data' },
          { source: 'output', target: 'reflector', type: 'feedback' }
        ];

      case 'tool-use':
        return [
          { source: 'user', target: 'tool1', type: 'control' },
          { source: 'user', target: 'tool2', type: 'control' },
          { source: 'user', target: 'tool3', type: 'control' },
          { source: 'tool1', target: 'source', type: 'data' },
          { source: 'tool2', target: 'source', type: 'data' },
          { source: 'tool3', target: 'source', type: 'data' }
        ];

      case 'planning':
        return [
          { source: 'user', target: 'planner', type: 'control' },
          { source: 'planner', target: 'task', type: 'data' },
          { source: 'task', target: 'executor', type: 'control' },
          { source: 'executor', target: 'user', type: 'feedback' }
        ];

      case 'multi-agent':
        return [
          { source: 'user', target: 'engineer', type: 'control' },
          { source: 'engineer', target: 'analyst', type: 'data' },
          { source: 'analyst', target: 'manager', type: 'data' },
          { source: 'manager', target: 'developer', type: 'control' },
          { source: 'developer', target: 'engineer', type: 'feedback' }
        ];

      default:
        return [];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const nodes = getPatternNodes(activePattern, canvas.offsetWidth, canvas.offsetHeight);
    const connections = getPatternConnections(activePattern);

    const drawNode = (node: WorkflowNode) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      
      // Dark mode colors
      ctx.fillStyle = darkMode ? '#1e293b' : '#f3f4f6';
      ctx.fill();
      ctx.strokeStyle = darkMode ? '#3b82f6' : '#2563eb';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node label
      ctx.fillStyle = darkMode ? '#e2e8f0' : '#1f2937';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, node.x, node.y + node.radius + 20);

      // Node icon
      const icon = node.type === 'agent' ? Brain :
                  node.type === 'tool' ? Wrench :
                  node.type === 'task' ? FileText :
                  Globe;
      
      // Draw icon (simplified representation)
      ctx.strokeStyle = darkMode ? '#60a5fa' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawConnection = (start: WorkflowNode, end: WorkflowNode, type: string) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);

      // Curved connections
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const curve = 50;

      ctx.quadraticCurveTo(
        midX + curve,
        midY - curve,
        end.x,
        end.y
      );

      // Dark mode colors
      ctx.strokeStyle = darkMode ? 
        (type === 'control' ? '#4c1d95' : 
         type === 'data' ? '#1e40af' : 
         '#047857') :
        (type === 'control' ? '#7c3aed' : 
         type === 'data' ? '#2563eb' : 
         '#059669');
      
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw arrow
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      ctx.beginPath();
      ctx.moveTo(end.x - 15 * Math.cos(angle), end.y - 15 * Math.sin(angle));
      ctx.lineTo(
        end.x - 15 * Math.cos(angle) + 10 * Math.cos(angle - Math.PI / 6),
        end.y - 15 * Math.sin(angle) + 10 * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        end.x - 15 * Math.cos(angle) + 10 * Math.cos(angle + Math.PI / 6),
        end.y - 15 * Math.sin(angle) + 10 * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
    };

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    connections.forEach(conn => {
      const sourceNode = nodes.find(n => n.id === conn.source);
      const targetNode = nodes.find(n => n.id === conn.target);
      if (sourceNode && targetNode) {
        drawConnection(sourceNode, targetNode, conn.type);
      }
    });

    // Draw nodes
    nodes.forEach(drawNode);
  }, [activePattern, darkMode]);

  return (
    <div className="bg-gray-800 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-700 mb-8">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Workflow Patterns</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActivePattern('reflection')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activePattern === 'reflection'
                  ? 'bg-blue-900 text-blue-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Reflection
            </button>
            <button
              onClick={() => setActivePattern('tool-use')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activePattern === 'tool-use'
                  ? 'bg-purple-900 text-purple-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Tool Use
            </button>
            <button
              onClick={() => setActivePattern('planning')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activePattern === 'planning'
                  ? 'bg-green-900 text-green-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Planning
            </button>
            <button
              onClick={() => setActivePattern('multi-agent')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activePattern === 'multi-agent'
                  ? 'bg-yellow-900 text-yellow-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Multi-Agent
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <canvas
          ref={canvasRef}
          className="w-full h-[400px]"
        />
        
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-white mb-2">Pattern Description</h3>
          <p className="text-gray-300">
            {activePattern === 'reflection' && 'Agents reflect on their responses to improve output quality'}
            {activePattern === 'tool-use' && 'Multiple tools work together to gather and process information'}
            {activePattern === 'planning' && 'Structured approach to break down and execute complex tasks'}
            {activePattern === 'multi-agent' && 'Collaborative system with specialized agents working together'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowVisualizer;