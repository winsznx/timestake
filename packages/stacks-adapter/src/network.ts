export type StacksNetwork = 'mainnet' | 'testnet';

export function getNetworkLabel(network: StacksNetwork): string {
  return network === 'mainnet' ? 'Stacks Mainnet' : 'Stacks Testnet';
}

export function isMainnet(network: StacksNetwork): boolean {
  return network === 'mainnet';
}
