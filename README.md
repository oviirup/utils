# @oviirup/utils ![](https://img.shields.io/badge/WIP-gold)

Collection of common JavaScript / TypeScript utilities by [@oviirup](https://github.com/oviirup).

- Type-safe utilities for everyday coding
- Zero dependencies
- Thoroughly tested

## Utilities

### assertions

Type guards and assertion functions for runtime type checking.

- **`isString`, `isNumber`, `isInteger`, `isFloat`**: Check value types
- **`isArray`, `isEmptyArray`**: Check array values
- **`isObject`, `isEmptyObject`**: Check object values
- **`isEmpty`**: Check if value is empty, null, undefined, or empty string
- **`isFunction`**: Check if value is a function
- **`isRegex`**: Check if value is a regex
- **`isTruthy`**: Check if value is truthy
- **`isBrowser`**: Check if running in browser environment
- **`not`**: Negate an assertion function

### array

Array manipulation utilities.

- **`toArray(value)`**: Converts a given value to an array
- **`unique(value, matcher?)`**: Create an array with all unique items
- **`at(array, index)`**,
- **`first`**, **`last`**: Get first, and last item of the array
- **`range(start, stop, steps)`**: Generate a range array of numbers
- **`toFiltered(array, predicate)`**: Filter an array, returning a new array with matching items
- **`move(array, fromIndex, toIndex)`**: Move an item in an array to a new position
- **`chunk(array, size)`**: Chunk an array into smaller arrays

### number

Number manipulation utilities.

- **`inRange(value, min, max)`**: Checks if a number is within a range
- **`clamp(value, min, max)`**: Clamps a number between a minimum and maximum value
- **`abbreviate(value, precision?)`**: Abbreviates a number (e.g., 1000 -> 1K)

### object

Object manipulation utilities.

- **`keyInObject(val, key)`**: Checks if a given object has a specified key
- **`pick(object, keys)`**: Picks a set of keys from an object
- **`omit(object, keys)`**: Omits a set of keys from an object

### promise

Promise manipulation utilities.

- **`sleep(delay)`**: Delays execution for a specified number of milliseconds
- **`retry(fn, retries, delay?)`**: Retries a function until it succeeds or max retries reached
- **`tryCatch(input)`**: Wraps a promise and returns a result tuple [value, error]
- **`timeout(fn, duration)`**: Rejects a promise if it doesn't resolve within timeout

### string

String manipulation utilities.

- **`slash`**: Replace backslash to slash
- **`truncate`**: Truncates a string to specified length
- **`toCamelCase`, `toSnakeCase`, `toKebabCase`, `toPascalCase`, `toSentenceCase`, `toTitleCase`**: Convert string case

### nanoid

Secure ID generation.

- **`nanoid(length?, alphabets?)`**: Generate a secure nanoid string
