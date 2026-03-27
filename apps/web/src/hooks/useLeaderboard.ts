'use client';

import type { LeaderboardPeriod } from '@/types';

export function useLeaderboard(period: LeaderboardPeriod = 'all-time') {
  return {
    entries: [],
  };
}
