const spacetime = require('./src/index')
spacetime.extend(require('./plugins/weekOfMonth/src/index.js'))

let s = spacetime('jan 1')
let end = s.endOf('year')
let last = null
while (s.isBefore(end)) {
  s = s.add(1, 'day')
  let obj = s.whichWeek()
  let str = `#${obj.num} ${obj.month}`
  if (str !== last) {
    console.log(str)
    // console.log(str, s.format('{iso-short}'))
    last = str
  }
}
