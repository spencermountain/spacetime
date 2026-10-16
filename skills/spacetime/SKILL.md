---
name: spacetime
description: Write or fix application code using the spacetime JavaScript library for date parsing, timezone conversion, calendar arithmetic, comparisons, and formatting.
---

# Date-time operations with spacetime

Use the public API of the application's installed version. Distinguish an
**instant** from a **wall-clock time in a region**, and choose the timezone
accordingly. Examples use the regular `spacetime` entry unless stated otherwise.

## Inputs and state

- The constructor takes `(input, timezone?, options?)`; `fromUnixSeconds` takes
  `(seconds, timezone?, options?)`. Current-date helpers such as `now` and `today`
  take `(timezone?, options?)`. Omitted zones default to the host timezone.
- Months are **0–11**, including array inputs; dates are **1–31**. `date()` is
  day of month; `day()` is weekday, with Sunday = 0.
- Numeric inputs and `s.epoch` use **milliseconds**. Use `fromUnixSeconds()` for
  seconds. `s.epoch` and `s.tz` are properties, not methods.
- Capture returned objects: `s = s.add(1, 'day')`. Most setters are immutable;
  calling without an argument reads the value. Setting an hour preserves minutes.
- `epochSeconds(value)` and `weekStart(value)` mutate the receiver. `i18n()`,
  `extend()`/`plugin()`, and timezone data affect shared state; cloning does not
  isolate them. Avoid changing shared configuration per request.
- Prefer complete inputs when defaults are unwanted. `{ dmy: true }` selects
  day/month parsing. `null`, `undefined`, and `''` mean **now**; validate missing
  input before construction if that is inappropriate for the application.
- `isValid()` checks the resulting date, not strict input validity: parsing and
  setters can clamp values. Validate original fields when rejection is required.
  Unknown explicit timezone names can throw even with `silent: true`.

## Timezones and DST

```js
import spacetime from 'spacetime'

const meeting = spacetime('2026-01-15T09:30:00', 'America/New_York')
meeting.goto('Europe/London').time() // '2:30pm': same instant
meeting.timezone('Europe/London').time() // '9:30am': same wall clock, new instant
meeting.offset() // -300: minutes east of UTC
meeting.timezone().current.offset // -5: hours east of UTC
```

Use regional IANA names, not ambiguous abbreviations such as `EST`. A numeric
offset identifies a fixed offset, not regional DST rules; parse it then `goto()`
the region. Conversion can change the date. Do not manually apply another offset.
Preserve fractional offsets; `Etc/GMT+5` reverses the usual sign and means UTC−05.

Missing or repeated local times need care: choose an occurrence using a known
epoch or explicit-offset timestamp. Do not assume missing times are rejected or
invent an earlier/later/reject parsing option. Bundled annual rules are not a
complete historical database and can give wrong transitions in other years.
Host timezone updates do not update them; account for this when accuracy matters.

## Arithmetic and boundaries

- `add(1, 'day')` preserves local clock time where it exists; `add(24, 'hours')`
  measures elapsed time. Calendar days and weeks can span different hours over DST.
- Month arithmetic clamps: January 31 plus one month can be February 29;
  subtracting a month then gives January 29, not the original date.
- Fractional days use elapsed time; half a day is 12 hours. Fractional months
  use 28 days, so half a month is 14 days. Rounding occurs on every call:
  `0.1` day rounds to two hours, so ten additions total 20 hours. Combine amounts
  when repeated rounding is unwanted.
- `{ weekStart: 0 }` sets Sunday boundaries; Monday is the default. This does
  not redefine `week()` numbering. `day('monday', true)` allows equality; for a
  strictly later Monday use `s.add(1, 'day').day('monday', true)`.

## Comparisons and ranges

Use valid Spacetime objects for comparisons. `isEqual()` compares instants;
`isSame(other, unit)` compares calendar fields in the receiver's zone. Its third
argument `false` compares each date's own local fields. `diff(other, unit)` is a
whole-unit total, positive when `other` is later; no-unit totals are not components
to sum. `since(other)` describes the argument relative to the receiver;
`from(other)` reverses that direction, and `fromNow()` describes the receiver.

`isBetween()` excludes endpoints unless its third argument is `true`.
`every(unit, end, stepCount = 1)` excludes the end and can include an aligned start;
an unaligned start advances to the next boundary. Short spans may return `[]`.
Use positive integer steps and bound large ranges: results are collected eagerly.

## Formatting and transfer

`format()` uses named tokens or braces: `s.format('{iso-year}-{iso-month}-{date-pad}')`.
`iso-month` is one-based; `month-pad` is zero-based. `{time}` already includes AM/PM.
`unixFmt('yyyy-MM-dd HH:mm')` uses a separate Unicode-style token system with
limited coverage. Do not infer supported methods or tokens from other libraries.

Store an epoch or UTC ISO timestamp for an instant, retaining the regional zone
when needed for later calendar arithmetic. `toNativeDate()` preserves the instant
but loses the zone; native Date's local getters use the host timezone.

## Temporal

Regular `spacetime` accepts native `ZonedDateTime`, `Instant`, `PlainDate`, and
`PlainDateTime` objects and returns a `ZonedDateTime` through `.toTemporal()`.
These operations require `globalThis.Temporal`; no polyfill is bundled. Prefer
native objects over annotated strings to preserve the chosen repeated-hour instant.
Regular Spacetime retains milliseconds and uses its own timezone rules.

`spacetime/temporal` is an experimental entry using Temporal's calendar and
runtime timezone rules. It requires Temporal at construction and supports a
smaller API; do not assume regular-entry methods such as `since`, `every`, or
`i18n` exist. `.toTemporal()` and `.format('iso-full')` retain native precision.
Verify relevant behavior against the installed version when choosing this entry
or relying on DST transitions, month ends, or ambiguous inputs.
