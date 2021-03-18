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

keys = keys.filter((k) => !zones[k].dst)
keys = keys.filter((k) => zones[k].hem === 's')
// keys = keys.map((k) => titleCase(k))

let byOffset = {}
keys.forEach((k) => {
  let off = '' + zones[k].offset
  byOffset[off] = byOffset[off] || []
  let id = titleCase(k)
  byOffset[off].push(id)
})

let res = {}
let nums = Object.keys(byOffset)
nums = nums.sort((a, b) => {
  if (a > b) {
    return -1
  } else if (a < b) {
    return 1
  }
  return 0
})
nums.forEach((num) => {
  res[num] = byOffset[num]
  byOffset[num] = byOffset[num].sort((a, b) => {
    a = Number(a)
    b = Number(b)
    if (a > b) {
      return -1
    } else if (a < b) {
      return 1
    }
    return 0
  })
})
// let byRegion = {}
// keys.forEach((k) => {
//   let split = k.split(/\//)
//   byRegion[split[0]] = byRegion[split[0]] || []
//   byRegion[split[0]].push(split[1])
// })

console.log(JSON.stringify(res, null, 2))
