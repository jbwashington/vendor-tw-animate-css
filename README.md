# vendor-tw-animate-css

A trimmed, pinned copy of [Wombosvideo/tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) (MIT), maintained by
[vendor-keeper](https://github.com/jbwashington/vendor-keeper) (private) for James Washington's apps. Apps
copy `src/` into `vendor/tw-animate-css/` instead of installing `tw-animate-css` from npm.

**Based on upstream `v1.4.0`** (`c20dc32e2`), reviewed through `v1.4.0`.
See `UPSTREAM.json` for the exact files tracked.

## What we took

`src/tw-animate.css`, the readable upstream **source** verbatim (not the minified `dist/` build the npm package ships), so upstream diffs are reviewable. Tailwind v4 compiles it in the consumer.

**One known difference from installing the npm package** (measured 2026-11-01 in mission-control): the npm
`dist/` build declares its `@property` rules at the top level, so Tailwind also emits initial values for the
17 `--tw-animation-*`/`--tw-enter-*`/`--tw-exit-*` variables in its fallback block for browsers *without*
`@property` (Safari < 16.4, Firefox < 128). The source nests them in `:root`, so that fallback is not
emitted. Every browser with `@property` support compiles to identical CSS. Accepted on purpose, so upstream
diffs can be read. If an app has to support those old browsers, ship upstream's `dist/` instead.

## Layout

| Path | What | Who writes it |
|---|---|---|
| `upstream/` | the tracked upstream files, byte-for-byte at `UPSTREAM.json` `tag` | `vk prepare` only, and `vk` refuses to ship if it doesn't match upstream |
| `src/` | what apps copy in | ports, reviewed by tests and the `vk` guard |
| `test/` | `src/` vs `upstream/` checks | |
| `CHANGES.md` | every upstream range applied, skipped or auto-advanced, and why | `vk` |

`diff -ru upstream src` is the complete list of our changes from upstream.

## How it's kept current

A daily scan checks for new upstream releases (only ones at least 48h old, the same cooldown as package
installs) and OSV advisories for our pinned version. If no tracked file changed, the review marker moves
forward on its own. Otherwise an agent reads the upstream diff, ports only what's worth taking (security and
correctness fixes, not features), runs the tests, and ships through a gate. The gate refuses new imports, network,
eval, process/env access, encoded blobs or big diffs, and requires every app that uses this copy to build.

## License

Upstream's license applies to everything here; see `src/LICENSE`.
