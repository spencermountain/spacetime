<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div>predicted sunrise/sunset times</div>
  <a href="https://npmjs.org/package/spacetime-daylight">
    <img src="https://img.shields.io/npm/v/spacetime-daylight.svg?style=flat-square" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-green.svg?style=flat-square" />
  </a>
</div>

<div align="center">
  <code>npm install spacetime-daylight</code>
</div>

a [spacetime](https://github.com/spencermountain/spacetime) plugin to calculate sunlight exposure for a given timezone/location, in local time.

This project is really just a neat opportunity to combine some exceptional open-source javascript libraries:

- [sun-calc](https://github.com/mourner/suncalc) by Vladimir Agafonkin
- [tz-lookup](https://github.com/darkskyapp/tz-lookup/) by dark-sky and Evan Siroky

that's all it does.

it bundles-in the [spacetime-geo](https://github.com/spencermountain/spacetime-geo) plugin, too.

### sunrise/sunset

```js
const spacetime = require('spacetime')
const daylight = require('spacetime-daylight')
spacetime.extend(daylight)

let d = spacetime('June 5th 3:30pm', 'Canada/Eastern')
d.sunrise().time()
// 6:43am
d.sunset().time()
// 7:13pm
d.noon().time()
// 1:17pm
```

`132kb` or so,

### solar position

find the position of the sun, at a place and time:

```js
let s = spacetime.today('Europe/Stockholm').time('3:00am')
let hours = s.every('hour', s.time('11:00pm'))
hours.forEach((d) => {
  console.log(d.time(), d.sunPosition())
})
```

**Altitude** means _how high_ the sun is.
90° is directly overhead, 0° means it's setting, or rising. negative numbers means it's dark.

**Azimuth** describes how far it is _east-to-west_
0° is North. Negative numbers are east (morning).
Noon should have the same azimuth as midnight.

### solstice calculator

some rough millisecond-math for estimating solstice dates for a given year:

```js
let s = spacetime('march 3rd 2007')
console.log(s.summerSolstice().format('nice'))
```

(this is not recommended for advanced astronomy, or distant years)

### API

```js
d.sunrise()

d.sunset()

d.noon()

d.dusk()

d.dawn()

//this one does some helper diff logic
d.daylight()
/*{
  dawn: '5:02am',
  sunrise: '5:38am',
  sunset: '9:04pm',
  dusk: '9:40pm',
  duration:
   { inHours: 16,
     inMinutes: 926,
     inSeconds: 55540,
     human: { hours: 15, minutes: 25, seconds: 40 } },
  current: { progress: 0.49936982355059417, status: 'day' }
}*/
```

### Examples:

find out the rate the length-of-day is changing

```js
let s = spacetime('November 12 2018', 'Europe/London')
let today = s.daylight().inSeconds
let tomorrow = s.add(1, 'day').daylight().inSeconds
let diff = today - tomorrow
console.log(`today is ${diff / 60} minutes longer`)
// 'today is 3.2 minutes longer'
```

find-out where the sun is rising now:

```js
let maybeList = spacetime.whereIts('4:00am', '9:30am')
maybeList.forEach((tz) => {
  let d = spacetime.now(tz)
  if (d.isBetween(d.dawn(), d.sunrise())) {
    //calculate how minutes until sunrise
    let diff = d.diff(d.sunrise())
    console.log(tz + ' in ' + diff.minutes + ' mins - @ ' + d.sunrise().time())
  }
})
// Asia/Kamchatka in 25 mins - @ 6:01am
// Asia/Magadan in 4 mins - @ 4:40am
// Pacific/Midway in 19 mins - @ 5:55am
```

## See also

- [timespace](https://github.com/mapbox/timespace) - by MapBox, using Moment - larger and more-accurate.

MIT
