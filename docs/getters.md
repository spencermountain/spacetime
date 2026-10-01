# Reading values

Import `spacetime` as shown in the [usage guide](./README.md).

```js
const s = spacetime('2024-04-03T05:01:00', 'UTC')
s.epoch // milliseconds since 1970 (number; property, not method)
s.tz // 'utc' (property, not method)
s.year() // 2024
s.month() // 3 (0–11, not a name)
s.monthName() // 'april'
s.date() // 3 (1–31, day of month)
s.day() // 3 (0–6, Sunday=0)
s.dayName() // 'wednesday'
s.hour() // 5 (0–23)
s.hour12() // 5 (1–12; midnight and noon both return 12)
s.minute() // 1 (0–59)
s.second() // 0 (0–59)
s.millisecond() // 0 (0–999)
s.time() // '5:01am'
s.quarter() // 2 (1–4)
s.season() // 'spring' (depends on hemisphere)
s.week() // week number; see year-boundary caveat below
s.dayOfYear() // 94 (1–365, or 1–366 in leap years)
s.progress() // fractions for year, season, quarter, month, week, day, quarterHour, hour, minute
s.json() // date fields plus timezone and offset (offset in HOURS)
s.epochSeconds() // whole epoch seconds (method)
```

`week()` uses Monday-based week numbering with special year-boundary handling;
it is not simply the number of seven-day periods since January 1. Do not assume
changing `weekStart` changes this getter's numbering.

`progress(unit)` returns a fraction from 0 to 1 rounded to two decimal places;
without a unit, it returns an object. It measures elapsed time within the unit,
so a day's midpoint need not be noon when DST changes that day's length.

## Boolean and convenience checks

```js
const s = spacetime('2024-02-15T09:00:00', 'UTC')
s.isValid() // true
s.leapYear() // true
s.isAwake() // true (hours 8 through 22 inclusive)
s.isAsleep() // false (inverse of isAwake)
s.daysInMonth() // 29
spacetime('not a date', 'UTC').isValid() // false
```

`isValid()` checks the resulting date, not strict validation of the original
input. Some out-of-range values are clamped; see [edge cases](./edge-cases.md).

The internal `.d` property and deprecated `.toLocalDate()` should be avoided;
use `.toNativeDate()` for a native Date at the same instant.
