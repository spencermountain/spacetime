const set = require('../set/set')
const days = require('../../data/days')
const walkTo = require('../set/walk')

const methods = {
  // # day in the month
  date: function (num, goFwd) {
    if (num !== undefined) {
      let s = this.clone()
      num = parseInt(num, 10)
      if (num) {
        s.epoch = set.date(s, num, goFwd)
      }
      return s
    }
    return this.d.getDate()
  },

  //like 'wednesday' (hard!)
  day: function (input, goFwd) {
    if (input === undefined) {
      return this.d.getDay()
    }
    let original = this.clone()
    let want = input
    // accept 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase()
      if (days.aliases.hasOwnProperty(input)) {
        want = days.aliases[input]
      } else {
        want = days.short().indexOf(input)
        if (want === -1) {
          want = days.long().indexOf(input)
        }
      }
    }
    //move approx
    let day = this.d.getDay()
    let diff = day - want
    if (goFwd === true && diff > 0) {
      diff = diff - 7
    }
    if (goFwd === false && diff < 0) {
      diff = diff + 7
    }
    let s = this.subtract(diff, 'days')
    //tighten it back up
    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    })
    return s
  },

  //these are helpful name-wrappers
  dayName: function (input, goFwd) {
    if (input === undefined) {
      return days.long()[this.day()]
    }
    let s = this.clone()
    s = s.day(input, goFwd)
    return s
  }
}
module.exports = methods
