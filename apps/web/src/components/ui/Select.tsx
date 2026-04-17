import type { SelectHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
}

export function Select({
  className,
  label,
  error,
  hint,
  options,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-sm font-medium text-text" htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={cn(
          'w-full appearance-none rounded-xl border border-border/60 bg-slate-950/40 px-4 py-3 text-text focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/30',
          error && 'border-danger focus:border-danger focus:ring-danger/30',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {!error && hint ? <p className="text-sm text-muted">{hint}</p> : null}
    </div>
  );
}
