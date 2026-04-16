export function chunk<T>(values: readonly T[], size: number): T[][] {
  if (size <= 0) {
    return [];
  }
  const result: T[][] = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}
