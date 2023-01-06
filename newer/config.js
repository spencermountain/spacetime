import guessTz from './lib/guessTz.js'

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

  months: {
    shortForm: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    longForm: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
  },

  useTitleCase: true, // automatically in .format()

  // local timezone
  // if Intl.DateTimeFormat is not supported - fallback to UTC
  fallbackTz: guessTz() || 'Etc/Utc',

  // <15% of the world lives in the Southern Hemisphere
  fallbackHemisphere: 'n',

  // assumed year in 'march 12th'
  fallbackYear: 2023
}