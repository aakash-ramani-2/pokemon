import { useRef, useCallback } from 'react';

export function useAbortController() {
  const controllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  }, []);

  const getController = useCallback(() => {
    abort(); // Abort previous request
    controllerRef.current = new AbortController();
    return controllerRef.current;
  }, [abort]);

  return {
    getController,
    abort,
    get signal() {
      return controllerRef.current?.signal;
    }
  };
}