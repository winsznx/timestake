import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50';
  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary text-white shadow-[0_18px_32px_rgba(124,58,237,0.35)] hover:scale-[1.02] hover:bg-primary-light active:scale-[0.98]',
    secondary:
      'bg-secondary text-slate-950 shadow-[0_18px_32px_rgba(16,185,129,0.28)] hover:scale-[1.02] hover:bg-secondary-light active:scale-[0.98]',
    ghost:
      'border border-border bg-white/5 text-text hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98]',
    danger:
      'bg-danger text-white shadow-[0_16px_26px_rgba(239,68,68,0.28)] hover:scale-[1.02] hover:bg-red-400 active:scale-[0.98]',
  };
  const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 px-3.5 text-sm',
    md: 'h-11 px-4.5 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full');
}

export function Button({
  className,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
          Working...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
