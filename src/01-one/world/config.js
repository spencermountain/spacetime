export default {
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