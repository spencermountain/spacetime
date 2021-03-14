const test = require('tape')
const spacetime = require('spacetime')
const geo = require('../src')
// const geo = require('../builds/spacetime-geo')

test('test some lat/lngs', function(t) {
  spacetime.extend(geo)

  let s = spacetime('june 4 2018', 'Canada/Eastern')
  let point = s.point()
  t.equal(parseInt(point.lat, 10), 43, 'toronto-lat')
  t.equal(parseInt(point.lng, 10), -79, 'toronto-lng')

  s = spacetime('june 14 2018', 'Canada/Pacific')
  point = s.point()
  t.equal(parseInt(point.lat, 10), 49, 'vancouver-lat')
  t.equal(parseInt(point.lng, 10), -123, 'vancouver-lng')

  s = spacetime.now('Europe/Paris')
  point = s.point()
  t.equal(parseInt(point.lat, 10), 48, 'paris-lat')
  t.equal(parseInt(point.lng, 10), 2, 'paris-lng')

  t.end()
})
