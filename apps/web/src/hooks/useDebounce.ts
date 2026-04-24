'use client';

import { useEffect, useState } from 'react';

/**
 * Hook that returns a debounced version of the provided value.
 * @template T - The type of value being debounced
 */
export function useDebounce<T>(value: T, delayMs: number = 250): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounced(value);
    }, delayMs);

    return () => clearTimeout(handle);
  }, [value, delayMs]);

  return debounced;
}
