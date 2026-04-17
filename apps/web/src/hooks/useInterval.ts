'use client';

import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delayMs: number | null): void {
  const stored = useRef(callback);

  useEffect(() => {
    stored.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delayMs === null) {
      return undefined;
    }
    const handle = window.setInterval(() => stored.current(), delayMs);
    return () => window.clearInterval(handle);
  }, [delayMs]);
}
