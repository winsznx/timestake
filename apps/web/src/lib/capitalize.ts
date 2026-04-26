/**
 * Capitalizes the first letter of a string.
 * @param str - The input string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
