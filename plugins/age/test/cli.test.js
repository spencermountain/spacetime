import test from 'tape'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const cli = fileURLToPath(new URL('../cli.js', import.meta.url))
const run = args => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8' })

test('space-age CLI', t => {
  t.match(run(['--help']), /Usage:.*space-age/, 'prints usage')
  t.match(run(['January', '1', '2000', '--days']).trim(), /^\d[\d,]* \(days\)$/, 'calculates age in days')
  t.end()
})
