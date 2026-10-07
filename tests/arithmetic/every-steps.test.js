import test from 'tape'
import { spawnSync } from 'node:child_process'

const library = new URL('../_lib/index.js', import.meta.url).href
const timeout = 2000

test('every rejects unsupported steps without hanging', t => {
  const steps = ['0', '-1', '-0.5', '0.5', 'NaN', 'Infinity', '-Infinity']
  steps.forEach(step => {
    // Isolate iteration so a regression cannot hang the test process.
    const script = `
      import spacetime from ${JSON.stringify(library)}
      const start = spacetime('2024-01-01', 'UTC')
      const end = spacetime('2024-01-05', 'UTC')
      try {
        const dates = start.every('day', end, ${step})
        console.log(JSON.stringify({ count: dates.length }))
      } catch (error) {
        console.log(JSON.stringify({ error: error.name }))
      }
    `
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
      encoding: 'utf8', timeout, killSignal: 'SIGKILL'
    })
    const label = `2024-01-01 to 2024-01-05 UTC: every(day, step ${step})`
    if (result.error || result.status !== 0) {
      t.fail(`${label}: child failed (${result.error?.code || result.signal || result.status})`)
      return
    }
    const outcome = JSON.parse(result.stdout)
    // An empty result or an explicit argument error are both safe rejection policies.
    const rejected = outcome.count === 0 || ['RangeError', 'TypeError'].includes(outcome.error)
    t.equal(rejected, true, `${label}: rejects unsupported step (${JSON.stringify(outcome)})`)
  })
  t.end()
})
