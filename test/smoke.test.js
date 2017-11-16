'use strict';
const test = require('tape');
const spacetime = require('../src');

test('random november time', t => {
  let epoch = 1510799750000 //eastern-time november 15th 9:35pm 2017
  const arr = [
    ['Asia/Kolkata', 'Thu 8:05am'],
    ['Europe/Madrid', 'Thu 3:35am'],
    ['Asia/Seoul', 'Thu 11:35am'],
    // ['America/Atlanta', 'Wed 9:35pm'],
    ['Europe/Berlin', 'Thu 3:35am'],
    ['America/Managua', 'Wed 8:35pm'],
    ['Asia/Shanghai', 'Thu 10:35am'],
    ['Pacific/Auckland', 'Thu 3:35pm'],
    ['America/Guatemala', 'Wed 8:35pm'],
    ['Asia/Manila', 'Thu 10:35am'],
    ['Asia/Singapore', 'Thu 10:35am'],
    ['Asia/Baghdad', 'Thu 5:35am'],
    ['Canada/Eastern', 'Wed 10:35pm'],
    ['Australia/Melbourne', 'Thu 1:35pm'],
    ['Asia/Karachi', 'Thu 7:35am'],
    ['Canada/Toronto', 'Wed 9:35pm'],
    ['America/New_York', 'Wed 9:35pm'],
    ['Africa/Cairo', 'Thu 4:35am'],
    ['Asia/Kathmandu', 'Thu 8:20am'],
    ['Europe/Paris', 'Thu 3:35am'],
    ['America/Winnipeg', 'Wed 8:35pm'],
    ['America/Edmonton', 'Wed 7:35pm'],
    ['Africa/Khartoum', 'Thu 4:35am']
  ]
  arr.forEach((a) => {
    let s = spacetime(epoch, a[0])
    let have = `${s.format('day-short')} ${s.time()}`
    t.equal(a[1], have, a[0])
  })
  t.end();
});
