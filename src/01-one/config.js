export default {

  // should spacetime crash when it gets an unparsable date?
  throwUnparsedDate: true,

  // should spacetime crash when it gets an unknown timezone?
  throwUnknownTz: true,

  // local timezone
  tryLocalTimezone: true,

  // if Intl.DateTimeFormat is not supported - fallback to UTC
  fallbackTz: 'Etc/Utc',


  // automatically in .format()
  useTitleCase: true,

  //default is Monday
  weekStart: 1,


  // assume the british interpretation of 02/02/2018, etc
  preferDMY: false,
}