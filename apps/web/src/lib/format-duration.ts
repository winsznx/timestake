const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function formatDuration(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  if (total < MINUTE) {
    return `${total}s`;
  }
  if (total < HOUR) {
    return `${Math.round(total / MINUTE)}m`;
  }
  if (total < DAY) {
    return `${Math.round(total / HOUR)}h`;
  }
  return `${Math.round(total / DAY)}d`;
}
