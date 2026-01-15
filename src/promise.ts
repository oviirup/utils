import { isNumber } from "./assertions";

export function sleep(delay: number): Promise<void> {
  if (!isNumber(delay)) {
    throw new TypeError("sleep: delay must be a number");
  } else if (!Number.isFinite(delay) || delay < 0) {
    throw new RangeError("sleep: delay must be a positive finite number");
  }
  if (delay === 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Retries a function until it succeeds or the maximum number of retries is reached
 * @param func The function to retry
 * @param retries The number of retries
 * @param delay The delay between retries (optional)
 * @returns The result of the function
 */
export async function retry<T>(
  func: () => Promise<T>,
  retries: number,
  delay: number = 0,
): Promise<T> {
  try {
    return await func();
  } catch (error) {
    if (retries > 0) {
      await sleep(delay);
      return retry(func, retries - 1, delay);
    }
    throw error;
  }
}
