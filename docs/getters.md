## Reading values (getters)

```js
s.epoch // property: milliseconds since 1970 (number)
s.tz // property: IANA tz name string, e.g. 'america/denver'
s.year() // 2017
s.month() // 0-11   (NOT a name)
s.monthName() // 'april'
s.date() // 1-31   (day of month)
s.day() // 0-6    (day of week, Sunday=0)
s.dayName() // 'wednesday'
s.hour() // 0-23
s.hour12() // 0-11
s.minute() // 0-59
s.time() // '5:01am'
s.quarter() // 1-4
s.season() // 'spring' | 'summer' | 'fall'/'autumn' | 'winter'
s.week() // 1-52
s.dayOfYear() // 1-365
s.progress() // { day, hour, week, month, quarter, season, year, ... } each 0..1
s.json() // every unit as a key-value object
s.epochSeconds() // seconds (number) — note: METHOD, not .epoch
```

`progress` tells you how far through a unit you are: `s.progress().day === 0.5`
means noon; `s.progress().month === 0.23` means ~a quarter into the month.

## Boolean / convenience checks

```js
s.isValid() // false for impossible dates (e.g. Sept 32nd)
s.leapYear() // boolean
s.isAwake() // between 8am and 10pm
s.isAsleep() // between 10pm and 8am
s.daysInMonth() // 28/29/30/31
```



⚠️ **Deprecated:** the `.d` property (use `toNativeDate()`), `.toLocalDate()`.
