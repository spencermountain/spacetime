const spacetime = require('./src/index')
// spacetime.extend(require('./plugins/dst/src/index.js'))

let s = spacetime('June 8th 1918', 'Etc/Greenwich')//.time('1:00pm')
s.debug()
console.log(s.format('iso'))
//  '1918-06-08T13:00:00.000+05:30'

/*
//TODO: make .every() inclusive
let start = spacetime('').startOf('month').startOf('week')

console.log(start.format('nice-day'))
let weeks = []

let end = start.endOf('week')
let week = start.every('day', end)
console.log(week[0].format('nice-day'))
*/