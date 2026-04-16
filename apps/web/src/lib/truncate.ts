export function truncate(value: string, max: number, suffix = '…'): string {
  if (max <= 0 || value.length <= max) {
    return value;
  }
  if (suffix.length >= max) {
    return value.slice(0, max);
  }
  return `${value.slice(0, max - suffix.length).trimEnd()}${suffix}`;
}
