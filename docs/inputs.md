
## Creating a spacetime object

```js
import spacetime from 'spacetime'          // ESM / TS / Deno
// const spacetime = require('spacetime')  // CommonJS

// from various inputs — 2nd arg is ALWAYS the timezone:
spacetime.now('America/New_York')          // right now, in that tz
spacetime(1489520157124, 'Canada/Pacific') // millisecond epoch
spacetime([2017, 5, 2], 'Canada/Pacific')  // [yyyy, M(0-based), d(1-based)] => Jun 2 2017
spacetime('July 2, 2017 5:01:00')          // parsed string
spacetime('2019/05/15')
spacetime('2017-04-03T08:00:00-0700')      // ISO-8601 with offset => tz 'Etc/GMT-7'
spacetime('2023-01-01T05:30[America/Denver]') // RFC 9557 (offset/tz in the string)
spacetime({ month: 'june', year: 2019 })   // key-value object input

// static helpers (each takes (timezone?, options?)):
spacetime.now()        // this exact moment
spacetime.today()      // this morning (start of today)
spacetime.tomorrow()   // tomorrow morning
spacetime.yesterday()  // yesterday morning
spacetime.min()        // earliest representable date (271,821 BC)
spacetime.max()        // furthest representable date (~27k years out)
spacetime.fromUnixSeconds(1489520157)      // SECONDS epoch -> Spacetime
```

`ParsableDate` (accepted by the constructor and by methods like `set`, `diff`,
`isAfter`, …) is: `Spacetime | Date | number | number[] | string`.

### Constructor options (3rd argument)

```js
spacetime('12/01/2018', null, { dmy: true })  // dd/mm/yyyy parsing (default is mm/dd US)
spacetime(123456, 'UTC', { silent: false })   // warn on suspicious 1970 epochs (default silent: true)
spacetime('June 5th', null, { today: { year: 1996, month: 3, date: 4 } }) // pin the "now" context
spacetime('...', tz, { weekStart: 1 })        // day the week starts on: 0=Sunday, 1=Monday (default), ...
```

Ambiguous string inputs assume: start of month (`'June 1992'` → the 1st),
current year (`'June 5th'`), and Jan 1st (`'2030'`).
