export type Dictionary<T = any> = Record<PropertyKey, T>;

export type Func<T = any> = (...args: any[]) => T;

export type Awaitable<T> = T | Promise<T>;

export type AbbreviationSymbols = Dictionary<number> | string[];
export type AbbreviateOptions = {
  symbols?: AbbreviationSymbols;
  precision?: number;
};

export type BasePredicate = (val: unknown) => boolean;
export type TypePredicate<T> = (val: unknown) => val is T;
export type Predicate<T> = BasePredicate | TypePredicate<T>;

export type Negate<T> =
  T extends TypePredicate<infer U>
    ? <V>(val: V) => val is Exclude<V, U>
    : T extends BasePredicate
      ? (val: unknown) => boolean
      : never;
