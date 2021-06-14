const spacetime = require('./src/index')
spacetime.extend(require('./plugins/dst/src/index.js'))
// let zones = require('/Users/spencer/mountain/spacetime/zonefile/iana.js')
// const alias = require('/Users/spencer/mountain/spacetime/plugins/better-dst/zonefile/aliases.js')

let str = spacetime('Sunday, May 30 1:00 PM').format('time')
// 'Sun May 30 2021 13:00:00 GMT-0400 (Eastern Daylight Time)'
// let str=spacetime('Sunday, May 30 1:00 PM').toLocalDate().toString()
// // 'Sun May 30 2021 01:00:00 GMT-0400 (Eastern Daylight Time)'
// let str=spacetime('Sunday, May 30 1:00 pm').toLocalDate().toString()
// // 'Sun May 30 2021 01:00:00 GMT-0400 (Eastern Daylight Time)'
// let str=spacetime('Sunday, May 30 1:00pm').toLocalDate().toString()
// // 'Sun May 30 2021 13:00:00 GMT-0400 (Eastern Daylight Time)'

console.log(str)
