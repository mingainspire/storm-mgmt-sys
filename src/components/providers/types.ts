export interface Integration {
  id: string;
  name: string;
  type: 'api' | 'database' | 'service' | 'cloud';
  status: 'active' | 'inactive' | 'error';
  description: string;
  endpoint?: string;
  lastSync?: string;
  config?: {
    maxRetries?: number;
    timeout?: number;
    rateLimit?: number;
    authentication?: {
      type: 'apiKey' | 'oauth2' | 'basic';
      credentials?: Record<string, string>;
    };
  };
  metrics?: {
    uptime: number;
    latency: number;
    requests: number;
    errors?: number;
    successRate?: number;
  };
  permissions?: string[];
  tags?: string[];
}

export interface IntegrationState {
  integrations: Integration[];
}

export interface IntegrationAction {
  type: 'ADD_INTEGRATION' | 'REMOVE_INTEGRATION' | 'UPDATE_INTEGRATION' | 'RESET_INTEGRATIONS' | 'IMPORT_INTEGRATIONS';
  payload?: any;
}