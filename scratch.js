const spacetime = require('./src/index')

// let s = spacetime([2020, 1, 29])
// console.log(s.format())

// let s = spacetime('now', null, { today: { year: 2012 } })
// console.log(s.format())

// 11/01:02
let s = spacetime(`Nov 1st 2020 12:01am`, 'america/tijuana')
for (let i = 0; i < 20; i += 1) {
  s = s.add(10, 'minutes')
  // console.log(s.time() + '   ' + s.timezone().current.isDST)
  console.log(s.format('{time} {nice}'), s.timezone().current.isDST)
}
console.log(s.timezones['america/tijuana'])
