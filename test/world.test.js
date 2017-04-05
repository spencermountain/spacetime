'use strict';
const test = require('tape');
const spacetime = require('../src');

let timezones = [
  'Africa/Accra',
  'Europe/Jersey',
  'Asia/Ujung_Pandang',
  'Africa/Kinshasa',
  'Africa/Asmera',
  'Africa/Brazzaville',
  'Africa/Casablanca',
  'Asia/Ulaanbaatar',
  'Atlantic/Faroe',
  'Australia/Eucla',
  'Australia/Hobart',
  'Australia/Melbourne',
  'Brazil/West',
  'Canada/Atlantic',
  'Canada/Central',
  'Etc/GMT-7',
  'Etc/GMT-4',
  'Etc/Greenwich',
  'Europe/Amsterdam',
  'Europe/Bucharest',
  'Europe/Brussels',
  'Europe/Kaliningrad',
  'Europe/Sofia',
  'Indian/Comoro',
  'Indian/Reunion',
  'Pacific/Fiji',
  'Pacific/Nauru',
  'Pacific/Tongatapu',
  'Pacific/Yap',
];

test('is-always-input-date', (t) => {
  timezones.forEach((tz) => {
    let a = spacetime([2030, 3, 2], tz);
    t.equal(a.monthName(), 'april', tz + ' is april');
    t.equal(a.date(), 2, tz + ' 2nd');
    t.equal(a.year(), 2030, tz + ' is 2030');

    let b = spacetime(new Date(), tz);
    t.equal(b.timezone().name, tz, tz + ' is right tz');

    let c = spacetime('03/01/2015', tz);
    t.equal(c.monthName(), 'march', tz + ' is march');
    t.equal(c.date(), 1, tz + ' 1st');
    t.equal(c.year(), 2015, tz + ' is 2015');

    let d = spacetime('January 7 2018', tz);
    t.equal(d.monthName(), 'january', tz + ' is january');
    t.equal(d.date(), 7, tz + ' 7th');
    t.equal(d.year(), 2018, tz + ' is 2018');
  });

  t.end();
});
