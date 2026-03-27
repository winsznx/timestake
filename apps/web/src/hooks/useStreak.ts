'use client';

import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

import { useWallet } from './useWallet';
import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_NETWORK } from '@/lib/constants';

export function useStreak(habitId: string) {
  const { address } = useWallet();
  const networkObj = DEFAULT_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

  async function checkIn() {
    if (!address) throw new Error('Wallet not connected');

    await openContractCall({
      contractAddress: DEFAULT_CONTRACT_ADDRESS,
      contractName: 'check-in-manager',
      functionName: 'check-in',
      functionArgs: [uintCV(Number(habitId))],
      network: networkObj,
      onFinish: (data) => {
        console.log('Check-in transaction broadcast:', data.txId);
      },
    });
    return { streak: 1 };
  }

  return {
    streak: 0,
    totalCheckIns: 0,
    lastCheckIn: null,
    canCheckInToday: true,
    loading: false,
    checkIn,
  };
}
