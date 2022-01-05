//turn our timezone data into a small-as-possible string
import { writeFileSync } from 'fs'
import iana from './iana.js'
import aliases from './aliases.js'
import prefixes from './_prefixes.js'
let all = {}

// add aliases in
Object.keys(aliases).forEach((k) => {
  let found = iana[aliases[k]]
  if (!found) {
    console.log('missing', aliases[k])
  }
  iana[k] = Object.assign({}, found)
})

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
keys = keys.sort((a, b) => (a < b ? 1 : -1))
let result = {}
keys.forEach((k) => {
  result[k] = all[k].join(',')
})

// console.log(result)
writeFileSync('./zonefile/_build.js', 'export default ' + JSON.stringify(result, null, 2))
