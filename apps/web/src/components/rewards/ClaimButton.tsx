'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';

interface ClaimButtonProps {
  habitId: string;
  disabled: boolean;
  onClaim: (habitId: string) => Promise<void>;
}

export function ClaimButton({ habitId, disabled, onClaim }: ClaimButtonProps) {
  const [loading, setLoading] = useState(false);
  const [burst, setBurst] = useState(false);
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

  async function handleClaim() {
    setLoading(true);

    try {
      await onClaim(habitId);
      setBurst(true);
      window.setTimeout(() => setBurst(false), 700);
      setToastState({
        open: true,
        tone: 'success',
        title: 'Reward claimed',
        description: 'Your streak reward moved into claim history.',
      });
    } catch (issue) {
      const message = issue instanceof Error ? issue.message : 'Reward claim failed.';
      setToastState({
        open: true,
        tone: 'error',
        title: 'Claim failed',
        description: message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="relative inline-flex">
        {burst ? (
          <span className="pointer-events-none absolute inset-0 rounded-full bg-accent/35 blur-xl animate-pulse-ring" />
        ) : null}
        <Button disabled={disabled} loading={loading} onClick={handleClaim} variant="secondary">
          {disabled ? 'No reward yet' : 'Claim reward'}
        </Button>
      </div>
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
