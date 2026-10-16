import spacetime from 'spacetime';

var version = '0.3.0';

//yep,
const jan$1 = 'january';
const feb$1 = 'february';
const mar$1 = 'march';
const apr = 'april';
const may$1 = 'may';
const jun$1 = 'june';
const jul = 'july';
const aug = 'august';
const sep$1 = 'september';
const oct$1 = 'october';
const nov$1 = 'november';
const dec = 'december';

var fixed = {
  'new years eve': [dec, 31],
  'new years': [jan$1, 1],
  'new years day': [jan$1, 1],
  'inauguration day': [jan$1, 20],
  'australia day': [jan$1, 26],
  'national freedom day': [feb$1, 1],
  'groundhog day': [feb$1, 2],
  'rosa parks day': [feb$1, 4],
  'valentines day': [feb$1, 14],
  'saint valentines day': [feb$1, 14],
  'st valentines day ': [feb$1, 14],
  'saint patricks day': [mar$1, 17],
  'st patricks day': [mar$1, 17],
  'april fools': [apr, 1],
  'april fools day': [apr, 1],
  'emancipation day': [apr, 16],
  'tax day': [apr, 15], //US
  'labour day': [may$1, 1],
  'cinco de mayo': [may$1, 5],
  'national nurses day': [may$1, 6],
  'harvey milk day': [may$1, 22],
  juneteenth: [jun$1, 19],
  'canada day': [jul, 1],
  'independence day': [jul, 4],
  'independents day': [jul, 4],
  'bastille day': [jul, 14],
  'purple heart day': [aug, 7],
  'womens equality day': [aug, 26],
  '16 de septiembre': [sep$1, 16],
  'dieciseis de septiembre': [sep$1, 16],
  'grito de dolores': [sep$1, 16],
  halloween: [oct$1, 31],
  'all hallows eve': [oct$1, 31],
  'day of the dead': [oct$1, 31], // Ranged holiday [nov, 2],
  'dia de muertos': [oct$1, 31], // Ranged holiday [nov, 2],
  'veterans day': [nov$1, 11],
  'st andrews day': [nov$1, 30],
  'saint andrews day': [nov$1, 30],
  'all saints day': [nov$1, 1],
  'all sts day': [nov$1, 1],
  'armistice day': [nov$1, 11],
  'remembrance day': [nov$1, 11],
  'christmas eve': [dec, 24],
  christmas: [dec, 25],
  xmas: [dec, 25],
  'boxing day': [dec, 26],
  'st stephens day': [dec, 26],
  'saint stephens day': [dec, 26],

  // Fixed religious and cultural holidays
  // Catholic + Christian
  epiphany: [jan$1, 6],
  'orthodox christmas day': [jan$1, 7],
  'orthodox new year': [jan$1, 14],
  'assumption of mary': [aug, 15],
  'all souls day': [nov$1, 2],
  'feast of the immaculate conception': [dec, 8],
  'feast of our lady of guadalupe': [dec, 12],

  // Kwanzaa
  kwanzaa: [dec, 26], // Ranged holiday [jan, 1],

  // Pagan / metal 🤘
  imbolc: [feb$1, 2],
  beltaine: [may$1, 1],
  lughnassadh: [aug, 1],
  samhain: [oct$1, 31]
};

// holidays that are the same date every year
const fixedDates = function (str, normal, year, tz) {
  if (fixed.hasOwnProperty(str) || fixed.hasOwnProperty(normal)) {
    const arr = fixed[str] || fixed[normal] || [];
    let s = spacetime.now(tz);
    s = s.year(year);
    s = s.startOf('year');
    s = s.month(arr[0]);
    s = s.date(arr[1]);
    if (s.isValid()) {
      return s
    }
  }
  return null
};

//these are holidays on the 'nth weekday of month'
const jan = 'january';
const feb = 'february';
const mar = 'march';
// const apr = 'april'
const may = 'may';
const jun = 'june';
// const jul = 'july'
// const aug = 'august'
const sep = 'september';
const oct = 'october';
const nov = 'november';
// const dec = 'december'

const mon = 'monday';
// const tues = 'tuesday'
// const wed = 'wednesday'
const thurs = 'thursday';
// const sat = 'saturday'
const sun = 'sunday';

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
};

