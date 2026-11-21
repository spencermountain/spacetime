import test from 'tape'
import spacetime from '../_lib/index.ts'

test('timezone offsets preserve fractions and support UTC+14', t => {
  const cases: [string, number][] = [
    ['UTC+5:30', 5.5], ['UTC+5.75', 5.75], ['+5.5', 5.5],
    ['+5:45', 5.75], ['5.5hrs', 5.5], ['-3:30', -3.5],
    ['UTC-0:30', -0.5], ['GMT+5:30', -5.5], ['GMT-5.75', 5.75],
    ['UTC+14', 14], ['UTC-14', -14], ['+0', 0],
    ['UTC+5', 5], ['GMT-5', 5], ['-5hrs', -5], ['Etc/GMT-5.75', 5.75]
  ]
  cases.forEach(([zone, offset]) => {
    const s = spacetime('2026-07-01', zone)
    t.equal(s.timezone().current.offset + 0, offset, zone)
    t.equal(s.offset() + 0, offset * 60, `${zone} minutes`)
  })
  // any whole-minute offset under a day is a timezone
  const minutes: [string, number, string][] = [
    ['UTC+14:15', 855, '+14:15'], ['UTC-14.25', -855, '-14:15'], ['UTC+5:10', 310, '+05:10'],
    ['+5.1', 306, '+05:06'], ['UTC+23:59', 1439, '+23:59'], ['UTC-15', -900, '-15:00']
  ]
  minutes.forEach(([zone, mins, name]) => {
    const s = spacetime('2026-07-01', zone)
    t.equal(s.offset(), mins, `${zone} minutes`)
    t.equal(s.timezone().name, name, `${zone} name`)
  })
  ;['UTC+24', 'UTC-25:00', 'UTC+5:60', 'UTC+5.5:30', 'UTC+5junk', 'nonsense5'].forEach(zone => {
    t.throws(() => spacetime('2026-07-01', zone), /Cannot find timezone/, `reject ${zone}`)
  })
  t.end()
})

test('North Dakota shortcut follows Central time', t => {
  ;['America/North_Dakota', 'north dakota', 'America/North_Dakota/Center'].forEach(zone => {
    t.equal(spacetime('2026-01-15', zone).timezone().current.offset, -6, `${zone} winter`)
    t.equal(spacetime('2026-07-15', zone).timezone().current.offset, -5, `${zone} summer`)
  })
  t.end()
})

test('standard US timezone names remain supported', t => {
  const cases: [string, number][] = [['EST5EDT', -5], ['CST6CDT', -6], ['MST7MDT', -7], ['PST8PDT', -8]]
  cases.forEach(([zone, winter]) => {
    t.equal(spacetime('2026-01-15', zone).timezone().current.offset, winter, `${zone} winter`)
    t.equal(spacetime('2026-07-15', zone).timezone().current.offset, winter + 1, `${zone} summer`)
  })
  t.end()
})

test('nested timezone names support city shortcuts', t => {
  const cases = [
    ['Winamac', 'America/Indiana/Winamac'],
    ['Knox', 'America/Indiana/Knox'],
    ['Tell City', 'America/Indiana/Tell_City'],
    ['New Salem', 'America/North_Dakota/New_Salem'],
    ['Monticello', 'America/Kentucky/Monticello'],
    ['Buenos Aires', 'America/Argentina/Buenos_Aires']
  ]
  cases.forEach(([city, zone]) => {
    const short = spacetime('2026-07-15', city)
    const full = spacetime('2026-07-15', zone)
    t.equal(short.epoch, full.epoch, `${city} instant`)
    t.equal(short.timezone().current.offset, full.timezone().current.offset, `${city} offset`)
  })
  t.end()
})
