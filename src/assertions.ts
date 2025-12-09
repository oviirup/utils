type Dict<T = unknown> = Record<string, T>;

/** Check if given value is a string */
export function isString(val: unknown): val is string {
  return typeof val === "string";
}

/** Check if given value is an array */
export function isArray<T = any>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/** Check if given array is empty */
export function isEmptyArray(value: any[]): boolean {
  return isArray(value) && value.length === 0;
}

/** Check if given value is an object */
export function isObject<T extends object = Dict>(val: unknown): val is T {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

/** Check if given object is empty */
export function isEmptyObject<T extends object = Dict>(val: T): boolean {
  return isObject(val) && Object.keys(val).length === 0;
}

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

/** Check if the given value is a regex */
export function isRegex(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/** Check if the given value is truthy */
export function isTruthy(val: unknown): boolean {
  return !!val;
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
