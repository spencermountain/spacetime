#!/usr/bin/env node
import spacetime from 'spacetime'
import soft from 'timezone-soft'
const help = function () {
  console.log(`\n\n stz - calculate current time in a given location`)
  console.log(`\n    Usage:  \`npx stz boston\``)
  console.log(`\n    Usage:  \`npx stz ACST\``)
  console.log('\n\n')
}

const str = process.argv.slice(2).join(' ').trim()
if (!str) {
  help()
  process.exit()
}

const res = soft(str)
if (res.length === 0) {
  console.log(`\n\nCould not find timezone for \'${str}\'`)
  help()
  process.exit()
}
const tz = res[0]
// are we in standard time, or daylight time?
const s = spacetime.now(tz.iana)
let out = `${s.time()}`

if (tz.daylight && s.isDST()) {
  out += ' ' + tz.daylight.abbr
} else {
  out += ' ' + tz.standard.abbr
}

const here = spacetime.now()
if (!s.isSame('day', here)) {
  out += ' ' + s.format('nice')
} else {
  out += ' (today)'
}

console.log('\n' + out + '\n')
