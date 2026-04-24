'use client';

import { useMemo } from 'react';

/**
 * Hook for calculating streak-related metrics and bonuses.
 */
export function useStreak(streak: number) {
  const multiplier = useMemo(() => {
    if (streak >= 30) return 5;
    if (streak >= 14) return 3;
    if (streak >= 7) return 2;
    return 1;
  }, [streak]);

  const nextMilestone = useMemo(() => {
    if (streak < 7) return 7;
    if (streak < 14) return 14;
    if (streak < 30) return 30;
    return null;
  }, [streak]);

  return {
    streak,
    multiplier,
    nextMilestone,
    bonusPercent: (multiplier - 1) * 100,
  };
}
