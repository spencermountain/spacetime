'use strict'
let test = require('tape')
let spacetime = require('./lib')

test('display-test-direct', t => {
  let s = spacetime('Dec 4', 'new york')
  t.equal(s.timezone().display, 'EST', 'standard time - north')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'EDT', 'daylight time')

  s = spacetime('Dec 4', 'easter island')
  t.equal(s.timezone().display, 'EASST', "'summer' time")
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'EAST', 'standard time - south')

  s = spacetime('Dec 4', 'lima')
  t.equal(s.timezone().display, 'PET', 'standard time - lima')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'PET', 'summer time - paris')

  s = spacetime('Dec 4', 'bermuda')
  t.equal(s.timezone().display, 'AST', 'north AST')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'ADT', 'north ADT')

  s = spacetime('Dec 4', 'america/manaus')
  t.equal(s.timezone().display, 'AMT', 'south AMT')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'AMT', 'north AMT')
  t.end()
})

test('display-indirect', t => {
  let s = spacetime('Dec 4', 'toronto')
  t.equal(s.timezone().display, 'EST', 'standard time - toronto')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'EDT', 'daylight time - toronto')

  s = spacetime('Dec 4', 'vancouver')
  t.equal(s.timezone().display, 'PST', 'standard time - vancouver')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'PDT', 'daylight time - vancouver')

  s = spacetime('Dec 4', 'europe/paris')
  t.equal(s.timezone().display, 'CET', 'standard time - paris')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'CEST', 'summer time - paris')

  s = spacetime('Dec 4', 'dakar')
  t.equal(s.timezone().display, 'GMT', 'standard time - dakar')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'GMT', 'still standard time - dakar')

  //try this false-positive
  // s = spacetime('Dec 4', 'Punta Arenas')
  // t.equal(s.timezone().display, 'CLST', 'standard time - chile');
  // s = s.add(6, 'months')
  // t.equal(s.timezone().display, 'CLST', 'still standard - chile');

  t.end()
})

test('hemisphere-africa-europe', t => {
  let s = spacetime('Dec 4', 'prague')
  t.equal(s.timezone().display, 'CET', 'dec - north')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'CEST', 'jul - north')

  s = spacetime('Dec 4', 'kinshasa')
  t.equal(s.timezone().display, 'WAT', 'dec - south')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'WAT', 'jul - south')
  t.end()
})

test('hemisphere-china', t => {
  let s = spacetime('Dec 4', 'chongqing')
  t.equal(s.timezone().display, 'CT', 'dec - north')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'CT', 'jul - north')

  s = spacetime('Dec 4', 'makassar')
  t.equal(s.timezone().display, 'WITA', 'dec - south')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'WITA', 'jul - south')
  t.end()
})

test('weird-australia', t => {
  let s = spacetime('Dec 4', 'acst')
  t.equal(s.timezone().display, 'ACDT', 'acst acst in dec')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'ACST', 'acst now acdt in july')

  s = spacetime('Dec 4', 'Adelaide')
  t.equal(s.timezone().display, 'ACDT', 'Adelaide acst in dec')
  s = s.add(6, 'months')
  t.equal(s.timezone().display, 'ACST', 'Adelaide now acdt in july')

  // s = spacetime('Dec 4', 'darwin')
  // t.equal(s.timezone().display, 'ACST', 'darwin acst in dec');
  // s = s.add(6, 'months')
  // t.equal(s.timezone().display, 'ACST', 'still acst in july');

  t.end()
})
