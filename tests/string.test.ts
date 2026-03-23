import { describe, expect, it } from "bun:test";
import * as string from "@/string";

describe("string", () => {
  describe("truncate", () => {
    it("should return the original string if its length is under specified length", () => {
      const text = "Short text";
      const length = 20;
      expect(string.truncate(text, length)).toBe(text);
    });
    it('should truncate the string and add "..." at end', () => {
      const text = "This is a very long text that needs truncation";
      const length = 20;
      expect(string.truncate(text, length)).toBe("This is a very lo...");
    });
    it("should handle strings with exact length equal to the specified length", () => {
      const text = "Exact length text";
      const length = text.length;
      expect(string.truncate(text, length)).toBe(text);
    });
    it("should handle empty strings", () => {
      expect(string.truncate("", 10)).toBe("");
    });
    it("should handle negative length by using the ellipsis length", () => {
      const text = "Negative length example";
      const length = -5;
      expect(string.truncate(text, length)).toBe("...");
    });
  });
  describe("slash", () => {
    it.each([
      { input: "\\123", expected: "/123" },
      { input: "\\\\", expected: "//" },
      { input: "\\h\\i", expected: "/h/i" },
      { input: "C:\\Users\\John", expected: "C:/Users/John" },
    ])("should convert $input to $expected", ({ input, expected }) => {
      expect(string.slash(input)).toEqual(expected);
    });
  });
  describe("toCamelCase", () => {
    it.each([
      ["foo bar", "fooBar"],
      ["hello world", "helloWorld"],
      ["foo-bar", "fooBar"],
      ["some-kebab-case", "someKebabCase"],
      ["foo_bar", "fooBar"],
      ["some_snake_case", "someSnakeCase"],
      ["foo", "foo"],
      ["FooBar", "fooBar"],
      ["foo_bar-baz", "fooBarBaz"],
      ["", ""],
    ])("%j to %j", (input, expected) => {
      expect(string.toCamelCase(input)).toBe(expected);
    });
  });
  describe("toPascalCase", () => {
    it.each([
      ["foo bar", "FooBar"],
      ["hello world", "HelloWorld"],
      ["foo-bar", "FooBar"],
      ["foo_bar", "FooBar"],
      ["foo", "Foo"],
      ["some-kebab-case", "SomeKebabCase"],
      ["", ""],
    ])("%j to %j", (input, expected) => {
      expect(string.toPascalCase(input)).toBe(expected);
    });
  });
  describe("toSnakeCase", () => {
    it.each([
      ["foo bar", "foo_bar"],
      ["hello world", "hello_world"],
      ["fooBar", "foo_bar"],
      ["someCamelCase", "some_camel_case"],
      ["FooBar", "foo_bar"],
      ["foo-bar", "foo_bar"],
      ["foo", "foo"],
      ["", ""],
    ])("%j to %j", (input, expected) => {
      expect(string.toSnakeCase(input)).toBe(expected);
    });
  });
  describe("toKebabCase", () => {
    it.each([
      ["foo bar", "foo-bar"],
      ["hello world", "hello-world"],
      ["fooBar", "foo-bar"],
      ["FooBar", "foo-bar"],
      ["foo_bar", "foo-bar"],
      ["some_snake_case", "some-snake-case"],
      ["foo", "foo"],
      ["", ""],
    ])("%j to %j", (input, expected) => {
      expect(string.toKebabCase(input)).toBe(expected);
    });
  });
  describe("toSentenceCase", () => {
    it.each([
      ["foo bar", "Foo bar"],
      ["hello world", "Hello world"],
      ["fooBar", "Foo bar"],
      ["foo_bar", "Foo bar"],
      ["foo", "Foo"],
      ["SOME UPPERCASE", "Some uppercase"],
    ])("%j to %j", (input, expected) => {
      expect(string.toSentenceCase(input)).toBe(expected);
    });
  });
  describe("toTitleCase", () => {
    it.each([
      ["foo bar", "Foo Bar"],
      ["hello world", "Hello World"],
      ["fooBar", "Foo Bar"],
      ["foo_bar", "Foo Bar"],
      ["foo-bar", "Foo Bar"],
      ["foo", "Foo"],
      ["", ""],
    ])("%j to %j", (input, expected) => {
      expect(string.toTitleCase(input)).toBe(expected);
    });
  });
});
