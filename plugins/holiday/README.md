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

If it finds a date, it returns a [spacetime](https://github.com/spencermountain/spacetime) object. Unknown or unsupported names return `null`.

to conserve filesize of your build, **spacetime** is a peerDependency, so must be installed separately:

```js
import holiday from 'spacetime-holiday'

holiday('easter monday', 2026, 'UTC').format('iso-short')
// '2026-04-06'

holiday('memorial day', 2026, 'America/New_York').format('iso-short')
// '2026-05-25'

holiday('victoria day', 2026, 'America/Toronto').format('iso-short')
// '2026-05-18'

holiday('black friday', 2024, 'UTC').format('iso-short')
// '2024-11-29'

holiday('cyber monday', 2024, 'UTC').format('iso-short')
// '2024-12-02'

holiday('not a holiday', 2026) // null
```

`holiday(name, year?, timezone?)` defaults to the **current year in the requested timezone**, evaluated on each call. Without a timezone, it uses the local machine's timezone. This lookup can return a date earlier in the year; use `.next()` for an upcoming occurrence.

### List supported holidays

```js
holiday.list().find(entry => entry.name === 'christmas')
// { name: 'christmas', aliases: ['xmas'] }

const calendar = holiday.list({ year: 2027, timezone: 'America/Toronto' })
const christmas = calendar.find(entry => entry.name === 'christmas')
christmas.date.format('iso-short')
// '2027-12-25'
```

`.list()` returns entries sorted by canonical name, with aliases grouped under that name. Supplying a year adds a `date` field containing a spacetime object, or `null` if the date cannot be resolved. Each call returns independent entries and alias arrays. Unimplemented holidays are not listed.

### Find the next occurrence

```js
holiday.next('christmas', {
  from: '2026-12-26',
  timezone: 'America/Toronto'
}).format('iso-short')
// '2027-12-25'

holiday.next('memorial day', {
  from: '2026-05-26',
  timezone: 'America/New_York'
}).format('iso-short')
// '2027-05-31'

holiday.next('christmas', {
  from: '2026-12-25T12:00:00Z',
  timezone: 'UTC'
}).format('iso-short')
// '2026-12-25' — today counts

holiday.next('christmas') // next occurrence from today, in the local timezone
```

`.next(name, { from, timezone }?)` finds the first occurrence on or after the reference's local calendar date, returning local midnight. `from` defaults to now and accepts a date string, JavaScript `Date`, millisecond epoch, or spacetime instance. A spacetime reference supplies its timezone unless explicitly overridden, and is not mutated. Unknown holidays and invalid reference dates return `null`.

### Support:

- american/western holidays 👍

- Easter-based christian holidays 👍

- Astronomical holidays 👍

- Muslim holidays (predicted) 😞

- Jewish-calendar holidays (not implemented) 😞

- Chinese-calendar holidays (not implemented) 😞

Orthodox Easter and its related movable holidays are not implemented and return `null`; they are not substituted with Western Easter dates. Fixed-date lookups such as `orthodox christmas day` remain supported. Predicted Muslim holidays and astronomical dates retain their existing approximations; the new listing and next-occurrence helpers do not improve those calculations.

See the [changelog](./changelog.md) for additions and date corrections.

## See also

- [spacetime-daylight](https://github.com/spencermountain/spacetime-daylight)
- [spacetime-week](https://github.com/spencermountain/spacetime-week)
- [spacetime-informal](https://github.com/spencermountain/spacetime-informal) - timezones like 'pacific time'

MIT
