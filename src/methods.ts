 
import format from './methods/format/index.ts'
import unixFmt from './methods/format/unixFmt.ts'
import progress from './methods/progress.ts'
import nearest from './methods/nearest.ts'
import diff from './methods/diff/index.ts'
import since from './methods/since/index.ts'
import { startOf as _startOf, endOf as _endOf } from './methods/startOf.ts'
import every from './methods/every.ts'
import timezone from './timezone/index.ts'
import findTz from './timezone/find.ts'
import handleInput from './input/index.ts'
import { isLeapYear, getUnit, setUnit, isUnitKey } from './fns.ts'
import { short, long } from './data/days.ts'
import type { Spacetime, SpacetimeInput, TimezoneMeta, TimeUnit } from './types/index.ts'
const units = ['century', 'decade', 'year', 'month', 'date', 'day', 'hour', 'minute', 'second', 'millisecond'] as const

// a number for one unit, or the whole table
function diffMethod(this: Spacetime, d: SpacetimeInput): Record<string, number>
function diffMethod(this: Spacetime, d: SpacetimeInput, unit: TimeUnit): number
function diffMethod(this: Spacetime, d: SpacetimeInput, unit?: TimeUnit): number | Record<string, number> {
  return diff(this, d, unit)
}

// metadata about the current timezone, or a copy in a new timezone (keeping the same wall-clock time)
function timezoneMethod(this: Spacetime): TimezoneMeta
function timezoneMethod(this: Spacetime, tz: string): Spacetime
function timezoneMethod(this: Spacetime, tz?: string): TimezoneMeta | Spacetime {
  // hot-swap the timezone, to avoid time-change
  if (tz !== undefined) {
    const json: Record<string, string | number> = { ...this.json(), timezone: tz }
    return this.set(json, tz)
  }
  return timezone(this)
}

//the spacetime instance methods (also, the API)
const methods = {
  set: function (this: Spacetime, input?: SpacetimeInput, tz?: string) {
    let s = this.clone()
    s = handleInput(s, input, null)
    if (tz) {
      s.tz = findTz(tz, s.timezones)
    }
    return s
  },
  timezone: timezoneMethod,
  isDST: function (this: Spacetime) {
    return timezone(this).current.isDST
  },
  hasDST: function (this: Spacetime) {
    return timezone(this).hasDst
  },
  offset: function (this: Spacetime) {
    return timezone(this).current.offset * 60
  },
  hemisphere: function (this: Spacetime) {
    return timezone(this).hemisphere
  },
  format: function (this: Spacetime, fmt: string) {
    return format(this, fmt)
  },
  unixFmt: function (this: Spacetime, fmt: string) {
    return unixFmt(this, fmt)
  },
  startOf: function (this: Spacetime, unit: TimeUnit) {
    return _startOf(this, unit)
  },
  endOf: function (this: Spacetime, unit: TimeUnit) {
    return _endOf(this, unit)
  },
  leapYear: function (this: Spacetime) {
    const year = this.year()
    return isLeapYear(year)
  },
  progress: function (this: Spacetime, unit?: TimeUnit) {
    return progress(this, unit)
  },
  nearest: function (this: Spacetime, unit: TimeUnit) {
    return nearest(this, unit)
  },
  diff: diffMethod,
  since: function (this: Spacetime, d?: SpacetimeInput) {
    if (!d) {
      d = this.clone().set()
    }
    return since(this, d)
  },
  next: function (this: Spacetime, unit: TimeUnit) {
    const s = this.add(1, unit)
    return s.startOf(unit)
  },
  //the start of the previous year/week/century
  last: function (this: Spacetime, unit: TimeUnit) {
    const s = this.subtract(1, unit)
    return s.startOf(unit)
  },
  isValid: function (this: Spacetime) {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false
    }
    return Number.isFinite(this.epoch) && !isNaN(new Date(this.epoch).getTime())
  },
  //travel to this timezone
  goto: function (this: Spacetime, tz: string | null) {
    const s = this.clone()
    s.tz = findTz(tz, s.timezones) //science!
    return s
  },
  //get each week/month/day between a -> b
  every: function (this: Spacetime, unit: TimeUnit | SpacetimeInput, to?: SpacetimeInput | TimeUnit, stepCount?: number) {
    // allow swapping these params:
    if (typeof unit === 'object' && typeof to === 'string') {
      const tmp = to
      to = unit
      unit = tmp
    }
    return every(this, unit as TimeUnit, to, stepCount)
  },
  isAwake: function (this: Spacetime) {
    const hour = this.hour()
    //10pm -> 8am
    if (hour < 8 || hour > 22) {
      return false
    }
    return true
  },
  isAsleep: function (this: Spacetime) {
    return !this.isAwake()
  },
  daysInMonth: function (this: Spacetime) {
    switch (this.month()) {
      case 0:
        return 31
      case 1:
        return this.leapYear() ? 29 : 28
      case 2:
        return 31
      case 3:
        return 30
      case 4:
        return 31
      case 5:
        return 30
      case 6:
        return 31
      case 7:
        return 31
      case 8:
        return 30
      case 9:
        return 31
      case 10:
        return 30
      case 11:
        return 31
      default:
        throw new Error('Invalid Month state.')
    }
  },
  //pretty-printing
  log: function (this: Spacetime) {
    console.log('\n' + format(this, 'nice-short')) //eslint-disable-line no-console
    return this
  },
  logYear: function (this: Spacetime) {
    console.log('\n' + format(this, 'full-short')) //eslint-disable-line no-console
    return this
  },
  json: function (this: Spacetime, input?: Record<string, string | number>) {
    // setter for json input
    if (input !== undefined) {
      let s = this.clone()
      if (input.timezone) {
        s.tz = String(input.timezone)
      }
      for (let i = 0; i < units.length; i++) {
        const unit = units[i]
        if (input[unit] !== undefined && isUnitKey(unit)) {
          s = setUnit(s, unit, input[unit])
        }
      }
      return s
    }
    // produce json output
    const obj: Record<string, any> = {}
    units.forEach((unit) => {
      obj[unit] = isUnitKey(unit) ? getUnit(this, unit) : this[unit]()
    })
    obj.offset = this.timezone().current.offset
    obj.timezone = this.tz
    return obj
  },
  debug: function (this: Spacetime) {
    const tz = this.timezone()
    let date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year()
    date += '\n     - ' + this.format('time')
    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')') // eslint-disable-line no-console
    return this
  },
  //alias of 'since' but opposite - like moment.js
  from: function (this: Spacetime, d: SpacetimeInput) {
    const other = this.clone().set(d)
    return other.since(this)
  },
  fromNow: function (this: Spacetime) {
    const d = this.clone().set(Date.now())
    return d.since(this)
  },
  weekStart: function (this: Spacetime, input: number | string) {
    //accept a number directly
    if (typeof input === 'number') {
      this._weekStart = input
      return this
    }
    if (typeof input === 'string') {
      // accept 'wednesday'
      input = input.toLowerCase().trim()
      let num = short().indexOf(input)
      if (num === -1) {
        num = long().indexOf(input)
      }
      if (num === -1) {
        num = 1 //go back to default
      }
      this._weekStart = num
    } else {
      console.warn('Spacetime Error: Cannot understand .weekStart() input:', input) // eslint-disable-line no-console
    }
    return this
  }
}

export default {
  ...methods,
  // aliases
  inDST: methods.isDST,
  round: methods.nearest,
  each: methods.every
}
