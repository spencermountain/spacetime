'use strict';
const set = require('../set/set');
const walkTo = require('../set/walk');

//the most basic get/set methods
let methods = {
  millisecond: function(num) {
    if (num !== undefined) {
      this.epoch = set.milliseconds(this, num);
      return this;
    }
    return this.d.getMilliseconds();
  },
  second: function(num) {
    if (num !== undefined) {
      this.epoch = set.seconds(this, num);
      return this;
    }
    return this.d.getSeconds();
  },
  minute: function(num) {
    if (num !== undefined) {
      this.epoch = set.minutes(this, num);
      return this;
    }
    return this.d.getMinutes();
  },
  hour: function(num) {
    let d = this.d;
    if (num !== undefined) {
      this.epoch = set.hours(this, num);

      walkTo(this, {
        hour: num
      });

      return this;
    }
    return d.getHours();
  },
  hour12: function(str) {
    let d = this.d;
    if (str !== undefined) {
      str = '' + str;
      let m = str.match(/^([0-9]+)(am|pm)$/);
      if (m) {
        let hour = parseInt(m[1], 10);
        if (m[2] === 'pm') {
          hour += 12;
        }
        this.epoch = set.hours(this, hour);
      }
      return this;
    }
    //get the hour
    let hour12 = d.getHours();
    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }
    if (hour12 === 0) {
      hour12 = 12;
    }
    return hour12;
  },

  date: function(num) {
    if (num !== undefined) {
      this.epoch = set.date(this, num);
      return this;
    }
    return this.d.getDate();
  },
  month: function(input) {
    if (input !== undefined) {
      this.epoch = set.month(this, input);
      return this;
    }
    return this.d.getMonth();
  },
  year: function(num) {
    if (num !== undefined) {
      this.epoch = set.year(this, num);
      return this;
    }
    return this.d.getFullYear();
  },
  dayTime: function(str) {
    if (str !== undefined) {
      const times = {
        morning: '7:00am',
        breakfast: '7:00am',
        noon: '12:00am',
        lunch: '12:00pm',
        afternoon: '2:00pm',
        evening: '6:00pm',
        dinner: '6:00pm',
        night: '11:00pm',
        midnight: '23:59pm',
      };
      str = str || '';
      str = str.toLowerCase();
      if (times[str]) {
        this.time(times[str]);
      }
      return this;
    }
    let h = this.hour();
    if (h < 6) {
      return 'night';
    }
    if (h < 12) {
      //until noon
      return 'morning';
    }
    if (h < 17) {
      //until 5pm
      return 'afternoon';
    }
    if (h < 22) {
      //until 10pm
      return 'evening';
    }
    return 'night';
  },
  dayOfYear: function(num) {
    if (num !== undefined) {
      this.epoch = set.dayOfYear(this, num);
      return this;
    }
    //days since newyears - jan 1st is 1, jan 2nd is 2...
    let sum = 0
    let month = this.d.getMonth();
    let tmp;
    //count the num days in each month
    for (let i = 1; i <= month; i++) {
      tmp = new Date();
      tmp.setDate(1)
      tmp.setYear(this.d.getFullYear()) //the year matters, because leap-years
      tmp.setHours(1)
      tmp.setMinutes(1)
      tmp.setMonth(i);
      tmp.setHours(-2); //the last day of the month
      sum += tmp.getDate();
    }
    return sum + this.d.getDate();
  },
  //bc/ad years
  era: function(str) {
    if (str !== undefined) {
      str = str.toLowerCase()
      //TODO: there is no year-0AD i think. may have off-by-1 error here
      let year = this.d.getFullYear()
      //make '1992' into 1992bc..
      if (str === 'bc' && year > 0) {
        this.epoch = set.year(this, year * -1);
      }
      //make '1992bc' into '1992'
      if (str === 'ad' && year < 0) {
        this.epoch = set.year(this, year * -1);
      }
      return this;
    }
    if (this.d.getFullYear() < 0) {
      return 'BC'
    }
    return 'AD'
  },

  //alias of 'since' but opposite - like moment.js
  from: function(d) {
    d = this.clone().set(d)
    return d.since(this)
  },
  fromNow: function() {
    let d = this.clone().set(Date.now())
    return d.since(this)
  }
};
//aliases
methods.milliseconds = methods.millisecond;
methods.seconds = methods.second;
methods.minutes = methods.minute;
methods.hours = methods.hour;
methods.hour24 = methods.hour;
methods.h12 = methods.hour12;
methods.h24 = methods.hour24;
methods.days = methods.day;

module.exports = methods;
