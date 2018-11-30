const data = require('./_build.json')
const prefixes = require('./_prefixes.js')

let all = {}
Object.keys(data).forEach((k) => {
  let split = k.split('|')
  let obj = {
    offset: Number(split[0]),
    hem: split[1],
  }
  if (split[2]) {
    obj.dst = split[2]
  }
  let names = data[k].split(',')
  names.forEach((str) => {
    str = str.replace(/(^[0-9]+)\//, (before, num) => {
      let city = str.replace(before, '')
      all[city] = obj
      num = Number(num)
      return prefixes[num] + '/'
    })
    all[str] = obj
  })
})

// console.log(Object.keys(all).length)
// console.log(all)
module.exports = all
