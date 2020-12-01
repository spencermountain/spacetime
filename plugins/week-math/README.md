<div align="center">

  <div>calculate the nth day of a month</div>
  <div><img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" /></div>

  <div align="center">
    <a href="https://npmjs.org/package/spacetime-week-math">
      <img src="https://img.shields.io/npm/v/spacetime-week-math.svg?style=flat-square" />
    </a>
    <!-- <a href="https://codecov.io/gh/spencermountain/spacetime-week-math">
      <img src="https://codecov.io/gh/spencermountain/spacetime-week-math/branch/master/graph/badge.svg" />
    </a> -->
    <a href="https://unpkg.com/spacetime-week-math/builds/spacetime-week-math.min.js">
      <img src="https://badge-size.herokuapp.com/spencermountain/spacetime-week-math/master/builds/spacetime-week-math.min.js" />
    </a>
  </div>
  <div align="center">
    <code>spacetime-week-math</code>
  </div>
  <sub>
    by
    <a href="https://spencermountain.github.io/">Spencer Kelly</a>
  </sub>
</div>
<p></p>


a spacetime plugin to calculate the nth day of a month.

like `.week()` which is based on the year, `.weekOfMonth()` works as a getter+setter, based on the input param:
```js

// Oct 2020 starts on a thursday
let s = spacetime('saturday oct 10th 2020')
s.weekOfMonth()
// 2

s = s.weekOfMonth(1)
// Mon Sep 28th

```
the week numbers start at 1.

**Note:** 
the getter/setter can produce different results:
```js
let s = spacetime('saturday oct 10th 2020')
s = s.weekOfMonth(1)
// Mon Sep 28th
s.weekOfMonth()
// 5
```
Sep 28th is considered the 5th week of September.


work-in-progress.

MIT