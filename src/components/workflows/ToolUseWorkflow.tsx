import React from 'react';
import { Wrench, Database, Network, Settings, Globe } from 'lucide-react';

export const toolUseExamples = [
  {
    title: "Data Processing Pipeline",
    description: "Automated data processing and analysis system",
    tools: [
      {
        name: "Data Collector",
        purpose: "Gather data from multiple sources",
        type: "integration"
      },
      {
        name: "Data Transformer",
        purpose: "Clean and format data",
        type: "processing"
      },
      {
        name: "Analysis Engine",
        purpose: "Perform advanced analytics",
        type: "analysis"
      }
    ],
    applications: [
      "Business intelligence",
      "Market analysis",
      "Performance monitoring",
      "Trend detection"
    ]
  },
  {
    title: "Development Toolkit",
    description: "Integrated development environment with specialized tools",
    tools: [
      {
        name: "Code Generator",
        purpose: "Generate boilerplate code",
        type: "development"
      },
      {
        name: "Testing Suite",
        purpose: "Automated testing",
        type: "testing"
      },
      {
        name: "Deployment Manager",
        purpose: "Handle deployments",
        type: "operations"
      }
    ],
    applications: [
      "Web development",
      "Mobile app development",
      "API development",
      "System integration"
    ]
  },
  {
    title: "Content Management System",
    description: "Comprehensive content creation and management toolkit",
    tools: [
      {
        name: "Media Processor",
        purpose: "Handle media files",
        type: "media"
      },
      {
        name: "SEO Optimizer",
        purpose: "Optimize content for search",
        type: "optimization"
      },
      {
        name: "Publishing System",
        purpose: "Manage content distribution",
        type: "distribution"
      }
    ],
    applications: [
      "Website management",
      "Digital marketing",
      "Content creation",
      "Asset management"
    ]
  }
];

export default function ToolUseWorkflow() {
  return (
    <div className="space-y-6">
      {toolUseExamples.map((example, index) => (
        <div key={index} className="p-6 bg-gray-700 rounded-lg border border-gray-600">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-900/20 rounded-lg">
              <Wrench className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">{example.title}</h3>
              <p className="text-gray-300 mb-4">{example.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-200 mb-3">Tools</h4>
                  <div className="space-y-3">
                    {example.tools.map((tool, idx) => (
                      <div key={idx} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Settings className="w-4 h-4 text-blue-400" />
                          <span className="font-medium text-gray-200">{tool.name}</span>
                        </div>
                        <p className="text-sm text-gray-400">{tool.purpose}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded-full">
                          {tool.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-200 mb-3">Applications</h4>
                  <ul className="space-y-2">
                    {example.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}