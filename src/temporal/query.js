import { fieldNumber, direction } from './_lib.js'
import { long as months } from '../data/months.js'
import { long as days, short as shortDays, aliases } from '../data/days.js'
import parseTime from '../input/formats/parseTime.js'

const query = {
  month(value, forward) {
    if (value === undefined) {
      return (this._clock?.month ?? NaN) - 1
    }
    const result = this._with({ month: fieldNumber(value, 'month') + 1 })
    return direction(result, this, forward, 'year')
  },
  monthName(value, forward) { return value === undefined ? months()[this.month()] || '' : this.month(value, forward) },
  day(value, forward) {
    const day = (this._clock?.dayOfWeek ?? NaN) % 7
    if (value === undefined) {
      return day
    }
    if (typeof value === 'string') {
      const name = value.toLowerCase()
      value = aliases[name] ?? days().indexOf(name)
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
  },
  dayName(value, forward) { return value === undefined ? days()[this.day()] || '' : this.day(value, forward) },
  dayOfYear(value) {
    return value === undefined ? this._clock?.dayOfYear ?? NaN : this.add(Number(value) - this.dayOfYear(), 'day')
  },
  week(value, forward) {
    if (value === undefined) {
      return this._clock?.weekOfYear ?? NaN
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
  },
  weekStart(value) {
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
  quarter(value) {
    if (value === undefined) {
      return Math.floor(this.month() / 3) + 1
    }
    value = Number(String(value).replace(/^q/i, ''))
    return this._with({ month: (value - 1) * 3 + 1, day: 1 }).startOf('day')
  },
  decade(value) { return value === undefined ? Math.trunc(this.year() / 10) * 10 : this.year(Number(value)) },
  century(value) {
    if (value !== undefined) {
      return this.year((Number(value) - 1) * 100)
    }
    const num = Math.trunc(this.year() / 100)
    return num < 0 ? num - 1 : num + 1
  },
  millennium(value) {
    return value === undefined ? Math.floor(this.year() / 1000) + 1 : this.year((Number(value) - 1) * 1000 || 1)
  },
  era(value) {
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
  hour12(value, forward) {
    if (value === undefined) {
      return this.isValid() ? this.hour() % 12 || 12 : NaN
    }
    const match = String(value).trim().toLowerCase().match(/^([0-9]{1,2})(am|pm)$/)
    if (!match || Number(match[1]) < 1 || Number(match[1]) > 12) {
      throw new RangeError('Invalid 12-hour clock value')
    }
    return this.hour(Number(match[1]) % 12 + (match[2] === 'pm' ? 12 : 0), forward)
  },
  hourFloat(value, forward) {
    if (value === undefined) {
      return this.hour() + this.minute() / 60
    }
    const result = this._with({ hour: Math.trunc(value), minute: Math.trunc(value % 1 * 60) })
    return direction(result, this, forward, 'day')
  },
  ampm(value, forward) {
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
  time(value, forward) {
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
    const result = parseTime(s, value)
    if (result.isValid()) {
      result._value = result._pending.toZonedDateTime(result.tz)
      result._pending = null
    }
    return direction(result, this, forward, 'day')
  },
  leapYear() { return this._clock?.inLeapYear ?? false },
  daysInMonth() { return this._clock?.daysInMonth ?? NaN }
}

const fields = { year: 'year', date: 'day', hour: 'hour', minute: 'minute', second: 'second', millisecond: 'millisecond' }
Object.keys(fields).forEach((key) => {
  query[key] = function (value, forward) {
    if (value === undefined) {
      return this._clock?.[fields[key]] ?? NaN
    }
    const result = this._with({ [fields[key]]: fieldNumber(value, key) })
    const parent = { second: 'minute', minute: 'hour', hour: 'day', date: 'month' }[key]
    return parent ? direction(result, this, forward, parent) : result
  }
})
const synonyms = { hours: 'hour', hour24: 'hour', h24: 'hour', h12: 'hour12', minutes: 'minute', seconds: 'second', milliseconds: 'millisecond', years: 'year', months: 'month', days: 'day', millenium: 'millennium' }
Object.keys(synonyms).forEach((key) => { query[key] = query[synonyms[key]] })

export default query
