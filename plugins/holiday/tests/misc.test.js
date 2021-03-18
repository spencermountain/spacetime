const test = require('tape')
const spacetimeHoliday = require('./_lib')

test('fixed-holidays', (t) => {
  let arr = [
    ['christmas', '2019-12-25'],
    ['christmas day', '2019-12-25'],
    [' CHRISTMAS  ', '2019-12-25'],
    ['boxing day', '2019-12-26'],
    ['christmas eve', '2019-12-24']
  ]
  arr.forEach((a) => {
    let s = spacetimeHoliday(a[0], 2019)
    t.equal(s.format('iso-short'), a[1], a[0])
  })
  t.end()
})

test('calendar-holidays', (t) => {
  let s = spacetimeHoliday('mothers day', 2020)
  t.equal(s.format('nice-year'), 'May 10th, 2020', 'mothers day 2020')

  s = spacetimeHoliday('mothers day', 2021)
  t.equal(s.format('nice-year'), 'May 9th, 2021', 'mothers day 2021')

  s = spacetimeHoliday('mothers day', 2022)
  t.equal(s.format('nice-year'), 'May 8th, 2022', 'mothers day 2022')

  t.end()
})

test('easter-holidays 2020', (t) => {
  let arr = [
    ['easter', 'Apr 12th, 2020'],
    ['easter monday', 'Apr 13th, 2020'],
    ['easter sunday  ', 'Apr 12th, 2020'],
    ['pentecost', 'May 31st, 2020']
    // ['lent', 'Feb 26th, 2020']
  ]
  arr.forEach((a) => {
    let s = spacetimeHoliday(a[0], 2020)
    t.equal(s.format('nice-year'), a[1], a[0])
  })
  t.end()
})

test('astronomical-holidays 2020', (t) => {
  let arr = [
    ['spring equinox', 'Mar 20th, 2020'],
    ['june solstice', 'Jun 20th, 2020'],
    ['winter solstice  ', 'Dec 21st, 2020']
  ]
  arr.forEach((a) => {
    let s = spacetimeHoliday(a[0], 2020)
    t.equal(s.format('nice-year'), a[1], a[0])
  })
  t.end()
})

// test('lunar-holidays 2022', t => {
//   let arr = [['eid al-fitr', 'May 2nd, 2022']]
//   arr.forEach(a => {
//     let s = spacetimeHoliday(a[0], 2022)
//     t.equal(s.format('nice-year'), a[1], a[0])
//   })
//   t.end()
// })

test('no dates', (t) => {
  let arr = ['eassdfter', '', null, '  ', 234, 'june']
  arr.forEach((a) => {
    let s = spacetimeHoliday(a, 2020)
    t.equal(s, null, a)
  })
  t.end()
})

test('pass timezone', (t) => {
  let s = spacetimeHoliday('ramadan', 2019, 'Canada/Pacific')
  t.equal(s.timezone().name, 'Canada/Pacific', 'passed timezone')
  t.end()
})
