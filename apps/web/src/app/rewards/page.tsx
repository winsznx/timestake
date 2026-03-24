'use client';

import { PageShell } from '@/components/layout/PageShell';
import { RewardCard } from '@/components/rewards/RewardCard';
import { RewardHistory } from '@/components/rewards/RewardHistory';
import { Card } from '@/components/ui/Card';
import { useRewards } from '@/hooks/useRewards';
import { formatStx } from '@/lib/utils';

export default function RewardsPage() {
  const { rewards, claimHistory, totalClaimable, claimReward } = useRewards();

  return (
    <PageShell
      description="Claim streak rewards, review payout history, and see which habits are creating the strongest upside."
      eyebrow="Rewards"
      title="Rewards center"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Claimable now" description="Rewards waiting for you to settle them.">
          <p className="text-4xl font-semibold text-text">{formatStx(totalClaimable)}</p>
        </Card>
        <Card title="Reward streams" description="Habits currently attached to a reward balance.">
          <p className="text-4xl font-semibold text-text">{rewards.filter((reward) => reward.claimable > 0).length}</p>
        </Card>
        <Card title="Claims logged" description="Historical claim events saved in the current session.">
          <p className="text-4xl font-semibold text-text">{claimHistory.length}</p>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.habitId}
              onClaim={(habitId) => claimReward(habitId).then(() => undefined)}
              reward={reward}
            />
          ))}
        </div>
        <RewardHistory history={claimHistory} />
      </div>
    </PageShell>
  );
}
