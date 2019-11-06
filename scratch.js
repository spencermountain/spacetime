const spacetime = require('./src/index')

// let s = spacetime('October 6th 2019', 'australia/sydney') //.time('6:20pm')
// s.log()
// s = s.startOf('day')
// s.log()

let s = spacetime('2019-11-05T11:01:03.030-03:00')
console.log(s.format('json'))
let want = {
  century: 21,
  decade: 2010,
  year: 2019,
  month: 10,
  date: 5,
  day: 2,
  hour: 11,
  minute: 1,
  second: 3,
  millisecond: 30
}
