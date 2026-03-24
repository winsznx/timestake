export interface Reward {
  habitId: string;
  habitName: string;
  claimable: number;
  multiplier: number;
  streak: number;
  totalClaimed: number;
  lastClaimAt: string | null;
}

export interface ClaimHistory {
  id: string;
  habitId: string;
  habitName: string;
  amount: number;
  claimedAt: string;
}
