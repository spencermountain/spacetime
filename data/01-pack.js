//turn our timezone data into a small-as-possible string
const fs = require('fs')
const iana = require('./iana')
const informal = require('./informal')

const addHemisphere = function(all, obj, h) {
  Object.keys(obj).forEach((k) => {
    let val = obj[k]
    let key = val + '|' + h
    if (typeof val === 'string') {
      let found = iana[val]
      key = found.offset + '|' + h
    }
    all[key] = all[key] || []
    all[key].push(k)
  })
}

const all = {}
//pack iana data into a [o|h] object
Object.keys(iana).forEach((k) => {
  let o = iana[k]
  let key = o.offset + '|' + o.hem
  if (o.dst) {
    key += '|' + o.dst
  }
  all[key] = all[key] || []
  all[key].push(k.toLowerCase())
})

//add-in informal abbreviations
addHemisphere(all, informal.south, 's')
addHemisphere(all, informal.north, 'n')

console.log(all)

let keys = Object.keys(all)
keys = keys.sort((a, b) => a < b ? 1 : -1)
// let result = {}
// keys.forEach((k) => {
//   result[k] = all[k].join(',')
// })
// console.log(result)

// fs.writeFileSync('./data/_build.js', JSON.stringify(result, null, 2))
