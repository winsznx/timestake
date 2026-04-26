/**
 * Validates a Stacks transaction ID.
 * @param txId - The transaction ID string to validate
 */
export function isValidTxId(txId: string): boolean {
  return typeof txId === 'string' && /^0x[a-fA-F0-9]{64}$/.test(txId);
}
