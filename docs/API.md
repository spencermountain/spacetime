# spacetime API

Import with `import spacetime from 'spacetime'` or `const spacetime = require('spacetime')`.
Here, `s` is a Spacetime instance, `?` means optional, and `→` describes the return value.
For runnable examples, see the [usage guide](./docs/README.md).

## Conventions

- **Capture changes:** arithmetic and most setters return a new `Spacetime`: `s = s.add(1, 'day')`. Mutation exceptions are marked below.
- **Units:** epochs are milliseconds; months are **0–11**; dates are **1–31**; weekdays are **0–6**, starting Sunday.
- **Timezones:** use an IANA name such as `'America/New_York'` or `'UTC'`. Omitted zones default to the host timezone unless the input supplies one.
- **Inputs:** the constructor accepts a string, millisecond epoch, native `Date`, `Spacetime`, numeric array, or date-field object. `null`, `undefined`, and `''` mean now.
- **Comparisons:** prefer valid Spacetime objects for `other`, `start`, and `end`; accepted input forms vary between methods.
- **Limits:** timezone data, DST, clamping, and shared state have [edge cases](./docs/edge-cases.md). Validate dates with `isValid()` before using them.

## Creation and static helpers

- `spacetime(input?, timezone?, options?) → Spacetime` — parse an input; array order is `[year, month, date, hour, minute, second, millisecond]`.
- `spacetime.now(timezone?, options?) → Spacetime` — the current instant.
- `spacetime.today(timezone?, options?) → Spacetime` — start of today in the selected zone.
- `spacetime.tomorrow(timezone?, options?) → Spacetime` — start of tomorrow.
- `spacetime.yesterday(timezone?, options?) → Spacetime` — start of yesterday.
- `spacetime.fromUnixSeconds(seconds, timezone?, options?) → Spacetime` — construct from epoch **seconds**.
- `spacetime.min(timezone?, options?) → Spacetime` — minimum native Date epoch, `-8640000000000000`; timezone getters at this extreme may exceed native limits.
- `spacetime.max(timezone?, options?) → Spacetime` — maximum native Date epoch, `8640000000000000`; the same limit caveat applies.
- `spacetime.timezones() → TimezoneSet` — shared timezone data keyed by lowercase zone names; treat it as read-only.
- `spacetime.whereIts(startTime, endTime?) → string[]` — zones whose current local time falls in the window, such as `'8:30pm'` to `'9:30pm'`; omitted end means 59 minutes after the start. Use a window that does not cross midnight.
- `spacetime.extend(methods) → spacetime` — add methods to the shared instance prototype. Use regular functions for instance `this`; affects existing and future instances.
- `options.silent` — boolean, default `true`; set `false` to enable warnings.
- `options.dmy` — boolean, default `false`; parse ambiguous numeric dates as day/month/year when `true`.
- `options.weekStart` — weekday number, default `1` (Monday); sets week boundaries.
- `options.today` — reference date-field object for partial inputs; runtime support, currently missing from the TypeScript options declaration.

## Instance properties

- `s.epoch → number` — milliseconds since the Unix epoch; may be `null` for an invalid date at runtime. **Property, not a method.**
- `s.tz → string` — timezone identifier, usually lowercase. **Property, not a method.**
- `s.silent → boolean` — `true` suppresses warnings.
- `s.timezones → TimezoneSet` — shared timezone data, also returned by `spacetime.timezones()`.

## Copying, parsing, and timezones

- `s.clone() → Spacetime` — copy the date and instance configuration; shared timezone and language data remain shared.
- `s.set(input, timezone?) → Spacetime` — parse a replacement date. The second argument is a timezone string, **not** `goForward`.
- `s.goto(timezone) → Spacetime` — preserve the instant and change local date/time; `null` selects the host timezone.
- `s.timezone() → TimezoneMeta` — timezone metadata: `name`, `hemisphere`, `hasDst`, `default_offset`, `current`, and optional `change`.
- `s.timezone(name) → Spacetime` — preserve wall-clock date/time and reinterpret it in another zone, changing the instant where offsets differ.
- `s.offset() → number` — UTC offset in **minutes**, positive east of UTC; New York in summer is `-240`.
- `s.timezone().current.offset → number` — UTC offset in **hours**; New York in summer is `-4`.
- `s.isDST() → boolean` — whether DST is active for this instance's date and zone.
- `s.hasDST() → boolean` — whether the bundled rules for this zone include DST.
- `s.hemisphere() → string` — `'North'` or `'South'`.

## Getters and setters

Call without a value to read; pass a value to get a new `Spacetime`, except for
the marked `epochSeconds` mutation. Getter types and ranges below describe valid dates.
Where shown, `goForward = true` prevents moving backward and `false` prevents
moving forward; equality is allowed. See [setter examples](./docs/setters.md).

