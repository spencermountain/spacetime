'use strict';
const walkTo = require('./set/walk');
const ms = require('../data/milliseconds');
const monthLength = require('../data/monthLength');


const normalize = (str) => {
  str = str.toLowerCase();
  str = str.replace(/s$/, '');
  if (str === 'day') {
    return 'date';
  }
  return str;
};

let keep = {
  second: ['millisecond'],
  minute: ['millisecond', 'second'],
  hour: ['millisecond', 'second', 'minute'],
  date: ['millisecond', 'second', 'minute', 'hour'],
  month: ['millisecond', 'second', 'minute', 'hour'],
  year: ['millisecond', 'second', 'minute', 'hour', 'date', 'month'],
};
keep.week = keep.date;
keep.season = keep.date;
keep.quarter = keep.date;

const addMethods = (Space) => {

  const methods = {

    add: function(num, unit) {
      let old = this.clone();
      unit = normalize(unit);
      //move forward by the estimated milliseconds (rough)
      if (ms[unit]) {
        this.epoch += ms[unit] * num;
      } else if (unit === 'week') {
        this.epoch += ms.day * (num * 7);
      } else if (unit === 'quarter' || unit === 'season') {
        this.epoch += ms.month * (num * 4);
      } else if (unit === 'season') {
        this.epoch += ms.month * (num * 4);
      }
      //now ensure our milliseconds/etc are in-line
      let want = {};
      if (keep[unit]) {
        keep[unit].forEach((u) => {
          want[u] = old[u]();
        });
      }
      //ensure month/year has ticked-over
      if (unit === 'month') {
        want.month = old.month() + num;
        //roll-over to year
        want.year = old.year();
        want.year += parseInt(want.month / 12, 10);
        want.month = want.month % 12;
        //special-case for month, keeping dates
        let max = monthLength[old.month()];
        want.date = old.date();
        if (want.date > max) {
          want.date = max;
        }
      }
      // console.log(want);
      walkTo(this, want);
      return this;
    },

    subtract: function(num, unit) {
      this.add(num * -1, unit);
      return this;
    },
  };

  //hook them into proto
  Object.keys(methods).forEach((k) => {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;
