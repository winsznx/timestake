import { Card } from '@/components/ui/Card';
import { HabitCard } from '@/components/habits/HabitCard';
import type { Habit } from '@/types';

interface HabitListProps {
  habits: Habit[];
  emptyTitle: string;
  emptyDescription: string;
  showCheckIn?: boolean;
}

export function HabitList({
  habits,
  emptyTitle,
  emptyDescription,
  showCheckIn = false,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <Card title={emptyTitle} description={emptyDescription}>
        <p className="text-sm text-muted">
          Start with one habit that feels easy to repeat tomorrow.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {habits.map((habit) => (
        <HabitCard habit={habit} key={habit.id} showCheckIn={showCheckIn} />
      ))}
    </div>
  );
}