// add aliases
holidays['turday day'] = holidays.thanksgiving;
holidays['indigenous peoples day'] = holidays['columbus day'];
holidays['mlk day'] = holidays['martin luther king day'];

const calendarDates = (str, normal, year, tz, lookup) => {
  const rule = holidays[str] ?? holidays[normal];
  if (!rule) {
    return null
  }
  if (rule.after) {
    const base = lookup(rule.after, year, tz);
    return base ? base.add(rule.days, 'day') : null
  }
  const start = spacetime.now(tz).year(year).startOf('year');
  if (rule.before) {
    const anchor = start.month(rule.before[0]).date(rule.before[1]);
    let result = anchor.day(rule.weekday);
    if (result.epoch >= anchor.epoch) {
      result = result.subtract(1, 'week');
    }
    return result
  }
  const [nth, weekday, month] = rule;
  let anchor = start.month(month).startOf('month');
  if (nth < 0) {
    anchor = anchor.endOf('month').startOf('day');
    let result = anchor.day(weekday);
    if (result.epoch > anchor.epoch) {
      result = result.subtract(1, 'week');
    }
    return result.add(nth + 1, 'week')
  }
  let result = anchor.day(weekday);
  if (result.epoch < anchor.epoch) {
    result = result.add(1, 'week');
  }
  return result.add(nth - 1, 'week')
};

// https://www.timeanddate.com/calendar/determining-easter-date.html

const dates$2 = {
  easter: 0,
  'ash wednesday': -46, // (46 days before easter)
  'palm sunday': -7, // (1 week before easter)
  'maundy thursday': -3, // (3 days before easter)
  'good friday': -2, // (2 days before easter)
  'holy saturday': -1, // (1 days before easter)
  'easter saturday': -1, // (1 day before easter)
  'easter monday': 1, // (1 day after easter)
  'ascension day': 39, // (39 days after easter)
  'whit sunday': 49, // / pentecost (49 days after easter)
  'whit monday': 50, // (50 days after easter)
  'trinity sunday': 56, // (56 days after easter)
  'corpus christi': 60, // (60 days after easter)

  'mardi gras': -47 //(47 days before easter)
};
dates$2['easter sunday'] = dates$2.easter;
dates$2.pentecost = dates$2['whit sunday'];
dates$2.whitsun = dates$2['whit sunday'];

// by John Dyer
// based on the algorithm by Oudin (1940) from http://www.tondering.dk/claus/cal/easter.php
const calcEaster = function (year) {
  const f = Math.floor;
  // Golden Number - 1
  const G = year % 19;
  const C = f(year / 100);
  // related to Epact
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  // number of days from 21 March to the Paschal full moon
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  // weekday for the Paschal full moon
  const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
  // number of days from 21 March to the Sunday on or before the Paschal full moon
  const L = I - J;
  const month = 3 + f((L + 40) / 44);
  const date = L + 28 - 31 * f(month / 4);
  const monthName = month === 4 ? 'April' : 'March';
  return monthName + ' ' + date
};

//calculate any holidays based on easter
const easterDates = function (str, normal, year, tz) {
  if (dates$2.hasOwnProperty(str) || dates$2.hasOwnProperty(normal)) {
    const days = dates$2[str] ?? dates$2[normal];

    const date = calcEaster(year);
    if (!date) {
      return null //no easter for this year
    }
    let e = spacetime(date, tz);
    e = e.year(year);

    const s = e.add(days, 'day');
    if (s.isValid()) {
      return s
    }
  }
  return null
};

// http://www.astropixels.com/ephemeris/soleq2001.html

