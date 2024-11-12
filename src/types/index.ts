export interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'working' | 'paused' | 'error';
  type: string;
  currentTask?: string;
  performance: number;
  lastActive: string;
  tasksCompleted: number;
  connections: string[];
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  assignedAgent?: string;
  progress: number;
  createdAt: string;
  deadline?: string;
  workflow: string;
}

export interface Metric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface Workflow {
  id: string;
  name: string;
  agents: string[];
  status: 'active' | 'paused' | 'completed';
  tasksCount: number;
  completedTasks: number;
}