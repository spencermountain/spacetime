# Spacetime
> spacetime is a zero-dependency JavaScript library for working with dates across
> timezones. It does timezone math (DST, leap years, hemispheres) **without** the
> `Intl` API, and exposes a Moment-like, mostly **immutable** API (see exceptions below).


## Mental model
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

* [start here](./docs/README.md) - overview and task index
* [API](./docs/edge-cases.md) - full method list
* [inputs](./docs/inputs.md) - date/time parsing and supported formats
* [getters](./docs/getters.md) - getting specific datetime information
* [setters](./docs/setters.md) - modifying the datetime
* [formatting](./docs/formatting.md) - customizable output formats
* [timezones](./docs/timezones.md) - setting and changing iana zones
* [comparisons](./docs/comparisons.md) - utility functions on datetimes
* [edge cases](./docs/edge-cases.md) - DST, clamping, invalid inputs, and shared state
* [plugins](./docs/plugins.md) - extending or changing spacetime behaviour

---

## Important concepts

1. **Date arithmetic and most setters are immutable.** They return a *new*
   `Spacetime` object. Capture the return value. Exceptions: `epochSeconds(value)`
   and `weekStart(value)` mutate the instance; `i18n()` changes shared language data.
   `s.add(1, 'day')` alone does nothing observable — write
   `s = s.add(1, 'day')`.

2. **Months are 0-based; dates (day-of-month) are 1-based.** `s.month()` returns
   `0` for January … `11` for December. `s.date()` returns `1`–`31`. This mirrors
   the JavaScript `Date` spec. Array input follows the same rule:
   `spacetime([2017, 5, 2])` is **June 2nd 2017**, not May.

3. **Epochs are in MILLISECONDS.** `spacetime(1489520157124)` is a millisecond
   epoch. If you only have seconds, use `spacetime.fromUnixSeconds(seconds)` or
   multiply by 1000. Passing a seconds-epoch silently lands you in January 1970.

4. **Check each timezone signature.** The constructor and `fromUnixSeconds`
   take `(input, timezone?, options?)`; `now`, `today`, `tomorrow`, `yesterday`,
   `min`, and `max` take `(timezone?, options?)`. If you omit the timezone,
   the *local machine/browser* timezone is used. Use IANA names
   (`'America/New_York'`, `'Europe/Paris'`).

5. **Getters and setters are the same method name.** Calling with no argument
   *reads*; calling with an argument *returns a new object* with that value set.
   `s.hour()` → `14`; `s.hour(9)` → a new Spacetime at 9am. This dual signature
   exists for: `millisecond, second, minute, hour, hour12, date, month, year,
   day, dayName, dayOfYear, time, week, quarter, season, hourFloat, ampm,
   dayTime, monthName, decade, century, millennium, json, iso,
   isoFull, timezone`. `epochSeconds()` also has a setter, but it mutates the instance.

---

## Common mistakes
- setter immutability - `s.add(1, 'day')` does not modify `s`
- `s.month()` returns numeric `0`–`11`
  - Use `s.monthName()` for the string, `s.format('month')` for 'April'.
- array input - `spacetime([2017, 5, 2])` "= May 2" → it is **June 2** (month is 0-based).
- Passing a seconds epoch to `spacetime(...)` and getting date in ~1970.
  - use `spacetime.fromUnixSeconds(...)`.
- Putting the timezone first
  - constructor timezone is the **2nd** argument; `now(tz)` takes it first.
- Using `goto()` when you meant `timezone()` (or vice versa): `goto(tz)` keeps
  the instant; `timezone(tz)` keeps the wall-clock values. See [timezones](./docs/timezones.md).
- Expecting `s.epoch()` / `s.tz()` as methods → `epoch` and `tz` are
  **properties** (no parentheses). `epochSeconds()` *is* a method.

---

# Development

Unless given specific instruction:
- Do not edit README or add documentation
- do not install or change dependencies
- do not change existing tests
- do not make a commit or PR

Work on the current branch. The user may make simultaneous changes. Verify their work is not overwritten, or ask permission before destructive git changes.

### Code style
- Write maintainable javascript, using esmodules
- Write portable ES2022+ for browers and Node>=18
- Typescript and jsdoc are not required
- Add terse comments for maintainability
- Prefer functions assigned with const, over declarations
- Do not use unbracketed if statements
- Do not use complex, multi-line, or nested ternary operators
- Avoid while loops when possible
- Prefer older for loops, unless an await is required
- File-size is always important
- Defensive try/catch blocks are not required

### Project structure
- Prefer pnpm over npm
- eslint is always configured
- Prefer small maintainable files with one purpose
- Split out utility functions into a _lib.js file or ./_lib dir
- Prefer `export default` on files with one export
- Prefer clear exports at the bottom of files
- If workflow is sequential, prefix filenames with 01-, 02-, ...
- Prefer tape-formatted tests
- Use process.env for any secrets, tokens, or keys
