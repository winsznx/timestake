import { cn } from '@/lib/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-2xl bg-[linear-gradient(110deg,rgba(255,255,255,0.05),rgba(255,255,255,0.14),rgba(255,255,255,0.05))] bg-[length:200%_100%]',
        className
      )}
    />
  );
}
