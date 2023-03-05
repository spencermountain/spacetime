export default {
  parsers: {},
  methods: {},
  now: {
    epoch: () => new Date().getTime(),
    year: () => new Date().getFullYear,
    month: () => new Date().getMonth(),
  },
  i18n: {
    months: {
      shortForm: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      longForm: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    },
    // order is from javascript Date
    days: {
      shortForm: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      longForm: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    },
    ampm: {
      am: 'am',
      pm: 'pm'
    },
  },
  config: {
    // automatically in .format()
    useTitleCase: true,

    //default is Monday
    weekStart: 1,

    // local timezone
    // if Intl.DateTimeFormat is not supported - fallback to UTC
    fallbackTz: 'Etc/Utc',

    // <15% of the world lives in the Southern Hemisphere
    fallbackHemisphere: 'n',

    // assume the british interpretation of 02/02/2018, etc
    preferDMY: false,
  }
}