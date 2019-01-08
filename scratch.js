const spacetime = require('./src/index')

//from Jan 8th 10:30am EST
// let s = spacetime('June 30, 2017 20:01:00', 'Australia/Brisbane');
// console.log(s.format('nice'))


console.log(spacetime('2018-02-02T22:00:00').format('time'))
console.log(spacetime('2018-02-02 22:00:00').format('time'))
