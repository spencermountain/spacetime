import test from 'tape'
import spacetime from '../_lib/index.ts'

test('every accepts the Unix epoch as an endpoint', t => {
  const before = spacetime(-7200000, 'UTC')
  t.deepEqual(before.every('hour', 0).map(s => s.epoch), [-7200000, -3600000], 'hours before epoch zero')
  t.deepEqual(before.every('hour', 0, 2).map(s => s.epoch), [-7200000], 'step count is preserved')
  t.deepEqual(before.each('hour', 0).map(s => s.epoch), [-7200000, -3600000], 'each alias accepts zero')
  const after = spacetime(7200000, 'UTC')
  t.deepEqual(after.every('hour', 0).map(s => s.epoch), [0, 3600000], 'reversed range starts at zero')
  t.deepEqual(spacetime(0, 'UTC').every('hour', 0), [], 'equal endpoints remain empty')
  t.equal(before.epoch, -7200000, 'start is unchanged')
  t.equal(after.epoch, 7200000, 'reversed start is unchanged')
  t.deepEqual(before.every('hour', null), [], 'missing endpoint is still rejected')
  t.end()
})
