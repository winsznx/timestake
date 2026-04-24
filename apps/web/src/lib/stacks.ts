import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import { DEFAULT_NETWORK } from './constants';

/**
 * Returns the current active Stacks network instance.
 */
export function getNetwork() {
  return DEFAULT_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;
}

/**
 * Converts micro-STX to STX.
 */
export function microStxToStx(amount: number | bigint): number {
  return Number(amount) / 1_000_000;
}

/**
 * Converts STX to micro-STX.
 */
export function stxToMicroStx(amount: number): bigint {
  return BigInt(Math.floor(amount * 1_000_000));
}
