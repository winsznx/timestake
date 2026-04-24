'use client';

import { useCallback, useState } from 'react';

/**
 * Simple hook for toggling a boolean state.
 */
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle];
}
