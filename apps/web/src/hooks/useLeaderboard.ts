'use client';

import { useEffect, useState } from 'react';

import { useWallet } from './useWallet';
import { fetchScore } from '@/lib/contract-read';
import type { LeaderboardPeriod, LeaderEntry } from '@/types';

export function useLeaderboard(_period: LeaderboardPeriod = 'all-time') {
  const { address } = useWallet();
  const [entries, setEntries] = useState<LeaderEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setEntries([]);
      setError(null);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    fetchScore(address, address)
      .then((data) => {
        if (!active) {
          return;
        }
        setEntries([
          {
            rank: data.rank || 1,
            address,
            score: data.score,
            streak: 0,
            habitsCompleted: 0,
            rewardsClaimed: 0,
            highlight: true,
          },
        ]);
      })
      .catch((issue) => {
        if (active) {
          setEntries([]);
          setError(issue instanceof Error ? issue.message : 'Failed to load score');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [address]);

  return { entries, loading, error };
}
