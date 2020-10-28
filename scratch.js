const spacetime = require('./src/index')

let tz = 'europe/brussels' // 03/29:02
let s = spacetime(`March 11th 2020 1:00am`, tz)
for (let i = 0; i < 20; i += 1) {
  s = s.add(10, 'minutes')
  // console.log(s.time() + '   ' + s.timezone().current.isDST)
  console.log(s.format('{time} {nice}'), s.timezone().current.isDST)
}
console.log(s.timezones[tz])
