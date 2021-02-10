const test = require('tape')
const spacetime = require('./lib')

test('set quarter', (t) => {
  let s = spacetime('q1', 'Canada/Eastern')
  t.equal(s.monthName(), 'january', 'q1 .month()')
  t.equal(s.date(), 1, 'q1 .date()')

  s = spacetime('q2')
  t.equal(s.monthName(), 'april', 'q2 .month()')
  t.equal(s.date(), 1, 'q2 .date()')

  s = spacetime('q3')
  t.equal(s.monthName(), 'july', 'q3 .month()')
  t.equal(s.date(), 1, 'q2 .date()')

  s = spacetime('q4')
  t.equal(s.monthName(), 'october', 'q4 .month()')
  t.equal(s.date(), 1, 'q4 .date()')

  s = spacetime('q1 2001')
  t.equal(s.monthName(), 'january', 'q1 year .month()')
  t.equal(s.date(), 1, 'q1 year .date()')
  t.equal(s.year(), 2001, 'q1 .year()')

  s = spacetime('q1 of 1962')
  t.equal(s.monthName(), 'january', 'q1 year of .month()')
  t.equal(s.date(), 1, 'q1 year of .date()')
  t.equal(s.year(), 1962, 'q1 of .year()')

  t.end()
})

test('startOf quarter', (t) => {
  let start = '2020-01-01'
  let d = spacetime(start).startOf('day')
  let arr = [
    [2, 'days'],
    [23, 'days'],
    [52, 'days'],
    [12, 'hours'],
    [112, 'hours'],
    [92, 'hours'],
    [(192, 'hours')],
    [2, 'weeks'],
    [9, 'weeks'],
    [2, 'minutes'],
    [4, 'hours']
  ]
  arr.forEach((a) => {
    let s = d.add(a[0], a[1])
    s = s.startOf('quarter')
    t.equal(s.format(), start, a.join(' '))
  })
  t.end()
})

test('startOf/endOf quarter', (t) => {
  let d = spacetime('2018-10-01')
  d = d.endOf('quarter')
  t.equal(d.format(), '2018-12-31', 'endOf quarter')

  d = spacetime('2018-11-01')
  d = d.endOf('quarter')
  t.equal(d.format(), '2018-12-31', 'endOf quarter from mid')

  d = spacetime('2018-12-11')
  d = d.endOf('quarter')
  t.equal(d.format(), '2018-12-31', 'endOf quarter from end')
  d = d.endOf('quarter')
  t.equal(d.format(), '2018-12-31', 'endOf quarter repeat')
  t.end()
})

test('add/minus mid-quarter', (t) => {
  let d = spacetime('2017-03-01', 'Canada/Eastern')
  d = d.add(1, 'quarter')
  t.equal(d.format(), '2017-06-01', 'add quarter over dst change')
  t.end()
})

test('add/minus quarter', (t) => {
  let d = spacetime('2018-10-01')
  d = d.add(1, 'quarter')
  d = d.add(1, 'quarter')
  d = d.add(1, 'quarter')
  d = d.add(1, 'quarter')
  t.equal(d.format(), '2019-10-01', 'add 4 quarters')
  d = d.minus(1, 'quarter')
  d = d.minus(1, 'quarter')
  d = d.minus(1, 'quarter')
  d = d.minus(1, 'quarter')
  t.equal(d.format(), '2018-10-01', 'minus 4 quarters')

  d = spacetime('2020-01-01')
  d = d.add(1, 'quarter')
  d = d.add(1, 'quarter')
  d = d.add(1, 'quarter')
  d = d.add(1, 'quarter')
  t.equal(d.format(), '2021-01-01', 'add 4 quarters leap')
  d = d.minus(1, 'quarter')
  d = d.minus(1, 'quarter')
  d = d.minus(1, 'quarter')
  d = d.minus(1, 'quarter')
  t.equal(d.format(), '2020-01-01', 'minus 4 quarters leap')
  t.end()
})

test('long-move quarters', (t) => {
  let d = spacetime('2019-01-01')
  d = d.minus(8, 'quarter')
  t.equal(d.format(), '2017-01-01', 'minus 8 quarters')

  d = spacetime('2019-01-01')
  d = d.plus(8, 'quarter')
  t.equal(d.format(), '2021-01-01', 'plus 8 quarters')

  d = spacetime('2019-03-11')
  d = d.plus(13, 'quarter') //3 years and 1 quarter
  t.equal(d.format(), '2022-06-11', 'plus 13 quarters')

  d = spacetime('2012-11-03')
  d = d.minus(13, 'quarter') //3 years and 1 quarter
  t.equal(d.format(), '2009-08-03', 'minus 13 quarters')

  d = spacetime('2010-01-11')
  d = d.plus(4 * 8, 'quarter') //8 years
  t.equal(d.format(), '2018-01-11', 'plus 8 years')

  d = spacetime('2013-02-02')
  d = d.minus(4 * 13, 'quarter') //13 years
  t.equal(d.format(), '2000-02-02', 'minus 13 years')

  t.end()
})
