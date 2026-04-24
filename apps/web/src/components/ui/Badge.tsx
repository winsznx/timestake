import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type BadgeVariant = 'streak' | 'rank' | 'success' | 'danger' | 'muted';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/**
 * Badge component for displaying small status or category tags.
 * Uses forwardRef for integration with tooltips and other UI libraries.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  className,
  variant = 'muted',
  children,
  ...props
}, ref) => {
  const variants: Record<BadgeVariant, string> = {
    streak: 'bg-secondary/15 text-secondary-light',
    rank: 'bg-accent/15 text-amber-200',
    success: 'bg-primary/18 text-primary-light',
    danger: 'bg-danger/18 text-red-200',
    muted: 'bg-white/8 text-muted',
  };

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
