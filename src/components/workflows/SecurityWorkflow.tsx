import React from 'react';
import { Shield, Lock, AlertTriangle, Eye } from 'lucide-react';

export const securityExamples = [
  {
    title: "Security Operations Center",
    description: "Automated security monitoring and incident response system",
    components: [
      {
        name: "Threat Detection",
        tasks: [
          "Real-time monitoring",
          "Pattern analysis",
          "Anomaly detection",
          "Behavioral analysis"
        ]
      },
      {
        name: "Incident Response",
        tasks: [
          "Alert triage",
          "Automated containment",
          "Threat hunting",
          "Forensic analysis"
        ]
      },
      {
        name: "Compliance Management",
        tasks: [
          "Policy enforcement",
          "Audit logging",
          "Compliance reporting",
          "Risk assessment"
        ]
      }
    ],
    applications: [
      "Network security",
      "Application security",
      "Cloud security",
      "Endpoint protection"
    ]
  },
  {
    title: "Penetration Testing Assistant",
    description: "Automated security testing and vulnerability assessment",
    components: [
      {
        name: "Vulnerability Scanner",
        tasks: [
          "Port scanning",
          "Service enumeration",
          "Vulnerability detection",
          "Exploit verification"
        ]
      },
      {
        name: "Web Application Tester",
        tasks: [
          "SQL injection testing",
          "XSS detection",
          "CSRF testing",
          "Authentication bypass"
        ]
      },
      {
        name: "Network Analyzer",
        tasks: [
          "Traffic analysis",
          "Protocol inspection",
          "Packet capture",
          "Network mapping"
        ]
      }
    ],
    applications: [
      "Web applications",
      "Network infrastructure",
      "Cloud services",
      "Mobile applications"
    ]
  }
];

export default function SecurityWorkflow() {
  return (
    <div className="space-y-6">
      {securityExamples.map((example, index) => (
        <div key={index} className="example-card">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">{example.title}</h3>
              <p className="text-gray-300 mb-4">{example.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {example.components.map((component, idx) => (
                  <div key={idx} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      {idx === 0 && <Eye className="w-4 h-4 text-red-400" />}
                      {idx === 1 && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                      {idx === 2 && <Lock className="w-4 h-4 text-green-400" />}
                      <h4 className="font-medium text-gray-200">{component.name}</h4>
                    </div>
                    <ul className="space-y-2">
                      {component.tasks.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
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
                      <Shield className="w-4 h-4 text-red-400" />
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