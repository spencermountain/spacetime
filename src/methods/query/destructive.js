'use strict';
const quarters = require('../../data/quarters');
const seasons = require('../../data/seasons');
const set = require('../set/set');
//destructive setters change the seconds, milliseconds, etc
//- and not just the unit they're setting

const clearMinutes = function(s) {
  s.minute(0);
  s.second(0);
  s.millisecond(1);
};

module.exports = {
  //some ambiguity here with 12/24h
  time: function(str) {
    if (str !== undefined) {
      this.epoch = set.time(this, str);
      return this;
    }
    return this.format('time-h12');
  },

  //since the start of the year
  week: function(num) {
    if (num !== undefined) {
      this.month(0);
      this.date(1);
      this.day('monday');
      clearMinutes(this);
      //don't go into last-year
      if (this.monthName() === 'december') {
        this.add(1, 'week');
      }
      num -= 1; //1-based
      this.add(num, 'weeks');
      return this;
    }
    //find-out which week it is
    let tmp = this.clone();
    tmp.month(0);
    tmp.date(1);
    clearMinutes(tmp);
    tmp.day('monday');
    //don't go into last-year
    if (tmp.monthName() === 'december') {
      tmp.add(1, 'week');
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
      tmp.add(1, 'week');
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
        let month = quarters[num][0];
        this.month(month);
        this.date(1);
        this.hour(0);
        clearMinutes(this);
        return this;
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
      let minute = num % 1;
      minute = minute * 60;
      let hour = parseInt(num, 10);
      this.epoch = set.hours(this, hour);
      this.epoch = set.minutes(this, minute);
      return this;
    }
    let d = this.d;
    let hour = d.getHours();
    let minute = d.getMinutes();
    minute = minute / 60;
    return hour + minute;
  },

  season: function(input) {
    let hem = 'north';
    if (this.timezone().hemisphere === 'South') {
      hem = 'south';
    }
    if (input !== undefined) {
      for (let i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          this.month(seasons[hem][i][1]);
          this.date(1);
          this.hour(0);
          clearMinutes(this);
        }
      }
      return this;
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
