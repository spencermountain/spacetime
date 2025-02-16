import test from 'tape'
import spacetime from './lib/index.js'
const here = 'json in/out: '

test('json in-out', (t) => {
  let arr = [
    '2011-12-03T10:15:30.003+01:00',
    '2011-12-03T10:15:30.003Z'
  ]
  arr.forEach(str => {
    let a = spacetime(str)
    let json = a.json()
    let b = spacetime(json)
    t.equal(b.format('iso'), str, here + str)
  })
  t.end()
})