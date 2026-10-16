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

// USNO UT event times, 2000–2100; minutes from March/June/September/December 1.
// Source: https://aa.usno.navy.mil/api/seasons; regenerate with scripts/update-seasons.js.
const seasons$1 = [
  [27815, 28908, 31288, 29617],
  [28171, 29258, 31624, 29962],
  [28516, 29604, 31975, 30314],
  [28860, 29950, 32327, 30664],
  [27769, 28857, 31230, 29562],
  [28113, 29206, 31583, 29915],
  [28466, 29546, 31923, 30262],
  [28807, 29886, 32271, 30608],
  [27708, 28799, 31184, 29524],
  [28064, 29145, 31519, 29867],
  [28412, 29488, 31869, 30218],
  [28761, 29836, 32225, 30570],
  [27674, 28749, 31129, 29472],
  [28022, 29104, 31484, 29831],
  [28377, 29451, 31829, 30183],
  [28725, 29798, 32180, 30528],
  [27630, 28714, 31101, 29444],
  [27989, 29064, 31442, 29788],
  [28335, 29407, 31794, 30143],
  [28678, 29754, 32150, 30499],
  [27590, 28664, 31051, 29402],
  [27937, 29012, 31401, 29759],
  [28293, 29354, 31744, 30108],
  [28644, 29698, 32090, 30447],
  [27546, 28611, 31004, 29360],
  [27901, 28962, 31339, 29703],
  [28246, 29304, 31685, 30050],
  [28585, 29651, 32042, 30402],
  [27497, 28562, 30945, 29299],
  [27842, 28908, 31298, 29654],
  [28192, 29251, 31647, 30009],
  [28541, 29597, 31995, 30355],
  [27442, 28509, 30911, 29276],
  [27802, 28861, 31251, 29626],
  [28157, 29204, 31599, 29974],
  [28502, 29553, 31959, 30331],
  [27423, 28472, 30863, 29233],
  [27770, 28822, 31213, 29587],
  [28120, 29169, 31562, 29942],
  [28472, 29517, 31909, 30280],
  [27371, 28426, 30825, 29193],
  [27727, 28776, 31166, 29538],
  [28073, 29116, 31511, 29884],
  [28407, 29458, 31867, 30241],
  [27320, 28371, 30768, 29143],
  [27667, 28714, 31113, 29495],
  [28018, 29054, 31461, 29848],
  [28372, 29403, 31808, 30187],
  [27274, 28314, 30720, 29102],
  [27628, 28667, 31062, 29452],
  [27979, 29013, 31408, 29798],
  [28319, 29358, 31767, 30154],
  [27236, 28276, 30675, 29057],
  [27587, 28624, 31026, 29410],
  [27934, 28967, 31379, 29770],
  [28288, 29320, 31729, 30115],
  [27191, 28228, 30639, 29032],
  [27548, 28579, 30983, 29383],
  [27905, 28924, 31328, 29725],
  [28244, 29267, 31683, 30078],
  [27158, 28186, 30588, 28981],
  [27506, 28532, 30931, 29329],
  [27847, 28871, 31280, 29683],
  [28199, 29222, 31628, 30021],
  [27099, 28126, 30537, 28929],
  [27448, 28473, 30883, 29281],
  [27800, 28817, 31227, 29626],
  [28134, 29156, 31580, 29983],
  [27049, 28074, 30487, 28893],
  [27405, 28421, 30832, 29242],
  [27755, 28763, 31185, 29600],
  [28115, 29121, 31538, 29944],
  [27021, 28034, 30448, 28856],
  [27374, 28387, 30796, 29211],
  [27729, 28739, 31144, 29556],
  [28067, 29081, 31499, 29907],
  [26979, 27997, 30411, 28814],
  [27331, 28344, 30756, 29161],
  [27671, 28678, 31105, 29518],
  [28021, 29030, 31454, 29864],
  [26925, 27935, 30357, 28773],
  [27275, 28277, 30698, 29123],
  [27631, 28624, 31044, 29465],
  [27971, 28964, 31392, 29814],
  [26880, 27881, 30300, 28722],
  [27234, 28233, 30644, 29069],
  [27576, 28570, 30993, 29423],
  [27929, 28927, 31349, 29769],
  [26838, 27837, 30259, 28677],
  [27187, 28184, 30608, 29033],
  [27543, 28537, 30960, 29384],
  [27883, 28880, 31312, 29739],
  [26795, 27796, 30223, 28653],
  [27156, 28148, 30570, 29002],
  [27503, 28483, 30918, 29354],
  [27856, 28840, 31272, 29702],
  [26764, 27752, 30176, 28607],
  [27109, 28094, 30517, 28959],
  [27462, 28444, 30865, 29302],
  [27799, 28783, 31212, 29645],
  [28145, 29133, 31562, 29992]
];

