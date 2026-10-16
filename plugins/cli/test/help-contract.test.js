import test from 'tape'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const cli = fileURLToPath(new URL('../cli.js', import.meta.url))
const run = flag => spawnSync(process.execPath, ['--no-warnings', cli, flag], {
  cwd: tmpdir(),
  encoding: 'utf8',
  timeout: 10000,
  env: { ...process.env, NO_COLOR: '1', TZ: 'UTC' }
})

test('CLI help works outside the package directory', t => {
  const long = run('--help')
  const short = run('-h')
  t.error(long.error, 'long help starts and exits within the timeout')
  t.error(short.error, 'short help starts and exits within the timeout')
  t.equal(long.status, 0, 'long help exits successfully')
  t.equal(short.status, 0, 'short help exits successfully')
  t.equal(long.stderr, '', 'long help does not write errors')
  t.equal(short.stderr, '', 'short help does not write errors')
  t.ok(long.stdout.trim().length > 0, 'help is nonempty')
  t.equal(short.stdout, long.stdout, 'both flags print the same help')
  t.end()
})
