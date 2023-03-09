import test from 'tape'
import spacetime from './_lib.js'
// import getDay from '../../src/01-one/compute/_lib/getDay.js'
// const DAYS = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
// ];

// examples from
// https://artofmemory.com/blog/how-to-calculate-the-day-of-the-week/
test('test getday method', (t) => {
  // einstein_birthday
  t.equal(spacetime([1897, 3, 14]).dayName(), 'sunday');
  t.equal(spacetime([1897, 3, 15]).dayName(), 'monday');
  t.equal(spacetime([1897, 3, 16]).dayName(), 'tuesday');
  t.equal(spacetime([1897, 3, 17]).dayName(), 'wednesday');
  t.equal(spacetime([1897, 3, 18]).dayName(), 'thursday');
  t.equal(spacetime([1897, 3, 19]).dayName(), 'friday');
  t.equal(spacetime([1897, 3, 20]).dayName(), 'saturday');
  t.equal(spacetime([1897, 3, 21]).dayName(), 'sunday');
  // moon_landing
  t.equal(spacetime([1969, 7, 20]).dayName(), 'sunday');
  t.equal(spacetime([1969, 7, 21]).dayName(), 'monday');
  t.equal(spacetime([1969, 7, 22]).dayName(), 'tuesday');
  // battle_of_hastings
  t.equal(spacetime([1066, 10, 14]).dayName(), 'saturday');
  // y2k
  t.equal(spacetime([2000, 1, 1]).dayName(), 'saturday');
  t.equal(spacetime([2000, 1, 2]).dayName(), 'sunday');
  t.equal(spacetime([1999, 12, 31]).dayName(), 'friday');
  t.equal(spacetime([1999, 12, 30]).dayName(), 'thursday');
  // future dates
  t.equal(spacetime([2022, 8, 29]).dayName(), 'monday');
  t.equal(spacetime([2025, 9, 1]).dayName(), 'monday');
  t.equal(spacetime([2025, 9, 24]).dayName(), 'wednesday');
  t.equal(spacetime([2031, 12, 2]).dayName(), 'tuesday');
  t.equal(spacetime([2031, 12, 17]).dayName(), 'wednesday');
  t.equal(spacetime([2045, 2, 14]).dayName(), 'tuesday');
  t.end()
})
