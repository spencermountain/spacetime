import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const loader = new URL('./loader.js', import.meta.url).href

// Reuse plugin assertions against each distribution format in fresh processes.
for (const format of ['esm', 'cjs', 'umd']) {
  process.stdout.write(`\nTesting plugin bundles: ${format}\n`)
  const result = spawnSync('pnpm', ['--filter', './plugins/*', 'run', 'test'], {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      PLUGIN_FORMAT: format,
      NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --loader=${loader}`
    }
  })
  if (result.error) {
    throw result.error
  }
  if (result.status !== 0) {
    process.exitCode = result.status || 1
    break
  }
}
