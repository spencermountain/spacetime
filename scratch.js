const spacetime = require('./src/index')

var s = spacetime({
  year: 2019
}).endOf('year');
s.log()
console.log(s.dayOfYear())
