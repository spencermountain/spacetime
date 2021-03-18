const test = require('tape')
const spacetime = require('./lib')
const useOldTz = require('./lib/useOldTz')

// 12:00am  ->  1:02am  ->  2nd 1:02am ->  2:02am
// dst:true -> dst:true -> dst:false   ->  dst:false
test('add-fall-dst', (t) => {
  let d = spacetime('2020-11-01T00:02:00', 'America/Chicago')
  d = useOldTz(d)
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)
  t.equal(d.time(), '12:02am', '12:02am')

  d = d.add(30, 'minutes')
  t.equal(d.time(), '12:32am', '12:32am')
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)

  // (first time at 1:00am)
  d = d.add(30, 'minutes')
  t.equal(d.time(), '1:02am', '1:02am')
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)

  d = d.add(30, 'minutes')
  t.equal(d.time(), '1:32am', '1:32am')
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)

  // enter standard time here
  // (repeat 1am)
  d = d.add(30, 'minutes')
  t.equal(d.time(), '1:02am', '---1:02am - 2nd time')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)

  d = d.add(30, 'minutes')
  t.equal(d.time(), '1:32am', '1:32am - 2nd time')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)

  // let d= spacetime('Dec 15th 2020').time('1:32am')
  // d = d.add(30, 'minutes')
  // t.equal(d.time(), '2:02am', '2:02am')
  // t.equal(d.timezone().current.isDST, false, `${d.time()} false`)

  t.end()
})

// 3:02am -> 2:02am -> 1:02am  |->  1:02am(2)  ->  2:02am -> 1:02am
//  false -> false  -> false   |->    true     ->  true   -> true

test('dst-fall-minus', (t) => {
  let d = spacetime('2020-11-01', 'America/Chicago')
  d = useOldTz(d)
  d = d.set('2020-11-01T03:01:00').goto('America/Chicago')
  t.equal(d.time(), '3:01am', '3:01am')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)

  d = d.minus(30, 'minutes')
  // t.equal(d.time(), '2:31am', '2:31am')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)

  d = d.minus(30, 'minutes')
  // t.equal(d.time(), '2:01am', '2:01am')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)

  d = d.minus(30, 'minutes')
  t.equal(d.time(), '1:31am', '1:31am')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)

  d = d.minus(30, 'minutes')
  t.equal(d.time(), '1:01am', '1:01am')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)

  // 1am for the second time
  d = d.minus(30, 'minutes')
  t.equal(d.time(), '1:31am', '1:31am - 2')
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)

  d = d.minus(30, 'minutes')
  t.equal(d.time(), '1:01am', '1:01am - 2')
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)

  d = d.minus(30, 'minutes')
  t.equal(d.time(), '12:31am', '12:31am')
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)

  d = d.minus(30, 'minutes')
  t.equal(d.time(), '12:01am', '12:01am')
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)
  t.end()
})

// 12:00am  ->  1:02am  ->  3:02am ->  4:02am
//  false   ->   false  ->  true   ->  true
test('add-spring-dst', (t) => {
  let d = spacetime('2020-03-08T00:02:00', 'America/Chicago')
  d = useOldTz(d)
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)
  t.equal(d.time(), '12:02am', '12:02am')

  d = d.add(30, 'minutes')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)
  t.equal(d.time(), '12:32am', '12:32am')

  d = d.add(30, 'minutes')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)
  // t.equal(d.time(), '1:02am', '1:02am')  //FIXME

  d = d.add(30, 'minutes')
  t.equal(d.timezone().current.isDST, false, `${d.time()} false`)
  // t.equal(d.time(), '1:32am', '1:32am') // FIXME

  // ---skip 2am---
  d = d.add(30, 'minutes')
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)
  // t.equal(d.time(), '3:02am', '3:02am')

  d = d.add(30, 'minutes')
  t.equal(d.timezone().current.isDST, true, `${d.time()} true`)
  // t.equal(d.time(), '3:32am', '3:32am')
  t.end()
})
