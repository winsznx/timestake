type QueryValue = string | number | boolean | null | undefined;

export function buildQueryString(params: Record<string, QueryValue | QueryValue[]>): string {
  const search = new URLSearchParams();
  for (const [key, raw] of Object.entries(params)) {
    if (raw === null || raw === undefined) {
      continue;
    }
    if (Array.isArray(raw)) {
      for (const entry of raw) {
        if (entry === null || entry === undefined) {
          continue;
        }
        search.append(key, String(entry));
      }
      continue;
    }
    search.append(key, String(raw));
  }
  const serialized = search.toString();
  return serialized ? `?${serialized}` : '';
}
