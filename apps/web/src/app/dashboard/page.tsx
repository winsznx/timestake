'use client';

import Link from 'next/link';

import { HabitList } from '@/components/habits/HabitList';
import { CheckInButton } from '@/components/habits/CheckInButton';
import { PageShell } from '@/components/layout/PageShell';
import { Card } from '@/components/ui/Card';
import { buttonStyles } from '@/components/ui/Button';
import { WalletInfo } from '@/components/wallet/WalletInfo';
import { useHabits } from '@/hooks/useHabits';
import { useRewards } from '@/hooks/useRewards';
import { useWallet } from '@/hooks/useWallet';
import { formatStx } from '@/lib/utils';

export default function DashboardPage() {
  const { activeHabits, summary } = useHabits();
  const { totalClaimable } = useRewards();
  const { isConnected } = useWallet();
  const quickHabits = activeHabits.slice(0, 2);

  return (
    <PageShell
      actions={
        <Link className={buttonStyles({ size: 'sm', variant: 'ghost' })} href="/habits/new">
          New habit
        </Link>
      }
      description="Track the habits that matter today, then cash in on the consistency that is starting to stack."
      eyebrow="Daily command center"
      title="Dashboard"
    >
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <WalletInfo />
        <Card
          description="Snapshot of the momentum you can act on right now."
          eyebrow="Today"
          title="Status pulse"
        >
          <div className="grid gap-3">
            <div className="panel-outline rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Active habits</p>
              <p className="mt-2 text-4xl font-semibold text-text">{summary.activeHabits}</p>
            </div>
            <div className="panel-outline rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Best streak</p>
              <p className="mt-2 text-4xl font-semibold text-text">{summary.bestStreak} days</p>
            </div>
            <div className="panel-outline rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Claimable rewards</p>
              <p className="mt-2 text-4xl font-semibold text-text">{formatStx(totalClaimable)}</p>
            </div>
          </div>
        </Card>
      </div>

      {!isConnected ? (
        <Card title="Wallet connection recommended" description="The dashboard is available in demo mode, but wallet connection keeps the flow aligned with the Stacks product shape.">
          <p className="text-sm text-muted">
            Reconnect from the header when you want to move back into the full loop.
          </p>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Total check-ins" description="Every completed day adds to your habit ledger.">
          <p className="text-4xl font-semibold text-text">{summary.totalCheckIns}</p>
        </Card>
        <Card title="Last reward claim" description="Most recent reward settlement across all habits.">
          <p className="text-xl font-semibold text-text">{summary.lastRewardClaim}</p>
        </Card>
        <Card title="Quick next step" description="The fastest way to build score is staying current today.">
          <Link className="text-sm font-medium text-primary-light transition-colors hover:text-white" href="/rewards">
            Open rewards view
          </Link>
        </Card>
      </div>

      <Card
        title="Quick check-in"
        description="Use the fastest path when you already know which habit deserves today’s signal."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {quickHabits.map((habit) => (
            <div className="panel-outline rounded-[24px] p-5" key={habit.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-text">{habit.name}</p>
                  <p className="mt-1 text-sm text-muted">{habit.description}</p>
                </div>
                <p className="text-sm font-medium text-primary-light">{habit.streak} days</p>
              </div>
              <div className="mt-4">
                <CheckInButton habitId={habit.id} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <HabitList
        emptyDescription="Create your first habit to make this dashboard feel alive."
        emptyTitle="No active habits yet"
        habits={activeHabits}
        showCheckIn
      />
    </PageShell>
  );
}
