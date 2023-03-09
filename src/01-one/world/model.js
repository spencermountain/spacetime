const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY //non-leap


export default {
  months: [
    { long: 'January', short: 'Jan', len: 31 },
    { long: 'February', short: 'Feb', len: 28 }, // 29 in a leap year
    { long: 'March', short: 'Mar', len: 31 },
    { long: 'April', short: 'Apr', len: 30 },
    { long: 'May', short: 'May', len: 31 },
    { long: 'June', short: 'Jun', len: 30 },
    { long: 'July', short: 'Jul', len: 31 },
    { long: 'August', short: 'Aug', len: 31 },
    { long: 'September', short: 'Sep', len: 30 },
    { long: 'October', short: 'Oct', len: 31 },
    { long: 'November', short: 'Nov', len: 30 },
    { long: 'December', short: 'Dec', len: 31 },
  ],

  days: [
    { long: 'sunday', short: 'sun' },
    { long: 'monday', short: 'mon' },
    { long: 'tuesday', short: 'tue' },
    { long: 'wednesday', short: 'wed' },
    { long: 'thursday', short: 'thu' },
    { long: 'friday', short: 'fri' },
    { long: 'saturday', short: 'sat' }
  ],

  time: {
    am: 'am',
    pm: 'pm'
  },

  ms: {
    SECOND, MINUTE, HOUR, DAY, YEAR
  },

  units: {
    second: [1, 'second'],
    decade: [10, 'year'],
  }
}