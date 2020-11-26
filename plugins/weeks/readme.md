a spacetime plugin to calculate the nth day of a month.

like `.week()` which is based on the year, `.monthWeek()` works as a getter+setter, based on the input param:
```js

// Oct 2020 starts on a thursday
let s = spacetime('saturday oct 10th 2020')
s.monthWeek()
// 1

s = s.monthWeek(0)
// Mon Sep 28th

```

MIT