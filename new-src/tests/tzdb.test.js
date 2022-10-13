import test from 'tape'
import getDst from '../src/index.js'
import tzdb from '../tzdb/index.js'
import zones from '../data/zonefile.2022.js'

test('all zones 1 year', (t) => {
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
