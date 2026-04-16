const MAINNET_PREFIX = 'SP';
const TESTNET_PREFIX = 'ST';
const BASE32_BODY = /^[0-9A-HJKMNP-TV-Z]+$/;

export function isValidStacksAddress(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  if (value.length < 28 || value.length > 41) {
    return false;
  }
  const prefix = value.slice(0, 2);
  if (prefix !== MAINNET_PREFIX && prefix !== TESTNET_PREFIX) {
    return false;
  }
  return BASE32_BODY.test(value.slice(2));
}
