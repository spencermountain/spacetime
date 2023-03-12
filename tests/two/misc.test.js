import test from 'tape'
import spacetime from './_lib.js'
let here = '[misc-three] '

test('tz-iana interpretation', (t) => {
  let s = spacetime('2023-02-12T01:39:00-08:00')
  t.equal(s.time(), '1:39am', here + 'correct time')
  t.equal(s.timezone().name, 'Etc/GMT+8', here + 'assume etc')

  // handle match
  s = spacetime('2023-02-12T01:39:00-08:00', 'America/Los_Angeles')
  t.equal(s.time(), '1:39am', here + 'correct time')
  t.equal(s.timezone().name, 'America/Los_Angeles', here + 'allow matching iana')

  s = spacetime('2023-04-12T01:39:00-07:00', 'America/Los_Angeles')
  t.equal(s.time(), '1:39am', here + 'correct time')
  t.equal(s.timezone().name, 'America/Los_Angeles', here + 'allow matching iana in dst')


  // handle mis-match
  s = spacetime('2023-02-12T09:39:00Z', 'America/Los_Angeles')
  t.equal(s.time(), '1:39am', here + 'shifted time')
  t.equal(s.timezone().name, 'ETC/Utc', here + 'parsed as utc, spun to la')

  s = spacetime('2023-02-12T09:39:00Z'.goto('America/Los_Angeles'))
  t.equal(s.time(), '1:39am', here + 'shifted time')
  t.equal(s.timezone().name, 'ETC/Utc', here + 'parsed as utc, changed to la')


  // handle tricky mis-match
  s = spacetime('2023-02-12T01:39:00-07:00', 'America/Los_Angeles')
  t.equal(s.time(), '2:39am', here + 'correct time')
  t.equal(s.timezone().name, 'America/Los_Angeles', here + 'allow co-erced iana')

  s = spacetime('2023-06-12T01:39:00-08:00', 'America/Los_Angeles')
  t.equal(s.time(), '12:39am', here + 'correct time')
  t.equal(s.timezone().name, 'America/Los_Angeles', here + 'allow co-erced iana in dst')

  t.end()
})

// #376
test('tz-iana near dst', (t) => {
  let s = spacetime('2023-03-12T01:39:00-08:00', 'America/Los_Angeles')
  t.equal(s.time(), '1:39am', here + 'with-parse')

  s = spacetime('2023-03-12T01:39:00-08:00').goto('America/Los_Angeles')
  t.equal(s.time(), '1:39am', here + 'after-parse')

  t.end()
})