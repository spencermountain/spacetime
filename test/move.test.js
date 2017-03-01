'use strict';
const test = require('tape');
const spacetime = require('../src');

test('add', (t) => {
  let s = spacetime('January 1, 2017 1:20:05', 'Canada/Eastern');
  //initial state
  t.equal(s.date(), 1, '.date()');
  t.equal(s.month(), 'january', '.month()');
  t.equal(s.year(), 2017, '.year()');
  t.equal(s.hour(), 1, '.hour()');
  t.equal(s.minute(), 20, '.minute()');
  t.equal(s.day(), 'sunday', '.day()');

  s.add(1, 'month');
  t.equal(s.date(), 1, '.date()');
  t.equal(s.month(), 'february', '.month()');
  t.equal(s.year(), 2017, '.year()');

  s.add(2, 'days');
  t.equal(s.date(), 3, '.date()');
  t.equal(s.month(), 'february', '.month()');
  t.equal(s.year(), 2017, '.year()');
  t.equal(s.day(), 'friday', '.day()');

  s.add(1, 'week');
  t.equal(s.date(), 10, '.date()');
  t.equal(s.month(), 'february', '.month()');
  t.equal(s.year(), 2017, '.year()');
  t.equal(s.day(), 'friday', '.day()');

  s.add(1, 'year');
  t.equal(s.date(), 10, '.date()');
  t.equal(s.month(), 'february', '.month()');
  t.equal(s.year(), 2018, '.year()');

  s = spacetime('January 1, 2017 1:20:05', 'Canada/Eastern');
  s.add(1, 'quarter');
  t.equal(s.date(), 1, '.date()');
  t.equal(s.month(), 'april', '.date()');

  s.add(2, 'years');
  t.equal(s.date(), 1, '.date()');
  t.equal(s.month(), 'april', '.month()');
  t.equal(s.year(), 2019, '.years()');
  t.end();
});

test('subtract', (t) => {
  let s = spacetime('January 1, 2016 1:20:05', 'Canada/Eastern');
  //initial state
  t.equal(s.date(), 1, '.date()');
  t.equal(s.month(), 'january', '.month()');
  t.equal(s.year(), 2016, '.year()');
  t.equal(s.hour(), 1, '.hour()');
  t.equal(s.minute(), 20, '.minute()');

  s.subtract(1, 'month');
  t.equal(s.date(), 1, '.date()');
  t.equal(s.month(), 'december', '.month()');
  t.equal(s.year(), 2015, '.year()');

  s.subtract(2, 'days');
  t.equal(s.date(), 29, '.date()');
  t.equal(s.month(), 'november', '.month()');
  t.equal(s.year(), 2015, '.year()');
  t.equal(s.day(), 'sunday', '.day()');

  s.subtract(1, 'week');
  t.equal(s.date(), 22, '.date()');
  t.equal(s.month(), 'november', '.month()');
  t.equal(s.year(), 2015, '.year()');
  t.equal(s.day(), 'sunday', '.day()');

  s.subtract(1, 'year');
  t.equal(s.date(), 22, '.date()');
  t.equal(s.month(), 'november', '.month()');
  t.equal(s.year(), 2014, '.year()');

  t.end();
});