- `s.millisecond(value?)` — getter: number, **0–999**; setter: numeric milliseconds.
- `s.second(value?, goForward?)` — getter: number, **0–59**; setter: numeric seconds.
- `s.minute(value?, goForward?)` — getter: number, **0–59**; setter: numeric minutes.
- `s.hour(value?, goForward?)` — getter: number, **0–23**; use a numeric 24-hour value to set. Use `time('3pm')` for AM/PM strings.
- `s.hour12(value?, goForward?)` — getter: number, **1–12**; setter expects a string such as `'3pm'`. Prefer `time('12am')` or `time('12pm')` for midnight/noon.
- `s.hourFloat(value?, goForward?)` — getter: number, hour plus fractional minutes; `3:30am` is `3.5`. Setter takes a number.
- `s.time(value?, goForward?)` — getter: string such as `'4:30pm'`; setter accepts `'4:30pm'` or `'16:30'`.
- `s.ampm(value?, goForward?)` — getter: `'am'` or `'pm'` with default language data; setter takes `'am'` or `'pm'`.
- `s.dayTime(value?, goForward?)` — getter: `'night'`, `'morning'`, `'afternoon'`, or `'evening'`; setter accepts named times such as `'noon'` or `'midnight'`.
- `s.date(value?, goForward?)` — getter: number, **1–31**, day of month; setter clamps to the month's valid range.
- `s.day(value?, goForward?)` — getter: number, **0–6**, Sunday first; setter takes a number or weekday name such as `'monday'`.
- `s.dayName(value?, goForward?)` — getter: weekday string such as `'wednesday'`; setter takes a weekday name.
- `s.dayOfYear(value?, goForward?)` — getter: number, **1–365**, or **1–366** in a leap year; setter takes a day number.
- `s.week(value?, goForward?)` — getter: numeric week number with Monday-based year-boundary handling; setter takes a week number. Do not assume `weekStart` changes this numbering.
- `s.month(value?, goForward?)` — getter: number, **0–11**; setter takes a number or name such as `'march'`, preserving the day where possible.
- `s.monthName(value?, goForward?)` — getter: month string such as `'april'`; setter takes a month name.
- `s.quarter(value?, goForward?)` — getter: number, **1–4**, calendar quarter; setter moves to the quarter's first day at midnight.
- `s.season(value?, goForward?)` — getter: season string based on hemisphere; setter moves to the beginning of a named season.
- `s.year(value?)` — getter: numeric year; setter takes a year number.
- `s.decade(value?)` — getter: decade's starting year, such as `2020`; setter takes a number or string such as `'1990s'`.
- `s.century(value?)` — getter: century number, such as `21`; setter takes a number or string such as `'20th'`.
- `s.millennium(value?)` — getter: millennium number, such as `3`; setter takes a number or ordinal string.
- `s.era(value?)` — getter: `'BC'` or `'AD'`; setter accepts either, also lowercase, and changes the year sign.
- `s.epochSeconds(value?)` — getter: whole epoch seconds. **Setter mutates and returns `s`**; use `spacetime.fromUnixSeconds(value, s.tz)` for a new object.
- `s.iso(value?)` — getter: ISO datetime string with offset; setter parses an ISO string.
- `s.isoFull(value?)` — getter: extended ISO string with offset and `[Timezone]`; setter parses an extended ISO string.
- `s.json(value?)` — getter: date-field object with `timezone` and `offset` in **hours**; setter accepts date fields and returns a new object.

## Arithmetic and boundaries

- `s.add(amount, unit) → Spacetime` — add units; calendar days/weeks preserve clock time across DST where that time exists.
- `s.subtract(amount, unit) → Spacetime` — subtract units.
- `s.startOf(unit) → Spacetime` — beginning of the selected calendar unit.
- `s.endOf(unit) → Spacetime` — final millisecond of the selected calendar unit.
- `s.next(unit) → Spacetime` — beginning of the next unit.
- `s.last(unit) → Spacetime` — beginning of the previous unit.
- `s.nearest(unit) → Spacetime` — round to a unit boundary; supports year, season, quarter, month, week, day, quarterHour, hour, and minute.
- `s.round(unit) → Spacetime` — alias of `nearest`.
- `s.every(unit, end, stepCount = 1) → Spacetime[]` — collect unit boundaries in chronological order; end excluded, aligned start can be included. Use a positive integer step; short spans can return `[]`.
- `s.each(unit, end, stepCount = 1) → Spacetime[]` — alias of `every`.
- `unit` — common arithmetic units: `millisecond`, `second`, `minute`, `quarterHour`, `hour`, `day`/`date`, `week`, `month`, `quarter`, `season`, `year`, `decade`, `century`; plurals work too. **Support varies by method**, despite the shared TypeScript `TimeUnit` union.

