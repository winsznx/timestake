import { RankBadge } from '@/components/leaderboard/RankBadge';
import { truncateAddress } from '@/lib/utils';
import type { LeaderEntry } from '@/types';

interface UserRowProps {
  entry: LeaderEntry;
}

export function UserRow({ entry }: UserRowProps) {
  return (
    <tr className={entry.highlight ? 'bg-primary/8' : ''}>
      <td className="py-4 pr-6">
        <RankBadge rank={entry.rank} />
      </td>
      <td className="py-4 pr-6 font-mono text-sm text-text">{truncateAddress(entry.address, 10, 6)}</td>
      <td className="py-4 pr-6 text-text">{entry.score}</td>
      <td className="py-4 pr-6 text-text">{entry.streak}</td>
      <td className="py-4 pr-6 text-text">{entry.habitsCompleted}</td>
      <td className="py-4 text-text">{entry.rewardsClaimed.toFixed(1)} STX</td>
    </tr>
  );
}
