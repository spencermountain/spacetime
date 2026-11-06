import { milliseconds, seconds, minutes, hours, time as _time } from '../set/set.ts'
import { am, pm } from '../../data/ampm.ts'
import { zeroPad } from '../../fns.ts'
import type { Spacetime, GetSet, SpacetimeInput } from '../../types/index.ts'

const methods = {
  millisecond: function (this: Spacetime, num?: number | string) {
    if (num !== undefined) {
      const s = this.clone()
      s.epoch = milliseconds(s, num)
      return s
    }
    return this.d.getUTCMilliseconds()
  } as GetSet<number, number | string>,
  second: function (this: Spacetime, num?: number | string, goFwd?: boolean) {
    if (num !== undefined) {
      const s = this.clone()
      s.epoch = seconds(s, num, goFwd)
      return s
    }
    return this.d.getUTCSeconds()
  } as GetSet<number, number | string>,
  minute: function (this: Spacetime, num?: number | string, goFwd?: boolean) {
    if (num !== undefined) {
      const s = this.clone()
      s.epoch = minutes(s, num, goFwd)
      return s
    }
    return this.d.getUTCMinutes()
  } as GetSet<number, number | string>,
  hour: function (this: Spacetime, num?: number | string, goFwd?: boolean) {
    const d = this.d
    if (num !== undefined) {
      const s = this.clone()
      s.epoch = hours(s, num, goFwd)
      return s
    }
    return d.getUTCHours()
  } as GetSet<number, number | string>,

  //'3:30' is 3.5
  hourFloat: function (this: Spacetime, num?: number | string, goFwd?: boolean) {
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
  } as GetSet<number, number | string>,

  // hour in 12h format
  hour12: function (this: Spacetime, str?: string, goFwd?: boolean) {
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
  } as GetSet<number, string>,

  //some ambiguity here with 12/24h
  time: function (this: Spacetime, str?: string, goFwd?: boolean) {
    if (str !== undefined) {
      const s = this.clone()
      str = str.toLowerCase().trim()
      s.epoch = _time(s, str, goFwd)
      return s
    }
    return `${this.h12()}:${zeroPad(this.minute())}${this.ampm()}`
  } as GetSet<string, string>,

  // either 'am' or 'pm'
  ampm: function (this: Spacetime, input?: string, goFwd?: boolean) {
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
  } as GetSet<string, string>,

  //some hard-coded times of day, like 'noon'
  dayTime: function (this: Spacetime, str?: string, goFwd?: boolean) {
    if (str !== undefined) {
      const times: Record<string, string> = {
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
  } as GetSet<string, string>,

  //get/set a traditional iso string
  iso: function (this: Spacetime, num?: number) {
    if (num !== undefined) {
      return this.set(num)
    }
    return this.format('iso')
  } as GetSet<string, SpacetimeInput>,
  // get/set a new iso string
  isoFull: function (this: Spacetime, num?: number) {
    if (num !== undefined) {
      return this.set(num)
    }
    return this.format('iso-full')
  } as GetSet<string, SpacetimeInput>,
  epochSeconds: function (this: Spacetime, num?: number) {
    if (num !== undefined) {
      this.epoch = num * 1000
      return this
    }
    if (!this.isValid()) {
      return null
    }
    return Math.floor(this.epoch / 1000)
  } as GetSet<number | null, number>,
}
export default methods
