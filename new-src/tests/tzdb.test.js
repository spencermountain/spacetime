import test from 'tape'
import getDst from '../dst/index.js'
import tzdb from '../tzdb/index.js'
import zones from '../data/zonefile.2022.js'

const skip = {
  'Antarctica/Macquarie': true,
  'Pacific/Chatham': true,
  'Pacific/Fiji': true,
  'Pacific/Norfolk': true,
}

test('all zones 2022', (t) => {
  let year = 2022
  Object.keys(zones).forEach(tz => {
    let changes = getDst(tz, year)
    if (tzdb[tz] && !skip[tz]) {
      let fromDb = tzdb[tz][String(year)] || []
      t.equal(changes.start, fromDb[0], '[start] ' + tz)
      t.equal(changes.end, fromDb[1], '[end] ' + tz)
    }
  })
  t.end()
})

test('all zones 2023', (t) => {
  let year = 2023
  Object.keys(zones).forEach(tz => {
    let changes = getDst(tz, year)
    if (tzdb[tz] && !skip[tz]) {
      let fromDb = tzdb[tz][String(year)] || []
      t.equal(changes.start, fromDb[0], '[start] ' + tz)
      t.equal(changes.end, fromDb[1], '[end] ' + tz)
    }
  })
  t.end()
})
