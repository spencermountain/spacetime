'use strict';
const walkTo = require('./set/walk');
const ms = require('../data/milliseconds');
const monthLength = require('../data/monthLengths');
const fns = require('../fns');

const order = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
let keep = {
  second: order.slice(0, 1),
  minute: order.slice(0, 2),
  quarterhour: order.slice(0, 2),
  hour: order.slice(0, 3),
  date: order.slice(0, 4),
  month: order.slice(0, 4),
  quarter: order.slice(0, 4),
  season: order.slice(0, 4),
  year: order,
  decade: order,
  century: order,
};
keep.week = keep.date;
keep.season = keep.date;
keep.quarter = keep.date;

const keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true
};
//month is the only thing we 'model/compute'
//- because ms-shifting can be off by enough
const rollMonth = function(want, old) {
  //increment year
  if (want.month > 0) {
    let years = parseInt(want.month / 12, 10);
    want.year = old.year() + years;
    want.month = want.month % 12;
  } else if (want.month < 0) {
    //decrement year
    let years = Math.floor(Math.abs(want.month) / 13, 10);
    years = Math.abs(years) + 1;
    want.year = old.year() - years;
    //ignore extras
    want.month = want.month % 12;
    want.month = want.month + 12;
    if (want.month === 12) {
      want.month = 0;
    }
  }
  return want;
};

const addMethods = SpaceTime => {
  SpaceTime.prototype.add = function(num, unit) {
    let s = this.clone()
    if (!unit) {
      return s //don't bother
    }
    let old = this.clone()
    unit = fns.normalize(unit);
    //move forward by the estimated milliseconds (rough)
    if (ms[unit]) {
      s.epoch += ms[unit] * num;
    } else if (unit === 'week') {
      s.epoch += ms.day * (num * 7);
    } else if (unit === 'quarter' || unit === 'season') {
      s.epoch += ms.month * (num * 4);
    } else if (unit === 'season') {
      s.epoch += ms.month * (num * 4);
    } else if (unit === 'quarterhour') {
      s.epoch += ms.minute * 15;
    }
    //now ensure our milliseconds/etc are in-line
    let want = {};
    if (keep[unit]) {
      keep[unit].forEach(u => {
        want[u] = old[u]();
      });
    }
    //ensure month/year has ticked-over
    if (unit === 'month') {
      want.month = old.month() + num;
      //month is the one unit we 'model' directly
      want = rollMonth(want, old);
    }
    //support 25-hour day-changes on dst-changes
    else if (unit === 'date') {
      //specify a naive date number, if it's easy to do...
      let sum = old.date() + num
      if (sum <= 28 && sum > 1) {
        want.date = sum
      }
      //or if we haven't moved at all..
      else if (num !== 0 && old.isSame(s, 'day')) {
        want.date = old.date() + num;
      }
    }
    //ensure year has changed (leap-years)
    else if (unit === 'year' && s.year() === old.year()) {
      s.epoch += ms.week;
    }
    //these are easier
    else if (unit === 'decade') {
      want.year = s.year() + 10
    } else if (unit === 'century') {
      want.year = s.year() + 100
    }
    //keep current date, unless the month doesn't have it.
    if (keepDate[unit]) {
      let max = monthLength[want.month];
      want.date = old.date();
      if (want.date > max) {
        want.date = max;
      }
    }
    walkTo(s, want);
    return s;
  };

  //subtract is only add *-1
  SpaceTime.prototype.subtract = function(num, unit) {
    let s = this.clone()
    return s.add(num * -1, unit);
  };
  //add aliases
  SpaceTime.prototype.minus = SpaceTime.prototype.subtract
  SpaceTime.prototype.plus = SpaceTime.prototype.add
};

module.exports = addMethods;
