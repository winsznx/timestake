import type { TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ className, label, error, hint, id, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;
  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-sm font-medium text-text" htmlFor={textareaId}>
          {label}
        </label>
      ) : null}
      <textarea
        id={textareaId}
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
