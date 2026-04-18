'use client';

import Link from 'next/link';

import { HabitCalendar } from '@/components/habits/HabitCalendar';
import { CheckInButton } from '@/components/habits/CheckInButton';
import { StreakCounter } from '@/components/habits/StreakCounter';
import { PageShell } from '@/components/layout/PageShell';
import { RewardCard } from '@/components/rewards/RewardCard';
import { Card } from '@/components/ui/Card';
import { buttonStyles } from '@/components/ui/Button';
import { useHabits } from '@/hooks/useHabits';
import { useRewards } from '@/hooks/useRewards';
import { formatDate, formatFrequency, formatStx, getStreakMultiplier } from '@/lib/utils';
import type { Reward } from '@/types';

export default function HabitDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { getHabit } = useHabits();
  const { claimReward } = useRewards(params.id);
  const habit = getHabit(params.id);
  const reward: Reward | null = habit
    ? {
        habitId: habit.id,
        habitName: habit.name,
        claimable: habit.claimableReward,
        multiplier: getStreakMultiplier(habit.streak),
        streak: habit.streak,
        totalClaimed: habit.totalClaimed,
        lastClaimAt: habit.lastClaimAt,
      }
    : null;

  if (!habit) {
    return (
      <PageShell
        description="The habit you requested could not be found in the current demo state."
        eyebrow="Missing habit"
        title="Habit not found"
      >
        <Card title="Try another habit" description="You can head back to the full habit list and pick an active one from there.">
          <Link className={buttonStyles({ variant: 'ghost' })} href="/habits">
            Return to habits
          </Link>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      actions={<CheckInButton habitId={habit.id} />}
      description={habit.description}
      eyebrow="Habit detail"
      title={habit.name}
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <StreakCounter bestStreak={habit.bestStreak} streak={habit.streak} />
        <Card
          description="A clear snapshot of the habit’s cadence, stake, and latest activity."
          eyebrow="Profile"
          title="Habit stats"
        >
          <div className="grid gap-3">
            <div className="panel-outline rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Frequency</p>
              <p className="mt-2 text-lg font-semibold text-text">{formatFrequency(habit.frequency)}</p>
            </div>
            <div className="panel-outline rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Stake amount</p>
              <p className="mt-2 text-lg font-semibold text-text">{formatStx(habit.stakeAmount)}</p>
            </div>
            <div className="panel-outline rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Created</p>
              <p className="mt-2 text-lg font-semibold text-text">{formatDate(habit.createdAt)}</p>
            </div>
            <div className="panel-outline rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Last check-in</p>
              <p className="mt-2 text-lg font-semibold text-text">{formatDate(habit.lastCheckIn)}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card
        description="A contribution-style grid for scanning how consistently this habit has been honored."
        eyebrow="History"
        title="Check-in calendar"
      >
        <HabitCalendar history={habit.checkInHistory} />
      </Card>

      {reward ? (
        <RewardCard reward={reward} onClaim={async () => claimReward()} />
      ) : null}
    </PageShell>
  );
}
