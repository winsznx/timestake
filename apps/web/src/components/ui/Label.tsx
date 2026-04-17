import type { LabelHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label className={cn('block text-sm font-medium text-text', className)} {...props}>
      {children}
      {required ? <span className="ml-1 text-danger">*</span> : null}
    </label>
  );
}
