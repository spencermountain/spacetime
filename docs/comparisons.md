# Comparisons

Import `spacetime` as shown in the [usage guide](./README.md).

```js
const a = spacetime('2024-01-01', 'UTC')
const b = spacetime('2024-01-02', 'UTC')
a.isBefore(b) // true
a.isAfter(b) // false
a.isEqual(b) // false (compares the exact millisecond)
a.isBetween(a, b) // false (endpoints excluded by default)
a.isBetween(a, b, true) // true (endpoints included)
a.isSame(b, 'month') // true
a.diff(b, 'day') // 1
b.diff(a, 'day') // -1
a.diff(b).hours // 24
```

`isBefore`, `isAfter`, and `isEqual` compare instants. `isSame(other, unit)`
compares calendar fields after converting `other` to the receiver's timezone;
pass `false` as its third argument to compare each date's own local fields.
Use valid Spacetime objects for predictable comparisons. These methods do not
all have identical input or invalid-value handling.

`diff(other)` returns totals for each unit: `years`, `quarters`, `months`,
`weeks`, `days`, `hours`, `minutes`, `seconds`, and `milliseconds`. These are
alternative measurements, not components to sum. `diff(other, unit)` returns
one integer total; the sign is positive when `other` is later.

## Human-readable differences

```js
const a = spacetime('2024-01-01', 'UTC')
const b = spacetime('2024-01-02', 'UTC')
a.since(b).rounded // 'in 1 day'
a.from(b).rounded // '1 day ago'
b.since(a).direction // 'past'
a.since(a).direction // 'present'
```

`since(other)` describes `other` relative to the receiver. `from(other)`
reverses that direction. `fromNow()` takes no argument and describes the
receiver relative to the current time; `since()` describes now relative to the
receiver.

Both return an object with `diff` (component counts), `rounded`, `qualified`,
and `precise` (strings), `abbreviated` (an array), `iso` (a duration string),
and `direction` (`'past'`, `'present'`, or `'future'` in default English).

## Iterating a range

```js
const start = spacetime('2024-01-01', 'UTC')
const end = spacetime('2024-01-04', 'UTC')
start.every('day', end).map(s => s.format('iso-short'))
// ['2024-01-01', '2024-01-02', '2024-01-03']
start.every('day', end, 2).map(s => s.format('iso-short'))
// ['2024-01-01', '2024-01-03']
```

`each` is an alias of `every(unit, end, stepCount = 1)`. Use a positive integer
step. The end is excluded; a start on a unit boundary can be included. Reversed
ranges are iterated chronologically. See [range edge cases](./edge-cases.md#range-boundaries).
