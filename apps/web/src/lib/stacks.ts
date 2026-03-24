import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_NETWORK } from './constants';

const isMainnet = DEFAULT_NETWORK === 'mainnet';

export const stacksNetwork = {
  name: isMainnet ? 'Stacks Mainnet' : 'Stacks Testnet',
  slug: DEFAULT_NETWORK,
  contractAddress: DEFAULT_CONTRACT_ADDRESS,
  coreApiBaseUrl: isMainnet ? 'https://api.hiro.so' : 'https://api.testnet.hiro.so',
  explorerBaseUrl: isMainnet
    ? 'https://explorer.hiro.so'
    : 'https://explorer.hiro.so/?chain=testnet',
};

export function getExplorerUrl(path = '') {
  return `${stacksNetwork.explorerBaseUrl}${path}`;
}
