'use client';

import { Card } from '@/components/ui/Card';
import { formatStx } from '@/lib/utils';
import { useWallet } from '@/hooks/useWallet';

export function WalletInfo() {
  const { address, balance, isConnected } = useWallet();

  return (
    <Card
      eyebrow="Wallet"
      title={isConnected ? 'Connected session' : 'Demo wallet ready'}
      description={
        isConnected
          ? 'This dashboard is wired in demo mode so the product can be explored before deployment.'
          : 'Connect to unlock habit creation, check-ins, and reward actions.'
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="panel-outline rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Address</p>
          <p className="mt-2 break-all font-mono text-sm text-text">
            {address ?? 'Not connected'}
          </p>
        </div>
        <div className="panel-outline rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Balance</p>
          <p className="mt-2 text-2xl font-semibold text-text">
            {balance !== null ? formatStx(balance) : '--'}
          </p>
        </div>
      </div>
    </Card>
  );
}
