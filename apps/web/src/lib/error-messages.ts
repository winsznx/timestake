/**
 * Standardized error messages for the application.
 */
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Connect your Stacks wallet to continue.',
  WALLET_REJECTED: 'Request was rejected in the wallet.',
  NETWORK_ERROR: 'Network request failed. Check your connection.',
  INSUFFICIENT_BALANCE: 'Not enough STX to complete this action.',
  INVALID_ADDRESS: 'Enter a valid Stacks address.',
  INVALID_STAKE: 'Stake amount must be greater than zero.',
  UNKNOWN: 'Something went wrong. Please try again.',
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;

/**
 * Returns a human-readable error message from a key or code.
 */
export function getErrorMessage(key: ErrorMessageKey | string): string {
  if (key in ERROR_MESSAGES) {
    return ERROR_MESSAGES[key as ErrorMessageKey];
  }
  return ERROR_MESSAGES.UNKNOWN;
}
