const zeroPad = require('../fns').zeroPad;

const toString = function(o) {
  return [zeroPad(o.month), zeroPad(o.date), zeroPad(o.hour)].join('-');
};

// a timezone will begin with a specific offset in january
// then some will switch to something else between november-march
const shouldChange = (s, m) => {
  if (m.hasDst !== true || !m.change.start || !m.change.back) {
    return false
  }
  //note: this has a order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  // let diff = (m.offset * 60) + s.bias
  // let approx = s.epoch + (diff * 60 * 60 * 1000)
  let d = new Date(s.epoch);
  let current = {
    month: d.getMonth(),
    date: d.getDate(),
    hour: d.getHours(),
  };
  current = toString(current);
  //eg. is it after ~november?
  let start = toString(m.change.start);
  // console.log(d.getDate() + ' ' + d.getHours())
  if (current >= start) {
    //eg. is it before ~march~ too?
    let end = toString(m.change.back);
    if (current < end) {
      return true
    }
  }
  return false
}
module.exports = shouldChange
