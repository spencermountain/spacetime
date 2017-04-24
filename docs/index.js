module.exports = {
  utils: {
    //misc
    goto: {
      doc: 'move to a new timezone, but at this same moment. Accepts a IANA code.'
    },
    set: {
      doc: 'change to a new date. '
    },
    d: {
      doc: 'return a javascript date object for this time'
    },
    isValid: {
      doc: 'does this time exist on the gregorian/javascript calendar?'
    },
    clone: {
      doc: 'make a copy of this object, with no references to the original'
    },
    log: {
      doc: 'pretty-print the date to the console, for nicer debugging'
    },

    //get
    timezone: {
      doc: 'return a bunch of meta-data about your current timezone'
    },
    progress: {
      doc: 'Between 0-1, how far the moment lands between the start and end of the day/week/month/year.'
    },
    format: {
      doc: 'output nicely-formatted strings'
    },
    leapYear: {
      doc: ''
    },
    inDST: {
      doc: ''
    },
    hasDST: {
      doc: ''
    },
    offset: {
      doc: ''
    },
    isAsleep: {
      doc: ''
    },
    //comparison
    isAfter: {
      doc: ''
    },
    isBefore: {
      doc: ''
    },
    isEqual: {
      doc: ''
    },
    isSame: {
      doc: ''
    },
    diff: {
      doc: ''
    },

    //set
    startOf: {
      doc: ''
    },
    endOf: {
      doc: ''
    },
    add: {
      doc: ''
    },
    subtract: {
      doc: ''
    },
  },
  //getter/setters
  getters: {
    millisecond: {},
    second: {},
    minute: {},
    hour: {},
    date: {},
    month: {},
    year: {},
    dayOfYear: {},
    time: {},
    week: {},
    quarter: {},
    season: {},
    hourFloat: {},
    day: {},
    ampm: {},
    dayTime: {},
    dayName: {},
    monthName: {},
  }
};
