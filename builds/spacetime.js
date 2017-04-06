/* @smallwins/spacetime v0.0.12
  
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetime = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var zonefile = _dereq_('./zonefile.2017.json');

//compress timezone data by continent
var unpack = function unpack(obj) {
  var all = {};
  var keys = Object.keys(obj);
  keys.forEach(function (cont) {
    var cities = Object.keys(obj[cont]);
    cities.forEach(function (city) {
      var tz = cont + '/' + city;
      all[tz] = obj[cont][city];
      if (typeof all[tz] === 'number') {
        all[tz] = {
          o: all[tz]
        };
      }
      all[tz].tz = tz;
    });
  });
  //alias this one
  all.UTC = all['Etc/UTC'];
  return all;
};

var data = unpack(zonefile);
console.log(data);
module.exports = data;

},{"./zonefile.2017.json":2}],2:[function(_dereq_,module,exports){
module.exports={
  "Africa": {
    "Algiers": 60,
    "Cairo": 120,
    "Casablanca": {
      "o": 60,
      "hem": "n",
      "dst": "6/2/3 -> 9/29/2"
    },
    "Harare": 120,
    "Monrovia": 0
  },
  "Asia": {
    "Kabul": 270,
    "Karachi": 300,
    "Katmandu": 345,
    "Kolkata": 330,
    "Krasnoyarsk": 420,
    "Kuala_Lumpur": 480,
    "Kuwait": 180,
    "Magadan": 600,
    "Muscat": 240,
    "Novosibirsk": 360,
    "Pyongyang": 540,
    "Rangoon": 390,
    "Sakhalin": 600,
    "Seoul": 540,
    "Srednekolymsk": 660,
    "Taipei": 480,
    "Tashkent": 300,
    "Tbilisi": 240,
    "Tehran": {
      "o": 270,
      "hem": "n",
      "dst": "2/22/1 -> 8/21/23"
    },
    "Tokyo": 540,
    "Ulaanbaatar": {
      "o": 480,
      "hem": "n",
      "dst": "2/25/3 -> 8/29/23"
    },
    "Vladivostok": 600,
    "Yakutsk": 540,
    "Yekaterinburg": 300,
    "Yerevan": 240
  },
  "Atlantic": {
    "Azores": {
      "o": 0,
      "hem": "n",
      "dst": "2/26/1 -> 9/29/0"
    },
    "Cape_Verde": -60
  },
  "Australia": {
    "Adelaide": {
      "o": 570,
      "hem": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Brisbane": 600,
    "Canberra": {
      "o": 600,
      "hem": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Darwin": 570,
    "Eucla": 525,
    "Hobart": {
      "o": 600,
      "hem": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Lord_Howe": {
      "o": 630,
      "hem": "s",
      "dst": "9/1/2 -> 3/2/1"
    },
    "Perth": 480
  },
  "Europe": {
    "Amsterdam": {
      "o": 120,
      "hem": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Athens": {
      "o": 180,
      "hem": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Belgrade": {
      "o": 120,
      "hem": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Brussels": {
      "o": 120,
      "hem": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Helsinki": {
      "o": 180,
      "hem": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Kaliningrad": 120,
    "London": {
      "o": 60,
      "hem": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Minsk": 180,
    "Moscow": 180,
    "Samara": 240,
    "Warsaw": {
      "o": 120,
      "hem": "n",
      "dst": "2/26/3 -> 9/29/2"
    }
  },
  "Indian": {
    "Mauritius": 240
  },
  "Pacific": {
    "Apia": {
      "o": 780,
      "hem": "s",
      "dst": "8/24/4 -> 3/2/3"
    },
    "Auckland": {
      "o": 720,
      "hem": "s",
      "dst": "8/24/3 -> 3/2/2"
    },
    "Chatham": {
      "o": 765,
      "hem": "s",
      "dst": "8/24/3 -> 3/2/2"
    },
    "Easter": {
      "o": -300,
      "hem": "s",
      "dst": "7/12/23 -> 4/13/21"
    },
    "Fiji": {
      "o": 720,
      "hem": "s",
      "dst": "10/5/3 -> 0/15/2"
    },
    "Guadalcanal": 660,
    "Guam": 600,
    "Honolulu": -600,
    "Kiritimati": 840,
    "Marquesas": -570,
    "Midway": -660,
    "Norfolk": 690,
    "Noumea": 660,
    "Tongatapu": {
      "o": 780,
      "hem": "s",
      "dst": "10/5/3 -> 0/15/2"
    }
  }
}
},{}],3:[function(_dereq_,module,exports){
module.exports={
  "name": "@smallwins/spacetime",
  "version": "0.0.12",
  "description": "represent dates in remote timezones",
  "main": "./builds/spacetime.js",
  "license": "UNLICENSED",
  "scripts": {
    "build": "node ./scripts/build.js",
    "demo": "node ./scripts/demo.js",
    "watch": "node ./scripts/watch.js",
    "test": "./node_modules/tape/bin/tape ./test/**/*.test.js | ./node_modules/tap-spec/bin/cmd.js",
    "coverage": "node ./scripts/coverage.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/smallwins/spacetime.git"
  },
  "files": [
    "builds/"
  ],
  "dependencies": {},
  "devDependencies": {
    "babel-preset-es2015": "6.9.0",
    "babel-preset-stage-2": "^6.11.0",
    "babelify": "7.3.0",
    "browserify": "13.0.1",
    "derequire": "^2.0.3",
    "eslint": "^3.1.1",
    "gaze": "^1.1.1",
    "nyc": "^8.4.0",
    "shelljs": "^0.7.2",
    "tap-spec": "4.1.1",
    "tape": "4.6.0",
    "timekeeper": "^1.0.0",
    "uglify-js": "2.7.0"
  }
}

},{}],4:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  breakfast: 8,
  morning: 9,
  noon: 12,
  lunch: 13,
  afternoon: 14,
  dinner: 18,
  supper: 18,
  evening: 19,
  night: 20
};

},{}],5:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  short: ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'],
  long: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
};

},{}],6:[function(_dereq_,module,exports){
'use strict';

var o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e+6; // dst is supported post-hoc
o.day = 8.64e+7;
o.date = 8.64e+7;
o.month = 8.64e+7 * 29.5; //(average)
o.week = 6.048e+8;
o.year = 3.154e+10; // leap-years are supported post-hoc
//add plurals
Object.keys(o).forEach(function (k) {
  o[k + 's'] = o[k];
});
module.exports = o;

},{}],7:[function(_dereq_,module,exports){
"use strict";

module.exports = [31, //January - 31 days
28, //February - 28 days in a common year and 29 days in leap years
31, //March - 31 days
30, //April - 30 days
31, //May - 31 days
30, //June - 30 days
31, //July - 31 days
31, //August - 31 days
30, //September - 30 days
31, //October - 31 days
30, //November - 30 days
31];

},{}],8:[function(_dereq_,module,exports){
'use strict';

var shortMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
var longMonth = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

var obj = {
  'sep': 8
};
for (var i = 0; i < shortMonth.length; i++) {
  obj[shortMonth[i]] = i;
}
for (var _i = 0; _i < longMonth.length; _i++) {
  obj[longMonth[_i]] = _i;
}

module.exports = {
  short: shortMonth,
  long: longMonth,
  mapping: obj
};

},{}],9:[function(_dereq_,module,exports){
"use strict";

module.exports = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1]];

},{}],10:[function(_dereq_,module,exports){
'use strict';

//https://www.timeanddate.com/calendar/aboutseasons.html
//northern hemisphere hard-coded for now (eep!)

// Spring - from March 1 to May 31;
// Summer - from June 1 to August 31;
// Fall (autumn) - from September 1 to November 30; and,
// Winter - from December 1 to February 28 (February 29 in a leap year).
module.exports = [['spring', 2, 1], //spring march 1
['summer', 5, 1], //june 1
['fall', 8, 1], //sept 1
['autumn', 8, 1], //sept 1
['winter', 11, 1]];

},{}],11:[function(_dereq_,module,exports){
'use strict';
//every computer is somewhere, and this effects their interpretation in the date object
//find the offset this computer has

var getBias = function getBias() {
  //get it with the new es6 Intl method
  // if (typeof Intl !== 'undefined') {
  //   let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // }
  var d = new Date();
  return d.getTimezoneOffset() || 0;
};
module.exports = getBias;

},{}],12:[function(_dereq_,module,exports){
'use strict';

var Spacetime = _dereq_('./spacetime');
var pkg = _dereq_('../package.json');

var main = function main(input, tz) {
  return new Spacetime(input, tz);
};

//some helper fns
main.now = function (tz) {
  return new Spacetime(new Date().getTime(), tz);
};
main.today = function (tz) {
  var s = new Spacetime(new Date().getTime(), tz);
  return s.startOf('day');
};
main.tomorrow = function (tz) {
  var s = new Spacetime(new Date().getTime(), tz);
  return s.add(1, 'day').startOf('day');
};
main.yesterday = function (tz) {
  var s = new Spacetime(new Date().getTime(), tz);
  return s.subtract(1, 'day').startOf('day');
};

//this is handy
main.version = pkg.version;

module.exports = main;

},{"../package.json":3,"./spacetime":32}],13:[function(_dereq_,module,exports){
'use strict';

var strFmt = _dereq_('./strParse');

//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

var isArray = function isArray(input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};
var isObject = function isObject(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
};
var isDate = function isDate(d) {
  return d instanceof Date && !isNaN(d.valueOf());
};

//support [2016, 03, 01] format
var handleArray = function handleArray(s, arr) {
  var units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
  for (var i = 0; i < arr.length; i++) {
    var unit = units[i];
    var num = arr[i] || 0;
    s[unit](num);
  }
  return s;
};
//support {year:2016, month:3} format
var handleObject = function handleObject(s, obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var unit = keys[i];
    if (s[unit] !== undefined) {
      var num = obj[unit] || 0;
      s[unit](num);
    }
  }
  return s;
};

//find the epoch from different input styles
var parseInput = function parseInput(s, input) {
  if (typeof input === 'number') {
    s.epoch = input;
    return;
  }
  //set tmp time
  s.epoch = Date.now();
  if (input === null || input === undefined) {
    return; //k, we're good.
  }
  //support input of Date() object
  if (isDate(input) === true) {
    s.epoch = input.getTime();
    return;
  }
  //support [2016, 03, 01] format
  if (isArray(input) === true) {
    handleArray(s, input);
    return;
  }
  //support {year:2016, month:3} format
  if (isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch;
      return;
    }
    handleObject(s, input);
    return;
  }
  if (typeof input !== 'string') {
    return;
  }

  for (var i = 0; i < strFmt.length; i++) {
    var m = input.match(strFmt[i].reg);
    if (m) {
      strFmt[i].parse(s, m);
      return;
    }
  }
  s.epoch = null;
  return;
};
module.exports = parseInput;

},{"./strParse":14}],14:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('../methods/set/walk');
var months = _dereq_('../data/months');

