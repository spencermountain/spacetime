---
name: spacetime
description: Write application code using the spacetime JavaScript library to parse, manipulate, compare, and format dates across timezones. Use when a task uses spacetime or asks for date-time operations with it, including timezone conversion, calendar arithmetic, date ranges, and DST handling.
---

# Date-time operations with spacetime

Use the public `spacetime` API to solve the application's date-time task. The
examples below assume `import spacetime from 'spacetime'`. CommonJS consumers
can use `const spacetime = require('spacetime')`.

First distinguish an **instant** (an epoch or timestamp with an offset) from a
**wall-clock time in a region** (such as 9am in New York). Choose the intended
timezone explicitly, then parse, transform, and format. Capture returned
objects: arithmetic and most setters are immutable.

## Construct and read dates

```js
import spacetime from 'spacetime'

const s = spacetime('2026-01-15T09:30:00', 'America/New_York')
s.year() // 2026
s.month() // 0: January
s.date() // 15: day of month
s.day() // 4: Thursday (Sunday = 0)
s.hour() // 9
s.minute() // 30
s.time() // '9:30am'
s.epoch // milliseconds since Unix epoch; a property, not a method
s.tz // 'america/new_york'; a property, not a method

spacetime([2026, 0, 15], 'UTC') // January 15; array months are zero-based
spacetime({ year: 2026, month: 'january', date: 15 }, 'UTC')
spacetime(1768435200000, 'UTC') // epoch in MILLISECONDS
spacetime.fromUnixSeconds(1768435200, 'UTC') // epoch in SECONDS
spacetime(new Date(1768435200000), 'UTC') // preserves the instant
spacetime.now('America/New_York')
spacetime.today('America/New_York') // start of today in that zone
spacetime.tomorrow('America/New_York') // start of tomorrow
```

The constructor takes `(input, timezone?, options?)`; `fromUnixSeconds` takes
`(seconds, timezone?, options?)`. `now`, `today`, `tomorrow`, and `yesterday`
take `(timezone?, options?)`. An omitted timezone defaults to the host zone.

Prefer complete ISO-style inputs over ambiguous strings. For day/month parsing,
use `spacetime('12/01/2026', 'UTC', { dmy: true })` (January 12).
Partial dates can use today's year or other defaults. `null`, `undefined`, and
`''` mean **now**, so reject missing application input before constructing a date.

Use `s.isValid()` before arithmetic or comparisons, but do not treat it as strict
input validation: setters and parsing can clamp or normalize values. Validate
the original fields separately when the application must reject out-of-range
dates. Unknown explicit timezone names can throw even with `silent: true`.

## Convert an instant or reinterpret a local time

```js
const meeting = spacetime('2026-01-15T09:30:00', 'America/New_York')
const london = meeting.goto('Europe/London')
london.time() // '2:30pm'
london.epoch === meeting.epoch // true: same meeting, another local clock

const rescheduled = meeting.timezone('Europe/London')
rescheduled.time() // '9:30am'
rescheduled.epoch === meeting.epoch // false: 9:30am in London instead

const instant = spacetime('2026-01-15T14:30:00Z').goto('America/New_York')
instant.time() // '9:30am'
instant.offset() // -300: minutes east of UTC
instant.timezone().current.offset // -5: hours east of UTC
```

Use regional IANA names such as `America/New_York`, not ambiguous abbreviations
such as `EST`. An explicit numeric offset identifies an instant and a fixed
offset, not a region's DST rules; parse it first, then `goto()` the desired zone.
Conversion can change the calendar date. Do not manually apply an extra offset.
Preserve fractional offsets. `Etc/GMT` names reverse signs: `Etc/GMT+5` is UTC−05.

## Set values, add time, and find boundaries

```js
const original = spacetime('2024-01-31T09:30:00', 'UTC')
const february = original.add(1, 'month')
february.format('iso-short') // '2024-02-29': clamped to month end
original.format('iso-short') // '2024-01-31': unchanged

let deadline = original.add(2, 'weeks').subtract(1, 'day')
deadline = deadline.hour(17).minute(0).second(0).millisecond(0)
deadline.time() // '5:00pm'
deadline.startOf('day').time() // '12:00am'
deadline.endOf('day').iso() // '2024-02-13T23:59:59.999Z'
deadline.next('month').format('iso-short') // '2024-03-01'
```

Common setters include `year`, `month`, `date`, `hour`, `minute`, `second`, and
`time`; omitting the argument reads the value. `date()` means day of month;
`day()` means weekday. Setting an hour preserves minutes and smaller fields.
Month arithmetic clamps and need not reverse back to the original date.

