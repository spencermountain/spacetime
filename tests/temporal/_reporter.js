import './_require.js'
import { pipeline } from 'node:stream'
import test from 'tape'
import TapDance from 'tap-dancer'

// Keep Tape and its reporter in one process so failures retain their exit status.
pipeline(test.createStream(), new TapDance(), process.stdout, err => {
  if (err) {
    process.stderr.write(`${err.stack || err}\n`)
    process.exitCode = 1
  }
})
