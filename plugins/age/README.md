<div align="center">

  <div>calculate human age</div>
  <div><img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" /></div>

  <div align="center">
    <a href="https://npmjs.org/package/spacetime-cal">
      <img src="https://img.shields.io/npm/v/spacetime-cal.svg?style=flat-square" />
    </a>
    <a href="https://unpkg.com/spacetime-cal/builds/spacetime-cal.min.js">
      <img src="https://badge-size.herokuapp.com/spencermountain/spacetime-cal/master/builds/spacetime-cal.min.js" />
    </a>
  </div>
  <div align="center">
    <code>npm i space-age</code>
  </div>
  <sub>
    by
    <a href="https://spencermountain.github.io/">Spencer Kelly</a>
  </sub>
</div>
<p></p>

a spacetime plugin to reckon a person's age, in any unit, given their birthday.

### javascript api:
```js
const spacetime = require('spacetime')
spacetime.extend(require('space-age'))

// set a birthday
let s = spacetime('march 28 1986')
s.age()
// 35

// get your age in months, weeks
s.age('days')
// 12,770

s.age('months')
// 441
```

### command-line api:
```bash
npx space-age may 18 1984

npx space-age may 1st 1984 --months
```
or you can install it locally with `npm i -g space-age`


MIT