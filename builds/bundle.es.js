/* global Intl */
//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
const fallbackTZ = 'Asia/Shanghai'; //

//this Intl object is not supported often, yet
const safeIntl = function() {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null;
  }
  let format = Intl.DateTimeFormat();
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null;
  }
  let timezone = format.resolvedOptions().timeZone;
  if (!timezone || (timezone.indexOf('/') === -1 && timezone === 'UTC')) {
    return null
  }
  return timezone;
};

const guessTz = () => {
  let timezone = safeIntl();
  if (timezone === null) {
    return fallbackTZ
  }
  return timezone
};

//git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
const isLeapYear = function(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
};
// unsurprisingly-nasty `typeof date` call
const isDate = function(d) {
  return (
    Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf())
  );
};
const isArray = function(input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};
const isObject = function(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
};

const zeroPad = function(str, len) {
  len = len || 2;
  let pad = '0';
  str = str + '';
  return str.length >= len
    ? str
    : new Array(len - str.length + 1).join(pad) + str;
};

const titleCase = function(str) {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
};

const ordinal = function(i) {
  let j = i % 10;
  let k = i % 100;
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
};

//strip 'st' off '1st'..
const toCardinal = function(str) {
  str = String(str);
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
  return parseInt(str, 10)
};

const normalize = str => {
  str = str.toLowerCase();
  str = str.replace(/s$/, '');
  if (str === 'day') {
    return 'date';
  }
  return str;
};

const getEpoch = function(tmp) {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp;
  }
  //suport date objects
  if (isDate(tmp)) {
    return tmp.getTime();
  }
  if (tmp.epoch) {
    return tmp.epoch;
  }
  return null;
};

//make sure this input is a spacetime obj
const beADate = function(d, s) {
  if (isObject(d) === false) {
    return s.clone().set(d)
  }
  return d
};

const toString = function(d) {
  return zeroPad((d.getMonth() + 1)) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours())
};

// a timezone will begin with a specific offset in january
// then some will switch to something else between november-march
const shouldChange = (s, m, defaultOffset) => {
  if (m.hasDst !== true || !m.change.start || !m.change.back) {
    return false
  }
  //note: this has a cray order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  let d = new Date(s.epoch);
  //(try to mediate this a little?)
  let bias = d.getTimezoneOffset() || 0;
  let shift = bias + (defaultOffset * 60); //in minutes
  shift = shift * 60 * 1000; //in ms
  d = new Date(s.epoch + shift);
  let current = toString(d);
  //eg. is it after ~november?
  if (current >= m.change.start) {
    //eg. is it before ~march~ too?
    if (current < m.change.back) {
      return true
    }
  }
  return false
};

const parseDst = dst => {
  if (!dst) {
    return [];
  }
  return dst.split('->')
};

//get metadata about this timezone
const timezone = s => {
  let tz = s.tz || '';
  let zones = s.timezones;
  let split = tz.split('/');
  //support long timezones like 'America/Argentina/Rio_Gallegos'
  if (zones.hasOwnProperty(tz) === false && split.length > 2) {
    tz = split[0] + '/' + split[1];
  }
  if (zones.hasOwnProperty(tz) === false) {
    console.warn("Warn: could not find given or local timezone - '" + tz + "'");
    return {
      current: {
        epochShift: 0,
      },
    };
  }
  //do north-hemisphere version as default (sorry!)
  let m = {
    name: tz,
    hasDst: Boolean(zones[tz].dst),
    hemisphere: zones[tz].h === 's' ? 'South' : 'North', //assume north, unless told
    change: {},
    current: {},
  };
  if (m.hasDst === true) {
    let arr = parseDst(zones[tz].dst);
    m.change = {
      start: arr[0],
      back: arr[1],
    };
  }
  //find the offsets for summer/winter times
  //(these variable names are north-centric)
  let summer = zones[tz].o; // (july)
  let winter = summer; // (january) assume it's the same for now
  if (m.hasDst === true) {
    if (m.hemisphere === 'North') {
      winter = summer - 1;
    } else { //southern hemisphere
      winter = zones[tz].o + 1;
    }
  }

  //find out which offset to use right now
  //use 'summer' time july-time
  if (m.hasDst === false) {
    m.current.offset = summer;
    m.current.isDST = false;
  } else if (shouldChange(s, m, summer) === true) {
    m.current.offset = summer;
    m.current.isDST = m.hemisphere === 'North'; //dst 'on' in winter in north
  } else { //use 'winter' january-time
    m.current.offset = winter;
    m.current.isDST = m.hemisphere === 'South'; //dst 'on' in summer in south
  }
  // let minutes = m.current.offset * 60
  // m.current.epochShift = minutes * 60 * 1000

  return m;
};

let o = {
  millisecond: 1,
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e6; // dst is supported post-hoc
o.day = 8.64e7;
o.date = 8.64e7;
o.month = 8.64e7 * 29.5; //(average)
o.week = 6.048e8;
o.year = 3.154e10; // leap-years are supported post-hoc
//add plurals
Object.keys(o).forEach(k => {
  o[k + 's'] = o[k];
});

//basically, step-forward/backward until js Date object says we're there.
const walk = function(s, n, fn, unit, previous) {
  let current = s.d[fn]();
  if (current === n) {
    return //already there
  }
  let startUnit = previous === null ? null : s.d[previous]();
  let original = s.epoch;
  //try to get it as close as we can
  let diff = (n - current);
  s.epoch += o[unit] * diff;
  //repair it if we've gone too far or something
  //(go by half-steps, just in case)
  const halfStep = o[unit] / 2;
  while (s.d[fn]() < n) {
    s.epoch += halfStep;
  }
  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  }
  //oops, did we change previous unit? revert it.
  if (previous !== null && startUnit !== s.d[previous]()) {
    s.epoch = original;
  }
};
//find the desired date by a increment/check while loop
const units = {
  year: {
    valid: n => n > -4000 && n < 4000,
    walkTo: (s, n) => walk(s, n, 'getFullYear', 'year', null)
  },
  month: {
    valid: n => n >= 0 && n <= 11,
    walkTo: (s, n) => {
      let current = s.d.getMonth();
      let original = s.epoch;
      let startUnit = s.d.getYear();
      if (current === n) {
        return
      }
      //try to get it as close as we can..
      let diff = n - current;
      s.epoch += o.day * (diff * 28); //special case
      //oops, did we change the year? revert it.
      if (startUnit !== s.d.getYear()) {
        s.epoch = original;
      }
      //incriment by day
      while (s.d.getMonth() < n) {
        s.epoch += o.day;
      }
      while (s.d.getMonth() > n) {
        s.epoch -= o.day;
      }
    },
  },
  date: {
    valid: n => n > 0 && n <= 31,
    walkTo: (s, n) => walk(s, n, 'getDate', 'day', 'getMonth')
  },
  hour: {
    valid: n => n >= 0 && n < 24,
    walkTo: (s, n) => walk(s, n, 'getHours', 'hour', 'getDate')
  },
  minute: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, 'getMinutes', 'minute', 'getHours')
  },
  second: {
    valid: n => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, 'getSeconds', 'second', 'getMinutes')
  },
  millisecond: {
    valid: n => n >= 0 && n < 1000,
    walkTo: (s, n) => {
      //do this one directly
      let tmp = s.milliseconds(n);
      s.epoch = tmp.epoch;
    },
  },
};

const walkTo = (s, wants) => {
  let keys = Object.keys(units);
  let old = s.clone();
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let n = wants[k];
    if (n === undefined) {
      n = old[k]();
    }
    if (typeof n === 'string') {
      n = parseInt(n, 10);
    }
    //make-sure it's valid
    if (!units[k].valid(n)) {
      s.epoch = null;
      console.warn('invalid ' + k + ': ' + n);
      return;
    }
    // console.log(k, n)
    units[k].walkTo(s, n);
  // console.log(s.milliseconds())
  //if we've gone over a dst-change or something..
  // if (wants.hour === undefined && s.hour() !== old.hour()) {
  //   s.hour(old.hour());
  // }
  }
  return;
};

// import spacetime from '../../spacetime'
// let s = new spacetime(1509778800000, 'Canada/Pacific')
// let want = {
//   millisecond: 0,
//   second: 0,
//   minute: 0,
//   hour: 0,
//   date: 4
// }
// s.log()
// units['date'].walkTo(s, 4);
// walkTo(s, want)
// s.log()

let shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
let longMonths = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

function buildMapping() {
  const obj = {};
  for (let i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i;
  }
  for (let i = 0; i < longMonths.length; i++) {
    obj[longMonths[i]] = i;
  }
  return obj;
}

var months = {
  short: () => shortMonths,
  long: () => longMonths,
  mapping: () => buildMapping(),
  set: i18n => {
    shortMonths = i18n.short;
    longMonths = i18n.long;
  }
};

//pull-apart ISO offsets, like "+0100"
const parseOffset = function(s, offset, givenTz) {
  if (!offset) {
    return s
  }
  //this is a fancy-move
  if (offset === 'Z') {
    offset = '+0000';
  }
  //support "+01:00"
  if (/:00/.test(offset) === true) {
    offset = offset.replace(/:00/, '');
  }
  //support "+01:30"
  if (/:00/.test(offset) === true) {
    offset = offset.replace(/:00/, '.5');
  }
  let num = parseInt(offset, 10);
  //divide by 100 or 10 - , "+0100", "+01"
  if (Math.abs(num) > 100) {
    num = num / 100;
  }
  // console.log(offset, num)
  let current = s.timezone().current.offset;
  if (current === num) { //we cool..
    return s
  }
  //okay, try to match it to a utc timezone

  //this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_()_/¯
  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem
  num *= -1;

  if (num >= 0) {
    num = '+' + num;
  }

  let tz = 'Etc/GMT' + num;
  let zones = s.timezones;
  if (zones[tz]) {

    // console.log('changing timezone to: ' + tz)
    //log a warning if we're over-writing a given timezone
    if (givenTz && zones[givenTz] && zones[givenTz].o !== zones[tz].o && s.silent === false) {
      //don't log during our tests, either..
      if (typeof process !== 'undefined' && process.env && !process.env.TESTENV) {
        console.warn('  - Setting timezone to: \'' + tz + '\'');
        console.warn('     from ISO string \'' + offset + '\'');
        console.warn('     overwriting given timezone: \'' + givenTz + '\'\n');
      }
    }
    s.tz = tz;
  }
  return s
};

const monthLengths = [
  31, // January - 31 days
  28, // February - 28 days in a common year and 29 days in leap years
  31, // March - 31 days
  30, // April - 30 days
  31, // May - 31 days
  30, // June - 30 days
  31, // July - 31 days
  31, // August - 31 days
  30, // September - 30 days
  31, // October - 31 days
  30, // November - 30 days
  31 // December - 31 days
];

