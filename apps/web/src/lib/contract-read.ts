import {
  cvToValue,
  fetchCallReadOnlyFunction,
  standardPrincipalCV,
  uintCV,
  type ClarityValue,
} from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_NETWORK } from './constants';

const network = DEFAULT_NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

export interface OnChainHabit {
  readonly id: number;
  readonly owner: string;
  readonly name: string;
  readonly description: string;
  readonly frequency: number;
  readonly stakeAmount: number;
  readonly createdAtBlock: number;
  readonly active: boolean;
}

export interface OnChainStreak {
  readonly streak: number;
  readonly totalCheckIns: number;
  readonly lastCheckInBlock: number;
}

/**
 * Core utility for calling read-only smart contract functions.
 */
async function readOnly(
  contractName: string,
  functionName: string,
  functionArgs: ClarityValue[],
  senderAddress: string
): Promise<unknown> {
  try {
    const cv = await fetchCallReadOnlyFunction({
      contractAddress: DEFAULT_CONTRACT_ADDRESS,
      contractName,
      functionName,
      functionArgs,
      senderAddress,
      network,
    });
    return cvToValue(cv, true);
  } catch (error) {
    console.error(`Read-only call failed: ${functionName}`, error);
    throw error;
  }
}

function toNumber(value: unknown): number {
  if (typeof value === 'bigint') return Number(value);
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

export async function fetchHabitCount(sender: string): Promise<number> {
  const value = await readOnly('habit-registry', 'get-habit-count', [], sender);
  return toNumber(value);
}

export async function fetchHabit(id: number, sender: string): Promise<OnChainHabit | null> {
  const value = (await readOnly(
    'habit-registry',
    'get-habit',
    [uintCV(id)],
    sender
  )) as Record<string, unknown> | null;

  if (!value) return null;

  return {
    id,
    owner: String(value['owner'] || ''),
    name: String(value['name'] || ''),
    description: String(value['description'] || ''),
    frequency: toNumber(value['frequency']),
    stakeAmount: toNumber(value['stake-amount']),
    createdAtBlock: toNumber(value['created-at']),
    active: value['active'] === true,
  };
}
