import test from 'tape'
import spacetime from './lib/index.js'

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
  // Test that Kazakhstan timezone names are properly recognized
  const s1 = spacetime.now('Asia/Almaty')
  t.ok(s1.timezone().name, 'Asia/Almaty should be recognized')

  const s2 = spacetime.now('Asia/Qyzylorda')
  t.ok(s2.timezone().name, 'Asia/Qyzylorda should be recognized')

  const s3 = spacetime.now('Asia/Qostanay')
  t.ok(s3.timezone().name, 'Asia/Qostanay should be recognized')

  t.end()
})