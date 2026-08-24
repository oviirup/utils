---
"@oviirup/utils": patch
---

- ✨ added `slugify`
  - 🔒 `nanoid` now uses the Web Crypto API instead of `node:crypto`
  - ♻️ streamlined assertion helpers (const exports, shared internals)
  - ♻️ `timeout` now takes a duration in milliseconds only
  - ♻️ minor refactoring and updated formatting
