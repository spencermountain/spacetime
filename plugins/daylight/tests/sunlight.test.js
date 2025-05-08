import test from 'tape'
import spacetime from 'spacetime'
import daylight from '../src/index.js'
// import daylight from '../builds/spacetime-daylight.mjs'
spacetime.extend(daylight)

test('day-length-winter', function (t) {
  const s = spacetime('December 16 2018')
  const newYork = s.daylight(42.7235, -73.6931)
  t.equal(newYork.duration.human.hours, 9, 'short-days in NY')
  const equator = s.daylight(0, 0)
  t.equal(equator.duration.human.hours, 12, 'medium-days in equator')
  t.end()
})

test('day-length-summer', function (t) {
  const s = spacetime('June 21 2018')
  const newYork = s.daylight(42.7235, -73.6931)
  t.equal(newYork.duration.human.hours, 15, 'long-days in NY')
  const equator = s.daylight(0, 0)
  t.equal(equator.duration.human.hours, 12, 'medium-days in equator')
  t.end()
})

test('using-point()-winter', function (t) {
  let s = spacetime('December 16 2018', 'Canada/Eastern')
  const newYork = s.daylight()
  t.equal(newYork.duration.human.hours, 8, 'short-days in Toronto')
  s = s.goto('Africa/Freetown')
  const equator = s.daylight()
  t.equal(equator.duration.human.hours, 11, 'medium-days in sierra-leone')
  t.end()
})

test('using-point()-summer', function (t) {
  let s = spacetime('June 21 2018', 'Canada/Eastern')
  const newYork = s.daylight()
  t.equal(newYork.duration.human.hours, 15, 'long-days in Toronto')
  s = s.goto('Africa/Freetown')
  const equator = s.daylight()
  t.equal(equator.duration.human.hours, 12, 'medium-days in sierra-leone')
  t.end()
})
