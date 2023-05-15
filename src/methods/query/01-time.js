import { milliseconds, seconds, minutes, hours, time as _time } from '../set/set.js'
import { am, pm } from '../../data/ampm.js'
import { zeroPad } from '../../fns.js'

const methods = {
  millisecond: function (num) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = milliseconds(s, num)
      return s
    }
    return this.d.getMilliseconds()
  },
  second: function (num, goFwd) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = seconds(s, num, goFwd)
      return s
    }
    return this.d.getSeconds()
  },
  minute: function (num, goFwd) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = minutes(s, num, goFwd)
      return s
    }
    return this.d.getMinutes()
  },
  hour: function (num, goFwd) {
    let d = this.d
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = hours(s, num, goFwd)
      return s
    }
    return d.getHours()
  },

  //'3:30' is 3.5
  hourFloat: function (num, goFwd) {
    if (num !== undefined) {
      let s = this.clone()
      let minute = num % 1
      minute = minute * 60
      let hour = parseInt(num, 10)
      s.epoch = hours(s, hour, goFwd)
      s.epoch = minutes(s, minute, goFwd)
      return s
    }
    let d = this.d
    let hour = d.getHours()
    let minute = d.getMinutes()
    minute = minute / 60
    return hour + minute
  },

  // hour in 12h format
  hour12: function (str, goFwd) {
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
        s.epoch = hours(s, hour, goFwd)
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
  time: function (str, goFwd) {
    if (str !== undefined) {
      let s = this.clone()
      str = str.toLowerCase().trim()
      s.epoch = _time(s, str, goFwd)
      return s
    }
    return `${this.h12()}:${zeroPad(this.minute())}${this.ampm()}`
  },

  // either 'am' or 'pm'
  ampm: function (input, goFwd) {
    // let which = 'am'
    let which = am()
    let hour = this.hour()
    if (hour >= 12) {
      // which = 'pm'
      which = pm()
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
      return s.hour(hour, goFwd)
    }
    if (hour < 12 && input === 'pm') {
      hour += 12
      return s.hour(hour, goFwd)
    }
    return s
  },

  //some hard-coded times of day, like 'noon'
  dayTime: function (str, goFwd) {
    if (str !== undefined) {
      const times = {
        morning: '7:00',
        breakfast: '7:00',
        noon: '12:00',
        lunch: '12:00',
        afternoon: '14:00',
        evening: '18:00',
        dinner: '18:00',
        night: '23:00',
        midnight: '00:00'
      }
      let s = this.clone()
      str = str || ''
      str = str.toLowerCase()
      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str], goFwd)
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
export default methods
