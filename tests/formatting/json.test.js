import test from 'tape'
import spacetime from '../_lib/index.js'

test('json in-out', (t) => {
  const arr = [
    '2011-12-03T10:15:30.003+01:00',
    '2011-12-03T10:15:30.003Z',
    '2020-03-20T22:15:33.645-04:00',
    '2022-01-01T00:00:00.000Z',
    '2022-12-31T23:59:59.999Z',
    '2023-06-15T12:30:00.000-07:00'
  ]
  arr.forEach(str => {
    const a = spacetime(str)
    const json = a.json()
    const b = spacetime(json)
    t.equal(b.format('iso'), str, 'constr json' + str)
    const c = spacetime.now().json(json)
    t.equal(c.format('iso'), str, 'json input' + str)
  })
  t.end()
})

test('json', (t) => {
  const s = spacetime('2019-11-05T11:01:03.030-03:00')
  const json = s.format('json')
  const want = {
    century: 21,
    decade: 2010,
    year: 2019,
    month: 10,
    date: 5,
    day: 2,
    hour: 11,
    minute: 1,
    second: 3,
    millisecond: 30
  }
  Object.keys(want).forEach((k) => {
    t.equal(want[k], json[k], 'json-' + k)
  })
  t.end()
})
