const zeroPad = require('../fns').zeroPad

const serialize = d =>
  zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours())

// a timezone will begin with a specific offset in january
// then some will switch to something else between november-march
const shouldChange = (epoch, start, end, defaultOffset) => {
  //note: this has a cray order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  let d = new Date(epoch)
  //(try to mediate this a little?)
  let bias = d.getTimezoneOffset() || 0
  let shift = bias + defaultOffset * 60 //in minutes
  shift = shift * 60 * 1000 //in ms
  d = new Date(epoch + shift)

  let current = serialize(d)
  //eg. is it after ~november?
  if (current >= start) {
    //eg. is it before ~march~ too?
    if (current < end) {
      return true
    }
  }
  return false
}
module.exports = shouldChange
