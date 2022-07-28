// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

let s = spacetime.now()
console.log(s.timezone()) //'Sábado'