//given a month, return whether day number exists in it
const hasDate = function(obj) {
  //invalid values
  if (monthLengths.hasOwnProperty(obj.month) !== true) {

    return false
  }
  //support leap-year in february
  if (obj.month === 1) {
    if (isLeapYear(obj.year) && obj.date <= 29) {
      return true
    } else {
      return obj.date <= 28
    }
  }
  //is this date too-big for this month?
  let max = monthLengths[obj.month] || 0;
  if (obj.date <= max) {
    return true
  }
  return false
};

// import zones from '../../data'

const parseHour = function(s, str) {
  str = str.replace(/^\s+/, ''); //trim
  let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);
  if (arr) {
    s = s.hour(arr[1]);
    s = s.minute(arr[2]);
    if (arr[3]) {
      s = s.seconds(arr[3]);
    }
    if (arr[4]) {
      s = s.millisecond(arr[4]);
    }
  }
  return s
};

const parseYear = function(str) {
  str = str || '';
  //support '18 -> 2018
  // str = str.replace(/^'([0-9]{2})/, '20$1')
  // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')
  let year = parseInt(str.trim(), 10);
  year = year || new Date().getFullYear();
  return year
};

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
      };
      if (hasDate(obj) === false) {
        s.epoch = null;
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
      };
      if (obj.month >= 12) { //support yyyy/dd/mm (weird, but ok)
        obj.date = parseInt(arr[2], 10);
        obj.month = parseInt(arr[3], 10) - 1;
      }
      if (hasDate(obj) === false) {
        s.epoch = null;
        return s
      }
      walkTo(s, obj);
      return s
    }
  },
  //short - uk "03/25/2015"  //0-based-months!
  {
    reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1;
      let date = parseInt(arr[2], 10);
      if (month >= 12) { //support yyyy/dd/mm (weird, but ok)
        month = parseInt(arr[2], 10) - 1;
        date = parseInt(arr[1], 10);
      }
      let year = arr[3] || new Date().getFullYear();
      let obj = {
        year: year,
        month: month,
        date: date
      };
      if (hasDate(obj) === false) {
        s.epoch = null;
        return s
      }
      walkTo(s, obj);
      return s
    }
  },
  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+))?$/i,
    parse: (s, arr) => {
      let month = months.mapping()[arr[1].toLowerCase()];
      let year = parseYear(arr[3]);
      let obj = {
        year: year,
        month: month,
        date: toCardinal(arr[2] || '')
      };
      if (hasDate(obj) === false) {
        s.epoch = null;
        return s
      }
      walkTo(s, obj);
      if (arr[4]) {
        s = parseHour(s, arr[4]);
      }
      return s
    }
  },
  //Long "25 Mar 2015"
  {
    reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      let month = months.mapping()[arr[2].toLowerCase()];
      let year = parseYear(arr[3]);
      let obj = {
        year: year,
        month: month,
        date: toCardinal(arr[1])
      };
      if (hasDate(obj) === false) {
        s.epoch = null;
        return s
      }
      walkTo(s, obj);
      return s
    }
  },
  { // '1992'
    reg: /^[0-9]{4}$/i,
    parse: (s, arr) => {
      let year = parseYear(arr[0]);
      let d = new Date();
      let obj = {
        year: year,
        month: d.getMonth(),
        date: d.getDate()
      };
      if (hasDate(obj) === false) {
        s.epoch = null;
        return s
      }
      walkTo(s, obj);
      return s
    }
  },
  { // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (s, arr) => {
      let str = arr[0] || '';
      //make negative-year
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1');
      //remove commas
      str = str.replace(/,/g, '');
      let year = parseInt(str.trim(), 10);
      let d = new Date();
      let obj = {
        year: year,
        month: d.getMonth(),
        date: d.getDate()
      };
      if (hasDate(obj) === false) {
        s.epoch = null;
        return s
      }
      walkTo(s, obj);
      return s
    }
  }
];

const dates = {
  now: (s) => {
    s.epoch = Date.now();
    return s
  },
  tonight: (s) => {
    s.epoch = Date.now();
    s = s.hour(18);
    return s
  },
  today: (s) => {
    s.epoch = Date.now();
    return s
  },
  tomorrow: (s) => {
    s.epoch = Date.now();
    s = s.add(1, 'day');
    s = s.startOf('day');
    return s
  },
  yesterday: (s) => {
    s.epoch = Date.now();
    s = s.subtract(1, 'day');
    s = s.startOf('day');
    return s
  },
  christmas: (s) => {
    let year = new Date().getFullYear();
    s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25
    return s
  },
  'new years': (s) => {
    let year = new Date().getFullYear();
    s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31
    return s
  },
};
dates['new years eve'] = dates['new years'];

//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

//-- also -
// if the given epoch is really small, they've probably given seconds and not milliseconds
// anything below this number is likely (but not necessarily) a mistaken input.
// this may seem like an arbitrary number, but it's 'within jan 1970'
// this is only really ambiguous until 2054 or so
const minimumEpoch = 2500000000;

//support [2016, 03, 01] format
const handleArray = function(s, arr) {
  let order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i] || 0;
    s = s[order[i]](num);
  }
  return s;
};
//support {year:2016, month:3} format
const handleObject = function(s, obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let unit = keys[i];
    if (s[unit] !== undefined) {
      let num = obj[unit] || 0;
      s = s[unit](num);
    }
  }
  return s;
};

//find the epoch from different input styles
const parseInput = (s, input, givenTz) => {
  //if we've been given a epoch number, it's easy
  if (typeof input === 'number') {
    s.epoch = input;
    if (input > 0 && input < minimumEpoch && s.silent === false) {
      console.warn('  - Warning: You are setting the date to January 1970.');
      console.warn('       -   did input seconds instead of milliseconds?');
    }
    return s
  }
  //set tmp time
  s.epoch = Date.now();
  if (input === null || input === undefined) {
    return s //k, we're good.
  }
  //support input of Date() object
  if (isDate(input) === true) {
    s.epoch = input.getTime();
    return s
  }
  //support [2016, 03, 01] format
  if (isArray(input) === true) {
    s = handleArray(s, input);
    return s
  }
  //support {year:2016, month:3} format
  if (isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch;
      return s;
    }
    s = handleObject(s, input);
    return s
  }
  //input as a string..
  if (typeof input !== 'string') {
    return s
  }
  //little cleanup..
  input = input.trim().replace(/ +/g, ' ');
  //try some known-words, like 'now'
  if (dates.hasOwnProperty(input) === true) {
    s = dates[input](s);
    return s
  }
  //try each text-parse template, use the first good result
  for (let i = 0; i < strFmt.length; i++) {
    let m = input.match(strFmt[i].reg);
    if (m) {
      s = strFmt[i].parse(s, m, givenTz);
      return s
    }
  }
  if (s.silent === false) {
    console.warn('Warning: couldn\'t parse date-string: \'' + input + '\'');
  }
  s.epoch = null;
  return s
};

let shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
let longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

var days = {
  short: () => shortDays,
  long: () => longDays,
  set: i18n => {
    shortDays = i18n.short;
    longDays = i18n.long;
  },
};

// "+01:00", "+0100", or simply "+01"
const isoOffset = function(s) {
  let offset = s.timezone().current.offset;
  let minute = '00';
  if (offset % 1 === 0.5) { //fraction of the hour
    minute = '30';
    offset = Math.floor(offset);
  }
  if (offset < 0) {
    //handle negative sign
    offset *= -1;
    offset = zeroPad(offset, 2);
    offset = '-' + offset;
  } else {
    offset = zeroPad(offset, 2);
    offset = '+' + offset;
  }
  offset = offset + ':' + minute;
  //this is a little cleaner?
  if (offset === "+00:00") {
    offset = 'Z';
  }
  return offset
};

const fmt = {
  day: s => {
    return titleCase(days.long()[s.day()]);
  },
  'day-short': s => {
    return titleCase(days.short()[s.day()]);
  },
  date: s => {
    return '' + s.date();
  },
  'date-ordinal': s => {
    return ordinal(s.date());
  },
  month: s => {
    return titleCase(months.long()[s.month()]);
  },
  'month-short': s => {
    return titleCase(months.short()[s.month()]);
  },
  time: s => {
    return `${s.h12()}:${zeroPad(s.minute())}${s.ampm()}`; //3:45pm
  },
  'time-24h': s => {
    return `${s.hour()}:${zeroPad(s.minute())}`; //13:45
  },
  year: s => {
    let year = s.year();
    if (year < 0) {
      year = Math.abs(year);
      return year + ' BC'
    }
    return '' + year;
  },
  'year-short': s => {
    return "'" + ('' + s.year()).substr(2, 4);
  },
  'numeric-us': s => {
    return `${zeroPad(s.month() + 1)}/${zeroPad(s.date())}/${s.year()}`; //mm/dd/yyyy
  },
  'numeric-uk': s => {
    return `${zeroPad(s.date())}/${zeroPad(s.month() + 1)}/${s.year()}`; //dd/mm/yyyy
  },
  'numeric-cn': s => {
    return `${s.year()}/${zeroPad(s.month() + 1)}/${zeroPad(s.date())}`; //yyyy/mm/dd
  },

  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: s => {
    let month = zeroPad(s.month() + 1); //1-based months
    let date = zeroPad(s.date());
    let hour = zeroPad(s.h24());
    let minute = zeroPad(s.minute());
    let second = zeroPad(s.second());
    let ms = zeroPad(s.millisecond(), 3);
    let offset = isoOffset(s);
    return `${s.year()}-${month}-${date}T${hour}:${minute}:${second}.${ms}${offset}`; //2018-03-09T08:50:00.000-05:00
  },
  'iso-short': s => {
    let month = zeroPad(s.month() + 1); //1-based months
    let date = zeroPad(s.date());
    return `${s.year()}-${month}-${date}`; //2017-02-15
  },
  'iso-utc': s => {
    return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
  },
};
fmt['nice'] = s => {
  let month = fmt.month(s);
  let ord = fmt['date-ordinal'](s);
  let time = fmt.time(s);
  return `${month} ${ord}, ${time}`;
};
fmt['nice-day'] = s => {
  let day = fmt.day(s);
  let month = fmt.month(s);
  let ord = fmt['date-ordinal'](s);
  let time = fmt.time(s);
  return `${day} ${month} ${ord}, ${time}`;
};
fmt['nice-short'] = s => {
  let month = fmt['month-short'](s);
  let ord = fmt['date-ordinal'](s);
  let time = fmt.time(s);
  return `${month} ${ord}, ${time}`;
};
fmt['full'] = s => {
  let day = fmt.day(s);
  let month = fmt.month(s);
  let ord = fmt['date-ordinal'](s);
  let year = s.year();
  return `${day} ${month} ${ord}, ${year}`;
};
fmt['full-short'] = s => {
  let day = fmt['day-short'](s);
  let month = fmt['month-short'](s);
  let ord = fmt['date-ordinal'](s);
  let year = s.year();
  return `${day} ${month} ${ord}, ${year}`;
};
//aliases
fmt['ordinal'] = fmt['date-ordinal'];
fmt['date-short'] = fmt.date;
fmt['time-12h'] = fmt.time;
fmt['time-12'] = fmt.time;
fmt['time-h12'] = fmt['time-12h'];
fmt['time-h24'] = fmt['time-24h'];
fmt['time-24'] = fmt['time-24h'];
fmt['numeric'] = fmt['numeric-us']; //sorry!
fmt['mdy'] = fmt['numeric-us'];
fmt['dmy'] = fmt['numeric-uk'];
fmt['ymd'] = fmt['numeric-cn'];
fmt['little-endian'] = fmt['numeric-uk'];
fmt['big-endian'] = fmt['numeric-cn'];

