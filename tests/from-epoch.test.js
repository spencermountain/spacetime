import test from 'tape'
import spacetime from '../index.js'

test('random epochs', (t) => {
  let epoch = 1660368702000
  let tz = "America/Toronto"
  let cal = { year: 2022, month: 8, date: 13, hour: 1 }
  let msg = 'toronto_august'
  let s = spacetime(epoch, tz)
  t.equal(s.year(), cal.year, `${msg} - year`)
  t.equal(s.month(), cal.month, `${msg} - month`)
  t.equal(s.date(), cal.date, `${msg} - date`)
  t.equal(s.hour(), cal.hour, `${msg} - hour`)


  epoch = 1683811249228
  tz = "Europe/London"
  cal = { year: 2023, month: 5, date: 11, hour: 14 }
  msg = 'london_may'
  s = spacetime(epoch, tz)
  t.equal(s.year(), cal.year, `${msg} - year`)
  t.equal(s.month(), cal.month, `${msg} - month`)
  t.equal(s.date(), cal.date, `${msg} - date`)
  t.equal(s.hour(), cal.hour, `${msg} - hour`)


  epoch = 1674455138750
  tz = "America/Vancouver"
  cal = { year: 2023, month: 1, date: 22, hour: 22, minute: 25, second: 39 }
  msg = 'vancouver_jan'
  s = spacetime(epoch, tz)
  t.equal(s.year(), cal.year, `${msg} - year`)
  t.equal(s.month(), cal.month, `${msg} - month`)
  t.equal(s.date(), cal.date, `${msg} - date`)
  t.equal(s.hour(), cal.hour, `${msg} - hour`)


  epoch = 2023
  tz = "Australia/Melbourne"
  cal = { year: 2023, month: 4, date: 4, hour: 1 }
  msg = 'melbourne_may'
  s = spacetime(epoch, tz)
  t.equal(s.year(), cal.year, `${msg} - year`)
  t.equal(s.month(), cal.month, `${msg} - month`)
  t.equal(s.date(), cal.date, `${msg} - date`)
  t.equal(s.hour(), cal.hour, `${msg} - hour`)
  t.end()
})