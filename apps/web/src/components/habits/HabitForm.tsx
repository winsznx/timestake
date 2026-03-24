'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { buildCreateHabitCall } from '@/lib/contracts';
import { useHabits } from '@/hooks/useHabits';

export function HabitForm() {
  const router = useRouter();
  const { createHabit } = useHabits();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('7');
  const [stakeAmount, setStakeAmount] = useState('10');
  const [submitting, setSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const contractPreview = buildCreateHabitCall(
    name || 'habit-name',
    description || 'habit-description',
    Number(frequency || 0),
    Number(stakeAmount || 0)
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await createHabit({
        name,
        description,
        frequency: Number(frequency),
        stakeAmount: Number(stakeAmount),
      });
      setToastOpen(true);
      router.push('/habits');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Card title="Create a new habit" description="Define the ritual, the cadence, and the stake you want to attach.">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Habit name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Morning deep work"
            required
            value={name}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text" htmlFor="description">
              Description
            </label>
            <textarea
              className="min-h-[140px] w-full rounded-xl border border-border/60 bg-slate-950/40 px-4 py-3 text-text placeholder:text-muted focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/30"
              id="description"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What does a successful check-in actually look like?"
              required
              value={description}
            />
            <p className="text-sm text-muted">
              Keep the rule observable so check-ins stay honest.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Weekly frequency"
              max="7"
              min="1"
              onChange={(event) => setFrequency(event.target.value)}
              required
              type="number"
              value={frequency}
            />
            <Input
              label="Stake amount (STX)"
              min="1"
              onChange={(event) => setStakeAmount(event.target.value)}
              required
              type="number"
              value={stakeAmount}
            />
          </div>
          <div className="panel-outline rounded-[24px] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Contract preview</p>
            <pre className="mt-3 overflow-x-auto text-sm text-text">
              {JSON.stringify(contractPreview, null, 2)}
            </pre>
          </div>
          <Button fullWidth loading={submitting} size="lg" type="submit">
            Create habit
          </Button>
        </form>
      </Card>
      <Toast
        description="Your habit was added to the demo store and is ready for the habits list."
        onClose={() => setToastOpen(false)}
        open={toastOpen}
        title="Habit created"
        tone="success"
      />
    </>
  );
}
