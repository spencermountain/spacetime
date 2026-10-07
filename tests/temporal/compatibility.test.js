import test from 'tape'
import source from '../../src/temporal/index.js'
import built from 'spacetime/temporal'
import legacy from '../../src/index.js'

const spacetime = process.env.TESTENV === 'temporal-prod' ? built : source
const options = { skip: !globalThis.Temporal }

test('Temporal compatibility: flexible inputs', options, t => {
  t.equal(spacetime([2018, 'February', 20], 'UTC').iso(), '2018-02-20T00:00:00.000Z')
  t.equal(spacetime({ year: 2024, month: 'march', date: '2nd' }, 'UTC').iso(), '2024-03-02T00:00:00.000Z')
  t.equal(spacetime(null, 'UTC', { today: { year: 2012, month: 'march' } }).format('iso-short'), '2012-03-01')
  for (const zone of ['UTC+5:30', '+5.5h', 5.5]) {
    t.equal(spacetime('2024-01-01', zone).offset(), 330, String(zone))
  }
  t.equal(spacetime('2024-01-01', 'UTC').goto('-2h').offset(), -120)
  t.equal(spacetime('2024-01-01', 'UTC').timezone('UTC+5:30').hour(), 0)
  t.end()
})

test('Temporal compatibility: calendar aliases and fractional arithmetic', options, t => {
  const s = spacetime('2024-01-17T12:30:00', 'UTC')
  t.equal(s.add(1, 'weekend').format('iso-short'), '2024-01-27')
  t.equal(s.add(0.5, 'millisecond').add(0.5, 'millisecond').epoch, s.add(1, 'millisecond').epoch)
  t.equal(s.add(1, 'fortnight').format('iso-short'), '2024-01-31')
  t.equal(s.add(1, 'season').format('iso-short'), '2024-04-17')
  t.equal(s.add(1, 'nonsense').epoch, s.epoch)
  t.equal(s.add(1).epoch, s.epoch)
  for (const unit of ['day', 'week', 'month', 'quarter', 'year', 'hour', 'minute', 'second']) {
    for (const amount of [-1.5, 0.5, 1.5]) {
      const old = legacy(s.epoch, 'UTC').add(amount, unit)
      t.equal(s.add(amount, unit).epoch, old.epoch, `${amount} ${unit}`)
    }
  }
  t.equal(s.diff(s.add(2, 'quarter'), 'quarter'), 2)
  t.equal(s.diff(s.add(20, 'year'), 'decade'), 2)
  t.equal(s.hour(), 12, 'immutable')
  t.end()
})

test('Temporal compatibility: setters and comparisons', options, t => {
  const s = spacetime('2024-03-17T15:30:00', 'UTC')
  t.equal(s.hour(14, true).iso(), '2024-03-18T14:30:00.000Z')
  t.equal(s.minute(40, false).iso(), '2024-03-17T14:40:00.000Z')
  t.equal(s.time('2:00pm', true).iso(), '2024-03-18T14:00:00.000Z')
  t.equal(s.month('feb', true).year(), 2025)
  t.equal(s.week(1, true).format('iso-short'), '2024-12-30')
  t.equal(s.hour12('2pm', true).iso(), '2024-03-18T14:30:00.000Z')
  t.equal(s.hourFloat(14.25, true).iso(), '2024-03-18T14:15:00.000Z')
  t.ok(s.isSame('hour', s.minute(10)), 'swapped isSame arguments')
  t.equal(s.clone().weekStart(' SAT ').startOf('week').dayName(), 'saturday')
  t.equal(spacetime('2021-01-01', 'UTC').week(1).format('iso-short'), '2021-01-04')
  t.equal(spacetime('2022-01-01', 'UTC').week(1).format('iso-short'), '2022-01-03')
  t.end()
})

test('Temporal native contract: transitions and invariants', options, t => {
  const T = globalThis.Temporal
  for (const iso of [
    '2024-03-09T12:00:00-05:00[America/New_York]',
    '2024-11-02T12:00:00-04:00[America/New_York]',
    '2024-10-05T12:00:00+10:30[Australia/Lord_Howe]'
  ]) {
    const native = T.ZonedDateTime.from(iso)
    const s = spacetime(native)
    t.equal(s.add(1, 'day').epoch, native.add({ days: 1 }).epochMilliseconds, 'calendar day matches native')
    t.equal(s.add(24, 'hour').epoch, native.add({ hours: 24 }).epochMilliseconds, 'elapsed hours match native')
    t.equal(s.goto('UTC').epoch, s.epoch, 'timezone travel preserves instant')
    t.equal(s.add(3, 'day').subtract(3, 'day').epoch, s.epoch, 'reversible days away from gaps')
    t.equal(s.epoch, native.epochMilliseconds, 'input unchanged')
  }
  t.end()
})
