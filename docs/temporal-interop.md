# Regular Spacetime and Temporal

This guide uses **`import spacetime from 'spacetime'`**. The separate
[`spacetime/temporal` entry](./Temporal.md) replaces the calendar/timezone engine;
it is not required to exchange Temporal objects with regular Spacetime.

## Recommended boundary

Pass a `Temporal.ZonedDateTime` directly when you have one. Avoid transferring
through `.json()`, an array, a JavaScript `Date`, or a plain date/time: those
representations carry less information. Use `.toTemporal()` on the way back.

```js
import spacetime from 'spacetime'

const zdt = Temporal.ZonedDateTime.from(
  '2024-11-03T01:30:00.123-05:00[America/New_York]'
)
const s = spacetime(zdt, undefined, { silent: false })
const result = s.toTemporal()

result.epochMilliseconds === zdt.epochMilliseconds // true
spacetime(result).epoch === s.epoch                // true
result.toString() // native serialization; s.isoFull() uses Spacetime's format

// Supplying a zone to a native-object constructor keeps the instant.
spacetime(zdt, 'Asia/Tokyo').toTemporal()
// 2024-11-03T15:30:00.123+09:00[Asia/Tokyo]
```

Temporal must be exposed on `globalThis` for native-object input and
`.toTemporal()`. A polyfill must be installed there by the application; Spacetime
does not bundle one. Use objects from that same Temporal implementation.
Feature-detect `globalThis.Temporal`; a Node version number alone is insufficient.
Ordinary Spacetime operations still work without it. `.toTemporal()` throws a
descriptive error if Temporal is absent, and returns `null` for an invalid
Spacetime when Temporal is available.

## Transfer contract and limits

| Input to regular Spacetime | Interpretation |
| --- | --- |
| `Temporal.ZonedDateTime` | Keeps epoch milliseconds; inherits the input zone unless a constructor zone is supplied. |
| `Temporal.Instant` | Keeps epoch milliseconds; requires a supplied zone or uses the local default. |
| `Temporal.PlainDateTime` | Resolves the wall clock in the supplied/default zone using Temporal's compatible DST policy. |
| `Temporal.PlainDate` | Resolves the beginning of that date in the supplied/default zone, including skipped midnight. |
| Non-ISO calendar on any supported date object | Converts to ISO calendar fields; warns with `silent: false`. The original calendar identity is not retained. |
| `PlainTime`, `PlainYearMonth`, `PlainMonthDay`, `Duration` | Invalid Spacetime; no complete date can be inferred. Warns with `silent: false`. |
| Annotated ISO string | Uses Spacetime's own parser regardless of Temporal availability. Native offset validation and overlap selection are not guaranteed; pass a ZonedDateTime to preserve the selected instant. |

Regular Spacetime's clock and arithmetic use milliseconds and its bundled
timezone rules. Native Temporal uses the runtime's timezone data. Historical
local times, discontinued DST rules, newly introduced zones, and aliases can
differ. The regular entry may reject a zone absent from its own database.
An offset disagreement on native input warns with `silent: false`.

The stored instant can therefore be correct even when `.hour()` differs from
`.toTemporal().hour`. For example, Paris in 1900 has a native offset with seconds,
which regular Spacetime's simplified rules do not reproduce. Converting back
recomputes the wall clock from the instant using Temporal's rules. Do operations
in native Temporal when those rules must be authoritative:

```js
const tomorrow = s.toTemporal().add({ days: 1 })
const wrapped = spacetime(tomorrow)
```

Do not assume zone identifier strings are byte-for-byte preserved by the regular
entry. Its `.tz` is lowercased, display names are recased, and legacy fractional
`Etc/GMT` identifiers convert to numeric offsets. Compare instants and the desired
zone semantics rather than requiring an identical spelling.

## Serialization

Regular `.format('iso-full')`, `.isoFull()`, and `{iso-full}` use Spacetime's
own formatter and timezone calculations. They never call Temporal. Their output
retains three-digit milliseconds and `Z` for UTC, for example:

```text
Spacetime: 2024-01-01T00:00:00.120Z[UTC]
Temporal:  2024-01-01T00:00:00.12+00:00[UTC]
```

Use `.toTemporal().toString(options)` explicitly for native serialization.
The separate `spacetime/temporal` entry uses native serialization for `iso-full`.

For reliable transfers, prefer native objects. An offset-only ISO string loses
the named zone, and Spacetime's annotated-string parser does not provide native
offset validation or the complete native grammar. In particular, a string round
trip may lose the selected occurrence of a repeated DST hour. Parse with
`Temporal.ZonedDateTime.from(text)` yourself and pass that object when native
validation and disambiguation are required.

## Method-by-method mapping

