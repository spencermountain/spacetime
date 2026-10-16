## Spacetime

> spacetime is a zero-dependency JavaScript library for working with dates across
> timezones. It does timezone math (DST, leap years, hemispheres) **without** the
> `Intl` API, and exposes a Moment-like, mostly **immutable** API.

```js
import spacetime from 'spacetime'

const original = spacetime('2024-01-15T09:00:00', 'America/New_York')
const tomorrow = original.add(1, 'day')
const london = tomorrow.goto('Europe/London')
london.time() // '2:00pm'
original.format('iso-short') // '2024-01-15' (unchanged)
```

Supports Browsers Typescript, Commonjs, and Node 18+.

## Find the right page

| Task                                                     | Guide                           |
| -------------------------------------------------------- | ------------------------------- |
| Look up a method signature or return value               | [API reference](./API.md)       |
| Parse strings, arrays, objects, or epochs                | [Inputs](./inputs.md)           |
| Read date fields and check validity                      | [Getters](./getters.md)         |
| Set fields, add time, or round dates                     | [Setters](./setters.md)         |
| Produce strings or native Dates                          | [Formatting](./formatting.md)   |
| Convert zones or inspect offsets                         | [Timezones](./timezones.md)     |
| Compare dates, measure differences, or iterate           | [Comparisons](./comparisons.md) |
| Extend the API or change language data                   | [Plugins](./plugins.md)         |
| Handle DST, month ends, invalid inputs, and shared state | [Edge cases](#edge-cases)       |

## Important concepts

- **Capture returned dates:** `s = s.add(1, 'day')`. Most setters return new
  instances; see [mutation exceptions](#mutation-and-shared-state).
- **Months are 0–11; dates are 1–31.** `[2017, 5, 2]` means June 2, 2017.
  Use `monthName()` for a name such as `'june'`.
- **Epochs use milliseconds.** For seconds, use `spacetime.fromUnixSeconds(seconds)`.
  `s.epoch` and `s.tz` are properties, not methods.
- **Check timezone argument positions.** The constructor and `fromUnixSeconds`
  take `(input, timezone?, options?)`; `now`, `today`, `tomorrow`, `yesterday`,
  `min`, and `max` take `(timezone?, options?)`. Omitted zones default to the host
  timezone; supply an IANA name such as `'America/New_York'` for predictable results.
- **Getters and setters share method names.** `s.hour()` reads the hour;
  `s.hour(9)` returns a date with that hour set.
- **Choose the right timezone operation.** `goto(tz)` preserves the instant;
  `timezone(tz)` preserves wall-clock values. See [timezones](./timezones.md).
- **Offset units differ.** `offset()` returns minutes;
  `timezone().current.offset` returns hours.

## Edge cases

### Calendar days versus elapsed hours

Adding a calendar day preserves the local clock time where it exists. Adding
24 hours measures elapsed time; the results can differ across DST. This example
uses the March 8 transition in the currently bundled New York rules.

```js
const s = spacetime('2026-03-07T09:00:00', 'America/New_York')
const nextDay = s.add(1, 'day')
nextDay.iso() // '2026-03-08T09:00:00.000-04:00'
s.add(24, 'hours').iso() // '2026-03-08T10:00:00.000-04:00'
const elapsedHours = (nextDay.epoch - s.epoch) / 3600000
elapsedHours // 23
```

For missing or repeated local times, see
[DST disambiguation](./timezones.md#missing-and-repeated-clock-times).

### Month ends

Month setters and month arithmetic preserve the day where possible, clamping
to the last available day. Clamping loses information, so reversing an operation
need not recover the original date.

```js
const s = spacetime('2024-01-31', 'UTC')
const feb = s.add(1, 'month')
feb.format('iso-short') // '2024-02-29'
feb.subtract(1, 'month').format('iso-short') // '2024-01-29'
s.month('february').format('iso-short') // '2024-02-29'
```

### Invalid inputs and clamping

`isValid()` checks the resulting date; it is not strict input validation.
Validate input fields separately if clamping or defaults are inappropriate.

```js
const invalid = spacetime('not a date', 'UTC')
invalid.isValid() // false
invalid.format('iso') // ''

const s = spacetime('2024-02-15', 'UTC')
s.date(31).format('iso-short') // '2024-02-29' (clamped, still valid)
s.hour(24).hour() // 23 (clamped)
```

Check validity before comparing or doing arithmetic. `null`, `undefined`, and
`''` as constructor inputs mean **now**, not invalid dates.

### Range boundaries

`isBetween(start, end)` excludes both endpoints; pass `true` as the third
argument to include them. `every`/`each` excludes the end, can include a start
on a unit boundary, and moves an unaligned start to the next boundary.
It returns an empty array when the span is less than the requested step in
that unit, even if a boundary falls inside that short span. Use positive integer
steps and reasonable range sizes: results are eagerly collected into an array.

```js
const start = spacetime('2024-01-01T12:00:00', 'UTC')
const end = spacetime('2024-01-04', 'UTC')
start.every('day', end).map((s) => s.format('iso-short'))
// ['2024-01-02', '2024-01-03']
```

### Timezone conversion and the date line

Timezone conversion can change the local calendar date:

```js
const s = spacetime('2024-01-15T12:00:00', 'Pacific/Kiritimati')
const honolulu = s.goto('Pacific/Honolulu')
honolulu.iso() // '2024-01-14T12:00:00.000-10:00'
honolulu.epoch === s.epoch // true
```

### Historical timezones

Bundled rules do not provide complete historical accuracy or anticipate
future policy changes. See [timezone data limits](./timezones.md#data-model-and-historical-limits).

### Mutation and shared state

These operations mutate the receiver or shared state:

- `epochSeconds(value)` changes the receiver's epoch and returns it. Use
  `spacetime.fromUnixSeconds(value, s.tz)` for a new instance.
- `weekStart(value)` changes the receiver's week configuration and returns it.
  Use `s.clone().weekStart(value)` to preserve the original configuration.
- `i18n()` changes shared language data; cloning does not isolate it.
- `spacetime.extend()` changes the shared prototype. The `timezones` data is
  shared too; treat it as read-only during normal use.

Direct writes to `s.epoch` or `s.tz` also mutate the instance. See
[plugins](./plugins.md) for language and extension examples.
