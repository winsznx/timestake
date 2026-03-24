import {
  DEMO_ADDRESSES,
  LEADERBOARD_PERIODS,
} from '@/lib/constants';
import {
  diffInDays,
  formatDate,
  getHabitScore,
  getStreakMultiplier,
  isSameDay,
} from '@/lib/utils';
import type {
  ClaimHistory,
  Habit,
  HabitFormData,
  LeaderEntry,
  LeaderboardPeriod,
  Reward,
  UserScore,
} from '@/types';

export interface DemoState {
  walletAddress: string | null;
  habits: Habit[];
  claimHistory: ClaimHistory[];
}

const STORAGE_KEY = 'streakbit-demo-state-v1';
const DEMO_EVENT = 'streakbit-demo-state:updated';

function daysAgo(value: number) {
  const date = new Date();
  date.setDate(date.getDate() - value);
  return date.toISOString();
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function createInitialState(): DemoState {
  return {
    walletAddress: DEMO_ADDRESSES[0],
    habits: [
      {
        id: 'habit-deep-work',
        owner: DEMO_ADDRESSES[0],
        name: 'Deep Work Sprint',
        description: 'Protect a 90-minute block every morning for focused building.',
        frequency: 7,
        stakeAmount: 18,
        createdAt: daysAgo(36),
        active: true,
        streak: 11,
        bestStreak: 18,
        totalCheckIns: 29,
        lastCheckIn: daysAgo(0),
        checkInHistory: [
          daysAgo(0),
          daysAgo(1),
          daysAgo(2),
          daysAgo(3),
          daysAgo(4),
          daysAgo(5),
          daysAgo(7),
          daysAgo(8),
          daysAgo(9),
          daysAgo(10),
          daysAgo(11),
          daysAgo(12),
        ],
        claimableReward: 7.2,
        totalClaimed: 22.4,
        lastClaimAt: daysAgo(6),
      },
      {
        id: 'habit-walk',
        owner: DEMO_ADDRESSES[0],
        name: 'Sunrise Walk',
        description: 'Twenty-five minutes outside before checking any screens.',
        frequency: 5,
        stakeAmount: 8,
        createdAt: daysAgo(24),
        active: true,
        streak: 6,
        bestStreak: 9,
        totalCheckIns: 17,
        lastCheckIn: daysAgo(1),
        checkInHistory: [
          daysAgo(1),
          daysAgo(2),
          daysAgo(3),
          daysAgo(4),
          daysAgo(6),
          daysAgo(7),
          daysAgo(8),
        ],
        claimableReward: 2.4,
        totalClaimed: 8.5,
        lastClaimAt: daysAgo(9),
      },
      {
        id: 'habit-journal',
        owner: DEMO_ADDRESSES[0],
        name: 'Night Journal',
        description: 'Capture three wins and one lesson before the day ends.',
        frequency: 7,
        stakeAmount: 6,
        createdAt: daysAgo(18),
        active: false,
        streak: 0,
        bestStreak: 12,
        totalCheckIns: 12,
        lastCheckIn: daysAgo(5),
        checkInHistory: [
          daysAgo(5),
          daysAgo(6),
          daysAgo(7),
          daysAgo(8),
          daysAgo(9),
          daysAgo(10),
        ],
        claimableReward: 0,
        totalClaimed: 4.2,
        lastClaimAt: daysAgo(12),
      },
    ],
    claimHistory: [
      {
        id: 'claim-deep-work-1',
        habitId: 'habit-deep-work',
        habitName: 'Deep Work Sprint',
        amount: 5.6,
        claimedAt: daysAgo(6),
      },
      {
        id: 'claim-journal-1',
        habitId: 'habit-journal',
        habitName: 'Night Journal',
        amount: 4.2,
        claimedAt: daysAgo(12),
      },
    ],
  };
}

function getWindow() {
  return typeof window === 'undefined' ? null : window;
}

export function readDemoState(): DemoState {
  const browserWindow = getWindow();
  const initialState = createInitialState();

  if (!browserWindow) {
    return initialState;
  }

  const raw = browserWindow.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    browserWindow.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
  }

  try {
    const parsed = JSON.parse(raw) as DemoState;
    return {
      walletAddress: parsed.walletAddress ?? initialState.walletAddress,
      habits: parsed.habits ?? initialState.habits,
      claimHistory: parsed.claimHistory ?? initialState.claimHistory,
    };
  } catch {
    browserWindow.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
  }
}

