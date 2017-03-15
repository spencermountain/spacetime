'use strict';
//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	"2015-03-25" (The International Standard)
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

const isArray = function(input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};

const zeroHour = function() {};

//support [2016, 03, 01] format
const handleArray = function(s, arr) {
  let units = [
    'year',
    'month',
    'date',
    'hour',
    'minute',
    'second',
    'millisecond',
  ];
  for(let i = 0; i < arr.length; i++) {
    let unit = units[i];
    let num = arr[i] || 0;
    s[unit](num);
  }
  // s.millisecond(1);
  return s;
};

const strFmt = [
  //iso "2015-03-25" or "2015/03/25" //0-based-months!
  {
    reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
    parse: (s, arr) => {
      s.year(arr[1]);
      let month = parseInt(arr[2], 10) - 1;
      s.month(month);
      s.date(arr[3]);
    }
  },
  //short - uk "03/25/2015"  //0-based-months!
  {
    reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]([0-9]{4})$/,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1;
      s.month(month);
      s.date(arr[2]);
      s.year(arr[3]);
    }
  },
  //Long "Mar 25 2015"
  {
    reg: /^([a-z]+) ([0-9]{1,2}) ([0-9]{4})$/i,
    parse: (s, arr) => {
      s.month(arr[1]);
      s.date(arr[2]);
      s.year(arr[3]);
    }
  },
  //Long "25 Mar 2015"
  {
    reg: /^([0-9]{1,2}) ([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      s.date(arr[1]);
      s.month(arr[2]);
      s.year(arr[3]);
    }
  },
];

//find the epoch from different input styles
const parseInput = (s, input) => {
  if (typeof input === 'number') {
    s.epoch = input;
    return;
  }
  //set tmp time
  s.epoch = Date.now();
  if (input === null || input === undefined) {
    return; //k, we're good.
  }
  //support [2016, 03, 01] format
  if (isArray(input)) {
    handleArray(s, input);
    return;
  }
  if (typeof input !== 'string') {
    return;
  }

  for(let i = 0; i < strFmt.length; i++) {
    let m = input.match(strFmt[i].reg);
    if (m) {
      strFmt[i].parse(s, m);
      return;
    }
  }
};
module.exports = parseInput;
