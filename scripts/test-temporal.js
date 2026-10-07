import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import audit from './_lib/temporal-audit.js'

const require = createRequire(import.meta.url)
const all = process.argv.includes('--all')
const prod = process.argv.includes('--prod')
const patterns = ['tests/temporal/*.test.js', 'tests/integration/temporal.test.js']
const tape = join(dirname(require.resolve('tape')), 'bin/tape')
const reporterPath = join(dirname(require.resolve('tap-dancer')), 'cli.js')
const env = { ...process.env, TESTENV: prod ? 'temporal-prod' : 'temporal' }
const finished = child => new Promise(resolve => {
  child.on('error', error => {
    console.error(error.message) // eslint-disable-line no-console
    resolve(1)
  })
  child.on('close', code => { resolve(code ?? 1) })
})

if (!globalThis.Temporal) {
  throw new Error('Temporal tests require a runtime with native Temporal, such as Node 26')
}

if (all) {
  process.exitCode = await audit(tape, env)
} else {
  const reporter = spawn(process.execPath, [reporterPath, '--color', 'always'], {
    stdio: ['pipe', 'inherit', 'inherit']
  })
  const tests = spawn(process.execPath, [tape, ...patterns], {
    env, stdio: ['ignore', 'pipe', 'inherit']
  })
  tests.stdout.pipe(reporter.stdin)
  const codes = await Promise.all([finished(tests), finished(reporter)])
  process.exitCode = codes.some(code => code !== 0) ? 1 : 0
}
