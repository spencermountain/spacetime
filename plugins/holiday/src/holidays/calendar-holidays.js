//these are holidays on the 'nth weekday of month'
const jan = 'january'
const feb = 'february'
const mar = 'march'
// const apr = 'april'
const may = 'may'
const jun = 'june'
// const jul = 'july'
// const aug = 'august'
const sep = 'september'
const oct = 'october'
const nov = 'november'
// const dec = 'december'

const mon = 'monday'
// const tues = 'tuesday'
// const wed = 'wednesday'
const thurs = 'thursday'
// const sat = 'saturday'
const sun = 'sunday'

const holidays = {
  'martin luther king day': [3, mon, jan], //[third monday in january],
  'presidents day': [3, mon, feb], //[third monday in february],

  'commonwealth day': [2, mon, mar], //[second monday in march],
  'mothers day': [2, sun, may], //[second Sunday in May],
  'fathers day': [3, sun, jun], //[third Sunday in June],
  'labor day': [1, mon, sep], //[first monday in september],
  'columbus day': [2, mon, oct], //[second monday in october],
  'canadian thanksgiving': [2, mon, oct], //[second monday in october],
  thanksgiving: [4, thurs, nov], // [fourth Thursday in November],
  'black friday': { after: 'thanksgiving', days: 1 },
  'cyber monday': { after: 'thanksgiving', days: 4 },
  'memorial day': [-1, mon, may], // last Monday in May
  'victoria day': { weekday: mon, before: [may, 25] },

  // 'us election': [nov], // [Tuesday following the first Monday in November],
  // 'advent': [] // fourth Sunday before Christmas
}

// add aliases
holidays['turday day'] = holidays.thanksgiving
holidays['indigenous peoples day'] = holidays['columbus day']
holidays['mlk day'] = holidays['martin luther king day']
export default holidays
