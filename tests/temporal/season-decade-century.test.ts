import test from 'tape'
import spacetime from '../../src/temporal/index.ts'
import main from '../../src/index.ts'
import type { BoundaryUnits } from '../../types/temporal-types.js'
import type { TimeUnit } from '../../src/types/index.ts'
const options = { skip: !globalThis.Temporal }

test('Temporal season, decade and century boundaries', options, (t) => {
  const s = spacetime('2024-01-15T14:37:12.345', 'UTC')
  const cases: [BoundaryUnits, string, string, string][] = [
    ['season', '2023-12-01T00:00:00.000Z', '2024-03-01T00:00:00.000Z', '2023-09-01T00:00:00.000Z'],
    ['decade', '2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z', '2010-01-01T00:00:00.000Z'],
    ['century', '2000-01-01T00:00:00.000Z', '2100-01-01T00:00:00.000Z', '1900-01-01T00:00:00.000Z']
  ]
  cases.forEach(([unit, start, next, last]) => {
    t.equal(s.startOf(unit).iso(), start, `startOf(${unit})`)
    t.equal(s.floor(unit).iso(), start, `floor(${unit})`)
    t.equal(s.ceil(unit).iso(), next, `ceil(${unit})`)
    t.equal(s.next(unit).iso(), next, `next(${unit})`)
    t.equal(s.last(unit).iso(), last, `last(${unit})`)
    t.equal(s.endOf(unit).epoch, s.next(unit).epoch - 1, `endOf(${unit})`)
    t.equal(s.ceil(unit).ceil(unit).iso(), next, `ceil(${unit}) twice`)
    t.equal(s.nearest(unit).nearest(unit).epoch, s.nearest(unit).epoch, `nearest(${unit}) twice`)
    t.ok(s.progress(unit) > 0 && s.progress(unit) < 1, `progress(${unit})`)
  })
  t.equal(s.startOf('seasons').iso(), '2023-12-01T00:00:00.000Z', 'plural season')
  t.equal(s.isSame(spacetime('2023-12-05', 'UTC'), 'season'), true, 'isSame season over the new year')
  t.equal(s.isSame(spacetime('2024-03-01', 'UTC'), 'season'), false, 'isSame the next season')
  t.end()
})

test('Temporal seasons start on the same days in both hemispheres', options, (t) => {
  const edges = ['2024-02-29T23:00:00', '2024-03-01T00:00:00', '2024-06-15T12:00:00', '2024-11-30T23:59:00', '2024-12-01T00:00:00', '2025-01-01T00:00:00']
  const zones = ['UTC', 'America/Toronto', 'Australia/Sydney']
  zones.forEach((tz) => {
    edges.forEach((input) => {
      const s = spacetime(input, tz)
      const core = main(input, tz)
      t.equal(s.startOf('season').format('iso-short'), core.startOf('season').format('iso-short'), `${tz} ${input} startOf`)
      t.equal(s.ceil('season').format('iso-short'), core.ceil('season').format('iso-short'), `${tz} ${input} ceil`)
    })
  })
  t.end()
})

test('Temporal nearest rounds an exact tie down, like the main library', options, (t) => {
  const cases: [string, BoundaryUnits][] = [
    ['2024-01-15T12:30:00', 'hour'],
    ['2024-01-15T12:30:00.001', 'hour'],
    ['2024-01-15T12:29:59.999', 'hour'],
    ['2024-01-15T12:00:00', 'day'],
    ['2024-01-15T12:07:30', 'quarter-hour'],
    ['2024-01-15T12:00:30', 'minute'],
    ['2024-01-10T00:00:00', 'season'],
    ['2026-01-15T00:00:00', 'decade'],
    ['2051-06-01T00:00:00', 'century']
  ]
  cases.forEach(([input, unit]) => {
    const want = main(input, 'UTC').nearest(unit as TimeUnit).iso()
    t.equal(spacetime(input, 'UTC').nearest(unit).iso(), want, `${input} nearest(${unit})`)
  })
  t.equal(spacetime('2024-01-15T12:30:00', 'UTC').nearest('hour').time(), '12:00pm', 'half-past rounds down')
  t.equal(spacetime('2024-01-15T12:30:00', 'UTC').round('hour').time(), '12:00pm', 'round is the same')
  t.end()
})
