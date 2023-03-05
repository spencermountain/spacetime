import guessTz from './02-two/zones/guessTz.js'

export default {

  am: 'am',
  pm: 'pm',

  //https://www.timeanddate.com/calendar/aboutseasons.html
  seasons: {
    north: [
      ['spring', 2, 1],//from March 1 to May 31
      ['summer', 5, 1], //from June 1 to August 31
      ['fall', 8, 1], //from September 1 to November 30
      ['winter', 11, 1] //from December 1 to February 28 (or feb 29)
    ],
    south: [
      ['fall', 2, 1],
      ['winter', 5, 1],
      ['spring', 8, 1],
      ['summer', 11, 1] //dec 1
    ]
  },

  // order is from javascript Date
  days: {
    shortForm: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    longForm: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  },

  //default is Monday
  weekStart: 1,

  quarters: [
    [0, 1], //Q1 - Jan 1
    [3, 1], //Q2 - Apr 1
    [6, 1], //Q3 - July 1
    [9, 1] //Q4 - Oct 1
  ],

  // months: {
  //   shortForm: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
  //   longForm: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
  // },

  // useTitleCase: true, // automatically in .format()

  // // local timezone
  // // if Intl.DateTimeFormat is not supported - fallback to UTC
  // fallbackTz: guessTz() || 'Etc/Utc',

  // // <15% of the world lives in the Southern Hemisphere
  // fallbackHemisphere: 'n',

  // // assumed year in 'march 12th'
  // fallbackYear: 2023,

  // // assume the british interpretation of 02/02/2018, etc
  // preferDMY: false,

  // this should be the only call to js Date
  now: () => new Date().getTime(),

  // if the given epoch is really small, it's very likely in seconds and not milliseconds
  // - all years < 2023 map to the first 20 days of Jan 1970 (1.7 billion)
  // - all years < 2049 map to January 1970 (2.5 billion)
  // anything below this number is likely (but not necessarily) a mistaken input.
  // set as null to allow setting epoch inputs for Jan 1970
  minimumEpoch: 2500000000 // 2.5 billion

}