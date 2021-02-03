const test = require('tape')
const spacetime = require('./lib')
const useOldTz = require('./lib/useOldTz')

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]
const allMonths = (s) =>
  months.map((m) => {
    s = s.month(m)
    let meta = s.timezone()
    return meta.current.isDST
  })

test('dst-by-date', (t) => {
  //this may be too hard to do.
  let s = spacetime('March 11, 2017 10:42:00', 'Canada/Eastern')
  s = useOldTz(s)
  let dst = s.timezone().current.isDST
  t.equal(dst, false, 'march-11 not dst')

  // s = spacetime('March 12, 2017 23:59:00', 'Canada/Eastern'); //TODO:get this to work
  s = spacetime('March 13, 2017 23:59:00', 'Canada/Eastern')
  dst = s.timezone().current.isDST
  t.equal(dst, true, 'march-12 is dst')
  t.end()
})

test('dst-by-month', (t) => {
  ////        jan   feb    mar    apr   may   jun   july   aug   sept  oct   nov   dec
  let est = [false, false, false, true, true, true, true, true, true, true, true, false]
  let pst = [false, false, false, true, true, true, true, true, true, true, false, false]
  let aus = [true, true, true, false, false, false, false, false, false, true, true, true] //april 2, oct 1
  let tai = [false, false, false, false, false, false, false, false, false, false, false, false] //no dst
  let s = spacetime('January 1, 2016 20:42:00', 'Canada/Eastern')
  s = useOldTz(s)
  t.deepEqual(allMonths(s), est, 'est')

  s = spacetime('January 2, 2016 20:42:00', 'Canada/Pacific')
  s = useOldTz(s)
  t.deepEqual(allMonths(s), pst, 'pst')

  s = spacetime('January 2, 2016 20:42:00', 'Australia/Canberra')
  s = useOldTz(s)
  t.deepEqual(allMonths(s), aus, 'Australia/Canberra')

  s = spacetime('January 2, 2016 20:42:00', 'Asia/Taipei')
  s = useOldTz(s)
  t.deepEqual(allMonths(s), tai, 'Taipei')
  t.end()
})

test('sneaky-dst', (t) => {
  let s = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  s = useOldTz(s)
  s = s.hour(0)
  //move date over a dst change
  s = s.date(2)
  t.equal(s.date(), 2, 'sneaky-apply-dst')
  t.end()
})

test('set hour() -dst', (t) => {
  let d = spacetime('2020-03-08T08:45:00', 'America/Chicago')
  d = useOldTz(d)
  d = d.hour(0)
  t.equal(d.iso(), '2020-03-08T00:45:00.000-06:00', 'sneaky-hour')
  t.end()
})

test('has-dst', (t) => {
  let s = spacetime('March 28, 1999 20:42:00', 'Africa/Algiers')
  s = useOldTz(s)
  t.equal(s.hasDST(), false, 'never has dst')
  t.equal(s.inDST(), false, 'not in dst')

  s = spacetime('March 11, 2017 20:42:00', 'Canada/Eastern')
  t.equal(s.hasDST(), true, 'sometimes has dst')
  t.equal(s.inDST(), false, 'not in dst though')
  s = s.add(3, 'weeks')
  //now its in dst
  t.equal(s.inDST(), true, 'in dst now')
  t.end()
})
