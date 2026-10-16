import test from 'tape'
import spacetime from '../_lib/index.js'

test('next', (t) => {
  let s = spacetime('Nov 2')
  s = s.next('month')
  t.equal(s.monthName(), 'december', 'dec')
  t.equal(s.date(), 1, 'dec 1')

  s = spacetime('Nov 23 1922')
  s = s.next('year')
  t.equal(s.monthName(), 'january', 'jan')
  t.equal(s.year(), 1923, 'now 1933')

  s = spacetime('Nov 23 1998')
  s = s.next('decade')
  t.equal(s.year(), 2000, 'now 2000')
  t.equal(s.monthName(), 'january', 'jan')
  t.end()
})

test('last', (t) => {
  let s = spacetime('Nov 2')
  s = s.last('month')
  t.equal(s.monthName(), 'october', 'oct')
  t.equal(s.date(), 1, 'oct 1')

  s = spacetime('Nov 23 1922')
  s = s.last('year')
  t.equal(s.monthName(), 'january', 'jan')
  t.equal(s.year(), 1921, 'now 1921')
  t.end()
})
