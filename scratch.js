const spacetime = require('./src/index')

// let tz = 'america/indiana' // 11/05:01
let tz = 'america/havana' // 11/01:01

// let s = spacetime(`Nov 5th 2020 12:01am`, tz)
let s = spacetime(`Oct 31st 2020 11:51pm`, tz)
for (let i = 0; i < 20; i += 1) {
  s = s.add(10, 'minutes')
  // console.log(s.time() + '   ' + s.timezone().current.isDST)
  console.log(s.format('{time} {nice}'), s.timezone().current.isDST)
}
console.log(s.timezones[tz])
