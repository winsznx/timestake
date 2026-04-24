'use client';

import { Badge } from '@/components/ui/Badge';
import { DEFAULT_NETWORK } from '@/lib/constants';

/**
 * Displays a badge indicating the current active Stacks network.
 */
export function NetworkBadge() {
  const isMainnet = DEFAULT_NETWORK === 'mainnet';

  return (
    <Badge variant={isMainnet ? 'success' : 'streak'}>
      {isMainnet ? 'Mainnet' : 'Testnet'}
    </Badge>
  );
}
