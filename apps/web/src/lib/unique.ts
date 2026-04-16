export function unique<T>(values: readonly T[]): T[] {
  return Array.from(new Set(values));
}

export function uniqueBy<T, K>(values: readonly T[], key: (value: T) => K): T[] {
  const seen = new Set<K>();
  const result: T[] = [];
  for (const value of values) {
    const marker = key(value);
    if (!seen.has(marker)) {
      seen.add(marker);
      result.push(value);
    }
  }
  return result;
}
