export type LeaderboardPeriod = '7d' | '30d' | 'all-time';

export interface LeaderEntry {
  rank: number;
  address: string;
  score: number;
  streak: number;
  habitsCompleted: number;
  rewardsClaimed: number;
  highlight?: boolean;
}

export interface UserScore {
  address: string;
  score: number;
  streak: number;
  habitsCompleted: number;
  rewardsClaimed: number;
}
