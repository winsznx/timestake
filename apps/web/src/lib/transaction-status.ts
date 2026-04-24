/**
 * Map of transaction status labels and styles.
 */
export const TX_STATUS_MAP = {
  pending: { label: 'Pending', variant: 'muted' },
  success: { label: 'Success', variant: 'success' },
  failed: { label: 'Failed', variant: 'danger' },
} as const;

export type TxStatus = keyof typeof TX_STATUS_MAP;

/**
 * Returns the display metadata for a transaction status.
 */
export function getTxStatusMetadata(status: TxStatus) {
  return TX_STATUS_MAP[status] || { label: 'Unknown', variant: 'muted' };
}
