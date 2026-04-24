import React from 'react';
import { cn } from '@/lib/cn';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  children: React.ReactNode;
}

/**
 * Basic Tooltip wrapper.
 */
export function Tooltip({ content, children, className, ...props }: TooltipProps) {
  return (
    <div className="group relative inline-block">
      {children}
      <div
        className={cn(
          'invisible absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100',
          className
        )}
        {...props}
      >
        {content}
      </div>
    </div>
  );
}