const names = ['spring', 'summer', 'fall', 'winter'];
const seasons = (year) => {
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    return null
  }
  const events = {};
  for (let index = 0; index < names.length; index += 1) {
    events[names[index]] = Date.UTC(year, index * 3 + 2, 1) + seasons$1[year - 2000][index] * 60000;
  }
  return events
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

const astroDates = (str, normal, year, tz) => {
  const name = Object.hasOwn(dates$1, str) ? str : normal;
  if (!Object.hasOwn(dates$1, name)) {
    return null
  }
  const events = seasons(year);
  if (!events) {
    return null
  }
  // Convert the event instant before selecting its local calendar date.
  return spacetime(events[dates$1[name]], tz).startOf('day')
};

// Islamic month (1-based) and day, using the tabular civil calendar.
const dates = {
  'isra and miraj': [7, 27],
  'lailat al-qadr': [9, 27],
  'eid al-fitr': [10, 1],
  'id al-Fitr': [10, 1],
  'eid ul-Fitr': [10, 1],
  ramadan: [9, 1],
  'eid al-adha': [12, 10],
  muharram: [1, 1],
  'prophets birthday': [3, 12]
};

// Tabular Islamic civil calendar: Friday epoch, 30-year leap-year cycle.
// Dates are daytime civil dates, not the preceding sunset or local sightings.
const epoch = 1948439.5;
const unixEpoch = 2440587.5;
const dayMs = 86400000;

const toJulianDay = (year, month, day) => {
  return epoch - 1 + day + Math.ceil(29.5 * (month - 1)) +
    (year - 1) * 354 + Math.floor((3 + 11 * year) / 30)
};

const occurrences = (year, month, day) => {
  if (!Number.isInteger(year) || year < 622 || year > 9999) {
    return []
  }
  const january = Date.UTC(year, 0, 1) / dayMs + unixEpoch;
  const islamicYear = Math.floor((30 * (january - epoch) + 10646) / 10631);
  const dates = [];
  for (let candidate = Math.max(1, islamicYear); candidate <= islamicYear + 2; candidate += 1) {
    const date = new Date((toJulianDay(candidate, month, day) - unixEpoch) * dayMs);
    if (date.getUTCFullYear() === year) {
      dates.push([year, date.getUTCMonth(), date.getUTCDate()]);
    }
  }
  return dates
};

const lunarOccurrences = (name, year, tz) => {
  if (!Object.hasOwn(dates, name)) {
    return []
  }
  const [month, day] = dates[name];
  return occurrences(year, month, day).map((date) => spacetime(date, tz).startOf('day'))
};

// The singular lookup returns the first occurrence in the Gregorian year.
const lunarDates = (str, normal, year, tz) => {
  const name = Object.hasOwn(dates, str) ? str : normal;
  return lunarOccurrences(name, year, tz)[0] ?? null
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
  name = resolveName(name);
  if (!name) {
    return null
  }
  const from = options.from ?? Date.now();
  const timezone = options.timezone ?? from?.tz;
  const input = from?.epoch ?? from;
  const reference = spacetime(input, timezone).startOf('day');
  if (!reference.isValid()) {
    return null
  }
  // Holidays are calendar dates: today counts even after midnight.
  for (let year = reference.year(); year <= reference.year() + 1; year += 1) {
    let candidates = lunarOccurrences(name, year, reference.tz);
    if (candidates.length === 0) {
      candidates = [lookup(name, year, reference.tz)];
    }
    for (const result of candidates) {
      if (result && result.epoch >= reference.epoch) {
        return result
      }
    }
  }
  return null
};

lookup.version = version;
lookup.list = list;
lookup.next = next;

export { lookup as default };
