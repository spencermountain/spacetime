const spacetime = require('./src/index')

let s = spacetime('may 30 2019', 'Canada/Eastern')

s.i18n({
  days: {
    long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  }
})
// s = s.weekStart(0)
s = s.startOf('week')
console.log(s.dayName())
