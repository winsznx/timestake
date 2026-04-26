/**
 * Clamps a number within the inclusive lower and upper bounds.
 * @param value - The number to clamp
 * @param min - The lower bound
 * @param max - The upper bound
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
