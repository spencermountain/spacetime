// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

let d = spacetime('2022/01/01');
console.log(d.format('iso-short'), d.week())