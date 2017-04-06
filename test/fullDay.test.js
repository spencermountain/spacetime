'use strict';
const test = require('tape');
const spacetime = require('../src');

const right = [
  'Europe/Zurich', //+1
  'Europe/Athens', //+2
  'Europe/Volgograd', //3
  'Indian/Reunion', //4
  'Etc/GMT-5', //5
  'Asia/Dhaka', //6
  'Asia/Phnom_Penh', //7
  'Australia/West', //8
  'Asia/Tokyo', //9
  'Pacific/Saipan', //10
  'Pacific/Kosrae', //11
  'Pacific/Fiji', //12
];
// 'Europe/London', //0
const left = [
  'Atlantic/Cape_Verde', //-1
  'Brazil/DeNoronha', //-2
  'America/Araguaina', //-3
  'America/Campo_Grande', //-4
  'America/Havana', //-5
  'America/Guatemala', //-6
  'America/Dawson_Creek', //-7
  'Pacific/Pitcairn', //-8
  'Etc/GMT+9', //-9
  'America/Adak', //-10
  'Pacific/Pago_Pago', //-11
  'Etc/GMT+12', //-12
];

test('test every hour of a day', (t) => {
  let s = spacetime([2018, 2, 5, 0, 0, 0, 0], 'Europe/London');
  s.startOf('day');
  t.equal(s.time(), '12:00am', 'the first millisecond of the day');
  t.equal(s.timezone().current.offset, 0, 'start at 0 offset');
  //everything to the right is today
  right.forEach((timezone) => {
    let d = s.clone();
    d.goto(timezone);
    t.equal(d.date(), 5, timezone + ' is 5th');
  });
  //everything to the left is yesterday
  left.forEach((timezone) => {
    let d = s.clone();
    d.goto(timezone);
    t.equal(d.date(), 4, timezone + ' is 4th');
  });
  t.end();
});
