'use strict';
//
const toHour = function(s, h) {
  s.hour(h);
  s.minute(0);
  s.second(0);
  s.millisecond(0);
  return s;
};
const startOf = (s, unit) => {
  let original = s.clone();
  if (unit === 'day') {
    s = toHour(s, 0);
  }
  if (unit === 'week') {
    s = toHour(s, 0);
    s.day(0);
    if (s.isAfter(original)) {
      s.add(1, 'week');
    }
  }
  return s;
};
module.exports = startOf;
