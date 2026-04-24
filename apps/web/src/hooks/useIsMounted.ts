'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook to check if the component is still mounted.
 * Useful for async operations to prevent state updates on unmounted components.
 */
export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
