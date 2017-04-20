'use strict';
const fmt = require('../fns');
const months = require('../data/months');
const days = require('../data/days');

const fns = {
  day: (s) => {
    return fmt.titleCase(days.long[s.day()]);
  },
  'day-short': (s) => {
    return fmt.titleCase(days.short[s.day()]);
  },
  date: (s) => {
    return '' + s.date();
  },
  'date-ordinal': (s) => {
    return fmt.ordinal(s.date());
  },
  'month': (s) => {
    return fmt.titleCase(months.long[s.month()]);
  },
  'month-short': (s) => {
    return fmt.titleCase(months.short[s.month()]);
  },
  'time': (s) => {
    return `${s.h12()}:${s.minute()}${s.ampm()}`; //3:45pm
  },
  'time-24h': (s) => {
    return `${s.hour()}:${s.minute()}`; //13:45
  },
  'year': (s) => {
    return '' + s.year();
  },
  'year-short': (s) => {
    return '\'' + ('' + s.year()).substr(2, 4);
  },
  'numeric-us': (s) => {
    return `${fmt.zeroPad(s.month())}/${fmt.zeroPad(s.date())}/${s.year()}`; //mm/dd/yyyy
  },
  'numeric-uk': (s) => {
    return `${fmt.zeroPad(s.date())}/${fmt.zeroPad(s.month())}/${s.year()}`; //dd/mm/yyyy
  },
  'numeric-cn': (s) => {
    return `${s.year()}/${fmt.zeroPad(s.month())}/${fmt.zeroPad(s.date())}`; //yyyy/mm/dd
  },
  'iso': (s) => {
    let month = fmt.zeroPad(s.month() + 1); //1-based months
    let date = fmt.zeroPad(s.date());
    let hour = fmt.zeroPad(s.h24());
    let minute = fmt.zeroPad(s.minute());
    let second = fmt.zeroPad(s.second());
    let ms = fmt.zeroPad(s.millisecond(), 3);
    return `${s.year()}-${month}-${date}T${hour}:${minute}:${second}:${ms}Z`; //2017-03-08T19:45:28.367Z
  },
  'iso-short': (s) => {
    let month = fmt.zeroPad(s.month() + 1); //1-based months
    let date = fmt.zeroPad(s.date());
    return `${s.year()}-${month}-${date}`; //2017-02-15
  },
  'iso-utc': (s) => {
    return (new Date(s.epoch)).toISOString(); //2017-03-08T19:45:28.367Z
  }
};
fns['nice'] = (s) => {
  let day = fns.day(s);
  let month = fns.month(s);
  let ord = fns['date-ordinal'](s);
  let time = fns.time(s);
  return `${day} ${month} ${ord}, ${time}`;
};
fns['nice-short'] = (s) => {
  let day = fns['day-short'](s);
  let month = fns['month-short'](s);
  let ord = fns['date-ordinal'](s);
  let time = fns.time(s);
  return `${day} ${month} ${ord}, ${time}`;
};
fns['full'] = (s) => {
  let day = fns.day(s);
  let month = fns.month(s);
  let ord = fns['date-ordinal'](s);
  let year = s.year();
  return `${day} ${month} ${ord}, ${year}`;
};
fns['full-short'] = (s) => {
  let day = fns['day-short'](s);
  let month = fns['month-short'](s);
  let ord = fns['date-ordinal'](s);
  let year = s.year();
  return `${day} ${month} ${ord}, ${year}`;
};
fns['date-short'] = fns.date;
fns['time-12h'] = fns.time;

fns['numeric'] = fns['numeric-us']; //sorry!
fns['mdy'] = fns['numeric-us'];
fns['dmy'] = fns['numeric-uk'];
fns['ymd'] = fns['numeric-cn'];
fns['little-endian'] = fns['numeric-uk'];
fns['big-endian'] = fns['numeric-cn'];

//
const format = (s, fmt) => {
  if (fmt && fns[fmt]) {
    return fns[fmt](s);
  }
  //start building format object
  let all = Object.keys(fns).reduce((h, k) => {
    h[k] = fns[k](s);
    return h;
  }, {});

  return all;
};
module.exports = format;
