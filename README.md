<div align="center">
  <div>
    <img width="277" alt="spacetime logo" src="https://user-images.githubusercontent.com/399657/31140478-80a4269a-a842-11e7-8dbf-b541fe3e87a7.png">
  </div>

  <a href="https://npmjs.org/package/spacetime">
    <img src="https://img.shields.io/npm/v/spacetime.svg?style=flat-square" />
  </a>
  <a href="https://codecov.io/gh/spencermountain/spacetime">
    <img src="https://codecov.io/gh/spencermountain/spacetime/branch/master/graph/badge.svg" />
  </a>
  <a href="https://unpkg.com/spacetime/builds/spacetime.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/spacetime/master/builds/spacetime.min.js" />
  </a>
  <hr/>
</div>

- calculate time in remote timezones
- support **daylight savings**, **leap years**, and **hemispheres**
- [Moment-like](https://beta.observablehq.com/@spencermountain/spacetime-api) 💘 API (but immutable!)
- Orient time by quarter, season, month, week..
- _Zero Dependencies_ - (no [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl))
- **only 50KB**.

```html
<script src="https://unpkg.com/spacetime"></script>
<script>
  var d = spacetime('March 1 2012', 'America/New_York')
  //set the time
  d = d.time('4:20pm')

  d = d.goto('America/Los_Angeles')
  d.time()
  //'1:20pm'
</script>
```

`npm install spacetime`

```js
const spacetime = require('spacetime')
let d = spacetime.now('Europe/Paris')
d.dayName()
//'Wednesday'
d.isAsleep()
//true
```

Or with Typescript

```ts
import spacetime from 'spacetime'
let d = spacetime.now()
d.format('nice')
//'Apr 1st, 4:32pm'
```

<div align="center">
  <h3>
    <a href="https://beta.observablehq.com/@spencermountain/spacetime">
      Demo
    </a>
    &nbsp; &nbsp; • &nbsp; &nbsp;
    <a href="https://beta.observablehq.com/@spencermountain/spacetime-api">
      Full API
    </a>
  </h3>
  <div>
    <img width="550" src="https://user-images.githubusercontent.com/399657/50862221-1d904a00-1369-11e9-891c-5f4e9fbb9ec0.gif" />
  </div>
  <div>
    <a href="https://github.com/spencermountain/spacetime-geo">spacetime-geo</a>
    • <a href="https://github.com/spencermountain/spacetime-daylight">spacetime-daylight</a>
    • <a href="https://github.com/spencermountain/sometime">spacetime-calendar</a>
    • <a href="https://github.com/spencermountain/spacetime-week">spacetime-week</a>
  </div>
</div>

### [Date Inputs:](https://github.com/smallwins/spacetime/wiki/Input)

```js
//epoch
s = spacetime(1489520157124)
//array [yyyy, m, d] (zero-based months, 1-based days)
s = spacetime([2017, 5, 2])
//iso
s = spacetime('July 2, 2017 5:01:00')

// All inputs accept a timezone, as 2nd param:
s = spacetime(1489520157124, 'Canada/Pacific')
s = spacetime('2019/05/15', 'Canada/Pacific')

// or set the offset right in the date-string (ISO-8601)
s = spacetime('2017-04-03T08:00:00-0700')
// 'Etc/GMT-7'

// Some helpers
s = spacetime.now()
s = spacetime.today() // This morning
s = spacetime.tomorrow() // Tomorrow morning
```

### Get & Set dates:

```js
s.date() // 14
s.year() // 2017
s.season() // Spring
s = s.hour(5) // Change to 5am
s = s.date(15) // Change to the 15th
s = s.day('monday') // Change to (this week's) monday
s = s.month('march') // Change to (this year's) March 1st
s = s.quarter(2) // Change to April 1st
s.era() // 'BC'/'AD'

// Percentage-based information
s.progress().month = 0.23 // We're a quarter way through the month
s.progress().day = 0.48 // Almost noon
s.progress().hour = 0.99 // 59 minutes and 59 seconds

// Add/subtract methods
s = s.add(1, 'week')
s = s.add(3, 'quarters')
s = s.subtract(2, 'months').add(1, 'day')

// start-of/end-of
s = s.startOf('day') // 12:00am
s = s.startOf('month') // 12:00am, April 1st
s = s.endOf('quarter') // 11:59:59pm, June 30th

s = s.nearest('hour') //round up/down to the hour
s = s.nearest('quarter-hour') //5:15, 5:30, 5:45..
s = s.next('month') //start of the next month
s = s.last('year') //start of the last year

//utilities:
s.clone() // Make a copy
s.isValid() // Sept 32nd → false
s.isAwake() // it's between 8am → 10pm
```

### Comparisons:

```js
let s = spacetime([2017, 5, 2])
let start = s.subtract(1, 'milliseconds')
let end = s.add(1, 'milliseconds')

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

//make a human-readable diff
let before = spacetime([2018, 3, 28])
let now = spacetime([2017, 3, 28]) //one year later
now.since(before)
/* {
    diff: {
      years: 0,
      months: 11,
      days: 30,
      hours: 23,
      minutes: 59,
      seconds: 59
    },
    rounded: 'in 12 months',
    qualified: 'in almost 12 months',
    precise: 'in 11 months, 30 days'
  }
*/
```

it's sometimes confusing how `.diff()` and `.since()` understand things:

```js
spacetime('January 1 2017').diff('December 30 2016', 'year')
// returns 1
spacetime('January 1 2017').since('December 31 2016').diff
// returns {years:0, months:0, days:1}
```

### Timezones:

```js
// Roll into a new timezone, at the same moment
s = s.goto('Australia/Brisbane')
```

this is the safest way to declare a timezone, using an [IANA name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

Spacetime also supports more informal timezone names, like:

```js
s = s.goto('Jamaica') // "America/Jamaica"
s = s.goto('Eastern Time') // "America/New_York"
s = s.goto('PST') // automatically becomes 'PDT' in the summer
s = s.goto('-7h') // UTC-7
s = s.goto('GMT+8') // -8h!
s = s.goto('bst') //"British summer time" +1 (sorry Bougainville!)
// (these should be used with some caution)
```

```js
//list timezones by their \ time
spacetime.whereIts('8:30pm', '9:30pm') // ['America/Winnipeg', 'America/Yellowknife'... ]
spacetime.whereIts('9am') //(within this hour)

// Timezone metadata
s.timezone().name // 'Canada/Eastern' (either inferred or explicit)
s.hemisphere() // North
s.timezone().current.offset // -4 (in hours)
s.hasDST() // True
s.isDST() // True

//list all timezones
s.timezones
```

### [Date Formatting](https://github.com/smallwins/spacetime/wiki/Formatting):

```js
// Date + time formatting
s.format('time') // '5:01am'
s.format('numeric-uk') // 02/03/2017
s.format('month') // 'April'
s.format('month-short') // 'Apr'
s.format('month-pad') // '04'

//if you want more complex formats, use {}'s
s.format('{year}-{date-pad}-{month-pad}') // '2018-02-02'
s.format("{hour} o'clock") // '2 o'clock'
s.format('{time}{ampm} sharp') // '2:30pm sharp'

//if you prefer, you can also use unix-formatting
s.unixFmt('yyyy.MM.dd h:mm a') // '2017.Nov.16 11:34 AM'
```

## Options

#### Ambiguity warnings:

javascript dates use millisecond-epochs, instead of second-epochs, like some other languages.
This is a common bug, and spacetime can warn if you set an epoch within January 1970.
to enable:

```js
let s = spacetime(123456, 'UTC', {
  silent: false
})
s.log() // "Jan 1st, 12:02am"
```

There is another situation where you may see a `console.warn` - if you give it a timezone, but then set a ISO-date string with a different offset, like `2017-04-03T08:00:00-0700` (-7hrs UTC offset).
It sets the timezone to UTC-7, but also gives a warning.

```js
let s = spacetime('2017-04-03T08:00:00-0700', 'Canada/Eastern', {
  silent: false
})
s.timezone().name // "Etc/GMT-7"
```

#### Extending/Plugins:

you can throw any methods onto the Spacetime class you want, with `spacetime.extend()`:

```js
spacetime.extend({
  isHappyHour: function() {
    return this.hour() === 16
  }
})

let s = spacetime.now('Australia/Adelaide')
s.isHappyHour()
//false

s = s.time('4:30pm')
s.isHappyHour()
//true
```

#### Custom languages:

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

#### Configure start of week:

by default, the start of the week is monday.

You can determine the week by the official country setting, with [spacetime-week](https://github.com/spencermountain/spacetime-week)

```js
let s = spacetime.now()
s = s.weekStart('sunday')

s = s.startOf('week')
s.dayName()
//sunday

s = s.endOf('week')
s.dayName()
//saturday
```

### [More info, considerations, & caveats](https://github.com/smallwins/spacetime/wiki)

### See also:

- [Luxon](https://moment.github.io/luxon/) - a small library from the clever moment people
- [date-fns](https://date-fns.org/) - an battle-hardened client-side Date utility
- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) - some pretty weird, but [mostly-supported](https://caniuse.com/#feat=internationalization) in-browser date utilities

Thank you to the amazing [timeanddate.com](https://www.timeanddate.com/)

<div align="center">
  <div>Made with caution + great-patience,</div>
  <div>by <a href="https://spencermountain.github.io/">Spencer Kelly</a>, and <a href="https://twitter.com/begin">SmallWins</a></div>
  <a href="https://begin.com">
    <img width="50" src="https://user-images.githubusercontent.com/399657/31141177-9f339dc8-a844-11e7-8330-0cee2dc12128.jpg"/>
  </a>
</div>

Apache 2.0
