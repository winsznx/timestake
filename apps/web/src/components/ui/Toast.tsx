'use client';

import { useEffect } from 'react';

import { cn } from '@/lib/utils';

type ToastTone = 'success' | 'error' | 'info';

interface ToastProps {
  open: boolean;
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
  onClose: () => void;
}

export function Toast({
  open,
  title,
  description,
  tone = 'info',
  duration = 2400,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const timeout = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timeout);
  }, [duration, onClose, open]);

  if (!open) {
    return null;
  }

  const tones: Record<ToastTone, string> = {
    success: 'border-secondary/40 bg-secondary/15 text-secondary-light',
    error: 'border-danger/40 bg-danger/15 text-red-100',
    info: 'border-primary/40 bg-primary/15 text-primary-light',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div
        className={cn(
          'min-w-[260px] max-w-sm rounded-2xl border px-4 py-3 shadow-card backdrop-blur-xl animate-pop',
          tones[tone]
        )}
        role="status"
      >
        <p className="text-sm font-semibold">{title}</p>
        {description ? <p className="mt-1 text-sm opacity-90">{description}</p> : null}
      </div>
    </div>
  );
}
