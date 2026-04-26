'use client';

import { useState, forwardRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { useStreak } from '@/hooks/useStreak';

interface CheckInButtonProps {
  habitId: string;
}

export const CheckInButton = forwardRef<HTMLButtonElement, CheckInButtonProps>(({ habitId }, ref) => {
  const [toastState, setToastState] = useState<{
    open: boolean;
    title: string;
    description: string;
    tone: 'success' | 'error' | 'info';
  }>({ open: false, title: '', description: '', tone: 'info' });
  
  const { canCheckInToday, checkIn, loading } = useStreak(habitId);

  async function handleCheckIn() {
    try {
      await checkIn();
      setToastState({
        open: true,
        tone: 'success',
        title: 'Check-in submitted',
        description: 'Your transaction is broadcasting. Streak will refresh once it mines.',
      });
    } catch (issue) {
      const message = issue instanceof Error ? issue.message : 'Unable to submit check-in.';
      setToastState({ open: true, tone: 'error', title: 'Check-in blocked', description: message });
    }
  }

  return (
    <>
      <Button
        ref={ref}
        className="w-full sm:w-auto"
        disabled={!canCheckInToday}
        loading={loading}
        onClick={handleCheckIn}
        size="lg"
        aria-label={canCheckInToday ? "Check in today" : "Already checked in"}
      >
        {canCheckInToday ? 'Check In Today' : 'Checked In'}
      </Button>
      <Toast
        description={toastState.description}
        onClose={() => setToastState((current) => ({ ...current, open: false }))}
        open={toastState.open}
        title={toastState.title}
        type={toastState.tone}
      />
    </>
  );
});

CheckInButton.displayName = 'CheckInButton';
