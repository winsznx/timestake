'use client';

import { useEffect, useState } from 'react';

import {
  createHabit as createHabitRecord,
  deactivateHabit as deactivateHabitRecord,
  getDemoSummary,
  readDemoState,
  subscribeToDemoState,
} from '@/lib/demo-store';
import type { DemoState } from '@/lib/demo-store';
import type { HabitFormData } from '@/types';

export function useHabits() {
  const [state, setState] = useState<DemoState>(() => readDemoState());

  useEffect(() => subscribeToDemoState(setState), []);

  async function createHabit(input: HabitFormData) {
    return createHabitRecord(input);
  }

  async function deactivateHabit(habitId: string) {
    deactivateHabitRecord(habitId);
  }

  const activeHabits = state.habits.filter((habit) => habit.active);
  const inactiveHabits = state.habits.filter((habit) => !habit.active);

  return {
    habits: state.habits,
    activeHabits,
    inactiveHabits,
    summary: getDemoSummary(state),
    createHabit,
    deactivateHabit,
    getHabit: (habitId: string) => state.habits.find((habit) => habit.id === habitId),
  };
}
