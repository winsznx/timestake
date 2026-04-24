'use client';

import { useWallet } from '@/hooks/useWallet';
import { formatStx, truncateAddress } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

/**
 * Displays detailed information about the connected wallet.
 */
export function WalletInfo() {
  const { address, balance, isConnected, network } = useWallet();

  if (!isConnected) return null;

  return (
    <Card title="Wallet Details" className="w-full max-w-md">
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-black/5 pb-2">
          <span className="text-zinc-500 text-sm font-medium">Address</span>
          <span className="font-mono text-sm">{truncateAddress(address)}</span>
        </div>
        <div className="flex justify-between items-center border-b border-black/5 pb-2">
          <span className="text-zinc-500 text-sm font-medium">Balance</span>
          <span className="font-bold">{formatStx(balance || 0)}</span>
        </div>
        <div className="flex justify-between items-center pb-2">
          <span className="text-zinc-500 text-sm font-medium">Network</span>
          <span className="uppercase text-xs font-bold tracking-widest">{network}</span>
        </div>
      </div>
    </Card>
  );
}
