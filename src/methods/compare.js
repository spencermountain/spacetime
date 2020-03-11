const fns = require('../fns')

const addMethods = SpaceTime => {
  const methods = {
    isAfter: function(d) {
      d = fns.beADate(d, this)
      let epoch = fns.getEpoch(d)
      if (epoch === null) {
        return null
      }
      return this.epoch > epoch
    },
    isBefore: function(d) {
      d = fns.beADate(d, this)
      let epoch = fns.getEpoch(d)
      if (epoch === null) {
        return null
      }
      return this.epoch < epoch
    },
    isEqual: function(d) {
      d = fns.beADate(d, this)
      let epoch = fns.getEpoch(d)
      if (epoch === null) {
        return null
      }
      return this.epoch === epoch
    },
    isBetween: function(start, end, isInclusive = false) {
      start = fns.beADate(start, this)
      end = fns.beADate(end, this)
      let startEpoch = fns.getEpoch(start)
      if (startEpoch === null) {
        return null
      }
      let endEpoch = fns.getEpoch(end)
      if (endEpoch === null) {
        return null
      }
      if (isInclusive) {
        return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end);
      }
      return startEpoch < this.epoch && this.epoch < endEpoch
    }
  }

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k]
  })
}

module.exports = addMethods
