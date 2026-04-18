'use client';

import { useCallback, useEffect, useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';

import { useWallet } from './useWallet';
import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_NETWORK } from '@/lib/constants';
import { fetchStreak } from '@/lib/contract-read';
import { burnBlockHeightToIso, ensureBurnTip } from '@/lib/burn-block-time';

const networkObj = DEFAULT_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

export function useStreak(habitId: string) {
  const { address } = useWallet();
  const [streak, setStreak] = useState(0);
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  useEffect(() => {
    if (!address || !habitId) {
      setStreak(0);
      setTotalCheckIns(0);
      setLastCheckIn(null);
      setError(null);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        await ensureBurnTip();
        const data = await fetchStreak(address, Number(habitId), address);
        if (!active) {
          return;
        }
        setStreak(data.streak);
        setTotalCheckIns(data.totalCheckIns);
        setLastCheckIn(burnBlockHeightToIso(data.lastCheckInBlock));
      } catch (issue) {
        if (active) {
          setError(issue instanceof Error ? issue.message : 'Failed to load streak');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [address, habitId, reloadNonce]);

  const refresh = useCallback(() => {
    setReloadNonce((value) => value + 1);
  }, []);

  async function checkIn() {
    if (!address) {
      throw new Error('Wallet not connected');
    }
    await openContractCall({
      contractAddress: DEFAULT_CONTRACT_ADDRESS,
      contractName: 'check-in-manager',
      functionName: 'check-in',
      functionArgs: [uintCV(Number(habitId))],
      network: networkObj,
      onFinish: () => {
        refresh();
      },
    });
  }

  return {
    streak,
    totalCheckIns,
    lastCheckIn,
    canCheckInToday: true,
    loading,
    error,
    checkIn,
    refresh,
  };
}
