const spacetime = require('./src/index')
spacetime.extend(require('./plugins/dst/src/index.js'))
// let zones = require('/Users/spencer/mountain/spacetime/zonefile/iana.js')
// const alias = require('/Users/spencer/mountain/spacetime/plugins/better-dst/zonefile/aliases.js')

// let date = spacetime('2000-01-01 00:00:00')
// date = date.add(30, 'year')
// console.log(date.format())

// let nye = spacetime(`2022-01-01T00:00:00.000Z`)
// console.log(nye.format('iso-short'))
// nye = nye.minus(1, 'year')
// console.log(nye.format('iso-short'))

var s = spacetime.now()
s = s.goto('UTC')
console.log(s.unixFmt('ww'))

// date '+Today is %ww'
