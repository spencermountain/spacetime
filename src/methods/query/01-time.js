const set = require('../set/set')
const fns = require('../../fns')

const methods = {
  millisecond: function (num) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = set.milliseconds(s, num)
      return s
    }
    return this.d.getMilliseconds()
  },
  second: function (num) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = set.seconds(s, num)
      return s
    }
    return this.d.getSeconds()
  },
  minute: function (num) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = set.minutes(s, num)
      return s
    }
    return this.d.getMinutes()
  },
  hour: function (num) {
    let d = this.d
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = set.hours(s, num)
      return s
    }
    return d.getHours()
  },

  //'3:30' is 3.5
  hourFloat: function (num) {
    if (num !== undefined) {
      let s = this.clone()
      let minute = num % 1
      minute = minute * 60
      let hour = parseInt(num, 10)
      s.epoch = set.hours(s, hour)
      s.epoch = set.minutes(s, minute)
      return s
    }
    let d = this.d
    let hour = d.getHours()
    let minute = d.getMinutes()
    minute = minute / 60
    return hour + minute
  },

  // hour in 12h format
  hour12: function (str) {
    let d = this.d
    if (str !== undefined) {
      let s = this.clone()
      str = '' + str
      let m = str.match(/^([0-9]+)(am|pm)$/)
      if (m) {
        let hour = parseInt(m[1], 10)
        if (m[2] === 'pm') {
          hour += 12
        }
        s.epoch = set.hours(s, hour)
      }
      return s
    }
    //get the hour
    let hour12 = d.getHours()
    if (hour12 > 12) {
      hour12 = hour12 - 12
    }
    if (hour12 === 0) {
      hour12 = 12
    }
    return hour12
  },

  //some ambiguity here with 12/24h
  time: function (str) {
    if (str !== undefined) {
      let s = this.clone()
      str = str.toLowerCase().trim()
      s.epoch = set.time(s, str)
      return s
    }
    return `${this.h12()}:${fns.zeroPad(this.minute())}${this.ampm()}`
  },

  // either 'am' or 'pm'
  ampm: function (input) {
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

  //some hard-coded times of day, like 'noon'
  dayTime: function (str) {
    if (str !== undefined) {
      const times = {
        morning: '7:00am',
        breakfast: '7:00am',
        noon: '12:00am',
        lunch: '12:00pm',
        afternoon: '2:00pm',
        evening: '6:00pm',
        dinner: '6:00pm',
        night: '11:00pm',
        midnight: '23:59pm'
      }
      let s = this.clone()
      str = str || ''
      str = str.toLowerCase()
      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str])
      }
      return s
    }
    let h = this.hour()
    if (h < 6) {
      return 'night'
    }
    if (h < 12) {
      //until noon
      return 'morning'
    }
    if (h < 17) {
      //until 5pm
      return 'afternoon'
    }
    if (h < 22) {
      //until 10pm
      return 'evening'
    }
    return 'night'
  },

  //parse a proper iso string
  iso: function (num) {
    if (num !== undefined) {
      return this.set(num)
    }
    return this.format('iso')
  }
}
module.exports = methods
