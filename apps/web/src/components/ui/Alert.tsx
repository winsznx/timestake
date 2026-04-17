import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type AlertTone = 'info' | 'success' | 'warning' | 'danger';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  title?: string;
  icon?: ReactNode;
}

const toneStyles: Record<AlertTone, string> = {
  info: 'border-primary/40 bg-primary/10 text-primary-light',
  success: 'border-secondary/40 bg-secondary/10 text-secondary-light',
  warning: 'border-accent/40 bg-accent/10 text-amber-200',
  danger: 'border-danger/40 bg-danger/10 text-red-200',
};

export function Alert({ className, tone = 'info', title, icon, children, ...props }: AlertProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm',
        toneStyles[tone],
        className
      )}
      {...props}
    >
      {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : null}
      <div className="space-y-1">
        {title ? <p className="font-semibold text-text">{title}</p> : null}
        <div className="text-sm text-muted">{children}</div>
      </div>
    </div>
  );
}
