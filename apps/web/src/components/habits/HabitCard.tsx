import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CheckInButton } from '@/components/habits/CheckInButton';
import { formatDate, formatFrequency, formatStx, getStreakProgress } from '@/lib/utils';
import type { Habit } from '@/types';

interface HabitCardProps {
  habit: Habit;
  showCheckIn?: boolean;
}

export function HabitCard({ habit, showCheckIn = false }: HabitCardProps) {
  return (
    <Card
      interactive
      className="rounded-[30px]"
      description={habit.description}
      eyebrow={habit.active ? 'Active habit' : 'Archived habit'}
      title={habit.name}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={habit.active ? 'success' : 'muted'}>
            {habit.active ? 'Running' : 'Inactive'}
          </Badge>
          <Badge variant="streak">{habit.streak} day streak</Badge>
          <Badge variant="rank">{formatFrequency(habit.frequency)}</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="panel-outline rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Stake</p>
            <p className="mt-2 text-xl font-semibold text-text">{formatStx(habit.stakeAmount)}</p>
          </div>
          <div className="panel-outline rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Last check-in</p>
            <p className="mt-2 text-sm font-medium text-text">{formatDate(habit.lastCheckIn)}</p>
          </div>
          <div className="panel-outline rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Claimable</p>
            <p className="mt-2 text-xl font-semibold text-text">{formatStx(habit.claimableReward)}</p>
          </div>
        </div>
        <ProgressBar
          hint="30-day target"
          label="Streak progress"
          value={getStreakProgress(habit.streak)}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link className="text-sm font-medium text-primary-light transition-colors hover:text-white" href={`/habits/${habit.id}`}>
            View habit detail
          </Link>
          {showCheckIn ? <CheckInButton habitId={habit.id} /> : null}
        </div>
      </div>
    </Card>
  );
}
