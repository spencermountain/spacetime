import test from 'tape'
import getDay from '../src/_lib/getDay.js'
const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// examples from
// https://artofmemory.com/blog/how-to-calculate-the-day-of-the-week/
test('test getday method', (t) => {
  // einstein_birthday
  t.equal(DAYS[getDay(1897, 3, 14)], 'Sunday');
  t.equal(DAYS[getDay(1897, 3, 15)], 'Monday');
  t.equal(DAYS[getDay(1897, 3, 16)], 'Tuesday');
  t.equal(DAYS[getDay(1897, 3, 17)], 'Wednesday');
  t.equal(DAYS[getDay(1897, 3, 18)], 'Thursday');
  t.equal(DAYS[getDay(1897, 3, 19)], 'Friday');
  t.equal(DAYS[getDay(1897, 3, 20)], 'Saturday');
  t.equal(DAYS[getDay(1897, 3, 21)], 'Sunday');
  // moon_landing
  t.equal(DAYS[getDay(1969, 7, 20)], 'Sunday');
  t.equal(DAYS[getDay(1969, 7, 21)], 'Monday');
  t.equal(DAYS[getDay(1969, 7, 22)], 'Tuesday');
  // battle_of_hastings
  t.equal(DAYS[getDay(1066, 10, 14)], 'Saturday');
  // y2k
  t.equal(DAYS[getDay(2000, 1, 1)], 'Saturday');
  t.equal(DAYS[getDay(2000, 1, 2)], 'Sunday');
  t.equal(DAYS[getDay(1999, 12, 31)], 'Friday');
  t.equal(DAYS[getDay(1999, 12, 30)], 'Thursday');
  // future dates
  t.equal(DAYS[getDay(2022, 8, 29)], 'Monday');
  t.equal(DAYS[getDay(2025, 9, 1)], 'Monday');
  t.equal(DAYS[getDay(2025, 9, 24)], 'Wednesday');
  t.equal(DAYS[getDay(2031, 12, 2)], 'Tuesday');
  t.equal(DAYS[getDay(2031, 12, 17)], 'Wednesday');
  t.equal(DAYS[getDay(2045, 2, 14)], 'Tuesday');
  t.end()
})
