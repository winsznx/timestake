import React from 'react';
import { cn } from '@/lib/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
}

/**
 * Avatar component with fallback support.
 */
export function Avatar({ src, alt, fallback, className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-zinc-800',
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs font-medium text-muted">
          {fallback || alt?.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}