//
const format = (s, str) => {
  //don't print anything if it's invalid
  if (s.isValid() !== true) {
    return '';
  }
  if (fmt && fmt[str]) {
    return fmt[str](s);
  }
  if (typeof str === 'string') {
    return fmt['iso-short'](s);
  }
  //start building format object
  let all = Object.keys(fmt).reduce((h, k) => {
    h[k] = fmt[k](s);
    return h;
  }, {});

  return all;
};

//parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns

//time-symbols we support
const mapping = {
  G: (s) => s.era(),
  GG: (s) => s.era(),
  GGG: (s) => s.era(),
  GGGG: (s) => s.era() === 'AD' ? 'Anno Domini' : 'Before Christ',
  //year
  y: (s) => s.year(),
  yy: (s) => { //last two chars
    return parseInt(String(s.year()).substr(2, 4), 10)
  },
  yyy: (s) => s.year(),
  yyyy: (s) => s.year(),
  yyyyy: (s) => '0' + s.year(),
  // u: (s) => {},//extended non-gregorian years

  //quarter
  Q: (s) => s.quarter(),
  QQ: (s) => s.quarter(),
  QQQ: (s) => s.quarter(),
  QQQQ: (s) => s.quarter(),

  //month
  M: (s) => s.month() + 1,
  MM: (s) => zeroPad(s.month() + 1),
  MMM: (s) => s.format('month-short'),
  MMMM: (s) => s.format('month'),

  //week
  w: (s) => s.week(),
  ww: (s) => zeroPad(s.week()),
  //week of month
  // W: (s) => s.week(),

  //date of month
  d: (s) => s.date(),
  dd: (s) => zeroPad(s.date()),
  //date of year
  D: (s) => s.dayOfYear(),
  DD: (s) => zeroPad(s.dayOfYear()),
  DDD: (s) => zeroPad(s.dayOfYear(), 3),

  // F: (s) => {},//date of week in month
  // g: (s) => {},//modified julian day

  //day
  E: (s) => s.format('day-short'),
  EE: (s) => s.format('day-short'),
  EEE: (s) => s.format('day-short'),
  EEEE: (s) => s.format('day'),
  EEEEE: (s) => s.format('day')[0],
  e: (s) => s.day(),
  ee: (s) => s.day(),
  eee: (s) => s.format('day-short'),
  eeee: (s) => s.format('day'),
  eeeee: (s) => s.format('day')[0],

  //am/pm
  a: (s) => s.ampm().toUpperCase(),
  aa: (s) => s.ampm().toUpperCase(),
  aaa: (s) => s.ampm().toUpperCase(),
  aaaa: (s) => s.ampm().toUpperCase(),

  //hour
  h: (s) => s.h12(),
  hh: (s) => zeroPad(s.h12()),
  H: (s) => s.hour(),
  HH: (s) => zeroPad(s.hour()),
  // j: (s) => {},//weird hour format

  m: (s) => s.minute(),
  mm: (s) => zeroPad(s.minute()),
  s: (s) => s.second(),
  ss: (s) => zeroPad(s.second()),
  //milliseconds in the day
  A: (s) => s.epoch - s.startOf('day').epoch,
  //timezone
  z: (s) => s.tz,
  zz: (s) => s.tz,
  zzz: (s) => s.tz,
  zzzz: (s) => s.tz,
  Z: (s) => s.timezone().current.offset + '00',
  ZZ: (s) => s.timezone().current.offset + '00',
  ZZZ: (s) => s.timezone().current.offset + '00',
  ZZZZ: (s) => s.timezone().current.offset + ':00',

};

const addAlias = function(char, to, n) {
  let name = char;
  let toName = to;
  for (let i = 0; i < n; i += 1) {
    mapping[name] = mapping[toName];
    name += char;
    toName += to;
  }
};
addAlias('q', 'Q', 4);
addAlias('L', 'M', 4);
addAlias('Y', 'y', 4);
addAlias('c', 'e', 4);
addAlias('k', 'H', 2);
addAlias('K', 'h', 2);
addAlias('S', 's', 2);
addAlias('v', 'z', 4);
addAlias('V', 'Z', 4);

const unixFmt = function(s, str) {
  let chars = str.split('');
  //combine consecutive chars, like 'yyyy' as one.
  let arr = [chars[0]];
  let quoteOn = false;
  for (let i = 1; i < chars.length; i += 1) {
    //support quoted substrings
    if (chars[i] === `'`) {
      quoteOn = !quoteOn;
      //support '', meaning one tick
      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
        quoteOn = true;
      } else {
        continue
      }
    }
    //merge it with the last one
    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
      arr[arr.length - 1] += chars[i];
    } else {
      arr.push(chars[i]);
    }
  }
  return arr.reduce((txt, c) => {
    if (mapping[c] !== undefined) {
      txt += mapping[c](s) || '';
    } else {
      txt += c;
    }
    return txt;
  }, '');
};

//how far it is along, from 0-1
const progress = function(s) {
  const units = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];
  let obj = {};
  units.forEach(k => {
    let start = s.clone().startOf(k);
    let end = s.clone().endOf(k);
    let duration = end.epoch - start.epoch;
    let percent = (s.epoch - start.epoch) / duration;
    obj[k] = parseFloat(percent.toFixed(2));
  });
  return obj;
};

//round to either current, or +1 of this unit
const nearest = function(s, unit) {
  unit = unit.toLowerCase();
  unit = unit.replace(/s$/, ''); //singular form...
  let prog = s.progress();
  if (prog[unit] !== undefined) {
    if (prog[unit] > 0.5) {
      s = s.add(1, unit);
    }
    s = s.startOf(unit);
  } else {
    console.warn("no known unit '" + unit + "'");
  }
  return s;
};

//init this function up here
let doAll = () => {
};
//increment until dates are the same
const climb = function(a, b, unit) {
  let i = 0;
  a = a.clone();
  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a = a.add(1, unit);
    i += 1;
  }
  //oops, we went too-far..
  if (!a.isSame(b, unit)) {
    i -= 1;
  }
  return i;
};

const diffQuick = function(a, b) {
  let ms = b.epoch - a.epoch;
  let obj = {
    milliseconds: ms,
    seconds: parseInt(ms / 1000, 10),
  };
  obj.minutes = parseInt(obj.seconds / 60, 10);
  obj.hours = parseInt(obj.minutes / 60, 10);
  return obj
};

const diff = function(a, b, unit) {
  //remove trailing s
  b = beADate(b, a);
  if (!unit) {
    return doAll(a, b)
  }
  //make sure it's plural-form
  unit = normalize(unit);
  if (/s$/.test(unit) !== true) {
    unit += 's';
  }
  //do quick-form for these small-ones
  if (unit === 'milliseconds' || unit === 'seconds' || unit === 'minutes') {
    return diffQuick(a, b)[unit]
  }
  //otherwise, do full-version
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    //reverse it
    return climb(b, a, unit) * -1;
  }
};

doAll = function(a, b) {
  //do ms, seconds, minutes in a faster way
  let all = diffQuick(a, b);
  all.years = diff(a, b, 'year');
  all.months = diff(a, b, 'month');
  all.weeks = diff(a, b, 'week');
  all.days = diff(a, b, 'day');
  //only slow-compute hours if it's a small diff
  if (all.years === 0) {
    all.hours = diff(a, b, 'hour');
  }
  return all
};

//by spencermountain + Shaun Grady

//our conceptual 'break-points' for each unit
const qualifiers = {
  months: {
    almost: 10,
    over: 4
  },
  days: {
    almost: 25,
    over: 10
  },
  hours: {
    almost: 20,
    over: 8
  },
  minutes: {
    almost: 50,
    over: 20
  },
  seconds: {
    almost: 50,
    over: 20
  }
};

