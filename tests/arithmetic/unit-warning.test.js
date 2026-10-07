import test from 'tape'
import spacetime from '../_lib/index.js'

test('unsupported arithmetic units warn only when requested', t => {
  const warn = console.warn
  const warnings = []
  console.warn = message => warnings.push(message)
  try {
    const quiet = spacetime('2026-01-15', 'UTC')
    t.equal(quiet.add(3, 'daus').epoch, quiet.epoch, 'default remains a no-op')
    t.equal(warnings.length, 0, 'silent by default')

    const s = spacetime('2026-01-15', 'UTC', { silent: false })
    ;['add', 'subtract', 'plus', 'minus'].forEach(method => {
      const result = s[method](3, 'daus')
      t.notEqual(result, s, method + ' returns a clone')
      t.equal(result.epoch, s.epoch, method + ' preserves the instant')
      t.equal(result.isValid(), true, method + ' remains valid')
    })
    t.equal(warnings.length, 4, 'one warning per operation')
    warnings.forEach(message => {
      t.ok(message.includes('daus'), 'warning identifies the unsupported unit')
    })

    warnings.length = 0
    ;['millisecond', 'seconds', 'minutes', 'hours', 'days', 'date', 'weeks',
      'weekend', 'fortnight', 'months', 'quarterHour', 'quarters', 'seasons',
      'years', 'decades', 'centuries'].forEach(unit => {
      t.equal(s.add(1, unit).isValid(), true, unit + ' remains supported')
    })
    t.equal(warnings.length, 0, 'supported units and aliases do not warn')
    t.equal(s.iso(), '2026-01-15T00:00:00.000Z', 'original remains unchanged')
  } finally {
    console.warn = warn
  }
  t.end()
})
