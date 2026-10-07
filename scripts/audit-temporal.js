import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import '../tests/temporal/_require.js'
import audit from './_lib/temporal-audit.js'

const require = createRequire(import.meta.url)
const tape = join(dirname(require.resolve('tape')), 'bin/tape')
process.exitCode = await audit(tape, { ...process.env, TESTENV: 'temporal' })
