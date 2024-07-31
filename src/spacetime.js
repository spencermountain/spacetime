import quickOffset from './timezone/quick.js'
import findTz from './timezone/find.js'
import handleInput from './input/index.js'
import methods from './methods.js'
import zones from '../zonefile/unpack.js'
import queryFns from './methods/query/index.js'
import addFns from './methods/add.js'
import sameFns from './methods/same.js'
import compareFns from './methods/compare.js'
import i18nFns from './methods/i18n.js'

let timezones = zones
// fake timezone-support, for fakers (es5 class)
const SpaceTime = function (input, tz, options = {}) {
  // the holy moment
  this.epoch = null
  // the shift for the given timezone
  this.tz = findTz(tz, timezones)
  // whether to output warnings to console
  this.silent = typeof options.silent !== 'undefined' ? options.silent : true
  // favour british interpretation of 02/02/2018, etc
  this.british = options.dmy || options.british

  // does the week start on sunday, or monday:
  this._weekStart = 1 // default to monday
  if (options.weekStart !== undefined) {
    this._weekStart = options.weekStart
  }
  // the reference today date object, (for testing)
  this._today = {}
  if (options.today !== undefined) {
    this._today = options.today
  }
  // dunno if this is a good idea, or not
  // Object.defineProperty(this, 'parsers', {
  //   enumerable: false,
  //   writable: true,
  //   value: parsers
  // })
  // add getter/setters
  Object.defineProperty(this, 'd', {
    // return a js date object
    get: function () {
      let offset = quickOffset(this)
      // every computer is somewhere- get this computer's built-in offset
      let bias = new Date(this.epoch).getTimezoneOffset() || 0
      // movement
      let shift = bias + (offset * 60) //in minutes
      shift = shift * 60 * 1000 //in ms
      // remove this computer's offset
      let epoch = this.epoch + shift
      let d = new Date(epoch)
      return d
    }
  })
  // add this data on the object, to allow adding new timezones
  Object.defineProperty(this, 'timezones', {
    get: () => timezones,
    set: (obj) => {
      timezones = obj
      return obj
    }
  })
  // parse the various formats
  let tmp = handleInput(this, input)
  this.epoch = tmp.epoch
  if (tmp.tz) {
    this.tz = tmp.tz
  }
}

// (add instance methods to prototype)
Object.keys(methods).forEach((k) => {
  SpaceTime.prototype[k] = methods[k]
})

// ¯\_(ツ)_/¯
SpaceTime.prototype.clone = function () {
  return new SpaceTime(this.epoch, this.tz, {
    silent: this.silent,
    weekStart: this._weekStart,
    today: this._today,
    parsers: this.parsers
  })
}

/**
 * @deprecated use toNativeDate()
 * @returns native date object at the same epoch
 */
SpaceTime.prototype.toLocalDate = function () {
  return this.toNativeDate()
}

/**
 * @returns native date object at the same epoch
 */
SpaceTime.prototype.toNativeDate = function () {
  return new Date(this.epoch)
}

// append more methods
queryFns(SpaceTime)
addFns(SpaceTime)
sameFns(SpaceTime)
compareFns(SpaceTime)
i18nFns(SpaceTime)

export default SpaceTime
