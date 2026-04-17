'use client';

import { cn } from '@/lib/cn';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < pageCount;

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-between gap-3 text-sm', className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoPrevious}
        className="rounded-lg border border-border bg-white/5 px-3 py-1.5 text-text transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-muted">
        Page <span className="text-text">{page}</span> of {pageCount}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoNext}
        className="rounded-lg border border-border bg-white/5 px-3 py-1.5 text-text transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}
