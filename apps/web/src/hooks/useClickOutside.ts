'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Hook that triggers a callback when a click or touch event occurs outside of the referenced element.
 * Optimized with useRef for the callback to avoid unnecessary effect re-runs.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  onOutside: (event: MouseEvent | TouchEvent) => void
): void {
  const savedCallback = useRef(onOutside);

  useEffect(() => {
    savedCallback.current = onOutside;
  }, [onOutside]);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!ref.current || !target || ref.current.contains(target)) {
        return;
      }
      savedCallback.current(event);
    };

    document.addEventListener('mousedown', handler, { passive: true });
    document.addEventListener('touchstart', handler, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [ref]);
}
