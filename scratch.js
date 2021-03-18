const spacetime = require('./src/index')
// spacetime.extend(require('./plugins/age/src/index.js'))
let zones = require('/Users/spencer/mountain/spacetime/zonefile/iana.js')
const alias = require('/Users/spencer/mountain/spacetime/plugins/better-dst/zonefile/aliases.js')

// console.log(Object.keys(zones).length)
// Object.keys(zones).forEach((k) => {
//   if (alias[k]) {
//     delete zones[k]
//     // console.log(k)
//     // if (zones[alias[k]]) {
//     // } else {
//     //   console.log(k, alias[k])
//     //   console.log()
//     // }
//     // return false
//   }
//   // return true
// })
// console.log(Object.keys(zones).length)
// console.log(JSON.stringify(zones, null, 2))
// let s = spacetime.min()
// console.log(s.iso())

let d = spacetime('2020-11-01T00:00:00', 'America/Chicago')
console.log(d.iso())
