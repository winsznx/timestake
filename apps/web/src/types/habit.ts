export type HabitStatus = 'active' | 'inactive';

export interface HabitFormData {
  name: string;
  description: string;
  frequency: number;
  stakeAmount: number;
}

export interface Habit {
  id: string;
  owner: string;
  name: string;
  description: string;
  frequency: number;
  stakeAmount: number;
  createdAt: string;
  active: boolean;
  streak: number;
  bestStreak: number;
  totalCheckIns: number;
  lastCheckIn: string | null;
  checkInHistory: string[];
  claimableReward: number;
  totalClaimed: number;
  lastClaimAt: string | null;
}
