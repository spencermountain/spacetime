// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

let s = spacetime.now('Etc/utc')
// console.log(s.timezone()) //'Sábado'
let year = 1970
for (let i = 0; i < 61; i += 1) {
  s = s.year(year + i)
  s = s.startOf('year')
  console.log(s.epoch, year + i)
}