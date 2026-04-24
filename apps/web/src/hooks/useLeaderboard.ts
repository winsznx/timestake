'use client';

import { useMemo } from 'react';
import type { LeaderboardEntry } from '@/types';

/**
 * Hook for processing and sorting leaderboard data.
 */
export function useLeaderboard(entries: LeaderboardEntry[]) {
  const sortedEntries = useMemo(() => 
    [...entries].sort((a, b) => b.score - a.score),
  [entries]);

  const topThree = useMemo(() => 
    sortedEntries.slice(0, 3),
  [sortedEntries]);

  return {
    entries: sortedEntries,
    topThree,
    hasEntries: entries.length > 0,
  };
}
