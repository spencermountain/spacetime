import test from 'tape'
import spacetime from '../_lib/index.js'

test('set day forward', (t) => {
  const days = ['thu', 'fri', 'sat', 'sun', 'mon', 'tue', 'wed']
  const d = spacetime('march 18 2021') //thursday
  days.forEach((day, i) => {
    const s = d.day(day, true)
    const want = d.add(i, 'days')
    t.equal(s.format('iso-short'), want.format('iso-short'), day)
  })
  t.end()
})

test('set day backward', (t) => {
  const days = ['tue', 'mon', 'sun', 'sat', 'fri', 'thu', 'wed']
  const d = spacetime('march 23 2021') //tuesday
  days.forEach((day, i) => {
    const s = d.day(day, false)
    const want = d.minus(i, 'days')
    t.equal(s.format('iso-short'), want.format('iso-short'), day)
  })
  t.end()
})

test('day aliases', (t) => {
  let s = spacetime().day('thurs')
  t.equal(s.format('day'), 'Thursday', 'thurs')
  s = spacetime().day('tues')
  t.equal(s.format('day'), 'Tuesday', 'tues')
  t.end()
})
