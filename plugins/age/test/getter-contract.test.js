import test from 'tape'
import spacetime from 'spacetime'
import plugin from '../src/index.js'

spacetime.extend(plugin)

test('age getters preserve the input datetime', t => {
  const s = spacetime('2026-06-21T14:35:42.123', 'America/New_York')
  const iso = s.iso()
  for (const method of ['age']) {
    const result = s[method]()
    t.ok(result !== undefined && result !== null, `${method} returns a result`)
    t.equal(s.iso(), iso, `${method} leaves the datetime unchanged`)
  }
  t.end()
})
