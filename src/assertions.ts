import { isArray, isEmptyArray } from "./array";
import { isEmptyObject, isObject } from "./object";

/** Check if the given value is empty, null, undefined, or a string with no content */
export function isEmpty(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  if (typeof val === "string" && val.trim() === "") return true;
  if (isArray(val)) return isEmptyArray(val);
  if (isObject(val)) return isEmptyObject(val);
  return false;
}

type Func<T> = (...args: any[]) => T;
/** Check if the given object is a function */
export function isFunction<T = unknown>(val: unknown): val is Func<T> {
  return typeof val === "function";
}

/** Check if the given value is a string */
export function isString(val: unknown): val is string {
  return typeof val === "string";
}

/** Check if the given value is a number */
export function isNumber(val: unknown): val is number {
  return typeof val === "number";
}

/** Check if the given value is truthy */
export function isTruthy(val: unknown): boolean {
  return !!val;
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
