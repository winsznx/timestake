'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  onOutside: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!ref.current || !target) {
        return;
      }
      if (!ref.current.contains(target)) {
        onOutside(event);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [ref, onOutside]);
}
