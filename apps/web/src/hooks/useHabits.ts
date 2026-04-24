'use client';

import { useMemo } from 'react';
import type { Habit } from '@/types';

/**
 * Hook for derived habit logic and filtering.
 */
export function useHabits(habits: Habit[]) {
  const activeHabits = useMemo(() => 
    habits.filter(h => !h.isArchived), 
  [habits]);

  const totalStreak = useMemo(() => 
    habits.reduce((acc, h) => acc + h.streak, 0), 
  [habits]);

  const habitsByDifficulty = useMemo(() => {
    return {
      easy: activeHabits.filter(h => h.difficulty === 'easy'),
      medium: activeHabits.filter(h => h.difficulty === 'medium'),
      hard: activeHabits.filter(h => h.difficulty === 'hard'),
    };
  }, [activeHabits]);

  return {
    activeHabits,
    totalStreak,
    habitsByDifficulty,
  };
}
