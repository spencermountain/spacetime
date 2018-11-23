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



test('smoke-test all mutable methods', t => {
  let arr = [
    ['add', 3, 'days'],
    ['ampm', 'am'],
    ['date', 12],
    ['day', 'thursday'],
    ['dayName', 'monday'],
    ['dayOfYear', 23],
    ['dayTime', 'evening'],
    ['era', 'bc'],
    ['hour', 4],
    ['hour12', '9am'],
    ['hourFloat', 2],
    ['millisecond', 234],
    ['minute', 3],
    ['month', 1],
    ['monthName', 'july'],
    ['quarter', 2],
    ['season', 'summer'],
    ['second', 23],
    ['subtract', 12, 'hours'],
    ['time', '4:24pm'],
    ['week', 4],
    ['year', 1982],
  // ['from',],
  // ['fromNow',],
  // ['i18n',],
  ]
  const epoch = 1552114800001
  arr.forEach((a) => {
    let mut = OrigSpace(epoch, 'Canada/Pacific')
    let immut = spacetime(1552114800001, 'Canada/Pacific')
    let fn = a[0]
    let one = mut[fn](a[1], a[2])
    let two = immut[fn](a[1], a[2])
    t.ok(one.isSame(two, 'hour'), fn + ' - equal')
    //make-sure original didn't change
    t.equal(immut.epoch, epoch, fn + ' - immutable didnt change')
    t.notEqual(immut.epoch, two.epoch, fn + ' - immutable result changed')
    t.notEqual(mut.epoch, epoch, fn + ' - mutable changed')
  })
  t.end()
});

test('boolean methods identical', t => {
  let r = spacetime(1552124200401)
  let r2 = spacetime(1552145200401)
  let arr = [
    ['isSame', r, 'day'],
    ['isAfter', r, 'day'],
    ['isBefore', r, 'day'],
    ['isEqual', r, 'day'],
    ['isBetween', r, r2],
  ]
  arr.forEach((a) => {
    let mut = OrigSpace(1552114800001)
    let immut = spacetime(1552114800001)
    let fn = a[0]
    let one = mut[fn](a[1], a[2])
    let two = immut[fn](a[1], a[2])
    t.equal(one, two, fn + ' equal')
  })
  t.end()
})
