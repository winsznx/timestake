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
  id: number;
  owner: string;
  name: string;
  description: string;
  frequency: number;
  stakeAmount: number;
  createdAtBlock: number;
  active: boolean;
}

export interface OnChainStreak {
  streak: number;
  totalCheckIns: number;
  lastCheckInBlock: number;
}

export interface OnChainReward {
  claimable: number;
  totalClaimed: number;
  lastClaimBlock: number;
}

export interface OnChainScore {
  score: number;
  rank: number;
  lastUpdatedBlock: number;
}

async function readOnly(
  contractName: string,
  functionName: string,
  functionArgs: ClarityValue[],
  senderAddress: string
): Promise<unknown> {
  const cv = await fetchCallReadOnlyFunction({
    contractAddress: DEFAULT_CONTRACT_ADDRESS,
    contractName,
    functionName,
    functionArgs,
    senderAddress,
    network,
  });
  return cvToValue(cv, true);
}

function toNumber(value: unknown): number {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function toBool(value: unknown): boolean {
  return value === true;
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

  if (!value) {
    return null;
  }

  return {
    id,
    owner: toString(value['owner']),
    name: toString(value['name']),
    description: toString(value['description']),
    frequency: toNumber(value['frequency']),
    stakeAmount: toNumber(value['stake-amount']),
    createdAtBlock: toNumber(value['created-at']),
    active: toBool(value['active']),
  };
}

export async function fetchStreak(
  user: string,
  habitId: number,
  sender: string
): Promise<OnChainStreak> {
  const value = (await readOnly(
    'check-in-manager',
    'get-streak',
    [standardPrincipalCV(user), uintCV(habitId)],
    sender
  )) as Record<string, unknown>;

  return {
    streak: toNumber(value['streak']),
    totalCheckIns: toNumber(value['total-check-ins']),
    lastCheckInBlock: toNumber(value['last-check-in']),
  };
}

export async function fetchReward(
  user: string,
  habitId: number,
  sender: string
): Promise<OnChainReward> {
  const value = (await readOnly(
    'reward-distributor',
    'get-reward',
    [standardPrincipalCV(user), uintCV(habitId)],
    sender
  )) as Record<string, unknown>;

  return {
    claimable: toNumber(value['claimable']),
    totalClaimed: toNumber(value['total-claimed']),
    lastClaimBlock: toNumber(value['last-claim']),
  };
}

export async function fetchScore(user: string, sender: string): Promise<OnChainScore> {
  const value = (await readOnly(
    'leaderboard',
    'get-score',
    [standardPrincipalCV(user)],
    sender
  )) as Record<string, unknown>;

  return {
    score: toNumber(value['score']),
    rank: toNumber(value['rank']),
    lastUpdatedBlock: toNumber(value['last-updated']),
  };
}
