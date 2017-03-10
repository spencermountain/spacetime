// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
const dayTimes = require('./dayTimes');
const ms = require('../../lib/ms');

module.exports = {

  milliseconds: (s, n) => {
    let current = s.millisecond();
    let diff = current - n; //milliseconds to shift by
    return s.epoch - diff;
  },

  seconds: (s, n) => {
    let current = s.second();
    let diff = current - n;
    //milliseconds to shift by
    let shift = diff * ms.second;
    return s.epoch - shift;
  },
  minutes: (s, n) => {
    let current = s.minute();
    let diff = current - n;
    //milliseconds to shift by
    let shift = diff * ms.minute;
    return s.epoch - shift;
  },

  hours: (s, n) => {
    let current = s.hour();
    let diff = current - n;
    //milliseconds to shift by
    let shift = diff * ms.hour;
    return s.epoch - shift;
  },

  date: (s, want) => {
    let diff = want - s.date();
    let epoch = s.epoch;
    return epoch + (diff * ms.day);
  },

  dayOfYear: (s, want) => {
    let diff = want - s.dayOfYear();
    let epoch = s.epoch;
    return epoch + (diff * ms.day);
  },

  timeOfDay: (s, str) => {
    if (dayTimes[str] !== undefined) {
      s.hour(dayTimes[str]);
      s.minute(0);
      s.second(0);
      return s.epoch;
    }
    return null;
  }

};
