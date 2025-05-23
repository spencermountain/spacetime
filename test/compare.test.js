import test from 'tape'
import spacetime from './lib/index.js'

test('compare', (t) => {
  const original = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  let d = original.clone()
  t.equal(original.isEqual(d), true, 'originally-equal')
  t.equal(original.isAfter(d), false, 'originally-not-after')
  t.equal(original.isBefore(d), false, 'originally-is-before')

  d = d.date(29)
  t.equal(original.isEqual(d), false, 'not-equal')
  t.equal(original.isAfter(d), false, 'not-after')
  t.equal(original.isBefore(d), true, 'is-before')

  d = d.subtract(2, 'months')
  t.equal(original.isEqual(d), false, 'now-not-equal')
  t.equal(original.isAfter(d), true, 'now-is-after')
  t.equal(original.isBefore(d), false, 'now-not-before')

  let start = original.clone()
  let end = original.clone()
  const startOfDay = start.startOf('day')
  const endOfDay = start.endOf('day')
  start = start.subtract(1, 'milliseconds')
  end = end.add(1, 'milliseconds')
  t.equal(original.isBetween(start, end), true, 'originally-is-between')
  t.equal(
    original.startOf('day').isBetween(startOfDay, endOfDay, true),
    true,
    'is-inclusive-of-start-time'
  )
  t.end()
})

test('dont leak milliseconds', (t) => {
  const inputs = [
    '2019-01-25T20:00:00+01:00',
    '2012-01-20',
    'June 5th, 1992',
    'June 5th',
    '2018/02/02'
  ]
  inputs.forEach((str) => {
    t.equal(spacetime(str).isEqual(str), true, str)
  })
  t.end()
})

test('goto is still equal', (t) => {
  const original = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern')
  const d = original.goto('Canada/Pacific')
  t.equal(original.isEqual(d), true, 'originally-equal')
  t.equal(original.isAfter(d), false, 'originally-not-after')
  t.equal(original.isBefore(d), false, 'originally-is-before')
  t.end()
})

test('isEqual always boolean', (t) => {
  t.equal(spacetime('1970-01-01', 'gmt').isEqual('1970-01-01', 'gmt'), true, 'isequal')
  t.equal(spacetime('1970-01-02', 'gmt').isEqual('1970-01-02', 'gmt'), true, 'isequal')
  t.equal(spacetime('1970-01-02', 'gmt').isEqual('1970-01-01', 'gmt'), false, 'isequal')
  t.equal(spacetime('1970-01-01', 'gmt').isEqual('1970-01-02', 'gmt'), false, 'isequal')
  t.end()
})