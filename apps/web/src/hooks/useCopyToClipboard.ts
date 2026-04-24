'use client';

import { useState, useCallback, useEffect } from 'react';

/**
 * Hook for copying text to the clipboard with temporary success state.
 */
export function useCopyToClipboard(resetTimeout = 2000) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.error('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  }, []);

  useEffect(() => {
    if (!copiedText) return;

    const timeout = setTimeout(() => {
      setCopiedText(null);
    }, resetTimeout);

    return () => clearTimeout(timeout);
  }, [copiedText, resetTimeout]);

  return { copiedText, copy, isCopied: !!copiedText };
}
