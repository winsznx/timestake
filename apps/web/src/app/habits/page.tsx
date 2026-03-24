'use client';

import Link from 'next/link';
import { useState } from 'react';

import { HabitList } from '@/components/habits/HabitList';
import { PageShell } from '@/components/layout/PageShell';
import { Button, buttonStyles } from '@/components/ui/Button';
import { useHabits } from '@/hooks/useHabits';

type FilterValue = 'all' | 'active' | 'inactive';

export default function HabitsPage() {
  const { habits, activeHabits, inactiveHabits } = useHabits();
  const [filter, setFilter] = useState<FilterValue>('active');

  const filteredHabits =
    filter === 'all' ? habits : filter === 'active' ? activeHabits : inactiveHabits;

  return (
    <PageShell
      actions={
        <Link className={buttonStyles({ size: 'sm', variant: 'primary' })} href="/habits/new">
          Create new
        </Link>
      }
      description="Browse every habit in the system, switch between active and inactive rituals, and decide what deserves your attention next."
      eyebrow="Habit ledger"
      title="Habits"
    >
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'All', value: 'all' as const },
          { label: 'Active', value: 'active' as const },
          { label: 'Inactive', value: 'inactive' as const },
        ].map((option) => (
          <Button
            key={option.value}
            onClick={() => setFilter(option.value)}
            variant={filter === option.value ? 'primary' : 'ghost'}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <HabitList
        emptyDescription="Once you add or reactivate habits, they will land here."
        emptyTitle="No habits match that filter"
        habits={filteredHabits}
      />
    </PageShell>
  );
}
