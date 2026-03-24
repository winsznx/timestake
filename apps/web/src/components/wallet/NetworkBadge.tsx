'use client';

import { Badge } from '@/components/ui/Badge';
import { useWallet } from '@/hooks/useWallet';

export function NetworkBadge() {
  const { network } = useWallet();

  return <Badge variant="success">{network}</Badge>;
}
