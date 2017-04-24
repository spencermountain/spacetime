'use strict';
const fns = require('../fns');
const months = require('../data/months');
const days = require('../data/days');

const fmt = {
  day: (s) => {
    return fns.titleCase(days.long[s.day()]);
  },
  'day-short': (s) => {
    return fns.titleCase(days.short[s.day()]);
  },
  date: (s) => {
    return '' + s.date();
  },
  'date-ordinal': (s) => {
    return fns.ordinal(s.date());
  },
  'month': (s) => {
    return fns.titleCase(months.long[s.month()]);
  },
  'month-short': (s) => {
    return fns.titleCase(months.short[s.month()]);
  },
  'time': (s) => {
    return `${s.h12()}:${fns.zeroPad(s.minute())}${s.ampm()}`; //3:45pm
  },
  'time-24h': (s) => {
    return `${s.hour()}:${fns.zeroPad(s.minute())}`; //13:45
  },
  'year': (s) => {
    return '' + s.year();
  },
  'year-short': (s) => {
    return '\'' + ('' + s.year()).substr(2, 4);
  },
  'numeric-us': (s) => {
    return `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}/${s.year()}`; //mm/dd/yyyy
  },
  'numeric-uk': (s) => {
    return `${fns.zeroPad(s.date())}/${fns.zeroPad(s.month() + 1)}/${s.year()}`; //dd/mm/yyyy
  },
  'numeric-cn': (s) => {
    return `${s.year()}/${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`; //yyyy/mm/dd
  },
  'iso': (s) => {
    let month = fns.zeroPad(s.month() + 1); //1-based months
    let date = fns.zeroPad(s.date());
    let hour = fns.zeroPad(s.h24());
    let minute = fns.zeroPad(s.minute());
    let second = fns.zeroPad(s.second());
    let ms = fns.zeroPad(s.millisecond(), 3);
    return `${s.year()}-${month}-${date}T${hour}:${minute}:${second}:${ms}Z`; //2017-03-08T19:45:28.367Z
  },
  'iso-short': (s) => {
    let month = fns.zeroPad(s.month() + 1); //1-based months
    let date = fns.zeroPad(s.date());
    return `${s.year()}-${month}-${date}`; //2017-02-15
  },
  'iso-utc': (s) => {
    return (new Date(s.epoch)).toISOString(); //2017-03-08T19:45:28.367Z
  }
};
fmt['nice'] = (s) => {
  let month = fmt.month(s);
  let ord = fmt['date-ordinal'](s);
  let time = fmt.time(s);
  return `${month} ${ord}, ${time}`;
};
fmt['nice-day'] = (s) => {
  let day = fmt.day(s);
  let month = fmt.month(s);
  let ord = fmt['date-ordinal'](s);
  let time = fmt.time(s);
  return `${day} ${month} ${ord}, ${time}`;
};
fmt['nice-short'] = (s) => {
  let month = fmt['month-short'](s);
  let ord = fmt['date-ordinal'](s);
  let time = fmt.time(s);
  return `${month} ${ord}, ${time}`;
};
fmt['full'] = (s) => {
  let day = fmt.day(s);
  let month = fmt.month(s);
  let ord = fmt['date-ordinal'](s);
  let year = s.year();
  return `${day} ${month} ${ord}, ${year}`;
};
fmt['full-short'] = (s) => {
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
fmt['time-h12'] = fmt['time-12h'];
fmt['time-h24'] = fmt['time-24h'];
fmt['numeric'] = fmt['numeric-us']; //sorry!
fmt['mdy'] = fmt['numeric-us'];
fmt['dmy'] = fmt['numeric-uk'];
fmt['ymd'] = fmt['numeric-cn'];
fmt['little-endian'] = fmt['numeric-uk'];
fmt['big-endian'] = fmt['numeric-cn'];

//
const format = (s, type) => {
  if (fmt && fmt[type]) {
    return fmt[type](s);
  }
  //start building format object
  let all = Object.keys(fmt).reduce((h, k) => {
    h[k] = fmt[k](s);
    return h;
  }, {});

  return all;
};
module.exports = format;
