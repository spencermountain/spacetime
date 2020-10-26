const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

// let s = spacetime('now', null, { today: { year: 2012 } })
// console.log(s.format())

let start = spacetime('jan 1st 2020 8:00pm', 'Canada/Pacific') //.add(5, 'minutes')
let end = spacetime('jan 1st 2020 11:00pm', 'Canada/Eastern')
// console.log(start.since(end).diff)
console.log(start.since(end, 'hour').diff)
// console.log(start.diff(end))
// console.log(start.timezone(), end.timezone())
