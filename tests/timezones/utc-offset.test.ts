import test from 'tape'
import spacetime from '../_lib/index.ts'

//https://en.wikipedia.org/wiki/ISO_8601
//the zone designator would be "+01:00", "+0100", or simply "+01"
test('set-offset-from-ISO-8601', (t) => {
  const defaultTz = 'Canada/Eastern'
  const arr = [
    ['2017-04-03T08:00:00-0700', 'Etc/GMT+7'],
    ['2017-04-03T08:00:00-1000', 'Etc/GMT+10'],
    ['2017-04-03T08:00:00+0700', 'Etc/GMT-7'],
    ['2017-10-03T08:00:00+0000', 'Etc/GMT'],
    // ['2017-04-03T08:00:00-0500', defaultTz], //the same
    ['2017-05-03T13:00:00+0500', 'Etc/GMT-5'],
    ['2017-04-02T08:00:00-10:00', 'Etc/GMT+10'],
    ['2017-04-11T02:00:00+10:00', 'Etc/GMT-10'],
    ['2017-04-02T08:00:00-01:00', 'Etc/GMT+1'],
    ['2017-04-11T02:00:00+01:00', 'Etc/GMT-1'],
    ['2018-04-10T08:00:00-03', 'Etc/GMT+3'],
    ['2017-04-03T12:00:00+03', 'Etc/GMT-3'],
    ['2017-04-03T01:00:00+00', 'Etc/GMT'],
    ['2017-04-03T01:00:00Z', 'UTC'],
    ['2019-02-22T20:00:00+05:30', '+05:30'],
    ['2019-02-22T01:00:00+0530', '+05:30']
  ]
  t.equal(spacetime('2017-04-03T08:00:00', defaultTz).timezone().name, defaultTz, 'no offset')
  arr.forEach((a) => {
    const s = spacetime(a[0])
    t.equal(s.timezone().name, a[1], a[0])
    // a given timezone shows the same moment, in that timezone
    const given = spacetime(a[0], defaultTz)
    t.equal(given.timezone().name, defaultTz, a[0] + ' with timezone')
    t.equal(given.epoch, s.epoch, a[0] + ' same moment')
  })

  t.end()
})

test('offset-should-be-consistant', (t) => {
  const s = spacetime('2019-03-13T18:00:00.000-05:00')
  t.equal(s.format('iso').slice(-6), '-05:00')
  t.end()
})

test('offset', (t) => {
  let s = spacetime('Oct 12 2020', 'America/New_York')
  t.equal(s.offset(), -240, '-240 offset')

  s = spacetime('march 1 2020', 'America/New_York')
  t.equal(s.offset(), -300, '-300 offset')
  t.end()
})