export function writeDemoState(nextState: DemoState) {
  const browserWindow = getWindow();

  if (!browserWindow) {
    return;
  }

  browserWindow.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  browserWindow.dispatchEvent(new Event(DEMO_EVENT));
}

export function subscribeToDemoState(listener: (state: DemoState) => void) {
  const browserWindow = getWindow();

  if (!browserWindow) {
    return () => undefined;
  }

  const sync = () => listener(readDemoState());

  browserWindow.addEventListener(DEMO_EVENT, sync);
  browserWindow.addEventListener('storage', sync);

  return () => {
    browserWindow.removeEventListener(DEMO_EVENT, sync);
    browserWindow.removeEventListener('storage', sync);
  };
}

export function connectDemoWallet(address = DEMO_ADDRESSES[0]) {
  const currentState = readDemoState();
  writeDemoState({
    ...currentState,
    walletAddress: address,
  });

  return address;
}

export function disconnectDemoWallet() {
  const currentState = readDemoState();
  writeDemoState({
    ...currentState,
    walletAddress: null,
  });
}

export function createHabit(input: HabitFormData) {
  const currentState = readDemoState();
  const now = new Date().toISOString();
  const habit: Habit = {
    id: `habit-${Date.now()}`,
    owner: currentState.walletAddress ?? DEMO_ADDRESSES[0],
    name: input.name.trim(),
    description: input.description.trim(),
    frequency: input.frequency,
    stakeAmount: input.stakeAmount,
    createdAt: now,
    active: true,
    streak: 0,
    bestStreak: 0,
    totalCheckIns: 0,
    lastCheckIn: null,
    checkInHistory: [],
    claimableReward: 0,
    totalClaimed: 0,
    lastClaimAt: null,
  };

  writeDemoState({
    ...currentState,
    habits: [habit, ...currentState.habits],
  });

  return habit;
}

export function deactivateHabit(habitId: string) {
  const currentState = readDemoState();

  writeDemoState({
    ...currentState,
    habits: currentState.habits.map((habit) =>
      habit.id === habitId ? { ...habit, active: false } : habit
    ),
  });
}

export function canCheckIn(habit: Habit) {
  return habit.active && !isSameDay(habit.lastCheckIn, new Date());
}

export function checkInHabit(habitId: string) {
  const currentState = readDemoState();
  const targetHabit = currentState.habits.find((habit) => habit.id === habitId);

  if (!targetHabit) {
    throw new Error('Habit not found.');
  }

  if (!targetHabit.active) {
    throw new Error('Inactive habits cannot be checked in.');
  }

  if (!canCheckIn(targetHabit)) {
    throw new Error('You already checked in today.');
  }

  const now = new Date();
  const lastCheckIn = targetHabit.lastCheckIn ? new Date(targetHabit.lastCheckIn) : null;
  const gap = lastCheckIn ? diffInDays(now, lastCheckIn) : 1;
  const continuedStreak = lastCheckIn && gap <= 1;
  const nextStreak = continuedStreak ? targetHabit.streak + 1 : 1;
  const rewardDelta = Number(
    (targetHabit.stakeAmount * 0.16 * getStreakMultiplier(nextStreak)).toFixed(2)
  );

  const updatedHabit = {
    ...targetHabit,
    streak: nextStreak,
    bestStreak: Math.max(targetHabit.bestStreak, nextStreak),
    totalCheckIns: targetHabit.totalCheckIns + 1,
    lastCheckIn: now.toISOString(),
    checkInHistory: [now.toISOString(), ...targetHabit.checkInHistory].slice(0, 90),
    claimableReward: Number((targetHabit.claimableReward + rewardDelta).toFixed(2)),
  };

  writeDemoState({
    ...currentState,
    habits: currentState.habits.map((habit) =>
      habit.id === habitId ? updatedHabit : habit
    ),
  });

  return updatedHabit;
}

