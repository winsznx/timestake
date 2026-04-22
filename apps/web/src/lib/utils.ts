import type { Habit } from '@/types';

export { cn } from './cn';

/**
 * Truncates a Stacks address for display.
 * 
 * @param address - The address to truncate
 * @param lead - Number of characters to show at the start
 * @param tail - Number of characters to show at the end
 * @returns The truncated address or a fallback string
 */
export function truncateAddress(address?: string | null, lead = 6, tail = 4) {
  if (!address) {
    return 'Not connected';
  }

  if (address.length <= lead + tail) {
    return address;
  }

  return `${address.slice(0, lead)}...${address.slice(-tail)}`;
}

/**
 * Formats a date string or Date object into a human-readable format.
 * 
 * @param value - The date value to format
 * @param options - Intl.DateTimeFormat options
 * @returns A formatted date string
 */
export function formatDate(
  value?: string | null | Date,
  options: Intl.DateTimeFormatOptions = {}
) {
  if (!value) {
    return 'No activity yet';
  }

  const date = typeof value === 'string' ? new Date(value) : value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(date);
}

/**
 * Formats a number with thousands separators.
 */
export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Formats a number in compact notation (e.g., 1.2k).
 */
export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Formats an STX balance with proper units.
 */
export function formatStx(value: number) {
  return `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: value < 10 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value)} STX`;
}

/**
 * Formats a frequency count into a readable string.
 */
export function formatFrequency(frequency: number) {
  return frequency === 1 ? 'Daily' : `${frequency}x per week`;
}

/**
 * Calculates the multiplier for streak rewards based on length.
 */
export function getStreakMultiplier(streak: number) {
  if (streak >= 30) return 5;
  if (streak >= 14) return 3;
  if (streak >= 7) return 2;
  return 1;
}

/**
 * Calculates the percentage progress towards a streak target.
 */
export function getStreakProgress(streak: number, target = 30) {
  return Math.min(100, Math.round((streak / target) * 100));
}

/**
 * Returns a new Date object set to the beginning of the day.
 */
export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Calculates the number of full days between two dates.
 */
export function diffInDays(later: Date, earlier: Date) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.round(
    (startOfDay(later).getTime() - startOfDay(earlier).getTime()) / millisecondsPerDay
  );
}

/**
 * Checks if two date values represent the same calendar day.
 */
export function isSameDay(
  left?: string | Date | null,
  right?: string | Date | null
) {
  if (!left || !right) {
    return false;
  }

  const leftDate = typeof left === 'string' ? new Date(left) : left;
  const rightDate = typeof right === 'string' ? new Date(right) : right;

  return startOfDay(leftDate).getTime() === startOfDay(rightDate).getTime();
}

/**
 * Generates an array of Date objects for a calendar window.
 */
export function getCalendarWindow(days = 35) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));
    return date;
  });
}

/**
 * Calculates a weighted score for a habit based on various metrics.
 */
export function getHabitScore(habit: Habit) {
  return Math.round(
    habit.streak * 24 +
      habit.totalCheckIns * 8 +
      habit.totalClaimed * 6 +
      habit.stakeAmount * 4
  );
}
