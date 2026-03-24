import Link from 'next/link';

import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { NetworkBadge } from '@/components/wallet/NetworkBadge';
import { Card } from '@/components/ui/Card';
import { buttonStyles } from '@/components/ui/Button';
import {
  APP_NAME,
  APP_TAGLINE,
  HERO_STATS,
  STREAK_MILESTONES,
} from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Page() {
  const features = [
    {
      title: 'Daily check-ins',
      description:
        'Define the habit once, then lock in progress every day with a clear on-chain ritual.',
    },
    {
      title: 'Streak rewards',
      description:
        'Longer streaks unlock bigger multipliers so consistency feels visibly valuable.',
    },
    {
      title: 'Leaderboard heat',
      description:
        'Momentum becomes social when your routines start showing up next to other builders.',
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[36px] p-8 sm:p-10" interactive>
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <NetworkBadge />
              <span className="rounded-full border border-border/60 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted">
                Stacks-first habit protocol
              </span>
            </div>

            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-light">
                {APP_NAME}
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] text-text sm:text-6xl">
                {APP_TAGLINE}
              </h1>
              <p className="max-w-2xl text-lg text-muted">
                Turn routines into visible momentum with on-chain check-ins, streak-powered rewards,
                and a leaderboard that makes consistency feel alive.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className={buttonStyles({ size: 'lg', variant: 'primary' })} href="/dashboard">
                Open dashboard
              </Link>
              <Link className={buttonStyles({ size: 'lg', variant: 'ghost' })} href="/habits/new">
                Create a habit
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {HERO_STATS.map((stat) => (
                <div className="panel-outline rounded-[24px] p-4" key={stat.label}>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-text">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card
            className="rounded-[36px] bg-gradient-to-br from-primary/25 via-card to-card"
            description="A sample 30-day streak lane showing where the reward curve starts to bend."
            eyebrow="Reward runway"
            title="Consistency compounds faster than motivation"
          >
            <div className="space-y-4">
              {STREAK_MILESTONES.map((milestone) => (
                <div
                  className="panel-outline flex items-center justify-between rounded-[24px] p-4"
                  key={milestone}
                >
                  <div>
                    <p className="text-sm font-medium text-text">Day {milestone}</p>
                    <p className="mt-1 text-sm text-muted">
                      Unlock the next multiplier checkpoint.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-text">
                      {milestone >= 30 ? '5x' : milestone >= 14 ? '3x' : '2x'}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">Reward power</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card
            className="rounded-[36px]"
            description="Connect now to explore the live demo state while the Clarity contracts are wired in."
            eyebrow="Wallet"
            title="Ready to start tracking?"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-sm text-muted">
                Habit creation, check-ins, and reward claims are available in demo mode immediately.
              </p>
              <ConnectWallet />
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            className={cn(
              'rounded-[30px]',
              index === 1 && 'bg-gradient-to-br from-card via-card to-primary/10'
            )}
            description={feature.description}
            eyebrow={`Feature 0${index + 1}`}
            key={feature.title}
            title={feature.title}
          />
        ))}
      </section>

      <section className="mt-10">
        <Card
          className="rounded-[36px]"
          description="A tight loop that keeps behavior visible, social, and reward-aware."
          eyebrow="How it works"
          title="Design the habit, check in daily, climb the board"
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              'Create a habit with a cadence and stake that matches your actual ambition.',
              'Check in once per day to keep the streak alive and feed your claimable rewards.',
              'Track progress across habits, rewards, and ranking without leaving the app shell.',
            ].map((step, index) => (
              <div className="panel-outline rounded-[24px] p-5" key={step}>
                <p className="text-xs uppercase tracking-[0.22em] text-primary-light">
                  Step 0{index + 1}
                </p>
                <p className="mt-4 text-base text-text">{step}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
