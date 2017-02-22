'use strict';
const color = require('./colors');

//
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

// right padding s with c to a total of n chars
function padRight(s, n) {
  const c = '.';
  if (!s || !c || s.length >= n) {
    return s;
  }
  const max = (n - s.length) / c.length;
  for (var i = 0; i < max; i++) {
    s += '.';
  }
  return s;
}

const fmt = (d) => {
  //hours
  let hour = d.getHours();
  let am = 'am ';
  let emoji = color.yellow('🌤️');
  if (hour > 12) {
    hour -= 12;
    am = 'pm ';
    emoji = color.cyan('🌜');
  }
  //minutes
  let minutes = d.getMinutes();
  if (('' + minutes).length === 1) {
    minutes = '0' + minutes;
  }
  const str = ' ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + emoji + '  ' + hour + ':' + minutes + am;
  return str;
};

const debug = (space) => {
  console.log('\n');
  let city = space.tz.replace(/.*\//, '');

  let here = space.here();
  console.log(padRight(' here: ', 15) + fmt(here));

  let there = space.there();
  console.log(padRight(' ' + city + ': ', 15) + fmt(there));
  console.log('\n');
};
module.exports = debug;
