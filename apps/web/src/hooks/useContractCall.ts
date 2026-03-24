'use client';

import { useState } from 'react';

export function useContractCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function execute<T>(action: () => Promise<T> | T) {
    setLoading(true);
    setError(null);

    try {
      return await action();
    } catch (issue) {
      const message =
        issue instanceof Error ? issue.message : 'Something went wrong while calling the contract.';
      setError(message);
      throw issue;
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return {
    execute,
    loading,
    error,
    clearError,
  };
}
