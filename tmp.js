
// dupes:
// CST|CDT
// WET|WEST
// ALMT
// GMT
// AMT
// CST
// GST
import zones from '/Users/spencer/mountain/timezone-soft/data/index.js'
import iana from './src/zonefile/iana.js'


let count = 0
let aliases = {}
Object.keys(iana).forEach(k => {
  if (!zones[k]) {
    let str = k.toLowerCase()
    let found = Object.keys(zones).find(k2 => {
      return zones[k2].names.find(s2 => s2 === str)
    })
    aliases[k] = found
  }
})

let rest = {}
Object.keys(iana).forEach(k => {
  if (!aliases[k]) {
    rest[k] = iana[k]
    // console.log(k)
  }
})

// console.log(Object.keys(rest).length)
console.log(JSON.stringify(rest, null, 2))