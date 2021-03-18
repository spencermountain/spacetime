let test = require('tape')
const spacetime = require('spacetime')
const daylight = require('../src')
// const daylight = require('../builds/spacetime-daylight')
spacetime.extend(daylight)

test('day-length-winter', function (t) {
  let s = spacetime('December 16 2018')
  let newYork = s.daylight(42.7235, -73.6931)
  t.equal(newYork.duration.human.hours, 9, 'short-days in NY')
  let equator = s.daylight(0, 0)
  t.equal(equator.duration.human.hours, 12, 'medium-days in equator')
  t.end()
})

test('day-length-summer', function (t) {
  let s = spacetime('June 21 2018')
  let newYork = s.daylight(42.7235, -73.6931)
  t.equal(newYork.duration.human.hours, 15, 'long-days in NY')
  let equator = s.daylight(0, 0)
  t.equal(equator.duration.human.hours, 12, 'medium-days in equator')
  t.end()
})

test('using-point()-winter', function (t) {
  let s = spacetime('December 16 2018', 'Canada/Eastern')
  let newYork = s.daylight()
  t.equal(newYork.duration.human.hours, 8, 'short-days in Toronto')
  s = s.goto('Africa/Freetown')
  let equator = s.daylight()
  t.equal(equator.duration.human.hours, 11, 'medium-days in sierra-leone')
  t.end()
})

test('using-point()-summer', function (t) {
  let s = spacetime('June 21 2018', 'Canada/Eastern')
  let newYork = s.daylight()
  t.equal(newYork.duration.human.hours, 15, 'long-days in Toronto')
  s = s.goto('Africa/Freetown')
  let equator = s.daylight()
  t.equal(equator.duration.human.hours, 12, 'medium-days in sierra-leone')
  t.end()
})
