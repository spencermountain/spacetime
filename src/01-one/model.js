const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY // (non-leap)

export default {
  months: [
    { longForm: 'january', shortForm: 'jan', len: 31 },
    { longForm: 'february', shortForm: 'feb', len: 28 }, // 29 in a leap year
    { longForm: 'march', shortForm: 'mar', len: 31 },
    { longForm: 'april', shortForm: 'apr', len: 30 },
    { longForm: 'may', shortForm: 'may', len: 31 },
    { longForm: 'june', shortForm: 'jun', len: 30 },
    { longForm: 'july', shortForm: 'jul', len: 31 },
    { longForm: 'august', shortForm: 'aug', len: 31 },
    { longForm: 'september', shortForm: 'sep', len: 30 },
    { longForm: 'october', shortForm: 'oct', len: 31 },
    { longForm: 'november', shortForm: 'nov', len: 30 },
    { longForm: 'december', shortForm: 'dec', len: 31 },
  ],

  days: [
    { longForm: 'sunday', shortForm: 'sun' },
    { longForm: 'monday', shortForm: 'mon' },
    { longForm: 'tuesday', shortForm: 'tue' },
    { longForm: 'wednesday', shortForm: 'wed' },
    { longForm: 'thursday', shortForm: 'thu' },
    { longForm: 'friday', shortForm: 'fri' },
    { longForm: 'saturday', shortForm: 'sat' }
  ],

  time: {
    am: 'am',
    pm: 'pm'
  },

  ms: {
    SECOND, MINUTE, HOUR, DAY, YEAR
  },

  // units: {
  //   second: [1, 'second'],
  //   decade: [10, 'year'],
  // }
}