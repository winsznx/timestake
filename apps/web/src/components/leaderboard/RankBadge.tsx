import { Badge } from '@/components/ui/Badge';

interface RankBadgeProps {
  rank: number;
}

export function RankBadge({ rank }: RankBadgeProps) {
  if (rank === 1) {
    return <Badge variant="rank">Rank 1</Badge>;
  }

  if (rank === 2) {
    return <Badge variant="success">Rank 2</Badge>;
  }

  if (rank === 3) {
    return <Badge variant="muted">Rank 3</Badge>;
  }

  return <Badge variant="muted">Rank {rank}</Badge>;
}
