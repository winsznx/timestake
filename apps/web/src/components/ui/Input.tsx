import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  className,
  label,
  error,
  hint,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-sm font-medium text-text" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-border/60 bg-slate-950/40 px-4 py-3 text-text placeholder:text-muted focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/30',
          error && 'border-danger focus:border-danger focus:ring-danger/30',
          className
        )}
        {...props}
      />
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {!error && hint ? <p className="text-sm text-muted">{hint}</p> : null}
    </div>
  );
}
