import React from 'react';
import { cn } from '@/lib/cn';

export function StreakCounter({ count, className }: { count: number, className?: string }) {
    const isHot = count >= 7;
    return (
        <div className={cn("inline-flex items-center gap-1 font-mono text-xl", isHot ? "text-orange-500" : "text-zinc-300", className)} aria-label={`Current streak: ${count} days`}>
            <span>🔥</span>
            <strong>{count}</strong>
        </div>
    );
}
