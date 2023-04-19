// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

for (let i = 0; i < 125; i += 1) {
  let d = spacetime((1990 + i) + '/01/01');
  console.log(d.format('iso-short'), d.week())

}