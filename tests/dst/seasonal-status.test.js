import test from 'tape'
import spacetime from '../_lib/index.js'
import useOldTz from '../_lib/use-old-tz.js'

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
    const meta = s.timezone()
    return meta.current.isDST
  })

test('dst-by-date', (t) => {
  useOldTz(spacetime(null, 'UTC'), t)
  let s = spacetime('March 11, 2017 10:42:00', 'Canada/Eastern')
  let dst = s.timezone().current.isDST
  t.equal(dst, false, 'march-11 not dst')

  s = spacetime('March 12, 2017 23:59:00', 'Canada/Eastern')
  dst = s.timezone().current.isDST
  t.equal(dst, true, 'march-12 is dst')
  t.end()
})

// These dates exercise the fixed rules in useOldTz, not historical timezone data.
test('dst-by-month', (t) => {
  useOldTz(spacetime(null, 'UTC'), t)
  ////        jan   feb    mar    apr   may   jun   july   aug   sept  oct   nov   dec
  const est = [false, false, false, true, true, true, true, true, true, true, true, false]
  const pst = [false, false, false, true, true, true, true, true, true, true, false, false]
  const aus = [true, true, true, false, false, false, false, false, false, true, true, true] //april 2, oct 1
  const tai = [false, false, false, false, false, false, false, false, false, false, false, false] //no dst
  let s = spacetime('January 1, 2016 20:42:00', 'Canada/Eastern')
  t.deepEqual(allMonths(s), est, 'est')

  s = spacetime('January 2, 2016 20:42:00', 'Canada/Pacific')
  t.deepEqual(allMonths(s), pst, 'pst')

  s = spacetime('January 2, 2016 20:42:00', 'Australia/Canberra')
  t.deepEqual(allMonths(s), aus, 'Australia/Canberra')

  s = spacetime('January 2, 2016 20:42:00', 'Asia/Taipei')
  t.deepEqual(allMonths(s), tai, 'Taipei')
  t.end()
})

test('sneaky-dst', (t) => {
  useOldTz(spacetime(null, 'UTC'), t)
  let s = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  s = s.hour(0)
  //move date over a dst change
  s = s.date(2)
  t.equal(s.date(), 2, 'sneaky-apply-dst')
  t.end()
})

test('set hour() -dst', (t) => {
  useOldTz(spacetime(null, 'UTC'), t)
  let d = spacetime('2020-03-08T08:45:00', 'America/Chicago')
  d = d.hour(0)
  t.equal(d.iso(), '2020-03-08T00:45:00.000-06:00', 'sneaky-hour')
  t.end()
})

test('has-dst', (t) => {
  useOldTz(spacetime(null, 'UTC'), t)
  let s = spacetime('March 28, 1999 20:42:00', 'Africa/Algiers')
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
