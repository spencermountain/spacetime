
export default {
  start: function () {
    this.startEpoch = this.epoch
    return this
  },
  pause: function () {
    return this
  },
  elapsed: async function () {
    return this
  },
}
