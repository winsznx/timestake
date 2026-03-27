'use client';

import { useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { stringUtf8CV, uintCV } from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

import type { HabitFormData } from '@/types';
import { useWallet } from './useWallet';
import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_NETWORK } from '@/lib/constants';

export function useHabits() {
  const { address } = useWallet();
  const [habits, setHabits] = useState<any[]>([]);

  const networkObj = DEFAULT_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

  async function createHabit(input: HabitFormData) {
    if (!address) throw new Error('Wallet not connected');
    
    await openContractCall({
      contractAddress: DEFAULT_CONTRACT_ADDRESS,
      contractName: 'habit-registry',
      functionName: 'create-habit',
      functionArgs: [
        stringUtf8CV(input.name),
        stringUtf8CV(input.description),
        uintCV(input.frequency),
        uintCV(input.stakeAmount),
      ],
      network: networkObj,
      onFinish: (data) => {
        console.log('Habit creation broadcast:', data.txId);
      },
    });
  }

  async function deactivateHabit(habitId: string) {
    if (!address) throw new Error('Wallet not connected');

    await openContractCall({
      contractAddress: DEFAULT_CONTRACT_ADDRESS,
      contractName: 'habit-registry',
      functionName: 'deactivate-habit',
      functionArgs: [uintCV(Number(habitId))],
      network: networkObj,
      onFinish: (data) => {
        console.log('Habit deactivation broadcast:', data.txId);
      },
    });
  }

  return {
    habits,
    activeHabits: habits.filter((h) => h.active),
    inactiveHabits: habits.filter((h) => !h.active),
    summary: { activeHabits: 0, bestStreak: 0, totalCheckIns: 0, lastRewardClaim: 'Never' },
    createHabit,
    deactivateHabit,
    getHabit: (habitId: string) => habits.find((h) => h.id === habitId),
  };
}
