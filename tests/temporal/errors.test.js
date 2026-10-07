import test from 'tape'
import source from '../../src/temporal/index.js'
import built from 'spacetime/temporal'
const spacetime = process.env.TESTENV === 'temporal-prod' ? built : source
const options = { skip: !globalThis.Temporal }

test('Temporal errors: invalid values propagate without changing the receiver', options, t => {
  const s = spacetime('2024-01-15T12:30:00', 'UTC')
  for (const make of [
    () => spacetime('not a date', 'UTC'),
    () => spacetime('2024-01-01', 'bad/zone'),
    () => spacetime('2024-01-01', '+25h'),
    () => s.hour(NaN),
    () => s.year(Infinity),
    () => s.date(0),
    () => s.month('nonesuch'),
    () => s.day('nonesuch'),
    () => s.time('nonesuch'),
    () => s.hour12('nonesuch'),
    () => s.hour12('13pm'),
    () => s.ampm('nonesuch'),
    () => s.era('nonesuch'),
    () => s.goto('bad/zone'),
    () => s.timezone('bad/zone'),
    () => s.add(Infinity, 'day'),
    () => s.add(1e20, 'year')
  ]) {
    const invalid = make()
    t.notOk(invalid.isValid())
    t.equal(invalid.toTemporal(), null)
    t.ok(Number.isNaN(invalid.hour12()))
    t.equal(invalid.time(), '')
    t.equal(invalid.monthName(), '')
    t.notOk(invalid.add(1, 'day').startOf('month').isValid())
    t.equal(invalid.format('iso'), '')
    t.ok(Number.isNaN(invalid.epochSeconds()))
    t.ok(Number.isNaN(invalid.diff(s, 'day')))
    t.equal(invalid.isBefore(s), null)
    t.equal(invalid.isSame(s, 'day'), null)
  }
  t.equal(s.iso(), '2024-01-15T12:30:00.000Z')
  t.end()
})

test('Temporal errors: unsupported units are no-ops or unavailable queries', options, t => {
  const s = spacetime('2024-01-15', 'UTC')
  for (const unit of [undefined, 'nonesuch', 'season']) {
    if (unit !== 'season') {
      t.equal(s.add(1, unit).epoch, s.epoch)
    }
    for (const method of ['startOf', 'endOf', 'next', 'last', 'nearest']) {
      const result = s[method](unit)
      t.notEqual(result, s)
      t.equal(result.epoch, s.epoch, `${method} ${unit}`)
    }
    t.ok(Number.isNaN(s.progress(unit)))
    t.equal(s.isSame(s, unit), null)
  }
  t.ok(Number.isNaN(s.diff(s, 'nonesuch')))
  t.end()
})

test('Temporal errors: mutable epoch and timezone setters invalidate consistently', options, t => {
  const s = spacetime(0, 'UTC')
  s.epochSeconds(Infinity)
  t.notOk(s.isValid())
  s.epoch = 0
  t.ok(s.isValid(), 'can recover using a valid epoch')
  s.tz = 'bad/zone'
  t.notOk(s.isValid())
  t.end()
})

test('Temporal errors: missing runtime remains actionable', options, t => {
  const native = globalThis.Temporal
  try {
    globalThis.Temporal = undefined
    t.throws(() => spacetime('2024-01-01', 'UTC'), /requires native Temporal/)
  } finally {
    globalThis.Temporal = native
  }
  t.end()
})
