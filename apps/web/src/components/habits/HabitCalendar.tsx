import { Badge } from '@/components/ui/Badge';
import { getCalendarWindow, isSameDay } from '@/lib/utils';

interface HabitCalendarProps {
  history: string[];
}

export function HabitCalendar({ history }: HabitCalendarProps) {
  const dates = getCalendarWindow(35);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-text">Check-in calendar</h3>
        <Badge variant="muted">Last 5 weeks</Badge>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => {
          const checkedIn = history.some((entry) => isSameDay(entry, date));

          return (
            <div
              key={date.toISOString()}
              className={
                checkedIn
                  ? 'h-10 rounded-xl bg-gradient-to-br from-secondary via-primary to-accent'
                  : 'h-10 rounded-xl border border-border/50 bg-white/4'
              }
              title={date.toDateString()}
            />
          );
        })}
      </div>
    </div>
  );
}
