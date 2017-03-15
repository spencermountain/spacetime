// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
const dayTimes = require('./dayTimes');
const ms = require('../../lib/milliseconds');

module.exports = {

  milliseconds: (s, n) => {
    let current = s.millisecond();
    let diff = current - n; //milliseconds to shift by
    return s.epoch - diff;
  },

  seconds: (s, n) => {
    let diff = s.second() - n;
    let shift = diff * ms.second;
    return s.epoch - shift;
  },
  minutes: (s, n) => {
    let diff = s.minute() - n;
    let shift = diff * ms.minute;
    return s.epoch - shift;
  },

  hours: (s, n) => {
    let diff = s.hour() - n;
    let shift = diff * ms.hour;
    return s.epoch - shift;
  },

  date: (s, n) => {
    let diff = n - s.date();
    let shift = diff * ms.day;
    //test for a dst/leap change
    s.epoch += shift;
    let tmp = s.d;
    if (tmp.getDate() === n) {
      return s.epoch;
    }
    if (tmp.getDate() > n) {
      // console.warn('applying dst-unshift');
      return s.epoch - ms.hour;
    }
    // console.warn('applying dst-shift');
    return s.epoch + ms.hour;
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
