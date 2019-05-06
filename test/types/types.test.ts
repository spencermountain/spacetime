import * as test from 'tape'
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
