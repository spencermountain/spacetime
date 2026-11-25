import test from 'tape'
import spacetime from '../_lib/index.ts'
import defaults from '../_lib/i18n-defaults.ts'

test('week calculations do not depend on translated calendar names', (t) => {
  t.teardown(() => spacetime.now().i18n(defaults))
  const dates = ['2021-01-04', '2022-01-03', '2025-12-29', '2026-01-01', '2024-06-03']
  const zones = ['UTC', 'America/New_York']
  const cases = zones.flatMap(tz => dates.map(date => {
    const s = spacetime(date, tz)
    return {
      date, tz, week: s.week(), first: s.week(1).epoch, second: s.week(2).epoch,
      nextWeekend: s.add(1, 'weekend').epoch, previousWeekend: s.subtract(1, 'weekend').epoch
    }
  }))

  spacetime.now().i18n({
    days: {
      short: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    },
    months: {
      long: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
        'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    }
  })

  cases.forEach(({ date, tz, week, first, second, nextWeekend, previousWeekend }) => {
    const s = spacetime(date, tz)
    const original = s.epoch
    t.equal(s.week(), week, `${date} ${tz} week number`)
    t.equal(s.week(1).epoch, first, `${date} ${tz} first week`)
    t.equal(s.week(2).epoch, second, `${date} ${tz} second week`)
    t.equal(s.add(1, 'weekend').epoch, nextWeekend, `${date} ${tz} next weekend`)
    t.equal(s.subtract(1, 'weekend').epoch, previousWeekend, `${date} ${tz} previous weekend`)
    t.equal(s.epoch, original, `${date} ${tz} preserves input`)
  })
  t.equal(spacetime('2021-01-04', 'UTC').monthName(), 'enero', 'names remain localized')
  t.end()
})
