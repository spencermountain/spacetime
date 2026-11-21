import test from 'tape'
import spacetime from '../../src/temporal/index.ts'
import type { Units } from '../../types/temporal-types.js'
const options = { skip: !globalThis.Temporal }

test('Temporal fractions: results stay between whole amounts', options, (t) => {
  const cases = [
    ['2020-06-15T12:10:00', 'UTC', 0.001, 'day', '2020-06-15T12:11:26.400Z'],
    ['2020-06-15T12:34:56.789', 'UTC', -0.001, 'day', '2020-06-15T12:33:30.389Z'],
    ['2020-06-15T12:40:00', 'UTC', 0.9999, 'day', '2020-06-16T12:39:51.360Z'],
    ['2026-03-08T00:00:00', 'America/New_York', 0.5, 'day', '2026-03-08T13:00:00.000-04:00'],
    ['2026-03-08T00:00:00', 'America/New_York', 0.9999, 'day', '2026-03-09T00:00:00.000-04:00'],
    ['2026-11-01T00:00:00', 'America/New_York', 1.0001, 'day', '2026-11-02T00:00:00.000-05:00']
  ] as [string, string, number, Units, string][]
  cases.forEach(([input, zone, amount, unit, expected]) => {
    t.equal(spacetime(input, zone).add(amount, unit).format('iso'), expected, `${input} + ${amount} ${unit}`)
  })
  t.end()
})

test('Temporal fractions: weeks, ties and round trips', options, (t) => {
  const s = spacetime('2020-06-15T00:00:00', 'UTC')
  t.equal(s.add(0.5, 'week').format('iso'), '2020-06-18T12:00:00.000Z', 'half a week')
  t.equal(s.add(0.5, 'week').epoch, s.add(3.5, 'day').epoch, 'half a week is 3.5 days')
  t.equal(s.add(0.25, 'week').format('iso'), '2020-06-16T18:00:00.000Z', 'a quarter week')
  const cases = [
    [0.5, 'week'],
    [1.5, 'week'],
    [0.0625, 'day'],
    [0.025, 'hour'],
    [0.025, 'minute'],
    [0.5, 'quarterhour']
  ] as [number, Units][]
  cases.forEach(([amount, unit]) => {
    t.equal(s.add(amount, unit).subtract(amount, unit).epoch, s.epoch, `+ then - ${amount} ${unit}`)
    t.equal(s.subtract(amount, unit).add(amount, unit).epoch, s.epoch, `- then + ${amount} ${unit}`)
  })
  t.end()
})

test('Temporal fractions: months use a fixed 28 days', options, (t) => {
  const s = spacetime('2020-01-01', 'UTC')
  t.equal(s.add(0.5, 'month').format('iso-short'), '2020-01-15', 'half a month is 14 days')
  t.equal(s.add(0.9999, 'month').format('iso-short'), '2020-01-29', 'nearly a month is 28 days')
  t.equal(s.add(1, 'month').format('iso-short'), '2020-02-01', 'a whole month is calendar')
  t.end()
})
