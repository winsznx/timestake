'use client';

import { useHabits } from '@/hooks/useHabits';
import { useContractCall } from '@/hooks/useContractCall';
import { canCheckIn, checkInHabit } from '@/lib/demo-store';
import { getStreakMultiplier, getStreakProgress } from '@/lib/utils';

export function useStreak(habitId?: string) {
  const { habits } = useHabits();
  const { execute, loading, error, clearError } = useContractCall();

  const habit = habitId ? habits.find((entry) => entry.id === habitId) : undefined;
  const streak = habit?.streak ?? 0;

  async function checkIn() {
    if (!habitId) {
      throw new Error('No habit selected.');
    }

    return execute(() => checkInHabit(habitId));
  }

  return {
    habit,
    streak,
    multiplier: getStreakMultiplier(streak),
    progress: getStreakProgress(streak),
    canCheckInToday: habit ? canCheckIn(habit) : false,
    checkIn,
    loading,
    error,
    clearError,
  };
}
