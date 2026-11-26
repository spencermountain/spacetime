import test from 'tape'
import spacetime from '../_lib/index.ts'
import defaults from '../_lib/i18n-defaults.ts'

test('date parsing follows the current i18n month names', t => {
  t.teardown(() => spacetime.now().i18n(defaults))
  const s = spacetime('2024-06-15', 'UTC')
  s.i18n({
    months: {
      short: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      long: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    }
  })
  for (const input of ['15 enero 2024', 'enero 15 2024', '2024-ene-15', '15-ene-2024']) {
    t.equal(spacetime(input, 'UTC').iso(), '2024-01-15T00:00:00.000Z', input)
    t.equal(s.set(input).iso(), '2024-01-15T00:00:00.000Z', `existing instance: ${input}`)
  }
  t.equal(spacetime('15 mayo', 'UTC', { today: { year: 2024 } }).iso(), '2024-05-15T00:00:00.000Z', 'localized input with a default year')
  t.equal(spacetime('2024', 'UTC', { today: { month: 'mayo', date: 15 } }).iso(), '2024-05-15T00:00:00.000Z', 'localized default month')
  s.i18n(defaults)
  t.equal(spacetime('15 enero 2024', 'UTC').isValid(), false, 'old names are removed when the locale is restored')
  t.equal(spacetime('15 January 2024', 'UTC').iso(), '2024-01-15T00:00:00.000Z', 'English names work after restoring the locale')
  t.end()
})
