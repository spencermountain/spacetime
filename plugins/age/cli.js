#!/usr/bin/env node
import spacetime from 'spacetime'
import minimist from 'minimist'
import plg from './src/index.js'
spacetime.extend(plg)

const defaults = {
  unit: 'years'
}
const help = function () {
  console.log(`\n\n space-age - calculate human age from a birthdate`)
  console.log(`\n    Usage:  \`npx space-age march 24th 1982\``)
  console.log(`\n    Usage:  \`npx space-age march 24th 1982 --months\``)
  console.log('\n\n')
}

const alias = {
  h: 'help',
  y: 'years',
  d: 'days',
  day: 'days',
  hour: 'hours',
  year: 'years',
  month: 'months',
  m: 'months',
  q: 'quarters'
}

let opts = minimist(process.argv.slice(2), { alias: alias })
let str = opts._.join(' ').trim()

if (!str || opts.help) {
  help()
  process.exit()
}

opts = Object.assign({}, defaults, opts)

let unit = 'years'
if (opts.months) {
  unit = 'months'
}
if (opts.quarters) {
  unit = 'quarters'
}
if (opts.days) {
  unit = 'days'
}
if (opts.hours) {
  unit = 'hours'
}
if (opts.weeks) {
  unit = 'weeks'
}

let num = spacetime(str).age(unit)
let output = `${num.toLocaleString()}`
if (unit !== 'years') {
  output += ` (${unit})`
}
console.log(output)
