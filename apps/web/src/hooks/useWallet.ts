'use client';

import { useEffect, useState } from 'react';

import { DEFAULT_NETWORK } from '@/lib/constants';
import {
  connectDemoWallet,
  disconnectDemoWallet,
  getWalletBalance,
  readDemoState,
  subscribeToDemoState,
} from '@/lib/demo-store';
import { truncateAddress } from '@/lib/utils';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const sync = () => {
      const state = readDemoState();
      setAddress(state.walletAddress);
      setBalance(getWalletBalance(state.walletAddress));
      setHydrated(true);
    };

    sync();

    return subscribeToDemoState(sync);
  }, []);

  async function connect() {
    const nextAddress = connectDemoWallet();
    setAddress(nextAddress);
    setBalance(getWalletBalance(nextAddress));
  }

  async function disconnect() {
    disconnectDemoWallet();
    setAddress(null);
    setBalance(null);
  }

  return {
    address,
    shortAddress: truncateAddress(address),
    balance,
    network: DEFAULT_NETWORK,
    hydrated,
    isConnected: Boolean(address),
    connect,
    disconnect,
  };
}
