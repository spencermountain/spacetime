# Spacetime with Temporal

`spacetime/temporal` is an opt-in proof of concept that wrap Spacetime's familiar
methods over the native Temporal API. It reuses the string parsers and
formatters, but uses Temporal for calendar arithmetic and timezone calculations.
The regular `spacetime` entry remains independent.

The goal is a small wrapper for common workflows, rather than complete API
compatibility. It does not bundle Spacetime's timezone database or a Temporal
polyfill. Use a runtime with `globalThis.Temporal`, such as Node 26. In a runtime
without Temporal, construction throws; the regular entry still works.

## Basic usage

```js
import spacetime from 'spacetime/temporal'

const s = spacetime('March 1 2012 3:22pm', 'America/New_York')
s.format('{day-short} {month} {date-ordinal}, {time}')
// 'Thu March 1st, 3:22pm'

const tomorrow = s.add(1, 'day')
tomorrow.format('iso-short') // '2012-03-02'
s.format('iso-short')        // '2012-03-01' — original unchanged

s.hour(9).time()                // '9:22am'
s.startOf('month').date()       // 1
s.endOf('day').time()           // '11:59pm'
s.diff(tomorrow, 'days')        // 1
s.isBefore(tomorrow)            // true
s.unixFmt('yyyy-MM-dd HH:mm')   // '2012-03-01 15:22'
```

Common constructors, calendar/time getters and setters, comparisons, `diff`,
`startOf`, `endOf`, `next`, `last`, and formatting are supported. `progress` and
`nearest` require an explicit supported unit, such as `'day'` or `'month'`.
Most operations return new instances. As in regular Spacetime,
`epochSeconds(value)` and `weekStart(value)` mutate their receiver.

```js
spacetime([2024, 1, 29], 'UTC').format('iso-short') // '2024-02-29'
spacetime({ year: 2024, month: 'February', date: '29th' }, 'UTC')
spacetime.fromUnixSeconds(123, 'UTC').epoch // 123000
spacetime.today('Europe/Paris').hour()     // 0
```

Months remain **zero-based**, dates are **one-based**, and numeric constructor
inputs and `.epoch` use **milliseconds**. The default timezone is the runtime's
local timezone. Prefer an explicit timezone for reproducible results.

Common fractional additions are supported through Spacetime's rounding rules:
`s.add(1.5, 'day')` and `s.add(0.5, 'month')`, for example. These are compatibility
conventions, not native Temporal duration semantics. `quarter`, `season`,
`fortnight`, and `weekend` arithmetic are also supported. Adding a `season` means
three months; it does not enable named-season queries.

## Timezones and DST

```js
s.goto('America/Los_Angeles').time()     // '12:22pm' — same instant
s.timezone('America/Los_Angeles').time() // '3:22pm' — same wall clock
spacetime('2024-01-01', 'UTC+5:30').offset() // 330 minutes

const before = spacetime('2024-03-09T12:00:00', 'America/New_York')
const after = before.add(1, 'day')
after.time()                    // '12:00pm'
before.diff(after, 'hours')      // 23
before.add(24, 'hours').time()   // '1:00pm'
```

Calendar days preserve the local clock where possible; hours measure elapsed
time. Timezone rules come from the runtime. Historical offsets and DST results
can therefore differ from regular Spacetime or between runtime versions.

When parsing local date strings, times in DST gaps move forward and ambiguous
times default to the earlier occurrence. An ISO string with a zone and offset can select a repeated hour:

```js
const repeated = spacetime('2024-11-03T01:30:00-05:00[America/New_York]')
repeated.offset() // -300: the later occurrence of 1:30am
```

Use IANA names such as `'America/Toronto'`, or offsets such as `'+05:30'`,
`'UTC+5:30'`, and `'-2h'`. City-only lookup such as `'Toronto'` is not supported.
Fixed-offset timezone names may be `'-07:00'` instead of `'Etc/GMT+7'`; compare
`.offset()` or `.epoch` when the spelling is unimportant.

## Native Temporal interop

```js
const native = s.toTemporal() // Temporal.ZonedDateTime
const wrapped = spacetime(native)
wrapped.epoch === s.epoch // true

spacetime(Temporal.Instant.from('2024-02-29T12:00:00Z'), 'UTC')
spacetime(Temporal.PlainDate.from('2024-02-29'), 'UTC')
spacetime(Temporal.PlainDateTime.from('2024-02-29T12:00:00'), 'UTC')
s.toNativeDate() // JavaScript Date at the same instant
```

The wrapper targets ISO/Gregorian calendar workflows. Non-ISO calendars and
Temporal's full options surface, including custom DST disambiguation, are outside
its compatibility contract; use native Temporal directly for those operations.
The Spacetime-facing epoch, formatting, and end-of-unit conventions are based on
milliseconds. Use `.toTemporal()` for native precision; do not assume a round trip
through a Spacetime string or `.epoch` preserves sub-millisecond information.

---

