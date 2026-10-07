import { beADate, getEpoch } from '../fns.js'

const validEpoch = epoch => Number.isFinite(epoch) && !isNaN(new Date(epoch).getTime())

const addMethods = SpaceTime => {
  const methods = {
    isAfter: function (d) {
      d = beADate(d, this)
      const epoch = getEpoch(d)
      if (!this.isValid() || !validEpoch(epoch)) {
        return false
      }
      return this.epoch > epoch
    },
    isBefore: function (d) {
      d = beADate(d, this)
      const epoch = getEpoch(d)
      if (!this.isValid() || !validEpoch(epoch)) {
        return false
      }
      return this.epoch < epoch
    },
    isEqual: function (d) {
      d = beADate(d, this)
      const epoch = getEpoch(d)
      if (!this.isValid() || !validEpoch(epoch)) {
        return false
      }
      return this.epoch === epoch
    },
    isBetween: function (start, end, isInclusive = false) {
      start = beADate(start, this)
      end = beADate(end, this)
      const startEpoch = getEpoch(start)
      if (!this.isValid() || !validEpoch(startEpoch)) {
        return false
      }
      const endEpoch = getEpoch(end)
      if (!validEpoch(endEpoch)) {
        return false
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

export default addMethods
