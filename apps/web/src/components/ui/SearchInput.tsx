'use client';

import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search',
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border/60 bg-slate-950/40 px-4 py-3 pr-10 text-text placeholder:text-muted focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/30"
        {...props}
      />
      {value && onClear ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-3 my-auto text-muted hover:text-text"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
