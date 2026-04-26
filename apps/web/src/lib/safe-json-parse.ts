/**
 * Safely parses a JSON string, returning a fallback value if parsing fails.
 * @param jsonString - The JSON string to parse
 * @param fallback - The value to return on error
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed !== null ? parsed : fallback;
  } catch {
    return fallback;
  }
}
