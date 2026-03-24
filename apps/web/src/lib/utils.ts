import type { Habit } from '@/types';

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function truncateAddress(address?: string | null, lead = 6, tail = 4) {
  if (!address) {
    return 'Not connected';
  }

  if (address.length <= lead + tail) {
    return address;
  }

  return `${address.slice(0, lead)}...${address.slice(-tail)}`;
}

export function formatDate(
  value?: string | null,
  options: Intl.DateTimeFormatOptions = {}
) {
  if (!value) {
    return 'No activity yet';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(value));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatStx(value: number) {
  return `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: value < 10 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value)} STX`;
}

export function formatFrequency(frequency: number) {
  return frequency === 1 ? 'Daily' : `${frequency}x per week`;
}

export function getStreakMultiplier(streak: number) {
  if (streak >= 30) {
    return 5;
  }

  if (streak >= 14) {
    return 3;
  }

  if (streak >= 7) {
    return 2;
  }

  return 1;
}

export function getStreakProgress(streak: number, target = 30) {
  return Math.min(100, Math.round((streak / target) * 100));
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function diffInDays(later: Date, earlier: Date) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.round(
    (startOfDay(later).getTime() - startOfDay(earlier).getTime()) / millisecondsPerDay
  );
}

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

export function getCalendarWindow(days = 35) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));
    return date;
  });
}

export function getHabitScore(habit: Habit) {
  return Math.round(
    habit.streak * 24 +
      habit.totalCheckIns * 8 +
      habit.totalClaimed * 6 +
      habit.stakeAmount * 4
  );
}
