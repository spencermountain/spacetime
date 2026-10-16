<div align="center">
  <div><b>spacetime-holiday</b></div>
  <div>calculate the calendar-date of holidays</div>
  <div><code>npm install spacetime-holiday</code></div>
  <div align="center">
    <sub>
      by
      <a href="https://github.com/spencermountain">Spencer Kelly</a>
    </sub>
  </div>
  <img height="25px" src="https://user-images.githubusercontent.com/399657/68221824-09809d80-ffb8-11e9-9ef0-6ed3574b0ce8.png"/>
</div>
<!--2nd row-->
<div align="center">
  <div>
    <a href="https://npmjs.org/package/spacetime-holiday">
    <img src="https://img.shields.io/npm/v/spacetime-holiday.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=spacetime-holiday">
    <img src="https://badgen.net/bundlejs/min/spacetime-holiday" />
  </a>
  </div>
</div>

<!-- spacer -->
<img height="20px" src="https://user-images.githubusercontent.com/399657/68221862-17ceb980-ffb8-11e9-87d4-7b30b6488f16.png"/>

Some holidays are the same day every year, some holidays change astronomically, some by calendar rules like 'third thursday in June'.

This library tries its best to reconcile them.

if it finds a date, it returns a [spacetime](https://github.com/spencermountain/spacetime) object.

to conserve filesize of your build, **spacetime** is a peerDependency, so must be installed separately:

```js
import spacetimeHoliday from 'spacetime-holiday'

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

### Support:

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
