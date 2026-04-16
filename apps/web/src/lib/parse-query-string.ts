export function parseQueryString(search: string): Record<string, string> {
  const trimmed = search.startsWith('?') ? search.slice(1) : search;
  const params = new URLSearchParams(trimmed);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
