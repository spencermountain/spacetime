const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

let s = spacetime('jan 3 2019').startOf('year') //.minus(1, 'second')
let arr = s.every('day', s.endOf('year'))
console.log(arr.length)
arr = arr.slice(0, 5)
arr.forEach((d) => {
  console.log(d.format('nice'))
})

// try to keep time of day in every?
let s = spacetime.today('Canada/Eastern').time('2:01pm')
let hours = s.every('week', s.add(1, 'year'))
hours.forEach((d) => {
  console.log(d.format('time') + '   -   ' + d.sunPosition().altitude)
})
