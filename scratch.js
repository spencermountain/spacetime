// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

let s = spacetime('nov 11 2022', 'australia/adelaide')
console.log(s.format('iso-short'), s.season())
s = s.add(4, 'weeks')
console.log(s.format('iso-short'), s.season())
// console.log(s.season()) //'Sábado'