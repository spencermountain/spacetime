import zones from './zonefile.2022.js'
import patterns from './patterns.js'
import { fromJSDate, fromSpace } from './calc.js'
// import spacetime from '../../../src/index.js'
// let zones = {
// }


const pad = (num) => {
  return String(num).padStart(2, '0')
}

// test spacetime version
Object.keys(zones).forEach(k => {
  if (zones[k].dst) {
    let pattern = patterns[zones[k].pattern]
    let start = fromSpace(pattern.start, 2022)
    let end = fromSpace(pattern.end, 2022)
    let dst = `${pad(start.month() + 1)}/${pad(start.date())}:${pad(pattern.start.hour)}->`
    dst += `${pad(end.month() + 1)}/${pad(end.date())}:${pad(pattern.end.hour)}`
    // console.log(k, pattern)
    if (dst !== zones[k].dst) {
      console.log('\n', k)
      console.log(pattern)
      console.log('made', dst)
      console.log('want', zones[k].dst)
    }
    console.log(dst === zones[k].dst)
  }
})

// test js date version
// Object.keys(zones).forEach(k => {
//   if (zones[k].dst) {
//     let pattern = patterns[zones[k].pattern]
//     let start = fromJSDate(pattern.start, 2022)
//     let end = fromJSDate(pattern.end, 2022)
//     let dst = `${pad(start.getMonth() + 1)}/${pad(start.getDate())}:${pad(pattern.start.hour)}->`
//     dst += `${pad(end.getMonth() + 1)}/${pad(end.getDate())}:${pad(pattern.end.hour)}`
//     // console.log(k, pattern)
//     if (dst !== zones[k].dst) {
//       console.log('\n', k)
//       console.log(pattern)
//       console.log('made', dst)
//       console.log('want', zones[k].dst)
//     }
//     console.log(dst === zones[k].dst)
//   }
// })

// console.log(calculate({ num: 1, day: 0, month: 3, hour: 0 }, 2022))