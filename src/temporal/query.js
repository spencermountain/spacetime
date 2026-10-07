import { long as months, mapping } from '../data/months.js'
import { long as days, short as shortDays, aliases } from '../data/days.js'
import parseTime from '../input/formats/parseTime.js'

const query = {
  month(value) {
    if (value === undefined) {
      return (this._clock?.month ?? NaN) - 1
    }
    if (typeof value === 'string' && !/^[0-9]+$/.test(value)) {
      value = mapping()[value.toLowerCase()]
    }
    return this._with({ month: Number(value) + 1 })
  },
  monthName(value) { return value === undefined ? months()[this.month()] : this.month(value) },
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
    let delta = Number(value) - day
    if (forward === true && delta < 0) {
      delta += 7
    } else if (forward === false && delta > 0) {
      delta -= 7
    }
    return this.add(delta, 'day')
  },
  dayName(value, forward) { return value === undefined ? days()[this.day()] : this.day(value, forward) },
  dayOfYear(value) {
    return value === undefined ? this._clock?.dayOfYear : this.add(Number(value) - this.dayOfYear(), 'day')
  },
  week(value) {
    return value === undefined ? this._clock?.weekOfYear : this.add(Number(value) - this.week(), 'week').startOf('week')
  },
  weekStart(value) {
    if (typeof value === 'string') {
      value = days().indexOf(value.toLowerCase())
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
      return this.year(Math.abs(this.year()) * (value.toLowerCase() === 'bc' ? -1 : 1))
    }
    return this.year() < 0 ? 'BC' : 'AD'
  },
  hour12(value) { return value === undefined ? this.hour() % 12 || 12 : this.time(String(value)) },
  hourFloat(value) {
    return value === undefined ? this.hour() + this.minute() / 60 : this._with({ hour: Math.trunc(value), minute: Math.trunc(value % 1 * 60) })
  },
  ampm(value) {
    if (value === undefined) {
      return this.hour() >= 12 ? 'pm' : 'am'
    }
    return this.hour(this.hour() % 12 + (value.toLowerCase() === 'pm' ? 12 : 0))
  },
  time(value) {
    if (value === undefined) {
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
    return result
  },
  leapYear() { return this._clock?.inLeapYear ?? false },
  daysInMonth() { return this._clock?.daysInMonth ?? NaN }
}

const fields = { year: 'year', date: 'day', hour: 'hour', minute: 'minute', second: 'second', millisecond: 'millisecond' }
Object.keys(fields).forEach((key) => {
  query[key] = function (value) {
    return value === undefined ? this._clock?.[fields[key]] ?? NaN : this._with({ [fields[key]]: Number(value) })
  }
})
const synonyms = { hours: 'hour', hour24: 'hour', h24: 'hour', h12: 'hour12', minutes: 'minute', seconds: 'second', milliseconds: 'millisecond', years: 'year', months: 'month', days: 'day', millenium: 'millennium' }
Object.keys(synonyms).forEach((key) => { query[key] = query[synonyms[key]] })

export default query
