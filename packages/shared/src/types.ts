/**
 * Configuration for a Stacks smart contract.
 */
export interface ContractConfig {
    /** The principal address of the contract */
    address: string;
    /** The name of the contract */
    name?: string;
    /** The network the contract is deployed on */
    network: 'mainnet' | 'testnet';
    /** The version of the contract */
    version: number;
}

/**
 * Basic profile information for a user.
 */
export interface UserProfile {
    /** The user's wallet address */
    address: string;
    /** The user's current STX balance */
    balance: string;
    /** The user's current account nonce */
    nonce: number;
}

/**
 * Possible states for a blockchain transaction.
 */
export type TransactionStatus = 'pending' | 'success' | 'failed';

/**
 * Standardized API response wrapper.
 */
export interface ApiResponse<T> {
    /** The payload of the response */
    data?: T;
    /** Optional error message if the request failed */
    error?: string;
    /** The time the response was generated */
    timestamp: number;
}
