'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { useStreak } from '@/hooks/useStreak';

interface CheckInButtonProps {
  habitId: string;
}

export function CheckInButton({ habitId }: CheckInButtonProps) {
  const [toastState, setToastState] = useState<{
    open: boolean;
    title: string;
    description: string;
    tone: 'success' | 'error' | 'info';
  }>({
    open: false,
    title: '',
    description: '',
    tone: 'info',
  });
  const { canCheckInToday, checkIn, loading } = useStreak(habitId);

  async function handleCheckIn() {
    try {
      const habit = await checkIn();
      setToastState({
        open: true,
        tone: 'success',
        title: 'Check-in locked in',
        description: `Your streak is now ${habit.streak} day${habit.streak === 1 ? '' : 's'}.`,
      });
    } catch (issue) {
      const message = issue instanceof Error ? issue.message : 'Unable to submit check-in.';
      setToastState({
        open: true,
        tone: 'error',
        title: 'Check-in blocked',
        description: message,
      });
    }
  }

  return (
    <>
      <Button
        className="w-full sm:w-auto"
        disabled={!canCheckInToday}
        loading={loading}
        onClick={handleCheckIn}
        size="lg"
      >
        {canCheckInToday ? 'Check In Today' : 'Checked In'}
      </Button>
      <Toast
        description={toastState.description}
        onClose={() => setToastState((current) => ({ ...current, open: false }))}
        open={toastState.open}
        title={toastState.title}
        tone={toastState.tone}
      />
    </>
  );
}
