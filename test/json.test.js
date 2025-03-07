import test from 'tape'
import spacetime from './lib/index.js'

test('json in-out', (t) => {
  let arr = [
    '2011-12-03T10:15:30.003+01:00',
    '2011-12-03T10:15:30.003Z',
    '2020-03-20T22:15:33.645-04:00',
    '2022-01-01T00:00:00.000Z',
    '2022-12-31T23:59:59.999Z',
    '2023-06-15T12:30:00.000-07:00'
  ]
  arr.forEach(str => {
    let a = spacetime(str)
    let json = a.json()
    let b = spacetime(json)
    t.equal(b.format('iso'), str, 'constr json' + str)
    let c = spacetime.now().json(json)
    t.equal(c.format('iso'), str, 'json input' + str)
  })
  t.end()
})