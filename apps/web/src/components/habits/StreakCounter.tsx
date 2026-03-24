import { Card } from '@/components/ui/Card';

interface StreakCounterProps {
  streak: number;
  bestStreak: number;
}

export function StreakCounter({ streak, bestStreak }: StreakCounterProps) {
  return (
    <Card title="Current streak" description="Momentum is earned one clean day at a time.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[28px] bg-gradient-to-br from-primary via-primary-dark to-accent p-6 text-white shadow-glow">
          <p className="text-xs uppercase tracking-[0.24em] text-white/75">Live streak</p>
          <p className="mt-4 text-6xl font-semibold">{streak}</p>
          <p className="mt-2 text-sm text-white/75">Days stacked</p>
        </div>
        <div className="panel-outline rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Best streak</p>
          <p className="mt-4 text-5xl font-semibold text-text">{bestStreak}</p>
          <p className="mt-2 text-sm text-muted">Your strongest habit run so far.</p>
        </div>
      </div>
    </Card>
  );
}