In this table, `s` is regular Spacetime, `z = s.toTemporal()`, and `other` is a
native value already converted into the appropriate zone/calendar. Getter rows
assume the two timezone engines agree on the local clock. These are migration
recipes, not a claim that all error, overflow, or DST behavior is identical.

### Construction, state, and transfer

| Spacetime | Temporal counterpart | Difference |
| --- | --- | --- |
| `spacetime(input, zone, options)` | `ZonedDateTime.from(...)` or `Instant.fromEpochMilliseconds(n).toZonedDateTimeISO(zone)` | Spacetime also accepts natural-language strings, `Date`, zero-based arrays and partial field objects. Native field bags use `day` and one-based `month`. |
| `now(zone)` | `Temporal.Now.zonedDateTimeISO(zone)` | Spacetime samples a millisecond clock. |
| `today(zone)` | `Temporal.Now.zonedDateTimeISO(zone).startOfDay()` | First instant of the local day; not an elapsed 24-hour boundary. |
| `tomorrow(zone)` | `Temporal.Now.zonedDateTimeISO(zone).add({ days: 1 }).startOfDay()` | Calendar day, subject to each engine's zone rules. |
| `yesterday(zone)` | `Temporal.Now.zonedDateTimeISO(zone).subtract({ days: 1 }).startOfDay()` | Calendar day, not necessarily 24 hours. |
| `fromUnixSeconds(n, zone)` | `Instant.fromEpochMilliseconds(n * 1000).toZonedDateTimeISO(zone)` | Seconds are explicit here; the ordinary constructor takes milliseconds. |
| `min(zone)` | `new Temporal.ZonedDateTime(-8640000000000000000000n, zone)` | Lower instant bound; calendar operations near bounds can fail. |
| `max(zone)` | `new Temporal.ZonedDateTime(8640000000000000000000n, zone)` | Upper instant bound; local fields depend on zone. |
| `.epoch` | `.epochMilliseconds` | Spacetime property is writable; Temporal's is read-only. |
| `.epochSeconds()` | `Math.floor(z.epochMilliseconds / 1000)` | Spacetime setter **mutates**; Temporal requires a new value. |
| `.tz` | `.timeZoneId` | Spacetime property is writable and normalized differently. Prefer `.goto()`. |
| `.toTemporal()` | `z` | Conversion is an instant-plus-zone boundary, not a copy of Spacetime's computed local fields. |
| `.toNativeDate()` | `new Date(z.epochMilliseconds)` | Date loses the zone, calendar, and sub-millisecond precision. |
| `.toLocalDate()` | Same as above | Deprecated alias; does not transfer a local-zone identity into Date. |
| `.clone()` | `Temporal.ZonedDateTime.from(z)` | Temporal values are immutable; copying is normally unnecessary. |
| `.set(input, zone)` | Construct another value | Re-parses input, unlike native `.with(fields)` which patches fields. Use the constructor for an unambiguous transfer with an explicit zone. |
| `.isValid()` | Catch native construction errors | Spacetime can represent invalid dates; Temporal cannot. |
| `.json()` | Explicit field extraction | Spacetime returns zero-based month, `date`, weekday `day`, offset in hours, and zone. Native `.toJSON()` returns a string. |
| `.json(fields)` | `.with(mappedFields)` | Rename `date` to `day`, add one to month; Spacetime may change timezone and applies fields sequentially. |

### Calendar and clock queries/setters

Getters are methods in Spacetime and properties in Temporal. Most Spacetime
setters return a new object, as does `z.with(...)`. Native setters accept an
options bag; Spacetime's optional `goFwd` boolean instead asks for a occurrence
in a direction and has no direct `.with()` equivalent. Out-of-range input and
string coercion rules are not interchangeable.

