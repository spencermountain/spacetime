import { beADate, getEpoch } from '../fns.js'

const addMethods = SpaceTime => {
  const methods = {
    isAfter: function (d) {
      d = beADate(d, this)
      let epoch = getEpoch(d)
      if (epoch === null) {
        return null
      }
      return this.epoch > epoch
    },
    isBefore: function (d) {
      d = beADate(d, this)
      let epoch = getEpoch(d)
      if (epoch === null) {
        return null
      }
      return this.epoch < epoch
    },
    isEqual: function (d) {
      d = beADate(d, this)
      let epoch = getEpoch(d)
      if (epoch === null) {
        return null
      }
      return this.epoch === epoch
    },
    isBetween: function (start, end, isInclusive = false) {
      start = beADate(start, this)
      end = beADate(end, this)
      let startEpoch = getEpoch(start)
      if (startEpoch === null) {
        return null
      }
      let endEpoch = getEpoch(end)
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

export default addMethods
