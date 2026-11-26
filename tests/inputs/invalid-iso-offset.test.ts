import test from 'tape'
import spacetime from '../_lib/index.ts'

test('explicit invalid ISO offsets do not fall back to the local timezone', t => {
  for (const offset of ['+01:60', '-00:99', '+24:00', '-2500', '+99', '+5', '+123', '+01:2', '+01:02:03']) {
    for (const timezone of [undefined, 'UTC', 'America/New_York']) {
      const input = `2024-06-01T12:34:56${offset}`
      t.equal(spacetime(input, timezone).isValid(), false, `${input}, timezone ${timezone}`)
    }
  }
  t.equal(spacetime('Jun 01 2024 12:34:56 GMT+2460').isValid(), false, 'Date.toString offset is validated too')
  t.end()
})

test('valid ISO offset forms and offset-free clocks remain supported', t => {
  for (const [offset, minutes] of [['+05', 300], ['-0330', -210], ['+05:30', 330], ['-23:59', -1439], ['Z', 0]] as const) {
    t.equal(spacetime(`2024-06-01T12:34:56${offset}`).epoch,
      Date.UTC(2024, 5, 1, 12, 34, 56) - minutes * 60000, offset)
  }
  t.equal(spacetime('2024-06-01T12:34:56', 'UTC').epoch, Date.UTC(2024, 5, 1, 12, 34, 56), 'offset is optional')
  t.end()
})
