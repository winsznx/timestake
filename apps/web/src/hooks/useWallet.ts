'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { showConnect } from '@stacks/connect';
import { userSession } from '@/components/wallet/ConnectProvider';
import { APP_NAME, DEFAULT_NETWORK } from '@/lib/constants';
import { truncateAddress } from '@/lib/utils';

const MICROSTX_PER_STX = 1_000_000;
const API_BASE = DEFAULT_NETWORK === 'mainnet' ? 'https://api.hiro.so' : 'https://api.testnet.hiro.so';

interface StxBalanceResponse {
  balance: string;
}

/**
 * Utility for fetching STX balance from the Hiro API.
 */
async function fetchStxBalance(address: string): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}/extended/v1/address/${address}/stx`);
    if (!res.ok) return 0;
    const json = (await res.json()) as StxBalanceResponse;
    return Number(json.balance) / MICROSTX_PER_STX;
  } catch (error) {
    console.error('Failed to fetch STX balance:', error);
    return 0;
  }
}

/**
 * Comprehensive hook for Stacks wallet interactions and state.
 */
export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setAddress(
        DEFAULT_NETWORK === 'mainnet'
          ? userData.profile.stxAddress.mainnet
          : userData.profile.stxAddress.testnet
      );
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setAddress(
          DEFAULT_NETWORK === 'mainnet'
            ? userData.profile.stxAddress.mainnet
            : userData.profile.stxAddress.testnet
        );
      });
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!address) {
      setBalance(null);
      return;
    }
    let active = true;
    fetchStxBalance(address).then((value) => {
      if (active) setBalance(value);
    });
    return () => { active = false; };
  }, [address]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    showConnect({
      appDetails: {
        name: APP_NAME,
        icon: typeof window !== 'undefined' ? `${window.location.origin}/favicon.svg` : '/favicon.svg',
      },
      onFinish: () => {
        setIsConnecting(false);
        window.location.reload();
      },
      onCancel: () => setIsConnecting(false),
      userSession,
    });
  }, []);

  const disconnect = useCallback(async () => {
    userSession.signUserOut('/');
  }, []);

  const shortAddress = useMemo(() => truncateAddress(address), [address]);

  return {
    address,
    shortAddress,
    balance,
    network: DEFAULT_NETWORK,
    hydrated,
    isConnecting,
    isConnected: Boolean(address),
    connect,
    disconnect,
  };
}
