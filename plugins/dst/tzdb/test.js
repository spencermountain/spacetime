import data from './parse.js'
import spacetime from '../../../src/index.js'
import zone from '../src/zonefile.2022.js'


import patterns from '../src/patterns.js'
import { fromSpace } from '../src/calc.js'

let year = 2021
// let k = 'America/Toronto'
Object.keys(data).forEach(k => {
  let [start, end] = data[k][year]
  let hour = 1000 * 60 * 60
  start = spacetime(start, k)
  end = spacetime(end + hour, k)

  let name = zone[k.toLowerCase()].pattern
  let pattern = patterns[name]
  let pStart = fromSpace(pattern.start, k, year).add(1, 'hour')
  let pEnd = fromSpace(pattern.end, k, year)

  if (Math.abs(start.diff(pStart, 'hour')) > 2 || Math.abs(end.diff(pEnd, 'hour')) > 2) {
    console.log(k, Math.abs(start.diff(pStart, 'hour')))
    console.log(start.format('{nice-day} {time}'), '    ', end.format('{nice-day} {time}'))
    console.log(pStart.format('{nice-day} {time}'), '    ', pEnd.format('{nice-day} {time}'))
  } else {
    console.log(true)
  }
})