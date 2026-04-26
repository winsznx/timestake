/**
 * Adds a specific number of days to a given Date object.
 * Returns a new Date object without mutating the original.
 * @param date - The original date
 * @param days - Number of days to add
 */
export function addDays(date: Readonly<Date>, days: number): Date {
  if (isNaN(date.getTime())) throw new Error("Invalid date provided.");
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + days);
  return next;
}