//get number of hours/minutes... between the two dates
function getDiff(a, b) {
  const isBefore = a.isBefore(b);
  const later = isBefore ? b : a;
  let earlier = isBefore ? a : b;
  earlier = earlier.clone();
  const diff = {
    years: 0,

    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  Object.keys(diff).forEach((unit) => {
    if (earlier.isSame(later, unit)) {
      return
    }
    let max = earlier.diff(later, unit);
    earlier = earlier.add(max, unit);
    //did we go one too far?
    if (earlier.epoch > later.epoch + 10) { //(fudge this calc by 10 milliseconds)
      earlier = earlier.subtract(1, unit);
      max -= 1;
    }
    diff[unit] = max;
  });
  //reverse it
  if (isBefore) {
    Object.keys(diff).forEach(u => {
      if (diff[u] !== 0) {
        diff[u] *= -1;
      }
    });
  }
  return diff;
}

// Expects a plural unit arg
function pluralize(value, unit) {
  if (value === 1) {
    unit = unit.slice(0, -1);
  }
  return value + ' ' + unit;
}

//create the human-readable diff between the two dates
const since = function(start, end) {
  end = beADate(end, start);
  const diff = getDiff(start, end);
  const isNow = Object.keys(diff).every(u => !diff[u]);
  if (isNow === true) {
    return {
      diff: diff,
      rounded: 'now',
      qualified: 'now',
      precise: 'now'
    };
  }
  let rounded;
  let qualified;
  let precise;
  let englishValues = [];

  //go through each value and create its text-representation
  Object.keys(diff).forEach((unit, i, units) => {
    const value = Math.abs(diff[unit]);
    if (value === 0) {
      return;
    }
    const englishValue = pluralize(value, unit);
    englishValues.push(englishValue);
    if (!rounded) {
      rounded = qualified = englishValue;
      if (i > 4) {
        return;
      }
      //is it a 'almost' something, etc?
      const nextUnit = units[i + 1];
      const nextValue = Math.abs(diff[nextUnit]);
      if (nextValue > qualifiers[nextUnit].almost) {
        rounded = pluralize(value + 1, unit);
        qualified = 'almost ' + rounded;
      } else if (nextValue > qualifiers[nextUnit].over)
        qualified = 'over ' + englishValue;
    }
  });
  //make them into a string
  precise = englishValues.splice(0, 2).join(', ');
  //handle before/after logic
  if (start.isAfter(end) === true) {
    rounded += ' ago';
    qualified += ' ago';
    precise += ' ago';
  } else {
    rounded = 'in ' + rounded;
    qualified = 'in ' + qualified;
    precise = 'in ' + precise;
  }
  return {
    diff: diff,
    rounded: rounded,
    qualified: qualified,
    precise: precise
  };
};

//https://www.timeanddate.com/calendar/aboutseasons.html
// Spring - from March 1 to May 31;
// Summer - from June 1 to August 31;
// Fall (autumn) - from September 1 to November 30; and,
// Winter - from December 1 to February 28 (February 29 in a leap year).
var seasons = {
  north: [
    ['spring', 2, 1], //spring march 1
    ['summer', 5, 1], //june 1
    ['fall', 8, 1], //sept 1
    ['autumn', 8, 1], //sept 1
    ['winter', 11, 1] //dec 1
  ],
  south: [
    ['fall', 2, 1], //march 1
    ['autumn', 2, 1], //march 1
    ['winter', 5, 1], //june 1
    ['spring', 8, 1], //sept 1
    ['summer', 11, 1] //dec 1
  ]
};

var quarters = [
  null,
  [0, 1], //jan 1
  [3, 1], //apr 1
  [6, 1], //july 1
  [9, 1], //oct 1
];

const units$1 = {
  minute: s => {
    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarterHour: s => {
    let minute = s.minutes();
    if (minute >= 45) {
      s = s.minutes(45);
    } else if (minute >= 30) {
      s = s.minutes(30);
    } else if (minute >= 15) {
      s = s.minutes(15);
    } else {
      s = s.minutes(0);
    }
    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  hour: s => {
    walkTo(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  day: s => {
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  week: s => {
    let original = s.clone();
    s = s.day(1); //monday
    if (s.isAfter(original)) {
      s = s.subtract(1, 'week');
    }
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  month: s => {
    walkTo(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarter: s => {
    let q = s.quarter();
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
  season: s => {
    let current = s.season();
    let hem = 'north';
    if (s.timezone().hemisphere === 'South') {
      hem = 'south';
    }
    for (let i = 0; i < seasons[hem].length; i++) {
      if (seasons[hem][i][0] === current) {
        //winter goes between years
        let year = s.year();
        if (current === 'winter' && s.month() < 3) {
          year -= 1;
        }
        walkTo(s, {
          year: year,
          month: seasons[hem][i][1],
          date: seasons[hem][i][2],
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
  year: s => {
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
units$1.date = units$1.day;

const startOf = (a, unit) => {
  let s = a.clone();
  if (units$1[unit]) {
    return units$1[unit](s);
  }
  if (unit === 'summer' || unit === 'winter') {
    s = s.season(unit);
    return units$1.season(s);
  }
  return s;
};

//piggy-backs off startOf
const endOf = (a, unit) => {
  let s = a.clone();
  if (units$1[unit]) {
    s = units$1[unit](s);
    s = s.add(1, unit);
    s = s.subtract(1, 'milliseconds');
    return s;
  }
  return s;
};

//the spacetime instance methods (also, the API)
const methods = {
  set: function(input) {
    let s = this.clone();
    s = parseInput(s, input);
    return s
  },
  timezone: function() {
    return timezone(this)
  },
  isDST: function() {
    return timezone(this).current.isDST
  },
  hasDST: function() {
    return timezone(this).hasDst
  },
  offset: function() {
    return timezone(this).current.offset * 60
  },
  hemisphere: function() {
    return timezone(this).hemisphere
  },
  format: function(fmt) {
    return format(this, fmt)
  },
  unixFmt: function(fmt) {
    return unixFmt(this, fmt)
  },
  startOf: function(unit) {
    return startOf(this, unit)
  },
  endOf: function(unit) {
    return endOf(this, unit)
  },
  leapYear: function() {
    let year = this.year();
    return isLeapYear(year)
  },
  progress: function() {
    return progress(this)
  },
  nearest: function(unit) {
    return nearest(this, unit)
  },
  diff: function(d, unit) {
    return diff(this, d, unit)
  },
  since: function(d) {
    if (!d) {
      d = this.clone().set();
    }
    return since(this, d)
  },
  isValid: function() {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false
    }
    return !isNaN(this.d.getTime())
  },
  //travel to this timezone
  goto: function(tz) {
    let s = this.clone();
    s.tz = tz; //science!
    return s
  },
  isAwake: function() {
    let hour = this.hour();
    //10pm -> 8am
    if (hour < 8 || hour > 22) {
      return false
    }
    return true
  },
  isAsleep: function() {
    return !this.isAwake()
  },
  //pretty-printing
  log: function() {
    console.log('');
    console.log(format(this, 'nice-short'));
    return this
  },
  logYear: function() {
    console.log('');
    console.log(format(this, 'full-short'));
    return this
  },
  debug: function() {
    let tz = this.timezone();
    let date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
    date += '\n     - ' + this.format('time');
    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
    return this
  },
};
// aliases
methods.inDST = methods.isDST;
methods.round = methods.nearest;

var Africa = {
	Abidjan: [
		0,
		"n"
	],
	Accra: [
		0,
		"n"
	],
	Addis_Ababa: [
		3,
		"n"
	],
	Algiers: [
		1,
		"n"
	],
	Asmara: [
		3,
		"n"
	],
	Asmera: [
		3,
		"n"
	],
	Bamako: [
		0,
		"n"
	],
	Bangui: [
		1,
		"n"
	],
	Banjul: [
		0,
		"n"
	],
	Bissau: [
		0,
		"n"
	],
	Blantyre: [
		2,
		"n"
	],
	Brazzaville: [
		1,
		"n"
	],
	Bujumbura: [
		2,
		"n"
	],
	Cairo: [
		2,
		"n"
	],
	Casablanca: [
		1,
		"n",
		"07/02:03->10/29:02"
	],
	Ceuta: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Conakry: [
		0,
		"n"
	],
	Dakar: [
		0,
		"n"
	],
	Dar_es_Salaam: [
		3,
		"n"
	],
	Djibouti: [
		3,
		"n"
	],
	Douala: [
		1,
		"n"
	],
	El_Aaiun: [
		1,
		"n",
		"07/02:03->10/29:02"
	],
	Freetown: [
		0,
		"n"
	],
	Gaborone: [
		2,
		"s"
	],
	Harare: [
		2,
		"s"
	],
	Johannesburg: [
		2,
		"s"
	],
	Juba: [
		3,
		"n"
	],
	Kampala: [
		3,
		"n"
	],
	Khartoum: [
		2,
		"n"
	],
	Kigali: [
		2,
		"n"
	],
	Kinshasa: [
		1,
		"s"
	],
	Lagos: [
		1,
		"n"
	],
	Libreville: [
		1,
		"n"
	],
	Lome: [
		0,
		"n"
	],
	Luanda: [
		1,
		"s"
	],
	Lubumbashi: [
		2,
		"s"
	],
	Lusaka: [
		2,
		"s"
	],
	Malabo: [
		1,
		"n"
	],
	Maputo: [
		2,
		"s"
	],
	Maseru: [
		2,
		"s"
	],
	Mbabane: [
		2,
		"s"
	],
	Mogadishu: [
		3,
		"n"
	],
	Monrovia: [
		0,
		"n"
	],
	Nairobi: [
		3,
		"n"
	],
	Ndjamena: [
		1,
		"n"
	],
	Niamey: [
		1,
		"n"
	],
	Nouakchott: [
		0,
		"n"
	],
	Ouagadougou: [
		0,
		"n"
	],
	"Porto-Novo": [
		1,
		"n"
	],
	Sao_Tome: [
		0,
		"n"
	],
	Timbuktu: [
		0,
		"n"
	],
	Tripoli: [
		2,
		"n"
	],
	Tunis: [
		1,
		"n"
	],
	Windhoek: [
		1,
		"s",
		"04/02:01->09/03:03"
	]
};
var America = {
	Adak: [
		-9,
		"n",
		"03/11:02->11/04:02"
	],
	Anchorage: [
		-8,
		"n",
		"03/11:02->11/04:02"
	],
	Anguilla: [
		-4,
		"n"
	],
	Antigua: [
		-4,
		"n"
	],
	Araguaina: [
		-3,
		"n"
	],
	Argentina: [
		-3,
		"s"
	],
	Aruba: [
		-4,
		"n"
	],
	Asuncion: [
		-4,
		"s",
		"03/24:24->10/07:00"
	],
	Atikokan: [
		-5,
		"n"
	],
	Atka: [
		-9,
		"n",
		"03/11:02->11/04:02"
	],
	Bahia: [
		-3,
		"n"
	],
	Bahia_Banderas: [
		-5,
		"n",
		"04/01:02->10/28:02"
	],
	Barbados: [
		-4,
		"n"
	],
	Belem: [
		-3,
		"n"
	],
	Belize: [
		-6,
		"n"
	],
	"Blanc-Sablon": [
		-4,
		"n"
	],
	Boa_Vista: [
		-4,
		"n"
	],
	Bogota: [
		-5,
		"n"
	],
	Boise: [
		-6,
		"n",
		"03/11:02->11/04:02"
	],
	Buenos_Aires: [
		-3,
		"s"
	],
	Cambridge_Bay: [
		-6,
		"n",
		"03/11:02->11/04:02"
	],
	Campo_Grande: [
		-4,
		"s",
		"02/17:24->11/04:00"
	],
	Cancun: [
		-5,
		"n"
	],
	Caracas: [
		-4,
		"n"
	],
	Catamarca: [
		-3,
		"n"
	],
	Cayenne: [
		-3,
		"n"
	],
	Cayman: [
		-5,
		"n"
	],
	Chicago: [
		-5,
		"n",
		"03/11:02->11/04:02"
	],
	Chihuahua: [
		-6,
		"n",
		"04/01:02->10/28:02"
	],
	Coral_Harbour: [
		-5,
		"n"
	],
	Cordoba: [
		-3,
		"s"
	],
	Costa_Rica: [
		-6,
		"n"
	],
	Creston: [
		-7,
		"n"
	],
	Cuiaba: [
		-4,
		"s",
		"02/17:24->11/04:00"
	],
	Curacao: [
		-4,
		"n"
	],
	Danmarkshavn: [
		0,
		"n"
	],
	Dawson: [
		-7,
		"n",
		"03/11:02->11/04:02"
	],
	Dawson_Creek: [
		-7,
		"n"
	],
	Denver: [
		-6,
		"n",
		"03/11:02->11/04:02"
	],
	Detroit: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Dominica: [
		-4,
		"n"
	],
	Edmonton: [
		-6,
		"n",
		"03/11:02->11/04:02"
	],
	Eirunepe: [
		-5,
		"n"
	],
	El_Salvador: [
		-6,
		"n"
	],
	Ensenada: [
		-7,
		"n",
		"03/11:02->11/04:02"
	],
	Fort_Wayne: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Fortaleza: [
		-3,
		"n"
	],
	Glace_Bay: [
		-3,
		"n",
		"03/11:02->11/04:02"
	],
	Godthab: [
		-2,
		"n",
		"03/24:22->10/27:23"
	],
	Goose_Bay: [
		-3,
		"n",
		"03/11:02->11/04:02"
	],
	Grand_Turk: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Grenada: [
		-4,
		"n"
	],
	Guadeloupe: [
		-4,
		"n"
	],
	Guatemala: [
		-6,
		"n"
	],
	Guayaquil: [
		-5,
		"n"
	],
	Guyana: [
		-4,
		"n"
	],
	Halifax: [
		-3,
		"n",
		"03/11:02->11/04:02"
	],
	Havana: [
		-4,
		"n",
		"03/11:00->11/04:01"
	],
	Hermosillo: [
		-7,
		"n"
	],
	Indiana: [
		-4,
		"n",
		"03/12:03->11/05:01"
	],
	Indianapolis: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Inuvik: [
		-6,
		"n",
		"03/11:02->11/04:02"
	],
	Iqaluit: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Jamaica: [
		-5,
		"n"
	],
	Jujuy: [
		-3,
		"n"
	],
	Juneau: [
		-8,
		"n",
		"03/11:02->11/04:02"
	],
	Kentucky: [
		-4,
		"n",
		"03/12:03->11/05:01"
	],
	Knox_IN: [
		-5,
		"n",
		"03/11:02->11/04:02"
	],
	Kralendijk: [
		-4,
		"n"
	],
	La_Paz: [
		-4,
		"s"
	],
	Lima: [
		-5,
		"s"
	],
	Los_Angeles: [
		-7,
		"n",
		"03/11:02->11/04:02"
	],
	Louisville: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Lower_Princes: [
		-4,
		"n"
	],
	Maceio: [
		-3,
		"n"
	],
	Managua: [
		-6,
		"n"
	],
	Manaus: [
		-4,
		"s"
	],
	Marigot: [
		-4,
		"n"
	],
	Martinique: [
		-4,
		"n"
	],
	Matamoros: [
		-5,
		"n",
		"03/11:02->11/04:02"
	],
	Mazatlan: [
		-6,
		"n",
		"04/01:02->10/28:02"
	],
	Mendoza: [
		-3,
		"n"
	],
	Menominee: [
		-5,
		"n",
		"03/11:02->11/04:02"
	],
	Merida: [
		-5,
		"n",
		"04/01:02->10/28:02"
	],
	Metlakatla: [
		-8,
		"n",
		"03/11:02->11/04:02"
	],
	Mexico_City: [
		-5,
		"n",
		"04/01:02->10/28:02"
	],
	Miquelon: [
		-2,
		"n",
		"03/11:02->11/04:02"
	],
	Moncton: [
		-3,
		"n",
		"03/11:02->11/04:02"
	],
	Monterrey: [
		-5,
		"n",
		"04/01:02->10/28:02"
	],
	Montevideo: [
		-3,
		"s"
	],
	Montreal: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Montserrat: [
		-4,
		"n"
	],
	Nassau: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	New_York: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Nipigon: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Nome: [
		-8,
		"n",
		"03/11:02->11/04:02"
	],
	Noronha: [
		-2,
		"n"
	],
	North_Dakota: [
		-5,
		"n",
		"03/12:03->11/05:01"
	],
	Ojinaga: [
		-6,
		"n",
		"03/11:02->11/04:02"
	],
	Panama: [
		-5,
		"n"
	],
	Pangnirtung: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Paramaribo: [
		-3,
		"n"
	],
	Phoenix: [
		-7,
		"n"
	],
	"Port-au-Prince": [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Port_of_Spain: [
		-4,
		"n"
	],
	Porto_Acre: [
		-5,
		"n"
	],
	Porto_Velho: [
		-4,
		"n"
	],
	Puerto_Rico: [
		-4,
		"n"
	],
	Punta_Arenas: [
		-3,
		"s"
	],
	Rainy_River: [
		-5,
		"n",
		"03/11:02->11/04:02"
	],
	Rankin_Inlet: [
		-5,
		"n",
		"03/11:02->11/04:02"
	],
	Recife: [
		-3,
		"n"
	],
	Regina: [
		-6,
		"n"
	],
	Resolute: [
		-5,
		"n",
		"03/11:02->11/04:02"
	],
	Rio_Branco: [
		-5,
		"n"
	],
	Rosario: [
		-3,
		"n"
	],
	Santa_Isabel: [
		-7,
		"n",
		"03/11:02->11/04:02"
	],
	Santarem: [
		-3,
		"n"
	],
	Santiago: [
		-4,
		"s",
		"05/12:24->08/12:00"
	],
	Santo_Domingo: [
		-4,
		"n"
	],
	Sao_Paulo: [
		-3,
		"s",
		"02/17:24->11/04:00"
	],
	Scoresbysund: [
		0,
		"n",
		"03/25:00->10/28:01"
	],
	Shiprock: [
		-6,
		"n",
		"03/11:02->11/04:02"
	],
	Sitka: [
		-8,
		"n",
		"03/11:02->11/04:02"
	],
	St_Barthelemy: [
		-4,
		"n"
	],
	St_Johns: [
		-2.5,
		"n",
		"03/11:02->11/04:02"
	],
	St_Kitts: [
		-4,
		"n"
	],
	St_Lucia: [
		-4,
		"n"
	],
	St_Thomas: [
		-4,
		"n"
	],
	St_Vincent: [
		-4,
		"n"
	],
	Swift_Current: [
		-6,
		"n"
	],
	Tegucigalpa: [
		-6,
		"n"
	],
	Thule: [
		-3,
		"n",
		"03/11:02->11/04:02"
	],
	Thunder_Bay: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Tijuana: [
		-7,
		"n",
		"03/11:02->11/04:02"
	],
	Toronto: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Tortola: [
		-4,
		"n"
	],
	Vancouver: [
		-7,
		"n",
		"03/11:02->11/04:02"
	],
	Virgin: [
		-4,
		"n"
	],
	Whitehorse: [
		-7,
		"n",
		"03/11:02->11/04:02"
	],
	Winnipeg: [
		-5,
		"n",
		"03/11:02->11/04:02"
	],
	Yakutat: [
		-8,
		"n",
		"03/11:02->11/04:02"
	],
	Yellowknife: [
		-6,
		"n",
		"03/11:02->11/04:02"
	]
};
var Antarctica = {
	Casey: [
		8,
		"s"
	],
	Davis: [
		7,
		"s"
	],
	DumontDUrville: [
		10,
		"s"
	],
	Macquarie: [
		11,
		"s"
	],
	Mawson: [
		5,
		"s"
	],
	McMurdo: [
		12,
		"s",
		"04/01:03->09/30:02"
	],
	Palmer: [
		-4,
		"s",
		"05/13:23->08/13:01"
	],
	Rothera: [
		-3,
		"s"
	],
	South_Pole: [
		12,
		"s",
		"04/01:03->09/30:02"
	],
	Syowa: [
		3,
		"s"
	],
	Troll: [
		2,
		"s",
		"03/25:02->10/28:02"
	],
	Vostok: [
		6,
		"s"
	]
};
var Arctic = {
	Longyearbyen: [
		2,
		"n",
		"03/25:02->10/28:03"
	]
};
var Asia = {
	Aden: [
		3,
		"n"
	],
	Almaty: [
		6,
		"n"
	],
	Amman: [
		3,
		"n",
		"03/30:00->10/26:01"
	],
	Anadyr: [
		12,
		"n"
	],
	Aqtau: [
		5,
		"n"
	],
	Aqtobe: [
		5,
		"n"
	],
	Ashgabat: [
		5,
		"n"
	],
	Ashkhabad: [
		5,
		"n"
	],
	Atyrau: [
		5,
		"n"
	],
	Baghdad: [
		3,
		"n"
	],
	Bahrain: [
		3,
		"n"
	],
	Baku: [
		5,
		"n"
	],
	Bangkok: [
		7,
		"n"
	],
	Barnaul: [
		7,
		"n"
	],
	Beirut: [
		3,
		"n",
		"03/25:00->10/27:24"
	],
	Bishkek: [
		6,
		"n"
	],
	Brunei: [
		8,
		"n"
	],
	Calcutta: [
		5.5,
		"n"
	],
	Chita: [
		9,
		"n"
	],
	Choibalsan: [
		8,
		"n"
	],
	Chongqing: [
		8,
		"n"
	],
	Chungking: [
		8,
		"n"
	],
	Colombo: [
		5.5,
		"n"
	],
	Dacca: [
		6,
		"n"
	],
	Damascus: [
		3,
		"n",
		"03/30:00->10/25:24"
	],
	Dhaka: [
		6,
		"n"
	],
	Dili: [
		9,
		"s"
	],
	Dubai: [
		4,
		"n"
	],
	Dushanbe: [
		5,
		"n"
	],
	Gaza: [
		3,
		"n",
		"03/24:01->10/27:01"
	],
	Harbin: [
		8,
		"n"
	],
	Hebron: [
		3,
		"n",
		"03/24:01->10/27:01"
	],
	Ho_Chi_Minh: [
		7,
		"n"
	],
	Hong_Kong: [
		8,
		"n"
	],
	Hovd: [
		7,
		"n"
	],
	Irkutsk: [
		8,
		"n"
	],
	Istanbul: [
		3,
		"n"
	],
	Jakarta: [
		7,
		"s"
	],
	Jayapura: [
		9,
		"n"
	],
	Jerusalem: [
		3,
		"n",
		"03/23:02->10/28:02"
	],
	Kabul: [
		4.5,
		"n"
	],
	Kamchatka: [
		12,
		"n"
	],
	Karachi: [
		5,
		"n"
	],
	Kashgar: [
		6,
		"n"
	],
	Kathmandu: [
		5.75,
		"n"
	],
	Katmandu: [
		5.75,
		"n"
	],
	Khandyga: [
		9,
		"n"
	],
	Kolkata: [
		5.5,
		"n"
	],
	Krasnoyarsk: [
		7,
		"n"
	],
	Kuala_Lumpur: [
		8,
		"s"
	],
	Kuching: [
		8,
		"n"
	],
	Kuwait: [
		3,
		"n"
	],
	Macao: [
		8,
		"n"
	],
	Macau: [
		8,
		"n"
	],
	Magadan: [
		11,
		"n"
	],
	Makassar: [
		8,
		"s"
	],
	Manila: [
		8,
		"n"
	],
	Muscat: [
		4,
		"n"
	],
	Nicosia: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Novokuznetsk: [
		7,
		"n"
	],
	Novosibirsk: [
		7,
		"n"
	],
	Omsk: [
		6,
		"n"
	],
	Oral: [
		5,
		"n"
	],
	Phnom_Penh: [
		7,
		"n"
	],
	Pontianak: [
		7,
		"n"
	],
	Pyongyang: [
		9,
		"n"
	],
	Qatar: [
		3,
		"n"
	],
	Qyzylorda: [
		6,
		"n"
	],
	Rangoon: [
		6.5,
		"n"
	],
	Riyadh: [
		3,
		"n"
	],
	Saigon: [
		7,
		"n"
	],
	Sakhalin: [
		11,
		"n"
	],
	Samarkand: [
		5,
		"n"
	],
	Seoul: [
		9,
		"n"
	],
	Shanghai: [
		8,
		"n"
	],
	Singapore: [
		8,
		"s"
	],
	Srednekolymsk: [
		12,
		"n"
	],
	Taipei: [
		8,
		"n"
	],
	Tashkent: [
		5,
		"n"
	],
	Tbilisi: [
		4,
		"n"
	],
	Tehran: [
		4.5,
		"n",
		"03/22:00->09/21:24"
	],
	Tel_Aviv: [
		3,
		"n",
		"03/23:02->10/28:02"
	],
	Thimbu: [
		6,
		"n"
	],
	Thimphu: [
		6,
		"n"
	],
	Tokyo: [
		9,
		"n"
	],
	Ujung_Pandang: [
		8,
		"n"
	],
	Ulaanbaatar: [
		8,
		"n"
	],
	Ulan_Bator: [
		8,
		"n",
		"03/25:03->09/29:23"
	],
	Urumqi: [
		6,
		"n"
	],
	"Ust-Nera": [
		10,
		"n"
	],
	Vientiane: [
		7,
		"n"
	],
	Vladivostok: [
		10,
		"n"
	],
	Yakutsk: [
		10,
		"n"
	],
	Yekaterinburg: [
		5,
		"n"
	],
	Yerevan: [
		4,
		"n"
	]
};
var Atlantic = {
	Azores: [
		0,
		"n",
		"03/25:00->10/28:01"
	],
	Bermuda: [
		-3,
		"n",
		"03/11:02->11/04:02"
	],
	Canary: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Cape_Verde: [
		-1,
		"n"
	],
	Faeroe: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Faroe: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Jan_Mayen: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Madeira: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Reykjavik: [
		0,
		"n"
	],
	South_Georgia: [
		-2,
		"n"
	],
	St_Helena: [
		0,
		"n"
	],
	Stanley: [
		-3,
		"n"
	]
};
var Australia = {
	ACT: [
		10,
		"s",
		"04/01:03->10/07:02"
	],
	Adelaide: [
		9.5,
		"s",
		"04/01:03->10/07:02"
	],
	Brisbane: [
		10,
		"s"
	],
	Broken_Hill: [
		9.5,
		"s",
		"04/01:03->10/07:02"
	],
	Canberra: [
		10,
		"s",
		"04/01:03->10/07:02"
	],
	Currie: [
		10,
		"s",
		"04/01:03->10/07:02"
	],
	Darwin: [
		9.5,
		"s"
	],
	Eucla: [
		8.75,
		"s"
	],
	Hobart: [
		10,
		"s",
		"04/01:03->10/07:02"
	],
	LHI: [
		10.5,
		"s",
		"04/01:01->10/07:02"
	],
	Lindeman: [
		10,
		"s"
	],
	Lord_Howe: [
		10.5,
		"s",
		"04/01:01->10/07:02"
	],
	Melbourne: [
		10,
		"s",
		"04/01:03->10/07:02"
	],
	NSW: [
		10,
		"s",
		"04/01:03->10/07:02"
	],
	North: [
		9.5,
		"s"
	],
	Perth: [
		8,
		"s"
	],
	Queensland: [
		10,
		"s"
	],
	South: [
		9.5,
		"s",
		"04/01:03->10/07:02"
	],
	Sydney: [
		10,
		"s",
		"04/01:03->10/07:02"
	],
	Tasmania: [
		10,
		"s",
		"04/01:03->10/07:02"
	],
	Victoria: [
		10,
		"s",
		"04/01:03->10/07:02"
	],
	West: [
		8,
		"s"
	],
	Yancowinna: [
		9.5,
		"s",
		"04/01:03->10/07:02"
	]
};
var Brazil = {
	Acre: [
		-5,
		"s"
	],
	DeNoronha: [
		-2,
		"s"
	],
	East: [
		-3,
		"s",
		"02/17:24->11/04:00"
	],
	West: [
		-4,
		"s"
	]
};
var Canada = {
	Atlantic: [
		-3,
		"n",
		"03/11:02->11/04:02"
	],
	Central: [
		-5,
		"n",
		"03/11:02->11/04:02"
	],
	"East-Saskatchewan": [
		-6,
		"n"
	],
	Eastern: [
		-4,
		"n",
		"03/11:02->11/04:02"
	],
	Mountain: [
		-6,
		"n",
		"03/11:02->11/04:02"
	],
	Newfoundland: [
		-2.5,
		"n",
		"03/11:02->11/04:02"
	],
	Pacific: [
		-7,
		"n",
		"03/11:02->11/04:02"
	],
	Saskatchewan: [
		-6,
		"n"
	],
	Yukon: [
		-7,
		"n",
		"03/11:02->11/04:02"
	]
};
var Chile = {
	Continental: [
		-4,
		"s",
		"05/12:24->08/12:00"
	],
	EasterIsland: [
		-6,
		"s",
		"05/12:22->08/11:22"
	]
};
var Etc = {
	GMT: [
		0,
		"n"
	],
	"GMT+0": [
		0,
		"n"
	],
	"GMT+1": [
		-1,
		"n"
	],
	"GMT+10": [
		-10,
		"n"
	],
	"GMT+11": [
		-11,
		"n"
	],
	"GMT+12": [
		-12,
		"n"
	],
	"GMT+2": [
		-2,
		"n"
	],
	"GMT+3": [
		-3,
		"n"
	],
	"GMT+4": [
		-4,
		"n"
	],
	"GMT+5": [
		-5,
		"n"
	],
	"GMT+6": [
		-6,
		"n"
	],
	"GMT+7": [
		-7,
		"n"
	],
	"GMT+8": [
		-8,
		"n"
	],
	"GMT+9": [
		-9,
		"n"
	],
	"GMT-0": [
		0,
		"n"
	],
	"GMT-1": [
		1,
		"n"
	],
	"GMT-10": [
		10,
		"n"
	],
	"GMT-11": [
		11,
		"n"
	],
	"GMT-12": [
		12,
		"n"
	],
	"GMT-13": [
		13,
		"n"
	],
	"GMT-14": [
		14,
		"n"
	],
	"GMT-2": [
		2,
		"n"
	],
	"GMT-3": [
		3,
		"n"
	],
	"GMT-4": [
		4,
		"n"
	],
	"GMT-5": [
		5,
		"n"
	],
	"GMT-6": [
		6,
		"n"
	],
	"GMT-7": [
		7,
		"n"
	],
	"GMT-8": [
		8,
		"n"
	],
	"GMT-9": [
		9,
		"n"
	],
	GMT0: [
		0,
		"n"
	],
	Greenwich: [
		0,
		"n"
	],
	UCT: [
		0,
		"n"
	],
	UTC: [
		0,
		"n"
	],
	Universal: [
		0,
		"n"
	],
	Zulu: [
		0,
		"n"
	]
};
var Europe = {
	Amsterdam: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Andorra: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Astrakhan: [
		4,
		"n"
	],
	Athens: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Belfast: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Belgrade: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Berlin: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Bratislava: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Brussels: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Bucharest: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Budapest: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Busingen: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Chisinau: [
		3,
		"n",
		"03/25:02->10/28:03"
	],
	Copenhagen: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Dublin: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Gibraltar: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Guernsey: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Helsinki: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Isle_of_Man: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Istanbul: [
		3,
		"n"
	],
	Jersey: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Kaliningrad: [
		2,
		"n"
	],
	Kirov: [
		3,
		"n"
	],
	Kiev: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Lisbon: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Ljubljana: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	London: [
		1,
		"n",
		"03/25:01->10/28:02"
	],
	Luxembourg: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Madrid: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Malta: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Mariehamn: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Minsk: [
		3,
		"n"
	],
	Monaco: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Moscow: [
		3,
		"n"
	],
	Nicosia: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Oslo: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Paris: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Podgorica: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Prague: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Riga: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Rome: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Samara: [
		4,
		"n"
	],
	Saratov: [
		4,
		"n"
	],
	San_Marino: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Sarajevo: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Simferopol: [
		3,
		"n"
	],
	Skopje: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Sofia: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Stockholm: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Tallinn: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Tirane: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Tiraspol: [
		3,
		"n",
		"03/25:02->10/28:03"
	],
	Ulyanovsk: [
		4,
		"n"
	],
	Uzhgorod: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Vaduz: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Vatican: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Vienna: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Vilnius: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Volgograd: [
		3,
		"n"
	],
	Warsaw: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Zagreb: [
		2,
		"n",
		"03/25:02->10/28:03"
	],
	Zaporozhye: [
		3,
		"n",
		"03/25:03->10/28:04"
	],
	Zurich: [
		2,
		"n",
		"03/25:02->10/28:03"
	]
};
var Indian = {
	Antananarivo: [
		3,
		"s"
	],
	Chagos: [
		6,
		"n"
	],
	Christmas: [
		7,
		"n"
	],
	Cocos: [
		6.5,
		"n"
	],
	Comoro: [
		3,
		"n"
	],
	Kerguelen: [
		5,
		"s"
	],
	Mahe: [
		4,
		"n"
	],
	Maldives: [
		5,
		"n"
	],
	Mauritius: [
		4,
		"n"
	],
	Mayotte: [
		3,
		"n"
	],
	Reunion: [
		4,
		"s"
	]
};
var Mexico = {
	BajaNorte: [
		-7,
		"n",
		"03/11:02->11/04:02"
	],
	BajaSur: [
		-6,
		"n",
		"04/01:02->10/28:02"
	],
	General: [
		-5,
		"n",
		"04/01:02->10/28:02"
	]
};
var Pacific = {
	Apia: [
		13,
		"s",
		"04/01:04->09/30:03"
	],
	Auckland: [
		12,
		"s",
		"04/01:03->09/30:02"
	],
	Chatham: [
		12.75,
		"s",
		"04/07:03->09/29:02"
	],
	Chuuk: [
		10,
		"n"
	],
	Easter: [
		-6,
		"s",
		"05/12:22->08/11:22"
	],
	Efate: [
		11,
		"n"
	],
	Enderbury: [
		13,
		"n"
	],
	Fakaofo: [
		13,
		"n"
	],
	Fiji: [
		12,
		"s",
		"01/14:03->11/04:02"
	],
	Funafuti: [
		12,
		"n"
	],
	Galapagos: [
		-6,
		"n"
	],
	Gambier: [
		-9,
		"n"
	],
	Guadalcanal: [
		11,
		"n"
	],
	Guam: [
		10,
		"n"
	],
	Honolulu: [
		-10,
		"n"
	],
	Johnston: [
		-10,
		"n"
	],
	Kiritimati: [
		14,
		"n"
	],
	Kosrae: [
		11,
		"n"
	],
	Kwajalein: [
		12,
		"n"
	],
	Majuro: [
		12,
		"n"
	],
	Marquesas: [
		-9.5,
		"n"
	],
	Midway: [
		-11,
		"n"
	],
	Nauru: [
		12,
		"n"
	],
	Niue: [
		-11,
		"n"
	],
	Norfolk: [
		11.5,
		"n"
	],
	Noumea: [
		11,
		"n"
	],
	Pago_Pago: [
		-11,
		"n"
	],
	Palau: [
		9,
		"n"
	],
	Pitcairn: [
		-8,
		"n"
	],
	Pohnpei: [
		11,
		"n"
	],
	Ponape: [
		11,
		"n"
	],
	Port_Moresby: [
		10,
		"n"
	],
	Rarotonga: [
		-10,
		"n"
	],
	Saipan: [
		10,
		"n"
	],
	Samoa: [
		-11,
		"n"
	],
	Tahiti: [
		-10,
		"n"
	],
	Tarawa: [
		12,
		"n"
	],
	Tongatapu: [
		13,
		"s",
		"01/15:02->11/05:03"
	],
	Truk: [
		10,
		"n"
	],
	Wake: [
		12,
		"n"
	],
	Wallis: [
		12,
		"n"
	],
	Yap: [
		10,
		"n"
	]
};
var zonefile = {
	Africa: Africa,
	America: America,
	Antarctica: Antarctica,
	Arctic: Arctic,
	Asia: Asia,
	Atlantic: Atlantic,
	Australia: Australia,
	Brazil: Brazil,
	Canada: Canada,
	Chile: Chile,
	Etc: Etc,
	Europe: Europe,
	Indian: Indian,
	Mexico: Mexico,
	Pacific: Pacific
};

//assumed hemisphere, based on continent
const southern = {
  Australia: true,
  Chile: true,
  Brazil: true,
  Antarctica: true
};

//compress timezone data by continent
const unpack = obj => {
  let all = {};
  let keys = Object.keys(obj);
  keys.forEach(cont => {
    let cities = Object.keys(obj[cont]);
    cities.forEach(city => {
      let tz = cont + '/' + city;
      let arr = obj[cont][city];

      all[tz] = {
        o: arr[0],
        h: arr[1],
      };
      if (arr[2]) {
        all[tz].dst = arr[2];
      }
      //assume north, unless it says otherwise (sorry!)
      if (southern[cont] === true) {
        all[tz].h = 's';
      }
    });
  });
  //add this rando
  all['Etc/UTC'] = {
    o: 0,
    h: "n"
  };
  all.UTC = all['Etc/UTC'];
  return all;
};

const data = unpack(zonefile);

const validate = function(n) {
  //handle number as a string
  if (typeof n === 'string') {
    n = parseInt(n, 10);
  }
  return n;
};

const order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

//reduce hostile micro-changes when moving dates by millisecond
const confirm = function(s, tmp, unit) {
  let n = order.indexOf(unit);
  let arr = order.slice(n, order.length);
  for (let i = 0; i < arr.length; i++) {
    let want = tmp[arr[i]]();
    s[arr[i]](want);
  }
  return s;
};

const methods$1 = {
  milliseconds: (s, n) => {
    n = validate(n);
    let current = s.millisecond();
    let diff = current - n; //milliseconds to shift by
    return s.epoch - diff;
  },

  seconds: (s, n) => {
    n = validate(n);
    let diff = s.second() - n;
    let shift = diff * o.second;
    return s.epoch - shift;
  },

  minutes: (s, n) => {
    n = validate(n);
    let old = s.clone();
    let diff = s.minute() - n;
    let shift = diff * o.minute;
    s.epoch -= shift;
    confirm(s, old, 'second');
    return s.epoch;
  },

  hours: (s, n) => {
    n = validate(n);
    let old = s.clone();
    let diff = s.hour() - n;
    let shift = diff * o.hour;
    s.epoch -= shift;
    confirm(s, old, 'minute');
    return s.epoch;
  },

  //support setting time by '4:25pm' - this isn't very-well developed..
  time: (s, str) => {
    let m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);
    if (!m) {
      //fallback to support just '2am'
      m = str.match(/([0-9]{1,2})(am|pm)/);
      if (!m) {
        return s.epoch;
      }
      m.splice(2, 0, '0'); //add implicit 0 minutes
    }
    let h24 = false;
    let hour = parseInt(m[1], 10);
    let minute = parseInt(m[2], 10);
    if (hour > 12) {
      h24 = true;
    }
    //make the hour into proper 24h time
    if (h24 === false) {
      if (m[3] === 'am' && hour === 12) {
        //12am is midnight
        hour = 0;
      }
      if (m[3] === 'pm' && hour < 12) {
        //12pm is noon
        hour += 12;
      }
    }
    s = s.hour(hour);
    s = s.minute(minute);
    s = s.second(0);
    s = s.millisecond(0);
    return s.epoch;
  },

  date: (s, n) => {
    n = validate(n);
    walkTo(s, {
      date: n,
    });
    return s.epoch;
  },

  //this one's tricky
  month: (s, n) => {
    if (typeof n === 'string') {
      n = months.mapping()[n.toLowerCase()];
    }
    n = validate(n);
    let date = s.date();
    //there's no 30th of february, etc.
    if (date > monthLengths[n]) {
      //make it as close as we can..
      date = monthLengths[n];
    }
    walkTo(s, {
      month: n,
      date: date,
    });
    return s.epoch;
  },

  year: (s, n) => {
    n = validate(n);
    walkTo(s, {
      year: n,
    });
    return s.epoch;
  },

  dayOfYear: (s, n) => {
    n = validate(n);
    let old = s.clone();
    let diff = n - s.dayOfYear();
    let shift = diff * o.day;
    s.epoch += shift;
    confirm(s, old, 'hour');
    return s.epoch;
  },
};

//the most basic get/set methods
let methods$2 = {
  millisecond: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = methods$1.milliseconds(s, num);
      return s;
    }
    return this.d.getMilliseconds();
  },
  second: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = methods$1.seconds(s, num);
      return s;
    }
    return this.d.getSeconds();
  },
  minute: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = methods$1.minutes(s, num);
      return s;
    }
    return this.d.getMinutes();
  },
  hour: function(num) {
    let d = this.d;
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = methods$1.hours(s, num);

      walkTo(s, {
        hour: num
      });

      return s;
    }
    return d.getHours();
  },
  hour12: function(str) {
    let d = this.d;
    if (str !== undefined) {
      let s = this.clone();
      str = '' + str;
      let m = str.match(/^([0-9]+)(am|pm)$/);
      if (m) {
        let hour = parseInt(m[1], 10);
        if (m[2] === 'pm') {
          hour += 12;
        }
        s.epoch = methods$1.hours(s, hour);
      }
      return s;
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
      let s = this.clone();
      s.epoch = methods$1.date(s, num);
      return s;
    }
    return this.d.getDate();
  },
  month: function(input) {
    if (input !== undefined) {
      let s = this.clone();
      s.epoch = methods$1.month(s, input);
      return s;
    }
    return this.d.getMonth();
  },
  year: function(num) {
    if (num !== undefined) {
      let s = this.clone();
      s.epoch = methods$1.year(s, num);
      return s;
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
      let s = this.clone();
      str = str || '';
      str = str.toLowerCase();
      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str]);
      }
      return s;
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
      let s = this.clone();
      s.epoch = methods$1.dayOfYear(s, num);
      return s;
    }
    //days since newyears - jan 1st is 1, jan 2nd is 2...
    let sum = 0;
    let month = this.d.getMonth();
    let tmp;
    //count the num days in each month
    for (let i = 1; i <= month; i++) {
      tmp = new Date();
      tmp.setDate(1);
      tmp.setYear(this.d.getFullYear()); //the year matters, because leap-years
      tmp.setHours(1);
      tmp.setMinutes(1);
      tmp.setMonth(i);
      tmp.setHours(-2); //the last day of the month
      sum += tmp.getDate();
    }
    return sum + this.d.getDate();
  },
  //bc/ad years
  era: function(str) {
    if (str !== undefined) {
      let s = this.clone();
      str = str.toLowerCase();
      //TODO: there is no year-0AD i think. may have off-by-1 error here
      let year = s.d.getFullYear();
      //make '1992' into 1992bc..
      if (str === 'bc' && year > 0) {
        s.epoch = methods$1.year(s, year * -1);
      }
      //make '1992bc' into '1992'
      if (str === 'ad' && year < 0) {
        s.epoch = methods$1.year(s, year * -1);
      }
      return s;
    }
    if (this.d.getFullYear() < 0) {
      return 'BC'
    }
    return 'AD'
  },

  //alias of 'since' but opposite - like moment.js
  from: function(d) {
    d = this.clone().set(d);
    return d.since(this)
  },
  fromNow: function() {
    let d = this.clone().set(Date.now());
    return d.since(this)
  }
};
//aliases
methods$2.milliseconds = methods$2.millisecond;
methods$2.seconds = methods$2.second;
methods$2.minutes = methods$2.minute;
methods$2.hours = methods$2.hour;
methods$2.hour24 = methods$2.hour;
methods$2.h12 = methods$2.hour12;
methods$2.h24 = methods$2.hour24;
methods$2.days = methods$2.day;

//destructive setters change the seconds, milliseconds, etc
//- and not just the unit they're setting

const clearMinutes = function(s) {
  s = s.minute(0);
  s = s.second(0);
  s = s.millisecond(1);
  return s
};

const methods$3 = {
  //some ambiguity here with 12/24h
  time: function(str) {
    if (str !== undefined) {
      let s = this.clone();
      s.epoch = methods$1.time(s, str);
      return s;
    }
    return this.format('time-h12');
  },

  //since the start of the year
  week: function(num) {
    if (num !== undefined) {
      let s = this.clone();
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
        let s = this.clone();
        let month = quarters[num][0];
        s = s.month(month);
        s = s.date(1);
        s = s.hour(0);
        s = clearMinutes(s);
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
      let s = this.clone();
      let minute = num % 1;
      minute = minute * 60;
      let hour = parseInt(num, 10);
      s.epoch = methods$1.hours(s, hour);
      s.epoch = methods$1.minutes(s, minute);
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
    if (this.timezone().hemisphere === 'South') {
      hem = 'south';
    }
    if (input !== undefined) {
      let s = this.clone();
      for (let i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          s = s.month(seasons[hem][i][1]);
          s = s.date(1);
          s = s.hour(0);
          s = clearMinutes(s);
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

//non-destructive getters/setters with fancy moves to do
const methods$4 = {
  //like 'wednesday' (hard!)
  day: function(input) {
    if (input === undefined) {
      return this.d.getDay();
    }
    let original = this.clone();
    let want = input;
    // accept 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days.short().indexOf(input);
      if (want === -1) {
        want = days.long().indexOf(input);
      }
    }
    //move approx
    let day = this.d.getDay();
    let diff = day - want;
    let s = this.subtract(diff * 24, 'hours');
    //tighten it back up
    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    return s;
  },

  ampm: function(input) {
    let which = 'am';
    let hour = this.hour();
    if (hour >= 12) {
      which = 'pm';
    }
    if (input === undefined) {
      return which;
    }
    let s = this.clone();
    if (input === which) {
      return s;
    }
    if (s === 'am') {
      s = s.subtract(12, 'hours');
    } else {
      s = s.add(12, 'hours');
    }
    return s;
  },

  //these are helpful name-wrappers
  dayName: function(input) {
    if (input === undefined) {
      return days.long()[this.day()];
    }
    let s = this.clone();
    s = s.day(input);
    return s;
  },

  monthName: function(input) {
    if (input === undefined) {
      return months.long()[this.month()];
    }
    let s = this.clone();
    s = s.month(input);
    return s
  }
};

const addMethods = Space => {
  //hook the methods into prototype
  Object.keys(methods$2).forEach(k => {
    Space.prototype[k] = methods$2[k];
  });
  Object.keys(methods$3).forEach(k => {
    Space.prototype[k] = methods$3[k];
  });
  Object.keys(methods$4).forEach(k => {
    Space.prototype[k] = methods$4[k];
  });
};

const order$1 = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
let keep = {
  second: order$1.slice(0, 1),
  minute: order$1.slice(0, 2),
  quarterhour: order$1.slice(0, 2),
  hour: order$1.slice(0, 3),
  date: order$1.slice(0, 4),
  month: order$1.slice(0, 4),
  quarter: order$1.slice(0, 4),
  season: order$1.slice(0, 4),
  year: order$1
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

const addMethods$1 = SpaceTime => {
  SpaceTime.prototype.add = function(num, unit) {
    let s = this.clone();
    let old = this.clone();
    unit = normalize(unit);
    //move forward by the estimated milliseconds (rough)
    if (o[unit]) {
      s.epoch += o[unit] * num;
    } else if (unit === 'week') {
      s.epoch += o.day * (num * 7);
    } else if (unit === 'quarter' || unit === 'season') {
      s.epoch += o.month * (num * 4);
    } else if (unit === 'season') {
      s.epoch += o.month * (num * 4);
    } else if (unit === 'quarterhour') {
      s.epoch += o.minute * 15;
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
    else if (unit === 'date' && num !== 0 && old.isSame(s, 'day')) {
      want.date = old.date() + num;
    }
    //ensure year has changed (leap-years)
    else if (unit === 'year' && s.year() === old.year()) {
      s.epoch += o.week;
    }
    //keep current date, unless the month doesn't have it.
    if (keepDate[unit]) {
      let max = monthLengths[want.month];
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
    let s = this.clone();
    return s.add(num * -1, unit);
  };
  //add aliases
  SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
  SpaceTime.prototype.plus = SpaceTime.prototype.add;
};

//make a string, for easy comparison between dates
const print = {
  millisecond: s => {
    return s.epoch;
  },
  second: s => {
    return [
      s.year(),
      s.month(),
      s.date(),
      s.hour(),
      s.minute(),
      s.second(),
    ].join('-');
  },
  minute: s => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
  },
  hour: s => {
    return [s.year(), s.month(), s.date(), s.hour()].join('-');
  },
  day: s => {
    return [s.year(), s.month(), s.date()].join('-');
  },
  week: s => {
    return [s.year(), s.week()].join('-');
  },
  month: s => {
    return [s.year(), s.month()].join('-');
  },
  quarter: s => {
    return [s.year(), s.quarter()].join('-');
  },
  year: s => {
    return s.year();
  },
};
print.date = print.day;

const addMethods$2 = SpaceTime => {

  SpaceTime.prototype.isSame = function(b, unit) {
    let a = this;
    if (typeof b === 'string' || typeof b === 'number') {
      b = new SpaceTime(b, this.timezone.name);
    }
    //support 'seconds' aswell as 'second'
    unit = unit.replace(/s$/, '');

    if (print[unit]) {
      return print[unit](a) === print[unit](b);
    }
    return null;
  };

};

const addMethods$3 = SpaceTime => {
  const methods = {
    isAfter: function(d) {
      d = beADate(d, this);
      let epoch = getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch > epoch;
    },
    isBefore: function(d) {
      d = beADate(d, this);
      let epoch = getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch < epoch;
    },
    isEqual: function(d) {
      d = beADate(d, this);
      let epoch = getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch === epoch;
    },
    isBetween: function(start, end) {
      start = beADate(start, this);
      end = beADate(end, this);
      let startEpoch = getEpoch(start);
      if (startEpoch === null) {
        return null;
      }
      let endEpoch = getEpoch(end);
      if (endEpoch === null) {
        return null;
      }
      return (startEpoch < this.epoch) && (this.epoch < endEpoch);
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  });
};

const addMethods$4 = SpaceTime => {
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

let zonefile$1 = Object.assign({}, data);

//fake timezone-support, for fakers (es5 class)
const SpaceTime = function(input, tz, options) {
  options = options || {};
  //the holy moment
  this.epoch = new Date().getTime();
  //the shift for the given timezone
  this.tz = tz || guessTz();
  //whether to output warnings to console
  this.silent = options.silent || false;
  //add getter/setters
  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function() {
      let meta = timezone(this) || {};
      //every computer is somewhere- get this computer's built-in offset
      let bias = new Date(this.epoch).getTimezoneOffset() || 0;
      //movement
      let shift = bias + (meta.current.offset * 60); //in minutes
      shift = shift * 60 * 1000; //in ms
      //remove this computer's offset
      let epoch = this.epoch + shift;
      let d = new Date(epoch);
      return d
    }
  });
  //add this data on the object, to allow adding new timezones
  Object.defineProperty(this, 'timezones', {
    get: function() {
      return zonefile$1
    },
    set: function(obj) {
      zonefile$1 = obj;
      return obj
    }
  });
  //parse the various formats
  let tmp = parseInput(this, input, tz, options);
  this.epoch = tmp.epoch;
};

//(add instance methods to prototype)
Object.keys(methods).forEach(k => {
  SpaceTime.prototype[k] = methods[k];
});

// ¯\_(ツ)_/¯
SpaceTime.prototype.clone = function() {
  return new SpaceTime(this.epoch, this.tz, {
    silent: this.silent
  })
};
addMethods(SpaceTime);
addMethods$1(SpaceTime);
addMethods$2(SpaceTime);
addMethods$3(SpaceTime);
addMethods$4(SpaceTime);

// import timezones from '../data'

const whereIts = function(a, b) {
  let start = new SpaceTime(null);
  let end = new SpaceTime(null);
  start = start.time(a);
  //if b is undefined, use as 'within one hour'
  if (b) {
    end = end.time(b);
  } else {
    end = start.add(59, 'minutes');
  }

  let startHour = start.hour();
  let endHour = end.hour();
  let tzs = Object.keys(start.timezones).filter(tz => {
    let m = new SpaceTime(null, tz);
    let hour = m.hour();
    //do 'calendar-compare' not real-time-compare
    if (hour >= startHour && hour <= endHour) {
      //test minutes too, if applicable
      if (hour === startHour && m.minute() < start.minute()) {
        return false;
      }
      if (hour === endHour && m.minute() > end.minute()) {
        return false;
      }
      return true;
    }
    return false;
  });
  return tzs;
};

var name = "spacetime";
var version = "4.5.1";
var description = "figure-out dates across timezones";
var main = "./src/index.js";
var license = "Apache-2.0";
var scripts = {
	build: "node ./scripts/build.js",
	"build:tz": "node ./scripts/updateZonefile.js",
	watch: "node --experimental-modules scratch.mjs",
	test: "TESTENV=dev tape ./test/**/*.test.js --experimental-modules | tap-dancer",
	"test-spec": "TESTENV=dev tape ./test/**/*.test.js | tap-spec",
	testb: "TESTENV=prod tape ./test/**/*.test.js | tap-dancer",
	coverage: "node ./scripts/coverage.js"
};
var repository = {
	type: "git",
	url: "https://github.com/smallwins/spacetime.git"
};
var files = [
	"./builds/spacetime.js",
	"./builds/spacetime.min.js"
];
var dependencies = {
	"rollup-plugin-json": "^3.1.0"
};
var devDependencies = {
	"@babel/core": "^7.1.6",
	"@babel/preset-env": "7.1.6",
	amble: "0.0.6",
	babelify: "10.0.0",
	browserify: "16.2.3",
	derequire: "^2.0.6",
	nyc: "13.1.0",
	shelljs: "0.8.2",
	"tap-dancer": "0.1.2",
	"tap-spec": "5.0.0",
	tape: "4.9.1",
	timekeeper: "2.1.2",
	"uglify-js": "3.4.9"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	license: license,
	scripts: scripts,
	repository: repository,
	files: files,
	dependencies: dependencies,
	devDependencies: devDependencies
};

const main$1 = function(input, tz, options) {
  return new SpaceTime(input, tz, options);
};

//some helper functions on the main method
main$1.now = function(tz, options) {
  return new SpaceTime(new Date().getTime(), tz, options);
};
main$1.today = function(tz, options) {
  let s = new SpaceTime(new Date().getTime(), tz, options);
  return s.startOf('day');
};
main$1.tomorrow = function(tz, options) {
  let s = new SpaceTime(new Date().getTime(), tz, options);
  return s.add(1, 'day').startOf('day');
};
main$1.yesterday = function(tz, options) {
  let s = new SpaceTime(new Date().getTime(), tz, options);
  return s.subtract(1, 'day').startOf('day');
};
main$1.extend = function(obj) {
  Object.keys(obj).forEach((k) => {
    SpaceTime.prototype[k] = obj[k];
  });
  return this
};
//find tz by time
main$1.whereIts = whereIts;
//this is handy
main$1.version = pkg.version;

//aliases:
main$1.plugin = main$1.extend;

export default main$1;
