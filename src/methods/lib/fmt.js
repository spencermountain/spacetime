'use strict';
const color = require('./colors');
const months = require('./months').short;

//


// right padding s with c to a total of n chars
// function padRight(s, n) {
//   const c = '.';
//   if (!s || !c || s.length >= n) {
//     return s;
//   }
//   const max = (n - s.length) / c.length;
//   for (var i = 0; i < max; i++) {
//     s += '.';
//   }
//   return s;
// }

const day = (d) => {
  return months[d.getMonth()] + ' ' + d.getDate();
};

const time = (d) => {
  //hours
  let hour = d.getHours();
  let am = 'am ';
  let emoji = color.yellow('🌤️');
  if (hour > 12) {
    hour -= 12;
    am = 'pm ';
    emoji = color.cyan('🌜');
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
  const str = hour + ':' + minutes + am + ' ' + emoji;
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
