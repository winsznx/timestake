import React, { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
}

/**
 * Alert component for important feedback messages.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', children, ...props }, ref) => {
    const variants = {
      info: 'bg-blue-900/20 text-blue-200 border-blue-800/30',
      success: 'bg-primary/10 text-primary-light border-primary/20',
      warning: 'bg-amber-900/20 text-amber-200 border-amber-800/30',
      error: 'bg-danger/10 text-red-200 border-danger/20',
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn('rounded-lg border p-4 text-sm font-medium', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
