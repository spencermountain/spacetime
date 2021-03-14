#!/usr/bin/env node
const spacetime = require('spacetime')
const soft = require('timezone-soft')

const help = function () {
  console.log(`\n\n space-age - calculate human age from a birthdate`)
  console.log(`\n    Usage:  \`npx stz boston\``)
  console.log(`\n    Usage:  \`npx stz ACST\``)
  console.log('\n\n')
}

let str = process.argv.slice(2).join(' ').trim()
if (!str) {
  help()
  process.exit()
}

let res = soft(str)
if (res.length === 0) {
  console.log(`\n\nCould not find timezone for \'${str}\'`)
  help()
  process.exit()
}
let tz = res[0]

// are we in standard time, or daylight time?
let s = spacetime.now(tz.iana)
let out = `${s.time()}`

if (tz.daylight && s.isDST()) {
  out += ' ' + tz.daylight.abbrev
} else {
  out += ' ' + tz.standard.abbrev
}

let here = spacetime.now()
if (!s.isSame('day', here)) {
  out += ' ' + s.format('nice')
} else {
  out += ' (today)'
}

console.log('\n' + out + '\n')
