import test from 'tape'
import spacetime from '../_lib/index.js'

test('format template boundaries', (t) => {
  const s = spacetime('2020-06-15', 'UTC')
  t.equal(s.format('{year} {month}'), '2020 June', 'adjacent tokens')
  t.equal(s.format('{{year}'), '', 'nested opening brace stays part of the token')
  t.equal(s.format('{}{year}'), '', 'empty braces stay part of the following token')
  for (const newline of ['\n', '\r', '\u2028', '\u2029']) {
    t.equal(s.format('{unclosed' + newline + '{year}'), '{unclosed' + newline + '2020', 'tokens after a line ending')
  }
  const unclosed = '{'.repeat(50000) + '!'
  t.equal(s.format(unclosed), unclosed, 'long unmatched template is preserved')
  t.end()
})