var parseHour = function parseHour(s, str) {
  str = str.replace(/^\s+/, ''); //trim
  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?:?([0-9]{1,4})?/);
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

var strFmt = [
//iso-this 1998-05-30T22:00:00:000Z
{
  reg: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})T([0-9:]+)Z$/,
  parse: function parse(s, arr) {
    var month = parseInt(arr[2], 10) - 1;
    walkTo(s, {
      year: arr[1],
      month: month,
      date: arr[3]
    });
    parseHour(s, arr[4]);
  }
},
//iso "2015-03-25" or "2015/03/25" //0-based-months!
{
  reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
  parse: function parse(s, arr) {
    var month = parseInt(arr[2], 10) - 1;
    walkTo(s, {
      year: arr[1],
      month: month,
      date: arr[3]
    });
  }
},
//short - uk "03/25/2015"  //0-based-months!
{
  reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]([0-9]{4})$/,
  parse: function parse(s, arr) {
    var month = parseInt(arr[1], 10) - 1;
    walkTo(s, {
      year: arr[3],
      month: month,
      date: arr[2]
    });
  }
},
//Long "Mar 25 2015"
//February 22, 2017 15:30:00
{
  reg: /^([a-z]+) ([0-9]{1,2}),? ([0-9]{4})( ([0-9:]+))?$/i,
  parse: function parse(s, arr) {
    var month = months.mapping[arr[1].toLowerCase()];
    walkTo(s, {
      year: arr[3],
      month: month,
      date: arr[2]
    });
    if (arr[4]) {
      parseHour(s, arr[4]);
    }
  }
},
//Long "25 Mar 2015"
{
  reg: /^([0-9]{1,2}) ([a-z]+),? ([0-9]{4})$/i,
  parse: function parse(s, arr) {
    var month = months.mapping[arr[2].toLowerCase()];
    walkTo(s, {
      year: arr[3],
      month: month,
      date: arr[1]
    });
  }
}];

