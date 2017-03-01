// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
const dayTimes = require('./dayTimes');
const second = 1000;
const minute = 60 * second;
const hour = minute * 60;
const day = hour * 24;

module.exports = {

  seconds: (s, n) => {
    let current = s.second();
    let diff = current - n;
    //milliseconds to shift by
    let shift = diff * second;
    return s.epoch - shift;
  },
  minutes: (s, n) => {
    let current = s.minute();
    let diff = current - n;
    //milliseconds to shift by
    let shift = diff * minute;
    return s.epoch - shift;
  },

  hours: (s, n) => {
    let current = s.hour();
    let diff = current - n;
    //milliseconds to shift by
    let shift = diff * hour;
    return s.epoch - shift;
  },

  date: (s, want) => {
    let diff = want - s.date();
    let epoch = s.epoch;
    return epoch + (diff * day);
  },

  dayOfYear: (s, want) => {
    let diff = want - s.dayOfYear();
    let epoch = s.epoch;
    return epoch + (diff * day);
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