// years 2000-2100
const exceptions = {
  spring: [
    2003,
    2007,
    2044,
    2048,
    2052,
    2056,
    2060,
    2064,
    2068,
    2072,
    2076,
    2077,
    2080,
    2081,
    2084,
    2085,
    2088,
    2089,
    2092,
    2093,
    2096,
    2097
  ],
  summer: [
    2021,
    2016,
    2020,
    2024,
    2028,
    2032,
    2036,
    2040,
    2041,
    2044,
    2045,
    2048,
    2049,
    2052,
    2053,
    2056,
    2057,
    2060,
    2061,
    2064,
    2065,
    2068,
    2069,
    2070,
    2072,
    2073,
    2074,
    2076,
    2077,
    2078,
    2080,
    2081,
    2082,
    2084,
    2085,
    2086,
    2088,
    2089,
    2090,
    2092,
    2093,
    2094,
    2096,
    2097,
    2098,
    2099
  ],
  fall: [
    2002,
    2003,
    2004,
    2006,
    2007,
    2010,
    2011,
    2014,
    2015,
    2018,
    2019,
    2022,
    2023,
    2026,
    2027,
    2031,
    2035,
    2039,
    2043,
    2047,
    2051,
    2055,
    2059,
    2092,
    2096
  ],
  winter: [
    2002,
    2003,
    2006,
    2007,
    2011,
    2015,
    2019,
    2023,
    2027,
    2031,
    2035,
    2039,
    2043,
    2080,
    2084,
    2088,
    2092,
    2096
  ]
};

const winter20th = [2080, 2084, 2088, 2092, 2096];

const calcSeasons = function (year) {
  // most common defaults
  const res = {
    spring: 'March 20 ' + year,
    summer: 'June 21 ' + year,
    fall: 'Sept 22 ' + year,
    winter: 'Dec 21 ' + year
  };
  if (exceptions.spring.indexOf(year) !== -1) {
    res.spring = 'March 19 ' + year;
  }
  if (exceptions.summer.indexOf(year) !== -1) {
    res.summer = 'June 20 ' + year;
  }
  if (exceptions.fall.indexOf(year) !== -1) {
    res.fall = 'Sept 21 ' + year;
  }
  // winter can be 20th, 21st, or 22nd
  if (exceptions.winter.indexOf(year) !== -1) {
    res.winter = 'Dec 22 ' + year;
  }
  if (winter20th.indexOf(year) !== -1) {
    res.winter = 'Dec 20 ' + year;
  }
  return res
};

// these are properly calculated in ./lib/seasons
const dates$1 = {
  'spring equinox': 'spring',
  'summer solstice': 'summer',
  'fall equinox': 'fall',
  'winter solstice': 'winter'
};

// aliases
dates$1['march equinox'] = dates$1['spring equinox'];
dates$1['vernal equinox'] = dates$1['spring equinox'];
dates$1['ostara'] = dates$1['spring equinox'];

dates$1['summer solistice'] = dates$1['summer solstice'];
dates$1['june solstice'] = dates$1['summer solstice'];
dates$1['litha'] = dates$1['summer solstice'];

dates$1['autumn equinox'] = dates$1['fall equinox'];
dates$1['autumnal equinox'] = dates$1['fall equinox'];
dates$1['september equinox'] = dates$1['fall equinox'];
dates$1['sept equinox'] = dates$1['fall equinox'];
dates$1['mabon'] = dates$1['fall equinox'];

dates$1['december solstice'] = dates$1['winter solstice'];
dates$1['dec solstice'] = dates$1['winter solstice'];
dates$1['yule'] = dates$1['winter solstice'];

const astroDates = function (str, normal, year, tz) {
  if (dates$1.hasOwnProperty(str) || dates$1.hasOwnProperty(normal)) {
    const season = dates$1[str] || dates$1[normal];
    const seasons = calcSeasons(year);
    if (!season || !seasons || !seasons[season]) {
      return null // couldn't figure it out
    }
    const s = spacetime(seasons[season], tz);
    if (s.isValid()) {
      return s
    }
  }

  return null
};

const dates = {
  // Muslim holidays
  'isra and miraj': 'april 13',
  'lailat al-qadr': 'june 10',
  'eid al-fitr': 'june 15',
  'id al-Fitr': 'june 15',
  'eid ul-Fitr': 'june 15',
  ramadan: 'may 16', // Range holiday
  'eid al-adha': 'sep 22',
  muharram: 'sep 12',
  'prophets birthday': 'nov 21'
};

// (lunar year is 354.36 days)
const dayDiff = -10.64;

const lunarDates = function (str, normal, year, tz) {
  if (dates.hasOwnProperty(str) || dates.hasOwnProperty(normal)) {
    const date = dates[str] || dates[normal] || [];
    if (!date) {
      return null
    }
    // start at 2018
    let s = spacetime(date + ' 2018', tz);
    const diff = year - 2018;
    const toAdd = diff * dayDiff;
    s = s.add(toAdd, 'day');
    s = s.startOf('day');

    // now set the correct year
    s = s.year(year);

    if (s.isValid()) {
      return s
    }
  }
  return null
};