module.exports = strFmt;

},{"../data/months":8,"../methods/set/walk":30}],15:[function(_dereq_,module,exports){
'use strict';

//days since newyears - jan 1st is 1, jan 2nd is 2...

var dayOfYear = function dayOfYear(d) {
  var sum = 0;
  var month = d.getMonth();
  var tmp = void 0;
  for (var i = 0; i < month; i++) {
    tmp = new Date();
    tmp.setMonth(i);
    tmp.setDate(1);
    tmp.setHours(-2);
    sum += tmp.getDate();
  }
  return sum + d.getDate();
};

module.exports = dayOfYear;

},{}],16:[function(_dereq_,module,exports){
'use strict';

function zeroPad(str, len) {
  len = len || 2;
  var pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
}

function titleCase(str) {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

function ordinal(i) {
  var j = i % 10;
  var k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
}

module.exports = {
  zeroPad: zeroPad,
  titleCase: titleCase,
  ordinal: ordinal
};

},{}],17:[function(_dereq_,module,exports){
'use strict';

exports.isDate = function (d) {
  return Object.prototype.toString.call(d) === '[object Date]';
};

exports.getEpoch = function (tmp) {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp;
  }
  //suport date objects
  if (exports.isDate(tmp)) {
    return tmp.getTime();
  }
  if (tmp.epoch) {
    return tmp.epoch;
  }
  return null;
};

},{}],18:[function(_dereq_,module,exports){
'use strict';

var _format = _dereq_('./methods/format');
var _progress = _dereq_('./methods/progress');
var _diff = _dereq_('./methods/diff');
var ends = _dereq_('./methods/startOf');
var _timezone = _dereq_('./timezone/index');
var handleInput = _dereq_('./input');

//its instance methods
module.exports = {
  set: function set(input) {
    handleInput(this, input);
    return this;
  },
  timezone: function timezone() {
    return _timezone(this);
  },
  format: function format() {
    return _format(this);
  },
  startOf: function startOf(unit) {
    return ends.startOf(this, unit);
  },
  endOf: function endOf(unit) {
    return ends.endOf(this, unit);
  },
  leapYear: function leapYear() {
    var year = this.year();
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  },
  progress: function progress() {
    return _progress(this);
  },
  diff: function diff(d, unit) {
    return _diff(this, d, unit);
  },
  isValid: function isValid() {
    return !isNaN(this.d.getTime());
  },
  //travel to this timezone
  goto: function goto(tz) {
    this.tz = tz; //science!
    return this;
  },

  //pretty-printing
  log: function log() {
    console.log('');
    console.log(_format(this).nice.short);
    return this;
  },
  logYear: function logYear() {
    console.log('');
    console.log(_format(this).date.short + ' ' + this.year());
    return this;
  }
};

},{"./input":13,"./methods/diff":21,"./methods/format":22,"./methods/progress":23,"./methods/startOf":31,"./timezone/index":34}],19:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('./set/walk');
var ms = _dereq_('../data/milliseconds');
var monthLength = _dereq_('../data/monthLength');

var normalize = function normalize(str) {
  str = str.toLowerCase();
  str = str.replace(/s$/, '');
  if (str === 'day') {
    return 'date';
  }
  return str;
};

var keep = {
  second: ['millisecond'],
  minute: ['millisecond', 'second'],
  hour: ['millisecond', 'second', 'minute'],
  date: ['millisecond', 'second', 'minute', 'hour'],
  month: ['millisecond', 'second', 'minute', 'hour'],
  quarter: ['millisecond', 'second', 'minute', 'hour'],
  season: ['millisecond', 'second', 'minute', 'hour'],
  year: ['millisecond', 'second', 'minute', 'hour', 'date', 'month']
};
keep.week = keep.date;
keep.season = keep.date;
keep.quarter = keep.date;

var keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true
};
//month is the only thing we 'model/compute'
//- because ms-shifting can be off by enough
var rollMonth = function rollMonth(want, old) {
  //increment year
  if (want.month > 0) {
    var years = parseInt(want.month / 12, 10);
    want.year = old.year() + years;
    want.month = want.month % 12;
  } else if (want.month < 0) {
    //decrement year
    var _years = Math.floor(Math.abs(want.month) / 13, 10);
    _years = Math.abs(_years) + 1;
    want.year = old.year() - _years;
    //ignore extras
    want.month = want.month % 12;
    want.month = want.month + 12;
    if (want.month === 12) {
      want.month = 0;
    }
  }
  return want;
};

