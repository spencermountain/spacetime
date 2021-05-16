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
  <a href="https://bundlephobia.com/result?p=spacetime@latest">
    <img src="https://badge-size.herokuapp.com/spencermountain/spacetime/master/builds/spacetime.min.js" />
  </a>
</div>

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

Isn't it weird how we can do <i>math</i> in our head, but not <b><i>date math</i></b>?

<div align="left">
<div >
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/><i>- how many days until the end of the year?</i>
</div>
<div >
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/><i>-what time was it, 11 hours ago?</i>
</div>
<div >
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/><i>-is it lunchtime in france?</i>
</div>
</div>

<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

and worse - there is no real **_date calculator_**.

<div align="center">
  <sub>people end up asking google, and going to weird websites.</sub>
</div>

<img height="10px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<div align="center"><sub>that's bad.</sub></div>

<img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<b>spacetime</b> is a date-calculator,

<div >
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/><sub>It's very small, and very handy.</sub>
</div>

```js
let s = spacetime.now()

s.diff(s.endOf('year'), 'days')
// 292

s.minus(11, 'hours').time()
// 6:50am

s = s.now('Europe/Paris')
s.isAfter(s.time('11:00am'))
// true 🥐
```

<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

- calculate time in remote timezones
- support **daylight savings**, **leap years**, and **hemispheres**
- [Moment-like API](https://beta.observablehq.com/@spencermountain/spacetime-api) _(but immutable)_
- Orient time by quarter, season, month, week..
- _Zero Dependencies_ - (no _[Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)_)
- weighs about 40kb.
- has a cool _[plugin thing](https://observablehq.com/@spencermountain/spacetime)_.

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

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

<!-- spacer -->
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

`npm install spacetime`

```js
const spacetime = require('spacetime')
let d = spacetime.now('Europe/Paris')
d.dayName()
//'Wednesday'
d.isAsleep()
//true
```

<sub><i>typescript / babel / deno:</i></sub>

```ts
import spacetime from 'spacetime'
let d = spacetime.now()
d.format('nice')
//'Apr 1st, 4:32pm'
```

<div align="right">
  <a href="https://github.com/spencermountain/spacetime/wiki/Typescript">ts docs</a>
</div>

<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

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
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

  <div>
    <img width="550" src="https://user-images.githubusercontent.com/399657/50862221-1d904a00-1369-11e9-891c-5f4e9fbb9ec0.gif" />
  </div>

  <img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

 </div>

<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

plugins:

 <div align="center">
    <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/geo">spacetime-geo</a>
    • <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/daylight">spacetime-daylight</a>
    • <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/age">spacetime-age</a>
  </div>
  <div align="center">
    <a href="https://github.com/spencermountain/somehow-calendar">somehow-calendar</a>
    • <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/week-of-month">week-of-month</a>
    • <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/week-start">week-start</a>
  </div>

<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Date Inputs:

we can parse _[all the normal stuff](https://github.com/spencermountain/spacetime/wiki/Input)_, and some fancy stuff:

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
s = spacetime.min() // the earliest-possible date (271,821 bc)
s = spacetime.max() // the furthest-possible future date (27k years from now)

// To get the native Date object back
// NOTE: this returns the date in the local browsers timezone
jsDate = spacetimeDate.toNativeDate()
```

for fancier natural-language inputs, use [compromise-dates](https://github.com/spencermountain/compromise/tree/master/plugins/dates).

<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Get & Set dates:

you can whip things around, but stay intuitive

```js
s.date() // 14
s.year() // 2017
s.season() // Spring
s = s.hour(5) // Change to 5am
s = s.date(15) // Change to the 15th

s = s.day('monday') // Change to (this week's) monday
s = s.day('monday', true) // go forward to monday
s = s.day('monday', false) // go backward to monday

s = s.month('march') // Change to (this year's) March 1st
s = s.quarter(2) // Change to April 1st
s.era() // 'BC'/'AD'
s.decade() // 2000
s.century() // 21

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

// fill-in all dates between a range
s.every('week', 'Jan 1st 2020') // (in tz of starting-date)

//utilities:
s.clone() // Make a copy
s.isValid() // Sept 32nd → false
s.isAwake() // it's between 8am → 10pm
s.json() // get values in every unit as key-val object
```

if it's **_9am on tuesday_**, and you <i>add a week</i>, it will still be 9am on tuesday.
... even if some crazy changes happen.

setter methods also support a handy 2nd param that controls whether it should be set forward, or backward.

```js
s = s.time('4:00pm') // 4pm today
s = s.time('4:00pm', true) // the next 4pm in the future
s = s.time('4:00pm', false) // the most-recent 4pm

s = s.set('march 5th 2020')
s = s.set('march 4th') // 2020 (same year)
s = s.set('march 4th', true) // 2021
s = s.set('march 6th', false) // 2019
```

it's actually a little surprising how helpful this is.

<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Comparisons:

```js
let s = spacetime([2017, 5, 2])
let start = s.subtract(1, 'milliseconds')
let end = s.add(1, 'milliseconds')

// gt/lt/equals
s.isAfter(d) // True
s.isEqual(d) // False
s.isBefore(d) // False
s.isBetween(start, end, inclusive?) // True

// Comparison by unit
s.isSame(d, 'year') // True
s.isSame(d, 'date') // False
s.diff(d, 'day') // 5
s.diff(d, 'month') // 0

//make a human-readable diff
let before = spacetime([2018, 3, 28])
let now = spacetime([2017, 3, 28]) //one year later
now.since(before)
// {diff: { months: 11, days: 30, ...},  rounded: 'in 12 months'  }
```

all comparisons are done with sensitivity of timezone - **_8am EST_** is < **_8am PST_**.

<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Timezones:

the best way to describe a timezone is an [IANA code](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones):

```js
// Roll into a new timezone, at the same moment
s = s.goto('Australia/Brisbane')
```

if you want to support relaxed timezone names like `'EST'`, `Eastern time`, use [timezone-soft](https://github.com/spencermountain/timezone-soft/)

```js
spacetime.extend(require('timezone-soft'))

s = s.goto('milwaukee') // 'America/Chicago'
s = s.goto('-7h') // UTC-7
s = s.goto('GMT+8') // -8h!
// (these should be used with some caution)
```

play-around with timezones, and their DST-changes:

```js
//list timezones by their current time
spacetime.whereIts('8:30pm', '9:30pm') // ['America/Winnipeg', 'America/Yellowknife'... ]
spacetime.whereIts('9am') //(within this hour)

// Timezone metadata
s.timezone().name // 'Canada/Eastern' (either inferred or explicit)
s.hemisphere() // North
s.timezone().current.offset // -4 (in hours)
s.hasDST() // True
s.isDST() // True

//list all timezones
spacetime.timezones()
```

you can flip-around the world pretty quick.

spacetime will use your local timezone, by default:

`.goto(null)` will pluck your current tz safely from your browser or computer.

```js
spacetime().time('4:30pm').goto('Europe/Paris').goto(null).time()
// 4:30pm
```

<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

### Date Formatting:

it's _[a pretty-sensible process](https://github.com/spencermountain/spacetime/wiki/Formatting)_ to create nice-looking dates:

```js
// Date + time formatting
s.format('time') // '5:01am'
s.format('numeric-uk') // 02/03/2017
s.format('month') // 'April'
s.format('month-short') // 'Apr'
s.format('month-pad') // '03'
s.format('iso-month') // '04'

//if you want more complex formats, use {}'s
s.format('{year}-{date-pad}-{month-pad}') // '2018-02-02'
s.format("{hour} o'clock") // '2 o'clock'
s.format('{time}{ampm} sharp') // '2:30pm sharp'

//if you prefer, you can also use unix-formatting
s.unixFmt('yyyy.MM.dd h:mm a') // '2017.Nov.16 11:34 AM'
```

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

## Limitations & caveats

#### ◆ Historical timezone info

DST changes move around all the time, and timezones pop-in and out of existence.
We store and use only the latest DST information, and apply it to historical dates.

#### ◆ International date line

`.goto()` never crosses the date-line. This is mostly the intuitive behaviour.

But if you're in `Fiji` (just west of the date line), and you go to `Midway` (just east of the date line), .goto() will subtract a bunch of hours, instead of just adding one.

#### ◆ Destructive changes

if it's `2:30pm` and you add a month, it should still be `2:30pm`. Some changes are more destructive than others. Many of thse choices are subjective, but also sensible.

#### ◆ 0-based vs 1-based ...

for better or worse we copy the JavaScript spec for 0-based months, and 1-based dates.

ISO-formatting is different, so keep on your toes.

see [more considerations and gotchas](https://github.com/spencermountain/spacetime/wiki)

#### Daylight-savings gotchas

We've written in detail about how spacetime handles Daylight-savings changes [here](https://observablehq.com/@spencermountain/spacetime-daylight-savings-time?collection=@spencermountain/spacetime)

Fall DST changes have an hour that is repeated twice. There are a lot of tricky situations that come from this.
Add 10 minutes at `1:55am`, and a spacetime diff may show `-50mins`. Within an hour of this change, some spacetime methods may be off-by-one hour.

Springtime DST changes are generally smoother than Fall ones.

<!-- spacer -->
<div align="center">
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221632-b9094000-ffb7-11e9-99e0-b48edd6cdf8a.png"/>
</div>

### Config:

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

#### Configure 'today' context:

spacetime makes some assumptions about some string inputs:

```js
// assumes start of month
let s = spacetime('June 1992')
s.date() // 1

// assumes current year
let s = spacetime('June 5th')
s.year() // 2020 (or whatever it is now)

// assumes Jan 1st
let s = spacetime('2030')
s.month() // 'January'
```

you can configure this assumed date (usually for testing) by passing it in as an option:

```js
let today = {
  month: 3,
  date: 4,
  year: 1996
}
let s = spacetime('June 5th', null, { today: today })
s.year() // 1996
```

it also works for `spacetime.now(tz, {today:today})` and others.

#### Extending/Plugins:

you can throw any methods onto the Spacetime class you want, with `spacetime.extend()`:

```js
spacetime.extend({
  isHappyHour: function () {
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

#### DD/MM/YYY interpretation:

by default spacetime uses the American interpretation of ambiguous date formats, like javascript does:

```js
spacetime('12/01/2018') //dec 1st

// unless it's clear (>12):
spacetime('13/01/2018') //jan 13th
```

you can change this behaviour by passing in a `dmy` option, like this:

```js
spacetime('12/01/2018', null, { dmy: true }) //jan 12th
```

this format is more common in [britain, and south america](https://en.wikipedia.org/wiki/Date_format_by_country).

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
  },
  useTitleCase: true // automatically in .format()
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

<!-- spacer -->
<div align="center">
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
</div>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>

#### See also:

- [luxon](https://moment.github.io/luxon/) - a small library from the clever moment people
- [date-fns](https://date-fns.org/) - an battle-hardened client-side Date utility
- [sugarjs/dates](https://sugarjs.com/dates/) - well-made date fns + timezone math
- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) - some _[sorta-green](https://caniuse.com/#feat=internationalization)_ in-browser date utilities

thank you to the amazing [timeanddate.com](https://www.timeanddate.com/)

Apache 2.0
