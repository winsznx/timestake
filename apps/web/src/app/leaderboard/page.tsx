'use client';

import { useState } from 'react';

import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { LEADERBOARD_PERIODS } from '@/lib/constants';
import type { LeaderboardPeriod } from '@/types';

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<LeaderboardPeriod>('all-time');
  const { entries } = useLeaderboard(period);

  return (
    <PageShell
      description="See who is stacking the most consistent days, the cleanest streaks, and the strongest reward history."
      eyebrow="Competition"
      title="Leaderboard"
    >
      <div className="flex flex-wrap gap-3">
        {LEADERBOARD_PERIODS.map((option) => (
          <Button
            key={option.value}
            onClick={() => setPeriod(option.value)}
            variant={period === option.value ? 'primary' : 'ghost'}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {entries.slice(0, 3).map((entry) => (
          <Card
            key={entry.address}
            description={`Top streak: ${entry.streak} days`}
            eyebrow={`Rank ${entry.rank}`}
            title={entry.highlight ? 'You' : entry.address.slice(0, 12)}
          >
            <p className="text-4xl font-semibold text-text">{entry.score}</p>
          </Card>
        ))}
      </div>

      <LeaderboardTable entries={entries} />
    </PageShell>
  );
}
