# spacetime — LLM usage guide

> spacetime is a zero-dependency JavaScript library for working with dates across
> timezones. It does timezone math (DST, leap years, hemispheres) **without** the
> `Intl` API, and exposes a Moment-like, **immutable** API.


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

const out = s.format('{day-short} {month} {date-ord}, {time}') // 'Thur March 1st, 1:20pm'
```

## Full Docs
* [inputs](./inputs.md) - date/time parsing and supported formats
* [getters](./getters.md) - getting specific datetime information
* [setters](./setters.md) - modifying the datetime
* [formatting](./formatting.md) - customizable output formats
* [timezones](./timezones.md) - setting and changing iana zones
* [comparisons](./comparisons.md) - utility functions on datetimes
* [plugins](./plugins.md) - extending or changing spacetime behaviour

---

## Important concepts

1. **spacetime is IMMUTABLE.** Every method that "changes" a date returns a *new*
   `Spacetime` object and leaves the original untouched. You must capture the
   return value. `s.add(1, 'day')` alone does nothing observable — write
   `s = s.add(1, 'day')`.

2. **Months are 0-based; dates (day-of-month) are 1-based.** `s.month()` returns
   `0` for January … `11` for December. `s.date()` returns `1`–`31`. This mirrors
   the JavaScript `Date` spec. Array input follows the same rule:
   `spacetime([2017, 5, 2])` is **June 2nd 2017**, not May.

3. **Epochs are in MILLISECONDS.** `spacetime(1489520157124)` is a millisecond
   epoch. If you only have seconds, use `spacetime.fromUnixSeconds(seconds)` or
   multiply by 1000. Passing a seconds-epoch silently lands you in January 1970.

4. **Timezone is the 2nd argument to (almost) everything.** Constructor and all
   static helpers take `(input, timezone?, options?)`. If you omit the timezone,
   the *local machine/browser* timezone is used. Use IANA names
   (`'America/New_York'`, `'Europe/Paris'`).

5. **Getters and setters are the same method name.** Calling with no argument
   *reads*; calling with an argument *returns a new object* with that value set.
   `s.hour()` → `14`; `s.hour(9)` → a new Spacetime at 9am. This dual signature
   exists for: `millisecond, second, minute, hour, hour12, date, month, year,
   day, dayName, dayOfYear, time, week, quarter, season, hourFloat, ampm,
   dayTime, monthName, decade, century, millennium, epochSeconds, json, iso,
   isoFull, timezone`.

---


## Common LLM mistakes — checklist

- ❌ `s.add(1, 'day'); use(s)` → ✅ `s = s.add(1, 'day'); use(s)` (immutable).
- ❌ Treating `s.month()` as 1-based or as a name → it is `0`–`11`. Use
  `s.monthName()` for the string, `s.format('month')` for 'April'.
- ❌ `spacetime([2017, 5, 2])` "= May 2" → it is **June 2** (month is 0-based).
- ❌ Passing a seconds epoch to `spacetime(...)` → use
  `spacetime.fromUnixSeconds(...)`.
- ❌ Putting the timezone first → timezone is the **2nd** argument.
- ❌ Using `goto()` when you meant `timezone()` (or vice versa) — see the
  goto-vs-timezone note above.
- ❌ Expecting `s.epoch()` / `s.tz()` as methods → `epoch` and `tz` are
  **properties** (no parentheses). `epochSeconds()` *is* a method.
- ❌ Arrow functions in `spacetime.extend({...})` → use `function () {}` so
  `this` is the Spacetime instance.
