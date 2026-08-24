import { Awaitable } from "@/types";
import { isNumber } from "./assertions";

/**
 * Delays execution for a specified number of milliseconds
 * @param delay The delay in milliseconds (must be a positive finite number)
 * @returns A promise that resolves after the specified delay
 * @category promise
 */
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
 * @param fn The function to retry
 * @param retries The number of retries
 * @param delay The delay between retries (optional)
 * @returns The result of the function
 * @category promise
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number,
  delay: number = 0,
): Promise<T> {
  let attempts = 0;
  let pervError: unknown;
  while (attempts <= retries) {
    try {
      return await fn();
    } catch (error) {
      pervError = error;
      if (attempts >= retries) break;
      if (delay > 0) await sleep(delay);
      attempts++;
    }
  }
  throw pervError;
}

/**
 * Wraps a promise or function and returns a result object with discriminated union
 * @param input A promise or function that returns a promise/value
 * @returns A tuple [value, error] where value is the result or null, and error is undefined or the error
 * @category promise
 */
export async function tryCatch<T, E = Error>(input: Promise<T> | (() => Awaitable<T>)) {
  try {
    const value = typeof input === "function" ? await input() : await input;
    return [value, undefined] as const;
  } catch (error) {
    return [null, error as E] as const;
  }
}

/**
 * Rejects a promise if it doesn't resolve within the specified timeout
 * @param fn A promise or value to wait for
 * @param ms Timeout duration in milliseconds
 * @returns The result of the promise if it resolves within the timeout
 * @category promise
 */
export function timeout<T>(fn: Awaitable<T>, ms: number): Promise<T> {
  const rejection = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Operation timed out")), ms);
  });
  return Promise.race([fn, rejection]);
}
