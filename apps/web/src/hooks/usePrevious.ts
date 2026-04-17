'use client';

import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const previous = useRef<T | undefined>(undefined);

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
}
