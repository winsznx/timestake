export function omit<T extends object, K extends keyof T>(
  source: T,
  keys: readonly K[]
): Omit<T, K> {
  const blocked = new Set<keyof T>(keys);
  const result = {} as Omit<T, K>;
  for (const key of Object.keys(source) as Array<keyof T>) {
    if (!blocked.has(key)) {
      (result as Record<keyof T, unknown>)[key] = source[key];
    }
  }
  return result;
}