var addMethods = function addMethods(SpaceTime) {

  SpaceTime.prototype.add = function (num, unit) {
    var old = this.clone();
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
    var want = {};
    if (keep[unit]) {
      keep[unit].forEach(function (u) {
        want[u] = old[u]();
      });
    }
    //ensure month/year has ticked-over
    if (unit === 'month') {
      want.month = old.month() + num;
      //month is the one unit we 'model' directly
      want = rollMonth(want, old);
    }
    //ensure year has changed (leap-years)
    if (unit === 'year' && this.year() === old.year()) {
      this.epoch += ms.week;
    }

    //keep current date, unless the month doesn't have it.
    if (keepDate[unit]) {
      var max = monthLength[want.month];
      want.date = old.date();
      if (want.date > max) {
        want.date = max;
      }
    }
    walkTo(this, want);
    return this;
  };

  SpaceTime.prototype.subtract = function (num, unit) {
    this.add(num * -1, unit);
    return this;
  };
};

module.exports = addMethods;

},{"../data/milliseconds":6,"../data/monthLength":7,"./set/walk":30}],20:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../lib/fns');

var addMethods = function addMethods(SpaceTime) {

  var methods = {
    isAfter: function isAfter(d) {
      var epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch > epoch;
    },
    isBefore: function isBefore(d) {
      var epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch < epoch;
    },
    isEqual: function isEqual(d) {
      var epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch === epoch;
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../lib/fns":17}],21:[function(_dereq_,module,exports){
'use strict';
// const ms = require('../data/milliseconds');

//

var normalize = function normalize(str) {
  str = str.toLowerCase();
  str = str.replace(/s$/, '');
  if (str === 'day') {
    return 'date';
  }
  return str;
};

//increment until same
var climb = function climb(a, b, unit) {
  var i = 0;
  a = a.clone();
  while (a.isBefore(b)) {
    a.add(1, unit);
    i += 1;
  }
  if (!a.isSame(b, unit)) {
    i -= 1;
  }
  return i;
};

var diff = function diff(a, b, unit) {
  unit = normalize(unit);
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    //reverse it
    return climb(b, a, unit) * -1;
  }
};
module.exports = diff;

},{}],22:[function(_dereq_,module,exports){
'use strict';

var fmt = _dereq_('../lib/fmt');
var months = _dereq_('../data/months');
var days = _dereq_('../data/days');

//
var format = function format(s) {
  var year = s.year();
  var date = s.date();
  var month = s.month();
  var day = s.day();
  var minute = s.minute();
  var hour24 = s.hour();
  var hour12 = hour24;
  if (hour24 > 12) {
    hour12 = hour24 - 12;
  }
  if (hour12 === 0) {
    hour12 = 12;
  }
  var all = {
    numeric: {
      uk: fmt.zeroPad(date) + '/' + fmt.zeroPad(month) + '/' + year, //dd/mm/yyyy
      us: fmt.zeroPad(month) + '/' + fmt.zeroPad(date) + '/' + year },
    time: {
      h12: hour12 + ':' + fmt.zeroPad(minute) + s.ampm(), //3:45pm
      h24: hour24 + ':' + fmt.zeroPad(minute) //15:45
    },
    date: {
      ordinal: fmt.ordinal(date), //12th
      cardinal: '' + date, //12
      short: fmt.titleCase(months.short[month]) + ' ' + fmt.ordinal(date), //Apr 12
      long: fmt.titleCase(months.long[month]) + ' ' + fmt.ordinal(date) },
    year: {
      long: '' + year,
      short: '\'' + ('' + year).substr(2, 4)
    },
    iso: {
      short: year + '-' + fmt.zeroPad(month) + '-' + fmt.zeroPad(date), //2017-02-15
      local: year + '-' + fmt.zeroPad(month + 1) + '-' + fmt.zeroPad(date) + 'T' + hour24 + ':' + fmt.zeroPad(minute) + ':' + fmt.zeroPad(s.second()) + ':' + fmt.zeroPad(s.millisecond(), 3) + 'Z', //2017-03-08T19:45:28.367Z
      utc: new Date(s.epoch).toISOString() },
    day: {
      short: fmt.titleCase(days.short[day]), //wed
      long: fmt.titleCase(days.long[day]) },
    month: {
      short: fmt.titleCase(months.short[month]), //Sept
      long: fmt.titleCase(months.long[month]) }
  };
  all.nice = {
    short: fmt.titleCase(months.short[month]) + ' ' + fmt.ordinal(date) + ', ' + all.time.h12,
    long: all.day.long + ' ' + fmt.titleCase(months.long[month]) + ' ' + fmt.ordinal(date) + ', ' + all.time.h12
  };
  all.full = {
    short: fmt.titleCase(days.short[day]) + ' ' + fmt.titleCase(months.short[month]) + ' ' + fmt.ordinal(date) + ' ' + year + ', ' + all.time.h12,
    long: fmt.titleCase(days.long[day]) + ' ' + fmt.titleCase(months.long[month]) + ' ' + fmt.ordinal(date) + ' ' + year + ', ' + all.time.h12
  };
  return all;
};
module.exports = format;

},{"../data/days":5,"../data/months":8,"../lib/fmt":16}],23:[function(_dereq_,module,exports){
'use strict';
//how far it is along, from 0-1

var progress = function progress(s) {
  var units = ['year', 'season', 'quarter', 'month', 'week', 'day', 'hour', 'minute'];
  var obj = {};
  units.forEach(function (k) {
    var start = s.clone().startOf(k);
    var end = s.clone().endOf(k);
    var duration = end.epoch - start.epoch;
    var percent = (s.epoch - start.epoch) / duration;
    obj[k] = parseFloat(percent.toFixed(2));
  });
  return obj;
};

module.exports = progress;

},{}],24:[function(_dereq_,module,exports){
'use strict';

var quarters = _dereq_('../../data/quarters');
var seasons = _dereq_('../../data/seasons');
var set = _dereq_('../set/set');
//destructive setters change the seconds, milliseconds, etc
//- not just the unit they're setting

var clearMinutes = function clearMinutes(s) {
  s.minute(0);
  s.second(0);
  s.millisecond(1);
};

module.exports = {

  //some ambiguity here with 12/24h
  time: function time(str) {
    if (str !== undefined) {
      this.epoch = set.time(this, str);
      return this;
    }
    return this.format().time.h12;
  },

  //since the start of the year
  week: function week(num) {
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
    var tmp = this.clone();
    tmp.month(0);
    tmp.date(1);
    clearMinutes(tmp);
    tmp.day('monday');
    //don't go into last-year
    if (tmp.monthName() === 'december') {
      tmp.add(1, 'week');
    }
    var thisOne = this.epoch;
    //if the week technically hasn't started yet
    if (tmp.epoch > thisOne) {
      return 1;
    }
    for (var i = 0; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i;
      }
      tmp.add(1, 'week');
    }
    return 52;
  },

  quarter: function quarter(num) {
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '');
        num = parseInt(num, 10);
      }
      if (quarters[num]) {
        var _month = quarters[num][0];
        this.month(_month);
        this.date(1);
        this.hour(0);
        clearMinutes(this);
        return this;
      }
    }
    var month = this.d.getMonth();
    for (var i = 1; i < quarters.length; i++) {
      if (month < quarters[i][0]) {
        return i - 1;
      }
    }
    return 4;
  },

  //'3:30' is 3.5
  hourFloat: function hourFloat(num) {
    if (num !== undefined) {
      var _minute = num % 1;
      _minute = _minute * 60;
      var _hour = parseInt(num, 10);
      this.epoch = set.hours(this, _hour);
      this.epoch = set.minutes(this, _minute);
      return this;
    }
    var d = this.d;
    var hour = d.getHours();
    var minute = d.getMinutes();
    minute = minute / 60;
    return hour + minute;
  },

  season: function season(input) {
    if (input !== undefined) {
      for (var i = 0; i < seasons.length; i++) {
        if (input === seasons[i][0]) {
          this.month(seasons[i][1]);
          this.date(1);
          this.hour(0);
          clearMinutes(this);
        }
      }
      return this;
    }
    var month = this.d.getMonth();
    for (var _i = 0; _i < seasons.length - 1; _i++) {
      if (month >= seasons[_i][1] && month < seasons[_i + 1][1]) {
        return seasons[_i][0];
      }
    }
    return 'winter';
  },

  emoji: function emoji() {
    var obj = {
      seasons: {
        spring: '🌱',
        winter: '⛄',
        summer: '☀️️',
        fall: '🍂'
      },
      times: {
        breakfast: '🍳',
        morning: '☕',
        noon: '🌞',
        lunch: '🎒',
        afternoon: '🌤️',
        dinner: '🍽️',
        evening: '🌆',
        night: '🛌'
      }
    };
    return {
      time: obj.times[this.time()] || '',
      season: obj.seasons[this.season()] || ''
    };
  }
};

},{"../../data/quarters":9,"../../data/seasons":10,"../set/set":29}],25:[function(_dereq_,module,exports){
'use strict';

var normal = _dereq_('./normal');
var destructive = _dereq_('./destructive');
var tricky = _dereq_('./tricky');

var addMethods = function addMethods(Space) {
  //hook the methods into prototype
  Object.keys(normal).forEach(function (k) {
    Space.prototype[k] = normal[k];
  });
  Object.keys(destructive).forEach(function (k) {
    Space.prototype[k] = destructive[k];
  });
  Object.keys(tricky).forEach(function (k) {
    Space.prototype[k] = tricky[k];
  });
};

module.exports = addMethods;

},{"./destructive":24,"./normal":26,"./tricky":27}],26:[function(_dereq_,module,exports){
'use strict';

var set = _dereq_('../set/set');
var _dayOfYear = _dereq_('../../lib/dayOfYear');

//the most basic get/set methods
var methods = {

  millisecond: function millisecond(num) {
    if (num !== undefined) {
      this.epoch = set.milliseconds(this, num);
      return this;
    }
    return this.d.getMilliseconds();
  },
  second: function second(num) {
    if (num !== undefined) {
      this.epoch = set.seconds(this, num);
      return this;
    }
    return this.d.getSeconds();
  },
  minute: function minute(num) {
    if (num !== undefined) {
      this.epoch = set.minutes(this, num);
      return this;
    }
    return this.d.getMinutes();
  },
  hour: function hour(num) {
    var d = this.d;
    if (num !== undefined) {
      this.epoch = set.hours(this, num);
      return this;
    }
    return d.getHours();
  },
  date: function date(num) {
    if (num !== undefined) {
      this.epoch = set.date(this, num);
      return this;
    }
    return this.d.getDate();
  },
  month: function month(input) {
    if (input !== undefined) {
      this.epoch = set.month(this, input);
      return this;
    }
    return this.d.getMonth();
  },
  year: function year(num) {
    if (num !== undefined) {
      this.epoch = set.year(this, num);
      return this;
    }
    return this.d.getFullYear();
  },
  dayOfYear: function dayOfYear(num) {
    if (num !== undefined) {
      this.epoch = set.dayOfYear(this, num);
      return this;
    }
    return _dayOfYear(this.d);
  }

};
//aliases
methods.milliseconds = methods.millisecond;
methods.seconds = methods.second;
methods.minutes = methods.minute;
methods.hours = methods.hour;
methods.days = methods.day;

module.exports = methods;

},{"../../lib/dayOfYear":15,"../set/set":29}],27:[function(_dereq_,module,exports){
'use strict';

var days = _dereq_('../../data/days');
var dayTimes = _dereq_('../../data/dayTimes');
var months = _dereq_('../../data/months');
var set = _dereq_('../set/set');
var walkTo = _dereq_('../set/walk');

//non-destructive getters/setters with fancy moves to do
module.exports = {

  //
  // //this one's tricky
  // month: (s, n) => {
  //   n = validate(n);
  //   let old = s.clone();
  //   let diff = n - s.month();
  //   let shift = diff * ms.month;
  //   s.epoch += shift;
  //   confirm(s, old, 'date');
  //   return s.epoch;
  // },


  //like 'wednesday' (hard!)
  day: function day(input) {
    if (input === undefined) {
      return this.d.getDay();
    }
    var original = this.clone();
    var want = input;
    // accept 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days.short.indexOf(input);
      if (want === -1) {
        want = days.long.indexOf(input);
      }
    }
    //move approx
    var day = this.d.getDay();
    var diff = day - want;
    var s = this.subtract(diff * 24, 'hours');
    //tighten it back up
    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    this.epoch = s.epoch;
    return s;
  },

  ampm: function ampm(input) {
    var which = 'am';
    var hour = this.hour();
    if (hour >= 12) {
      which = 'pm';
    }
    if (input === undefined) {
      return which;
    }
    if (input === which) {
      return this;
    }
    if (input === 'am') {
      this.subtract(12, 'hours');
    } else {
      this.add(12, 'hours');
    }
    return this;
  },

  //these are helpful name-wrappers
  dayName: function dayName(input) {
    if (input === undefined) {
      return days.long[this.day()];
    }
    this.day(input);
    return this;
  },
  monthName: function monthName(input) {
    if (input === undefined) {
      return months.long[this.month()];
    }
    this.month(input);
    return this;
  }
};

},{"../../data/dayTimes":4,"../../data/days":5,"../../data/months":8,"../set/set":29,"../set/walk":30}],28:[function(_dereq_,module,exports){
'use strict';

var print = {
  second: function second(s) {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
  },
  minute: function minute(s) {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
  },
  hour: function hour(s) {
    return [s.year(), s.month(), s.date(), s.hour()].join('-');
  },
  day: function day(s) {
    return [s.year(), s.month(), s.date()].join('-');
  },
  week: function week(s) {
    return [s.year(), s.week()].join('-');
  },
  month: function month(s) {
    return [s.year(), s.month()].join('-');
  },
  quarter: function quarter(s) {
    return [s.year(), s.quarter()].join('-');
  },
  year: function year(s) {
    return s.year();
  }
};

var addMethods = function addMethods(SpaceTime) {
  SpaceTime.prototype.isSame = function (b, unit) {
    var a = this;
    if (typeof b === 'string' || typeof b === 'number') {
      b = new Space(b);
    }
    if (unit === 'millisecond' || unit === 'milliseconds') {
      return a.epoch === b.epoch;
    }
    if (unit === 'second' || unit === 'seconds') {
      return print.second(a) === print.second(b);
    }
    if (unit === 'minute' || unit === 'minutes') {
      return print.minute(a) === print.minute(b);
    }
    if (unit === 'hour' || unit === 'hours') {
      return print.hour(a) === print.hour(b);
    }
    if (unit === 'day' || unit === 'days' || unit === 'date') {
      return print.day(a) === print.day(b);
    }
    if (unit === 'week' || unit === 'weeks') {
      return print.week(a) === print.week(b);
    }
    if (unit === 'month' || unit === 'months') {
      return print.month(a) === print.month(b);
    }
    if (unit === 'quarter' || unit === 'quarters') {
      return print.quarter(a) === print.quarter(b);
    }
    if (unit === 'year' || unit === 'years') {
      return print.year(a) === print.year(b);
    }
    return null;
  };
};

module.exports = addMethods;

},{}],29:[function(_dereq_,module,exports){
'use strict';

// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.

var dayTimes = _dereq_('../../data/dayTimes');
var ms = _dereq_('../../data/milliseconds');
var months = _dereq_('../../data/months');
var monthLength = _dereq_('../../data/monthLength');
var walkTo = _dereq_('./walk');

var validate = function validate(n) {
  //handle number as a string
  if (typeof n === 'string') {
    n = parseInt(n, 10);
  }
  return n;
};

var units = {
  second: ['second', 'millisecond'],
  minute: ['minute', 'second', 'millisecond'],
  hour: ['hour', 'minute', 'second', 'millisecond'],
  date: ['date', 'hour', 'minute', 'second', 'millisecond'],
  month: ['month', 'date', 'hour', 'minute', 'second', 'millisecond'],
  year: ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
};
//reduce hostile micro-changes when moving dates by millisecond
var confirm = function confirm(s, tmp, unit) {
  var arr = units[unit];
  for (var i = 0; i < arr.length; i++) {
    var want = tmp[arr[i]]();
    s[arr[i]](want);
  }
  return s;
};

module.exports = {

  milliseconds: function milliseconds(s, n) {
    n = validate(n);
    var current = s.millisecond();
    var diff = current - n; //milliseconds to shift by
    return s.epoch - diff;
  },

  seconds: function seconds(s, n) {
    n = validate(n);
    var diff = s.second() - n;
    var shift = diff * ms.second;
    return s.epoch - shift;
  },

  minutes: function minutes(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = s.minute() - n;
    var shift = diff * ms.minute;
    s.epoch -= shift;
    confirm(s, old, 'second');
    return s.epoch;
  },

  hours: function hours(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = s.hour() - n;
    var shift = diff * ms.hour;
    s.epoch -= shift;
    confirm(s, old, 'minute');
    return s.epoch;
  },

  //support setting time by '4:25pm' - this isn't very-well developed..
  time: function time(s, str) {
    var m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);
    if (!m) {
      return s.epoch;
    }
    var h24 = false;
    var hour = parseInt(m[1], 10);
    var minute = parseInt(m[2], 10);
    if (hour > 12) {
      h24 = true;
    }
    if (!h24 && m[3] === 'pm') {
      hour += 12;
    }
    s.hour(hour);
    s.minute(minute);
    s.second(0);
    s.millisecond(0);
    return s.epoch;
  },

  date: function date(s, n) {
    n = validate(n);
    walkTo(s, {
      date: n
    });
    return s.epoch;
  },

  //this one's tricky
  month: function month(s, n) {
    if (typeof n === 'string') {
      n = months.mapping[n.toLowerCase()];
    }
    n = validate(n);
    var date = s.date();
    //there's no 30th of february, etc.
    if (date > monthLength[n]) {
      //make it as close as we can..
      date = monthLength[n];
    }
    walkTo(s, {
      month: n,
      date: date
    });
    return s.epoch;
  },

  year: function year(s, n) {
    n = validate(n);
    walkTo(s, {
      year: n
    });
    return s.epoch;
  },

  dayOfYear: function dayOfYear(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = n - s.dayOfYear();
    var shift = diff * ms.day;
    s.epoch += shift;
    confirm(s, old, 'hour');
    return s.epoch;
  }

};

},{"../../data/dayTimes":4,"../../data/milliseconds":6,"../../data/monthLength":7,"../../data/months":8,"./walk":30}],30:[function(_dereq_,module,exports){
'use strict';

var ms = _dereq_('../../data/milliseconds');

//find the desired date by a increment/check while loop
var units = {
  year: {
    valid: function valid(n) {
      return n > 0 && n < 4000;
    },
    walkTo: function walkTo(s, n) {
      while (s.year() < n) {
        s.epoch += ms.year;
      }
      while (s.year() > n) {
        s.epoch -= ms.year;
      }
    }
  },
  month: {
    valid: function valid(n) {
      return n >= 0 && n <= 11;
    },
    walkTo: function walkTo(s, n) {
      while (s.month() < n) {
        s.epoch += ms.day;
      }
      while (s.month() > n) {
        s.epoch -= ms.day;
      }
    }
  },
  date: {
    valid: function valid(n) {
      return n > 0 && n <= 31;
    },
    walkTo: function walkTo(s, n) {
      while (s.date() < n) {
        s.epoch += ms.day;
      }
      while (s.date() > n) {
        s.epoch -= ms.day;
      }
    }
  },
  hour: {
    valid: function valid(n) {
      return n >= 0 && n < 24;
    },
    walkTo: function walkTo(s, n) {
      while (s.hour() < n) {
        s.epoch += ms.hour;
      }
      while (s.hour() > n) {
        s.epoch -= ms.hour;
      }
    }
  },
  minute: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      while (s.minute() < n) {
        s.epoch += ms.minute;
      }
      while (s.minute() > n) {
        s.epoch -= ms.minute;
      }
    }
  },
  second: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      while (s.second() < n) {
        s.epoch += ms.second;
      }
      while (s.second() > n) {
        s.epoch -= ms.second;
      }
    }
  },
  millisecond: {
    valid: function valid(n) {
      return n >= 0 && n < 1000;
    },
    walkTo: function walkTo(s, n) {
      //do this one directly
      s.milliseconds(n);
    }
  }
};

