'use client';

import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

import { useWallet } from './useWallet';
import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_NETWORK } from '@/lib/constants';
import type { ClaimHistory, Reward } from '@/types';

export function useRewards(habitId?: string) {
  const { address } = useWallet();
  const networkObj = DEFAULT_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

  const rewards: Reward[] = [];
  const claimHistory: ClaimHistory[] = [];

  async function claimReward(overrideHabitId?: string) {
    const targetId = overrideHabitId ?? habitId;
    if (!address) throw new Error('Wallet not connected');
    if (!targetId) throw new Error('No habit specified');

    await openContractCall({
      contractAddress: DEFAULT_CONTRACT_ADDRESS,
      contractName: 'reward-distributor',
      functionName: 'claim-reward',
      functionArgs: [uintCV(Number(targetId))],
      network: networkObj,
      onFinish: (data) => {
        console.log('Reward claim broadcast:', data.txId);
      },
    });
  }

  return {
    rewards,
    claimHistory,
    claimable: 0,
    totalClaimable: 0,
    totalClaimed: 0,
    lastClaim: null,
    claimReward,
  };
}
