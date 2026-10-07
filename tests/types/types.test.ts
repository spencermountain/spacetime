import { default as test } from 'tape'
import { spacetime } from './spacetime-static'

test('Spacetime base properties exist', (t: test.Test) => {
  const obj = spacetime.now()

  t.ok(obj.d instanceof Date, '.d is a date')
  t.equal(typeof obj.epoch, 'number', '.epoch is a number')
  t.equal(typeof obj.silent, 'boolean', '.silent is a boolean')
  t.equal(typeof obj.tz, 'string', '.tz is a string')
  t.ok(obj.timezones != undefined, '.timezones exists')
  t.end()
})

test('era getter/setter types', (t: test.Test) => {
  const obj = spacetime.now()
  const era: 'BC' | 'AD' = obj.era()
  t.ok(era === 'BC' || era === 'AD', '.era() returns BC/AD')
  t.equal(typeof obj.era('bc').epoch, 'number', '.era(value) returns a Spacetime')
  t.end()
})
