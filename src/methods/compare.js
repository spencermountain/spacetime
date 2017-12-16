import fns from '../fns'

export function addMethods(SpaceTime) {
  const methods = {
    isAfter: function(d) {
      let epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch > epoch;
    },
    isBefore: function(d) {
      let epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch < epoch;
    },
    isEqual: function(d) {
      let epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch === epoch;
    },
    isBetween: function(start, end) {
      let startEpoch = fns.getEpoch(start);
      if (startEpoch === null) {
        return null;
      }
      let endEpoch = fns.getEpoch(end);
      if (endEpoch === null) {
        return null;
      }
      return (startEpoch < this.epoch) && (this.epoch < endEpoch);
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  });
};
