'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('inputs', t => {
  let a = spacetime([2015, 2, 25]);
  let b = spacetime('25 Mar 2015');
  let c = spacetime('Mar 25 2015');
  let d = spacetime('03/25/2015');
  let e = spacetime('2015/03/25');
  let f = spacetime('2015-03-25');
  t.ok(a.isValid(), 'date is valid');
  t.ok(a.isSame(b, 'hour'), 'b-is-equal');
  t.ok(a.isSame(c, 'hour'), 'c-is-equal');
  t.ok(a.isSame(d, 'hour'), 'd-is-equal');
  t.ok(a.isSame(e, 'hour'), 'e-is-equal');
  t.ok(a.isSame(f, 'hour'), 'f-is-equal');
  t.end();
});

test('hour-inputs', t => {
  let s = spacetime('March 21, 2017 20:42:00');
  t.equal(s.date(), 21, 'before-dst.date()');
  t.ok(s.isValid(), 'hour input is valid');

  s = spacetime('March 11, 2017 20:42:00');
  t.equal(s.date(), 11, 'after-dst.date()');
  t.end();
});

test('null input', t => {
  let a = spacetime(null, 'Canada/Eastern');
  let b = spacetime(Date.now(), 'Canada/Eastern');
  t.ok(a.isValid(), 'null input is valid');
  a = a.format();
  b = b.format();
  t.equal(a.iso.short, b.iso.short, 'dates are the same');
  t.equal(a.time.h12, b.time.h12, 'times are the same');
  t.end();
});

test('arr-input', t => {
  let s = spacetime([2020, 2, 28]);
  t.ok(s.isValid(), 'array input is valid');
  t.equal(s.year(), 2020, 'arr-year');
  t.equal(s.date(), 28, 'arr-date');
  t.equal(s.monthName(), 'march', 'arr-month');

  s.set([2017, 1, 2]);
  t.equal(s.year(), 2017, 'set-arr-year');
  t.equal(s.date(), 2, 'set-arr-date');
  t.equal(s.month(), 1, 'set-arr-month');
  t.end();
});

test('obj-input', t => {
  let s = spacetime({
    year: 2020,
    month: 'march',
    date: 28,
  });
  t.ok(s.isValid(), 'obj input is valid');
  t.equal(s.date(), 28, 'obj-date');
  t.equal(s.year(), 2020, 'obj-year');
  t.equal(s.monthName(), 'march', 'obj-month');
  t.end();
});

test('date-input', t => {
  let d = new Date('March 11, 2017');
  let s = spacetime(d);
  t.ok(s.isValid(), 'date object input is valid');
  // t.equal(s.date(), 11, 'date-date');//FIXME:!
  t.equal(s.year(), 2017, 'date-year');
  t.equal(s.monthName(), 'march', 'date-month');
  t.end();
});

test('self-input', t => {
  let a = spacetime('March 11, 2017');
  let s = spacetime(a);
  t.ok(s.isValid(), 'spacetime object input is valid');
  t.equal(s.date(), 11, 'self-date');
  t.equal(s.year(), 2017, 'self-year');
  t.equal(s.monthName(), 'march', 'self-month');
  t.end();
});

test('inputs-in-comparisons', t => {
  let s = spacetime('March 11, 2017');
  t.ok(s.isAfter(new Date('March 10, 2017')), 'compare with date obj');
  // t.ok(s.isBefore([2022, 3, 2]), 'compare with array'); //this isn't working yet
  let future = spacetime([2022, 3, 2]);
  t.ok(s.isBefore(future.epoch), 'compare with epoch');
  t.ok(s.isBefore(future), 'compare with spacetimeObj');
  t.end();
});

test('iso-string-input', t => {
  let s = spacetime('2017-08-06T09:00:00.000Z');
  t.ok(s.isValid(), 'obj input is valid');
  t.equal(s.millisecond(), 0, 'iso-string-millisecond');
  t.equal(s.second(), 0, 'iso-string-second');
  t.equal(s.minute(), 0, 'iso-string-minute');
  t.equal(s.hour(), 9, 'iso-string-hour');
  t.equal(s.date(), 6, 'iso-string-date');
  t.equal(s.month(), 7, 'iso-string-month');
  t.equal(s.year(), 2017, 'iso-string-year');
  t.end();
});

test('funny-numeric-forms', t => {
  let a = spacetime('2016/03/13')

  let b = spacetime('03/13/2016')
  t.equal(a.format('numeric'), b.format('numeric'), 'mm/dd/yyyy')

  b = spacetime('2016/13/03')
  t.equal(a.format('numeric'), b.format('numeric'), 'yyyy/dd/mm')

  b = spacetime('13/03/2016')
  t.equal(a.format('numeric'), b.format('numeric'), 'dd/mm/yyyy')
  t.end();
});


test('invalid inputs', t => {
  t.equal(spacetime('2012-07-32').isValid(), false, 'day 32');
  t.equal(spacetime('2012-07-22').isValid(), true, 'day 22');

  t.equal(spacetime('2018-02-31').isValid(), false, 'february-days #1');
  t.equal(spacetime('2018-02-30').isValid(), false, 'february-days #2');
  t.equal(spacetime('2018-02-29').isValid(), false, 'non-leap year 2018');
  t.equal(spacetime('2017-02-29').isValid(), false, 'non-leap year 2017');
  t.equal(spacetime('2016-02-29').isValid(), true, 'leap year 2016');
  t.equal(spacetime('2015-02-29').isValid(), false, 'non-leap year 2015');
  t.equal(spacetime('2014-02-29').isValid(), false, 'non-leap year 2014');

  t.equal(spacetime('2018/02/30').isValid(), false, 'february-days format #2');
  t.equal(spacetime('2017-04-32T08:00:00-0700').isValid(), false, 'iso format #1');
  t.equal(spacetime('2017-02-29T08:00:00-0700').isValid(), false, 'iso format #2');
  t.equal(spacetime('2016-02-29T08:00:00-0700').isValid(), true, 'iso format #3');

  t.equal(spacetime('02/28/2015').isValid(), true, 'british format #1');
  t.equal(spacetime('02/29/2015').isValid(), false, 'british format #2');
  t.equal(spacetime('02/29/2016').isValid(), true, 'british format #3');

  t.equal(spacetime('Feb 29 2001').isValid(), false, 'long format #1');
  t.equal(spacetime('Feb 29 2000').isValid(), true, 'long format #2');
  t.equal(spacetime('Feb 29 2003').isValid(), false, 'long format #3');

  t.equal(spacetime('29th Feb 2001').isValid(), false, 'long format #4');
  t.equal(spacetime('29th Feb 2000').isValid(), true, 'long format #5');
  t.equal(spacetime('29th February 2003').isValid(), false, 'long format #6');

  var s = spacetime('-2 February 2003', 'UTC', {
    silent: true
  })
  t.equal(s.isValid(), false, 'negative numbers invalid too');
  t.end();
});


test('inplicit-years', t => {
  var year = new Date().getFullYear()
  t.equal(spacetime('April 3rd').format('numeric'), spacetime('April 3rd ' + year).format('numeric'))
  t.equal(spacetime('3rd June').format('numeric'), spacetime('3rd June ' + year).format('numeric'))
  t.equal(spacetime('03/28').format('numeric'), spacetime('03/28/' + year).format('numeric'))
  t.end();
});
