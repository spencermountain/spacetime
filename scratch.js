const spacetime = require('./src/index')

let s = spacetime('12/01/2018', null, { dmy: true }) //jan 12th
// let s = spacetime('18-02-2015')
console.log(s.format('iso-short'))
