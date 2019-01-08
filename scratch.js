const spacetime = require('./src/index')

//from Jan 8th 10:30am EST
// let s = spacetime('June 30, 2017 20:01:00', 'Australia/Brisbane');
// console.log(s.format('nice'))


let now = spacetime([2019, 3, 12])
let c = spacetime('christmas')
console.log(c.format(''))
c.year(now.year() - 1)
let obj = now.since(c).diff
console.log(obj)
