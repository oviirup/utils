# @oviirup/utils

[![npm version](https://img.shields.io/npm/v/@oviirup/utils.svg)](https://www.npmjs.com/package/@oviirup/utils)
[![CI](https://github.com/oviirup/utils/actions/workflows/ci.yaml/badge.svg)](https://github.com/oviirup/utils/actions/workflows/ci.yaml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6.svg)](https://www.typescriptlang.org/)

A small, dependency-free collection of TypeScript utilities for everyday JavaScript and TypeScript work.

## Features

- Typed helpers for arrays, objects, numbers, strings, promises, and runtime checks
- Tree-shakeable ESM with subpath exports
- Zero runtime dependencies
- Tested in CI

## Installation

```bash
pnpm install @oviirup/utils
```

Requires a modern runtime with ESM support. `nanoid` uses the Web Crypto API (`crypto.getRandomValues`).

## Usage

Import from the package root or from a specific module:

```ts
import { isString, nanoid } from "@oviirup/utils";
import { unique, chunk } from "@oviirup/utils/array";
import { sleep, tryCatch } from "@oviirup/utils/promise";

if (isString(value)) {
  console.log(value.toUpperCase());
}

const id = nanoid();
const groups = chunk([1, 2, 3, 4, 5], 2);
```

Root imports re-export assertions and `nanoid` as named bindings. Array, number, object, promise, and string helpers are also available as namespaces:

```ts
import { array, string } from "@oviirup/utils";

array.unique([1, 1, 2]);
string.toKebabCase("Hello World");
```

## API

### Assertions

Runtime type checks and a predicate helper. Available from `@oviirup/utils` and `@oviirup/utils/assertions`.

- **`isDefined`** — Non-null and non-undefined
- **`isString`**, **`isNumber`**, **`isInteger`**, **`isFloat`** — Primitive number and string checks
- **`isArray`**, **`isEmptyArray`** — Array checks
- **`isObject`**, **`isEmptyObject`** — Plain object checks
- **`isEmpty`** — `null`, `undefined`, empty string, empty array, or empty object
- **`isFunction`**, **`isRegex`**, **`isTruthy`** — Function, `RegExp`, and truthiness
- **`isBrowser`** — `typeof window !== "undefined"`
- **`not(fn)`** — Negates an assertion function

```ts
import { isDefined, isString, not } from "@oviirup/utils";

const isNotString = not(isString);

if (isDefined(user)) {
  // user is NonNullable
}
```

### Array

`@oviirup/utils/array`

- **`toArray(value)`** — Wraps a non-array value in an array
- **`unique(array, equals?)`** — Unique items, with an optional equality matcher
- **`at(array, index)`** — Item at index; negative indexes count from the end
- **`first(array)`**, **`last(array)`** — First or last item
- **`range(stop)`** / **`range(start, stop, step?)`** — Numeric range
- **`toFiltered(array, predicate)`** — Filter into a cloned array
- **`move(array, from, to)`** — Move an item in place
- **`chunk(array, size)`** — Split into arrays of `size`

```ts
import { range, unique } from "@oviirup/utils/array";

unique([1, 1, 2]); // [1, 2]
range(1, 5); // [1, 2, 3, 4]
```

### Number

`@oviirup/utils/number`

- **`inRange(value, min, max)`** — Inclusive range check
- **`clamp(value, min, max)`** — Clamp between `min` and `max`
- **`abbreviate(value, precision? | options?)`** — Compact form (`1000` → `"1.0K"`)

### Object

`@oviirup/utils/object`

- **`keyInObject(object, key)`** — Whether `key` exists on the object
- **`pick(object, keys)`** — Keep the given keys
- **`omit(object, keys)`** — Drop the given keys

`keys` may be a single key or an array of keys.

### Promise

`@oviirup/utils/promise`

- **`sleep(ms)`** — Resolve after `ms` milliseconds
- **`retry(fn, retries, delay?)`** — Retry an async function
- **`tryCatch(input)`** — `[value, error]` tuple; `error` is `undefined` on success
- **`timeout(value, ms | { ms, error? })`** — Reject if the work does not finish in time

```ts
import { tryCatch, timeout } from "@oviirup/utils/promise";

const [data, error] = await tryCatch(fetch("/api"));
await timeout(doWork(), { ms: 5_000, error: "Timed out" });
```

### String

`@oviirup/utils/string`

- **`slash(str)`** — Convert backslashes to forward slashes
- **`truncate(str, length?)`** — Truncate and append `...` (default length `80`)
- **`words(str)`** — Unicode-aware word split
- **`join(str, delimiter)`** — Join words with a delimiter
- **`toCamelCase`**, **`toPascalCase`**, **`toSnakeCase`**, **`toKebabCase`**, **`toSentenceCase`**, **`toTitleCase`** — Case conversion
- **`slugify(str)`** — Transform any string to dash-separated, URL-safe slug

### nanoid

`@oviirup/utils` or `@oviirup/utils/nanoid`

Cryptographically strong IDs via the Web Crypto API (adapted from [nanoid](https://github.com/ai/nanoid)).

```ts
import { nanoid } from "@oviirup/utils";

nanoid(); // 21 characters by default
nanoid(10);
nanoid(10, "abcdef");
```

### picocolors

`@oviirup/utils/picocolors`

Terminal color helpers (adapted from [picocolors](https://github.com/alexeyraspopov/picocolors)). Not re-exported from the package root.

```ts
import { pc } from "@oviirup/utils/picocolors";

console.log(pc.green("ok"), pc.bold("done"));
```

Respects `NO_COLOR`, `FORCE_COLOR`, `--no-color`, and `--color`.

### Types

Shared TypeScript types are exported from `@oviirup/utils/types`.

## Development

```bash
bun install
bun run test
bun run lint
bun run typecheck
bun run build
```

See [CHANGELOG.md](./CHANGELOG.md) for release notes.

## License

[MIT](./LICENSE) © [Avirup Ghosh](https://github.com/oviirup)
