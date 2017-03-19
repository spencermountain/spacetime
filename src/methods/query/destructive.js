'use strict';
const quarters = require('../../lib/quarters');
const seasons = require('../../lib/seasons');
const set = require('./set');
//destructive setters change the seconds, milliseconds, etc
//- not just the unit they're setting

const clearMinutes = function(s) {
  s.minute(0);
  s.second(0);
  s.millisecond(1);
};

module.exports = {

  //since the start of the year
  week: function(num) {
    if (num !== undefined) {
      this.month(0);
      this.date(1);
      this.day(1); //monday
      clearMinutes(this);
      num -= 1; //1-based
      this.add(num, 'weeks');
      return this;
    }
    //find-out which week it is
    let tmp = this.clone();
    tmp.month(0);
    tmp.date(1);
    clearMinutes(tmp);
    tmp.day(1); //monday
    const thisOne = this.epoch;
    //if the week technically hasn't started yet
    if (tmp.epoch > thisOne) {
      return 1;
    }
    for(let i = 0; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i;
      }
      tmp.add(1, 'week');
    }
    return 52;
  },

  quarter: function(num) {
    if (num !== undefined && quarters[num]) {
      let month = quarters[num][0];
      this.month(month);
      this.date(1);
      this.hour(0);
      clearMinutes(this);
      return this;
    }
    let month = this.d.getMonth();
    for(let i = 1; i < quarters.length; i++) {
      if (month < quarters[i][0]) {
        return i - 1;
      }
    }
    return 4;
  },

  //'3:30' is 3.5
  hourFloat: function(num) {
    if (num !== undefined) {
      let minute = (num % 1);
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
    if (input !== undefined) {
      for(let i = 0; i < seasons.length; i++) {
        if (input === seasons[i][0]) {
          this.month(seasons[i][1]);
          this.date(1);
          this.hour(0);
          clearMinutes(this);
        }
      }
      return this;
    }
    let month = this.d.getMonth();
    for(let i = 0; i < seasons.length - 1; i++) {
      if (month >= seasons[i][1] && month < seasons[i + 1][1]) {
        return seasons[i][0];
      }
    }
    return 'winter';
  },


  emoji: function() {
    const obj = {
      seasons : {
        spring: '🌱',
        winter: '⛄',
        summer: '☀️️',
        fall: '🍂',
      },
      times : {
        breakfast: '🍳',
        morning: '☕',
        noon: '🌞',
        lunch: '🎒',
        afternoon: '🌤️',
        dinner: '🍽️',
        evening: '🌆',
        night: '🛌',
      }
    };
    return {
      time: obj.times[this.timeOfDay()] || '',
      season: obj.seasons[this.season()] || '',
    };
  }
};
