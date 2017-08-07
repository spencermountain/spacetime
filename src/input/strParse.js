'use strict';
const walkTo = require('../methods/set/walk');
const months = require('../data/months');

const parseHour = function(s, str) {
  str = str.replace(/^\s+/, ''); //trim
  let arr = str.match(
    /([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/
  );
  if (arr) {
    s.hour(arr[1]);
    s.minute(arr[2]);
    if (arr[3]) {
      s.seconds(arr[3]);
    }
    if (arr[4]) {
      s.millisecond(arr[4]);
    }
  }
};

const strFmt = [
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})T([0-9:-\\.]+)(Z|[0-9\-\+]+)?$/,
    parse: (s, arr) => {
      let month = parseInt(arr[2], 10) - 1;
      walkTo(s, {
        year: arr[1],
        month: month,
        date: arr[3],
      });
      parseHour(s, arr[4]);
    },
  },
  //iso "2015-03-25" or "2015/03/25" //0-based-months!
  {
    reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
    parse: (s, arr) => {
      let month = parseInt(arr[2], 10) - 1;
      walkTo(s, {
        year: arr[1],
        month: month,
        date: arr[3],
      });
    },
  },
  //short - uk "03/25/2015"  //0-based-months!
  {
    reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]([0-9]{4})$/,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1;
      walkTo(s, {
        year: arr[3],
        month: month,
        date: arr[2],
      });
    },
  },
  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2}),? ([0-9]{4})( ([0-9:]+))?$/i,
    parse: (s, arr) => {
      let month = months.mapping[arr[1].toLowerCase()];
      walkTo(s, {
        year: arr[3],
        month: month,
        date: arr[2],
      });
      if (arr[4]) {
        parseHour(s, arr[4]);
      }
    },
  },
  //Long "25 Mar 2015"
  {
    reg: /^([0-9]{1,2}) ([a-z]+),? ([0-9]{4})$/i,
    parse: (s, arr) => {
      let month = months.mapping[arr[2].toLowerCase()];
      walkTo(s, {
        year: arr[3],
        month: month,
        date: arr[1],
      });
    },
  },
];

module.exports = strFmt;
