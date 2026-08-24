/**
 * A recreation of the picocolors library
 *
 * @package picocolors
 * @version 1.1.1
 * @repository https://github.com/alexeyraspopov/picocolors
 */

type Process = NodeJS.Process;
type ProcessEnv = NodeJS.ProcessEnv;

const p: Process = typeof process !== "undefined" ? process : ({} as Process);
const argv: string[] = p.argv || [];
const env: ProcessEnv = p.env || {};

const isEnabled =
  !(!!env.NO_COLOR || argv.includes("--no-color")) &&
  (!!env.FORCE_COLOR ||
    argv.includes("--color") ||
    p.platform === "win32" ||
    ((p.stdout || {}).isTTY && env.TERM !== "dumb") ||
    !!env.CI);

/** Function wrapper to allow for both normal and tagged template usage */
function wrapTemplateString<T>(cb: (input: string) => T) {
  return function (input: TemplateStringsArray | string, ...args: unknown[]): T {
    if (Array.isArray(input) && "raw" in input) {
      let str = input[0];
      let i = 0;
      for (const arg of args) str += String(arg) + input[++i];
      return cb(str);
    }
    return cb(String(input));
  };
}

function formatter(open: string, close: string, replace: string = open) {
  const format = (input: string): string => {
    if (!isEnabled) return String(input);
    let string = String(input);
    let index = string.indexOf(close, open.length);
    return ~index
      ? open + replaceClose(string, close, replace, index) + close
      : open + string + close;
  };
  return wrapTemplateString(format);
}

function replaceClose(string: string, close: string, replace: string, index: number) {
  let result = "";
  let cursor = 0;
  do {
    result += string.substring(cursor, index) + replace;
    cursor = index + close.length;
    index = string.indexOf(close, cursor);
  } while (~index);
  return result + string.substring(cursor);
}

export const pc = {
  isEnabled,
  reset: formatter("\x1b[0m", "\x1b[0m"),
  bold: formatter("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m"),
  dim: formatter("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m"),
  italic: formatter("\x1b[3m", "\x1b[23m"),
  underline: formatter("\x1b[4m", "\x1b[24m"),
  red: formatter("\x1b[31m", "\x1b[39m"),
  green: formatter("\x1b[32m", "\x1b[39m"),
  yellow: formatter("\x1b[33m", "\x1b[39m"),
  blue: formatter("\x1b[34m", "\x1b[39m"),
  magenta: formatter("\x1b[35m", "\x1b[39m"),
  cyan: formatter("\x1b[36m", "\x1b[39m"),
  white: formatter("\x1b[37m", "\x1b[39m"),
  gray: formatter("\x1b[90m", "\x1b[39m"),
};