## Comparisons and differences

- `s.isAfter(other) → boolean` — whether **s is later** than `other`.
- `s.isBefore(other) → boolean` — whether **s is earlier** than `other`.
- `s.isEqual(other) → boolean` — same epoch millisecond.
- `s.isBetween(start, end, inclusive = false) → boolean` — between the bounds; pass `true` to include endpoints.
- `s.isSame(other, unit, tzAware = true) → boolean | null` — compare calendar fields in `s`'s zone; `false` compares each object's own local fields. Supports millisecond, second, minute, hour, day/date, week, month, quarter, and year, including plurals; unsupported units return `null`.
- `s.diff(other, unit) → number` — whole-unit difference, positive when `other` is later. Supports millisecond, second, minute, hour, day/date, week, month, quarter, and year, including plurals.
- `s.diff(other) → Diff` — independent totals for milliseconds, seconds, minutes, hours, days, weeks, months, quarters, and years; do not sum them.
- `s.since(other?) → Since` — describe `other` relative to `s`; defaults to now. Earlier receiver and later argument gives `'in …'`.
- `s.from(other) → Since` — describe `s` relative to `other`; reverses `since`'s direction, **not an alias**.
- `s.fromNow() → Since` — describe `s` relative to now; takes no argument.
- `Since` — object with `diff` (component counts), `rounded`, `qualified`, `precise` (strings), `abbreviated` (string array), `iso` (duration string), and `direction` (`'past'`, `'present'`, or `'future'` in English).
- Invalid comparisons — boolean results above assume valid inputs; some comparison paths return `null`. Check `isValid()` first.

## Formatting and inspection

- `s.format(nameOrTemplate) → string` — named output such as `'iso-short'` or a template such as `'{iso-year}-{iso-month}-{date-pad}'`; `format('json')` returns an object instead.
- `s.unixFmt(pattern) → string` — supported Unicode-style tokens, such as `'yyyy.MM.dd h:mm a'`; `MM` is numeric month, `MMM` is abbreviated name. See [formatting](./docs/formatting.md).
- `s.toNativeDate() → Date` — native Date at the same epoch; native Dates do not retain the IANA timezone.
- `s.isValid() → boolean` — whether the resulting date is valid; not strict validation of the original input.
- `s.leapYear() → boolean` — whether this year is a leap year.
- `s.daysInMonth() → number` — 28, 29, 30, or 31.
- `s.progress(unit) → number` — elapsed fraction through a supported unit, rounded to two decimal places, from 0 to 1.
- `s.progress() → Progress` — fractions for year, season, quarter, month, week, day, quarterHour, hour, and minute.
- `s.isAwake() → boolean` — hour is 8 through 22 inclusive.
- `s.isAsleep() → boolean` — inverse of `isAwake`.
- `s.log() → s` — log a readable date; returns the same instance.
- `s.logYear() → s` — log a date including the year; returns the same instance.

## Configuration, aliases, and deprecated members

- `s.weekStart(day) → s` — **mutates** the instance's week boundary; takes 0–6 or a weekday name. Clone first to preserve the original configuration.
- `s.i18n(words) → s` — **changes shared language data** for all instances in this loaded library. Accepts day/month names, AM/PM markers, and other language settings; see [plugins](./docs/plugins.md).
- `s.inDST()` — alias of `isDST()`.
- `s.plus(amount, unit)` / `s.minus(amount, unit)` — runtime aliases of `add` / `subtract`.
- `s.hour24(...)` / `s.h24(...)` — runtime aliases of `hour`; `s.h12(...)` aliases `hour12`.
- `s.milliseconds(...)`, `s.seconds(...)`, `s.minutes(...)`, `s.hours(...)`, `s.days(...)` — runtime aliases of the corresponding singular methods; `days` means **weekday**, not day of month.
- `s.millenium(...)` — legacy spelling of `millennium`.
- `spacetime.plugin(methods)` — runtime alias of `spacetime.extend(methods)`.
- `s.toLocalDate()` — deprecated alias of `toNativeDate()`.
- `s.d` — internal Date view; use `toNativeDate()` instead.

## Reference sources

- [API inventory](./api/index.js) — method catalog; this page corrects stale descriptions such as offset units and `from` direction using the implementation.
- [Instance types](./types/types.d.ts), [constructor types](./types/constructors.d.ts), and [units/formats](./types/constraints.d.ts) — editor and TypeScript declarations. Some signatures lag runtime behavior: `fromNow` takes no argument, `dayOfYear` returns a number, `progress(unit)` returns a number, and several optional arguments and aliases are missing.
