import test from 'tape'
import { spawnSync } from 'node:child_process'

test('calendar arithmetic terminates when the result is outside the date range', t => {
  const entry = new URL('../_lib/index.ts', import.meta.url).href
  const script = `
    import assert from 'node:assert/strict'
    import spacetime from ${JSON.stringify(entry)}
    const original = spacetime('2024-01-15T12:30:00Z', 'UTC')
    const epoch = original.epoch
    for (const unit of ['day', 'week', 'month', 'quarter', 'year']) {
      for (const amount of [Infinity, -Infinity, NaN, 1e12, -1e12]) {
        for (const method of ['add', 'subtract', 'plus', 'minus']) {
          const result = original[method](amount, unit)
          assert.equal(result.isValid(), false, method + ' ' + amount + ' ' + unit)
          assert.notEqual(result, original)
          assert.equal(original.epoch, epoch)
        }
      }
    }
    assert.equal(original.add(1, 'day').format('iso-short'), '2024-01-16')
    assert.equal(original.subtract(1, 'day').format('iso-short'), '2024-01-14')
    console.log('calendar arithmetic completed')
  `
  const result = spawnSync(process.execPath, ['--import', 'tsx', '--input-type=module', '--eval', script], {
    encoding: 'utf8',
    timeout: 10000
  })
  t.error(result.error, 'calendar arithmetic finishes without timing out')
  t.equal(result.status, 0, result.stderr || 'invalid results and immutable inputs verified')
  t.match(result.stdout, /calendar arithmetic completed/, 'all operations completed')
  t.end()
})
