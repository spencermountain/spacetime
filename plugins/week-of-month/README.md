<div align="center">

  <div>calculate the week number of a month</div>
  <div><img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" /></div>

  <div align="center">
    <a href="https://npmjs.org/package/spacetime-week-of-month">
      <img src="https://img.shields.io/npm/v/spacetime-week-of-month.svg?style=flat-square" />
    </a>
    <a href="https://unpkg.com/spacetime-week-of-month/builds/spacetime-week-of-month.min.js">
      <img src="https://badge-size.herokuapp.com/spencermountain/spacetime-week-of-month/master/builds/spacetime-week-of-month.min.js" />
    </a>
  </div>
  <div align="center">
    <code>spacetime-week-of-month</code>
  </div>
  <sub>
    by
    <a href="https://spencermountain.github.io/">Spencer Kelly</a>
  </sub>
</div>
<p></p>

Broadly, we think of a month as having 4 weeks, but when people say 'the 1st week of the month', it can be an ambiguous thing.

The **1st week of May** is defined as the first week *with a Thursday* in it. 

This means that first 3 days of October are in the ***5th week of September***:
![image](https://user-images.githubusercontent.com/399657/111084979-93654280-84eb-11eb-8853-923c516a3032.png)


and the last 3 days of June, will be the **1st week of July**.
![image](https://user-images.githubusercontent.com/399657/111084924-3a95aa00-84eb-11eb-9afd-33418a8dd1e7.png)


This is a spacetime plugin to calculate this, for a given day.

```js

// Oct 2020 starts on a thursday
let s = spacetime('saturday oct 10th 2020')
s.weekOfMonth()
// 2

s = s.weekOfMonth(1)
// Mon Sep 28th

```
the week numbers start at 1.

like `.week()` which is based on the year, `.weekOfMonth()` works as a getter+setter, based on the input param:

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

### See also
* [spacetime-week](https://github.com/spencermountain/spacetime-week)

MIT