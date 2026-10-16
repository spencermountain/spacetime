import test from 'tape'
import spacetime from '../_lib/index.js'
import defaultSettings from '../_lib/i18n-defaults.js'

test('i18n weekStart', (t) => {
  t.teardown(() => spacetime.now().i18n(defaultSettings))
  let s = spacetime('may 30 2019', 'Canada/Pacific')
  s.i18n({
    days: {
      long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    }
  })
  s = s.startOf('week')
  t.equal(s.dayName(), 'lunes', 'default is monday')

  s = s.weekStart('martes')
  s = s.startOf('week')
  t.equal(s.dayName(), 'martes', 'week starts on martes')

  //set it back..
  s.i18n({
    days: {
      long: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    }
  })
  t.equal(s.dayName(), 'tuesday', 'i18n swap back')
  t.end()
})
