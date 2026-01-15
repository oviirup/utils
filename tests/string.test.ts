import { describe, expect, it } from "bun:test";
import { slash, truncate } from "../src/string";

describe("truncate", () => {
  it("should return the original string if its length is less than or equal to the specified length", () => {
    const text = "Short text";
    const length = 20;
    expect(truncate(text, length)).toBe(text);
  });

  it('should truncate the string and add "..." if its length exceeds the specified length', () => {
    const text = "This is a very long text that needs truncation";
    const length = 20;
    expect(truncate(text, length)).toBe("This is a very lo...");
  });

  it("should handle strings with exact length equal to the specified length", () => {
    const text = "Exact length text";
    const length = text.length;
    expect(truncate(text, length)).toBe(text);
  });

  it("should handle empty strings", () => {
    expect(truncate("", 10)).toBe("");
  });

  it("should handle negative length by using the ellipsis length", () => {
    const text = "Negative length example";
    const length = -5;
    expect(truncate(text, length)).toBe("...");
  });
});

describe("slash", () => {
  it.each([
    { input: "\\123", expected: "/123" },
    { input: "\\\\", expected: "//" },
    { input: "\\h\\i", expected: "/h/i" },
    { input: "C:\\Users\\John", expected: "C:/Users/John" },
  ])("should convert $input to $expected", ({ input, expected }) => {
    expect(slash(input)).toEqual(expected);
  });
});
