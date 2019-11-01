const spacetime = require('./src/index')

let s = spacetime('03/02/2017', null, { british: true })
// let s = spacetime('18-02-2015')
console.log(s.format('iso-short'))
