// import parse from './01-one/methods/parse/index.js'
// import world from './01-one/world/world.js'
// import api from './01-one/api/index.js'
import world from './world.js'


class SpaceTime {
  constructor(input, tz) {
    // define data
    Object.defineProperty(this, 'world', { value: world })
    // generate an epoch, when possible
    let res = world.methods.parse(input, tz, world)
    //the holy UNIX moment
    this._epoch = res.epoch
    //the IANA code for the current timezone
    this.tz = res.tz
    // this is handy, too
    Object.defineProperty(this, 'isSpacetime', { value: true })
  }

  get epoch() {
    // is it playing?
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
// Object.assign(SpaceTime.prototype, api)

// add method aliases
// const aliases = [
//   ['hours', 'hour'],
//   ['minutes', 'minute'],
//   ['seconds', 'second'],
//   ['minus', 'subtract'],
//   ['plus', 'add'],
//   ['isDst', 'inDst'],
//   ['set', '_from'],
// ]
// aliases.forEach(a => {
//   SpaceTime.prototype[a[0]] = SpaceTime.prototype[a[1]]
// })


export default SpaceTime