'use client';

import { HabitForm } from '@/components/habits/HabitForm';
import { PageShell } from '@/components/layout/PageShell';
import { Card } from '@/components/ui/Card';

export default function NewHabitPage() {
  return (
    <PageShell
      description="Good habits are specific, repeatable, and hard to fake. Start with a rule you can actually keep."
      eyebrow="Create"
      title="New habit"
    >
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <HabitForm />
        <Card
          description="A few rules of thumb that make the habit loop feel sharp instead of noisy."
          eyebrow="Guide"
          title="Design a habit worth repeating"
        >
          <div className="space-y-4 text-sm text-muted">
            <p>Make the action observable so a check-in means one concrete thing.</p>
            <p>Use a stake level that creates tension, but not enough to create avoidance.</p>
            <p>Choose a weekly cadence that matches real life instead of ideal life.</p>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