## Spacetime features not implemented here

**The examples in this section use the regular entry.** Switching their import
to `spacetime/temporal` will not provide these features: missing methods throw,
and missing metadata is undefined.

```js
import legacy from 'spacetime'

const date = legacy('2024-03-01T15:22:00', 'America/New_York')

// Relative-time prose and interval enumeration
date.since('2024-03-05')
date.fromNow()
date.every('day', '2024-03-05') // also available as .each()

// Named seasons, hemispheres, and times of day
date.season()
date.hemisphere()
date.startOf('season')
date.dayTime('noon')
date.isAwake()

// Timezone metadata and discovery
date.isDST() // also .inDST()
date.hasDST()
date.timezone().current.isDST
date.timezones['america/new_york']
legacy.timezones()
legacy.whereIts('3:00pm')

// Locale customization
date.i18n({ ampm: { am: 'am', pm: 'pm' } })

// Other convenience APIs
legacy.min('UTC')
legacy.max('UTC')
date.progress() // regular entry returns progress for multiple units
```

Season-dependent format tokens such as `date.format('season')`, and strings such
as `'summer 2024'`, are consequently outside the Temporal wrapper's supported
parsing/formatting subset. Its `timezone()` getter only exposes `name` and
`current.offset` (in hours). Replacing `.timezones` cannot change native rules.

`extend()` and `plugin()` exist, but plugins must use methods this wrapper
implements. Plugins that require legacy timezone data or missing methods will
not work. Register extensions on the entry you actually use.

Other compatibility details remain incomplete: permissive invalid-value setters,
old century/decade string shorthand, and some week-number conventions. `.week()`
uses native ISO week numbers, which may belong to the previous or following ISO
week-year near January 1. Do not assume all legacy setters, aliases, or error
behaviors are interchangeable.

## Invalid values and unsupported units

Constructors and setters convert values rejected by Temporal into invalid
instances. Native overflow constraints still apply where supported: setting
February on January 31 clamps to the last day of February. Most setters leave
the original instance unchanged; assigning `.epoch` or `.tz`, and calling
`.epochSeconds(value)`, updates the receiver, including its invalid state.

| Situation | Result |
| --- | --- |
| Unparseable date, invalid timezone, or rejected setter/arithmetic value | Invalid instance |
| Operations on an invalid instance | Remain invalid |
| Invalid instance's `.epoch` / `.toTemporal()` | `null` |
| Invalid instance's numeric getters, `.diff()`, or `.progress()` | `NaN` |
| Comparison involving an invalid instance | `null` |
| Invalid instance's time/name getters or formatted output | Empty string |
| Missing/unsupported arithmetic or boundary unit | Unchanged clone |
| Unsupported `.diff()` / `.progress()` unit | `NaN` |
| Missing/unsupported `.isSame()` unit | `null` |

Calling `.diff(other)` without a unit still returns all supported differences.
Unknown arithmetic units emit a warning when `silent: false`; they do not throw.
Missing Temporal support and calls to APIs absent from this entry still throw.

```js
const invalid = s.hour(NaN)
invalid.isValid()             // false
invalid.toTemporal()          // null
invalid.isBefore(s)           // null
s.startOf('unsupported').epoch === s.epoch // true
```

## TypeScript

Both ESM and CommonJS imports have separate declarations for the supported
Temporal API. They intentionally omit APIs such as `.since()` and `.timezones`.
The declarations reference the compiler's `esnext.temporal` library; use a
TypeScript version that includes it (verified with TypeScript 7). Types do not
provide Temporal at runtime.

```ts
import spacetime, { type Spacetime } from 'spacetime/temporal'

const date: Spacetime = spacetime('2024-02-29', 'UTC')
const native: Temporal.ZonedDateTime | null = date.toTemporal()
if (native) {
  native.add({ days: 1 })
}
```

The native result is nullable because the wrapper can represent invalid dates.
Unit types distinguish arithmetic, boundary, and difference operations.

## Testing this entry

```sh
pnpm test:temporal        # supported behavior, boundaries, and build-guard tests
pnpm run build           # build the regular and Temporal bundles together
pnpm testb:temporal       # exercise the existing bundled entry
pnpm test:temporal:types  # check ESM/CommonJS types and unsupported API rejection
pnpm test:temporal:all    # diagnostic audit of every legacy test file
```

The focused suite compares shared behavior with regular Spacetime, checks DST
operations against native Temporal, and checks invariants such as immutability
and timezone travel preserving the instant. The full audit runs files separately
so an unsupported API does not prevent other files from running. It is expected
to report compatibility gaps and exit nonzero; it is not the release gate for
this entry. Legacy tests that inject timezone tables cannot govern native Temporal.

Every Temporal Rollup build rejects imports outside its small shared-module
allowlist, including the legacy timezone engine and external runtime dependencies.
Each output has budgets of 32 KiB minified and 10 KiB gzip. Build-guard tests
verify that forbidden imports and exceeded budgets fail the build.