Use `add(1, 'day')` for a calendar day and `add(24, 'hours')` for 24 elapsed
hours. Calendar days and weeks preserve local clock time where it exists;
they may span fewer or more hours across DST. Do not implement local days as
fixed millisecond increments. Arithmetic accepts singular and plural units.

For week boundaries, configure the start when constructing:
`spacetime(input, zone, { weekStart: 0 }).startOf('week')` uses Sunday;
the default is Monday. This option does not redefine `week()` numbering.

For a weekday on or after a date, use `s.day('monday', true)`. Equality is allowed;
for a strictly later Monday use `s.add(1, 'day').day('monday', true)`.

## Compare dates and iterate ranges

```js
const start = spacetime('2024-01-01', 'UTC')
const end = spacetime('2024-01-04', 'UTC')
start.isBefore(end) // true
start.isEqual(end) // false: exact instant comparison
start.isSame(end, 'month') // true: calendar comparison
start.diff(end, 'days') // 3; positive when the argument is later
end.diff(start, 'days') // -3
start.isBetween(start, end) // false: exclusive endpoints
start.isBetween(start, end, true) // true: inclusive endpoints
start.since(end).rounded // 'in 3 days'
end.fromNow().rounded // relative to the current instant

start.every('day', end).map(s => s.format('iso-short'))
// ['2024-01-01', '2024-01-02', '2024-01-03']
```

Construct valid Spacetime objects for both sides of comparisons. `isSame(other,
unit)` converts the other date into the receiver's timezone; pass `false` as its
third argument to compare their separate local calendar fields instead.
`diff(other, unit)` returns an integer total. `diff(other)` returns totals for
each unit, not duration components to sum. Use epoch subtraction when you need
an exact elapsed millisecond count.

`every(unit, end, stepCount = 1)` returns an array and excludes the end. A start
on a unit boundary can be included; an unaligned start advances to the next
boundary. Spans shorter than the requested step can return an empty array even
if they contain a boundary. Use positive integer steps and bound large ranges.
For application intervals such as one local day, prefer `[start, nextStart)`:
`!value.isBefore(start) && value.isBefore(start.add(1, 'day'))`.

## Format and serialize

```js
const s = spacetime('2026-01-15T09:30:00', 'America/New_York')
s.format('iso-short') // '2026-01-15'
s.format('iso-utc') // '2026-01-15T14:30:00.000Z'
s.iso() // '2026-01-15T09:30:00.000-05:00'
s.isoFull() // '2026-01-15T09:30:00.000-05:00[America/New_York]'
s.format('{day-short}, {month} {date-ordinal}, {time}')
// 'Thu, January 15th, 9:30am'
s.format('{iso-year}-{iso-month}-{date-pad}') // '2026-01-15'
s.unixFmt('yyyy-MM-dd HH:mm') // '2026-01-15 09:30'
s.toNativeDate().getTime() === s.epoch // true
```

`format()` accepts named tokens and brace templates, not Moment-style patterns.
`unixFmt()` is a separate Unicode-style token system; do not assume every
Unicode token works. Use `iso-month` for one-based padded months in `format()`;
`month-pad` is zero-based. `{time}` already includes AM/PM.

Store an epoch or UTC ISO timestamp for an instant. Store the regional timezone
separately when it matters for later local display or calendar arithmetic.
Native Date preserves the instant but not the IANA zone; its local getters use
the host timezone. Avoid the internal `.d` property and deprecated `toLocalDate()`.

## DST and shared-state limits

- Missing or repeated local times are ambiguous. To choose an occurrence,
  provide a known epoch or ISO timestamp with an explicit offset, then `goto()`
  the region. Do not assume parsing rejects a nonexistent time or invent an
  earlier/later/reject disambiguation option.
- Spacetime uses bundled annual timezone rules, not a complete historical
  database. Boundaries may be wrong for other years; host timezone updates do
  not update the bundle. If exact historical or future civil-time rules are
  required, explain this limitation before relying on the result.
- `epochSeconds(value)` and `weekStart(value)` mutate the receiver. Prefer
  `fromUnixSeconds()` and constructor options when a new object is needed.
  `i18n()`, `extend()`/`plugin()`, and timezone data affect shared state; a clone
  does not isolate them. Avoid changing shared configuration per request.

When behavior depends on DST, month ends, or ambiguous input, verify the
relevant example against the application's installed version. Do not infer
support for an API or formatting token solely from Moment, Day.js, or Luxon.
