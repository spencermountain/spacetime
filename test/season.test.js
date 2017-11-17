'use strict';
const test = require('tape');
const spacetime = require('./lib');

let south = [
  'Africa/Johannesburg',
  'Brazil/Acre',
  'Australia/Canberra',
  'Asia/Jakarta',
  'America/Argentina',
  'Africa/Lusaka'
];
let north = ['America/Detroit', 'Mexico/BajaSur', 'Canada/Eastern', 'Europe/Oslo', 'Asia/Baghdad', 'Asia/Istanbul'];

test('season-by-hemisphere', t => {
  //june
  let s = spacetime('june 6 2017', 'Canada/Eastern');
  south.forEach(tz => {
    s.goto(tz);
    t.equal(s.season(), 'winter', tz + ' june-winter');
  });
  north.forEach(tz => {
    s.goto(tz);
    t.equal(s.season(), 'summer', tz + ' june-summer');
  });
  t.end();
});
