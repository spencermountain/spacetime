
## Comparisons

```js
s.isAfter(d)                 // boolean   (d is Spacetime | Date | ParsableDate)
s.isBefore(d)
s.isEqual(d)                 // exact same millisecond
s.isBetween(start, end, inclusive?) // inclusive defaults to false
s.isSame(d, 'year')          // same calendar year? (also 'date','week','month'...)
s.diff(d, 'day')             // integer count of that unit between the two
s.diff(d)                    // => Diff object: {years, months, weeks, days, hours, ...}
```

All comparisons are timezone-sensitive: 8am EST is *before* 8am PST.

### Human-readable differences

```js
now.since(before)  // => Since object
// {
//   diff: { months: 11, days: 30, ... },
//   rounded: 'in 12 months',
//   qualified, precise, abbreviated: [...],
//   iso: 'P...', direction: 'past' | 'present' | 'future'
// }
```

`from(date)` is an alias of `since`. `fromNow(date)` compares against now.

### Iterating a range

```js
s.every('week', 'Jan 1st 2020')   // => Spacetime[] every week up to that date
s.each('day', endDate)            // => Spacetime[] (in tz of the starting date)
```
