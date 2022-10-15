import test from 'tape'
import getDst from '../dst/index.js'
import tzdb from '../tzdb/index.js'
import zones from '../data/zonefile.2022.js'

const skip = {
  'Antarctica/Macquarie': true,
  'Pacific/Chatham': true,
  'Pacific/Fiji': true,
  'Pacific/Norfolk': true,
  'Africa/Juba': true, //one-off dst change in 2021
  'Pacific/Apia': true, //one-off dst change in 2021
}

test('all zones', (t) => {
  for (let year = 2021; year < 2024; year += 1) {
    Object.keys(zones).forEach(tz => {
      let changes = getDst(tz, year)
      if (tzdb[tz] && !skip[tz]) {
        let fromDb = tzdb[tz][String(year)] || []
        t.equal(changes.start, fromDb[0], `[start] ${year} ${tz}`)
        t.equal(changes.end, fromDb[1], `[end]  ${year} ${tz}`)
      }
    })
  }
  t.end()
})

