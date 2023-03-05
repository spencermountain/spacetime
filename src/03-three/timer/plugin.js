
let api = {
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
    let start = this._from(this.startEpoch, this.tz)
    return this.diff(start)
  },
}
api.play = api.start

export default {
  api
}