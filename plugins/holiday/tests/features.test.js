import test from 'tape'
import spacetime from 'spacetime'
import timekeeper from 'timekeeper'
import holiday from './_lib.js'

test('corrected holidays and relative calendar rules', (t) => {
  const dates = [
    ['palm sunday', 2026, '2026-03-29'],
    ['trinity sunday', 2026, '2026-05-31'],
    ['black friday', 2024, '2024-11-29'],
    ['black friday', 2025, '2025-11-28'],
    ['cyber monday', 2024, '2024-12-02'],
    ['cyber monday', 2025, '2025-12-01'],
    ['memorial day', 2021, '2021-05-31'],
    ['memorial day', 2026, '2026-05-25'],
    ['victoria day', 2026, '2026-05-18'],
    ['victoria day', 2021, '2021-05-24'],
    ['summer solstice', 2026, '2026-06-21'],
    ['december solstice', 2026, '2026-12-21']
  ]
  dates.forEach(([name, year, expected]) => {
    const result = holiday(name, year, 'America/Toronto')
    t.equal(result?.format('iso-short'), expected, `${name} ${year}`)
    t.equal(result?.hour(), 0, 'starts at local midnight')
  })
  t.equal(holiday('orthodox easter', 2026, 'UTC'), null, 'unsupported Orthodox Easter is not Western Easter')
  t.equal(holiday('orthodox good friday', 2026, 'UTC'), null, 'does not silently substitute the Western calendar')
  t.equal(holiday('orthodox christmas day', 2026, 'UTC')?.format('iso-short'), '2026-01-07', 'supported fixed Orthodox holiday remains available')
  t.end()
})

test('list exposes canonical names, aliases, and optional dates', (t) => {
  const entries = holiday.list()
  const names = entries.map(entry => entry.name)
  t.equal(new Set(names).size, names.length, 'canonical names are unique')
  t.deepEqual(names, [...names].sort(), 'names are sorted')
  t.ok(names.includes('christmas'), 'includes fixed holidays')
  t.ok(names.includes('memorial day'), 'includes new calendar rules')
  t.ok(names.includes('summer solstice'), 'includes corrected names')
  t.notOk(names.includes('xmas'), 'aliases are not separate holidays')
  t.notOk(names.includes('passover'), 'does not advertise unimplemented holidays')
  const christmas = entries.find(entry => entry.name === 'christmas')
  t.ok(christmas.aliases.includes('xmas'), 'includes supported aliases')
  t.notOk(Object.hasOwn(christmas, 'date'), 'dates are opt-in')
  const dated = holiday.list({ year: 2027, timezone: 'America/Toronto' })
  t.equal(dated.find(entry => entry.name === 'christmas').date.format('iso-short'), '2027-12-25', 'requested year')
  t.equal(dated.find(entry => entry.name === 'christmas').date.tz, 'america/toronto', 'requested timezone')
  entries.forEach(({ name, aliases }) => {
    t.ok(holiday(name, 2027, 'UTC'), `canonical name resolves: ${name}`)
    aliases.forEach(alias => {
      t.equal(holiday(alias, 2027, 'UTC')?.epoch, holiday(name, 2027, 'UTC')?.epoch, `alias resolves: ${alias}`)
    })
  })
  christmas.aliases.push('not a holiday')
  t.notOk(holiday.list().find(entry => entry.name === 'christmas').aliases.includes('not a holiday'), 'returns independent metadata')
  t.end()
})

test('next finds the first occurrence on or after the local date', (t) => {
  const next = (name, from) => holiday.next(name, { from, timezone: 'UTC' })?.format('iso-short')
  t.equal(next('christmas', '2026-12-24'), '2026-12-25', 'upcoming this year')
  t.equal(next('christmas', '2026-12-25T12:00:00Z'), '2026-12-25', 'includes today')
  t.equal(next('christmas', '2026-12-26'), '2027-12-25', 'rolls into next year')
  t.equal(next('new years day', '2026-12-31'), '2027-01-01', 'crosses year boundary')
  t.equal(next('memorial day', '2026-05-26'), '2027-05-31', 'recalculates moving dates')
  t.equal(holiday.next('not a holiday', { from: '2026-01-01' }), null, 'unknown holiday')
  t.equal(holiday.next('christmas', { from: NaN }), null, 'invalid reference')
  const from = spacetime('2026-12-25T01:00:00Z', 'America/Toronto')
  const epoch = from.epoch
  const result = holiday.next('christmas', { from })
  t.equal(result.tz, from.tz, 'inherits a spacetime reference timezone')
  t.equal(result.format('iso-short'), '2026-12-25', 'uses the local date')
  t.equal(from.epoch, epoch, 'does not mutate reference')
  t.equal(holiday.next('christmas', { from: 0, timezone: 'UTC' }).year(), 1970, 'accepts zero epoch')
  t.end()
})

test('default year follows the current date in the requested timezone', (t) => {
  try {
    timekeeper.freeze(new Date('2026-12-31T23:30:00Z'))
    t.equal(holiday('christmas', undefined, 'UTC').year(), 2026, 'current year in UTC')
    t.equal(holiday('christmas', undefined, 'Asia/Tokyo').year(), 2027, 'next year in Tokyo')
    t.equal(holiday.next('christmas', { timezone: 'UTC' }).year(), 2027, 'next defaults to now')
    timekeeper.freeze(new Date('2027-01-01T01:00:00Z'))
    t.equal(holiday('christmas', undefined, 'UTC').year(), 2027, 'year is not cached at import')
  } finally {
    timekeeper.reset()
  }
  t.end()
})
