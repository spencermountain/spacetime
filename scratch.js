const spacetime = require('./src/index')

let s = spacetime('March 2')
// console.log(s.format('{year}-{date-pad}-{month-pad}'))
console.log(s.format('{time} o\'clock {quarter}'))
// console.log(s.unixFmt('dd-MMM'))

console.log('|' + s.time() + '|')
