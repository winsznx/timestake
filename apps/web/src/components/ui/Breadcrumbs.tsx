import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface BreadcrumbItem {
  href?: string;
  label: ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-2 text-sm text-muted', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-text">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-text' : undefined}>{item.label}</span>
            )}
            {!isLast ? <span aria-hidden="true">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
