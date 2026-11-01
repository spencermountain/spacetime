import test from 'tape'
import spacetime from '../_lib/index.ts'
import defaultSettings from '../_lib/i18n-defaults.ts'

test('i18n', (t) => {
  t.teardown(() => spacetime.now().i18n(defaultSettings))
  const start = spacetime('Dec 25th 2021')
  const end = spacetime('Feb 2nd 2022')

  const translationValues = {
    units: {
      second: 'segundo',
      seconds: 'segundos',
      minute: 'minuto',
      minutes: 'minutos',
      hour: 'hora',
      hours: 'horas',
      day: 'dia',
      days: 'dias',
      month: 'mes',
      months: 'meses',
      year: 'año',
      years: 'años'
    }
  }

  start.i18n(translationValues)
  end.i18n(translationValues)

  const diff = start.since(end).diff
  t.equal(diff.days, -8, 'same-day')
  t.equal(diff.hours, 0, 'hour diff')
  t.equal(diff.minutes, 0, 'same-min')
  t.equal(diff.seconds, 0, 'same-sec')
  t.end()
})
