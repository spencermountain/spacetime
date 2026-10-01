import test from 'tape'
import spacetime from './lib/index.js'
import parseOffset from '../src/timezone/parseOffset.js'

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

test('century suffix scanning', (t) => {
  const s = spacetime('2020-06-15', 'UTC')
  t.equal(s.century('20 AD').year(), 1900, 'AD suffix')
  t.equal(s.century('20 B.C.').year(), -1900, 'BC suffix')
  t.equal(s.century('0'.repeat(50000) + '20').year(), 1900, 'long number without an era suffix')
  t.end()
})

test('timezone offset suffix scanning', (t) => {
  t.equal(parseOffset('+5hrs'), 'etc/gmt-5', 'positive offset')
  t.equal(parseOffset('-5hrs'), 'etc/gmt+5', 'negative offset')
  t.equal(parseOffset('prefix -5HRS'), 'etc/gmt+5', 'embedded offset')
  t.equal(parseOffset('0'.repeat(50000) + '5'), 'etc/gmt-5', 'long number without an hours suffix')
  t.equal(parseOffset('999hrs'), null, 'out-of-range offset does not match a shorter suffix')
  t.end()
})
