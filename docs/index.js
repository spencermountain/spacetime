module.exports = {
  main: {
    goto: {
      doc: 'move to a new timezone, but at this same moment. Accepts a IANA code.',
      out: 'self'
    },
    clone: {
      doc: 'make a copy of this object, with no references to the original',
      out: 'self'
    },
    timezone: {
      doc: 'return a bunch of meta-data about your current timezone',
      out: 'Object'
    },
    format: {
      doc: 'output nicely-formatted strings',
      out: 'String/Object'
    },
    //set
    startOf: {
      doc: 'move to the first millisecond of the day, week, month, year, etc.',
      out: 'self'
    },
    endOf: {
      doc: 'move to the last millisecond of the day, week, month, year, etc.',
      out: 'self'
    },
    add: {
      doc: 'increment the time by a number and unit - like an hour, minute, day, or year',
      out: 'self'
    },
    subtract: {
      doc: 'decrease the time by a number and unit - like an hour, minute, day, or year',
      out: 'self'
    },
    //comparison
    isAfter: {
      doc: 'pass-in a spacetime object or date input and see if it takes-place after your spacetime date/time',
      out: 'Boolean'
    },
    isBefore: {
      doc: 'pass-in a spacetime object or date input and see if it takes-place before your spacetime date/time',
      out: 'Boolean'
    },
    isEqual: {
      doc: 'is this date on the exact same millisecond as another',
      out: 'Boolean'
    },
    isSame: {
      doc: ' detect if two date/times are the same day, week, or year, etc',
      out: 'Boolean'
    },
    diff: {
      doc: 'given a date amd a unit, count how many of them you\'d need to make the dates equal',
      out: 'Number'
    },
  },

  //getter/setters
  getters: {
    millisecond: {
      doc: 'set or return the current number of milliseconds (0-999)',
      out: 'self/Number'
    },
    second: {
      doc: 'set or return the current number of seconds (0-59)',
      out: 'self/Number'
    },
    minute: {
      doc: 'set or return the current number of minutes (0-59)',
      out: 'self/Number'
    },
    hour: {
      doc: 'set or return the current hour, in 24 time (0-23). also accepts/parses \'3pm\'',
      out: 'self/Number'
    },
    date: {
      doc: 'set or return the day-number of the month (1- max31)',
      out: 'self/Number'
    },
    month: {
      doc: 'set or return the zero-based month-number (0-11). Also accepts \'June\', or \'oct\'.',
      out: 'self/Number'
    },
    year: {
      doc: 'set or return the 4-digit year as an integer',
      out: 'self/Number'
    },
    dayOfYear: {
      doc: 'set or return the day of the year (1-366). Jan 1st is 1, Dec 31st is 366.',
      out: 'self/Number'
    },
    time: {
      doc: 'set or return a formatted, 12-hour time, like \'11:30pm\'',
      out: 'self/Number'
    },
    week: {
      doc: 'set or return the week-number of the year (1-52).',
      out: 'self/Number'
    },
    quarter: {
      doc: 'set or return the fiscal-quarter (1-4)',
      out: 'self/Number'
    },
    season: {
      doc: 'set or return the name of the season, spring/summer/fall/autumn/winter',
      out: 'self/String'
    },
    hourFloat: {
      doc: 'set or return the hour + minute in decimal form, so \'3:30am\' is 3.5',
      out: 'self/Number'
    },
    day: {
      doc: 'set or return the day of the week as an integer, starting on sunday (day-0). Also accepts names like \'wednesday\', or \'thurs\'',
      out: 'self/Number'
    },
    ampm: {
      doc: 'set or return whether the time is am or pm',
      out: 'self/String'
    },
    dayTime: {
      doc: 'set or return the general time-of-day, like \'afternoon\'',
      out: 'self/String'
    },
    monthName: {
      doc: 'set or return the current month as a string, like \'april\'',
      out: 'self/String'
    },
  },

  utils: {
    set: {
      doc: 'change to a new date. ',
      out: 'self'
    },
    d: {
      doc: 'return a javascript date object for this time',
      out: 'self'
    },
    isValid: {
      doc: 'does this time exist on the gregorian/javascript calendar?',
      out: 'self'
    },
    log: {
      doc: 'pretty-print the date to the console, for nicer debugging',
      out: 'self'
    },
    //get
    progress: {
      doc: 'Between 0-1, how far the moment lands between the start and end of the day/week/month/year.',
      out: 'Object'
    },
    leapYear: {
      doc: 'is the current year a leap year?',
      out: 'Boolean'
    },
    inDST: {
      doc: 'is daylight-savings-time activated right now, for this timezone?',
      out: 'Boolean'
    },
    hasDST: {
      doc: 'does this timezone ever use daylight-savings',
      out: 'Boolean'
    },
    offset: {
      doc: 'the current, DST-aware time-difference from UTC, in hours',
      out: 'Number'
    },
    isAsleep: {
      doc: 'checks if the current time is between 10pm and 8am',
      out: 'Boolean'
    }

  }
};

// console.log(JSON.stringify(module.exports, null, 2));
