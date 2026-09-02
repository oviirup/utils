import { isEmptyArray, isInteger } from "./assertions";

/**
 * Converts a given value to represent itself in an array
 * @param value The value to convert to an array
 * @category Array
 */
export function toArray<T>(array: T | T[]): T[] {
  array = array ?? [];
  return Array.isArray(array) ? array : [array];
}

type Matcher<T> = (left: T, right: T) => boolean;

/**
 * Create an array with all unique items
 * @param value The array to make unique
 * @param equals The matcher function to use to determine if two items are the same
 * @category Array
 */
export function unique<T>(value: T[]): T[];
export function unique<T>(value: T[], equals: Matcher<T>): T[];
export function unique<T>(value: T[], equals?: Matcher<T>): T[] {
  if (typeof equals !== "function") {
    return Array.from(new Set(value));
  }
  return value.reduce<T[]>((acc, item) => {
    const index = acc.findIndex((e) => equals(e, item));
    if (index === -1) acc.push(item);
    return acc;
  }, []);
}

/**
 * Generate a range array of numbers.
 * @category Array
 */
export function range(stop: number): number[];
export function range(start: number, stop: number, step?: number): number[];
export function range(...args: [number] | [number, number, number?]): number[] {
  let start = 0;
  let stop: number;
  let step = 1;
  if (args.length === 1) {
    [stop] = args;
  } else {
    [start, stop, step = 1] = args;
  }
  const array: number[] = [];
  let current = start;
  while (current < stop) {
    array.push(current);
    current += step;
  }
  return array;
}

/**
 * Move an item in an array to a new position
 * @param array The array to move the item in
 * @param from The index of the item to move
 * @param to The index to move the item to
 * @category Array
 */
export function move<T>(array: T[], from: number, to: number): T[] {
  if (isEmptyArray(array)) return array;
  if (from === to) return array;
  // make sure to move within the bounds
  const len = array.length;
  if (from < 0 || from >= len) return array;
  to = Math.max(0, Math.min(to, len - 1));
  const item = array[from];
  array.splice(from, 1);
  array.splice(to, 0, item);
  return array;
}

/**
 * Chunk an array into smaller arrays of a given size
 * @param array The array to chunk
 * @param size The size of the chunks
 * @category Array
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (!isInteger(size) && size <= 0) {
    throw new Error("Size must be a positive integer");
  }
  const length = Math.ceil(array.length / size);
  const result: T[][] = [];
  for (let i = 0; i < length; i++) {
    const start = i * size;
    const end = start + size;
    result[i] = array.slice(start, end);
  }
  return result;
}
