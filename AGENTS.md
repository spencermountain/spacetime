# Spacetime

> spacetime is a zero-dependency JavaScript library for working with dates across
> timezones. It does timezone math (DST, leap years, hemispheres) **without** the
> `Intl` API, and exposes a Moment-like, mostly **immutable** API.

See the [usage guide](./docs/README.md) for behavior and edge cases,
and the [API reference](./docs/API.md) for public signatures.

## Quick example

```js
import spacetime from 'spacetime'

let s = spacetime('March 1 2012 3:22pm', 'America/New_York')
const time = s.time() //'3:22pm'
s = s.time('4:20pm') // modify the time
s = s.goto('America/Los_Angeles') // change the timezone
s.time() // '1:20pm'  (same instant, west-coast clock)

const dec31 = s.endOf('year')
const until = s.diff(dec31, 'days')

const out = s.format('{day-short} {month} {date-ordinal}, {time}') // 'Thu March 1st, 1:20pm'
```

## Docs

- [start here](./docs/README.md) - overview and task index
- [API](./docs/API.md) - full method list
- [inputs](./docs/inputs.md) - date/time parsing and supported formats
- [getters](./docs/getters.md) - getting specific datetime information
- [setters](./docs/setters.md) - modifying the datetime
- [formatting](./docs/formatting.md) - customizable output formats
- [timezones](./docs/timezones.md) - setting and changing iana zones
- [comparisons](./docs/comparisons.md) - utility functions on datetimes
- [plugins](./docs/plugins.md) - extending or changing spacetime behaviour

---

## Repository map

- `src/` — regular entry, instance implementation, parsers (`input/`), public
  methods (`methods/`), and timezone calculations (`timezone/`).
- `src/temporal/` — experimental Temporal-backed entry.
- `zonefile/` — timezone data and packing; `scripts/tz/` updates the data.
- `builds/` — generated distribution bundles; change source rather than bundles.
- `types/` — public declarations;
- `tests/` — Tape suites grouped by behavior; `plugins/` contains workspace packages.

## Checks and builds

Run checks relevant to the change. Use a runtime with `globalThis.Temporal` for
Temporal tests; CI uses Node 26 for tooling and tests the regular library on
Node 18, 20, 22, 24, and 26.

| Command                                                               | Purpose                                                                    |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `pnpm test`                                                           | Main test suite                                                            |
| `pnpm lint`                                                           | ESLint                                                                     |
| `pnpm test:types`                                                     | Regular-entry declaration checks                                           |
| `pnpm test:temporal`                                                  | Focused Temporal suite                                                     |
| `pnpm test:plugins`                                                   | Plugin suites                                                              |
| `pnpm build`                                                          | Pack timezone data, update `src/_version.js`, and build both entries       |
| `pnpm testb`                                                          | Main suite against existing bundles; build first to include source changes |

The [CI workflow](./.github/workflows/build-and-test.yml) also checks Temporal
bundles. `pnpm test:all` runs source, Temporal, types, plugins, and lint; it does
not build or include every CI check.

---

## Development

Unless given specific instruction:

- Do not edit README or add documentation
- do not install or change dependencies
- do not change existing tests
- do not make a commit or PR

Work on the current branch. The user may make simultaneous changes. Verify their work is not overwritten, or ask permission before destructive git changes.

## Code style

- Write maintainable JavaScript, using ES modules
- Write portable ES2022+ for browsers and Node >=18
- TypeScript and JSDoc are not required
- Add terse comments for maintainability
- Prefer functions assigned with const, over declarations
- Do not use unbracketed if statements
- Do not use complex, multi-line, or nested ternary operators
- Avoid while loops when possible
- Prefer older for loops, unless an await is required
- File-size is always important
- Defensive try/catch blocks are not required

## File conventions

- Prefer pnpm over npm
- Prefer small maintainable files with one purpose
- Split out utility functions into a _lib.js file or ./_lib dir
- Prefer `export default` on files with one export
- Prefer clear exports at the bottom of files
- If workflow is sequential, prefix filenames with 01-, 02-, ...
- Prefer tape-formatted tests
- Use process.env for any secrets, tokens, or keys
