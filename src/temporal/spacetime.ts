import attempt from './_errors.ts'
import normalizeTimezone from './timezone.ts'
import parse from './parse.ts'
import format from '../methods/format/index.ts'
import unixFmt from '../methods/format/unixFmt.ts'
import { temporal, fieldValues, fields, asMain, type ClockFields } from './_lib.ts'
import query from './query.ts'
import arithmetic from './arithmetic.ts'
import compare from './compare.ts'
import type { SpacetimeInput, Options, DateParts, Spacetime as MainSpacetime } from '../types/index.ts'

const formats = { 'iso-full': (s: MainSpacetime) => s.toTemporal().toString() }

// instance methods mixed-in below; merged onto the class type here
type Mixins = typeof query & typeof arithmetic & typeof compare
interface Spacetime extends Mixins {}

class Spacetime {
  _tz: string
  /** the instant, or null when invalid */
  _value: Temporal.ZonedDateTime | null
  /** wall-clock fields being collected during parsing, before resolving a dst gap/overlap */
  _pending: Temporal.PlainDateTime | null
  _weekStart: number
  _today: DateParts
  british: boolean
  silent: boolean

  constructor(input?: SpacetimeInput, tz?: string, options: Options = {}) {
    const T = temporal()
    this._tz = T.Now.timeZoneId()
    this._weekStart = options.weekStart == null ? 1 : options.weekStart
    this._today = { ...options.today }
    this.british = options.dmy || options.british
    this.silent = options.silent == null ? true : options.silent
    this._pending = null
    // Only input errors become invalid dates; missing Temporal remains actionable.
    try {
      const inputZone = input instanceof T.ZonedDateTime ? input.timeZoneId : undefined
      this._tz = normalizeTimezone(tz, inputZone || this._tz)
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

  get _clock(): Temporal.ZonedDateTime | Temporal.PlainDateTime | null { return this._pending || this._value }
  get epoch() { return this._value == null ? null : this._value.epochMilliseconds }
  set epoch(value: number | null) {
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
  set tz(value: string) {
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

  clone(): Spacetime { return Object.assign(Object.create(Object.getPrototypeOf(this)), this, { _today: { ...this._today } }) }
  _result(value: Temporal.ZonedDateTime | Temporal.PlainDateTime): Spacetime {
    const s = this.clone()
    if (this._pending) {
      s._pending = value as Temporal.PlainDateTime
    } else {
      s._value = value as Temporal.ZonedDateTime
    }
    return s
  }
  _with(values: ClockFields): Spacetime { return this.isValid() ? this._result(this._clock.with(values)) : this.clone() }
  isValid() { return this._clock !== null }
  toTemporal() { return this._value }
  toNativeDate() { return new Date(this.isValid() ? this.epoch : NaN) }
  toLocalDate() { return this.toNativeDate() }
  set(input: SpacetimeInput, tz: string = this.tz): Spacetime {
    return new Spacetime(input, tz, { today: this._today, weekStart: this._weekStart, british: this.british, silent: this.silent })
  }
  goto(tz: string): Spacetime {
    const s = this.clone()
    s.tz = tz
    return s
  }
  /** metadata about the current timezone, or a copy in a new timezone (keeping the same wall-clock time) */
  timezone(): { name: string; current: { offset: number } }
  timezone(tz: string): Spacetime
  timezone(tz?: string) {
    if (tz !== undefined) {
      tz = normalizeTimezone(tz, temporal().Now.timeZoneId())
      const s = this.clone()
      s._tz = tz
      if (s.isValid() && !s._pending) {
        s._value = s._value.toPlainDateTime().toZonedDateTime(tz)
      }
      return s
    }
    return { name: (this._value != null && this._value.timeZoneId) || this.tz, current: { offset: this.offset() / 60 } }
  }
  offset() { return this._value ? this._value.offsetNanoseconds / 60000000000 : NaN }
  format(fmt: string) { return format(asMain(this), fmt, formats) }
  unixFmt(fmt: string): string { return this.isValid() ? unixFmt(asMain(this), fmt) : '' }
  iso(input?: SpacetimeInput) { return input === undefined ? this.format('iso') : this.set(input) }
  isoFull(input?: SpacetimeInput) { return input === undefined ? this.format('iso-full') : this.set(input) }
  epochSeconds(value?: number) {
    if (value !== undefined) {
      this.epoch = value * 1000
      return this
    }
    return this.isValid() ? Math.floor(this.epoch / 1000) : NaN
  }
  json(input?: DateParts) {
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