// const preProcess = function(want) {
//   const sizes = {
//     millisecond: 1000,
//     second: 60,
//     minute: 60,
//   };
//   const units = Object.keys(sizes);
//   for(let i = 0; i < units.length - 1; i++) {
//     let unit = units[i];
//     let nextUnit = units[i + 1];
//     if (want[unit] >= sizes[unit]) {
//       want.second += parseInt(want.millisecond / 1000, 10);
//       want.millisecond = want.millisecond % 1000;
//     }
//   }
//   return want;
// };

// const postProcess = function(s, wants) {
//   Object.keys(wants).forEach((k) => {
//     if (s[k]() !== wants[k]) {
//       console.warn('invalid ' + k + ':   - want ' + wants[k]);
//     }
//   });
//   return s;
// };

var walkTo = function walkTo(s, wants) {
  // wants = preProcess(wants);
  var keys = Object.keys(units);
  var old = s.clone();
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var n = wants[k];
    if (n === undefined) {
      n = old[k]();
    }
    if (typeof n === 'string') {
      n = parseInt(n, 10);
    }
    //make-sure it's valid
    if (!units[k].valid(n)) {
      console.log('invalid ' + k + ': ' + n);
      return;
    }
    // console.log('walking ' + k + ' to ' + n);
    units[k].walkTo(s, n);
  }
  //if we've gone over a dst-change or something..
  if (wants.hour === undefined && s.hour() !== old.hour()) {
    s.hour(old.hour());
  }
  // s = postProcess(s, wants);
  return;
};
module.exports = walkTo;

},{"../../data/milliseconds":6}],31:[function(_dereq_,module,exports){
'use strict';

var seasons = _dereq_('../data/seasons');
var quarters = _dereq_('../data/quarters');
var walkTo = _dereq_('./set/walk');

var units = {
  minute: function minute(s) {
    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  hour: function hour(s) {
    walkTo(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  day: function day(s) {
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  week: function week(s) {
    var original = s.clone();
    s.day(1); //monday
    if (s.isAfter(original)) {
      s.subtract(1, 'week');
    }
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  month: function month(s) {
    walkTo(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarter: function quarter(s) {
    var q = s.quarter();
    if (quarters[q]) {
      walkTo(s, {
        month: quarters[q][0],
        date: quarters[q][1],
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    }
    return s;
  },
  season: function season(s) {
    var current = s.season();
    for (var i = 0; i < seasons.length; i++) {
      if (seasons[i][0] === current) {
        //winter goes between years
        var year = s.year();
        if (current === 'winter' && s.month() < 3) {
          year -= 1;
        }
        walkTo(s, {
          year: year,
          month: seasons[i][1],
          date: seasons[i][2],
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        });
        return s;
      }
    }
    return s;
  },
  year: function year(s) {
    walkTo(s, {
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  }
};
units.date = units.day;

var startOf = function startOf(s, unit) {
  if (units[unit]) {
    return units[unit](s);
  }
  return s;
};

//piggy-backs off startOf
var endOf = function endOf(s, unit) {
  if (units[unit]) {
    s = units[unit](s);
    s.add(1, unit);
    s.subtract(1, 'milliseconds');
    return s;
  }
  return s;
};
module.exports = {
  startOf: startOf,
  endOf: endOf
};

},{"../data/quarters":9,"../data/seasons":10,"./set/walk":30}],32:[function(_dereq_,module,exports){
'use strict';

var getBias = _dereq_('./getBias');
var guessTz = _dereq_('./timezone/guessTz');
var timezone = _dereq_('./timezone/index');
var handleInput = _dereq_('./input');
var methods = _dereq_('./methods');

//fake timezone-support, for fakers (es5 class)
var SpaceTime = function SpaceTime(input, tz) {
  //the shift for the given timezone
  this.tz = tz || guessTz();
  //this computer's built-in offset
  this.bias = getBias();
  //add getter/setters
  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function get() {
      var meta = timezone(this) || {};
      //movement in milliseconds
      var shift = meta.current.epochShift;
      //remove this computer's offset
      shift = shift + this.bias * 60 * 1000;
      var epoch = this.epoch + shift;
      var d = new Date(epoch);
      return d;
    }
  });
  //parse the various formats
  handleInput(this, input);
};

//(add instance methods to prototype)
Object.keys(methods).forEach(function (k) {
  SpaceTime.prototype[k] = methods[k];
});
SpaceTime.prototype.clone = function () {
  return new SpaceTime(this.epoch, this.tz);
};

//append more methods
_dereq_('./methods/query')(SpaceTime);
_dereq_('./methods/add')(SpaceTime);
_dereq_('./methods/same')(SpaceTime);
_dereq_('./methods/compare')(SpaceTime);

module.exports = SpaceTime;

},{"./getBias":11,"./input":13,"./methods":18,"./methods/add":19,"./methods/compare":20,"./methods/query":25,"./methods/same":28,"./timezone/guessTz":33,"./timezone/index":34}],33:[function(_dereq_,module,exports){
'use strict';
//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src

var fallbackTZ = 'Canada/Pacific'; //eeeek!

var guessTz = function guessTz() {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return fallbackTZ;
  }
  var format = Intl.DateTimeFormat();
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return fallbackTZ;
  }
  var timezone = format.resolvedOptions().timeZone;
  if (timezone && (timezone.indexOf('/') > -1 || timezone === 'UTC')) {
    return timezone;
  }
  return fallbackTZ;
};
module.exports = guessTz;

},{}],34:[function(_dereq_,module,exports){
'use strict';

var zones = _dereq_('../../data');
var isDst = _dereq_('./isDst');

var parseDst = function parseDst(dst) {
  if (!dst) {
    return {};
  }
  var arr = dst.split(' -> ').map(function (s) {
    var tmp = s.split('/');
    return {
      month: parseInt(tmp[0], 10),
      date: parseInt(tmp[1], 10),
      hour: parseInt(tmp[2], 10)
    };
  });
  return {
    start: arr[0],
    end: arr[1]
  };
};

//get metadata about this timezone
var timezone = function timezone(s) {
  var tz = s.tz;
  if (!zones[tz]) {
    console.warn('Warn: could not find timezone - \'' + tz + '\'');
    return {
      current: {
        epochShift: 0
      }
    };
  }
  var meta = {
    name: tz
  };
  meta.dst = parseDst(zones[tz].dst);
  meta.dst.change = 0;
  if (meta.dst.start && meta.dst.end) {
    meta.dst.change = -60;
    //the only exception to this rule is 'lord howe'
    if (meta.name === 'Australia/Lord_Howe') {
      meta.dst.change = -30;
    }
  }

  //include hemisphere (for seasons)
  meta.hemisphere = null;
  if (zones[tz].hem === 'n') {
    meta.hemisphere = 'North';
  } else if (zones[tz].hem === 's') {
    meta.hemisphere = 'South';
  }

  //both offsets (in mins)
  meta.offsets = {
    base: zones[tz].o + meta.dst.change,
    dst: zones[tz].o
  };

  if (isDst(s, meta.dst)) {
    meta.current = {
      isDst: true,
      offset: meta.offsets.dst
    };
  } else {
    meta.current = {
      isDst: false,
      offset: meta.offsets.base
    };
  }
  meta.current.epochShift = meta.current.offset * 60 * 1000;
  return meta;
};
module.exports = timezone;

},{"../../data":1,"./isDst":35}],35:[function(_dereq_,module,exports){
'use strict';

function zeroPad(str, len) {
  len = len || 2;
  var pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
}

var toString = function toString(o) {
  return [zeroPad(o.month), zeroPad(o.date), zeroPad(o.hour)].join('-');
};

//is this time between dst.start and dst.end?
var isDst = function isDst(s, dst) {
  if (!dst.start || !dst.end) {
    return false;
  }
  var d = new Date(s.epoch); //this has a order-of-operations issue
  var current = {
    month: d.getMonth(),
    date: d.getDate(),
    hour: d.getHours()
  };
  current = toString(current);
  var start = toString(dst.start);
  var end = toString(dst.end);
  //in dst, in summer (easy)
  if (start < end) {
    if (current > start && current < end) {
      return true;
    }
    return false;
  } else {
    //in dst, over new-years (trickier)
    if (current > start) {
      return true;
    }
    if (current < end) {
      return true;
    }
  }
  return false;
};
module.exports = isDst;

},{}]},{},[12])(12)
});