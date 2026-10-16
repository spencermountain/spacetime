import test from 'tape'
import spacetime from '../_lib/index.js'

test('kazakhstan-timezones-utc5', (t) => {
  // After March 1, 2024, all Kazakhstan timezones should be UTC+5
  // Testing with a date after the transition
  const date = '2024-06-15T12:00:00'

  const kazakhstanTimezones = [
    'Asia/Almaty',
    'Asia/Qyzylorda',
    'Asia/Qostanay',
    'Asia/Aqtau',
    'Asia/Aqtobe',
    'Asia/Atyrau',
    'Asia/Oral'
  ]

  kazakhstanTimezones.forEach(tz => {
    const s = spacetime(date, tz)
    const offset = s.timezone().current.offset
    t.equal(offset, 5, `${tz} should have offset 5 (UTC+5), got ${offset}`)
  })

  t.end()
})

test('kazakhstan-timezone-names', (t) => {
  const input = '2024-06-15T12:00:00'
  const zones = ['Asia/Almaty', 'Asia/Qyzylorda', 'Asia/Qostanay']
  zones.forEach(zone => {
    t.equal(spacetime(input, zone).timezone().name, zone, `${input} ${zone}: timezone preserves the name`)
  })
  t.end()
})
