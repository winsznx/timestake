import { DEFAULT_CONTRACT_ADDRESS } from './constants';

export const streakbitContracts = {
  habitRegistry: { address: DEFAULT_CONTRACT_ADDRESS, name: 'habit-registry' },
  checkInManager: { address: DEFAULT_CONTRACT_ADDRESS, name: 'check-in-manager' },
  rewardDistributor: { address: DEFAULT_CONTRACT_ADDRESS, name: 'reward-distributor' },
  penaltyHandler: { address: DEFAULT_CONTRACT_ADDRESS, name: 'penalty-handler' },
  leaderboard: { address: DEFAULT_CONTRACT_ADDRESS, name: 'leaderboard' },
} as const;

export interface ContractCallDescriptor {
  contractAddress: string;
  contractName: string;
  functionName: string;
  args: Array<string | number | boolean>;
}

export function buildContractCall(
  contractKey: keyof typeof streakbitContracts,
  functionName: string,
  args: Array<string | number | boolean>
): ContractCallDescriptor {
  const contract = streakbitContracts[contractKey];

  return {
    contractAddress: contract.address,
    contractName: contract.name,
    functionName,
    args,
  };
}

export function buildCreateHabitCall(
  name: string,
  description: string,
  frequency: number,
  stakeAmount: number
) {
  return buildContractCall('habitRegistry', 'create-habit', [
    name,
    description,
    frequency,
    stakeAmount,
  ]);
}

export function buildCheckInCall(habitId: string) {
  return buildContractCall('checkInManager', 'check-in', [habitId]);
}

export function buildClaimRewardCall(habitId: string) {
  return buildContractCall('rewardDistributor', 'claim-reward', [habitId]);
}
