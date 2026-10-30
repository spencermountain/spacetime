import { beADate, getEpoch } from '../fns.ts'

const validEpoch = epoch => Number.isFinite(epoch) && !isNaN(new Date(epoch).getTime())

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

export default methods
