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

test('argentina has no dst - always 3', t => {
  //so both are -3 in the january
  var jan1 = spacetime('January 21, 2017 20:42:00', 'America/Santiago')
  var jan2 = jan1.clone().goto('America/Cordoba')
  t.equal(jan1.epoch, jan2.epoch, 'same-time')
  //but then, in may, santiago is -4 and argentina is still -3
  var jul1 = spacetime('May 21, 2017 20:42:00', 'America/Santiago')
  var jul2 = jul1.clone().goto('America/Cordoba')
  t.equal(20, jul1.hour(), 'not-same-time')
  t.equal(21, jul2.hour(), 'not-same-time')
  t.end();
});
