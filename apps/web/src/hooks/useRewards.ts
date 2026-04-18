'use client';

import { useCallback, useEffect, useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

import { useWallet } from './useWallet';
import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_NETWORK } from '@/lib/constants';
import { fetchReward } from '@/lib/contract-read';
import type { ClaimHistory, Reward } from '@/types';

const networkObj = DEFAULT_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

export function useRewards(habitId?: string) {
  const { address } = useWallet();
  const [claimable, setClaimable] = useState(0);
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [lastClaimBlock, setLastClaimBlock] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  useEffect(() => {
    if (!address || !habitId) {
      setClaimable(0);
      setTotalClaimed(0);
      setLastClaimBlock(null);
      setError(null);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    fetchReward(address, Number(habitId), address)
      .then((data) => {
        if (!active) {
          return;
        }
        setClaimable(data.claimable);
        setTotalClaimed(data.totalClaimed);
        setLastClaimBlock(data.lastClaimBlock || null);
      })
      .catch((issue) => {
        if (active) {
          setError(issue instanceof Error ? issue.message : 'Failed to load reward');
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
  }, [address, habitId, reloadNonce]);

  const refresh = useCallback(() => {
    setReloadNonce((value) => value + 1);
  }, []);

  async function claimReward(overrideHabitId?: string) {
    const targetId = overrideHabitId ?? habitId;
    if (!address) {
      throw new Error('Wallet not connected');
    }
    if (!targetId) {
      throw new Error('No habit specified');
    }
    await openContractCall({
      contractAddress: DEFAULT_CONTRACT_ADDRESS,
      contractName: 'reward-distributor',
      functionName: 'claim-reward',
      functionArgs: [uintCV(Number(targetId))],
      network: networkObj,
      onFinish: () => {
        refresh();
      },
    });
  }

  const rewards: Reward[] = [];
  const claimHistory: ClaimHistory[] = [];

  return {
    rewards,
    claimHistory,
    claimable,
    totalClaimable: claimable,
    totalClaimed,
    lastClaim: lastClaimBlock,
    loading,
    error,
    claimReward,
    refresh,
  };
}
