import React from 'react';
import { Server, HardDrive, Cpu, Network } from 'lucide-react';

export const systemAdminExamples = [
  {
    title: "Infrastructure Management",
    description: "Automated system administration and infrastructure management",
    components: [
      {
        name: "Resource Monitoring",
        tasks: [
          "CPU utilization tracking",
          "Memory usage analysis",
          "Disk space monitoring",
          "Network bandwidth monitoring"
        ]
      },
      {
        name: "System Maintenance",
        tasks: [
          "Automated updates",
          "Backup management",
          "Log rotation",
          "Performance optimization"
        ]
      },
      {
        name: "Service Management",
        tasks: [
          "Service health checks",
          "Auto-scaling",
          "Load balancing",
          "Failover management"
        ]
      }
    ],
    applications: [
      "Server management",
      "Cloud infrastructure",
      "Container orchestration",
      "Database administration"
    ]
  },
  {
    title: "Network Operations",
    description: "Network monitoring and management automation",
    components: [
      {
        name: "Network Monitoring",
        tasks: [
          "Traffic analysis",
          "Latency monitoring",
          "Bandwidth utilization",
          "QoS management"
        ]
      },
      {
        name: "Configuration Management",
        tasks: [
          "Device configuration",
          "Change management",
          "Policy enforcement",
          "Version control"
        ]
      },
      {
        name: "Troubleshooting",
        tasks: [
          "Automated diagnostics",
          "Root cause analysis",
          "Performance testing",
          "Issue resolution"
        ]
      }
    ],
    applications: [
      "Network infrastructure",
      "Cloud networking",
      "SDN management",
      "Security operations"
    ]
  }
];

export default function SystemAdminWorkflow() {
  return (
    <div className="space-y-6">
      {systemAdminExamples.map((example, index) => (
        <div key={index} className="example-card">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <Server className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">{example.title}</h3>
              <p className="text-gray-300 mb-4">{example.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {example.components.map((component, idx) => (
                  <div key={idx} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      {idx === 0 && <Cpu className="w-4 h-4 text-blue-400" />}
                      {idx === 1 && <HardDrive className="w-4 h-4 text-green-400" />}
                      {idx === 2 && <Network className="w-4 h-4 text-purple-400" />}
                      <h4 className="font-medium text-gray-200">{component.name}</h4>
                    </div>
                    <ul className="space-y-2">
                      {component.tasks.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                          <span className="text-sm text-gray-300">{task}</span>
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
                      <Server className="w-4 h-4 text-blue-400" />
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