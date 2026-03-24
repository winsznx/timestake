'use client';

import { useEffect, useState } from 'react';

import { getLeaderboard, readDemoState, subscribeToDemoState } from '@/lib/demo-store';
import type { DemoState } from '@/lib/demo-store';
import type { LeaderboardPeriod } from '@/types';

export function useLeaderboard(period: LeaderboardPeriod = 'all-time') {
  const [state, setState] = useState<DemoState>(() => readDemoState());

  useEffect(() => subscribeToDemoState(setState), []);

  return {
    entries: getLeaderboard(state, period),
  };
}
