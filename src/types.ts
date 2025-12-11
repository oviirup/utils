export type Dictionary<T = unknown> = Record<string, T>;

type ClassValue = string | number | bigint | null | boolean | undefined;
type ClassArray = ClassValue[];
type ClassRecord = Record<string, any>;

export type ClassNameValue = ClassValue | ClassArray | ClassRecord;

export type AbbreviationSymbols = Dictionary<number> | string[];
export type AbbreviateOptions = {
  symbols?: AbbreviationSymbols;
  precision?: number;
};
