type Comparable = number | string | Date;

export function sortBy<T>(
  values: readonly T[],
  key: (value: T) => Comparable,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  const factor = direction === 'asc' ? 1 : -1;
  return [...values].sort((left, right) => {
    const leftKey = key(left);
    const rightKey = key(right);
    if (leftKey < rightKey) {
      return -1 * factor;
    }
    if (leftKey > rightKey) {
      return 1 * factor;
    }
    return 0;
  });
}
