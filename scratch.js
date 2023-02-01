// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

let s = spacetime('nov 11 2022', 'etc/unknown')
// s = s.add(1, 'centuries')
console.log(s.format())
// console.log(s.season()) //'Sábado'