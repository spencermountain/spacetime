<div align="center">
  <div>spacetime-ticks</div>
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div><a href="https://spencermounta.in/spacetime-ticks/">demo</a></div>
  <a href="https://npmjs.org/package/spacetime-ticks">
    <img src="https://img.shields.io/npm/v/spacetime-ticks.svg?style=flat-square" />
  </a>
  <a href="https://unpkg.com/spacetime-ticks">
    <img src="https://badge-size.herokuapp.com/spencermountain/spacetime-ticks/master/builds/spacetime-ticks.min.js" />
  </a>
</div>

calculate some sensible break-points between two dates, using the [spacetime](https://github.com/spencermountain/spacetime) date library.

`npm i spacetime-ticks`

<a href="https://spencermounta.in/spacetime-ticks">
  <img src="https://user-images.githubusercontent.com/399657/52904717-02cdb280-31fe-11e9-902d-8b012e72ed15.gif" />
</a>

```js
const spacetimeTicks=require('spacetime-ticks')

let ticks=spacetimeTicks('June 5th 1992', 'Oct 4 2002', 5)
// [
// { label: "1993", epoch: 725864400000, value: 0.055 }
// { label: "1995", epoch: 788936400000, value: 0.248 }
// { label: "1997", epoch: 852094800000, value: 0.442 }
// { label: "1999", epoch: 915166800000, value: 0.636 }
// { label: "2001", epoch: 978325200000, value: 0.829 }
// ]
```

This library has some opinions:
* ticks should always be `spaced evenly`, even if this means less ticks
* a tick should appear **at the start** of months, years, days
* they don't need to begin or end at the start andend.
* *less ticks* are better than too-many ticks

it was built for labelling an x-axis in a space-limited way, but you can use it for whatever weird stuff.

## See also:
* [d3-time](https://github.com/d3/d3-time)
* [sometime](https://github.com/spencermountain/sometime) - spacetime-calendar

MIT
