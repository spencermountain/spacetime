import spacetime from '../src/index.js'

let start = 2020
let tz = 'america/toronto'
let s = spacetime.now(tz)

let arr = []
for (let y = start; y < start + 5; y += 1) {
  s = s.year(y).startOf('year')
  arr.push([s.epoch, y, 1, 1])
}
// console.log(s.timezone())
// console.log(spacetime.timezones())

console.log(arr)