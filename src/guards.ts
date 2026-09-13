import { Negate, Predicate } from "./types";

const _isArray = Array.isArray;
const _isNan = Number.isNaN;
const _isInt = Number.isInteger;
const _isNum = (val: unknown) => typeof val === "number";
const _isObject = (val: unknown) => !_isArray(val) && typeof val === "object";

export const isDefined = <T>(val: T): val is NonNullable<T> => val != null;
export const isString = (val: unknown) => typeof val === "string";
export const isFunction = (val: unknown) => typeof val === "function";
export const isArray = (val: unknown) => _isArray(val);
export const isObject = <T = Object>(val: unknown): val is T => val != null && _isObject(val);
export const isTruthy = (val: unknown) => !!val;
export const isNumber = (val: unknown): val is number => _isNum(val) && !_isNan(val);
export const isInteger = (val: unknown): val is number => isNumber(val) && _isInt(val);
export const isFloat = (val: unknown): val is number => isNumber(val) && !_isInt(val);
export const isBrowser = (): boolean => typeof window !== "undefined";
export const isRegex = (val: unknown) => val instanceof RegExp;

export const isEmptyArray = (val: unknown[]): boolean => {
  return _isArray(val) && val.length === 0;
};
export const isEmptyObject = (val: unknown): boolean => {
  return isObject(val) && Object.keys(val).length === 0;
};
export const isEmpty = (val: unknown): boolean => {
  if (val == null) return true;
  if (isString(val) && val.trim() === "") return true;
  if (isArray(val)) return isEmptyArray(val);
  if (isObject(val)) return isEmptyObject(val);
  return false;
};

export function not<T extends Predicate<unknown>>(fn: T): Negate<T> {
  return ((val: unknown) => !fn(val)) as Negate<T>;
}
