# Timezones

Import `spacetime` as shown in the [usage guide](./README.md).

## Supported IANA names

Spacetime ships its own timezone list and offset rules. Use full names such as
`America/New_York`, `Europe/London`, `Asia/Tokyo`, `Africa/Johannesburg`,
`Australia/Sydney`, or `Pacific/Auckland`. Names with multiple path components,
such as `America/Argentina/Buenos_Aires`, are supported when present in the list.

- Names are matched case-insensitively and surrounding whitespace is trimmed.
  `s.tz` stores the lowercase lookup name; `s.timezone().name` formats its casing.
- The bundle includes legacy names such as `US/Eastern` and `Asia/Calcutta`.
  Accepted aliases need not be rewritten to a single canonical name in `s.tz`.
- Prefer full names over abbreviations or city-only shortcuts. `EST`, for
  example, should not be used to mean New York with seasonal DST changes.
- An unrecognized explicit timezone throws an error; `silent: true` does not
  turn it into an invalid date or suppress the exception.
- The installed library's list is authoritative. Do not assume every name in
  the latest IANA database or the host's `Intl` list is supported by this bundle.

List or validate names without constructing a date:

```js
const zones = spacetime.timezones()
const names = Object.keys(zones).sort()
const americanNames = names.filter(name => name.startsWith('america/'))
const hasZone = name => Object.hasOwn(zones, name.trim().toLowerCase())
hasZone('America/New_York') // true
hasZone('America/Argentina/Buenos_Aires') // true
hasZone('Not/A_Zone') // false
```

This checks exact bundled names, including aliases, without relying on the
resolver's loose matching. The list also includes `utc` and generated fixed-offset
names; it is not a list of distinct cities or exclusively canonical IANA IDs.
The returned data is shared: do not edit it to configure a single instance.

If no zone is supplied, spacetime attempts to detect the host timezone using
`Intl.DateTimeFormat().resolvedOptions().timeZone`, falling back to UTC when
detection is unavailable or the detected name is unsupported. Offset and DST
calculations themselves use bundled data, not `Intl`.

## Convert an instant or reinterpret a clock time

```js
const s = spacetime('2024-01-15T15:00:00', 'America/New_York')
const converted = s.goto('Europe/London')
converted.time() // '8:00pm'
converted.epoch === s.epoch // true

const reinterpreted = s.timezone('Europe/London')
reinterpreted.time() // '3:00pm'
reinterpreted.epoch === s.epoch // false
s.time() // '3:00pm' (original unchanged)
```

