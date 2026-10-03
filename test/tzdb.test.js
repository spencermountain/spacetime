import test from 'tape'
import spacetime from './lib/index.js'
import { tzdbVersion } from '../zonefile/iana.js'

test('tzdb version', (t) => {
  t.ok(/^\d{4}[a-z]+$/.test(spacetime.tzdbVersion), `looks like '2026c'`)
  t.equal(spacetime.tzdbVersion, tzdbVersion, 'same as zonefile/iana.js')
  t.end()
})
