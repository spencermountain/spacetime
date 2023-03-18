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
  t.equal(spacetime([1897, 3, 14]).dayName(), 'Sunday', 'einstein');
  t.equal(spacetime([1897, 3, 15]).dayName(), 'Monday', 'einstein+1');
  t.equal(spacetime([1897, 3, 16]).dayName(), 'Tuesday', 'einstein+2');
  t.equal(spacetime([1897, 3, 17]).dayName(), 'Wednesday', 'einstein+3');
  t.equal(spacetime([1897, 3, 18]).dayName(), 'Thursday', 'einstein+4');
  t.equal(spacetime([1897, 3, 19]).dayName(), 'Friday', 'einstein+5');
  t.equal(spacetime([1897, 3, 20]).dayName(), 'Saturday', 'einstein+6');
  t.equal(spacetime([1897, 3, 21]).dayName(), 'Sunday', 'einstein+7');
  // moon_landing
  t.equal(spacetime([1969, 7, 20]).dayName(), 'Sunday', 'moon');
  t.equal(spacetime([1969, 7, 21]).dayName(), 'Monday', 'moon+1');
  t.equal(spacetime([1969, 7, 22]).dayName(), 'Tuesday', 'moon+2');
  // battle_of_hastings
  t.equal(spacetime([1066, 10, 14]).dayName(), 'Saturday', 'hastings');
  // y2k
  t.equal(spacetime([2000, 1, 1]).dayName(), 'Saturday', 'y2k');
  t.equal(spacetime([2000, 1, 2]).dayName(), 'Sunday', 'y2k+1');
  t.equal(spacetime([1999, 12, 31]).dayName(), 'Friday', 'y2k+2');
  t.equal(spacetime([1999, 12, 30]).dayName(), 'Thursday', 'y2k+3');
  // future dates
  t.equal(spacetime([2022, 8, 29]).dayName(), 'Monday', 'future+');
  t.equal(spacetime([2025, 9, 1]).dayName(), 'Monday', 'future+1');
  t.equal(spacetime([2025, 9, 24]).dayName(), 'Wednesday', 'future+2');
  t.equal(spacetime([2031, 12, 2]).dayName(), 'Tuesday', 'future+3');
  t.equal(spacetime([2031, 12, 17]).dayName(), 'Wednesday', 'future+4');
  t.equal(spacetime([2045, 2, 14]).dayName(), 'Tuesday', 'future+5');
  t.end()
})