`goto(tz)` preserves the **instant** and recomputes the local date and time.
`timezone(tz)` preserves the **wall-clock values** and changes the instant.
Both return new objects. `goto(null)` returns a new object in the local
machine/browser timezone. Conversion can change the calendar date, including
across the date line; see [edge cases](./edge-cases.md#timezone-conversion-and-the-date-line).

## Offset and metadata

```js
const s = spacetime('2024-07-15T12:00:00', 'America/New_York')
s.offset() // -240 (MINUTES east of UTC; negative means west)
s.timezone().current.offset // -4 (HOURS east of UTC)
s.timezone().name // 'America/New_York'
s.hemisphere() // 'North'
s.isDST() // true (for this instance's date)
s.hasDST() // true (according to the bundled timezone rules)
s.timezones // shared timezone data object, keyed by lowercase zone names
spacetime.timezones() // the same shared timezone data
spacetime.whereIts('8:30pm', '9:30pm') // zone names in this window right now
```

`timezone()` returns metadata with `name`, `hasDst`, `default_offset` (hours),
`hemisphere`, and `current: { offset, isDST }`. Here, `current` means the
instance's instant, not necessarily now. `default_offset` and the raw timezone
record's `offset` describe the stored interval (usually July); neither should
be treated as the current offset or necessarily the standard-time offset.

Fractional offsets are supported: for example, `Asia/Kathmandu` has an offset
of `345` minutes (`5.75` hours). Do not round offsets to whole hours.

## Regional zones versus fixed offsets

Use a regional IANA name when local time should follow that region's bundled
DST rules. An ISO string with only a numeric offset identifies an instant and
a fixed offset; it does not identify a regional timezone.

```js
const regional = spacetime('2026-01-15T09:00:00', 'America/New_York')
regional.offset() // -300
regional.month('july').offset() // -240

const fixed = spacetime('2026-01-15T09:00:00-05:00')
fixed.offset() // -300
fixed.month('july').offset() // -300
fixed.hasDST() // false
```

`Etc/GMT` names reverse the usual sign: `etc/gmt+7` means UTC−07:00, while
`etc/gmt-5` means UTC+05:00. Spacetime also generates fixed-offset names in
quarter-hour steps from UTC−14 to UTC+14, including fractional names such as
`etc/gmt-5.75`. These fractional names are library extensions; do not assume
other IANA consumers accept them. Prefer regional names for interoperability.

## How DST is applied

Spacetime selects an offset from the instance's epoch and the zone's bundled
transition rules. `isDST()` reports whether DST is active at that instant;
`hasDST()` reports whether the bundled zone has DST rules at all. It does not
mean the zone has always observed DST historically.

```js
const winter = spacetime('2026-01-15T12:00:00', 'America/New_York')
const summer = spacetime('2026-07-15T12:00:00', 'America/New_York')
winter.hasDST() // true
winter.isDST() // false
winter.offset() // -300
summer.isDST() // true
summer.offset() // -240

const sydney = spacetime('2026-01-15T12:00:00', 'Australia/Sydney')
sydney.isDST() // true (southern summer)
sydney.month('july').isDST() // false
```

- Seasons reverse between hemispheres; January can be DST in southern zones.
- A DST shift is not always one hour. The runtime handles a half-hour shift
  for `Australia/Lord_Howe` and a two-hour shift for `Antarctica/Troll`.
- `goto()` preserves the epoch and uses the destination's offset at that
  instant. Do not manually add or subtract a DST hour after conversion.
- Calendar arithmetic such as `add(1, 'day')` preserves wall-clock time where
  it exists; `add(24, 'hours')` measures elapsed time. A day spanning a DST
  transition can be shorter or longer than 24 hours; see the
  [DST arithmetic example](./edge-cases.md#calendar-days-versus-elapsed-hours).

## Missing and repeated clock times

At a forward transition, some local clock times do not exist. At a backward
transition, some occur twice. Do not use a bare wall-clock string to choose
which occurrence you mean, or assume `isValid()` rejects a missing local time.
The constructor has no explicit earlier/later/reject disambiguation option.

For an unambiguous instant, supply an epoch or an ISO string with a known
offset, then convert to the regional zone:

```js
const first = spacetime('2026-11-01T01:30:00-04:00').goto('America/New_York')
const second = spacetime('2026-11-01T01:30:00-05:00').goto('America/New_York')
first.time() // '1:30am'
second.time() // '1:30am'
first.isDST() // true
second.isDST() // false
first.diff(second, 'hour') // 1 (different instants)
```

This example uses the November 1 transition in the currently bundled rules.

## Data model and historical limits

The compact runtime data stores one offset inside a single annual interval
and another outside it. DST metadata exposes the boundaries as
`change: { start, back }`, using `MM/DD:HH` local times measured before each
change. For southern zones, `start` can mark the end of DST rather than its
beginning; use `isDST()` instead of interpreting the field names as DST flags.

The stored month/day boundaries are reused in the requested year. They are
not a complete history or recurring rules such as “the second Sunday in
March.” Consequently, DST boundaries can be wrong in other years, even when
the region's policy has not changed. The model also cannot represent every
region's multiple seasonal changes, permanent offset moves, or transitions
at minute/second precision.

The library does not fetch timezone updates at runtime. Supported names and
rules depend on the installed bundle; updating the host's timezone database
alone does not update spacetime. Maintainers can follow the
[timezone data update guide](../scripts/tz/README.md) to regenerate and review
the data, but generating a new year does not add historical support.
Use a library with full historical timezone data when that accuracy is required.
