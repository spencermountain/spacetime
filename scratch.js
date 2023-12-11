// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

let start = spacetime('Dec 25th 2021')
let end = spacetime('Feb 2nd 2022')

let diff = start.since(end)
console.log(diff)
