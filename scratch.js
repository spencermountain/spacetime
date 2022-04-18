// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

let s = spacetime.now()
s.i18n({
  days: {
    long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    short: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
  },
  months: {
    long: [],
    short: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  },
  ampm: {
    am: ' a. m.',
    pm: ' a. m.'
  },
  useTitleCase: true // automatically in .format()
});
console.log(s.format('day')) //'Sábado'