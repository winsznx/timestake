'use client';

import { useEffect, useRef } from 'react';

export function useTimeout(callback: () => void, delayMs: number | null): void {
  const stored = useRef(callback);

  useEffect(() => {
    stored.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs === null) {
      return undefined;
    }
    const handle = window.setTimeout(() => stored.current(), delayMs);
    return () => window.clearTimeout(handle);
  }, [delayMs]);
}
