const spacetime = require('./src/index')
spacetime.extend(require('./plugins/dst/src/index.js'))
// let zones = require('/Users/spencer/mountain/spacetime/zonefile/iana.js')
// const alias = require('/Users/spencer/mountain/spacetime/plugins/better-dst/zonefile/aliases.js')

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

// let d = spacetime()
// console.log(d.dst())

let d = spacetime('march 17 2021').time('3:20am')
console.log(d.ampm('pm', true).format('nice'))
