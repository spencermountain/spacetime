/* eslint no-unused-vars: "off" */
'use strict';
const test = require('tape');
const spacetime = require('../src/immutable');
const OrigSpace = require('./lib'); //mutable version
const day0 = spacetime.now();
const today = day0.format('nice');

test('clone still works', t => {
  var day1 = day0.clone()
  t.ok(day0.format('nice') === day1.format('nice'), 'eq')
  t.ok(day0.format('nice') === day1.format('nice'), 'eq')
  //log this, if it ever happends. i saw it once.
  if (day0.format('nice') !== day1.format('nice')) {
    console.log(day0.format('nice'), day1.format('nice'))
  }
  t.end()
})

test('.add does not mutate', t => {
  t.plan(1);
  let tmrw = day0.add(1, 'day').format('nice');
  t.ok(today === day0.format('nice'), 'not mutated');
});

test('.subtract does not mutate', t => {
  t.plan(1);
  let tmrw = day0.subtract(1, 'day').format('nice');
  t.ok(today === day0.format('nice'), 'not mutated');
});

test('.hour does not mutate', t => {
  t.plan(1);
  let tmrw = day0.hour(1).format('nice');
  t.ok(today === day0.format('nice'), 'not mutated');
});

test('.date does not mutate', t => {
  t.plan(1);
  let tmrw = day0.date(1).month(1).year(2018).format('nice');
  t.ok(today === day0.format('nice'), 'not mutated');
});

test('.day does not mutate', t => {
  t.plan(1);
  let tmrw = day0.day(22).format('nice');
  t.ok(today === day0.format('nice'), 'not mutated');
});

test('.month does not mutate', t => {
  t.plan(1);
  let tmrw = day0.month(7).format('nice');
  t.ok(today === day0.format('nice'), 'not mutated');
});

test('.quarter does not mutate', t => {
  t.plan(1);
  let tmrw = day0.quarter(4).format('nice');
  t.ok(today === day0.format('nice'), 'not mutated');
});

test('.goto does not mutate', t => {
  t.plan(1);
  let tmrw = day0.goto('Australia/Brisbane').format('nice');
  t.ok(today === day0.format('nice'), 'not mutated');
});
test('time setting works', t => {
  t.equal(spacetime.now().time('6:00pm').time(), '6:00pm', 'input=output')
  t.end()
});

test('time setting works', t => {
  let r = spacetime(1552124200401)
  let r2 = spacetime(1552145200401)
  let arr = [
    ['time', '4:24pm'],
    ['week', 4],
    ['quarter', 2],
    ['hourFloat', 2],
    ['season', 'summer'],
    ['millisecond', 234],
    ['second', 23],
    ['minute', 3],
    ['hour', 4],
    ['hour12', 6],
    ['date', 12],
    ['month', 2],
    ['year', 1982],
    ['dayTime', 'evening'],
    ['dayOfYear', 23],
    ['era', 'ad'],
    ['day', 'thursday'],
    ['ampm', 'pm'],
    ['dayName', 'monday'],
    ['monthName', 'july'],
    ['add', 3, 'days'],
    ['subtract', 12, 'hours'],
    ['isSame', r, 'day'],
    ['isAfter', r, 'day'],
    ['isBefore', r, 'day'],
    ['isEqual', r, 'day'],
    ['isBetween', r, r2],
  // ['from',],
  // ['fromNow',],
  // ['i18n',],
  ]
  const basicallyEqual = function(a, b) {
    if (typeof a === 'boolean' || typeof a === 'number') {
      return a === b
    }
    if (a.isSame(b, 'hour') === true) {
      return true
    }
    // console.log(a.format('nice'), b.format('nice'))
    return false
  }
  arr.forEach((a) => {
    let mut = OrigSpace(1552114800001)
    let immut = spacetime(1552114800001)
    let fn = a[0]
    let one = mut[fn](a[1], a[2])
    let two = immut[fn](a[1], a[2])
    t.ok(basicallyEqual(one, two), fn + ' equal')
  })
  t.end()
});
