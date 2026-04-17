import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const inputId = id ?? props.name;
  return (
    <label className={cn('inline-flex items-center gap-2 text-sm text-text', className)} htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        className="h-4 w-4 rounded border-border bg-slate-950 text-primary focus:ring-primary-light/40"
        {...props}
      />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
