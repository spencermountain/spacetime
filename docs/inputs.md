# Creating a spacetime object

```js
import spacetime from 'spacetime' // ESM
// const spacetime = require('spacetime') // CommonJS alternative

spacetime(1489520157124, 'America/Vancouver') // millisecond epoch
spacetime([2017, 5, 2], 'America/Vancouver') // June 2, 2017 (month is 0-based)
spacetime('July 2, 2017 5:01:00', 'UTC') // parsed string
spacetime('2019/05/15', 'UTC')
spacetime('2017-04-03T08:00:00-0700') // fixed-offset timezone: 'etc/gmt+7'
spacetime('2023-01-01T05:30[America/Denver]') // bracketed IANA timezone
spacetime({ year: 2019, month: 'june', date: 1 }, 'UTC')
spacetime(new Date(1489520157124), 'UTC') // same instant as the native Date
spacetime.fromUnixSeconds(1489520157, 'UTC') // SECONDS epoch
```

The constructor takes `(input, timezone?, options?)`. `fromUnixSeconds` takes
`(seconds, timezone?, options?)`. If no timezone is supplied or embedded in the
input, spacetime uses the local machine/browser timezone. Prefer an explicit
IANA zone for reproducible results. Fixed-offset `Etc/GMT` names reverse the
sign: `etc/gmt+7` means UTC−07:00 and has no regional DST rules.

The constructor accepts strings, millisecond numbers, native Dates, Spacetime
objects, arrays, date-field objects, and the native Temporal types below. Other methods have their own input
contracts; do not assume all constructor inputs work with every comparison.

## Native Temporal inputs and output

The regular `spacetime` entry accepts these objects when `globalThis.Temporal`
is available, either natively or through a globally installed polyfill:

```js
const native = Temporal.ZonedDateTime.from('2026-07-15T12:00+09:00[Asia/Tokyo]')
const s = spacetime(native) // keeps the instant and Tokyo timezone
spacetime(native, 'UTC') // keeps the instant, uses UTC
spacetime(Temporal.Instant.from('2026-07-15T03:00Z'), 'UTC')
spacetime(Temporal.PlainDate.from('2026-07-15'), 'UTC') // midnight in UTC
spacetime(Temporal.PlainDateTime.from('2026-07-15T12:00'), 'UTC')

const out = s.toTemporal() // Temporal.ZonedDateTime at the same instant and zone
spacetime(out).epoch === s.epoch // true
```

`Instant` uses the supplied timezone or the local timezone. `PlainDate` and
`PlainDateTime` resolve their calendar fields in that timezone using Temporal's
default DST disambiguation. Spacetime stores milliseconds, so sub-millisecond
precision is lost. Temporal durations and partial date/time types are unsupported.

`.toTemporal()` does not mutate the instance. It returns `null` for an invalid
date **when Temporal is available**. If `globalThis.Temporal` is unavailable,
it throws an explicit `Error`, even for an invalid date. Ordinary Spacetime
operations continue to work without Temporal.

The returned value uses the runtime's timezone rules; historical wall-clock
values may differ from Spacetime's bundled rules. Custom timezone tables are not
transferred. Enable TypeScript's `ESNext.Temporal` library for full native input
and output types; without it, the return declaration provides a minimal shape.

## Current-date and extreme-date helpers

These helpers take `(timezone?, options?)`, with the timezone **first**:

```js
spacetime.now('UTC') // this exact moment
spacetime.today('UTC') // start of today
spacetime.tomorrow('UTC') // start of tomorrow
spacetime.yesterday('UTC') // start of yesterday
spacetime.min('UTC').epoch // -8640000000000000
spacetime.max('UTC').epoch // 8640000000000000
```

`min` and `max` use the native Date epoch limits (roughly −272k to +276k years).
Local/timezone shifts at these extremes can exceed those limits; use the epoch
values as bounds rather than assuming all getters and formatting work there.

## Constructor options (third argument)

```js
spacetime('12/01/2018', 'UTC', { dmy: true }).format('iso-short') // '2018-01-12'
spacetime(123456, 'UTC', { silent: false }) // enable warnings (default: silent)
const partial = spacetime('June 5th', 'UTC', {
  today: { year: 1996, month: 3, date: 4 }
})
partial.format('iso-short') // '1996-06-05'
spacetime('2024-01-03', 'UTC', { weekStart: 0 }).startOf('week').day() // 0 (Sunday)
```

`dmy` changes ambiguous numeric parsing from the default US month/day order.
`weekStart` sets the week boundary (0=Sunday, 1=Monday, the default).
`today` pins the reference date for partial inputs; it is supported at runtime
but is currently absent from the TypeScript constructor-options declaration.

Partial strings assume the first day for `'June 1992'`, the current year for
`'June 5th'`, and January 1 for `'2030'`. `null`, `undefined`, and an empty string
mean now. See [invalid-input edge cases](./edge-cases.md#invalid-inputs-and-clamping).
