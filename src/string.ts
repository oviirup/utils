/**
 * Replace backslash to slash
 * @category String
 */
export function slash(str: string): string {
  return str.replace(/\\/g, "/");
}

const DEFAULT_TRUNCATE_LENGTH = 80;
/**
 * Truncates a string to the specified length, adding "..." if it was longer.
 * @param text The string to truncate
 * @param length Maximum allowed length before truncation
 * @category String
 */
export function truncate(
  input: string,
  length = DEFAULT_TRUNCATE_LENGTH,
): string {
  if (!input) return input;
  const text = input.trim();
  const maxLength = Math.max(3, length);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Capitalizes the first letter of a string
 * @param input The string to capitalize
 * @category String
 */
export function capitalize(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
