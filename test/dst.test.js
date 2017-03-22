'use strict';
const test = require('tape');
const spacetime = require('../src');

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
const allMonths = function(s) {
  return months.map((m) => {
    s.month(m);
    let meta = s.timezone();
    return meta.current.isDst;
  });
};

test('dst-by-date', (t) => {
  let s = spacetime('March 11, 2017 20:42:00', 'Canada/Eastern');
  let dst = s.timezone().current.isDst;
  t.equal(dst, false, 'march-11 not dst');

  s = spacetime('March 12, 2017 20:42:00', 'Canada/Eastern');
  dst = s.timezone().current.isDst;
  t.equal(dst, true, 'march-12 is dst');
  t.end();
});

test('dst-by-month', (t) => {
  ////        jan   feb    mar    apr   may   jun   july   aug   sept  oct   nov   dec
  let est = [false, false, false, true, true, true, true, true, true, true, true, false];
  let pst = [false, false, false, true, true, true, true, true, true, true, true, false];
  let aus = [true, true, true, false, false, false, false, false, false, true, true, true]; //april 2, oct 1
  let tai = [false, false, false, false, false, false, false, false, false, false, false, false]; //no dst
  let s = spacetime('January 1, 2016 20:42:00', 'Canada/Eastern');
  t.deepEqual(allMonths(s), est, 'est');

  s = spacetime('January 1, 2016 20:42:00', 'Canada/Pacific');
  t.deepEqual(allMonths(s), pst, 'pst');

  s = spacetime('January 2, 2016 20:42:00', 'Australia/Canberra');
  t.deepEqual(allMonths(s), aus, 'Australia/Canberra');

  s = spacetime('January 2, 2016 20:42:00', 'Asia/Taipei');
  t.deepEqual(allMonths(s), tai, 'Taipei');
  t.end();
});

test('sneaky-dst', (t) => {
  let s = spacetime('March 28, 1999 20:42:00', 'Canada/Eastern');
  s.hour(0);
  //move date over a dst change
  s.date(2);
  t.equal(s.date(), 2, 'sneaky-apply-dst');
  t.end();
});
