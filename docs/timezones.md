# Timezones

Import `spacetime` as shown in the [usage guide](./README.md).

## Supported IANA names

Use full IANA names such as `America/New_York` or `Asia/Tokyo`. Names are
case-insensitive and trimmed; `s.tz` stores the lowercase name. The bundle
includes aliases, but does not necessarily support every name in the host's
`Intl` database. Unknown explicit zones throw, even with `silent: true`.
Prefer full names over abbreviations such as `EST` or city-only shortcuts.

```js
const zones = spacetime.timezones()
const names = Object.keys(zones).sort()
const hasZone = name => Object.hasOwn(zones, name.trim().toLowerCase())
hasZone('America/New_York') // true
hasZone('Not/A_Zone') // false
```

This checks exact bundled names, including aliases and generated fixed offsets.
The returned data is shared; treat it as read-only.

Without a supplied zone, Spacetime detects the host zone through `Intl`, falling
back to UTC if detection fails or the name is unsupported. Offset and DST
calculations use bundled data.

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
across the date line; see [edge cases](./README.md#timezone-conversion-and-the-date-line).

## Offset and metadata

```js
const s = spacetime('2024-07-15T12:00:00', 'America/New_York')
s.offset() // -240 (MINUTES east of UTC; negative means west)
s.timezone().current.offset // -4 (HOURS east of UTC)
s.timezone().name // 'America/New_York'
s.hemisphere() // 'North'
s.isDST() // true (for this instance's date)
s.hasDST() // true (according to the bundled timezone rules)
spacetime.whereIts('8:30pm', '9:30pm') // zone names in this window right now
```

`timezone()` includes `name`, `hemisphere`, `hasDst`, `default_offset`, and
`current: { offset, isDST }`. `current` refers to the instance's date, not now.
Use `current.offset` for the offset in hours; `default_offset` describes the
stored interval and is not necessarily the standard-time offset.

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

`isDST()` checks the instance's date; `hasDST()` reports whether the bundled
zone has DST rules. Southern zones can observe DST in January, and shifts are
not always one hour. `goto()` applies the destination offset automatically.

Calendar days and elapsed hours differ across transitions; see the
[DST arithmetic example](./README.md#calendar-days-versus-elapsed-hours).

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

Bundled rules reuse fixed month/day transition boundaries in each requested
year. They are not a complete history or recurring rules such as “the second
Sunday in March,” so transitions can be wrong in other years even without a
policy change. The model also cannot represent every seasonal or permanent
offset change. Use a library with full historical data when needed.

Rules update with the library bundle, not the host's timezone database.
Maintainers can use the [timezone data update guide](../scripts/tz/README.md);
regenerating a year's rules does not add historical support.
