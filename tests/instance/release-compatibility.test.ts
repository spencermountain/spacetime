import test from 'tape'
import { runInNewContext } from 'node:vm'
import spacetime from '../_lib/index.ts'

test('Date inputs from another realm preserve their epoch and validity', t => {
  const epoch = Date.UTC(2024, 5, 15, 12)
  const foreign = runInNewContext(`new Date(${epoch})`)
  t.notOk(foreign instanceof Date, 'fixture uses another Date constructor')
  for (const date of [new Date(epoch), foreign]) {
    t.equal(spacetime(date, 'UTC').epoch, epoch, 'constructor preserves the instant')
    t.equal(spacetime('2000-01-01', 'UTC').set(date).epoch, epoch, 'set preserves the instant')
  }
  for (const date of [new Date(NaN), runInNewContext('new Date(NaN)')]) {
    t.notOk(spacetime(date, 'UTC').isValid(), 'invalid Date remains invalid')
    t.notOk(spacetime('2000-01-01', 'UTC').set(date).isValid(), 'set preserves invalidity')
  }
  t.end()
})

test('json preserves day, decade, and century setters', t => {
  const original = spacetime('2024-06-15', 'UTC')
  const cases: [Record<string, number | string>, string][] = [
    [{ day: 1 }, '2024-06-10'],
    [{ day: 'monday' }, '2024-06-10'],
    [{ decade: 1990 }, '1990-06-15'],
    [{ century: 19 }, '1800-06-15'],
    [{ century: 19, decade: 1990, year: 2020, month: 0, date: 15, day: 1 }, '2020-01-13']
  ]
  for (const [input, expected] of cases) {
    t.equal(original.json(input).format('iso-short'), expected, JSON.stringify(input))
  }
  t.equal(original.format('iso-short'), '2024-06-15', 'setters leave the original unchanged')
  t.end()
})
