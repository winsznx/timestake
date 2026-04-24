'use client';

import { useLayoutEffect } from 'react';

/**
 * Hook to lock body scroll, typically used for modals.
 */
export function useScrollLock(lock: boolean) {
  useLayoutEffect(() => {
    if (!lock) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}
