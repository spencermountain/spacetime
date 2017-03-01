'use strict';
const months = require('./months').short;

const day = (d) => {
  return months[d.getMonth()] + ' ' + d.getDate();
};

const time = (d) => {
  //hours
  let hour = d.getHours();
  let am = 'am ';
  if (hour > 12) {
    hour -= 12;
    am = 'pm ';
  } else if (hour === 0) {
    hour = 12;
  }
  hour = '' + hour;
  if (hour.length === 1) {
    hour = ' ' + hour;
  }
  //minutes
  let minutes = d.getMinutes();
  if (('' + minutes).length === 1) {
    minutes = '0' + minutes;
  }
  const str = hour + ':' + minutes + am;
  return str;
};

const daytime = (d) => {
  return '  ' + day(d) + '  ' + time(d);
};

module.exports = {
  day: day,
  time: time,
  daytime: daytime,
};
