const test = require('tape')
const spacetime = require('./lib')

//https://en.wikipedia.org/wiki/ISO_8601
//the zone designator would be "+01:00", "+0100", or simply "+01"
test('set-offset-from-ISO-8601', (t) => {
  let defaultTz = 'Canada/Eastern'
  let arr = [
    ['2017-04-03T08:00:00', defaultTz],
    ['2017-04-03T08:00:00-0700', 'Etc/GMT+7'],
    ['2017-04-03T08:00:00-1000', 'Etc/GMT+10'],
    ['2017-04-03T08:00:00+0700', 'Etc/GMT-7'],
    ['2017-10-03T08:00:00+0000', 'Etc/GMT+0'],
    // ['2017-04-03T08:00:00-0500', defaultTz], //the same
    ['2017-05-03T13:00:00+0500', 'Etc/GMT-5'],
    ['2017-04-02T08:00:00-10:00', 'Etc/GMT+10'],
    ['2017-04-11T02:00:00+10:00', 'Etc/GMT-10'],
    ['2017-04-02T08:00:00-01:00', 'Etc/GMT+1'],
    ['2017-04-11T02:00:00+01:00', 'Etc/GMT-1'],
    ['2018-04-10T08:00:00-03', 'Etc/GMT+3'],
    ['2017-04-03T12:00:00+03', 'Etc/GMT-3'],
    ['2017-04-03T01:00:00+00', 'Etc/GMT+0'],
    ['2017-04-03T01:00:00Z', 'Etc/GMT+0'],
    ['2019-02-22T20:00:00+05:30', 'Etc/GMT-5.5'],
    ['2019-02-22T01:00:00+0530', 'Etc/GMT-5.5']
  ]
  arr.forEach((a) => {
    let s = spacetime(a[0], defaultTz)
    t.equal(s.timezone().name, a[1], a[0])
  })

  t.end()
})

test('offset-should-be-consistant', (t) => {
  let s = spacetime('2019-03-13T18:00:00.000-05:00')
  t.equal(s.format('iso').slice(-6), '-05:00')
  t.end()
})
