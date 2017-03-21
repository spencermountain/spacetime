'use strict';

const shortMonth = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sept',
  'oct',
  'nov',
  'dec',
];
const longMonth = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

let obj = {
  'sep': 8
};
for(let i = 0; i < shortMonth.length; i++) {
  obj[shortMonth[i]] = i;
}
for(let i = 0; i < longMonth.length; i++) {
  obj[longMonth[i]] = i;
}

module.exports = {
  short: shortMonth,
  long: longMonth,
  mapping: obj
};
