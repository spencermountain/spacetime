import attempt from './_errors.js'
import normalizeTimezone from './timezone.js'
import parse from './parse.js'
import format from '../methods/format/index.js'
import unixFmt from '../methods/format/unixFmt.js'
import { temporal, fieldValues, fields } from './_lib.js'
import query from './query.js'
import arithmetic from './arithmetic.js'
import compare from './compare.js'

const formats = { 'iso-full': s => s.toTemporal().toString() }

class Spacetime {
  constructor(input, tz, options = {}) {
    const T = temporal()
    this._tz = T.Now.timeZoneId()
    this._weekStart = options.weekStart ?? 1
    this._today = { ...options.today }
    this.british = options.dmy || options.british
    this.silent = options.silent ?? true
    this._pending = null
    // Only input errors become invalid dates; missing Temporal remains actionable.
    try {
      this._tz = normalizeTimezone(tz, input?.timeZoneId || this._tz)
      this._value = T.Instant.fromEpochMilliseconds(Date.now()).toZonedDateTimeISO(this.tz)
      if (Object.keys(this._today).length) {
        this._value = this._value.with(fieldValues({ month: 0, date: 1, ...this._today }))
      }
      const result = parse(this, input)
      this._value = result._value
      this._tz = result._tz
      this._pending = result._pending
    } catch (error) {
      if (!(error instanceof RangeError || error instanceof TypeError)) {
        throw error
      }
      this._value = null
      this._pending = null
    }
  }

  get _clock() { return this._pending || this._value }
  get epoch() { return this._value?.epochMilliseconds ?? null }
  set epoch(value) {
    this._pending = null
    this._value = null
    if (typeof value === 'number' && Number.isFinite(value)) {
      attempt(this, () => {
        this._value = temporal().Instant.fromEpochMilliseconds(Math.trunc(value)).toZonedDateTimeISO(this.tz)
        return this
      })
    }
  }
  get tz() { return this._tz }
  set tz(value) {
    const result = attempt(this, () => {
      const s = this.clone()
      s._tz = normalizeTimezone(value, temporal().Now.timeZoneId())
      if (s._value) {
        s._value = s._value.withTimeZone(s._tz)
      }
      return s
    })
    Object.assign(this, result)
  }

  clone() { return Object.assign(Object.create(Object.getPrototypeOf(this)), this, { _today: { ...this._today } }) }
  _result(value) {
    const s = this.clone()
    if (this._pending) {
      s._pending = value
    } else {
      s._value = value
    }
    return s
  }
  _with(values) { return this.isValid() ? this._result(this._clock.with(values)) : this.clone() }
  isValid() { return this._clock !== null }
  toTemporal() { return this._value }
  toNativeDate() { return new Date(this.isValid() ? this.epoch : NaN) }
  toLocalDate() { return this.toNativeDate() }
  set(input, tz = this.tz) {
    return new Spacetime(input, tz, { today: this._today, weekStart: this._weekStart, british: this.british, silent: this.silent })
  }
  goto(tz) {
    const s = this.clone()
    s.tz = tz
    return s
  }
  timezone(tz) {
    if (tz !== undefined) {
      tz = normalizeTimezone(tz, temporal().Now.timeZoneId())
      const s = this.clone()
      s._tz = tz
      if (s.isValid() && !s._pending) {
        s._value = s._value.toPlainDateTime().toZonedDateTime(tz)
      }
      return s
    }
    return { name: this._value?.timeZoneId || this.tz, current: { offset: this.offset() / 60 } }
  }
  offset() { return this._value ? this._value.offsetNanoseconds / 60000000000 : NaN }
  format(fmt) { return format(this, fmt, formats) }
  unixFmt(fmt) { return this.isValid() ? unixFmt(this, fmt) : '' }
  iso(input) { return input === undefined ? this.format('iso') : this.set(input) }
  isoFull(input) { return input === undefined ? this.format('iso-full') : this.set(input) }
  epochSeconds(value) {
    if (value !== undefined) {
      this.epoch = value * 1000
      return this
    }
    return this.isValid() ? Math.floor(this.epoch / 1000) : NaN
  }
  json(input) {
    if (input !== undefined) {
      return this.timezone(input.timezone || this.tz)._with(fieldValues(input))
    }
    const out = Object.fromEntries([...fields, 'century', 'decade', 'day'].map((key) => [key, this[key]()]))
    return { ...out, offset: this.offset() / 60, timezone: this.tz }
  }
}
Object.assign(Spacetime.prototype, query, arithmetic, compare)

// Guard value-changing APIs without changing the return types of their getters.
const setters = [...Object.keys(query), 'timezone', 'json']
const transformations = ['add', 'subtract', 'plus', 'minus', 'startOf', 'endOf', 'next', 'last', 'nearest', 'round', 'goto']
for (const name of [...setters, ...transformations]) {
  const method = Spacetime.prototype[name]
  Spacetime.prototype[name] = function (...args) {
    if (setters.includes(name) && args[0] === undefined) {
      return method.apply(this, args)
    }
    return attempt(this, () => method.apply(this, args))
  }
}

export default Spacetime
