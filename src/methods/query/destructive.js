'use strict';
const quarters = require('../../data/quarters');
const seasons = require('../../data/seasons');
const set = require('../set/set');
const fns = require('../../fns');
//destructive setters change the seconds, milliseconds, etc
//- and not just the unit they're setting

const clearMinutes = s => {
  s = s.minute(0);
  s = s.second(0);
  s = s.millisecond(1);
  return s
};

module.exports = {
  //some ambiguity here with 12/24h
  time: function(str) {
    if (str !== undefined) {
      let s = this.clone()
      s.epoch = set.time(s, str);
      return s;
    }
    return `${this.h12()}:${fns.zeroPad(this.minute())}${this.ampm()}`;
  },

  //since the start of the year
  week: function(num) {
    if (num !== undefined) {
      let s = this.clone()
      s = s.month(0);
      s = s.date(1);
      s = s.day('monday');
      s = clearMinutes(s);
      //don't go into last-year
      if (s.monthName() === 'december') {
        s = s.add(1, 'week');
      }
      num -= 1; //1-based
      s = s.add(num, 'weeks');
      return s;
    }
    //find-out which week it is
    let tmp = this.clone();
    tmp = tmp.month(0);
    tmp = tmp.date(1);
    tmp = clearMinutes(tmp);
    tmp = tmp.day('monday');
    //don't go into last-year
    if (tmp.monthName() === 'december') {
      tmp = tmp.add(1, 'week');
    }
    const thisOne = this.epoch;
    //if the week technically hasn't started yet
    if (tmp.epoch > thisOne) {
      return 1;
    }
    for (let i = 0; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i;
      }
      tmp = tmp.add(1, 'week');
    }
    return 52;
  },

  quarter: function(num) {
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '');
        num = parseInt(num, 10);
      }
      if (quarters[num]) {
        let s = this.clone()
        let month = quarters[num][0];
        s = s.month(month);
        s = s.date(1);
        s = s.startOf('day')
        return s;
      }
    }
    let month = this.d.getMonth();
    for (let i = 1; i < quarters.length; i++) {
      if (month < quarters[i][0]) {
        return i - 1;
      }
    }
    return 4;
  },

  //'3:30' is 3.5
  hourFloat: function(num) {
    if (num !== undefined) {
      let s = this.clone()
      let minute = num % 1;
      minute = minute * 60;
      let hour = parseInt(num, 10);
      s.epoch = set.hours(s, hour);
      s.epoch = set.minutes(s, minute);
      return s;
    }
    let d = this.d;
    let hour = d.getHours();
    let minute = d.getMinutes();
    minute = minute / 60;
    return hour + minute;
  },

  season: function(input) {
    let hem = 'north';
    if (this.hemisphere() === 'South') {
      hem = 'south';
    }
    if (input !== undefined) {
      let s = this.clone()
      for (let i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          s = s.month(seasons[hem][i][1]);
          s = s.date(1);
          s = s.startOf('day')
        }
      }
      return s;
    }
    let month = this.d.getMonth();
    for (let i = 0; i < seasons[hem].length - 1; i++) {
      if (month >= seasons[hem][i][1] && month < seasons[hem][i + 1][1]) {
        return seasons[hem][i][0];
      }
    }
    return 'winter';
  }
};
