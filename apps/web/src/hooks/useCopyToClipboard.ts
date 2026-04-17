'use client';

import { useCallback, useState } from 'react';

export function useCopyToClipboard(resetDelayMs = 1500) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useCallback(
    async (value: string) => {
      setError(null);
      try {
        if (!navigator.clipboard) {
          throw new Error('Clipboard API unavailable');
        }
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), resetDelayMs);
        return true;
      } catch (issue) {
        setError(issue instanceof Error ? issue.message : 'Unable to copy');
        return false;
      }
    },
    [resetDelayMs]
  );

  return { copy, copied, error } as const;
}
