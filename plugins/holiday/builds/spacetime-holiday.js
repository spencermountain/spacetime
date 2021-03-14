(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('spacetime')) :
  typeof define === 'function' && define.amd ? define(['spacetime'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.spacetimeHoliday = factory(global.spacetime));
}(this, (function (spacetime) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var spacetime__default = /*#__PURE__*/_interopDefaultLegacy(spacetime);

  //yep,
  var jan = 'january';
  var feb = 'february';
  var mar = 'march';
  var apr = 'april';
  var may = 'may';
  var jun = 'june';
  var jul = 'july';
  var aug = 'august';
  var sep = 'september';
  var oct = 'october';
  var nov = 'november';
  var dec = 'december';
  var fixedHolidays = {
    'new years eve': [dec, 31],
    'new years': [jan, 1],
    'new years day': [jan, 1],
    'inauguration day': [jan, 20],
    'australia day': [jan, 26],
    'national freedom day': [feb, 1],
    'groundhog day': [feb, 2],
    'rosa parks day': [feb, 4],
    'valentines day': [feb, 14],
    'saint valentines day': [feb, 14],
    'st valentines day ': [feb, 14],
    'saint patricks day': [mar, 17],
    'st patricks day': [mar, 17],
    'april fools': [apr, 1],
    'april fools day': [apr, 1],
    'emancipation day': [apr, 16],
    'tax day': [apr, 15],
    //US
    'labour day': [may, 1],
    'cinco de mayo': [may, 5],
    'national nurses day': [may, 6],
    'harvey milk day': [may, 22],
    'victoria day': [may, 24],
    juneteenth: [jun, 19],
    'canada day': [jul, 1],
    'independence day': [jul, 4],
    'independents day': [jul, 4],
    'bastille day': [jul, 14],
    'purple heart day': [aug, 7],
    'womens equality day': [aug, 26],
    '16 de septiembre': [sep, 16],
    'dieciseis de septiembre': [sep, 16],
    'grito de dolores': [sep, 16],
    halloween: [oct, 31],
    'all hallows eve': [oct, 31],
    'day of the dead': [oct, 31],
    // Ranged holiday [nov, 2],
    'dia de muertos': [oct, 31],
    // Ranged holiday [nov, 2],
    'veterans day': [nov, 11],
    'st andrews day': [nov, 30],
    'saint andrews day': [nov, 30],
    'all saints day': [nov, 1],
    'all sts day': [nov, 1],
    'armistice day': [nov, 11],
    'rememberance day': [nov, 11],
    'christmas eve': [dec, 24],
    christmas: [dec, 25],
    xmas: [dec, 25],
    'boxing day': [dec, 26],
    'st stephens day': [dec, 26],
    'saint stephens day': [dec, 26],
    // Fixed religious and cultural holidays
    // Catholic + Christian
    epiphany: [jan, 6],
    'orthodox christmas day': [jan, 7],
    'orthodox new year': [jan, 14],
    'assumption of mary': [aug, 15],
    'all souls day': [nov, 2],
    'feast of the immaculate conception': [dec, 8],
    'feast of our lady of guadalupe': [dec, 12],
    // Kwanzaa
    kwanzaa: [dec, 26],
    // Ranged holiday [jan, 1],
    // Pagan / metal 🤘
    imbolc: [feb, 2],
    beltaine: [may, 1],
    lughnassadh: [aug, 1],
    samhain: [oct, 31]
  };

  var fixedDates = function fixedDates(str, normal, year, tz) {
    if (fixedHolidays.hasOwnProperty(str) || fixedHolidays.hasOwnProperty(normal)) {
      var arr = fixedHolidays[str] || fixedHolidays[normal] || [];
      var s = spacetime__default['default'].now(tz);
      s = s.year(year);
      s = s.startOf('year');
      s = s.month(arr[0]);
      s = s.date(arr[1]);

      if (s.isValid()) {
        return s;
      }
    }

    return null;
  };

  var _01FixedDates = fixedDates;

  //these are holidays on the 'nth weekday of month'
  var jan$1 = 'january';
  var feb$1 = 'february';
  var mar$1 = 'march'; // const apr = 'april'

  var may$1 = 'may';
  var jun$1 = 'june'; // const jul = 'july'
  // const aug = 'august'

  var sep$1 = 'september';
  var oct$1 = 'october';
  var nov$1 = 'november'; // const dec = 'december'

  var mon = 'monday'; // const tues = 'tuesday'
  // const wed = 'wednesday'

  var thurs = 'thursday';
  var fri = 'friday'; // const sat = 'saturday'

  var sun = 'sunday';
  var holidays = {
    'martin luther king day': [3, mon, jan$1],
    //[third monday in january],
    'presidents day': [3, mon, feb$1],
    //[third monday in february],
    'commonwealth day': [2, mon, mar$1],
    //[second monday in march],
    'mothers day': [2, sun, may$1],
    //[second Sunday in May],
    'fathers day': [3, sun, jun$1],
    //[third Sunday in June],
    'labor day': [1, mon, sep$1],
    //[first monday in september],
    'columbus day': [2, mon, oct$1],
    //[second monday in october],
    'canadian thanksgiving': [2, mon, oct$1],
    //[second monday in october],
    thanksgiving: [4, thurs, nov$1],
    // [fourth Thursday in November],
    'black friday': [4, fri, nov$1] //[fourth friday in november],
    // 'memorial day': [may], //[last monday in may],
    // 'us election': [nov], // [Tuesday following the first Monday in November],
    // 'cyber monday': [nov]
    // 'advent': [] // fourth Sunday before Christmas

  }; // add aliases

  holidays['turday day'] = holidays.thanksgiving;
  holidays['indigenous peoples day'] = holidays['columbus day'];
  holidays['mlk day'] = holidays['martin luther king day'];
  var calendarHolidays = holidays;

  var fixedDates$1 = function fixedDates(str, normal, year, tz) {
    if (calendarHolidays.hasOwnProperty(str) || calendarHolidays.hasOwnProperty(normal)) {
      var arr = calendarHolidays[str] || calendarHolidays[normal] || [];
      var s = spacetime__default['default'].now(tz);
      s = s.year(year); // [3rd, 'monday', 'january']

      s = s.month(arr[2]);
      s = s.startOf('month'); // make it january

      var month = s.month(); // make it the 1st monday

      s = s.day(arr[1]);

      if (s.month() !== month) {
        s = s.add(1, 'week');
      } // make it nth monday


      if (arr[0] > 1) {
        s = s.add(arr[0] - 1, 'week');
      }

      if (s.isValid()) {
        return s;
      }
    }

    return null;
  };

  var _02NthWeekday = fixedDates$1;

  // https://www.timeanddate.com/calendar/determining-easter-date.html
  var dates = {
    easter: 0,
    'ash wednesday': -46,
    // (46 days before easter)
    'palm sunday': 7,
    // (1 week before easter)
    'maundy thursday': -3,
    // (3 days before easter)
    'good friday': -2,
    // (2 days before easter)
    'holy saturday': -1,
    // (1 days before easter)
    'easter saturday': -1,
    // (1 day before easter)
    'easter monday': 1,
    // (1 day after easter)
    'ascension day': 39,
    // (39 days after easter)
    'whit sunday': 49,
    // / pentecost (49 days after easter)
    'whit monday': 50,
    // (50 days after easter)
    'trinity sunday': 65,
    // (56 days after easter)
    'corpus christi': 60,
    // (60 days after easter)
    'mardi gras': -47 //(47 days before easter)

  };
  dates['easter sunday'] = dates.easter;
  dates['pentecost'] = dates['whit sunday'];
  dates['whitsun'] = dates['whit sunday'];
  var easterHolidays = dates;

  // by John Dyer
  // based on the algorithm by Oudin (1940) from http://www.tondering.dk/claus/cal/easter.php
  var calcEaster = function calcEaster(year) {
    var f = Math.floor,
        // Golden Number - 1
    G = year % 19,
        C = f(year / 100),
        // related to Epact
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
        // number of days from 21 March to the Paschal full moon
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
        // weekday for the Paschal full moon
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        // number of days from 21 March to the Sunday on or before the Paschal full moon
    L = I - J,
        month = 3 + f((L + 40) / 44),
        date = L + 28 - 31 * f(month / 4);
    month = month === 4 ? 'April' : 'March';
    return month + ' ' + date;
  };

  var calcEaster_1 = calcEaster;

  var easterDates = function easterDates(str, normal, year, tz) {
    if (easterHolidays.hasOwnProperty(str) || easterHolidays.hasOwnProperty(normal)) {
      var days = easterHolidays[str] || easterHolidays[normal] || [];
      var date = calcEaster_1(year);

      if (!date) {
        return null; //no easter for this year
      }

      var e = spacetime__default['default'](date, tz);
      e = e.year(year);
      var s = e.add(days, 'day');

      if (s.isValid()) {
        return s;
      }
    }

    return null;
  };

  var _03EasterDates = easterDates;

  // http://www.astropixels.com/ephemeris/soleq2001.html
  // years 2000-2100
  var exceptions = {
    spring: [2003, 2007, 2044, 2048, 2052, 2056, 2060, 2064, 2068, 2072, 2076, 2077, 2080, 2081, 2084, 2085, 2088, 2089, 2092, 2093, 2096, 2097],
    summer: [2021, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2041, 2044, 2045, 2048, 2049, 2052, 2053, 2056, 2057, 2060, 2061, 2064, 2065, 2068, 2069, 2070, 2072, 2073, 2074, 2076, 2077, 2078, 2080, 2081, 2082, 2084, 2085, 2086, 2088, 2089, 2090, 2092, 2093, 2094, 2096, 2097, 2098, 2099],
    fall: [2002, 2003, 2004, 2006, 2007, 2010, 2011, 2014, 2015, 2018, 2019, 2022, 2023, 2026, 2027, 2031, 2035, 2039, 2043, 2047, 2051, 2055, 2059, 2092, 2096],
    winter: [2002, 2003, 2006, 2007, 2011, 2015, 2019, 2023, 2027, 2031, 2035, 2039, 2043, 2080, 2084, 2088, 2092, 2096]
  };
  var winter20th = [2080, 2084, 2088, 2092, 2096];

  var calcSeasons = function calcSeasons(year) {
    // most common defaults
    var res = {
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
    } // winter can be 20th, 21st, or 22nd


    if (exceptions.winter.indexOf(year) !== -1) {
      res.winter = 'Dec 22 ' + year;
    }

    if (winter20th.indexOf(year) !== -1) {
      res.winter = 'Dec 20 ' + year;
    }

    return res;
  };

  var seasons = calcSeasons;

  // these are properly calculated in ./lib/seasons
  var dates$1 = {
    'spring equinox': 'spring',
    'summer solistice': 'summer',
    'fall equinox': 'fall',
    'winter solstice': 'winter'
  }; // aliases

  dates$1['march equinox'] = dates$1['spring equinox'];
  dates$1['vernal equinox'] = dates$1['spring equinox'];
  dates$1['ostara'] = dates$1['spring equinox'];
  dates$1['june solstice'] = dates$1['summer solistice'];
  dates$1['litha'] = dates$1['summer solistice'];
  dates$1['autumn equinox'] = dates$1['fall equinox'];
  dates$1['autumnal equinox'] = dates$1['fall equinox'];
  dates$1['september equinox'] = dates$1['fall equinox'];
  dates$1['sept equinox'] = dates$1['fall equinox'];
  dates$1['mabon'] = dates$1['fall equinox'];
  dates$1['december solstice'] = dates$1['winter solistice'];
  dates$1['dec solstice'] = dates$1['winter solistice'];
  dates$1['yule'] = dates$1['winter solistice'];
  var astroHolidays = dates$1;

  var astroDates = function astroDates(str, normal, year, tz) {
    if (astroHolidays.hasOwnProperty(str) || astroHolidays.hasOwnProperty(normal)) {
      var season = astroHolidays[str] || astroHolidays[normal];
      var seasons$1 = seasons(year);

      if (!season || !seasons$1 || !seasons$1[season]) {
        return null; // couldn't figure it out
      }

      var s = spacetime__default['default'](seasons$1[season], tz);

      if (s.isValid()) {
        return s;
      }
    }

    return null;
  };

  var _04Astronomical = astroDates;

  var dates$2 = {
    // Muslim holidays
    'isra and miraj': 'april 13',
    'lailat al-qadr': 'june 10',
    'eid al-fitr': 'june 15',
    'id al-Fitr': 'june 15',
    'eid ul-Fitr': 'june 15',
    ramadan: 'may 16',
    // Range holiday
    'eid al-adha': 'sep 22',
    muharram: 'sep 12',
    'prophets birthday': 'nov 21'
  };
  var lunarHolidays = dates$2;

  var dayDiff = -10.64;

  var lunarDates = function lunarDates(str, normal, year, tz) {
    if (lunarHolidays.hasOwnProperty(str) || lunarHolidays.hasOwnProperty(normal)) {
      var date = lunarHolidays[str] || lunarHolidays[normal] || [];

      if (!date) {
        return null;
      } // start at 2018


      var s = spacetime__default['default'](date + ' 2018', tz);
      var diff = year - 2018;
      var toAdd = diff * dayDiff;
      s = s.add(toAdd, 'day');
      s = s.startOf('day'); // now set the correct year

      s = s.year(year);

      if (s.isValid()) {
        return s;
      }
    }

    return null;
  };

  var _05LunarDates = lunarDates;

  var nowYear = spacetime__default['default'].now().year();

  var spacetimeHoliday = function spacetimeHoliday(str, year, tz) {
    year = year || nowYear;
    str = str || '';
    str = String(str);
    str = str.trim().toLowerCase();
    str = str.replace(/'s/, 's'); // 'mother's day'

    var normal = str.replace(/ day$/, '');
    normal = normal.replace(/^the /, '');
    normal = normal.replace(/^orthodox /, ''); //orthodox good friday
    // try easier, unmoving holidays

    var s = _01FixedDates(str, normal, year, tz);

    if (s !== null) {
      return s;
    } // try 'nth monday' holidays


    s = _02NthWeekday(str, normal, year, tz);

    if (s !== null) {
      return s;
    } // easter-based holidays


    s = _03EasterDates(str, normal, year, tz);

    if (s !== null) {
      return s;
    } // solar-based holidays


    s = _04Astronomical(str, normal, year, tz);

    if (s !== null) {
      return s;
    } // mostly muslim holidays


    s = _05LunarDates(str, normal, year, tz);

    if (s !== null) {
      return s;
    }

    return null;
  };

  var src = spacetimeHoliday;

  return src;

})));
//# sourceMappingURL=spacetime-holiday.js.map
