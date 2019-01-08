const spacetime = require('./src/index')

//from Jan 8th 10:30am EST
// let s = spacetime('June 30, 2017 20:01:00', 'Australia/Brisbane');
// console.log(s.format('nice'))


let s = spacetime({
  month: '12',
  day: '25',
  hour: '6',
  minute: '24',
  ampm: null
})
console.log(s.format('nice'))
