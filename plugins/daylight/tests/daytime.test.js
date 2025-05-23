import test from 'tape'
import spacetime from 'spacetime'
import daylight from '../src/index.js'
// import daylight from '../builds/spacetime-daylight.mjs'
spacetime.extend(daylight)

test('day-status-summer', function (t) {
  const s = spacetime('June 26 2018', 'Canada/Eastern')
  let o = {}
  o = s.time('3:30am').daylight()
  t.equal(o.current.status, 'night', '3:30am')
  o = s.time('5:30am').daylight()
  t.equal(o.current.status, 'dawn', '5:30am')
  o = s.time('11:30am').daylight()
  t.equal(o.current.status, 'day', '11:30am')
  o = s.time('5:30pm').daylight()
  t.equal(o.current.status, 'day', '5:30pm')
  o = s.time('9:30pm').daylight()
  t.equal(o.current.status, 'dusk', '9:30pm')
  o = s.time('11:30pm').daylight()
  t.equal(o.current.status, 'night', '11:30pm')
  t.equal(o.current.progress, 0, 'no-sun-11:30pm')
  t.end()
})

test('day-status-winter', function (t) {
  const s = spacetime('November 26 2018', 'Canada/Eastern')
  let o = {}
  o = s.time('3:30am').daylight()
  t.equal(o.current.status, 'night', '3:30am')
  t.equal(o.current.progress, 0, 'no-sun-3am')
  o = s.time('7:00am').daylight()
  t.equal(o.current.status, 'dawn', '7:00am')
  o = s.time('11:30am').daylight()
  t.equal(o.current.status, 'day', '11:30am')
  o = s.time('4:30pm').daylight()
  t.equal(o.current.status, 'day', '4:30pm')
  o = s.time('5:00pm').daylight()
  t.equal(o.current.status, 'dusk', '5:00pm')
  o = s.time('11:30pm').daylight()
  t.equal(o.current.status, 'night', '11:30pm')
  t.end()
})
