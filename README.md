<div align="center">
  <div>
    <a href="javascript:void(0);">
      <img width="277" alt="spacetime logo" src="https://user-images.githubusercontent.com/399657/31140478-80a4269a-a842-11e7-8dbf-b541fe3e87a7.png">
    </a>
  </div>

  <a href="https://npmjs.org/package/spacetime">
    <img src="https://img.shields.io/npm/v/spacetime.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=spacetime@latest">
    <img src="https://badgen.net/bundlejs/min/spacetime" />
  </a>
  <a href="https://www.npmchart.com/p/spacetime">
    <img src="https://badgen.net/github/dependents-repo/spencermountain/spacetime" />
  </a>
</div>

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

isn't it weird how we can do <i>math</i> in our head, but not <b><i>date-math</i></b>?

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

<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

and worse - there's no real **_date calculator_**?

<div align="center">
  <sub>people end up asking google, and going to weird websites.</sub>
</div>

<div align="center"><sub>that's bad.</sub></div>

<img height="15px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<b>spacetime</b> is a date-calculator

<div >
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/><sub>It's very small, and very handy.</sub>
</div>

```js
import spacetime from 'spacetime'
let s = spacetime.now()

// Days to the end of the year:
s.diff(s.endOf('year'), 'days')
// 292

// Time it was, 11 hours ago:
s.subtract(11, 'hours').time()
// 6:50am

// Is it lunchtime in France?
s = s.goto('Europe/Paris')
s.isBetween(s.time('11:00am'), s.time('2:00pm'))
// true 🥐
```

These results depend on when you run the example.

