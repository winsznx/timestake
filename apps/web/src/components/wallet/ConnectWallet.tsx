'use client';

import { Button } from '@/components/ui/Button';
import { useWallet } from '@/hooks/useWallet';

export function ConnectWallet() {
  const { connect, disconnect, hydrated, isConnected, shortAddress } = useWallet();

  if (!hydrated) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Checking wallet...
      </Button>
    );
  }

  if (isConnected) {
    return (
      <Button variant="ghost" size="sm" onClick={disconnect}>
        {shortAddress}
      </Button>
    );
  }

  return (
    <Button variant="primary" size="sm" onClick={connect}>
      Connect Wallet
    </Button>
  );
}
