
## Changing values

### Set a specific unit (returns a new object)

```js
s = s.hour(5)          // 5am
s = s.date(15)         // the 15th
s = s.month('march')   // March 1st of the same year (names accepted)
s = s.quarter(2)       // April 1st
s = s.day('monday')    // this week's Monday
s = s.time('4:30pm')
s = s.set('march 5th 2020')   // set() takes any ParsableDate
```

### The `goForward` 2nd argument (key feature)

Most setters accept a boolean 2nd arg controlling search direction when the
target is ambiguous:

```js
s = s.day('monday')         // nearest/this-week's monday
s = s.day('monday', true)   // the NEXT monday (forward in time)
s = s.day('monday', false)  // the most-recent monday (backward)

s = s.time('4:00pm', true)  // the next 4pm in the future
s = s.set('march 4th', true)// next year's march 4th if it's already past
```

### Add / subtract / round (returns a new object)

```js
s = s.add(1, 'week')
s = s.subtract(2, 'months').add(1, 'day')   // chainable, each step immutable
s = s.startOf('day')        // 12:00am today
s = s.endOf('quarter')      // 11:59:59.999pm of the quarter
s = s.next('month')         // start of next month
s = s.last('year')          // start of previous year
s = s.nearest('hour')       // round to nearest hour
s = s.nearest('quarterHour')// 5:15, 5:30, 5:45...
```

`add`/`subtract` preserve clock-time intuitively: 9am Tuesday + 1 week is still
9am Tuesday, even across DST.

### `TimeUnit` values (used by add, subtract, startOf, endOf, diff, next, last, nearest, round, isSame, each)

`millisecond, second, minute, quarterHour, hour, day, week, month, quarter,
season, year, decade, century, date` — **plural forms are also accepted**
(`days`, `months`, `quarters`, `centuries`, …). Use singular or plural
interchangeably.
