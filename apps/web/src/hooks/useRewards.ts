'use client';

import { useEffect, useState } from 'react';

import { claimReward, getRewards, readDemoState, subscribeToDemoState } from '@/lib/demo-store';
import type { DemoState } from '@/lib/demo-store';
import { useContractCall } from '@/hooks/useContractCall';

export function useRewards() {
  const [state, setState] = useState<DemoState>(() => readDemoState());
  const { execute, loading, error, clearError } = useContractCall();

  useEffect(() => subscribeToDemoState(setState), []);

  const rewards = getRewards(state.habits);
  const totalClaimable = rewards.reduce((total, reward) => total + reward.claimable, 0);

  async function claim(habitId: string) {
    return execute(() => claimReward(habitId));
  }

  return {
    rewards,
    claimHistory: state.claimHistory,
    totalClaimable: Number(totalClaimable.toFixed(2)),
    claimReward: claim,
    loading,
    error,
    clearError,
  };
}
