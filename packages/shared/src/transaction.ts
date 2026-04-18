import type { TransactionStatus } from './types';

export function isTerminalStatus(status: TransactionStatus): boolean {
  return status === 'success' || status === 'failed';
}

export function isPendingStatus(status: TransactionStatus): boolean {
  return status === 'pending';
}
