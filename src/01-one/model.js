const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY // (non-leap)

export default {
  months: [
    null,//1-based months
    { longForm: 'January', shortForm: 'Jan', len: 31 },
    { longForm: 'February', shortForm: 'Feb', len: 28 }, // 29 in a leap year
    { longForm: 'March', shortForm: 'Mar', len: 31 },
    { longForm: 'April', shortForm: 'Apr', len: 30 },
    { longForm: 'May', shortForm: 'May', len: 31 },
    { longForm: 'June', shortForm: 'Jun', len: 30 },
    { longForm: 'July', shortForm: 'Jul', len: 31 },
    { longForm: 'August', shortForm: 'Aug', len: 31 },
    { longForm: 'September', shortForm: 'Sep', len: 30 },
    { longForm: 'October', shortForm: 'Oct', len: 31 },
    { longForm: 'November', shortForm: 'Nov', len: 30 },
    { longForm: 'December', shortForm: 'Dec', len: 31 },
  ],

  days: [
    { longForm: 'Sunday', shortForm: 'Sun' },
    { longForm: 'Monday', shortForm: 'Mon' },
    { longForm: 'Tuesday', shortForm: 'Tue' },
    { longForm: 'Wednesday', shortForm: 'Wed' },
    { longForm: 'Thursday', shortForm: 'Thu' },
    { longForm: 'Friday', shortForm: 'Fri' },
    { longForm: 'Saturday', shortForm: 'Sat' }
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