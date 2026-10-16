import test from 'tape'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const cli = fileURLToPath(new URL('../cli.js', import.meta.url))
const run = args => execFileSync(process.execPath, [cli, ...args], { encoding: 'utf8' })

test('stz CLI', t => {
  const help = run(['--help'])
  t.match(help, /Usage:.*stz/, 'prints usage')
  t.notOk(/Could not find/.test(help), 'recognizes the help option')
  t.match(run(['boston']), /\d{1,2}:\d{2}(am|pm) E[DS]T/, 'prints Boston time and offset abbreviation')
  t.end()
})
