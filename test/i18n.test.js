'use strict';
const test = require('tape');
const spacetime = require('../src');

test('i18n', t => {
  let a = spacetime([2000, 0, 1]);

  t.equal(a.format('day-short'), 'Sat', 'en: day-short');
  t.equal(a.format('day'), 'Saturday', 'en: day');
  t.equal(a.format('month-short'), 'Jan', 'en: month-short');
  t.equal(a.format('month'), 'January', 'en: month');

  a.i18n({
    days: {
      short: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
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
        'diciembre',
      ],
    },
  });

  t.equal(a.format('day-short'), 'Sáb', 'es: day-short');
  t.equal(a.format('day'), 'Sábado', 'es: day');
  t.equal(a.format('month-short'), 'Ene', 'es: month-short');
  t.equal(a.format('month'), 'Enero', 'es: month');

  t.end();
});
