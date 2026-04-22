import type { TransactionStatus } from './types';

/**
 * Checks if a transaction status is terminal (success or failed).
 * 
 * @param status - The transaction status to check
 * @returns True if the status is terminal
 */
export function isTerminalStatus(status: TransactionStatus): boolean {
  return status === 'success' || status === 'failed';
}

/**
 * Checks if a transaction status is still pending.
 * 
 * @param status - The transaction status to check
 * @returns True if the status is pending
 */
export function isPendingStatus(status: TransactionStatus): boolean {
  return status === 'pending';
}

/**
 * Returns a human-readable label for a transaction status.
 * 
 * @param status - The transaction status
 * @returns A capitalized label string
 */
export function getStatusLabel(status: TransactionStatus): string {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'success':
      return 'Success';
    case 'failed':
      return 'Failed';
    default:
      return 'Unknown';
  }
}
