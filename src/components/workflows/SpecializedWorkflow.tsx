import React from 'react';
import { Code, Database, Globe, Terminal, FileText, BarChart3, Search, MessageSquare, Zap } from 'lucide-react';

export const specializedExamples = [
  {
    title: "Full Stack Development Assistant",
    description: "Comprehensive development support system",
    categories: [
      {
        name: "Frontend Development",
        tasks: [
          {
            title: "UI/UX Implementation",
            subtasks: [
              "Component architecture design",
              "Responsive layout implementation",
              "State management setup",
              "Performance optimization"
            ],
            tools: ["React", "Vue", "Tailwind CSS", "TypeScript"]
          },
          {
            title: "API Integration",
            subtasks: [
              "REST/GraphQL endpoint setup",
              "Data fetching implementation",
              "Error handling",
              "Caching strategies"
            ],
            tools: ["Axios", "React Query", "GraphQL", "RTK Query"]
          }
        ]
      },
      {
        name: "Backend Development",
        tasks: [
          {
            title: "API Development",
            subtasks: [
              "Route configuration",
              "Middleware implementation",
              "Authentication setup",
              "Database integration"
            ],
            tools: ["Node.js", "Express", "PostgreSQL", "Redis"]
          },
          {
            title: "System Architecture",
            subtasks: [
              "Microservices design",
              "Database schema planning",
              "Caching strategy",
              "Security implementation"
            ],
            tools: ["Docker", "Kubernetes", "AWS", "MongoDB"]
          }
        ]
      }
    ],
    learningPath: [
      {
        level: "Beginner",
        focus: [
          "Basic HTML/CSS/JavaScript",
          "Simple API integrations",
          "Database fundamentals",
          "Version control basics"
        ]
      },
      {
        level: "Intermediate",
        focus: [
          "Framework proficiency",
          "State management",
          "API security",
          "Performance optimization"
        ]
      },
      {
        level: "Advanced",
        focus: [
          "System architecture",
          "Scalability patterns",
          "Advanced security",
          "DevOps integration"
        ]
      }
    ]
  },
  {
    title: "Data Engineering Pipeline",
    description: "End-to-end data processing and analysis system",
    categories: [
      {
        name: "Data Collection",
        tasks: [
          {
            title: "Source Integration",
            subtasks: [
              "API connector setup",
              "Database integration",
              "Stream processing",
              "Data validation"
            ],
            tools: ["Apache Kafka", "REST APIs", "WebSocket", "Apache NiFi"]
          },
          {
            title: "Data Storage",
            subtasks: [
              "Schema design",
              "Indexing strategy",
              "Partitioning setup",
              "Backup configuration"
            ],
            tools: ["PostgreSQL", "MongoDB", "Redis", "S3"]
          }
        ]
      },
      {
        name: "Data Processing",
        tasks: [
          {
            title: "ETL Pipeline",
            subtasks: [
              "Data cleaning",
              "Transformation logic",
              "Quality validation",
              "Load optimization"
            ],
            tools: ["Apache Spark", "dbt", "Airflow", "Python"]
          },
          {
            title: "Analysis & Reporting",
            subtasks: [
              "Metric calculation",
              "Report generation",
              "Dashboard creation",
              "Alert configuration"
            ],
            tools: ["Tableau", "PowerBI", "Grafana", "Jupyter"]
          }
        ]
      }
    ],
    learningPath: [
      {
        level: "Beginner",
        focus: [
          "SQL fundamentals",
          "Basic Python",
          "Data structures",
          "ETL concepts"
        ]
      },
      {
        level: "Intermediate",
        focus: [
          "Advanced SQL",
          "Data modeling",
          "Pipeline design",
          "Performance tuning"
        ]
      },
      {
        level: "Advanced",
        focus: [
          "Distributed systems",
          "Real-time processing",
          "Data architecture",
          "ML integration"
        ]
      }
    ]
  }
];

export default function SpecializedWorkflow() {
  return (
    <div className="space-y-8">
      {specializedExamples.map((example, index) => (
        <div key={index} className="example-card">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-900/20 rounded-lg">
              <Code className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">{example.title}</h3>
              <p className="text-gray-300 mb-6">{example.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {example.categories.map((category, catIdx) => (
                  <div key={catIdx} className="space-y-4">
                    <h4 className="text-md font-medium text-white flex items-center gap-2">
                      {catIdx === 0 ? (
                        <Globe className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Database className="w-4 h-4 text-green-400" />
                      )}
                      {category.name}
                    </h4>
                    
                    {category.tasks.map((task, taskIdx) => (
                      <div key={taskIdx} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Terminal className="w-4 h-4 text-purple-400" />
                          <h5 className="font-medium text-gray-200">{task.title}</h5>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h6 className="text-sm text-gray-400 mb-2">Tasks</h6>
                            <ul className="space-y-2">
                              {task.subtasks.map((subtask, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2" />
                                  <span className="text-sm text-gray-300">{subtask}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h6 className="text-sm text-gray-400 mb-2">Tools</h6>
                            <div className="flex flex-wrap gap-2">
                              {task.tools.map((tool, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-md font-medium text-white flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-yellow-400" />
                  Learning Path
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {example.learningPath.map((level, idx) => (
                    <div key={idx} className="p-3 bg-gray-700 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-200 mb-2">{level.level}</h5>
                      <ul className="space-y-2">
                        {level.focus.map((item, focusIdx) => (
                          <li key={focusIdx} className="flex items-start gap-2">
                            <Zap className="w-3 h-3 text-yellow-400 mt-1" />
                            <span className="text-xs text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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