- calculate time in remote timezones
- support **daylight savings**, **leap years**, and **hemispheres**
- [Moment-like API](./docs/API.md) _(mostly immutable)_
- Orient time by quarter, season, month, week..
- _Zero Dependencies_ - timezone math uses bundled data; `Intl` is used only to detect your local timezone
- see the size badge above for the current minified bundle size
- has a cool _[plugin thing](https://observablehq.com/@spencermountain/spacetime)_.
- frequent updates for approaching DST changes
- [Temporal interoperability and an optional Temporal-backed entry](./docs/Temporal.md)

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<code>npm install spacetime</code>

<div align="right">
  <code>npx skills add spencermountain/spacetime</code>
  <div><i>(for computers)</i></div>
</div>

<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
<div align="center">
  <img height="50px" src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>
<img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

client-side:

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

typescript:

```ts
import spacetime, { type Spacetime } from 'spacetime'

const meeting: Spacetime = spacetime('2026-01-15T09:30:00', 'America/New_York')

const london = meeting.goto('Europe/London')
const time: string = london.time() // '2:30pm'
```

old node:

```js
const spacetime = require('spacetime')

let d = spacetime('2026-04-01T16:32:00', 'Europe/Paris')
d.dayName()
//'wednesday'
d.format('nice')
//'Apr 1st, 4:32pm'
```

<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

<div align="center">
  <h3>
    <a href="docs/">
      Docs
    </a>
    &nbsp; &nbsp; • &nbsp; &nbsp;
    <a href="https://spacetime.how/">
      Website
    </a>
    &nbsp; &nbsp; • &nbsp; &nbsp;
    <a href="docs/LLMs.md">
      Agent Docs
    </a>
    &nbsp; &nbsp; • &nbsp; &nbsp;
    <a href="https://observablehq.com/@spencermountain/spacetime">
      Demos
    </a>
  </h3>
  <img height="30px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

  <div>
    <img width="550" src="https://user-images.githubusercontent.com/399657/50862221-1d904a00-1369-11e9-891c-5f4e9fbb9ec0.gif" />
  </div>

  <img height="40px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

 </div>

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

## Temporal API adoption

The new [Date replacement API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) is [finally landing](https://caniuse.com/temporal), and may serve as a near-perfect replacement for this library.

If you want to get a Temporal object from spacetime, use `.toTemporal()`:

```js
const s = spacetime('june 8th 2021', 'America/Los_Angeles').time('16:22')
// pass to Temporal API
const dt = s.toTemporal() // (Temporal.ZonedDateTime)

// get time
let str = `${dt.hour}:${String(dt.minute).padStart(2, '0')}`
// 16:22

let tz = dt.timeZoneId
// "America/Los_Angeles"
```

No polyfill is bundled.

We also support their [cool new iso-format](https://www.rfc-editor.org/info/rfc9557/), so passing a date-time the other way is easy:

```js
let dt = Temporal.ZonedDateTime.from({
  timeZone: 'America/Los_Angeles',
  year: 2021,
  month: 7,
  day: 8,
  hour: 16,
  minute: 22
})
const fullIso = dt.toString()
// 2021-07-08T16:22:00-07:00[America/Los_Angeles]

// reproduce it in spacetime:
const s = spacetime(fullIso)
const time = s.format('time-24') // 16:22
const tz = s.format('iana') // America/Los_Angeles
```

You can also pass the native object directly: `spacetime(dt)`. This preserves the instant during repeated DST hours more reliably than parsing an annotated string.

To use Temporal for calendar arithmetic and timezone calculations, there is an experimental wrapper supporting a subset of the spacetime API. It requires `globalThis.Temporal`; see [supported methods and differences](./docs/Temporal.md):

```js
import spacetime from 'spacetime/temporal' // does not bundle the timezone database

let s = spacetime(`oct 9 '27`, 'America/New_York')
s = s.startOf('week').add(1, 'week')
const out = s.format('{month-short} {date-ordinal}')
// Oct 11th
```

<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

plugins:

 <div align="center">
    <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/geo">spacetime-geo</a>
    • <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/daylight">spacetime-daylight</a>
    • <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/age">space-age</a>
  </div>
  <div align="center">
    <a href="https://github.com/spencermountain/scal">spacetime-calendar</a>
    • <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/week-of-month">week-of-month</a>
    • <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/week-start">week-start</a>
    • <a href="https://github.com/spencermountain/spacetime/tree/master/plugins/start">spacetime-start</a>
  </div>

<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## Date Inputs:

we can parse _[all the normal stuff](./docs/inputs.md)_, and some fancy stuff:

```js
// epoch in milliseconds
s = spacetime(1489520157124)

//array [yyyy, m, d] (zero-based months, 1-based days)
s = spacetime([2017, 5, 2])

// Arrays can also include hour, minute, second, millisecond
s = spacetime([2017, 5, 2, 14, 30, 0, 0])

// Objects also use zero-based months
s = spacetime({ year: 2017, month: 5, date: 2, hour: 14, minute: 30, second: 0, millisecond: 0 })

// Native Date or an existing spacetime instance
s = spacetime(new Date('2017-06-02T14:30:00Z'))
const copy = spacetime(s)

// Unix timestamps in seconds have a separate helper
s = spacetime.fromUnixSeconds(1489520157)

// ISO date-time
s = spacetime('2017-07-02T05:01:00')

// All inputs accept a timezone, as 2nd param:
s = spacetime(1489520157124, 'Canada/Pacific')
s = spacetime('2019/05/15', 'Canada/Pacific')

// or set the offset right in the date-string (ISO-8601)
s = spacetime('2017-04-03T08:00:00-0700')
// s.timezone().name === 'Etc/GMT+7' (UTC-7; IANA reverses the sign)

// Some helpers
s = spacetime.now()
s = spacetime.today() // This morning
s = spacetime.tomorrow() // Tomorrow morning
s = spacetime.min('UTC') // -271821-04-20T00:00:00.000Z
s = spacetime.max('UTC') // maximum native Date instant: September 13, year 275760

// To get the native Date object back
// Same instant; native Date does not retain the spacetime timezone.
const jsDate = s.toNativeDate()
```

for fancier natural-language inputs, use [compromise-dates](https://github.com/spencermountain/compromise/tree/master/plugins/dates).

<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## Get & Set dates:

you can whip things around, but stay intuitive

```js
let s = spacetime('2017-04-14T05:01:00', 'UTC')
s.date() // 14
s.year() // 2017
s.season() // 'spring'
s = s.hour(5) // Change to 5am
s = s.date(15) // Change to the 15th

s = s.day('monday') // Change to (this week's) monday
s = s.day('monday', true) // go forward to monday
s = s.day('monday', false) // go backward to monday

s = s.month('march') // Change the month, preserving the date where possible
s = s.quarter(2) // Change to April 1st
s.era() // 'BC'/'AD'
s.decade() // 2010
s.century() // 21

// Percentage-based information
s.progress().month // fraction of the month elapsed (0–1)
s.progress().day // fraction of the day elapsed (0–1)
s.progress().hour // fraction of the hour elapsed (0–1)

// Add/subtract methods
s = s.add(1, 'week')
s = s.add(3, 'quarters')
s = s.subtract(2, 'months').add(1, 'day')

// start-of/end-of
s = s.startOf('day') // 12:00am
s = s.startOf('month') // 12:00am on the first day of the month
s = s.endOf('quarter') // last millisecond of the quarter

s = s.nearest('hour') //round up/down to the hour
s = s.nearest('quarter-hour') //5:15, 5:30, 5:45..
s = s.next('month') //start of the next month
s = s.last('year') //start of the last year

// fill-in all dates between a range
s.every('week', 'Jan 1st 2020') // (in tz of starting-date)

//utilities:
s.clone() // Make a copy
s.isValid() // Sept 32nd → false
s.isAwake() // true from 8:00am up to, but not including, 11:00pm
s.json() // get values in every unit as key-val object
```

if it's **_9am on tuesday_**, and you <i>add a week</i>, it will still be 9am on tuesday.
... even if some crazy changes happen.
Many unit and time setters support a handy 2nd param that controls whether it should be set forward, or backward.

```js
s = s.time('4:00pm') // 4pm today
s = s.time('4:00pm', true) // the next 4pm in the future
s = s.time('4:00pm', false) // the most-recent 4pm

// set(input, timezone?) parses a new input; its second argument is a timezone.
s = s.set('march 5th 2020', 'UTC')
s = s.set('march 4th 2020', 'UTC')
```

it's actually a little surprising how helpful this is.

<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## Comparisons:

```js
let s = spacetime([2017, 5, 2], 'UTC')
let d = s.add(5, 'days')
let start = s.subtract(1, 'milliseconds')
let end = s.add(1, 'milliseconds')

// gt/lt/equals
s.isAfter(d) // false
s.isEqual(d) // false
s.isBefore(d) // true
s.isBetween(start, end) // true; pass true as the third argument to include endpoints

// Comparison by unit
s.isSame(d, 'year') // true
s.isSame(d, 'date') // false
s.diff(d, 'day') // 5
s.diff(d, 'month') // 0

//make a human-readable diff
let before = spacetime([2017, 3, 28], 'UTC')
let now = spacetime([2018, 3, 28], 'UTC') // one year later
now.since(before).rounded
// '1 year ago'
```

all comparisons are done with sensitivity of timezone - **_8am EST_** is < **_8am PST_**.

<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## Timezones:

the best way to describe a timezone is an [IANA code](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones):

```js
// Roll into a new timezone, at the same moment
s = s.goto('Australia/Brisbane')
```

if you want to support relaxed timezone names like `'EST'`, `Eastern time`, use [timezone-soft](https://github.com/spencermountain/timezone-soft/)

```js
import tzSoft from 'timezone-soft'

const matches = tzSoft('milwaukee')
if (matches.length > 0) {
  s = s.goto(matches[0].iana) // 'America/Chicago'
}
// Informal names can be ambiguous; inspect the candidates when it matters.
```

play-around with timezones, and their DST-changes:

```js
//list timezones by their current time
spacetime.whereIts('8:30pm', '9:30pm') // ['America/Winnipeg', 'America/Yellowknife'... ]
spacetime.whereIts('9am') //(within this hour)

// Timezone metadata
s = spacetime('2024-07-01', 'America/New_York')
s.timezone().name // 'America/New_York'
s.hemisphere() // 'North'
s.timezone().current.offset // -4 (in hours)
s.hasDST() // true
s.isDST() // true

//list all timezones
Object.keys(spacetime.timezones())
```

you can flip-around the world pretty quick.

spacetime uses `Intl.DateTimeFormat` to detect your local timezone by default. If that information is unavailable, it falls back to UTC. Pass an explicit timezone when you need the same result on every machine.

`.goto(null)` returns to that default timezone.

```js
spacetime().time('4:30pm').goto('Europe/Paris').goto(null).time()
// 4:30pm
```

If, for some reason, you want to change the timezone _without changing the date_, you can do this via the `.timezone(str)` setter:

```js
let s = spacetime('2023-01-01T5:30[America/Denver]')
s = s.timezone('Europe/Zagreb') // hot-swap
console.log(s.isoFull())
// '2023-01-01T05:30:00.000+01:00[Europe/Zagreb]' (same time, new tz)
```

Under the hood, each instance stores an epoch in milliseconds (`s.epoch`) and a timezone identifier (`s.tz`). The main entry uses bundled timezone rules to find the offset, then reads a shifted native Date's UTC fields for the local clock. `.goto()` changes the timezone while keeping the epoch. Use `.toNativeDate()` to get a native Date representing the actual instant.

<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

## Date Formatting:

it's _[a pretty-sensible process](./docs/formatting.md)_ to create nice-looking dates:

```js
const s = spacetime('2017-04-14T05:01:00', 'Europe/Paris')

// Date + time formatting
s.format('time') // '5:01am'
s.format('numeric-uk') // '14/04/2017'
s.format('month') // 'April'
s.format('month-short') // 'Apr'
s.format('month-pad') // '03' (zero-based)
s.format('iso-month') // '04'

//if you want more complex formats, use {}'s
s.format('{year}-{iso-month}-{date-pad}') // '2017-04-14'
s.format("{hour} o'clock") // '5 o'clock'
s.format('{time} sharp') // '5:01am sharp'

//if you prefer, you can also use unix-formatting
s.unixFmt('yyyy.MM.dd h:mm a') // '2017.04.14 5:01 AM'

// support for the new Temporal ISO format
s.format('iso-full') // '2017-04-14T05:01:00.000+02:00[Europe/Paris]'

// support for the SQL ISO 9075 format
s.format('sql') // '2017-04-14 05:01:00'
```

<!-- spacer -->
<img height="50px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>
<div align="center">
  <img src="https://user-images.githubusercontent.com/399657/68221814-05ed1680-ffb8-11e9-8b6b-c7528d163871.png"/>
</div>

## Limitations & caveats

#### ◆ Historical timezone info

DST changes move around all the time, and timezones pop-in and out of existence.
We store and use only the latest DST information, updated frequently, and apply it (wrongly) to historical and future dates.

#### ◆ International date line

`.goto()` preserves the instant. Crossing the international date line can change the calendar date: converting from Fiji to Midway moves the local clock backward by nearly a full day.

#### ◆ Destructive changes

Most setters preserve smaller units: changing the month keeps the time of day. If the date does not exist in the new month or year, it is clamped to the last valid day. Some setters, such as `.quarter()`, reset smaller units to the start of the period. Capture the returned instance:

```js
let s = spacetime('2016-03-30T14:30:00', 'UTC')
s.month(1).iso() // '2016-02-29T14:30:00.000Z'
s.month(1).year(2017).iso() // '2017-02-28T14:30:00.000Z'
s.quarter(2).iso() // '2016-04-01T00:00:00.000Z'
s = s.month(1) // save the change
```

#### ◆ Calendars and locales

Spacetime uses the Gregorian calendar and Western digits, with English names by default. `.i18n()` can customize names and labels (see below), but it does not provide other calendar systems or full locale-aware parsing and formatting.

#### ◆ 0-based vs 1-based ...

for better or worse we copy the JavaScript spec for 0-based months, and 1-based dates.

ISO-formatting is different, so keep on your toes.

see [more considerations and gotchas](./docs/edge-cases.md)

#### Daylight-savings gotchas

We've written in detail about how spacetime handles Daylight-savings changes [here](https://observablehq.com/@spencermountain/spacetime-daylight-savings-time?collection=@spencermountain/spacetime)

Fall DST changes can repeat a local hour; spring changes can skip one. The displayed clock can move backward even as time advances; `.diff(..., 'minutes')` measures elapsed time. Use an epoch or a native Temporal object when the exact occurrence of an ambiguous local time matters.

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

An explicit offset in an ISO string takes precedence over the supplied timezone. It selects a fixed-offset zone, without a warning:

```js
let s = spacetime('2017-04-03T08:00:00-0700', 'Canada/Eastern', {
  silent: false
})
s.timezone().name // 'Etc/GMT+7' (UTC-7)
```

#### Configure 'today' context:

spacetime makes some assumptions about some string inputs:

```js
// assumes start of month
let s = spacetime('June 1992')
s.date() // 1

// assumes current year
s = spacetime('June 5th')
s.year() // the current year

// assumes Jan 1st
s = spacetime('2030')
s.month() // 0 (January)
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

let s = spacetime('2026-01-15T15:00:00', 'Australia/Adelaide')
s.isHappyHour()
//false

s = s.time('4:30pm')
s.isHappyHour()
//true
```

#### DD/MM/YYYY interpretation:

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

`i18n()` updates shared settings for all instances.

```js
let s = spacetime.now()
s.i18n({
  days: {
    long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    short: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
  },
  months: {
    long: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ],
    short: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  },
  ampm: {
    am: ' a. m.',
    pm: ' p. m.'
  },
  distance: {
    past: 'past',
    future: 'future',
    present: 'present',
    now: 'now',
    almost: 'almost',
    over: 'over',
    pastDistance: (value) => `${value} ago`,
    futureDistance: (value) => `in ${value}`
  },
  units: {
    second: 'second',
    seconds: 'seconds',
    minute: 'minute',
    minutes: 'minutes',
    hour: 'hour',
    hours: 'hours',
    day: 'day',
    days: 'days',
    month: 'month',
    months: 'months',
    year: 'year',
    years: 'years'
  },
  useTitleCase: true // automatically in .format()
})
s.day(6).format('day') // 'Sábado'
```

#### Configure start of week:

by default, the start of the week is monday.

You can look up country-specific week starts with [spacetime-week-start](./plugins/week-start).

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

## Contributing

Questions, bug reports, and focused pull requests are welcome. Please discuss larger additions first so we can keep the library small. Include tests for behavior changes; maintainers handle release version bumps and generated builds.

This is a pnpm workspace. Plugins use the root package as a workspace peer dependency.

#### See also:

- [luxon](https://moment.github.io/luxon/) - a small library from the clever moment people
- [date-fns](https://date-fns.org/) - a battle-hardened client-side Date utility
- [sugarjs/dates](https://sugarjs.com/dates/) - well-made date fns + timezone math
- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) - locale-aware date and time formatting
- [BurntSushi/Jiff](https://github.com/BurntSushi/jiff) - Rust/wasm date library

_(also, thank you to the amazing [timeanddate.com](https://www.timeanddate.com/))_

Apache 2.0 - PRs respected
