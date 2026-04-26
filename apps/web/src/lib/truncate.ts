/**
 * Truncates a string to a specified length and appends an ellipsis.
 * @param text - The string to truncate
 * @param length - Maximum length before truncation
 */
export function truncate(text: string, length: number = 50): string {
  if (!text || text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}
