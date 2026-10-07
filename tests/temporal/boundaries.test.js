import test from 'tape'
import source from '../../src/temporal/index.js'
import built from 'spacetime/temporal'
const spacetime = process.env.TESTENV === 'temporal-prod' ? built : source
const options = { skip: !globalThis.Temporal }

test('Temporal boundaries: month ends and leap years', options, t => {
  for (const [input, amount, unit, expected] of [
    ['2024-01-31', 1, 'month', '2024-02-29'],
    ['2023-01-31', 1, 'month', '2023-02-28'],
    ['2024-03-31', -1, 'month', '2024-02-29'],
    ['2024-02-29', 1, 'year', '2025-02-28'],
    ['2000-02-29', 100, 'year', '2100-02-28']
  ]) {
    const s = spacetime(input, 'UTC')
    t.equal(s.add(amount, unit).format('iso-short'), expected)
    t.equal(s.format('iso-short'), input, 'immutable')
  }
  for (const [date, week] of [['2020-12-31', 53], ['2021-01-01', 53], ['2021-01-04', 1], ['2024-12-30', 1]]) {
    t.equal(spacetime(date, 'UTC').week(), week, date)
  }
  t.end()
})

test('Temporal boundaries: native DST rules and skipped midnight', options, t => {
  const T = globalThis.Temporal
  for (const iso of [
    '2024-03-10T12:00:00-04:00[America/New_York]',
    '2024-11-03T01:30:00-04:00[America/New_York]',
    '2024-11-03T01:30:00-05:00[America/New_York]',
    '2024-04-07T12:00:00+10:30[Australia/Lord_Howe]',
    '2024-10-06T12:00:00+11:00[Australia/Lord_Howe]',
    '2018-11-04T12:00:00-02:00[America/Sao_Paulo]'
  ]) {
    const native = T.ZonedDateTime.from(iso)
    const s = spacetime(native)
    const start = native.startOfDay()
    t.equal(s.startOf('day').epoch, start.epochMilliseconds, iso)
    const nextDate = native.toPlainDate().add({ days: 1 }).toZonedDateTime(native.timeZoneId)
    t.equal(s.endOf('day').epoch, nextDate.epochMilliseconds - 1)
    t.equal(s.add(1, 'day').epoch, native.add({ days: 1 }).epochMilliseconds)
    t.equal(s.add(24, 'hour').epoch, native.add({ hours: 24 }).epochMilliseconds)
  }
  const skippedMidnight = spacetime('2018-11-04T12:00:00', 'America/Sao_Paulo')
  t.equal(skippedMidnight.endOf('day').iso(), '2018-11-04T23:59:59.999-02:00')
  t.equal(skippedMidnight.progress('day'), 11 / 23)
  const gap = spacetime('2024-03-10T02:30:00', 'America/New_York')
  t.equal(gap.time(), '3:30am')
  const first = spacetime('2024-11-03T01:30:00-04:00[America/New_York]')
  const second = spacetime('2024-11-03T01:30:00-05:00[America/New_York]')
  t.equal(second.epoch - first.epoch, 3600000)
  t.equal(second.startOf('hour').offset(), -300)
  const precise = spacetime(T.ZonedDateTime.from('2024-01-01T12:00:00.123456789Z[UTC]'))
  t.equal(precise.startOf('millisecond').toTemporal().nanosecond, 0)
  t.equal(precise.startOf('millisecond').toTemporal().microsecond, 0)
  t.end()
})
