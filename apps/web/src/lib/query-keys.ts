import type { LeaderboardPeriod } from '@/types';

export const queryKeys = {
  wallet: (address: string) => ['wallet', address] as const,
  habits: {
    all: ['habits'] as const,
    list: (owner: string) => ['habits', 'list', owner] as const,
    detail: (id: string) => ['habits', 'detail', id] as const,
  },
  rewards: {
    all: ['rewards'] as const,
    list: (owner: string) => ['rewards', 'list', owner] as const,
    history: (owner: string) => ['rewards', 'history', owner] as const,
  },
  leaderboard: (period: LeaderboardPeriod) => ['leaderboard', period] as const,
  streak: (owner: string) => ['streak', owner] as const,
} as const;
