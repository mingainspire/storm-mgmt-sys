import { IntegrationState, IntegrationAction, Integration } from './types';

export const initialIntegrationState: IntegrationState = {
  integrations: [
    {
      id: '1',
      name: 'External API Gateway',
      type: 'api',
      status: 'active',
      description: 'Primary API integration for external services',
      endpoint: 'https://api.example.com/v1',
      lastSync: new Date().toISOString(),
      config: {
        maxRetries: 3,
        timeout: 5000,
        rateLimit: 100,
        authentication: {
          type: 'apiKey',
          credentials: {
            headerName: 'X-API-Key'
          }
        }
      },
      metrics: {
        uptime: 99.9,
        latency: 150,
        requests: 15000,
        errors: 23,
        successRate: 99.85
      },
      permissions: ['read', 'write'],
      tags: ['external', 'api', 'gateway']
    },
    {
      id: '2',
      name: 'Cloud Storage Service',
      type: 'cloud',
      status: 'active',
      description: 'Distributed storage system for application data',
      endpoint: 's3://my-bucket',
      lastSync: new Date().toISOString(),
      config: {
        maxRetries: 5,
        timeout: 10000,
        authentication: {
          type: 'oauth2'
        }
      },
      metrics: {
        uptime: 99.99,
        latency: 200,
        requests: 8500,
        errors: 12,
        successRate: 99.86
      },
      permissions: ['read', 'write', 'delete'],
      tags: ['storage', 'cloud', 'data']
    },
    {
      id: '3',
      name: 'Analytics Database',
      type: 'database',
      status: 'active',
      description: 'Time-series database for analytics data',
      endpoint: 'postgresql://analytics.example.com:5432',
      lastSync: new Date().toISOString(),
      config: {
        maxRetries: 3,
        timeout: 3000,
        authentication: {
          type: 'basic'
        }
      },
      metrics: {
        uptime: 99.95,
        latency: 50,
        requests: 25000,
        errors: 15,
        successRate: 99.94
      },
      permissions: ['read', 'write'],
      tags: ['database', 'analytics', 'timeseries']
    }
  ]
};

export function integrationReducer(state: IntegrationState, action: IntegrationAction): IntegrationState {
  switch (action.type) {
    case 'ADD_INTEGRATION':
      return {
        ...state,
        integrations: [...state.integrations, action.payload]
      };
    
    case 'REMOVE_INTEGRATION':
      return {
        ...state,
        integrations: state.integrations.filter(i => i.id !== action.payload)
      };
    
    case 'UPDATE_INTEGRATION':
      return {
        ...state,
        integrations: state.integrations.map(i => 
          i.id === action.payload.id ? { ...i, ...action.payload } : i
        )
      };
    
    case 'RESET_INTEGRATIONS':
      return {
        integrations: []
      };
    
    case 'IMPORT_INTEGRATIONS':
      return {
        integrations: action.payload
      };
    
    default:
      return state;
  }
}