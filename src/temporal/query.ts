import { fieldNumber, direction, clockField, asMain, type ClockFields } from './_lib.ts'
import { long as months } from '../data/months.ts'
import { long as days, short as shortDays, aliases } from '../data/days.ts'
import parseTime from '../input/formats/parseTime.ts'
import type Spacetime from './spacetime.ts'

// a getter/setter for one Temporal clock field, eg hour()/hour(n)
interface ClockMethod {
  (this: Spacetime): number
  (this: Spacetime, value: number | string, forward?: boolean): Spacetime
}
const clockSetter = (key: string, field: string): ClockMethod =>
  function (this: Spacetime, value?: number | string, forward?: boolean) {
    if (value === undefined) {
      return clockField(this, field)
    }
    const result = this._with({ [field]: fieldNumber(value, key) } as ClockFields)
    const parent = { second: 'minute', minute: 'hour', hour: 'day', date: 'month' }[key]
    return parent ? direction(result, this, forward, parent) : result
  } as ClockMethod

const query = {
  year: clockSetter('year', 'year'),
  date: clockSetter('date', 'day'),
  hour: clockSetter('hour', 'hour'),
  minute: clockSetter('minute', 'minute'),
  second: clockSetter('second', 'second'),
  millisecond: clockSetter('millisecond', 'millisecond'),
  month: function (this: Spacetime, value?: number | string, forward?: boolean) {
    if (value === undefined) {
      return clockField(this, 'month') - 1
    }
    const result = this._with({ month: fieldNumber(value, 'month') + 1 })
    return direction(result, this, forward, 'year')
  } as ClockMethod,
  monthName(value?: number | string, forward?: boolean) { return value === undefined ? months()[this.month()] || '' : this.month(value, forward) },
  day: function (this: Spacetime, value?: number | string, forward?: boolean) {
    const day = clockField(this, 'dayOfWeek') % 7
    if (value === undefined) {
      return day
    }
    if (typeof value === 'string') {
      const name = value.toLowerCase()
      value = aliases[name] == null ? days().indexOf(name) : aliases[name]
      if (value === -1) {
        value = shortDays().indexOf(name)
      }
    }
    if (!Number.isInteger(Number(value)) || Number(value) < 0 || Number(value) > 6) {
      throw new RangeError('Invalid weekday')
    }
    let delta = Number(value) - day
    if (forward === true && delta < 0) {
      delta += 7
    } else if (forward === false && delta > 0) {
      delta -= 7
    }
    return this.add(delta, 'day')
  } as ClockMethod,
  dayName(value?: number | string, forward?: boolean) { return value === undefined ? days()[this.day()] || '' : this.day(value, forward) },
  dayOfYear: function (this: Spacetime, value?: number | string) {
    if (value === undefined) {
      return clockField(this, 'dayOfYear')
    }
    return this.add(Number(value) - this.dayOfYear(), 'day')
  } as ClockMethod,
  week: function (this: Spacetime, value?: number | string, forward?: boolean) {
    if (value === undefined) {
      return clockField(this, 'weekOfYear')
    }
    // January 4 always belongs to the first ISO week of the calendar year.
    const inYear = year => this._with({ year, month: 1, day: 4 })
      .day(1, false).startOf('day').add(Number(value) - 1, 'week')
    const result = inYear(this.year())
    if (forward === true && result.epoch < this.epoch) {
      return inYear(this.year() + 1)
    }
    if (forward === false && result.epoch > this.epoch) {
      return inYear(this.year() - 1)
    }
    return result
  } as ClockMethod,
  weekStart(value?: number | string) {
    if (typeof value === 'string') {
      const name = value.trim().toLowerCase()
      value = days().indexOf(name)
      if (value === -1) {
        value = shortDays().indexOf(name)
      }
    }
    if (Number.isInteger(value) && value >= 0 && value < 7) {
      this._weekStart = value
    }
    return this
  },
  quarter: function (this: Spacetime, value?: number | string) {
    if (value === undefined) {
      return Math.floor(this.month() / 3) + 1
    }
    value = Number(String(value).replace(/^q/i, ''))
    return this._with({ month: (value - 1) * 3 + 1, day: 1 }).startOf('day')
  } as ClockMethod,
  decade(value?: number | string) { return value === undefined ? Math.trunc(this.year() / 10) * 10 : this.year(Number(value)) },
  century(value?: number | string) {
    if (value !== undefined) {
      return this.year((Number(value) - 1) * 100)
    }
    const num = Math.trunc(this.year() / 100)
    return num < 0 ? num - 1 : num + 1
  },
  millennium(value?: number | string) {
    return value === undefined ? Math.floor(this.year() / 1000) + 1 : this.year((Number(value) - 1) * 1000 || 1)
  },
  era(value?: string) {
    if (value !== undefined) {
      value = value.trim().toLowerCase()
      if (value !== 'bc' && value !== 'ad') {
        throw new RangeError('Invalid era')
      }
      return this.year(Math.abs(this.year()) * (value === 'bc' ? -1 : 1))
    }
    if (!this.isValid()) {
      return ''
    }
    return this.year() < 0 ? 'BC' : 'AD'
  },
  hour12: function (this: Spacetime, value?: number | string, forward?: boolean) {
    if (value === undefined) {
      return this.isValid() ? this.hour() % 12 || 12 : NaN
    }
    const match = String(value).trim().toLowerCase().match(/^([0-9]{1,2})(am|pm)$/)
    if (!match || Number(match[1]) < 1 || Number(match[1]) > 12) {
      throw new RangeError('Invalid 12-hour clock value')
    }
    return this.hour(Number(match[1]) % 12 + (match[2] === 'pm' ? 12 : 0), forward)
  } as ClockMethod,
  hourFloat: function (this: Spacetime, value?: number | string, forward?: boolean) {
    if (value === undefined) {
      return this.hour() + this.minute() / 60
    }
    const num = Number(value)
    const result = this._with({ hour: Math.trunc(num), minute: Math.trunc(num % 1 * 60) })
    return direction(result, this, forward, 'day')
  } as ClockMethod,
  ampm(value?: string, forward?: boolean) {
    if (value === undefined) {
      if (!this.isValid()) {
        return ''
      }
      return this.hour() >= 12 ? 'pm' : 'am'
    }
    value = value.trim().toLowerCase()
    if (value !== 'am' && value !== 'pm') {
      throw new RangeError('Invalid AM/PM value')
    }
    return this.hour(this.hour() % 12 + (value === 'pm' ? 12 : 0), forward)
  },
  time(value?: string, forward?: boolean) {
    if (value === undefined) {
      if (!this.isValid()) {
        return ''
      }
      return `${this.hour12()}:${String(this.minute()).padStart(2, '0')}${this.ampm()}`
    }
    const s = this.clone()
    if (!s.isValid()) {
      return s
    }
    s._pending = s._value.toPlainDateTime()
    const result = parseTime(asMain(s), value) as unknown as Spacetime
    if (result.isValid()) {
      result._value = result._pending.toZonedDateTime(result.tz)
      result._pending = null
    }
    return direction(result, this, forward, 'day')
  },
  leapYear() { return clockField(this, 'inLeapYear', false) },
  daysInMonth() { return clockField(this, 'daysInMonth') }
}

export default {
  ...query,
  // synonyms
  hours: query.hour,
  hour24: query.hour,
  h24: query.hour,
  h12: query.hour12,
  minutes: query.minute,
  seconds: query.second,
  milliseconds: query.millisecond,
  years: query.year,
  months: query.month,
  days: query.day,
  millenium: query.millennium
}
