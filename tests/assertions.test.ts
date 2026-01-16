import { describe, expect, it, test } from "bun:test";
import * as ast from "../src/assertions";

describe("isNumber", () => {
  it("should return true for valid numbers", () => {
    expect(ast.isNumber(0)).toBe(true);
    expect(ast.isNumber(42)).toBe(true);
    expect(ast.isNumber(-42)).toBe(true);
    expect(ast.isNumber(3.14)).toBe(true);
    expect(ast.isNumber(Infinity)).toBe(true);
    expect(ast.isNumber(-Infinity)).toBe(true);
  });

  it("should return false for NaN", () => {
    expect(ast.isNumber(NaN)).toBe(false);
    expect(ast.isNumber(Number.NaN)).toBe(false);
  });

  it("should return false for non-number types", () => {
    expect(ast.isNumber("123")).toBe(false);
    expect(ast.isNumber("")).toBe(false);
    expect(ast.isNumber(null)).toBe(false);
    expect(ast.isNumber(undefined)).toBe(false);
    expect(ast.isNumber(true)).toBe(false);
    expect(ast.isNumber(false)).toBe(false);
    expect(ast.isNumber({})).toBe(false);
    expect(ast.isNumber([])).toBe(false);
  });
});

describe("isInteger", () => {
  it("should return true for integers", () => {
    expect(ast.isInteger(0)).toBe(true);
    expect(ast.isInteger(42)).toBe(true);
    expect(ast.isInteger(-42)).toBe(true);
    expect(ast.isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(ast.isInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
  });

  it("should return false for floats", () => {
    expect(ast.isInteger(3.14)).toBe(false);
    expect(ast.isInteger(-3.14)).toBe(false);
    expect(ast.isInteger(0.1)).toBe(false);
    expect(ast.isInteger(42.0)).toBe(true); // 42.0 is still an integer
  });

  it("should return false for NaN", () => {
    expect(ast.isInteger(NaN)).toBe(false);
  });

  it("should return false for non-number types", () => {
    expect(ast.isInteger("42")).toBe(false);
    expect(ast.isInteger(null)).toBe(false);
    expect(ast.isInteger(undefined)).toBe(false);
  });
});

describe("isFloat", () => {
  it("should return true for floating point numbers", () => {
    expect(ast.isFloat(3.14)).toBe(true);
    expect(ast.isFloat(-3.14)).toBe(true);
    expect(ast.isFloat(0.1)).toBe(true);
    expect(ast.isFloat(0.0001)).toBe(true);
  });

  it("should return false for integers", () => {
    expect(ast.isFloat(0)).toBe(false);
    expect(ast.isFloat(42)).toBe(false);
    expect(ast.isFloat(-42)).toBe(false);
    expect(ast.isFloat(42.0)).toBe(false); // 42.0 is treated as integer
  });

  it("should return false for NaN", () => {
    expect(ast.isFloat(NaN)).toBe(false);
  });

  it("should return false for non-number types", () => {
    expect(ast.isFloat("3.14")).toBe(false);
    expect(ast.isFloat(null)).toBe(false);
    expect(ast.isFloat(undefined)).toBe(false);
  });
});

describe("isEmptyArray", () => {
  it("should return true for empty arrays", () => {
    expect(ast.isEmptyArray([])).toBe(true);
    expect(ast.isEmptyArray(new Array(0))).toBe(true);
  });

  it("should return false for non-empty arrays", () => {
    const arrays: any[] = [[1], [1, 2, 3], [null], [undefined], [""]];
    for (const arr of arrays) expect(ast.isEmptyArray(arr)).toBe(false);
  });

  it("should return false for non-array values", () => {
    const values: any[] = [{}, "", null, undefined, 0];
    for (const val of values) expect(ast.isEmptyArray(val)).toBe(false);
  });
});

describe("isObject", () => {
  it("should return true for plain objects", () => {
    expect(ast.isObject({})).toBe(true);
    expect(ast.isObject({ a: 1 })).toBe(true);
    expect(ast.isObject({ a: 1, b: 2 })).toBe(true);
    expect(ast.isObject(Object.create(null))).toBe(true);
  });

  it("should return false for null", () => {
    expect(ast.isObject(null)).toBe(false);
  });

  it("should return false for arrays", () => {
    expect(ast.isObject([])).toBe(false);
    expect(ast.isObject([1, 2, 3])).toBe(false);
  });

  it("should return false for primitives", () => {
    expect(ast.isObject("string")).toBe(false);
    expect(ast.isObject(42)).toBe(false);
    expect(ast.isObject(true)).toBe(false);
    expect(ast.isObject(false)).toBe(false);
    expect(ast.isObject(undefined)).toBe(false);
  });

  it("should return true for class instances", () => {
    class TestClass {}
    expect(ast.isObject(new TestClass())).toBe(true);
    expect(ast.isObject(new Date())).toBe(true);
    expect(ast.isObject(new RegExp("test"))).toBe(true);
  });
});

describe("isEmptyObject", () => {
  it("should return true for empty objects", () => {
    expect(ast.isEmptyObject({})).toBe(true);
    expect(ast.isEmptyObject(Object.create(null))).toBe(true);
  });

  it("should return false for objects with properties", () => {
    expect(ast.isEmptyObject({ a: 1 })).toBe(false);
    expect(ast.isEmptyObject({ a: 1, b: 2 })).toBe(false);
    expect(ast.isEmptyObject({ a: undefined })).toBe(false);
    expect(ast.isEmptyObject({ a: null })).toBe(false);
    expect(ast.isEmptyObject({ a: "" })).toBe(false);
  });

  it("should handle objects with only symbol keys", () => {
    const sym = Symbol("test");
    const obj = { [sym]: "value" };
    expect(ast.isEmptyObject(obj)).toBe(true);
  });
});

describe("isEmpty", () => {
  it("should return true for null and undefined", () => {
    expect(ast.isEmpty(null)).toBe(true);
    expect(ast.isEmpty(undefined)).toBe(true);
  });

  it("should return true for empty strings", () => {
    expect(ast.isEmpty("")).toBe(true);
    expect(ast.isEmpty("   ")).toBe(true);
    expect(ast.isEmpty("\t\n")).toBe(true);
  });

  it("should return false for non-empty strings", () => {
    expect(ast.isEmpty("hello")).toBe(false);
    expect(ast.isEmpty("  hello  ")).toBe(false);
    expect(ast.isEmpty("0")).toBe(false);
  });

  it("should return true for empty arrays", () => {
    expect(ast.isEmpty([])).toBe(true);
  });

  it("should return false for non-empty arrays", () => {
    expect(ast.isEmpty([1])).toBe(false);
    expect(ast.isEmpty([null])).toBe(false);
    expect(ast.isEmpty([undefined])).toBe(false);
    expect(ast.isEmpty([""])).toBe(false);
  });

  it("should return true for empty objects", () => {
    expect(ast.isEmpty({})).toBe(true);
  });

  it("should return false for non-empty objects", () => {
    expect(ast.isEmpty({ a: 1 })).toBe(false);
    expect(ast.isEmpty({ a: null })).toBe(false);
    expect(ast.isEmpty({ a: undefined })).toBe(false);
  });

  it("should return false for numbers", () => {
    expect(ast.isEmpty(0)).toBe(false);
    expect(ast.isEmpty(42)).toBe(false);
    expect(ast.isEmpty(-42)).toBe(false);
    expect(ast.isEmpty(NaN)).toBe(false);
  });

  it("should return false for booleans", () => {
    expect(ast.isEmpty(true)).toBe(false);
    expect(ast.isEmpty(false)).toBe(false);
  });

  it("should return false for functions", () => {
    expect(ast.isEmpty(() => {})).toBe(false);
    expect(ast.isEmpty(function () {})).toBe(false);
  });
});

describe("not", () => {
  describe("with type guard functions", () => {
    it("should negate ast.isFunction", () => {
      const mixed = [1, "hello", () => {}, true, null];
      const nonFunctions = mixed.filter(ast.not(ast.isFunction));
      expect(nonFunctions).toEqual([1, "hello", true, null]);
      expect(nonFunctions.every((el) => typeof el !== "function")).toBe(true);
    });

    it("should negate ast.isString", () => {
      const mixed = [1, "hello", 2, "world", true];
      const nonStrings = mixed.filter(ast.not(ast.isString));
      expect(nonStrings).toEqual([1, 2, true]);
      expect(nonStrings.every((el) => typeof el !== "string")).toBe(true);
    });

    it("should negate ast.isNumber", () => {
      const mixed = [1, "hello", 2, true, null];
      const nonNumbers = mixed.filter(ast.not(ast.isNumber));
      expect(nonNumbers).toEqual(["hello", true, null]);
      expect(nonNumbers.every((el) => typeof el !== "number")).toBe(true);
    });

    it("should negate ast.isArray", () => {
      const mixed = [1, [2, 3], "hello", { a: 1 }];
      const nonArrays = mixed.filter(ast.not(ast.isArray));
      expect(nonArrays).toEqual([1, "hello", { a: 1 }]);
      expect(nonArrays.every((el) => !Array.isArray(el))).toBe(true);
    });
  });

  describe("with boolean predicates", () => {
    it("should negate ast.isEmpty", () => {
      const values = ["", "hello", null, undefined, "world", []];
      const nonEmpty = values.filter(ast.not(ast.isEmpty));
      expect(nonEmpty).toEqual(["hello", "world"]);
    });

    it("should negate ast.isTruthy", () => {
      const values = [0, 1, "", "hello", null, undefined, false, true];
      const falsy = values.filter(ast.not(ast.isTruthy));
      expect(falsy).toEqual([0, "", null, undefined, false]);
    });
  });

  describe("edge cases", () => {
    it("should handle null and undefined", () => {
      const values = [null, undefined, "hello", 1];
      const nonNullish = values.filter(ast.not((val) => val == null));
      expect(nonNullish).toEqual(["hello", 1]);
    });

    it("should work with empty arrays", () => {
      const empty: unknown[] = [];
      const result = empty.filter(ast.not(ast.isString));
      expect(result).toEqual([]);
    });

    it("should work with mixed types", () => {
      // biome-ignore format: test
      const mixed = [1, "hello", true, false, null, undefined, {}, [], ()=>{}];
      const nonStrings = mixed.filter(ast.not(ast.isString));
      expect(nonStrings.length).toBe(8);
      expect(nonStrings.every((el) => typeof el !== "string")).toBe(true);
    });
  });

  test("functional composition with filter", () => {
    const data = [1, 2, "hello", "world", 3, () => {}, true];
    const numbers = data
      .filter(ast.not(ast.isString))
      .filter(ast.not(ast.isFunction));
    expect(numbers).toEqual([1, 2, 3, true]);
  });
});
