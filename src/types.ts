export type Dictionary<T = any> = Record<PropertyKey, T>;

export type Func<T = any> = (...args: any[]) => T;

export type Awaitable<T> = T | Promise<T>;

export type AbbreviationSymbols = Dictionary<number> | string[];
export type AbbreviateOptions = {
  symbols?: AbbreviationSymbols;
  precision?: number;
};

export type Predicate = ((val: unknown) => boolean) | ((val: unknown) => val is unknown);

export type NegatePredicate<T> = T extends (val: unknown) => val is infer U
  ? <V>(val: V) => val is Exclude<V, U>
  : T extends (val: unknown) => boolean
    ? (val: unknown) => boolean
    : never;
