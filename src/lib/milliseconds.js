'use strict';
const second = 1000;
const minute = 60 * second;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
//
module.exports = {
  millisecond: 1,
  milliseconds: 1,

  second: second,
  seconds: second,

  minute: minute,
  minutes: minute,

  hour: hour,
  hours: hour,

  day: day,
  days: day,

  week: week,
  weeks: week,
};
