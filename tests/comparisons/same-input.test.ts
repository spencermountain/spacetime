import test from 'tape'
import spacetime from '../_lib/index.ts'
import type { SpacetimeInput } from '../../src/types/index.ts'

test('isSame accepts supported date input objects', t => {
  const start = spacetime('2024-06-15T12:30:00Z', 'UTC')
  const inputs: SpacetimeInput[] = [
    new Date('2024-06-15T12:30:00Z'),
    [2024, 5, 15, 12, 30],
    { year: 2024, month: 5, date: 15, hour: 12, minute: 30 },
    { epoch: start.epoch }
  ]
  inputs.forEach(input => {
    t.equal(start.isSame(input, 'day'), true, 'same day for a supported input')
    t.equal(start.isSame(input, 'hour'), true, 'same hour for a supported input')
    t.equal(start.add(1, 'day').isSame(input, 'day'), false, 'different day is not equal')
  })
  t.equal(start.isSame(new Date(NaN), 'day'), false, 'invalid Date remains unequal')
  t.equal(start.isSame(null, 'day'), false, 'null remains unequal')
  const otherZone = start.goto('Asia/Kolkata')
  t.equal(start.isSame(otherZone, 'hour'), true, 'instances still compare in the receiver timezone')
  t.equal(start.isSame(otherZone, 'hour', false), false, 'timezone-unaware comparison preserves wall times')
  t.equal(otherZone.tz, 'asia/kolkata', 'other instance is unchanged')
  t.equal(start.epoch, Date.parse('2024-06-15T12:30:00Z'), 'receiver is unchanged')
  t.end()
})
