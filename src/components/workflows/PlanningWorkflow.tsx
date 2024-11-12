import React from 'react';
import { GitBranch, Target, Clock, CheckCircle } from 'lucide-react';

export const planningExamples = [
  {
    title: "Project Management System",
    description: "Automated project planning and execution system",
    phases: [
      {
        name: "Requirements Analysis",
        tasks: [
          "Stakeholder interviews",
          "Document requirements",
          "Define scope",
          "Risk assessment"
        ]
      },
      {
        name: "Planning & Design",
        tasks: [
          "Resource allocation",
          "Timeline creation",
          "Task dependencies",
          "Milestone definition"
        ]
      },
      {
        name: "Execution & Monitoring",
        tasks: [
          "Task assignment",
          "Progress tracking",
          "Resource optimization",
          "Quality control"
        ]
      }
    ],
    applications: [
      "Software development",
      "Construction projects",
      "Marketing campaigns",
      "Product launches"
    ]
  },
  {
    title: "Workflow Automation",
    description: "Intelligent workflow design and optimization system",
    phases: [
      {
        name: "Process Analysis",
        tasks: [
          "Current workflow audit",
          "Bottleneck identification",
          "Optimization opportunities",
          "Resource assessment"
        ]
      },
      {
        name: "Automation Design",
        tasks: [
          "Task automation mapping",
          "Integration points",
          "Error handling",
          "Performance metrics"
        ]
      },
      {
        name: "Implementation",
        tasks: [
          "System integration",
          "Testing & validation",
          "User training",
          "Performance monitoring"
        ]
      }
    ],
    applications: [
      "Business processes",
      "Document management",
      "Customer service",
      "Supply chain"
    ]
  }
];

export default function PlanningWorkflow() {
  return (
    <div className="space-y-6">
      {planningExamples.map((example, index) => (
        <div key={index} className="p-6 bg-gray-700 rounded-lg border border-gray-600">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-900/20 rounded-lg">
              <GitBranch className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">{example.title}</h3>
              <p className="text-gray-300 mb-4">{example.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {example.phases.map((phase, idx) => (
                  <div key={idx} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <h4 className="font-medium text-gray-200">{phase.name}</h4>
                    </div>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                          <span className="text-sm">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-200 mb-3">Applications</h4>
                <div className="flex flex-wrap gap-2">
                  {example.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full text-sm flex items-center gap-2"
                    >
                      <Target className="w-4 h-4 text-green-400" />
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}