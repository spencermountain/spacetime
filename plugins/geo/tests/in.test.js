let test = require('tape')
const spacetime = require('spacetime')
const geo = require('../src')
// const geo = require('../builds/spacetime-geo')

test('test some lat/lngs', function(t) {
  spacetime.extend(geo)

  let s = spacetime('june 4 2018', 'Canada/Eastern').time('3:37pm')
  s = s.in([48.7235, 1.9931]) //near paris
  t.equal(s.timezone().name, 'Europe/Paris', 'found-paris')
  t.equal(s.time(), '9:37pm', 'time has moved')

  s = s.in([42.7235, -73.6931]) //new york
  t.equal(s.timezone().name, 'America/New_York', 'found-ny')
  t.equal(s.time(), '3:37pm', 'time has back to eastern')

  s = s.in([50.405, -31.8971]) // atlantic ocean
  t.equal(s.timezone().name, 'Etc/GMT+2', 'found-ocean')
  t.equal(s.time(), '5:37pm', 'time has moved to ocean')

  s = s.in([50.405, -18.8971]) //bit further atlantic ocean
  t.equal(s.timezone().name, 'Etc/GMT+1', 'futher-into-ocean')
  t.equal(s.time(), '6:37pm', 'almost europe')

  s = s.in([50.405, -40.8971]) //bit closer to canada
  t.equal(s.timezone().name, 'Etc/GMT+3', 'closer-to-halifax')
  t.equal(s.time(), '4:37pm', 'almost halifax')

  s = s.in([-20, -40.8971]) //down to brazil
  t.equal(s.timezone().name, 'America/Sao_Paulo', 'closer-to-halifax')
  t.equal(s.time(), '4:37pm', 'almost halifax')

  t.end()
})