| Spacetime | Temporal counterpart | Difference |
| --- | --- | --- |
| `.year()` / `.year(n)` | `.year` / `.with({ year: n })` | Spacetime is ISO/Gregorian; native fields can use another calendar. |
| `.month()` / `.month(n)` | `.month - 1` / `.with({ month: n + 1 })` | Spacetime also accepts names. |
| `.monthName()` / `.monthName(name)` | Format month / map name to `.with({ month })` | Spacetime uses its shared language tables. |
| `.date()` / `.date(n)` | `.day` / `.with({ day: n })` | Day of month, not weekday. |
| `.day()` / `.day(n)` | `.dayOfWeek % 7` / calendar-day arithmetic | Sunday is 0 in Spacetime, 7 in Temporal; setter selects a weekday. |
| `.dayName()` / `.dayName(name)` | Format weekday / calendar-day arithmetic | Name aliases and direction are Spacetime conveniences. |
| `.dayOfYear()` / `.dayOfYear(n)` | `.dayOfYear` / `.add({ days: n - z.dayOfYear })` | Ordinal starts at 1; native property is read-only. |
| `.week()` / `.week(n)` | `.weekOfYear` / calculate an ISO-week date | Regular Spacetime has its own week conventions; inspect January/December boundaries. Native `.yearOfWeek` can differ from `.year`. |
| `.weekStart(n)` | No stored equivalent | Mutates Spacetime's boundary preference; does not redefine native ISO week numbers. |
| `.quarter()` / `.quarter(n)` | `Math.floor((z.month - 1) / 3) + 1` / set first month and day | Spacetime setter moves to the quarter's start of day. |
| `.season()` / `.season(name)` | No direct equivalent | Spacetime uses named seasons and hemisphere conventions. |
| `.decade()` / `.decade(n)` | Calculate from year / `.with({ year })` | Spacetime supports shorthand and rounds setter input to a decade. |
| `.century()` / `.century(n)` | Calculate from year / `.with({ year })` | Spacetime uses numbered centuries and special BC conventions. |
| `.millennium()` / `.millennium(n)` | Calculate from year / `.with({ year })` | Setter has special handling around year zero; `.millenium` is an alias. |
| `.era()` / `.era(name)` | `.era`, `.eraYear`, `.with(...)` in a suitable calendar | Spacetime labels negative years BC and zero/nonnegative years AD; native ISO has no era property value. |
| `.hour()` / `.hour(n)` | `.hour` / `.with({ hour: n })` | 24-hour clock; `.hours`, `.hour24`, `.h24` are aliases. |
| `.hour12()` / `.hour12('3pm')` | `z.hour % 12 || 12` / map AM/PM to `.with({ hour })` | `.h12` is an alias. |
| `.hourFloat()` / `.hourFloat(n)` | `z.hour + z.minute / 60` / set hour and minute | Seconds and fractional seconds are excluded from the getter. |
| `.minute()` / `.minute(n)` | `.minute` / `.with({ minute: n })` | `.minutes` is an alias. |
| `.second()` / `.second(n)` | `.second` / `.with({ second: n })` | `.seconds` is an alias. |
| `.millisecond()` / `.millisecond(n)` | `.millisecond` / `.with({ millisecond: n })` | `.milliseconds` is an alias; native also exposes microseconds and nanoseconds. |
| `.ampm()` / `.ampm(value)` | Derive from `.hour` / adjust hour | Spacetime getter uses language tables. |
| `.time()` / `.time(text)` | `.toPlainTime()` / `.withPlainTime(...)` | Spacetime getter returns 12-hour text, not a PlainTime; accepted strings and field-reset behavior differ. |
| `.dayTime()` / `.dayTime(name)` | No direct equivalent | Named periods such as morning/noon/night are Spacetime conventions. |
| `.leapYear()` | `.inLeapYear` | Native result is calendar-specific. |
| `.daysInMonth()` | `.daysInMonth` | Native result is calendar-specific. |

### Timezones, arithmetic, comparisons, and formatting

