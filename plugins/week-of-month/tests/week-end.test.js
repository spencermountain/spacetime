import test from 'tape'
import spacetime from 'spacetime'
import plugin from '../src/index.js'

spacetime.extend(plugin)

test('the final millisecond belongs to the current week', t => {
  for (const zone of ['UTC', 'America/Los_Angeles', 'Pacific/Auckland']) {
    const sunday = spacetime('2026-06-07T23:59:59.999', zone).weekStart('monday')
    const epoch = sunday.epoch
    t.equal(sunday.weekOfMonth(), 1, `${zone}: Sunday is still in the first week`)
    t.equal(sunday.add(1, 'millisecond').weekOfMonth(), 2, `${zone}: Monday starts the second week`)
    t.equal(sunday.epoch, epoch, 'the getter preserves the input')
  }
  t.end()
})
