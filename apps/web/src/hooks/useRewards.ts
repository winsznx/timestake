'use client';

import { useMemo } from 'react';
import type { Reward } from '@/types';

/**
 * Hook for managing and filtering user rewards.
 */
export function useRewards(rewards: Reward[]) {
  const claimableRewards = useMemo(() => 
    rewards.filter(r => r.status === 'claimable'),
  [rewards]);

  const totalValue = useMemo(() => 
    rewards.reduce((acc, r) => acc + (r.amount || 0), 0), 
  [rewards]);

  return {
    rewards,
    claimableRewards,
    totalValue,
    hasRewards: rewards.length > 0,
  };
}
