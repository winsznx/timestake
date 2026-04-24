'use client';

import { useState, useCallback } from 'react';

interface ContractCallState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook for managing smart contract call states.
 * Provides typed execution and stable callback references.
 */
export function useContractCall<T = any>() {
  const [state, setState] = useState<ContractCallState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (action: () => Promise<T> | T): Promise<T | undefined> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await action();
      setState(prev => ({ ...prev, data: result, loading: false }));
      return result;
    } catch (issue) {
      const message =
        issue instanceof Error ? issue.message : 'Something went wrong while calling the contract.';
      setState(prev => ({ ...prev, error: message, loading: false }));
      throw issue;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    execute,
    clearError,
  };
}
