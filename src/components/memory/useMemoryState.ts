import { useReducer, useEffect } from 'react';
import { memoryReducer, initialMemoryState } from './memoryReducer';
import { MemoryState } from './types';

const STORAGE_KEY = 'system_memory_state';

export function useMemoryState() {
  const [state, dispatch] = useReducer(memoryReducer, initialMemoryState, () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : initialMemoryState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const exportState = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-memory-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importState = async (file: File) => {
    try {
      const text = await file.text();
      const importedState: MemoryState = JSON.parse(text);
      dispatch({ type: 'IMPORT_STATE', payload: importedState });
      return true;
    } catch (error) {
      console.error('Failed to import state:', error);
      return false;
    }
  };

  const resetState = () => {
    dispatch({ type: 'RESET_MEMORY' });
  };

  return {
    state,
    dispatch,
    exportState,
    importState,
    resetState
  };
}