const set = require('../set/set')
const days = require('../../data/days')
const walkTo = require('../set/walk')

const clearMinutes = s => {
  s = s.minute(0)
  s = s.second(0)
  s = s.millisecond(1)
  return s
}

const methods = {
  // # day in the month
  date: function(num) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = set.date(s, num)
      return s
    }
    return this.d.getDate()
  },

  //like 'wednesday' (hard!)
  day: function(input) {
    if (input === undefined) {
      return this.d.getDay()
    }
    let original = this.clone()
    let want = input
    // accept 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase()
      want = days.short().indexOf(input)
      if (want === -1) {
        want = days.long().indexOf(input)
      }
    }
    //move approx
    let day = this.d.getDay()
    let diff = day - want
    let s = this.subtract(diff * 24, 'hours')
    //tighten it back up
    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    })
    return s
  },

  //these are helpful name-wrappers
  dayName: function(input) {
    if (input === undefined) {
      return days.long()[this.day()]
    }
    let s = this.clone()
    s = s.day(input)
    return s
  },

  //since the start of the year
  week: function(num) {
    if (num !== undefined) {
      let s = this.clone()
      s = s.month(0)
      s = s.date(1)
      s = s.day('monday')
      s = clearMinutes(s)
      //don't go into last-year
      if (s.monthName() === 'december') {
        s = s.add(1, 'week')
      }
      num -= 1 //1-based
      s = s.add(num, 'weeks')
      return s
    }
    //find-out which week it is
    let tmp = this.clone()
    tmp = tmp.month(0)
    tmp = tmp.date(1)
    tmp = clearMinutes(tmp)
    tmp = tmp.day('monday')
    //don't go into last-year
    if (tmp.monthName() === 'december') {
      tmp = tmp.add(1, 'week')
    }
    const thisOne = this.epoch
    //if the week technically hasn't started yet
    if (tmp.epoch > thisOne) {
      return 1
    }
    for (let i = 0; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i
      }
      tmp = tmp.add(1, 'week')
    }
    return 52
  },

  //either name or number
  month: function(input) {
    if (input !== undefined) {
      let s = this.clone()
      s.epoch = set.month(s, input)
      return s
    }
    return this.d.getMonth()
  }
}
module.exports = methods
