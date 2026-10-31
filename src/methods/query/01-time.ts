import { milliseconds, seconds, minutes, hours, time as _time } from '../set/set.ts'
import { am, pm } from '../../data/ampm.ts'
import { zeroPad } from '../../fns.ts'

const methods = {
  millisecond: function (num?: number | string) {
    if (num !== undefined) {
      const s = this.clone()
      s.epoch = milliseconds(s, num)
      return s
    }
    return this.d.getUTCMilliseconds()
  },
  second: function (num?: number | string, goFwd?: boolean) {
    if (num !== undefined) {
      const s = this.clone()
      s.epoch = seconds(s, num, goFwd)
      return s
    }
    return this.d.getUTCSeconds()
  },
  minute: function (num?: number | string, goFwd?: boolean) {
    if (num !== undefined) {
      const s = this.clone()
      s.epoch = minutes(s, num, goFwd)
      return s
    }
    return this.d.getUTCMinutes()
  },
  hour: function (num?: number | string, goFwd?: boolean) {
    const d = this.d
    if (num !== undefined) {
      const s = this.clone()
      s.epoch = hours(s, num, goFwd)
      return s
    }
    return d.getUTCHours()
  },

  //'3:30' is 3.5
  hourFloat: function (num?: number | string, goFwd?: boolean) {
    if (num !== undefined) {
      const s = this.clone()
      num = Number(num)
      let minute = num % 1
      minute = minute * 60
      const hour = Math.trunc(num)
      s.epoch = hours(s, hour, goFwd)
      s.epoch = minutes(s, minute, goFwd)
      return s
    }
    const d = this.d
    const hour = d.getUTCHours()
    let minute = d.getUTCMinutes()
    minute = minute / 60
    return hour + minute
  },

  // hour in 12h format
  hour12: function (str?: string, goFwd?: boolean) {
    const d = this.d
    if (str !== undefined) {
      const s = this.clone()
      str = '' + str
      const m = str.match(/^([0-9]+)(am|pm)$/)
      if (m) {
        let hour = parseInt(m[1], 10)
        if (hour === 12) {
          hour = 0
        }
        if (m[2] === 'pm') {
          hour += 12
        }
        s.epoch = hours(s, hour, goFwd)
      }
      return s
    }
    //get the hour
    let hour12 = d.getUTCHours()
    if (hour12 > 12) {
      hour12 = hour12 - 12
    }
    if (hour12 === 0) {
      hour12 = 12
    }
    return hour12
  },

  //some ambiguity here with 12/24h
  time: function (str?: string, goFwd?: boolean) {
    if (str !== undefined) {
      const s = this.clone()
      str = str.toLowerCase().trim()
      s.epoch = _time(s, str, goFwd)
      return s
    }
    return `${this.h12()}:${zeroPad(this.minute())}${this.ampm()}`
  },

  // either 'am' or 'pm'
  ampm: function (input?: string, goFwd?: boolean) {
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
    const s = this.clone()
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
  dayTime: function (str?: string, goFwd?: boolean) {
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
    const h = this.hour()
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

  //get/set a traditional iso string
  iso: function (num?: number) {
    if (num !== undefined) {
      return this.set(num)
    }
    return this.format('iso')
  },
  // get/set a new iso string
  isoFull: function (num?: number) {
    if (num !== undefined) {
      return this.set(num)
    }
    return this.format('iso-full')
  },
  epochSeconds: function (num?: number) {
    if (num !== undefined) {
      this.epoch = num * 1000
      return this
    }
    if (!this.isValid()) {
      return null
    }
    return Math.floor(this.epoch / 1000)
  }
}
export default methods
