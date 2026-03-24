import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  label?: string;
  hint?: string;
  className?: string;
}

export function ProgressBar({ value, label, hint, className }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('space-y-2', className)}>
      {(label || hint) && (
        <div className="flex items-center justify-between gap-3 text-sm">
          {label ? <span className="text-text">{label}</span> : <span />}
          {hint ? <span className="text-muted">{hint}</span> : null}
        </div>
      )}
      <div className="h-3 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
