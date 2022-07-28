// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

let s = spacetime.now('America/Port-au-Prince')
console.log(s.timezone()) //'Sábado'