// Explicit aliases keep unrelated holidays on the same date distinct.
const aliases = {
  'new years': 'new years day',
  'saint valentines day': 'valentines day',
  'st valentines day': 'valentines day',
  'st patricks day': 'saint patricks day',
  'april fools': 'april fools day',
  'independents day': 'independence day',
  '16 de septiembre': 'grito de dolores',
  'dieciseis de septiembre': 'grito de dolores',
  'all hallows eve': 'halloween',
  'dia de muertos': 'day of the dead',
  'st andrews day': 'saint andrews day',
  'all sts day': 'all saints day',
  'rememberance day': 'remembrance day',
  xmas: 'christmas',
  'st stephens day': 'saint stephens day',
  'turday day': 'thanksgiving',
  'turkey day': 'thanksgiving',
  'mlk day': 'martin luther king day',
  'easter sunday': 'easter',
  'easter saturday': 'holy saturday',
  pentecost: 'whit sunday',
  whitsun: 'whit sunday',
  'march equinox': 'spring equinox',
  'vernal equinox': 'spring equinox',
  ostara: 'spring equinox',
  'summer solistice': 'summer solstice',
  'june solstice': 'summer solstice',
  litha: 'summer solstice',
  'autumn equinox': 'fall equinox',
  'autumnal equinox': 'fall equinox',
  'september equinox': 'fall equinox',
  'sept equinox': 'fall equinox',
  mabon: 'fall equinox',
  'december solstice': 'winter solstice',
  'dec solstice': 'winter solstice',
  yule: 'winter solstice',
  'id al-fitr': 'eid al-fitr',
  'eid ul-fitr': 'eid al-fitr'
};

const normalize = (name) => String(name ?? '').trim().toLowerCase().replace(/['’]/g, '').replace(/\s+/g, ' ').replace(/^the /, '');
const catalog = {};
Object.keys({ ...fixed, ...holidays, ...dates$2, ...dates$1, ...dates }).forEach((key) => {
  const normalized = normalize(key);
  const name = aliases[normalized] ?? normalized;
  if (!Object.hasOwn(catalog, name)) {
    catalog[name] = { name, aliases: [] };
  }
});
Object.entries(aliases).forEach(([alias, name]) => {
  if (Object.hasOwn(catalog, name)) {
    catalog[name].aliases.push(alias);
  }
});

const resolveName = (input) => {
  const name = normalize(input);
  const candidates = [name, name.replace(/ day$/, '')];
  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = aliases[candidates[i]] ?? candidates[i];
    if (Object.hasOwn(catalog, candidate)) {
      return candidate
    }
  }
  return null
};

const resolvers = [fixedDates, calendarDates, easterDates, astroDates, lunarDates];
const lookup = (input, year, tz) => {
  const name = resolveName(input);
  if (!name) {
    return null
  }
  year = year ?? spacetime.now(tz).year();
  for (let i = 0; i < resolvers.length; i += 1) {
    const date = resolvers[i](name, name, year, tz, lookup);
    if (date !== null) {
      return date
    }
  }
  return null
};

const list = (options = {}) => {
  return Object.keys(catalog).sort().map((name) => {
    const entry = { name, aliases: [...catalog[name].aliases].sort() };
    if (options.year !== undefined) {
      entry.date = lookup(name, options.year, options.timezone);
    }
    return entry
  })
};

const next = (name, options = {}) => {
  const from = options.from ?? Date.now();
  const timezone = options.timezone ?? from?.tz;
  const input = from?.epoch ?? from;
  const reference = spacetime(input, timezone).startOf('day');
  if (!reference.isValid()) {
    return null
  }
  // Holidays are calendar dates: today counts even after midnight.
  for (let year = reference.year(); year <= reference.year() + 1; year += 1) {
    const result = lookup(name, year, reference.tz);
    if (result && result.epoch >= reference.epoch) {
      return result
    }
  }
  return null
};

lookup.version = version;
lookup.list = list;
lookup.next = next;

export { lookup as default };
