import { describe, expect, it, test } from "bun:test";
import * as array from "../src/array";

describe("toArray", () => {
  it.each([
    { input: 1, expected: [1] },
    { input: [1, 2, 3], expected: [1, 2, 3] },
    { input: null, expected: [] },
    { input: undefined, expected: [] },
    { input: "foo", expected: ["foo"] },
    { input: ["foo"], expected: ["foo"] },
  ])("should convert $input to $expected", ({ input, expected }) => {
    // @ts-expect-error - this is a test
    expect(array.toArray(input)).toEqual(expected);
  });
});

test("range", () => {
  expect(array.range(0)).toEqual([]);
  expect(array.range(5)).toEqual([0, 1, 2, 3, 4]);
  expect(array.range(2, 5)).toEqual([2, 3, 4]);
  expect(array.range(2, 10, 2)).toEqual([2, 4, 6, 8]);
});
