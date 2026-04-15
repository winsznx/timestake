import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  interactive?: boolean;
}

export function Card({
  className,
  title,
  eyebrow,
  description,
  actions,
  interactive = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'surface-card rounded-[28px] p-5 sm:p-6',
        interactive && 'transition-transform duration-200 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {(title || eyebrow || description || actions) && (
        <div className="relative z-[1] mb-4 flex items-start justify-between gap-4">
          <div className="space-y-1">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">
                {eyebrow}
              </p>
            ) : null}
            {title ? <h3 className="text-xl font-semibold text-text">{title}</h3> : null}
            {description ? <p className="max-w-2xl text-sm text-muted">{description}</p> : null}
          </div>
          {actions ? <div className="relative z-[1] shrink-0">{actions}</div> : null}
        </div>
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
