const test = require('tape')
const spacetime = require('./lib')
const useOldTz = require('./lib/useOldTz')

// fall dst - Oct 25th 3am
test('fall-dst-repeats-hour', (t) => {
  let tz = 'europe/brussels' // 10/25:03
  // create 12:01am
  let s = spacetime('Oct 25th 2020 1:01am', tz)
  s = useOldTz(s)
  t.equal(s.time(), '1:01am', 'current time 1:01am')
  t.equal(s.timezone().current.isDST, true, 'in dst first')
  s = s.time('2:59am')
  t.equal(s.time(), '2:59am', 'current time 2:59am')
  t.equal(s.timezone().current.isDST, true, '1 minute away from dst')
  // should not be dst now
  s = s.add(1, 'minute')
  t.equal(s.timezone().current.isDST, false, '2:00am is after dst now')
  t.equal(s.time(), '2:00am', 'current time 2:00am again')
  s = s.add(1, 'minute')
  t.equal(s.timezone().current.isDST, false, '2:01am is after dst now')
  t.equal(s.time(), '2:01am', 'current time 2:01am')
  // go back
  s = s.minus(2, 'minute')
  t.equal(s.timezone().current.isDST, true, '2:59am is dst again')
  t.equal(s.time(), '2:59am', 'current time 2:59am again')

  t.end()
})

//spring dst -  03/29:02
test('spring-est-sneak', (t) => {
  let tz = 'europe/brussels'
  // create 12:01am
  let s = spacetime('March 29th 2020 1:01am', tz)
  s = useOldTz(s)
  t.equal(s.time(), '1:01am', 'current time 1:01am')
  t.equal(s.timezone().current.isDST, false, 'not in dst yet')

  // 1 second from dst
  s = s.time('1:59am')
  t.equal(s.time(), '1:59am', 'current time 1:59am')
  t.equal(s.timezone().current.isDST, false, '1 minute from dst')

  // enter dst (skip an hour)
  s = s.add(1, 'minute')
  t.equal(s.time(), '3:00am', 'current time 3:00am')
  t.equal(s.timezone().current.isDST, true, '1 minute after')
  s = s.add(1, 'minute')
  t.equal(s.time(), '3:01am', 'current time 3:01am')
  t.equal(s.timezone().current.isDST, true, '2 minutes after')

  // go back
  s = s.minus(2, 'minute')
  t.equal(s.timezone().current.isDST, false, '1:59am is dst again')
  t.equal(s.time(), '1:59am', 'current time 1:59am again')

  t.end()
})
