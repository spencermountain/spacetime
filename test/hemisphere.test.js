'use strict';
const test = require('tape');
const spacetime = require('../src');

let june = 1401660600207 //june 1, 6:10pm
let jan = 1515368004641 //january 7th, 6:30pm

test('toronto/Santiago same in june', t => {
  var a = spacetime(june, 'America/Toronto')
  t.equal(-4, a.timezone().current.offset, 'toronto -4')
  t.equal(true, a.timezone().current.isDst, 'toronto in dst')
  t.equal('North', a.hemisphere(), 'toronto in north')

  var b = spacetime(june, 'America/Santiago')
  t.equal(-4, b.timezone().current.offset, 'santiago -4')
  t.equal(false, b.timezone().current.isDst, 'santiago not dst')
  t.equal('South', b.hemisphere(), 'santiago in south')

  t.ok(a.format('nice'), b.format('nice'), 'same-calendar-time')
  t.end();
});

test('toronto/Santiago -2hrs in january', t => {
  var a = spacetime(jan, 'America/Toronto')
  t.equal(-5, a.timezone().current.offset, 'toronto -5')
  t.equal(false, a.timezone().current.isDst, 'toronto not dst')
  t.equal('North', a.hemisphere(), 'toronto in north')

  var b = spacetime(jan, 'America/Santiago')
  t.equal(-3, b.timezone().current.offset, 'santiago -3')
  t.equal(true, b.timezone().current.isDst, 'santiago is dst')
  t.equal('South', b.hemisphere(), 'santiago in south')
  t.notEqual(a.format('nice'), b.format('nice'), 'not same-calendar-time')
  t.end();
});
