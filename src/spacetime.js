import parse from './01-one/parse/index.js'
import methods from './01-one/api/index.js'
import world from './world.js'


class SpaceTime {
  constructor(input, tz) {
    let res = parse(input, tz)
    //the holy UNIX moment
    this._epoch = res.epoch
    //the IANA code for the current timezone
    this.tz = res.tz
    this.isSpacetime = true
    this.startEpoch = null
    this.isRunning = false
    this.world = world
  }
  get epoch() {
    // is it in play-mode
    if (this.isRunning && this.startEpoch !== null) {
      let ms = this.world.now.epoch() - this.startEpoch
      return this._epoch + ms
    }
    return this._epoch
  }
}

// builder/factory
SpaceTime.prototype._from = function (input, tz) {
  let s = new SpaceTime(input, tz || this.tz)
  s.started = this.started
  s.world = this.world
  return s
}
Object.assign(SpaceTime.prototype, methods)

// add method aliases
const aliases = [
  ['hours', 'hour'],
  ['minutes', 'minute'],
  ['seconds', 'second'],
  ['minus', 'subtract'],
  ['plus', 'add'],
  ['isDst', 'inDst'],
  ['set', '_from'],
]
aliases.forEach(a => {
  SpaceTime.prototype[a[0]] = SpaceTime.prototype[a[1]]
})


export default SpaceTime