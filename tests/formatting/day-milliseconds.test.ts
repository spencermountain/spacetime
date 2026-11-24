import test from 'tape'
import spacetime from '../_lib/index.ts'
import dstParse from '../_lib/dst-parse.ts'

test('unixFmt A measures the local clock on DST transition days', t => {
  const zone = 'america/new_york'
  const rule = spacetime.timezones()[zone].dst
  for (const transition of [0, 1]) {
    const parts = dstParse(rule, transition)
    const s = spacetime({ ...parts, hour: 4, minute: 5, second: 6, millisecond: 7 }, zone)
    t.equal(s.unixFmt('A'), String(((4 * 60 + 5) * 60 + 6) * 1000 + 7), `transition ${transition}`)
    t.notEqual(s.epoch - s.startOf('day').epoch, Number(s.unixFmt('A')), 'elapsed time differs on a transition day')
  }
  const normal = spacetime('2024-02-01T23:59:59.999', zone)
  t.equal(normal.unixFmt('A'), '86399999', 'ordinary day')
  t.equal(normal.startOf('day').unixFmt('A'), '0', 'midnight')
  t.end()
})