export function claimReward(habitId: string) {
  const currentState = readDemoState();
  const targetHabit = currentState.habits.find((habit) => habit.id === habitId);

  if (!targetHabit) {
    throw new Error('Habit not found.');
  }

  if (targetHabit.claimableReward <= 0) {
    throw new Error('No reward is available yet.');
  }

  const now = new Date().toISOString();
  const claimedAmount = targetHabit.claimableReward;
  const updatedHabit: Habit = {
    ...targetHabit,
    claimableReward: 0,
    totalClaimed: Number((targetHabit.totalClaimed + claimedAmount).toFixed(2)),
    lastClaimAt: now,
  };
  const claimEvent: ClaimHistory = {
    id: `claim-${habitId}-${Date.now()}`,
    habitId,
    habitName: targetHabit.name,
    amount: claimedAmount,
    claimedAt: now,
  };

  writeDemoState({
    ...currentState,
    habits: currentState.habits.map((habit) =>
      habit.id === habitId ? updatedHabit : habit
    ),
    claimHistory: [claimEvent, ...currentState.claimHistory],
  });

  return claimEvent;
}

export function getRewards(habits: Habit[]): Reward[] {
  return habits.map((habit) => ({
    habitId: habit.id,
    habitName: habit.name,
    claimable: habit.claimableReward,
    multiplier: getStreakMultiplier(habit.streak),
    streak: habit.streak,
    totalClaimed: habit.totalClaimed,
    lastClaimAt: habit.lastClaimAt,
  }));
}

function scoreForPeriod(baseScore: number, period: LeaderboardPeriod) {
  if (period === '7d') {
    return Math.round(baseScore * 0.44);
  }

  if (period === '30d') {
    return Math.round(baseScore * 0.78);
  }

  return baseScore;
}

function buildStaticLeaderboard(period: LeaderboardPeriod): UserScore[] {
  const presets = [
    {
      address: DEMO_ADDRESSES[1],
      score: 932,
      streak: 41,
      habitsCompleted: 5,
      rewardsClaimed: 81.3,
    },
    {
      address: DEMO_ADDRESSES[2],
      score: 816,
      streak: 28,
      habitsCompleted: 4,
      rewardsClaimed: 59.8,
    },
    {
      address: 'ST3N5GQY4M9JQW3DV7B0Y5ZVX4J2N6Y0J1KEEPUP',
      score: 744,
      streak: 24,
      habitsCompleted: 3,
      rewardsClaimed: 48.2,
    },
  ];

  return presets.map((entry) => ({
    ...entry,
    score: scoreForPeriod(entry.score, period),
  }));
}

export function getLeaderboard(
  state: DemoState,
  period: LeaderboardPeriod = LEADERBOARD_PERIODS[2].value
): LeaderEntry[] {
  const staticEntries = buildStaticLeaderboard(period);
  const userAddress = state.walletAddress;
  const activeHabits = state.habits.filter((habit) => habit.active);

  const participants = [...staticEntries];

  if (userAddress) {
    const userScore: UserScore = {
      address: userAddress,
      score: scoreForPeriod(
        activeHabits.reduce((total, habit) => total + getHabitScore(habit), 0),
        period
      ),
      streak: activeHabits.reduce((highest, habit) => Math.max(highest, habit.streak), 0),
      habitsCompleted: activeHabits.length,
      rewardsClaimed: Number(
        activeHabits.reduce((total, habit) => total + habit.totalClaimed, 0).toFixed(2)
      ),
    };

    participants.push(userScore);
  }

  return participants
    .sort((left, right) => right.score - left.score)
    .map((entry, index) => ({
      rank: index + 1,
      ...entry,
      highlight: entry.address === userAddress,
    }));
}

export function getWalletBalance(address: string | null) {
  if (!address) {
    return null;
  }

  const state = readDemoState();
  const totalStake = state.habits.reduce((total, habit) => total + habit.stakeAmount, 0);

  return Number((82.15 - totalStake * 0.21).toFixed(2));
}

export function resetDemoState() {
  writeDemoState(clone(createInitialState()));
}

export function getDemoSummary(state: DemoState) {
  const activeHabits = state.habits.filter((habit) => habit.active);
  const totalClaimable = activeHabits.reduce(
    (total, habit) => total + habit.claimableReward,
    0
  );

  return {
    activeHabits: activeHabits.length,
    totalCheckIns: state.habits.reduce((total, habit) => total + habit.totalCheckIns, 0),
    totalClaimable: Number(totalClaimable.toFixed(2)),
    bestStreak: activeHabits.reduce((best, habit) => Math.max(best, habit.bestStreak), 0),
    lastRewardClaim:
      state.claimHistory.length > 0 ? formatDate(state.claimHistory[0].claimedAt) : 'No claims yet',
  };
}
