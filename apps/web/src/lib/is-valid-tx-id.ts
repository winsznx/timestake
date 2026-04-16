const TX_ID = /^0x[0-9a-fA-F]{64}$/;

export function isValidTxId(value: string): boolean {
  return typeof value === 'string' && TX_ID.test(value);
}
