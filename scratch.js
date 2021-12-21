const spacetime = require('./src/index')
// spacetime.extend(require('./plugins/dst/src/index.js'))

let a = spacetime('2017-10-03T08:00:00+0000', 'Etc/GMT+0')//.time('1:00pm')
let b = spacetime('2017-22-03T08:00:00+0000')//.time('1:00pm')
console.log(a.since(b))
//  '1918-06-08T13:00:00.000+05:30'

/*
//TODO: make .every() inclusive
let start = spacetime('').startOf('month').startOf('week')

console.log(start.format('nice-day'))
let weeks = []

let end = start.endOf('week')
let week = start.every('day', end)
console.log(week[0].format('nice-day'))
