// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
const dayOfYear = require('./dayOfYear');
const minute = 60 * 1000;
const hour = minute * 60;
const day = hour * 60;

module.exports = {

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

  date: (s, n) => {
    let diff = s.date() - s.here().getDate();
    let tmp = s.d;
    // tmp.setDate(n - diff);
    console.log(diff);
    return tmp.getTime();
  },

  dayOfYear: (s, n) => {
    return s.epoch;
  }

};
