type Dict<T = unknown> = Record<string, T>;

/**
 * Checks if a given value is an object
 * @category Object
 */
export function isObject<T extends object = Dict>(val: unknown): val is T {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

/**
 * Checks if a given object is empty
 * @category Object
 */
export function isEmptyObject<T extends object = Dict>(val: T): boolean {
  return isObject(val) && Object.keys(val).length === 0;
}

/**
 * Checks if a given object has a specified key
 * @category Object
 */
export function keyInObject<T extends object = Dict>(
  val: T,
  key: keyof T | (string & {}),
): boolean {
  return isObject(val) && key in val;
}
