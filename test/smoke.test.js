'use strict';
const test = require('tape');
const spacetime = require('./lib');

test('random november time', t => {
  let epoch = 1510799750000 //november 15th 9:35pm 2017 EST
  // https://www.epochconverter.com/timezones?q=1510799750000
  const arr = [
    ['Asia/Kolkata', 'Thu 8:05am'],
    ['Europe/Madrid', 'Thu 3:35am'],
    ['Asia/Seoul', 'Thu 11:35am'],
    ['Europe/Berlin', 'Thu 3:35am'],
    ['America/Managua', 'Wed 8:35pm'],
    ['Asia/Shanghai', 'Thu 10:35am'],
    ['Pacific/Auckland', 'Thu 3:35pm'],
    ['America/Guatemala', 'Wed 8:35pm'],
    ['Asia/Manila', 'Thu 10:35am'],
    ['Asia/Singapore', 'Thu 10:35am'],
    ['Asia/Baghdad', 'Thu 5:35am'],
    ['Australia/Melbourne', 'Thu 1:35pm'],
    ['Asia/Karachi', 'Thu 7:35am'],
    ['America/Toronto', 'Wed 9:35pm'],
    ['America/New_York', 'Wed 9:35pm'],
    ['Africa/Cairo', 'Thu 4:35am'],
    ['Asia/Kathmandu', 'Thu 8:20am'],
    ['Europe/Paris', 'Thu 3:35am'],
    ['America/Winnipeg', 'Wed 8:35pm'],
    ['America/Edmonton', 'Wed 7:35pm'],
    ['Africa/Khartoum', 'Thu 5:35am']
  ]
  arr.forEach((a) => {
    let s = spacetime(epoch, a[0])
    let have = `${s.format('day-short')} ${s.time()}`
    t.equal(a[1], have, a[0])
  })
  t.end();
});


// copied from https://www.epochconverter.com/timezones?q=1520999750000
// test('random march time', t => {
//   let epoch = 1520999750000 //March 13, 2018 11:55pm
//   const arr = [
//     ['Africa/Abidjan', 'Mar 14 2018 03:55:50'],
//     ['Africa/Banjul', 'Mar 14 2018 03:55:50'],
//     ['Africa/Johannesburg', 'Mar 14 2018 05:55:50'],
//     ['America/Belem', 'Mar 14 2018 00:55:50'],
//     ['America/Caracas', 'Mar 13 2018 23:55:50'],
//     ['America/Grenada', 'Mar 13 2018 23:55:50'],
//     ['America/Resolute', 'Mar 13 2018 22:55:50'],
//     ['Asia/Gaza', 'Mar 14 2018 05:55:50'],
//     ['Europe/Minsk', 'Mar 14 2018 06:55:50'],
//     ['Europe/Rome', 'Mar 14 2018 04:55:50'],
//     ['Europe/Zagreb', 'Mar 14 2018 04:55:50'],
//     ['Indian/Mahe', 'Mar 14 2018 07:55:50'],
//     ['Pacific/Easter', 'Mar 13 2018 22:55:50'],
//     ['Pacific/Efate', 'Mar 14 2018 14:55:50'],
//     ['Pacific/Guam', 'Mar 14 2018 13:55:50'],
//     ['Pacific/Pohnpei', 'Mar 14 2018 14:55:50'],
//   ]
//   arr.forEach((a) => {
//     let s = spacetime(epoch, a[0])
//     let hour = s.hour()
//     if (hour <= 9) {
//       hour = '0' + hour
//     }
//     let have = `${s.format('month-short')} ${s.date()} ${s.year()} ${hour}:${s.minute()}:${s.seconds()}`
//     t.equal(a[1], have, a[0])
//   })
//   t.end();
// });
