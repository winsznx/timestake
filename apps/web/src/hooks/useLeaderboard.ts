'use client';

import type { LeaderboardPeriod, LeaderEntry } from '@/types';

export function useLeaderboard(_period: LeaderboardPeriod = 'all-time') {
  const entries: LeaderEntry[] = [];
  return { entries };
}
