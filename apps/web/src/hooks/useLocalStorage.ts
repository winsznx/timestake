'use client';

import { useCallback, useEffect, useState } from 'react';

import { safeJsonParse } from '@/lib/safe-json-parse';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const raw = window.localStorage.getItem(key);
    if (raw !== null) {
      setValue(safeJsonParse<T>(raw, initialValue));
    }
  }, [key, initialValue]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (prev: T) => T)(prev) : next;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, update] as const;
}
