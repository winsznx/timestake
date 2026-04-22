/**
 * Supported Stacks networks.
 */
export type StacksNetwork = 'mainnet' | 'testnet';

/**
 * Returns a user-friendly label for the Stacks network.
 */
export function getNetworkLabel(network: StacksNetwork): string {
  return network === 'mainnet' ? 'Stacks Mainnet' : 'Stacks Testnet';
}

/**
 * Checks if the network is Mainnet.
 */
export function isMainnet(network: StacksNetwork): boolean {
  return network === 'mainnet';
}

/**
 * Returns the base Hiro API URL for the specified network.
 * 
 * @param network - The stacks network
 * @returns The API base URL string
 */
export function getApiUrl(network: StacksNetwork): string {
  return network === 'mainnet' 
    ? 'https://api.hiro.so' 
    : 'https://api.testnet.hiro.so';
}
