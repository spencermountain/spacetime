'use strict'
const days = require('../../data/days')
const months = require('../../data/months')
const walkTo = require('../set/walk')

//non-destructive getters/setters with fancy moves to do
module.exports = {
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

  ampm: function(input) {
    let which = 'am'
    let hour = this.hour()
    if (hour >= 12) {
      which = 'pm'
    }
    if (typeof input !== 'string') {
      return which
    }
    //okay, we're doing a setter
    let s = this.clone()
    input = input.toLowerCase().trim()
    //ampm should never change the day
    // - so use `.hour(n)` instead of `.minus(12,'hour')`
    if (hour >= 12 && input === 'am') {
      //noon is 12pm
      hour -= 12
      return s.hour(hour)
    }
    if (hour < 12 && input === 'pm') {
      hour += 12
      return s.hour(hour)
    }
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

  monthName: function(input) {
    if (input === undefined) {
      return months.long()[this.month()]
    }
    let s = this.clone()
    s = s.month(input)
    return s
  }
}
