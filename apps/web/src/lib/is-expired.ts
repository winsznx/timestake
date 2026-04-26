/**
 * Checks if a given target date is in the past.
 * @param targetDate - The date to check against the current time
 */
export function isExpired(targetDate: Date | string | number): boolean {
  const target = new Date(targetDate).getTime();
  if (isNaN(target)) return true;
  return Date.now() > target;
}
