import { Card } from '@/components/ui/Card';
import { UserRow } from '@/components/leaderboard/UserRow';
import type { LeaderEntry } from '@/types';

interface LeaderboardTableProps {
  entries: LeaderEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <Card title="Leaderboard" description="Top streak builders ranked by score, streak, and claimed rewards.">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="pb-3 pr-6 font-medium">Rank</th>
              <th className="pb-3 pr-6 font-medium">Address</th>
              <th className="pb-3 pr-6 font-medium">Score</th>
              <th className="pb-3 pr-6 font-medium">Streak</th>
              <th className="pb-3 pr-6 font-medium">Habits</th>
              <th className="pb-3 font-medium">Rewards</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <UserRow entry={entry} key={entry.address} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
