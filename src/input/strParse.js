'use strict';
const walkTo = require('../methods/set/walk');
const months = require('../data/months').mapping()
const parseOffset = require('./parseOffset')
const hasDate = require('./hasDate')
const fns = require('../fns')
// const zones = require('../../data');

const parseHour = function(s, str = '') {
  str = str.replace(/^\s+/, ''); //trim
  let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/) || [];
  s = s.hour(arr[1] || 0);
  s = s.minute(arr[2] || 0);
  s = s.seconds(arr[3] || 0);
  s = s.millisecond(arr[4] || 0);
  return s
};

const parseYear = function(str) {
  str = str || ''
  //support '18 -> 2018
  // str = str.replace(/^'([0-9]{2})/, '20$1')
  // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')
  let year = parseInt(str.trim(), 10)
  year = year || new Date().getFullYear()
  return year
}

const strFmt = [
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
    parse: (s, arr, givenTz, options) => {
      let month = parseInt(arr[2], 10) - 1;
      let obj = {
        year: arr[1],
        month: month,
        date: arr[3]
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      parseOffset(s, arr[5], givenTz, options);
      walkTo(s, obj);
      s = parseHour(s, arr[4]);
      return s
    }
  },
  //iso "2015-03-25" or "2015/03/25" //0-based-months!
  {
    reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
    parse: (s, arr) => {
      let obj = {
        year: arr[1],
        month: parseInt(arr[2], 10) - 1,
        date: parseInt(arr[3], 10)
      }
      if (obj.month >= 12) { //support yyyy/dd/mm (weird, but ok)
        obj.date = parseInt(arr[2], 10)
        obj.month = parseInt(arr[3], 10) - 1
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj);
      s = parseHour(s);
      return s
    }
  },
  //short - uk "03/25/2015"  //0-based-months!
  {
    reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1;
      let date = parseInt(arr[2], 10)
      if (month >= 12) { //support yyyy/dd/mm (weird, but ok)
        month = parseInt(arr[2], 10) - 1;
        date = parseInt(arr[1], 10)
      }
      let year = arr[3] || new Date().getFullYear()
      let obj = {
        year: year,
        month: month,
        date: date
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj);
      s = parseHour(s);
      return s
    }
  },
  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+))?$/i,
    parse: (s, arr) => {
      let month = months[arr[1].toLowerCase()];
      let year = parseYear(arr[3])
      let obj = {
        year: year,
        month: month,
        date: fns.toCardinal(arr[2] || '')
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj);
      s = parseHour(s, arr[4]);
      return s
    }
  },
  //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      let month = months[arr[1].toLowerCase()];
      let year = parseYear(arr[2])
      let obj = {
        year: year,
        month: month,
        date: 1
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj);
      s = parseHour(s, arr[4]);
      return s
    }
  },
  //Long "25 Mar 2015"
  {
    reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      let month = months[arr[2].toLowerCase()];
      let year = parseYear(arr[3])
      let obj = {
        year: year,
        month: month,
        date: fns.toCardinal(arr[1]),
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj);
      s = parseHour(s);
      return s
    }
  },
  { // '1992'
    reg: /^[0-9]{4}$/i,
    parse: (s, arr) => {
      let year = parseYear(arr[0])
      let d = new Date()
      let obj = {
        year: year,
        month: d.getMonth(),
        date: d.getDate()
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj);
      s = parseHour(s);
      return s
    }
  },
  { // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (s, arr) => {
      let str = arr[0] || ''
      //make negative-year
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1')
      //remove commas
      str = str.replace(/,/g, '')
      let year = parseInt(str.trim(), 10)
      let d = new Date()
      let obj = {
        year: year,
        month: d.getMonth(),
        date: d.getDate()
      }
      if (hasDate(obj) === false) {
        s.epoch = null
        return s
      }
      walkTo(s, obj);
      s = parseHour(s);
      return s
    }
  }
];

module.exports = strFmt;
