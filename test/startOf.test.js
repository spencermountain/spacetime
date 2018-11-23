'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('start of month', t => {
  let d = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  d.startOf('month');

  let monthStart = spacetime('March 1, 1999 00:00:00', 'Canada/Eastern');
  monthStart.milliseconds(0);

  t.equal(d.isEqual(monthStart), true, 'month-start');
  t.equal(d.isSame(monthStart, 'day'), true, 'same-day');
  t.equal(d.isSame(monthStart, 'month'), true, 'same-month');
  t.equal(d.isSame(monthStart, 'year'), true, 'same-year');
  t.equal(d.date(), 1, 'first day');
  t.equal(d.hour(), 0, 'first hour');

  t.end();
});

test('start of quarterHour', t => {
  let d = spacetime('March 28, 1999 8:42:12', 'Canada/Eastern');
  d.startOf('quarterHour');
  t.equal(d.time(), '8:30am', 'quarterHour-start');

  d = spacetime('March 28, 1999 20:00:12', 'Canada/Pacific');
  d.startOf('quarterHour');
  t.equal(d.time(), '8:00pm', 'quarterHour-start2');
  t.end();
});

test('start of winter', t => {
  let d = spacetime('January 28, 2017 20:42:00', 'Canada/Pacific');
  d.startOf('season');

  let start = spacetime('December 1, 2016 00:00:00', 'Canada/Pacific');
  start.millisecond(0);
  t.equal(d.isEqual(start), true, 'month-is-exactly-start');

  t.equal(d.isSame(start, 'day'), true, 'same-day');
  t.equal(d.isSame(start, 'month'), true, 'same-month');
  t.equal(d.isSame(start, 'year'), true, 'same-year');
  t.equal(d.date(), 1, 'first day');
  t.equal(d.hour(), 0, 'first hour');
  t.equal(d.minute(), 0, 'first minute');
  t.equal(d.second(), 0, 'first second');

  t.end();
});

test('end of day', t => {
  let d = spacetime('March 28, 1999 20:42:00', 'Africa/Algiers');
  d.endOf('month');

  let tmp = d.clone();
  tmp.add(1, 'second');
  t.equal(d.isSame(tmp, 'day'), false, '1-millisecond-changes day');

  let end = spacetime('March 31, 1999 23:59:59', 'Africa/Algiers');
  end.millisecond(999);
  t.equal(d.isEqual(end), true, 'day-is-exactly-end');

  t.equal(d.isSame(end, 'day'), true, 'same-day');
  t.equal(d.isSame(end, 'month'), true, 'same-month');
  t.equal(d.isSame(end, 'year'), true, 'same-year');
  t.equal(d.date(), 31, 'last day');
  t.equal(d.hour(), 23, 'last hour');
  t.equal(d.minute(), 59, 'last minute');
  t.equal(d.second(), 59, 'last second');

  t.end();
});

test('start-end are idempodent', t => {
  let units = ['day', 'week', 'month', 'quarter', 'season', 'year'];
  units.forEach(unit => {
    let s = spacetime('December 31, 1999 23:59:58', 'Africa/Algiers');
    let a = s.clone().endOf(unit);
    let b = a.clone().endOf(unit);
    let c = b.clone().endOf(unit);
    let d = c.clone().endOf(unit);
    t.equal(a.isEqual(d), true, unit + '-is-idempodent');
  });
  t.end();
});
