import React from 'react';
import { TrendingUp, TrendingDown, Minus, Users, Brain, CheckCircle, Clock } from 'lucide-react';
import type { Metric } from '../types';

const metrics: Metric[] = [
  { label: 'Active Agents', value: 12, change: 2, trend: 'up' },
  { label: 'Tasks Completed', value: 145, change: 12, trend: 'up' },
  { label: 'Avg Response Time', value: 1.2, change: -0.3, trend: 'down' },
  { label: 'Success Rate', value: 94, change: 0, trend: 'neutral' },
];

const icons = {
  'Active Agents': Users,
  'Tasks Completed': CheckCircle,
  'Avg Response Time': Clock,
  'Success Rate': Brain,
};

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">{metric.label}</span>
            {React.createElement(icons[metric.label as keyof typeof icons], {
              className: "w-5 h-5 text-gray-400",
            })}
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {metric.value}
                {metric.label === 'Success Rate' && '%'}
                {metric.label === 'Avg Response Time' && 's'}
              </span>
              <div className="flex items-center mt-2">
                {metric.trend === 'up' && (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                )}
                {metric.trend === 'down' && (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                {metric.trend === 'neutral' && (
                  <Minus className="w-4 h-4 text-gray-500 mr-1" />
                )}
                <span
                  className={`text-sm ${
                    metric.trend === 'up'
                      ? 'text-green-500'
                      : metric.trend === 'down'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {metric.change > 0 && '+'}
                  {metric.change}
                  {metric.label === 'Success Rate' && '%'}
                  {metric.label === 'Avg Response Time' && 's'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}