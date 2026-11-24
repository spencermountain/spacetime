import test from 'tape'
import spacetime from '../_lib/index.ts'

test('month names normalize case and surrounding whitespace', (t) => {
  const original = spacetime('2024-01-31T12:34:56.789Z', 'UTC')
  for (const input of ['Sept', 'SEPT', ' Sept ', ' sep ', ' SEPTEMBER ']) {
    const result = original.month(input)
    t.equal(result.iso(), '2024-09-30T12:34:56.789Z', input)
    t.equal(original.iso(), '2024-01-31T12:34:56.789Z', 'input stays unchanged')
  }
  t.equal(original.month(' FEB ').iso(), '2024-02-29T12:34:56.789Z', 'leap-day clamping')
  t.equal(original.month(' SEPT ', false).year(), 2023, 'backward direction is preserved')
  t.equal(original.monthName(' SEPT ').monthName(), 'september', 'monthName delegates to the same setter')
  t.end()
})
