const spacetime = require('./src/index')
// spacetime.extend(require('./plugins/dst/src/index.js'))


let s = spacetime('1998-05-01T08:00:00.000Z')
console.log(s.format('iso'))

/*
//TODO: make .every() inclusive
let start = spacetime('').startOf('month').startOf('week')

console.log(start.format('nice-day'))
let weeks = []

let end = start.endOf('week')
let week = start.every('day', end)
console.log(week[0].format('nice-day'))
*/