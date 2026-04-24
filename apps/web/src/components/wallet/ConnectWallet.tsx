'use client';

import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/Button';
import { useWallet } from '@/hooks/useWallet';
import { truncateAddress } from '@/lib/utils';

/**
 * Component for triggering wallet connection or displaying connected status.
 */
export const ConnectWallet = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { address, isConnected, connect, hydrated } = useWallet();

    if (!hydrated) {
      return (
        <Button variant="secondary" disabled className={className} {...props}>
          Checking wallet...
        </Button>
      );
    }

    if (isConnected && address) {
      return (
        <Button variant="secondary" className={className} ref={ref} {...props}>
          {truncateAddress(address)}
        </Button>
      );
    }

    return (
      <Button onClick={connect} className={className} ref={ref} {...props}>
        Connect Wallet
      </Button>
    );
  }
);

ConnectWallet.displayName = 'ConnectWallet';
