import test from 'tape'
import getDst from '../src/index.js'
import tzdb from '../tzdb/index.js'
import zones from '../data/zonefile.2022.js'

test('test tzdb', (t) => {

  let year = 2022
  Object.keys(zones).forEach(tz => {
    let changes = getDst(tz, year)
    if (tzdb[tz]) {
      let fromDb = tzdb[tz][year] || []
      t.equal(changes.start, fromDb[0], '[start] ' + tz)
      t.equal(changes.end, fromDb[1], '[end] ' + tz)
    }
  })
  t.end()
})


let tz = 'America/Los_Angeles'
tz = 'America/Toronto'
tz = 'Europe/Zaporozhye'
// tz = 'Europe/Sofia'
// tz = 'Asia/Hebron'
// tz = 'Australia/Adelaide'
// const year = 2023
// for (let i = 2021; i < 2024; i += 1) {
//   console.log(i)
//   isCorrect(tz, i)
// }
// console.log(getDst(tz, 2022))