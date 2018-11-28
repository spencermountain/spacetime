const spacetime = require('./src/index')

let s = spacetime('March 2')

s.i18n({
  days: {
    short: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  },
  months: {
    short: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    long: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ]
  }
});

console.log(s.format('day-short'))
