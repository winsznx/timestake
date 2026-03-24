import { ClaimButton } from '@/components/rewards/ClaimButton';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatDate, formatStx } from '@/lib/utils';
import type { Reward } from '@/types';

interface RewardCardProps {
  reward: Reward;
  onClaim: (habitId: string) => Promise<void>;
}

export function RewardCard({ reward, onClaim }: RewardCardProps) {
  return (
    <Card
      className="rounded-[30px]"
      description="Streak rewards grow when consistency stays intact."
      eyebrow="Reward stream"
      title={reward.habitName}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <Badge variant="streak">{reward.streak} day streak</Badge>
          <Badge variant="rank">{reward.multiplier}x multiplier</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="panel-outline rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Claimable now</p>
            <p className="mt-2 text-3xl font-semibold text-text">{formatStx(reward.claimable)}</p>
          </div>
          <div className="panel-outline rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Lifetime claimed</p>
            <p className="mt-2 text-3xl font-semibold text-text">
              {formatStx(reward.totalClaimed)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">Last claim: {formatDate(reward.lastClaimAt)}</p>
          <ClaimButton
            disabled={reward.claimable <= 0}
            habitId={reward.habitId}
            onClaim={onClaim}
          />
        </div>
      </div>
    </Card>
  );
}
