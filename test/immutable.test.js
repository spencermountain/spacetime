/* eslint no-unused-vars: "off" */
'use strict';
const test = require('tape');
const spacetime = require('../src/immutable');
const day0 = spacetime.now();
const today = day0.format('nice');

test('clone still works', t => {
  t.plan(2)
  var day1 = day0.clone()
  t.ok(day0.format('nice') === day1.format('nice'), 'eq')
  t.ok(day0.format('nice') === day1.format('nice'), 'eq')
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
