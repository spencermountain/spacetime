import test from 'tape'
import spacetime from '../_lib/index.ts'
import type { TimeUnit } from '../../src/types/index.ts'

test('season, decade and century boundaries', (t) => {
  const s = spacetime('2024-01-15T14:37:12.345', 'UTC')
  const cases: [TimeUnit, string, string, string][] = [
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
  })
  t.equal(s.startOf('centuries').iso(), '2000-01-01T00:00:00.000Z', 'plural century')
  t.end()
})

test('nearest decade and century', (t) => {
  const cases: [string, TimeUnit, string][] = [
    ['2024-01-15', 'decade', '2020-01-01'],
    ['2026-01-15', 'decade', '2030-01-01'],
    ['2020-01-01', 'decade', '2020-01-01'],
    ['2049-06-01', 'century', '2000-01-01'],
    ['2051-06-01', 'century', '2100-01-01'],
    ['2100-01-01', 'century', '2100-01-01'],
    ['2024-01-10', 'season', '2023-12-01'],
    ['2024-02-01', 'season', '2024-03-01']
  ]
  cases.forEach(([input, unit, want]) => {
    t.equal(spacetime(input, 'UTC').nearest(unit).format('iso-short'), want, `${input} nearest(${unit})`)
  })
  t.end()
})

test('nearest rounds an exact tie down', (t) => {
  t.equal(spacetime('2024-01-15T12:30:00', 'UTC').nearest('hour').time(), '12:00pm', 'half-past')
  t.equal(spacetime('2024-01-15T12:30:00.001', 'UTC').nearest('hour').time(), '1:00pm', 'just after half-past')
  t.equal(spacetime('2024-01-15T12:00:00', 'UTC').nearest('day').format('iso-short'), '2024-01-15', 'noon')
  t.equal(spacetime('2024-01-15T12:07:30', 'UTC').nearest('quarterHour').time(), '12:00pm', 'half a quarter-hour')
  t.end()
})

test('diff and isSame by season, decade and century', (t) => {
  const a = spacetime('2024-01-15', 'UTC')
  const b = spacetime('2031-08-20', 'UTC')
  t.equal(a.diff(b, 'season'), 30, 'seasons')
  t.equal(a.diff(b, 'decade'), 0, 'under a decade')
  t.equal(a.diff(spacetime('2045-01-15', 'UTC'), 'decades'), 2, 'two decades')
  t.equal(a.diff(spacetime('2245-01-15', 'UTC'), 'centuries'), 2, 'two centuries')
  t.equal(b.diff(a, 'season'), -30, 'negative seasons')
  t.equal(a.diff(a, 'century'), 0, 'no negative zero')
  t.equal(a.isSame(b, 'decade'), false, 'different decade')
  t.equal(a.isSame(b, 'century'), true, 'same century')
  t.equal(a.isSame(spacetime('2029-12-31', 'UTC'), 'decades'), true, 'same decade')
  t.equal(a.isSame(spacetime('2099-12-31', 'UTC'), 'centuries'), true, 'plural centuries')
  // a season spans the new year
  t.equal(a.isSame(spacetime('2023-12-05', 'UTC'), 'season'), true, 'december and january')
  t.equal(a.isSame(spacetime('2024-03-01', 'UTC'), 'season'), false, 'the next season')
  t.equal(a.isSame(spacetime('2024-12-05', 'UTC'), 'season'), false, 'same year, another winter')
  t.end()
})
