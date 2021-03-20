// eu - 03/28:02->10/31:03
const zones = require('/Users/spencer/mountain/spacetime/zonefile/iana.js')
let keys = Object.keys(zones)
console.log(keys.length)
keys = keys.filter((k) => {
  return zones[k].dst //&& !zones[k].dst.includes('03/28')
})
// usa
keys = keys.filter((k) => zones[k].dst !== '03/14:02->11/07:02')
// australia
// keys = keys.filter((k) => zones[k].dst !== '04/04:03->10/03:02')
// // mexico
// keys = keys.filter((k) => zones[k].dst !== '04/04:02->10/31:02')
console.log(keys.length)
console.log(keys)
