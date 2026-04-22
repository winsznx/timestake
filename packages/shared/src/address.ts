const MAINNET_PREFIX = 'SP';
const TESTNET_PREFIX = 'ST';
const BASE32_BODY = /^[0-9A-HJKMNP-TV-Z]+$/;

/**
 * Validates if a given string is a valid Stacks address format.
 * Checks for proper prefix (SP/ST), length, and base32 characters.
 * 
 * @param value - The string to validate
 * @returns True if the address format is valid
 */
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

/**
 * Determines the network type based on the address prefix.
 * 
 * @param address - The Stacks address to check
 * @returns 'mainnet', 'testnet', or 'unknown'
 */
export function getAddressNetwork(address: string | null | undefined): 'mainnet' | 'testnet' | 'unknown' {
  if (!address || typeof address !== 'string') {
    return 'unknown';
  }
  if (address.startsWith(MAINNET_PREFIX)) {
    return 'mainnet';
  }
  if (address.startsWith(TESTNET_PREFIX)) {
    return 'testnet';
  }
  return 'unknown';
}