| Spacetime | Temporal counterpart | Difference |
| --- | --- | --- |
| `.goto(zone)` | `.withTimeZone(zone)` | Keeps the instant; local fields may change. |
| `.timezone(zone)` | `.toPlainDateTime().toZonedDateTime(zone)` | Keeps wall-clock fields and changes the instant; resolve DST ambiguity deliberately. |
| `.timezone()` | `.timeZoneId`, `.offset`, `.offsetNanoseconds` | Spacetime returns metadata; `current.offset` is in **hours**. |
| `.offset()` | `.offsetNanoseconds / 60000000000` | Numeric **minutes**; native `.offset` is a string. |
| `.isDST()` / `.inDST()` | No direct boolean | Offset transitions alone do not identify daylight saving. |
| `.hasDST()` | No direct equivalent | Spacetime database metadata. |
| `.hemisphere()` | No direct equivalent | Spacetime timezone metadata. |
| `.add(n, unit)` / `.plus(...)` | `.add({ [pluralUnit]: n })` | Spacetime adds convenience units and fractional conventions. Native durations use integer fields; days and elapsed hours differ over DST. |
| `.subtract(n, unit)` / `.minus(...)` | `.subtract({ [pluralUnit]: n })` | Same unit and fractional caveats. |
| `.startOf('day')` | `.startOfDay()` | Start may not be midnight; timezone engines can disagree. Other units require explicit field/boundary logic in Temporal. |
| `.endOf(unit)` | Next boundary minus one millisecond | Spacetime defines the last **millisecond**, not last nanosecond. |
| `.next(unit)` | Add one unit, then find its start | Does not mean simply `z.add(...)`. |
| `.last(unit)` | Subtract one unit, then find its start | Same boundary distinction. |
| `.diff(other, unit)` | `.until(other, options)` | Spacetime returns a signed count (or an object without a unit); Temporal returns a Duration. Calendar and rounding algorithms can differ. |
| `.isBefore(other)` | `ZonedDateTime.compare(z, other) < 0` | Regular Spacetime compares milliseconds. |
| `.isAfter(other)` | `ZonedDateTime.compare(z, other) > 0` | Same precision caveat. |
| `.isEqual(other)` | `ZonedDateTime.compare(z, other) === 0` | Instant equality; native `.equals()` also considers calendar and timezone. |
| `.isSame(other, unit, timezoneAware)` | Compare selected local fields/boundaries | Unit-based equivalence, not instant equality. Optional timezone normalization matters. |
| `.isBetween(a, b, inclusive)` | Two instant comparisons | Exclusive by default; Spacetime returns `null` for invalid operands. |
| `.progress(unit)` | Elapsed time divided by boundary interval | Spacetime returns a fraction; no-unit form returns multiple units. |
| `.nearest(unit)` / `.round(unit)` | `.round(options)` for supported native units | Spacetime rounds using boundary progress and supports calendar units; native rounding is not a drop-in mapping. |
| `.format('iso-full')` / `.isoFull()` | `.toString()` | Spacetime retains three fractional digits and `Z` for UTC, and uses its own timezone rules. Call `.toTemporal().toString()` explicitly for native output. |
| `.isoFull(input)` | Construct another value | Setter parses input; getter serializes. |
| `.format('iso')` / `.iso()` | `.toString({ timeZoneName: 'never', calendarName: 'never', fractionalSecondDigits: 3 })` | Spacetime retains `Z` for zero offset; native ZonedDateTime uses `+00:00`. |
| `.iso(input)` | Construct another value | Re-parses instead of patching fields. |
| `.format('iso-utc')` | `.toInstant().toString({ fractionalSecondDigits: 3 })` | Instant string; no named timezone. |
| `.format('iso-short')` | `.toPlainDate().toString()` | Date only; zone and time are lost. |
| `.format(template)` | Explicit formatting / `.toLocaleString()` | Token grammar and shared language settings are Spacetime-specific. |
| `.unixFmt(pattern)` | Explicit formatting / `.toLocaleString()` | Native Temporal does not interpret Spacetime's token patterns. |
| `.since()`, `.from()`, `.fromNow()` | Duration plus application formatting | Spacetime returns relative-time prose/data; native `.since()` returns a Duration. |
| `.every()` / `.each()` | Iterate with `.add(...)` | Enumeration and endpoints are Spacetime conventions. |
| `.isAwake()` / `.isAsleep()` | Application policy | Spacetime uses fixed clock-hour thresholds. |
| `.i18n()` | Locale options at formatting call sites | Spacetime changes shared language state. |
| `.log()`, `.logYear()`, `.debug()` | `console.log(z.toString())` | Spacetime logging helpers return the receiver. |
| `.timezones`, `spacetime.timezones()` | Runtime timezone support | Replacing Spacetime's table cannot alter native Temporal rules. |
| `whereIts(time)` | Application search over zones | No native discovery equivalent. |
| `extend()`, `plugin()` | Application adapters | Modifies the Spacetime prototype; not a Temporal feature. |
| `version` | No equivalent | Library version, not timezone-data or Temporal-spec version. |

### Deliberate DST decisions

For strict handling, resolve input in Temporal first and pass the result to
Spacetime. Spacetime does not expose Temporal's complete options surface:

```js
const chosen = Temporal.ZonedDateTime.from(
  { year: 2024, month: 11, day: 3, hour: 1, minute: 30,
    timeZone: 'America/New_York' },
  { disambiguation: 'later' }
)
const s = spacetime(chosen)
```

The native defaults choose the earlier occurrence in an overlap and move forward
through a gap. An explicit offset in an annotated string selects an occurrence;
a conflicting offset is rejected by Temporal. Regular Spacetime string parsing
does not perform that native validation. See the
[Temporal timezone guide](https://tc39.es/proposal-temporal/docs/timezone.html)
and [ZonedDateTime reference](https://tc39.es/proposal-temporal/docs/zoneddatetime.html).

## Verification coverage

The transfer contract in `tests/temporal/transfer.test.js` covers leap day,
fractional offsets, both sides of a repeated hour, a half-hour DST transition,
historical offset seconds, a skipped date, negative fractional epochs, extended
years, calendar conversion, incomplete inputs, cloning, and serialization.
It exercises regular Spacetime's conversion limits as well as the native-backed
entry. It requires a runtime with current Temporal support; skipped tests are
not evidence of compatibility.
