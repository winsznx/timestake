export function isExpired(target: Date | string | number, now: Date = new Date()): boolean {
  const targetDate = target instanceof Date ? target : new Date(target);
  return targetDate.getTime() < now.getTime();
}
