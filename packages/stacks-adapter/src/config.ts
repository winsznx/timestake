import { StacksMainnet, StacksTestnet } from '@stacks/network';

/**
 * Global configuration for Stacks network interactions.
 */
export const stacksConfig = {
    /** The display name of the application */
    appName: 'TimeStake',
    /** URL to the application icon */
    appIcon: 'https://timestake.app/icon.png',
    /** The currently active network (defaults to Testnet) */
    network: new StacksTestnet(),
    /** Instance of StacksMainnet */
    mainnet: new StacksMainnet(),
    /** Instance of StacksTestnet */
    testnet: new StacksTestnet()
};

/**
 * The deployed contract principal address.
 * @important Update this after deployment to Mainnet.
 */
export const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

/**
 * The name of the smart contract on-chain.
 */
export const CONTRACT_NAME = 'chain-registry';

/**
 * Utility to switch the active network in stacksConfig.
 * 
 * @param type - Either 'mainnet' or 'testnet'
 */
export function setActiveNetwork(type: 'mainnet' | 'testnet') {
    stacksConfig.network = type === 'mainnet' ? stacksConfig.mainnet : stacksConfig.testnet;
}
