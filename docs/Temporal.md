# Spacetime and Temporal

There are two ways to use Temporal with Spacetime:

- **`spacetime`** accepts native Temporal objects and converts back with
  `.toTemporal()`, while keeping Spacetime's own timezone engine.
- **`spacetime/temporal`** is an experimental wrapper that uses Temporal for
  calendar arithmetic and timezone calculations, with a smaller Spacetime API.

Both require `globalThis.Temporal` for Temporal operations. No polyfill is
bundled; if needed, the application must provide one on `globalThis` and use
objects from that implementation. Regular Spacetime still works without Temporal;
constructing with `spacetime/temporal` requires it.

## Using Temporal objects with regular Spacetime

```js
import spacetime from 'spacetime'

const native = Temporal.ZonedDateTime.from(
  '2024-11-03T01:30:00.123-05:00[America/New_York]'
)
const s = spacetime(native)

s.epoch === native.epochMilliseconds // true
s.toTemporal()                      // Temporal.ZonedDateTime
spacetime(native, 'Asia/Tokyo')       // same instant, different zone
```

Prefer passing a `ZonedDateTime` directly: it carries both the instant and zone,
including the selected occurrence of a repeated DST hour. For strict parsing or
custom DST disambiguation, resolve the value in Temporal before passing it in.

| Native input | Interpretation |
| --- | --- |
| `ZonedDateTime` | Keeps epoch milliseconds and inherits its zone unless another is supplied. |
| `Instant` | Keeps epoch milliseconds in the supplied or local zone. |
| `PlainDateTime` | Resolves the local clock in the supplied or local zone. |
| `PlainDate` | Resolves the beginning of the date in the supplied or local zone. |

Incomplete types such as `PlainTime` and `Duration` produce invalid instances.
Non-ISO calendars are converted to ISO; calendar identity is not retained.

Regular Spacetime uses millisecond precision and its bundled timezone rules.
Temporal uses the runtime's rules, so historical times and DST results can differ,
and Spacetime may reject zones missing from its database. `.toTemporal()` preserves
stored epoch milliseconds and recomputes the local clock using Temporal's rules.
Use native Temporal for arithmetic when those rules must be authoritative.

Regular `.isoFull()` and `.format('iso-full')` use Spacetime's own formatting.
Use `.toTemporal().toString()` for native serialization. Annotated strings parsed
by regular Spacetime do not guarantee Temporal's offset validation or repeated-hour
selection; pass a native object for reliable transfers.

`.toTemporal()` throws if Temporal is unavailable, and returns `null` for invalid
Spacetime instances when Temporal is available.

## Using the Temporal-backed entry

```js
import spacetime from 'spacetime/temporal'

const s = spacetime('March 1 2012 3:22pm', 'America/New_York')
s.format('{day-short} {month} {date-ordinal}, {time}')
// 'Thu March 1st, 3:22pm'

s.add(1, 'day').format('iso-short') // '2012-03-02'
s.hour(9).time()                  // '9:22am'
s.goto('America/Los_Angeles')     // same instant
s.timezone('America/Los_Angeles') // same wall clock
s.toTemporal()                   // Temporal.ZonedDateTime
```

This entry reuses Spacetime's parsers and formatters without bundling its timezone
database. It supports common constructors, getters/setters, arithmetic,
comparisons, `diff`, `startOf`, `endOf`, `next`, `last`, and formatting.
Months remain zero-based, dates one-based, and numeric epochs use milliseconds.
Most methods return new instances; `epochSeconds(value)` and `weekStart(value)`
mutate the receiver. Use explicit timezones for reproducible results.

Calendar days preserve the local clock where possible; hours measure elapsed time:

```js
const s = spacetime('2024-03-09T12:00:00', 'America/New_York')
s.add(1, 'day').time()    // '12:00pm' — 23 hours later
s.add(24, 'hours').time() // '1:00pm'
```

DST gaps move forward and overlaps default to the earlier occurrence. Use IANA
names or fixed offsets such as `'+05:30'`; city-only names are unsupported.

### Main limitations

- This is a proof of concept, not a complete replacement. Relative-time prose
  (`since`, `fromNow`), interval enumeration (`every`), named seasons, timezone
  discovery/DST metadata, and `i18n` are not implemented. Plugins must use the
  supported methods.
- ISO/Gregorian workflows are supported. Non-ISO inputs are normalized to ISO.
  Use native Temporal for other calendars or its full options surface.
- `.week()` uses ISO week numbers. Legacy setter, alias, and error behavior may
  differ. `progress` and `nearest` require an explicit supported unit.
- `.toTemporal()` and `.format('iso-full')` retain native precision; `.epoch`,
  `.iso()`, `.json()`, and JavaScript Date conversion use milliseconds.
- Rejected inputs produce invalid instances; check `.isValid()`.
  `.toTemporal()` returns `null` for invalid instances. Unsupported arithmetic
  or boundary units return an unchanged clone; absent methods throw.

The entry includes separate TypeScript declarations referencing `esnext.temporal`;
use a compiler that provides that library. Types do not supply runtime support.

Run `pnpm test:temporal` for focused checks and `pnpm test:temporal:types` for
its declarations. `pnpm test:temporal:all` audits legacy compatibility and is
expected to report unsupported features.
