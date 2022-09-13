import zones from './zonefile.2022.js'
import patterns from './patterns.js'


const topk = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, obj[k]])
  return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
}

let all = Object.keys(zones).map(k => {
  return (zones[k].dst || '') + '|' + (zones[k].pattern || '')
})
all = topk(all)
all = all.map(a => {
  return a
})
console.log(all)