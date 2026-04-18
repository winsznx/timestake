'use client';

import { useCallback, useEffect, useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { stringUtf8CV, uintCV } from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

import { useWallet } from './useWallet';
import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_NETWORK } from '@/lib/constants';
import {
  fetchHabit,
  fetchHabitCount,
  fetchReward,
  fetchStreak,
} from '@/lib/contract-read';
import { burnBlockHeightToIso, ensureBurnTip } from '@/lib/burn-block-time';
import type { Habit, HabitFormData } from '@/types';

const networkObj = DEFAULT_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;
const BATCH_SIZE = 8;

async function loadHabitsForUser(address: string): Promise<Habit[]> {
  await ensureBurnTip();
  const count = await fetchHabitCount(address);
  if (count <= 0) {
    return [];
  }

  const ids: number[] = [];
  for (let id = 1; id <= count; id += 1) {
    ids.push(id);
  }

  const habits: Habit[] = [];
  for (let cursor = 0; cursor < ids.length; cursor += BATCH_SIZE) {
    const window = ids.slice(cursor, cursor + BATCH_SIZE);
    const raw = await Promise.all(window.map((id) => fetchHabit(id, address)));
    const mine = raw.filter(
      (value): value is NonNullable<typeof value> => value !== null && value.owner === address
    );

    const enriched = await Promise.all(
      mine.map(async (habit) => {
        const [streak, reward] = await Promise.all([
          fetchStreak(address, habit.id, address),
          fetchReward(address, habit.id, address),
        ]);
        return { habit, streak, reward };
      })
    );

    for (const { habit, streak, reward } of enriched) {
      habits.push({
        id: String(habit.id),
        owner: habit.owner,
        name: habit.name,
        description: habit.description,
        frequency: habit.frequency,
        stakeAmount: habit.stakeAmount,
        createdAt: burnBlockHeightToIso(habit.createdAtBlock) ?? '',
        active: habit.active,
        streak: streak.streak,
        bestStreak: streak.streak,
        totalCheckIns: streak.totalCheckIns,
        lastCheckIn: burnBlockHeightToIso(streak.lastCheckInBlock),
        checkInHistory: [],
        claimableReward: reward.claimable,
        totalClaimed: reward.totalClaimed,
        lastClaimAt: burnBlockHeightToIso(reward.lastClaimBlock),
      });
    }
  }

  return habits;
}

export function useHabits() {
  const { address } = useWallet();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  useEffect(() => {
    if (!address) {
      setHabits([]);
      setError(null);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    loadHabitsForUser(address)
      .then((result) => {
        if (active) {
          setHabits(result);
        }
      })
      .catch((issue) => {
        if (active) {
          setError(issue instanceof Error ? issue.message : 'Failed to load habits');
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
  }, [address, reloadNonce]);

  const refresh = useCallback(() => {
    setReloadNonce((value) => value + 1);
  }, []);

  async function createHabit(input: HabitFormData) {
    if (!address) {
      throw new Error('Wallet not connected');
    }
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
      onFinish: () => {
        refresh();
      },
    });
  }

  async function deactivateHabit(habitId: string) {
    if (!address) {
      throw new Error('Wallet not connected');
    }
    await openContractCall({
      contractAddress: DEFAULT_CONTRACT_ADDRESS,
      contractName: 'habit-registry',
      functionName: 'deactivate-habit',
      functionArgs: [uintCV(Number(habitId))],
      network: networkObj,
      onFinish: () => {
        refresh();
      },
    });
  }

  const activeHabits = habits.filter((habit) => habit.active);
  const inactiveHabits = habits.filter((habit) => !habit.active);
  const bestStreak = habits.reduce((best, habit) => Math.max(best, habit.streak), 0);
  const totalCheckIns = habits.reduce((sum, habit) => sum + habit.totalCheckIns, 0);
  const lastClaim = habits.reduce<string | null>((latest, habit) => {
    if (!habit.lastClaimAt) {
      return latest;
    }
    if (!latest) {
      return habit.lastClaimAt;
    }
    return new Date(habit.lastClaimAt).getTime() > new Date(latest).getTime()
      ? habit.lastClaimAt
      : latest;
  }, null);

  return {
    habits,
    activeHabits,
    inactiveHabits,
    summary: {
      activeHabits: activeHabits.length,
      bestStreak,
      totalCheckIns,
      lastRewardClaim: lastClaim ?? 'Never',
    },
    loading,
    error,
    createHabit,
    deactivateHabit,
    refresh,
    getHabit: (habitId: string) => habits.find((habit) => habit.id === habitId),
  };
}
