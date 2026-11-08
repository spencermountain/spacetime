import test from 'tape'
import spacetime from '../_lib/index.ts'

test('end of day when midnight is skipped', (t) => {
  const cases = [
    ['America/Santiago', '2026-09-06', '-03:00', '2026-09-07T00:00:00.000-03:00'],
    ['Africa/Cairo', '2026-04-24', '+03:00', '2026-04-25T00:00:00.000+03:00'],
    ['Atlantic/Azores', '2026-03-29', 'Z', '2026-03-30T00:00:00.000Z'],
    ['Asia/Beirut', '2026-03-29', '+03:00', '2026-03-30T00:00:00.000+03:00']
  ]
  // Pin the transition rules so future timezone-data updates do not move the gaps.
  const clock = spacetime(null, 'UTC')
  const original = clock.timezones
  clock.timezones = {
    ...original,
    'america/santiago': { offset: -4, hem: 's', dst: '04/04:24->09/06:00' },
    'africa/cairo': { offset: 3, hem: 'n', dst: '04/24:00->10/29:24' },
    'atlantic/azores': { offset: 0, hem: 'n', dst: '03/29:00->10/25:01' },
    'asia/beirut': { offset: 3, hem: 'n', dst: '03/29:00->10/25:00' }
  }
  t.teardown(() => { clock.timezones = original })

  for (const [zone, day, offset, nextDay] of cases) {
    for (const time of ['01:00:00', '12:34:56', '23:59:59']) {
      const s = spacetime(`${day}T${time}`, zone)
      const before = s.epoch
      const start = s.startOf('day')
      t.equal(start.iso(), `${day}T01:00:00.000${offset}`, `${zone} begins at 1am`)
      for (const unit of ['day', 'date', 'days'] as const) {
        const end = s.endOf(unit)
        t.equal(end.iso(), `${day}T23:59:59.999${offset}`, `${zone} ${unit} ends on the same date`)
        t.equal(end.add(1, 'millisecond').iso(), nextDay, `${zone} next millisecond starts the next day`)
        t.equal(end.epoch - start.epoch + 1, 23 * 60 * 60 * 1000, `${zone} has 23 hours`)
        t.equal(end.endOf(unit).epoch, end.epoch, `${zone} ${unit} is idempotent`)
      }
      t.equal(s.epoch, before, `${zone} input is unchanged`)
    }
  }
  t.end()
})

test('end of day preserves ordinary days and other DST transitions', (t) => {
  const clock = spacetime(null, 'UTC')
  const original = clock.timezones
  clock.timezones = {
    ...original,
    'america/santiago': { offset: -4, hem: 's', dst: '04/04:24->09/06:00' },
    'america/new_york': { offset: -4, hem: 'n', dst: '03/08:02->11/01:02' },
    'australia/lord_howe': { offset: 10.5, hem: 's', dst: '04/05:02->10/04:02' }
  }
  t.teardown(() => { clock.timezones = original })
  const cases = [
    ['America/Santiago', '2026-09-05', '2026-09-05T23:59:59.999-04:00', 24],
    ['America/Santiago', '2026-09-07', '2026-09-07T23:59:59.999-03:00', 24],
    ['America/New_York', '2026-03-08', '2026-03-08T23:59:59.999-04:00', 23],
    ['America/New_York', '2026-11-01', '2026-11-01T23:59:59.999-05:00', 25],
    ['Australia/Lord_Howe', '2026-10-04', '2026-10-04T23:59:59.999+11:00', 23.5],
    ['Australia/Lord_Howe', '2026-04-05', '2026-04-05T23:59:59.999+10:30', 24.5],
    ['UTC', '2026-12-31', '2026-12-31T23:59:59.999Z', 24],
    ['Asia/Kolkata', '2024-02-29', '2024-02-29T23:59:59.999+05:30', 24]
  ] as const
  for (const [zone, day, expected, hours] of cases) {
    const s = spacetime(`${day}T12:00:00`, zone)
    const end = s.endOf('day')
    const next = s.add(1, 'day').startOf('day')
    t.equal(end.iso(), expected, `${zone} ${day} last millisecond`)
    t.equal(end.epoch + 1, next.epoch, `${zone} ${day} ends at next day boundary`)
    t.equal(end.epoch - s.startOf('day').epoch + 1, hours * 60 * 60 * 1000, `${zone} ${day} duration`)
  }
  t.end()
})
