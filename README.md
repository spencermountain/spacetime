<div align="center">
  <div>
    <img width="277" alt="spacetime logo" src="https://user-images.githubusercontent.com/399657/31140478-80a4269a-a842-11e7-8dbf-b541fe3e87a7.png">
  </div>

  <a href="https://www.codacy.com/app/spencerkelly86/spacetime">
    <img src="https://api.codacy.com/project/badge/grade/02bb9cd9afa74d5787b9d28095b1230e" />
  </a>

  <a href="https://npmjs.org/package/spacetime">
    <img src="https://img.shields.io/npm/v/spacetime.svg?style=flat-square" />
  </a>

  <a href="https://www.codacy.com/app/spencerkelly86/spacetime">
    <img src="https://api.codacy.com/project/badge/Coverage/02bb9cd9afa74d5787b9d28095b1230e" />
  </a>

  <a href="https://app.codeship.com/projects/211003">
    <img src="https://app.codeship.com/projects/6e9dace0-f88b-0134-515a-7e4075ae1ca2/status?branch=master" />
  </a>
</div>

### A simple way to manipulate, compare, and format dates and times across the Earth
- **Get/set** dates and times in remote timezones
- Global support for **Daylight Savings Time**, **leap years + seconds**, and **hemispheres**
- Orient by quarter, season, month, and week
- Remote date comparison
- Written in **ES2015 JS**, published as **ES5**, tested for Node and the browser
- **Weighs in at just 35KB** _(12KB compressed)_
- Heavily tested, Apache 2.0 licensed
- Made by your friends at [Begin](https://begin.com)

# Install
`npm install spacetime --save`

```js
var spacetime=require('spacetime')
```

### [Date Inputs](https://github.com/smallwins/spacetime/wiki/Input)
```js
s = spacetime(1489520157) // Epoch
s = spacetime([2017, 5, 2]) // yyyy, m, d (zero-based months, 1-based days)
s = spacetime('July 2, 2017 5:01:00') // ISO

// All inputs accept a timezone, as 2nd param:
s = spacetime(1489520157, 'Canada/Pacific')
s = spacetime('2019/05/15', 'Canada/Pacific')

// Some helpers
s = spacetime.now()
s = spacetime.today() // This morning
s = spacetime.tomorrow() // Tomorrow morning
```

### Get & Set date info
```js
s.date() // 14
s.year() // 2017
s.season() // Spring
s.hour(5) // Change to 5am
s.date(15) // Change to the 15th
s.day('monday') // Change to (this week's) monday
s.month('march') // Change to (this year's) March 1st
s.quarter(2) // Change to April 1st
s.era() // 'BC'/'AD'

// Percentage-based information
s.progress().month = 0.23 // We're a quarter way through the month
s.progress().day = 0.48   // Almost noon
s.progress().hour = 0.99  // 59 minutes and 59 seconds

s.nearest('hour')//round up/down to the hour
s.nearest('quarter-hour')//5:15, 5:30, 5:45..

// Add/subtract methods
s.add(1, 'week')
s.add(3, 'quarters')
s.subtract(2, 'months').add(1,'day')

// start-of/end-of
s.startOf('day') // 12:00am
s.startOf('month') // 12:00am, April 1st
s.endOf('quarter') // 11:59:59pm, June 30th

//utilities:
s.clone() // Make a copy
s.isValid() // Sept 32nd → false
```

### Comparison between Dates
```js
let d = spacetime([2017, 5, 2])
let start = s.clone()
let end = s.clone()
start.subtract(1, 'milliseconds')
end.add(1, 'milliseconds')

// gt/lt/equals
s.isAfter(d) // True
s.isEqual(d) // False
s.isBefore(d) // False
s.isBetween(start, end) // True

// Comparison by unit
s.isSame(d, 'year') // True
s.isSame(d, 'date') // False
s.diff(d, 'day') // 5
s.diff(d, 'month') // 0
```

### Timezone info
```js
// Roll into a new timezone, at the same moment
s.goto('Australia/Brisbane')

//list timezones by their current time
spacetime.whereIts('8:30pm','9:30pm') // ['America/Winnipeg', 'America/Yellowknife'... ]
spacetime.whereIts('9am') //(within this hour)

// Timezone metadata
s.timezone().name // 'Canada/Eastern' (either inferred or explicit)
s.hemisphere() // North
s.timezone().current.offset // -240 (in minutes)
s.hasDST() // True
s.isDST() // True
```

### [Date Formatting](https://github.com/smallwins/spacetime/wiki/Formatting)
```js
// Date + time formatting
s.format('time') // '5:01am'
s.format('numeric-uk') // 02/03/2017
s.format('month') // 'April'
s.format('month-short') // 'Apr'

//also (mostly) supports weird unix-formatting, for more complex templating
s.format('yyyy.MM.dd h:mm a')// '2017.Nov.16 11:34 AM'
```
####Custom language
```js
a.i18n({
  days: {
    long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    short: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
  },
  months: {
    long: [...],
    short: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  }
});
a.format('day') //'Sábado'
```

### [More info, considerations, & caveats](https://github.com/smallwins/spacetime/wiki)
<div align="center">
  <a href="https://twitter.com/begin">
    <img width="50" src="https://user-images.githubusercontent.com/399657/31141177-9f339dc8-a844-11e7-8330-0cee2dc12128.jpg"/>
  </a>
  <div>
    MIT
  </div>
</div>
