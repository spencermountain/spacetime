import test from 'tape'
import spacetime from './lib/index.js'
import tk from 'timekeeper'

// support the format produced by javascript's Date.toString()
// eg. "Mon Jun 17 2019 11:00:00 GMT-0700 (Pacific Daylight Time)"
test('Date.toString() format', (t) => {
  const arr = [
    ['Mon Jun 17 2019 11:00:00 GMT-0700 (Pacific Daylight Time)', '2019-06-17T11:00:00-07:00'],
    ['Mon Jun 17 2019 11:00:00 GMT+0530 (India Standard Time)', '2019-06-17T11:00:00+05:30'],
    ['Sat Feb 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)', '2020-02-01T00:00:00Z'],
    // bare numeric offset, no GMT prefix, no tz-name
    ['Mon Jun 17 2019 11:00:00 -0700', '2019-06-17T11:00:00-07:00']
  ]
  arr.forEach((a) => {
    const left = spacetime(a[0])
    const right = spacetime(a[1])
    t.equal(left.isValid(), true, 'is-valid: ' + a[0])
    t.equal(left.epoch, right.epoch, a[0])
  })
  t.end()
})

test('text dates with offsets do not shift across midnight', (t) => {
  const inputs = [
    ['Mon Jun 17 2019 11:00:00 GMT+0530 (India Standard Time)', '2019-06-17T11:00:00+05:30'],
    ['Mon Jun 17 2019 11:00:00 GMT-0700 (Pacific Daylight Time)', '2019-06-17T11:00:00-07:00'],
    ['Mon Jun 17 2019 11:00:00 -0700', '2019-06-17T11:00:00-07:00'],
    ['Mon Jun 17 11:00:00 +0000 2019', '2019-06-17T11:00:00Z']
  ]
  try {
    for (const hour of [1, 23]) {
      tk.freeze(new Date(Date.UTC(2026, 8, 18, hour)))
      for (const zone of ['UTC', 'America/Los_Angeles', 'Asia/Tokyo']) {
        for (const [input, expected] of inputs) {
          const s = spacetime(input, zone)
          const label = `${input} from ${zone} at ${hour}:00 UTC`
          t.equal(s.format('iso-short'), '2019-06-17', label + ' preserves date')
          t.equal(s.epoch, Date.parse(expected), label + ' preserves instant')
        }
      }
    }
  } finally {
    tk.reset()
  }
  t.end()
})
