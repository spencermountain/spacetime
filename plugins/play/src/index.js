const methods = {
  start: function () {
    this.startEpoch = this.epoch
    return this
  },
  stop: function () {
    this.startEpoch = null
    this.isRunning = false
    return this
  },
  pause: function () {
    this.isRunning = false
    return this
  },
  elapsed: async function () {
    const start = this._from(this.startEpoch, this.tz)
    return this.diff(start)
  }
}
methods.play = methods.start
export default methods
