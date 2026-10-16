# Changing values

Import `spacetime` as shown in the [usage guide](./README.md).

## Set a specific unit

These setters return a new object. Capture the result to keep the change.

```js
const s = spacetime('2024-06-15T14:30:00', 'UTC')
s.hour(5).time() // '5:30am' (minutes preserved)
s.date(10).date() // 10
s.month('march').format('iso-short') // '2024-03-15' (day preserved)
s.quarter(2).iso() // '2024-04-01T00:00:00.000Z'
s.time('4:30pm').time() // '4:30pm'
s.set('march 5th 2020').format('iso-short') // '2020-03-05'
s.time() // '2:30pm' (original unchanged)
```

`set(input, timezone?)` parses a new input. Its second argument is a timezone
string, **not** a direction boolean. For an existing date, use `goto(tz)` or
`timezone(tz)` according to the [timezone guide](./timezones.md).

## The `goForward` argument

Unit setters such as `day`, `month`, `date`, `hour`, and `time` accept a boolean
second argument: `true` moves forward if the result would be earlier; `false`
moves backward if it would be later. Equality is allowed; this does not mean
“strictly next.” Without it, `day()` shifts by weekday number without choosing
the nearest occurrence or consulting `weekStart`.

```js
const s = spacetime('2024-01-03T17:00:00', 'UTC') // Wednesday
s.day('monday').format('iso-short') // '2024-01-01'
s.day('monday', true).format('iso-short') // '2024-01-08'
s.day('monday', false).format('iso-short') // '2024-01-01'
s.time('4:00pm', true).iso() // '2024-01-04T16:00:00.000Z'

const monday = spacetime('2024-01-01T09:00:00', 'UTC')
monday.day('monday', true).epoch === monday.epoch // true
```

## Add, subtract, and round

```js
let s = spacetime('2024-01-15T14:37:00', 'UTC')
s = s.add(1, 'week')
s = s.subtract(2, 'months').add(1, 'day') // capture each chain's result
s.startOf('day').time() // '12:00am'
s.endOf('quarter').iso() // '2023-12-31T23:59:59.999Z'
s.next('month').format('iso-short') // '2023-12-01'
s.last('year').format('iso-short') // '2022-01-01'
s.nearest('hour').time() // '3:00pm'
s.nearest('quarterHour').time() // '2:30pm'
```

Whole calendar-day and week arithmetic preserve clock time across DST where that time
exists. Hours measure elapsed time. See [edge cases](./README.md#edge-cases).

### Fractional arithmetic

`add` and `subtract` accept decimal amounts, including negative values:

```js
const s = spacetime('2020-06-15T00:00:00', 'UTC')
s.add(2.5, 'days').iso() // '2020-06-17T12:00:00.000Z'
s.add(0.5, 'month').iso() // '2020-06-29T00:00:00.000Z'
```

Results round to a smaller unit boundary, clearing smaller fields:

| Input unit | Result precision |
| --- | --- |
| `second` | Millisecond |
| `minute` | Second |
| `hour`, `quarterHour` | Minute |
| `day` / `date` | Hour |
| `week`, `month`, `quarter`, `season`, `year` | Day (midnight) |

Fractional days use elapsed time: half a day is 12 hours, even across DST.
For months through years, the whole part uses calendar arithmetic first, then
the fraction uses the resulting unit's duration. Fractional months are the
exception: they use 28 days, so half a month is always 14 days. Fractional
decades, centuries, and millennia convert to years first.

Rounding happens on every call: `0.1` day rounds to two hours, so ten additions
produce 20 hours. Two half-month additions produce 28 days, not a calendar month.
Combine amounts in one call to avoid accumulating rounding differences.

## Units depend on the method

Common arithmetic units include `millisecond`, `second`, `minute`, `quarterHour`,
`hour`, `day` (alias `date`), `week`, `month`, `quarter`, `season`, `year`,
`decade`, `century`, and `millennium`. Arithmetic accepts plurals such as `days` and `months`.
Do not assume every method implements every `TimeUnit` from the TypeScript union.

See the [API reference](./API.md#arithmetic-and-boundaries) for supported units
and [comparisons](./comparisons.md) for differences and iteration.

See [mutation exceptions](./README.md#mutation-and-shared-state) for
`epochSeconds(value)` and configuration methods.
