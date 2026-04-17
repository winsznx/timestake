export const STREAK_TIERS = [
  { threshold: 30, multiplier: 5, label: 'Legendary' },
  { threshold: 14, multiplier: 3, label: 'Ascendant' },
  { threshold: 7, multiplier: 2, label: 'Rising' },
  { threshold: 0, multiplier: 1, label: 'Starter' },
] as const;

export type StreakTier = (typeof STREAK_TIERS)[number];
