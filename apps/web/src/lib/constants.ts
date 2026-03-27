import type { LeaderboardPeriod } from '@/types';

export const APP_NAME = 'StreakBit';
export const APP_TAGLINE = 'Build habits. Earn on-chain.';
export const APP_DESCRIPTION =
  'Daily habit tracking on Stacks with streak rewards, leaderboard momentum, and wallet-ready UX.';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/habits', label: 'Habits' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/rewards', label: 'Rewards' },
] as const;

export const SOCIAL_LINKS = [
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://x.com', label: 'X' },
  { href: 'https://docs.stacks.co', label: 'Stacks' },
] as const;

export const STREAK_MILESTONES = [7, 14, 30] as const;
export const HERO_STATS = [
  { label: 'Tracked habits', value: '12.4k' },
  { label: 'Daily check-ins', value: '201k' },
  { label: 'Active streakers', value: '4.8k' },
] as const;

export const LEADERBOARD_PERIODS: { label: string; value: LeaderboardPeriod }[] = [
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: 'All Time', value: 'all-time' },
];

export const DEMO_ADDRESSES = [
  'ST2J8EVYHP1N7Y2D0Q0R4M9A7V2S2W5N1D0R7STREAK',
  'ST38A9Q2K7YB3RF6S6ZX2E1P4J8M0Y1Q0V0N9HABIT',
  'ST1B0G2Y7FM0N1N4D0W9A3S7J4Q6R2K8P5W2FIRE',
] as const;

export const DEFAULT_NETWORK = process.env.NEXT_PUBLIC_NETWORK ?? 'mainnet';
export const DEFAULT_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? 'SP31DP8F8CF2GXSZBHHHK5J6Y061744E1TNFGYWYV';

export const RESPONSIVE_TEST_WIDTHS = [375, 768, 1440] as const;
