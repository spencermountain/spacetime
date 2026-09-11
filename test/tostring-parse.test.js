import test from 'tape'
import spacetime from './lib/index.js'

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
