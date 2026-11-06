import { inputTimezone, toTemporal } from './input/temporal.ts'
import quickOffset from './timezone/quick.ts'
import findTz from './timezone/find.ts'
import handleInput from './input/index.ts'
import { toParts } from './input/helpers.ts'
import methods from './methods.ts'
import zones from '../zonefile/unpack.ts'
import queryFns from './methods/query/index.ts'
import addFns from './methods/add.ts'
import sameFns from './methods/same.ts'
import compareFns from './methods/compare.ts'
import i18nFns from './methods/i18n.ts'
import type { SpacetimeInput, Options, DateParts, TimezoneSet } from './types/index.ts'

// shared timezone data, swappable via `s.timezones = {...}`
let timezones = zones

import type { Spacetime as Api } from '../types/types.js'

// the instance api is declared in /types; the implementation is checked against it.
// internals that the public declaration doesn't mention are added here, for src only.
declare module '../types/types.js' {
  interface Spacetime {
    _weekStart: number
    _today: DateParts
    british: boolean
    d: Date
    /** with no input: now, respecting options.today */
    set(): Spacetime
  }
}
interface Spacetime extends Api {}

class Spacetime {
  epoch: number
  tz: string
  silent: boolean
  british: boolean
  _weekStart: number
  _today: DateParts

  constructor(input?: SpacetimeInput, tz?: string, options: Options = {}) {
    // the holy moment
    this.epoch = null
    // the shift for the given timezone
    this.tz = findTz(tz == null ? inputTimezone(input) : tz, timezones)
    // whether to output warnings to console
    this.silent = options.silent !== undefined ? options.silent : true
    // favour british interpretation of 02/02/2018, etc
    this.british = options.dmy || options.british
    // does the week start on sunday, or monday:
    this._weekStart = options.weekStart !== undefined ? options.weekStart : 1 // default to monday
    // the reference today date object, (for testing)
    this._today = toParts(options.today)
    // parse the various formats
    const tmp = handleInput(this, input, tz)
    this.epoch = tmp.epoch
    if (tmp.tz) {
      this.tz = tmp.tz
    }
  }

  // Internal clock view: read its UTC fields, not the host's local fields.
  get d() {
    if (!Number.isFinite(this.epoch)) {
      return new Date(NaN)
    }
    const offset = quickOffset(this)
    return new Date(this.epoch + (offset * 3600000))
  }

  // timezone data lives on the instance, to allow adding new timezones
  get timezones() {
    return timezones
  }
  set timezones(obj: TimezoneSet) {
    timezones = obj
  }

  clone() {
    return new Spacetime(this.isValid() ? this.epoch : NaN, this.tz, {
      silent: this.silent,
      dmy: this.british,
      weekStart: this._weekStart,
      today: this._today
    })
  }

  /**
   * @deprecated use toNativeDate()
   * @returns native date object at the same epoch
   */
  toLocalDate() {
    return this.toNativeDate()
  }

  /**
   * @returns native date object at the same epoch
   */
  toNativeDate() {
    return new Date(this.isValid() ? this.epoch : NaN)
  }

  toTemporal() {
    return toTemporal(this)
  }
}

// mix-in the instance methods (also, the API)
Object.assign(Spacetime.prototype, methods, queryFns, addFns, sameFns, compareFns, i18nFns)

export default Spacetime
