const spacetime = require('./src/index')

let s = spacetime([2018, 2, 5, 0, 0, 0, 0], 'Europe/London');
console.log(s.format('iso'))
s = s.endOf('day');
console.log(s.format('iso'))
