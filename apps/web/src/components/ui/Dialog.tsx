'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, title, description, children, footer, className }: DialogProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn('surface-card w-full max-w-lg rounded-[24px] p-6', className)}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="mb-4 space-y-1">
          <h2 className="text-xl font-semibold text-text">{title}</h2>
          {description ? <p className="text-sm text-muted">{description}</p> : null}
        </header>
        <div>{children}</div>
        {footer ? <footer className="mt-6 flex justify-end gap-2">{footer}</footer> : null}
      </div>
    </div>
  );
}
