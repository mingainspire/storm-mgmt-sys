import { useReducer, useEffect } from 'react';
import { integrationReducer, initialIntegrationState } from './integrationReducer';
import { IntegrationState } from './types';

const STORAGE_KEY = 'system_integration_state';

export function useIntegrationState() {
  const [state, dispatch] = useReducer(integrationReducer, initialIntegrationState, () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : initialIntegrationState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const exportState = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-integrations-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importState = async (file: File) => {
    try {
      const text = await file.text();
      const importedState: IntegrationState = JSON.parse(text);
      dispatch({ type: 'IMPORT_INTEGRATIONS', payload: importedState.integrations });
      return true;
    } catch (error) {
      console.error('Failed to import state:', error);
      return false;
    }
  };

  const resetState = () => {
    dispatch({ type: 'RESET_INTEGRATIONS' });
  };

  return {
    state,
    dispatch,
    exportState,
    importState,
    resetState
  };
}