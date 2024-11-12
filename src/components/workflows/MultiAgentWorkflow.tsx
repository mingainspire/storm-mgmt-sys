import React from 'react';
import { Users, Brain, Target, MessageSquare } from 'lucide-react';

export const multiAgentExamples = [
  {
    title: "Development Team",
    description: "Collaborative development system with specialized agents",
    agents: [
      {
        role: "Architect",
        responsibilities: [
          "System design",
          "Technical decisions",
          "Performance optimization",
          "Security planning"
        ]
      },
      {
        role: "Developer",
        responsibilities: [
          "Code implementation",
          "Unit testing",
          "Bug fixing",
          "Documentation"
        ]
      },
      {
        role: "QA Engineer",
        responsibilities: [
          "Test planning",
          "Quality assurance",
          "Performance testing",
          "User acceptance"
        ]
      },
      {
        role: "DevOps",
        responsibilities: [
          "Deployment automation",
          "Infrastructure management",
          "Monitoring setup",
          "Security implementation"
        ]
      }
    ],
    applications: [
      "Software development",
      "System integration",
      "Platform development",
      "Application maintenance"
    ]
  },
  {
    title: "Content Creation Suite",
    description: "Multi-agent system for comprehensive content creation",
    agents: [
      {
        role: "Research Agent",
        responsibilities: [
          "Topic research",
          "Data collection",
          "Trend analysis",
          "Source verification"
        ]
      },
      {
        role: "Content Writer",
        responsibilities: [
          "Content creation",
          "Style adaptation",
          "SEO optimization",
          "Editing & revision"
        ]
      },
      {
        role: "Media Specialist",
        responsibilities: [
          "Image selection",
          "Visual design",
          "Media optimization",
          "Format conversion"
        ]
      },
      {
        role: "Publishing Agent",
        responsibilities: [
          "Content scheduling",
          "Distribution management",
          "Analytics tracking",
          "Performance reporting"
        ]
      }
    ],
    applications: [
      "Blog management",
      "Social media",
      "Technical writing",
      "Marketing content"
    ]
  },
  {
    title: "Analysis Platform",
    description: "Distributed analysis system with specialized processing agents",
    agents: [
      {
        role: "Data Collector",
        responsibilities: [
          "Data gathering",
          "Source validation",
          "Format standardization",
          "Initial processing"
        ]
      },
      {
        role: "Analysis Agent",
        responsibilities: [
          "Pattern recognition",
          "Statistical analysis",
          "Trend identification",
          "Insight generation"
        ]
      },
      {
        role: "Visualization Agent",
        responsibilities: [
          "Data visualization",
          "Chart generation",
          "Interactive dashboards",
          "Report creation"
        ]
      },
      {
        role: "Integration Agent",
        responsibilities: [
          "System integration",
          "API management",
          "Data synchronization",
          "Export handling"
        ]
      }
    ],
    applications: [
      "Business intelligence",
      "Market research",
      "Performance analytics",
      "Trend analysis"
    ]
  }
];

export default function MultiAgentWorkflow() {
  return (
    <div className="space-y-6">
      {multiAgentExamples.map((example, index) => (
        <div key={index} className="p-6 bg-gray-700 rounded-lg border border-gray-600">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-900/20 rounded-lg">
              <Users className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">{example.title}</h3>
              <p className="text-gray-300 mb-4">{example.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {example.agents.map((agent, idx) => (
                  <div key={idx} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-yellow-400" />
                      <h4 className="font-medium text-gray-200">{agent.role}</h4>
                    </div>
                    <ul className="space-y-2">
                      {agent.responsibilities.map((resp, respIdx) => (
                        <li key={respIdx} className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span className="text-sm text-gray-300">{resp}</span>
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
                      <Target className="w-4 h-4 text-yellow-400" />
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