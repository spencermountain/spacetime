# Edge cases

Import `spacetime` as shown in the [usage guide](./README.md).

## Calendar days versus elapsed hours

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

During DST transitions, some local times do not exist or occur twice. A bare
wall-clock string cannot distinguish the two occurrences. For a specific
instant, supply an epoch or ISO string with an explicit offset, then `goto()`
the regional zone. Do not assume parsing a nonexistent time rejects it.

## Month ends

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

## Invalid inputs and clamping

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
`''` as constructor inputs mean **now**, not invalid dates. Omitting a timezone
also makes results depend on the host environment.

## Range boundaries

`isBetween(start, end)` excludes both endpoints; pass `true` as the third
argument to include them. `every`/`each` excludes the end, can include a start
on a unit boundary, and moves an unaligned start to the next boundary.
It returns an empty array when the span is less than the requested step in
that unit, even if a boundary falls inside that short span. Use positive integer
steps and reasonable range sizes: results are eagerly collected into an array.

```js
const start = spacetime('2024-01-01T12:00:00', 'UTC')
const end = spacetime('2024-01-04', 'UTC')
start.every('day', end).map(s => s.format('iso-short'))
// ['2024-01-02', '2024-01-03']
```

## Timezone conversion and the date line

`goto()` preserves the epoch, but the local calendar date may change.

```js
const s = spacetime('2024-01-15T12:00:00', 'Pacific/Kiritimati')
const honolulu = s.goto('Pacific/Honolulu')
honolulu.iso() // '2024-01-14T12:00:00.000-10:00'
honolulu.epoch === s.epoch // true
```

## Historical timezones

Spacetime applies its bundled DST rules to historical dates; it does not keep a
complete history of past timezone changes. Historical offsets and transitions
may therefore be inaccurate. Its bundled data also cannot anticipate future
rule changes. Use a library with historical timezone data when that accuracy
is required.

## Mutation and shared state

Arithmetic, `goto`, and most date setters return new objects. Exceptions in the
current implementation:

- `epochSeconds(value)` changes the receiver's epoch and returns it. Use
  `spacetime.fromUnixSeconds(value, s.tz)` for a new instance.
- `weekStart(value)` changes the receiver's week configuration and returns it.
  Use `s.clone().weekStart(value)` to preserve the original configuration.
- `i18n()` changes shared language data; cloning does not isolate it.
- `spacetime.extend()` changes the shared prototype. The `timezones` data is
  shared too; treat it as read-only during normal use.

Direct writes to `s.epoch` or `s.tz` also mutate the instance. See
[plugins](./plugins.md) for language and extension examples.
