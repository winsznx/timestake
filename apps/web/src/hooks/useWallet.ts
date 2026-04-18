'use client';

import { useEffect, useState } from 'react';
import { showConnect } from '@stacks/connect';

import { userSession } from '@/components/wallet/ConnectProvider';
import { APP_NAME, DEFAULT_NETWORK } from '@/lib/constants';
import { truncateAddress } from '@/lib/utils';

const MICROSTX_PER_STX = 1_000_000;
const apiBase =
  DEFAULT_NETWORK === 'mainnet' ? 'https://api.hiro.so' : 'https://api.testnet.hiro.so';

interface StxBalanceResponse {
  balance: string;
}

async function fetchStxBalance(address: string): Promise<number> {
  try {
    const res = await fetch(`${apiBase}/extended/v1/address/${address}/stx`);
    if (!res.ok) {
      return 0;
    }
    const json = (await res.json()) as StxBalanceResponse;
    return Number(json.balance) / MICROSTX_PER_STX;
  } catch {
    return 0;
  }
}

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

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
      if (active) {
        setBalance(value);
      }
    });
    return () => {
      active = false;
    };
  }, [address]);

  async function connect() {
    showConnect({
      appDetails: {
        name: APP_NAME,
        icon: window.location.origin + '/favicon.svg',
      },
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  }

  async function disconnect() {
    userSession.signUserOut('/');
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
