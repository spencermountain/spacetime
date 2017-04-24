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
      doc: '',
      out: 'self'
    },
    endOf: {
      doc: '',
      out: 'self'
    },
    add: {
      doc: '',
      out: 'self'
    },
    subtract: {
      doc: '',
      out: 'self'
    },
    //comparison
    isAfter: {
      doc: '',
      out: 'Boolean'
    },
    isBefore: {
      doc: '',
      out: 'Boolean'
    },
    isEqual: {
      doc: '',
      out: 'Boolean'
    },
    isSame: {
      doc: '',
      out: 'Boolean'
    },
    diff: {
      doc: '',
      out: 'Number'
    },
  },

  //getter/setters
  getters: {
    millisecond: {
      doc: '',
      out: 'self/Number'
    },
    second: {
      doc: '',
      out: 'self/Number'
    },
    minute: {
      doc: '',
      out: 'self/Number'
    },
    hour: {
      doc: '',
      out: 'self/Number'
    },
    date: {
      doc: '',
      out: 'self/Number'
    },
    month: {
      doc: '',
      out: 'self/Number'
    },
    year: {
      doc: '',
      out: 'self/Number'
    },
    dayOfYear: {
      doc: '',
      out: 'self/Number'
    },
    time: {
      doc: '',
      out: 'self/Number'
    },
    week: {
      doc: '',
      out: 'self/Number'
    },
    quarter: {
      doc: '',
      out: 'self/Number'
    },
    season: {
      doc: '',
      out: 'self/String'
    },
    hourFloat: {
      doc: '',
      out: 'self/Number'
    },
    day: {
      doc: '',
      out: 'self/Number'
    },
    ampm: {
      doc: '',
      out: 'self/String'
    },
    dayTime: {
      doc: '',
      out: 'self/String'
    },
    dayName: {
      doc: '',
      out: 'self/String'
    },
    monthName: {
      doc: '',
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
      doc: '',
      out: 'Boolean'
    },
    inDST: {
      doc: '',
      out: 'Boolean'
    },
    hasDST: {
      doc: '',
      out: 'Boolean'
    },
    offset: {
      doc: '',
      out: 'Number'
    },
    isAsleep: {
      doc: '',
      out: 'Boolean'
    }

  }
};

// console.log(JSON.stringify(module.exports, null, 2));
