import spacetime from './src/index.js'

// console.log(spacetime('Feb 29 2001').iso())

// 
// let s = spacetime('1995-12-07T03:24:30', 'Africa/Cairo')
// s = s.timezone('America/Toronto')
// console.log(s.iso())



let mils = 1744200453183
let secs = 1744200453

let s = spacetime('jan 5 2028 4:30pm')
console.log(s.epochSeconds());
console.log(s.iso());



// let s = spacetime("foobar", 'UTC')
// console.log(s.time())
// console.log(s.epoch)
// console.log(s.year())
const arr = [
  'millisecond',
  'second',
  'minute',
  'hour',
  'hourFloat',
  'hour12',
  'time',
  'ampm',
  'dayTime',
  'iso',
  'epochsecs',
  'date',
  'day',
  'dayName',
  'dayOfYear',
  'week',
  'month',
  'monthName',
  'quarter',
  'season',
  'year',
  'era',
  'decade',
  'century',
  'millenium',
]
// arr.forEach(fn => {
//   console.log(s[fn](), fn)
// })

// console.log(s.epochsecs(), 1735689600)
// console.log(s.epochsecs() == 1735689600)