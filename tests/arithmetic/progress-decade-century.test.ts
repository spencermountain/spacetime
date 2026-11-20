import test from 'tape'
import spacetime from '../_lib/index.ts'
import type { TimeUnit } from '../../src/types/index.ts'

test('progress includes decade and century', (t) => {
  const s = spacetime('2024-01-15T14:37:12.345', 'UTC')
  const obj = s.progress()
  t.deepEqual(Object.keys(obj), ['century', 'decade', 'year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'], 'units, largest first')
  t.equal(obj.decade, 0.4, 'decade')
  t.equal(obj.century, 0.24, 'century')
  t.equal(s.progress('decade'), 0.4, 'decade by name')
  t.equal(s.progress('centuries'), 0.24, 'plural century')
  t.end()
})

test('decade and century progress at their edges', (t) => {
  const cases: [string, TimeUnit, number][] = [
    ['2020-01-01T00:00:00', 'decade', 0],
    ['2025-01-01T00:00:00', 'decade', 0.5],
    ['2029-12-31T23:59:59.999', 'decade', 1],
    ['2000-01-01T00:00:00', 'century', 0],
    ['2050-01-01T00:00:00', 'century', 0.5],
    ['2099-12-31T23:59:59.999', 'century', 1],
    ['1999-12-31T23:59:59.999', 'century', 1],
    ['1990-01-01T00:00:00', 'decade', 0]
  ]
  cases.forEach(([input, unit, want]) => {
    t.equal(spacetime(input, 'UTC').progress(unit), want, `${input} progress(${unit})`)
  })
  t.end()
})

// progress shares the walk to the start of each unit, rather than calling startOf and endOf
test('progress agrees with startOf and endOf', (t) => {
  const units: TimeUnit[] = ['century', 'decade', 'year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute']
  const zones = ['UTC', 'America/New_York', 'Australia/Lord_Howe', 'Asia/Kathmandu', 'Australia/Sydney']
  const bad: string[] = []
  const check = (epoch: number, tz: string) => {
    const s = spacetime(epoch, tz)
    const all = s.progress()
    units.forEach((unit) => {
      const start = s.startOf(unit)
      const end = s.endOf(unit)
      const want = parseFloat(((s.epoch - start.epoch) / (end.epoch - start.epoch)).toFixed(2))
      const one = s.progress(unit)
      if (one !== want || all[unit as keyof typeof all] !== want) {
        bad.push(`${tz} ${s.iso()} ${unit}`)
      }
    })
  }
  zones.forEach((tz) => {
    for (let i = 0; i < 80; i += 1) {
      check(Date.UTC(1995, 0, 1) + (i * 13888888888) + (i % 3) * 137, tz)
    }
    // through the dst changes of the bundled (2027) rules
    const days = [Date.UTC(2027, 2, 14), Date.UTC(2027, 3, 4), Date.UTC(2027, 9, 3), Date.UTC(2027, 10, 7)]
    days.forEach((day) => {
      for (let mins = -600; mins < 1200; mins += 90) {
        check(day + mins * 60000, tz)
      }
    })
  })
  t.deepEqual(bad, [], 'every unit matches')
  t.end()
})

test('progress of an invalid date', (t) => {
  const s = spacetime('not a date')
  t.ok(Number.isNaN(s.progress('decade')), 'decade is NaN')
  t.ok(Number.isNaN(s.progress('century')), 'century is NaN')
  t.ok(Number.isNaN(s.progress('year')), 'year is NaN')
  t.end()
})
