import test from 'tape'
import spacetime from '../_lib/index.ts'
import { bounds } from '../../src/methods/startOf.ts'
import type { TimeUnit } from '../../src/types/index.ts'

test('boundary methods ignore inherited and unknown unit names', t => {
  const original = spacetime('2024-06-15T12:30:45.123Z', 'UTC')
  for (const unit of ['__proto__', 'constructor', 'unknown']) {
    for (const method of ['startOf', 'endOf'] as const) {
      t.doesNotThrow(() => {
        const result = original[method](unit as TimeUnit)
        t.equal(result.epoch, original.epoch, `${method}(${unit}) preserves the date`)
        t.notEqual(result, original, `${method}(${unit}) returns a clone`)
      }, `${method}(${unit}) does not call an inherited property`)
    }
    t.doesNotThrow(() => {
      const [start, end] = bounds(original, unit as TimeUnit)
      t.equal(start.epoch, original.epoch, `${unit}: unchanged lower bound`)
      t.equal(end.epoch, original.epoch, `${unit}: unchanged upper bound`)
      t.notEqual(start, end, `${unit}: distinct instances`)
    }, `bounds(${unit}) ignores unknown units`)
  }
  t.equal(original.startOf('day').time(), '12:00am', 'known unit still resolves')
  t.equal(original.endOf('day').format('iso'), '2024-06-15T23:59:59.999Z', 'known end boundary')
  t.end()
})
