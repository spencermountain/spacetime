//turn our timezone data into a small-as-possible string
const fs = require('fs')
const iana = require('./iana')
const prefixes = require('./_prefixes.js')
let all = {}

// const addHemisphere = function(res, obj, h) {
//   Object.keys(obj).forEach((k) => {
//     let val = obj[k]
//     let key = val + '|' + h
//     if (typeof val === 'string') {
//       let found = iana[val]
//       key = found.offset + '|' + h
//     }
//     res[key] = res[key] || []
//     res[key].push(k)
//   })
//   return res
// }

//pack iana data into a [o|h] object
Object.keys(iana).forEach((k) => {
  let o = iana[k]
  let key = o.offset + '|' + o.hem
  if (o.dst) {
    key += '|' + o.dst
  }
  all[key] = all[key] || []
  let name = k.replace(/(.*?)\//, (a, prefix) => {
    let index = prefixes.indexOf(prefix)
    if (index !== -1) {
      return index + '/'
    }
    return a
  })
  all[key].push(name)
})

//add-in informal abbreviations
// all = addHemisphere(all, informal.south, 's')
// all = addHemisphere(all, informal.north, 'n')


let keys = Object.keys(all)
keys = keys.sort((a, b) => a < b ? 1 : -1)
let result = {}
keys.forEach((k) => {
  result[k] = all[k].join(',')
})

// console.log(result)
fs.writeFileSync('./zonefile/_build.json', JSON.stringify(result, null, 2))
