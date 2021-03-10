const spacetime = require('./src/index')
spacetime.extend(require('./plugins/week-math/plugin.js'))

//
//
//
//
// const useOldTz = require('./test/lib/useOldTz')
// chicago - '03/14:02->11/07:02'
// old tz    '03/08:02->11/01:02'
// let s = spacetime('March 14th 2020 1:01am', 'America/Chicago')
// let s = spacetime('March 8th 2020 1:01am', 'America/Chicago')

// let s = spacetime('2020-03-08T01:01:00', 'America/Chicago')
// let s = spacetime('2020-03-08 1:01am', 'America/Chicago')
// s = useOldTz(s)

// console.log(s.time()) // 1:01am
// s = s.add(30, 'minutes')
// console.log(s.time()) // 1:31am
// s = s.add(30, 'minutes')
// console.log(s.time()) // 3:01am

// const topk = function (arr) {
//   let obj = {}
//   arr.forEach((a) => {
//     obj[a] = obj[a] || 0
//     obj[a] += 1
//   })
//   let res = Object.keys(obj).map((k) => [k, obj[k]])
//   return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
// }
// let arr = keys.map((k) => zones[k].dst)
// console.log(topk(arr))
