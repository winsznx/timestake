import { Card } from '@/components/ui/Card';
import { formatDate, formatStx } from '@/lib/utils';
import type { ClaimHistory } from '@/types';

interface RewardHistoryProps {
  history: ClaimHistory[];
}

export function RewardHistory({ history }: RewardHistoryProps) {
  return (
    <Card title="Reward history" description="Every successful claim is listed here.">
      {history.length === 0 ? (
        <p className="text-sm text-muted">Claim a reward to start building your history.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="pb-3 pr-6 font-medium">Habit</th>
                <th className="pb-3 pr-6 font-medium">Amount</th>
                <th className="pb-3 font-medium">Claimed</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr className="border-t border-border/40" key={entry.id}>
                  <td className="py-4 pr-6 text-text">{entry.habitName}</td>
                  <td className="py-4 pr-6 text-text">{formatStx(entry.amount)}</td>
                  <td className="py-4 text-muted">{formatDate(entry.claimedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
