import test from 'tape'
import spacetime from './lib/index.js'

test('set day forward', (t) => {
  let days = ['thu', 'fri', 'sat', 'sun', 'mon', 'tue', 'wed']
  let d = spacetime('march 18 2021') //thursday
  days.forEach((day, i) => {
    let s = d.day(day, true)
    let want = d.add(i, 'days')
    t.equal(s.format('iso-short'), want.format('iso-short'), day)
  })
  t.end()
})

test('set day backward', (t) => {
  let days = ['tue', 'mon', 'sun', 'sat', 'fri', 'thu', 'wed']
  let d = spacetime('march 23 2021') //tuesday
  days.forEach((day, i) => {
    let s = d.day(day, false)
    let want = d.minus(i, 'days')
    t.equal(s.format('iso-short'), want.format('iso-short'), day)
  })
  t.end()
})
