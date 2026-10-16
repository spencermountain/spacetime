import test from 'tape'
import parseOffset from '../../src/timezone/parseOffset.js'

test('timezone offset suffix scanning', (t) => {
  t.equal(parseOffset('+5hrs'), 'etc/gmt-5', 'positive offset')
  t.equal(parseOffset('-5hrs'), 'etc/gmt+5', 'negative offset')
  t.equal(parseOffset('prefix -5HRS'), 'etc/gmt+5', 'embedded offset')
  t.equal(parseOffset('0'.repeat(50000) + '5'), 'etc/gmt-5', 'long number without an hours suffix')
  t.equal(parseOffset('999hrs'), null, 'out-of-range offset does not match a shorter suffix')
  t.end()
})
