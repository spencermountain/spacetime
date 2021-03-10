const zones = require('/Users/spencer/mountain/spacetime/zonefile/iana.js')
let keys = Object.keys(zones)

const titleCase = (str) => {
  str = str[0].toUpperCase() + str.substr(1)
  str = str.replace(/\/gmt/, '/GMT')
  str = str.replace(/[\/_]([a-z])/gi, (s) => {
    return s.toUpperCase()
  })
  return str
}

keys = keys.filter((k) => zones[k].dst)
// keys = keys.filter((k) => zones[k].hem === 's')
// keys = keys.map((k) => titleCase(k))

let byDate = {}
keys.forEach((k) => {
  let off = '' + zones[k].offset + 'h  ' + zones[k].dst
  let init = {
    name: '',
    abbrev: '',
    abbrev_dst: '',
    offset: zones[k].offset,
    pattern: {},
    dst: zones[k].dst,
    ids: []
  }
  byDate[off] = byDate[off] || init
  let id = titleCase(k)
  byDate[off].ids.push(id)
})
let result = Object.values(byDate)
result = result
  .sort((a, b) => {
    if (a.offset > b.offset) {
      return -1
    } else if (a.offset < b.offset) {
      return 1
    }
    return 0
  })
  .reverse()
console.log(result.length)
// console.log(JSON.stringify(result, null, 2))
