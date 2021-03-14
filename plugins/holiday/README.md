<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div>
    <h2>spacetime-holiday</h2>
  </div>
  <div>
    calculate the calendar-date of holidays
  </div>
  <a href="https://npmjs.org/package/spacetime-holiday">
    <img src="https://img.shields.io/npm/v/spacetime-holiday.svg?style=flat-square" />
  </a>
  <a href="https://unpkg.com/spacetime-holiday/builds/spacetime-holiday.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/spacetime-holiday/master/builds/spacetime-holiday.min.js" />
  </a>
  <div>
    <sup>
      By <a href="https://github.com/spencermountain">Spencer Kelly</a>
    </sup>
  </div>
</div>

Some holidays are the same day every year, some holidays change astronomically, some by calendar rules like 'third thursday in June'.

This library tries its best to reconcile them.

if it finds a date, it returns a [spacetime](https://github.com/spencermountain/spacetime) object.

to conserve filesize of your build, **spacetime** is a peerDependency, so must be installed separately:

`npm i spacetime`

`npm i spacetime-holiday`

```js
const spacetimeHoliday = require('spacetime-holiday')

let s = spacetimeHoliday('easter monday', 2020)
s.format('iso-short')
// 2020-04-12

spacetimeHoliday('groundhog day').format('day') // defaults to next instance
// 'Saturday'

spacetimeHoliday('fall equinox', 2030).format('nice-year')
// 'Sept 22nd, 2030'

// add a timezone
let s = spacetimeHoliday('ramadan', 2019, 'Canada/Pacific')
s.iso()
// 2019-05-05T00:00:00.000-07:00
```

work-in-progress!

- american/western holidays 👍

- Easter-based christian holidays 👍

- Astronomical holidays 👍

- Muslim holidays (predicted) 😞

- Jewish-calendar holidays (not implemented) 😞

- Chinese-calendar holidays (not implemented) 😞

## See also

- [spacetime-daylight](https://github.com/spencermountain/spacetime-daylight)
- [spacetime-week](https://github.com/spencermountain/spacetime-week)
- [spacetime-informal](https://github.com/spencermountain/spacetime-informal) - timezones like 'pacific time'

MIT
