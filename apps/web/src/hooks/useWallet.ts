'use client';

import { useEffect, useState } from 'react';
import { showConnect } from '@stacks/connect';
import { userSession } from '@/components/wallet/ConnectProvider';
import { DEFAULT_NETWORK } from '@/lib/constants';
import { truncateAddress } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [balance, setBalance] = useState<number | null>(0);

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
