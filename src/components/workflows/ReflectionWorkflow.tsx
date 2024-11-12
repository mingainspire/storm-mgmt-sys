import React from 'react';
import { Brain, Code, Layout, FileText } from 'lucide-react';

export const reflectionExamples = [
  {
    title: "Code Review System",
    description: "AI-powered code review and optimization system",
    steps: [
      "Code analysis and pattern detection",
      "Best practices evaluation",
      "Performance optimization suggestions",
      "Security vulnerability checks"
    ],
    applications: [
      "Automated code reviews",
      "Documentation generation",
      "Test case creation",
      "Code optimization"
    ]
  },
  {
    title: "Content Enhancement",
    description: "Content quality improvement and optimization system",
    steps: [
      "Content analysis and evaluation",
      "Style and tone consistency check",
      "SEO optimization suggestions",
      "Readability improvements"
    ],
    applications: [
      "Blog post optimization",
      "Technical documentation",
      "Marketing content",
      "Educational materials"
    ]
  },
  {
    title: "Learning Assistant",
    description: "Adaptive learning system with continuous improvement",
    steps: [
      "Learning style analysis",
      "Knowledge gap identification",
      "Personalized content generation",
      "Progress tracking and adaptation"
    ],
    applications: [
      "Personalized tutoring",
      "Skill development",
      "Language learning",
      "Technical training"
    ]
  }
];

export default function ReflectionWorkflow() {
  return (
    <div className="space-y-6">
      {reflectionExamples.map((example, index) => (
        <div key={index} className="p-6 bg-gray-700 rounded-lg border border-gray-600">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">{example.title}</h3>
              <p className="text-gray-300 mb-4">{example.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-200 mb-3">Process Steps</h4>
                  <ul className="space-y-2">
                    {example.steps.map((step, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {step}
                      </li>
                    ))}
                  </ul>
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