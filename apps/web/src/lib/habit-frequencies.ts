export const HABIT_FREQUENCIES = [
  { value: 1, label: 'Daily' },
  { value: 3, label: '3x per week' },
  { value: 5, label: '5x per week' },
  { value: 7, label: '7x per week' },
] as const;

export type HabitFrequencyValue = (typeof HABIT_FREQUENCIES)[number]['value'];
