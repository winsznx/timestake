import React from 'react';
import { cn } from '@/lib/cn';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  type?: 'success' | 'error' | 'info';
}

/**
 * Simple Toast notification component.
 */
export function Toast({ message, type = 'info', className, ...props }: ToastProps) {
  const types = {
    info: 'bg-zinc-800 text-white',
    success: 'bg-primary text-white',
    error: 'bg-danger text-white',
  };

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-2xl',
        types[type],
        className
      )}
      {...props}
    >
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
}
