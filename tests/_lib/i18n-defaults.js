const defaults = {
  days: {
    short: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    long: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  },
  months: {
    short: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'],
    long: [
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
    ]
  },
  useTitleCase: true,
  ampm: {
    am: 'am',
    pm: 'pm'
  },
  distance: {
    past: 'past',
    future: 'future',
    present: 'present',
    now: 'now',
    almost: 'almost',
    over: 'over',
    pastDistance: (value) => `${value} ago`,
    futureDistance: (value) => `in ${value}`
  },
  units: {
    second: 'second', seconds: 'seconds',
    minute: 'minute', minutes: 'minutes',
    hour: 'hour', hours: 'hours',
    day: 'day', days: 'days',
    month: 'month', months: 'months',
    year: 'year', years: 'years'
  }
}

export default defaults
