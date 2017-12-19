import {isObject, isArray} from '../helpers'
import days from '../data/days'
import months from '../data/months'

export function addMethods(SpaceTime) {
  const methods = {
    i18n: function(data) {
      if (
        !isObject(data) ||
        !isObject(data.days) ||
        !isObject(data.months) ||
        !isArray(data.days.short) ||
        !isArray(data.days.long) ||
        !isArray(data.months.short) ||
        !isArray(data.months.long)
      ) {
        throw new Error('Invalid i18n payload passed.');
      }
      days.set(data.days);
      months.set(data.months);
    },
  };

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  });
};
