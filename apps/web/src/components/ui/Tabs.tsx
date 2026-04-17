'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface TabItem<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  children?: ReactNode;
}

export function Tabs<T extends string>({ items, value, onChange, className, children }: TabsProps<T>) {
  return (
    <div className={cn('space-y-4', className)}>
      <div
        role="tablist"
        className="inline-flex items-center gap-1 rounded-full border border-border bg-white/5 p-1"
      >
        {items.map((item) => {
          const active = item.value === value;
          return (
            <button
              key={item.value}
              role="tab"
              type="button"
              aria-selected={active}
              disabled={item.disabled}
              onClick={() => onChange(item.value)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                active ? 'bg-primary text-white' : 'text-muted hover:text-text',
                item.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
}
