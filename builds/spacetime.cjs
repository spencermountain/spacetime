/* spencermountain/spacetime 7.4.0 Apache 2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.spacetime = factory());
})(this, (function () { 'use strict';

  //find the implicit iana code for this machine.
  //safely query the Intl object
  //based on - https://bitbucket.org/pellepim/jstimezonedetect/src

  //this Intl object is not supported often, yet
  const safeIntl = () => {
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
      return null
    }
    let format = Intl.DateTimeFormat();
    if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
      return null
    }
    let timezone = format.resolvedOptions().timeZone;
    if (!timezone) {
      return null
    }
    return timezone
  };

  //do it once per computer
  var guessTz = safeIntl;

  var config = {

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
    fallbackYear: 2023,

    // assume the british interpretation of 02/02/2018, etc
    preferDMY: false,

    // this should be the only call to js Date
    now: () => new Date().getTime(),

    // if the given epoch is really small, it's very likely in seconds and not milliseconds
    // - all years < 2023 map to the first 20 days of Jan 1970 (1.7 billion)
    // - all years < 2049 map to January 1970 (2.5 billion)
    // anything below this number is likely (but not necessarily) a mistaken input.
    // set as null to allow setting epoch inputs for Jan 1970
    minimumEpoch: 2500000000 // 2.5 billion

  };

  const isNumber = val => {
    return typeof val === 'number' && isFinite(val)
  };

  const parse$1 = function (input) {
    // null means now
    if (input === null || input === undefined) {
      return config.now()
    }
    // epoch input
    if (isNumber(input)) {
      // if the given epoch is really small, they've probably given seconds and not milliseconds
      if (input < config.minimumEpoch && input > 0) {
        input *= 1000;
      }
      return input
    }
  };
  var toEpoch = parse$1;

  //https://www.timeanddate.com/date/leapyear.html
  const isLeapYear = function (year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  };
  var isLeapYear$1 = isLeapYear;

  const SEC = 1000;
  const MIN = 60 * SEC;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;

  const YEAR = 365 * DAY;
  const LEAPYEAR = YEAR + DAY;

  var zones$1 = {
    "Africa/Abidjan": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Accra": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Addis_Ababa": {
      "offset": 3,
      "hem": "n"
    },
    "Africa/Algiers": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/Asmara": {
      "offset": 3,
      "hem": "n"
    },
    "Africa/Bamako": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Bangui": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/Banjul": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Bissau": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Blantyre": {
      "offset": 2,
      "hem": "n"
    },
    "Africa/Brazzaville": {
      "offset": 1,
      "hem": "s"
    },
    "Africa/Bujumbura": {
      "offset": 2,
      "hem": "n"
    },
    "Africa/Cairo": {
      "offset": 2,
      "hem": "n"
    },
    "Africa/Casablanca": {
      "offset": 0,
      "hem": "n",
      "dst": "saha"
    },
    "Africa/Ceuta": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Africa/Conakry": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Dakar": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Dar_Es_Salaam": {
      "offset": 3,
      "hem": "n"
    },
    "Africa/Djibouti": {
      "offset": 3,
      "hem": "n"
    },
    "Africa/Douala": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/El_Aaiun": {
      "offset": 0,
      "hem": "n",
      "dst": "saha"
    },
    "Africa/Freetown": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Gaborone": {
      "offset": 2,
      "hem": "s"
    },
    "Africa/Harare": {
      "offset": 2,
      "hem": "s"
    },
    "Africa/Johannesburg": {
      "offset": 2,
      "hem": "s"
    },
    "Africa/Juba": {
      "offset": 3,
      "hem": "n"
    },
    "Africa/Kampala": {
      "offset": 3,
      "hem": "n"
    },
    "Africa/Khartoum": {
      "offset": 2,
      "hem": "n"
    },
    "Africa/Kigali": {
      "offset": 2,
      "hem": "n"
    },
    "Africa/Kinshasa": {
      "offset": 1,
      "hem": "s"
    },
    "Africa/Lagos": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/Libreville": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/Lome": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Luanda": {
      "offset": 1,
      "hem": "s"
    },
    "Africa/Lubumbashi": {
      "offset": 2,
      "hem": "s"
    },
    "Africa/Lusaka": {
      "offset": 2,
      "hem": "s"
    },
    "Africa/Malabo": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/Maputo": {
      "offset": 2,
      "hem": "s"
    },
    "Africa/Maseru": {
      "offset": 2,
      "hem": "s"
    },
    "Africa/Mbabane": {
      "offset": 2,
      "hem": "s"
    },
    "Africa/Mogadishu": {
      "offset": 3,
      "hem": "n"
    },
    "Africa/Monrovia": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Nairobi": {
      "offset": 3,
      "hem": "n"
    },
    "Africa/Ndjamena": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/Niamey": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/Nouakchott": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Ouagadougou": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Porto-novo": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/Sao_Tome": {
      "offset": 0,
      "hem": "n"
    },
    "Africa/Tripoli": {
      "offset": 2,
      "hem": "n"
    },
    "Africa/Tunis": {
      "offset": 1,
      "hem": "n"
    },
    "Africa/Windhoek": {
      "offset": 1,
      "hem": "s"
    },
    "America/Adak": {
      "offset": -10,
      "hem": "n",
      "dst": "usa"
    },
    "America/Anchorage": {
      "offset": -9,
      "hem": "n",
      "dst": "usa"
    },
    "America/Anguilla": {
      "offset": -4,
      "hem": "n"
    },
    "America/Antigua": {
      "offset": -4,
      "hem": "n"
    },
    "America/Araguaina": {
      "offset": -3,
      "hem": "n"
    },
    "America/Argentina": {
      "offset": -3,
      "hem": "s"
    },
    "America/Aruba": {
      "offset": -4,
      "hem": "n"
    },
    "America/Asuncion": {
      "offset": -4,
      "hem": "s",
      "dst": "par"
    },
    "America/Bahia": {
      "offset": -3,
      "hem": "n"
    },
    "America/Bahia_Banderas": {
      "offset": -6,
      "hem": "n",
      "dst": "mex"
    },
    "America/Barbados": {
      "offset": -4,
      "hem": "n"
    },
    "America/Belem": {
      "offset": -3,
      "hem": "n"
    },
    "America/Belize": {
      "offset": -6,
      "hem": "n"
    },
    "America/Blanc-sablon": {
      "offset": -4,
      "hem": "n"
    },
    "America/Boa_Vista": {
      "offset": -4,
      "hem": "n"
    },
    "America/Bogota": {
      "offset": -5,
      "hem": "n"
    },
    "America/Boise": {
      "offset": -7,
      "hem": "n",
      "dst": "usa"
    },
    "America/Buenos_Aires": {
      "offset": -3,
      "hem": "s"
    },
    "America/Cambridge_Bay": {
      "offset": -7,
      "hem": "n",
      "dst": "usa"
    },
    "America/Campo_Grande": {
      "offset": -4,
      "hem": "s"
    },
    "America/Cancun": {
      "offset": -5,
      "hem": "n"
    },
    "America/Caracas": {
      "offset": -4,
      "hem": "n"
    },
    "America/Catamarca": {
      "offset": -3,
      "hem": "s"
    },
    "America/Cayenne": {
      "offset": -3,
      "hem": "n"
    },
    "America/Cayman": {
      "offset": -5,
      "hem": "n"
    },
    "America/Chicago": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/Chihuahua": {
      "offset": -7,
      "hem": "n",
      "dst": "mex"
    },
    "America/Atikokan": {
      "offset": -5,
      "hem": "n"
    },
    "America/Cordoba": {
      "offset": -3,
      "hem": "s"
    },
    "America/Costa_Rica": {
      "offset": -6,
      "hem": "n"
    },
    "America/Creston": {
      "offset": -7,
      "hem": "n"
    },
    "America/Cuiaba": {
      "offset": -4,
      "hem": "s"
    },
    "America/Curacao": {
      "offset": -4,
      "hem": "n"
    },
    "America/Danmarkshavn": {
      "offset": 0,
      "hem": "n"
    },
    "America/Dawson": {
      "offset": -7,
      "hem": "n"
    },
    "America/Dawson_Creek": {
      "offset": -7,
      "hem": "n"
    },
    "America/Denver": {
      "offset": -7,
      "hem": "n",
      "dst": "usa"
    },
    "America/Detroit": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Dominica": {
      "offset": -4,
      "hem": "n"
    },
    "America/Edmonton": {
      "offset": -7,
      "hem": "n",
      "dst": "usa"
    },
    "America/Eirunepe": {
      "offset": -5,
      "hem": "n"
    },
    "America/El_Salvador": {
      "offset": -6,
      "hem": "n"
    },
    "America/Fort_Nelson": {
      "offset": -7,
      "hem": "n"
    },
    "America/Fortaleza": {
      "offset": -3,
      "hem": "s"
    },
    "America/Glace_Bay": {
      "offset": -4,
      "hem": "n",
      "dst": "usa"
    },
    "America/Nuuk": {
      "offset": -3,
      "hem": "n",
      "dst": "green"
    },
    "America/Goose_Bay": {
      "offset": -4,
      "hem": "n",
      "dst": "usa"
    },
    "America/Grand_Turk": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Grenada": {
      "offset": -4,
      "hem": "n"
    },
    "America/Guadeloupe": {
      "offset": -4,
      "hem": "n"
    },
    "America/Guatemala": {
      "offset": -6,
      "hem": "n"
    },
    "America/Guayaquil": {
      "offset": -5,
      "hem": "n"
    },
    "America/Guyana": {
      "offset": -4,
      "hem": "n"
    },
    "America/Halifax": {
      "offset": -4,
      "hem": "n",
      "dst": "usa"
    },
    "America/Havana": {
      "offset": -5,
      "hem": "n",
      "dst": "cuba"
    },
    "America/Hermosillo": {
      "offset": -7,
      "hem": "n"
    },
    "America/Indianapolis": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Inuvik": {
      "offset": -7,
      "hem": "n",
      "dst": "usa"
    },
    "America/Iqaluit": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Jamaica": {
      "offset": -5,
      "hem": "n"
    },
    "America/Jujuy": {
      "offset": -3,
      "hem": "s"
    },
    "America/Juneau": {
      "offset": -9,
      "hem": "n",
      "dst": "usa"
    },
    "America/Kralendijk": {
      "offset": -4,
      "hem": "n"
    },
    "America/La_Paz": {
      "offset": -4,
      "hem": "s"
    },
    "America/Lima": {
      "offset": -5,
      "hem": "s"
    },
    "America/Los_Angeles": {
      "offset": -8,
      "hem": "n",
      "dst": "usa"
    },
    "America/Louisville": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Lower_Princes": {
      "offset": -4,
      "hem": "n"
    },
    "America/Maceio": {
      "offset": -3,
      "hem": "n"
    },
    "America/Managua": {
      "offset": -6,
      "hem": "n"
    },
    "America/Manaus": {
      "offset": -4,
      "hem": "s"
    },
    "America/Marigot": {
      "offset": -4,
      "hem": "n"
    },
    "America/Martinique": {
      "offset": -4,
      "hem": "n"
    },
    "America/Matamoros": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/Mazatlan": {
      "offset": -7,
      "hem": "n",
      "dst": "mex"
    },
    "America/Mendoza": {
      "offset": -3,
      "hem": "s"
    },
    "America/Menominee": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/Merida": {
      "offset": -6,
      "hem": "n",
      "dst": "mex"
    },
    "America/Metlakatla": {
      "offset": -9,
      "hem": "n",
      "dst": "usa"
    },
    "America/Mexico_City": {
      "offset": -6,
      "hem": "n",
      "dst": "mex"
    },
    "America/Miquelon": {
      "offset": -3,
      "hem": "n",
      "dst": "usa"
    },
    "America/Moncton": {
      "offset": -4,
      "hem": "n",
      "dst": "usa"
    },
    "America/Monterrey": {
      "offset": -6,
      "hem": "n",
      "dst": "mex"
    },
    "America/Montevideo": {
      "offset": -3,
      "hem": "s"
    },
    "America/Montserrat": {
      "offset": -4,
      "hem": "n"
    },
    "America/Nassau": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/New_York": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Nipigon": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Nome": {
      "offset": -9,
      "hem": "n",
      "dst": "usa"
    },
    "America/Noronha": {
      "offset": -2,
      "hem": "n"
    },
    "America/Ojinaga": {
      "offset": -7,
      "hem": "n",
      "dst": "usa"
    },
    "America/Panama": {
      "offset": -5,
      "hem": "n"
    },
    "America/Pangnirtung": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Paramaribo": {
      "offset": -3,
      "hem": "n"
    },
    "America/Phoenix": {
      "offset": -7,
      "hem": "n"
    },
    "America/Port-au-prince": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Port_Of_Spain": {
      "offset": -4,
      "hem": "n"
    },
    "America/Porto_Velho": {
      "offset": -4,
      "hem": "n"
    },
    "America/Puerto_Rico": {
      "offset": -4,
      "hem": "n"
    },
    "America/Punta_Arenas": {
      "offset": -3,
      "hem": "s"
    },
    "America/Rainy_River": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/Rankin_Inlet": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/Recife": {
      "offset": -3,
      "hem": "n"
    },
    "America/Regina": {
      "offset": -6,
      "hem": "n"
    },
    "America/Resolute": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/Rio_Branco": {
      "offset": -5,
      "hem": "s"
    },
    "America/Santarem": {
      "offset": -3,
      "hem": "n"
    },
    "America/Santiago": {
      "offset": -4,
      "hem": "s",
      "dst": "chile"
    },
    "America/Santo_Domingo": {
      "offset": -4,
      "hem": "n"
    },
    "America/Sao_Paulo": {
      "offset": -3,
      "hem": "s"
    },
    "America/Scoresbysund": {
      "offset": -1,
      "hem": "n",
      "dst": "eu0"
    },
    "America/Sitka": {
      "offset": -9,
      "hem": "n",
      "dst": "usa"
    },
    "America/St_Barthelemy": {
      "offset": -4,
      "hem": "n"
    },
    "America/St_Johns": {
      "offset": -3.5,
      "hem": "n",
      "dst": "usa"
    },
    "America/St_Kitts": {
      "offset": -4,
      "hem": "n"
    },
    "America/St_Lucia": {
      "offset": -4,
      "hem": "n"
    },
    "America/St_Thomas": {
      "offset": -4,
      "hem": "n"
    },
    "America/St_Vincent": {
      "offset": -4,
      "hem": "n"
    },
    "America/Swift_Current": {
      "offset": -6,
      "hem": "n"
    },
    "America/Tegucigalpa": {
      "offset": -6,
      "hem": "n"
    },
    "America/Thule": {
      "offset": -4,
      "hem": "n",
      "dst": "usa"
    },
    "America/Thunder_Bay": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Tijuana": {
      "offset": -8,
      "hem": "n",
      "dst": "usa"
    },
    "America/Toronto": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Tortola": {
      "offset": -4,
      "hem": "n"
    },
    "America/Vancouver": {
      "offset": -8,
      "hem": "n",
      "dst": "usa"
    },
    "America/Whitehorse": {
      "offset": -7,
      "hem": "n"
    },
    "America/Winnipeg": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/Yakutat": {
      "offset": -9,
      "hem": "n",
      "dst": "usa"
    },
    "America/Yellowknife": {
      "offset": -7,
      "hem": "n",
      "dst": "usa"
    },
    "Antarctica/Casey": {
      "offset": 8,
      "hours": 3,
      "hem": "s",
      "dst": "ant"
    },
    "Antarctica/Davis": {
      "offset": 7,
      "hem": "s"
    },
    "Antarctica/Dumontdurville": {
      "offset": 10,
      "hem": "s"
    },
    "Antarctica/Macquarie": {
      "offset": 11,
      "hem": "s",
      "dst": "aus"
    },
    "Antarctica/Mawson": {
      "offset": 5,
      "hem": "s"
    },
    "Antarctica/Mcmurdo": {
      "offset": 12,
      "hem": "s",
      "dst": "nz"
    },
    "Antarctica/Palmer": {
      "offset": -3,
      "hem": "s"
    },
    "Antarctica/Rothera": {
      "offset": -3,
      "hem": "s"
    },
    "Antarctica/Syowa": {
      "offset": 3,
      "hem": "s"
    },
    "Antarctica/Troll": {
      "offset": 2,
      "hem": "s",
      "dst": "troll"
    },
    "Antarctica/Vostok": {
      "offset": 6,
      "hem": "s"
    },
    "Arctic/Longyearbyen": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Asia/Aden": {
      "offset": 3,
      "hem": "n"
    },
    "Asia/Almaty": {
      "offset": 6,
      "hem": "n"
    },
    "Asia/Amman": {
      "offset": 2,
      "hem": "n",
      "dst": "jord"
    },
    "Asia/Anadyr": {
      "offset": 12,
      "hem": "n"
    },
    "Asia/Aqtau": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Aqtobe": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Ashgabat": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Atyrau": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Baghdad": {
      "offset": 3,
      "hem": "n"
    },
    "Asia/Bahrain": {
      "offset": 3,
      "hem": "n"
    },
    "Asia/Baku": {
      "offset": 4,
      "hem": "n"
    },
    "Asia/Bangkok": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Barnaul": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Beirut": {
      "offset": 2,
      "hem": "n",
      "dst": "leb"
    },
    "Asia/Bishkek": {
      "offset": 6,
      "hem": "n"
    },
    "Asia/Brunei": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Kolkata": {
      "offset": 5.5,
      "hem": "n"
    },
    "Asia/Chita": {
      "offset": 9,
      "hem": "n"
    },
    "Asia/Choibalsan": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Colombo": {
      "offset": 5.5,
      "hem": "n"
    },
    "Asia/Damascus": {
      "offset": 2,
      "hem": "n",
      "dst": "syr"
    },
    "Asia/Dhaka": {
      "offset": 6,
      "hem": "n"
    },
    "Asia/Dili": {
      "offset": 9,
      "hem": "s"
    },
    "Asia/Dubai": {
      "offset": 4,
      "hem": "n"
    },
    "Asia/Dushanbe": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Famagusta": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Asia/Gaza": {
      "offset": 2,
      "hem": "n",
      "dst": "pal"
    },
    "Asia/Hebron": {
      "offset": 2,
      "hem": "n",
      "dst": "pal"
    },
    "Asia/Hong_Kong": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Hovd": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Irkutsk": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Jakarta": {
      "offset": 7,
      "hem": "s"
    },
    "Asia/Jayapura": {
      "offset": 9,
      "hem": "s"
    },
    "Asia/Jerusalem": {
      "offset": 2,
      "hem": "n",
      "dst": "isr"
    },
    "Asia/Kabul": {
      "offset": 4.5,
      "hem": "n"
    },
    "Asia/Kamchatka": {
      "offset": 12,
      "hem": "n"
    },
    "Asia/Karachi": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Kathmandu": {
      "offset": 5.75,
      "hem": "n"
    },
    "Asia/Khandyga": {
      "offset": 9,
      "hem": "n"
    },
    "Asia/Krasnoyarsk": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Kuala_Lumpur": {
      "offset": 8,
      "hem": "s"
    },
    "Asia/Kuching": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Kuwait": {
      "offset": 3,
      "hem": "n"
    },
    "Asia/Macau": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Magadan": {
      "offset": 11,
      "hem": "n"
    },
    "Asia/Makassar": {
      "offset": 8,
      "hem": "s"
    },
    "Asia/Manila": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Muscat": {
      "offset": 4,
      "hem": "n"
    },
    "Asia/Nicosia": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Asia/Novokuznetsk": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Novosibirsk": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Omsk": {
      "offset": 6,
      "hem": "n"
    },
    "Asia/Oral": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Phnom_Penh": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Pontianak": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Pyongyang": {
      "offset": 9,
      "hem": "n"
    },
    "Asia/Qatar": {
      "offset": 3,
      "hem": "n"
    },
    "Asia/Qyzylorda": {
      "offset": 6,
      "hem": "n"
    },
    "Asia/Qostanay": {
      "offset": 6,
      "hem": "n"
    },
    "Asia/Yangon": {
      "offset": 6.5,
      "hem": "n"
    },
    "Asia/Riyadh": {
      "offset": 3,
      "hem": "n"
    },
    "Asia/Ho_Chi_Minh": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Sakhalin": {
      "offset": 11,
      "hem": "n"
    },
    "Asia/Samarkand": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Seoul": {
      "offset": 9,
      "hem": "n"
    },
    "Asia/Shanghai": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Singapore": {
      "offset": 8,
      "hem": "s"
    },
    "Asia/Srednekolymsk": {
      "offset": 12,
      "hem": "n"
    },
    "Asia/Taipei": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Tashkent": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Tbilisi": {
      "offset": 4,
      "hem": "n"
    },
    "Asia/Tehran": {
      "offset": 3.5,
      "hem": "n",
      "dst": "iran"
    },
    "Asia/Thimphu": {
      "offset": 6,
      "hem": "n"
    },
    "Asia/Tokyo": {
      "offset": 9,
      "hem": "n"
    },
    "Asia/Tomsk": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Ulaanbaatar": {
      "offset": 8,
      "hem": "n"
    },
    "Asia/Urumqi": {
      "offset": 6,
      "hem": "n"
    },
    "Asia/Ust-nera": {
      "offset": 10,
      "hem": "n"
    },
    "Asia/Vientiane": {
      "offset": 7,
      "hem": "n"
    },
    "Asia/Vladivostok": {
      "offset": 10,
      "hem": "n"
    },
    "Asia/Yakutsk": {
      "offset": 10,
      "hem": "n"
    },
    "Asia/Yekaterinburg": {
      "offset": 5,
      "hem": "n"
    },
    "Asia/Yerevan": {
      "offset": 4,
      "hem": "n"
    },
    "Atlantic/Azores": {
      "offset": -1,
      "hem": "n",
      "dst": "eu0"
    },
    "Atlantic/Bermuda": {
      "offset": -4,
      "hem": "n",
      "dst": "usa"
    },
    "Atlantic/Canary": {
      "offset": 0,
      "hem": "n",
      "dst": "eu1"
    },
    "Atlantic/Cape_Verde": {
      "offset": -1,
      "hem": "n"
    },
    "Atlantic/Faroe": {
      "offset": 0,
      "hem": "n",
      "dst": "eu1"
    },
    "Atlantic/Madeira": {
      "offset": 0,
      "hem": "n",
      "dst": "eu1"
    },
    "Atlantic/Reykjavik": {
      "offset": 0,
      "hem": "n"
    },
    "Atlantic/South_Georgia": {
      "offset": -2,
      "hem": "n"
    },
    "Atlantic/St_Helena": {
      "offset": 0,
      "hem": "n"
    },
    "Atlantic/Stanley": {
      "offset": -3,
      "hem": "s"
    },
    "Australia/Adelaide": {
      "offset": 9.5,
      "hem": "s",
      "dst": "aus"
    },
    "Australia/Brisbane": {
      "offset": 10,
      "hem": "s"
    },
    "Australia/Broken_Hill": {
      "offset": 9.5,
      "hem": "s",
      "dst": "aus"
    },
    "Australia/Darwin": {
      "offset": 9.5,
      "hem": "s"
    },
    "Australia/Eucla": {
      "offset": 8.75,
      "hem": "s"
    },
    "Australia/Hobart": {
      "offset": 10,
      "hem": "s",
      "dst": "aus"
    },
    "Australia/Lindeman": {
      "offset": 10,
      "hem": "s"
    },
    "Australia/Lord_Howe": {
      "offset": 10.5,
      "change": 0.5,
      "hem": "s",
      "dst": "lhow"
    },
    "Australia/Melbourne": {
      "offset": 10,
      "hem": "s",
      "dst": "aus"
    },
    "Australia/Perth": {
      "offset": 8,
      "hem": "s"
    },
    "Australia/Sydney": {
      "offset": 10,
      "hem": "s",
      "dst": "aus"
    },
    "Europe/Amsterdam": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Andorra": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Astrakhan": {
      "offset": 4,
      "hem": "n"
    },
    "Europe/Athens": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Belgrade": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Berlin": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Bratislava": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Brussels": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Bucharest": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Budapest": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Busingen": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Chisinau": {
      "offset": 2,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Copenhagen": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Dublin": {
      "offset": 0,
      "hem": "n",
      "dst": "eu1"
    },
    "Europe/Gibraltar": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Guernsey": {
      "offset": 0,
      "hem": "n",
      "dst": "eu1"
    },
    "Europe/Helsinki": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Isle_Of_Man": {
      "offset": 0,
      "hem": "n",
      "dst": "eu1"
    },
    "Europe/Istanbul": {
      "offset": 3,
      "hem": "n"
    },
    "Europe/Jersey": {
      "offset": 0,
      "hem": "n",
      "dst": "eu1"
    },
    "Europe/Kaliningrad": {
      "offset": 2,
      "hem": "n"
    },
    "Europe/Kirov": {
      "offset": 3,
      "hem": "n"
    },
    "Europe/Kiev": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Lisbon": {
      "offset": 0,
      "hem": "n",
      "dst": "eu1"
    },
    "Europe/Ljubljana": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/London": {
      "offset": 0,
      "hem": "n",
      "dst": "eu1"
    },
    "Europe/Luxembourg": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Madrid": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Malta": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Mariehamn": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Minsk": {
      "offset": 3,
      "hem": "n"
    },
    "Europe/Monaco": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Moscow": {
      "offset": 3,
      "hem": "n"
    },
    "Europe/Oslo": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Paris": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Podgorica": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Prague": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Riga": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Rome": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Samara": {
      "offset": 4,
      "hem": "n"
    },
    "Europe/Saratov": {
      "offset": 4,
      "hem": "n"
    },
    "Europe/San_Marino": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Sarajevo": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Simferopol": {
      "offset": 3,
      "hem": "n"
    },
    "Europe/Skopje": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Sofia": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Stockholm": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Tallinn": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Tirane": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Ulyanovsk": {
      "offset": 4,
      "hem": "n"
    },
    "Europe/Uzhgorod": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Vaduz": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Vatican": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Vienna": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Vilnius": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Volgograd": {
      "offset": 4,
      "hem": "n"
    },
    "Europe/Warsaw": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Zagreb": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Europe/Zaporozhye": {
      "offset": 2,
      "hem": "n",
      "dst": "eu3"
    },
    "Europe/Zurich": {
      "offset": 1,
      "hem": "n",
      "dst": "eu2"
    },
    "Indian/Antananarivo": {
      "offset": 3,
      "hem": "s"
    },
    "Indian/Chagos": {
      "offset": 6,
      "hem": "n"
    },
    "Indian/Christmas": {
      "offset": 7,
      "hem": "s"
    },
    "Indian/Cocos": {
      "offset": 6.5,
      "hem": "n"
    },
    "Indian/Comoro": {
      "offset": 3,
      "hem": "n"
    },
    "Indian/Kerguelen": {
      "offset": 5,
      "hem": "s"
    },
    "Indian/Mahe": {
      "offset": 4,
      "hem": "n"
    },
    "Indian/Maldives": {
      "offset": 5,
      "hem": "n"
    },
    "Indian/Mauritius": {
      "offset": 4,
      "hem": "n"
    },
    "Indian/Mayotte": {
      "offset": 3,
      "hem": "n"
    },
    "Indian/Reunion": {
      "offset": 4,
      "hem": "s"
    },
    "Pacific/Apia": {
      "offset": 13,
      "hem": "s"
    },
    "Pacific/Auckland": {
      "offset": 12,
      "hem": "s",
      "dst": "nz"
    },
    "Pacific/Bougainville": {
      "offset": 11,
      "hem": "s"
    },
    "Pacific/Chatham": {
      "offset": 12.75,
      "hem": "s",
      "dst": "chat"
    },
    "Pacific/Easter": {
      "offset": -6,
      "hem": "s",
      "dst": "east"
    },
    "Pacific/Efate": {
      "offset": 11,
      "hem": "n"
    },
    "Pacific/Kanton": {
      "offset": 13,
      "hem": "n"
    },
    "Pacific/Fakaofo": {
      "offset": 13,
      "hem": "n"
    },
    "Pacific/Fiji": {
      "offset": 12,
      "hem": "s",
      "dst": "fiji"
    },
    "Pacific/Funafuti": {
      "offset": 12,
      "hem": "n"
    },
    "Pacific/Galapagos": {
      "offset": -6,
      "hem": "n"
    },
    "Pacific/Gambier": {
      "offset": -9,
      "hem": "n"
    },
    "Pacific/Guadalcanal": {
      "offset": 11,
      "hem": "n"
    },
    "Pacific/Guam": {
      "offset": 10,
      "hem": "n"
    },
    "Pacific/Honolulu": {
      "offset": -10,
      "hem": "n"
    },
    "Pacific/Kiritimati": {
      "offset": 14,
      "hem": "n"
    },
    "Pacific/Kosrae": {
      "offset": 11,
      "hem": "n"
    },
    "Pacific/Kwajalein": {
      "offset": 12,
      "hem": "n"
    },
    "Pacific/Majuro": {
      "offset": 12,
      "hem": "n"
    },
    "Pacific/Marquesas": {
      "offset": -9.5,
      "hem": "n"
    },
    "Pacific/Midway": {
      "offset": -11,
      "hem": "n"
    },
    "Pacific/Nauru": {
      "offset": 12,
      "hem": "n"
    },
    "Pacific/Niue": {
      "offset": -11,
      "hem": "n"
    },
    "Pacific/Norfolk": {
      "offset": 10.5,
      "hem": "n",
      "dst": "aus"
    },
    "Pacific/Noumea": {
      "offset": 11,
      "hem": "n"
    },
    "Pacific/Pago_Pago": {
      "offset": -11,
      "hem": "n"
    },
    "Pacific/Palau": {
      "offset": 9,
      "hem": "n"
    },
    "Pacific/Pitcairn": {
      "offset": -8,
      "hem": "n"
    },
    "Pacific/Pohnpei": {
      "offset": 11,
      "hem": "n"
    },
    "Pacific/Port_Moresby": {
      "offset": 10,
      "hem": "s"
    },
    "Pacific/Rarotonga": {
      "offset": -10,
      "hem": "n"
    },
    "Pacific/Saipan": {
      "offset": 10,
      "hem": "n"
    },
    "Pacific/Tahiti": {
      "offset": -10,
      "hem": "n"
    },
    "Pacific/Tarawa": {
      "offset": 12,
      "hem": "n"
    },
    "Pacific/Tongatapu": {
      "offset": 13,
      "hem": "s"
    },
    "Pacific/Chuuk": {
      "offset": 10,
      "hem": "n"
    },
    "Pacific/Wake": {
      "offset": 12,
      "hem": "n"
    },
    "Pacific/Wallis": {
      "offset": 12,
      "hem": "n"
    },
    "Etc/GMT": {
      "offset": 0,
      "hem": "n"
    },
    "Etc/Utc": {
      "offset": 0,
      "hem": "n"
    },
    "America/Argentina/La_Rioja": {
      "offset": -3,
      "hem": "s"
    },
    "America/Argentina/Rio_Gallegos": {
      "offset": -3,
      "hem": "s"
    },
    "America/Argentina/Salta": {
      "offset": -3,
      "hem": "s"
    },
    "America/Argentina/San_Juan": {
      "offset": -3,
      "hem": "s"
    },
    "America/Argentina/San_Luis": {
      "offset": -3,
      "hem": "s"
    },
    "America/Argentina/Tucuman": {
      "offset": -3,
      "hem": "s"
    },
    "America/Argentina/Ushuaia": {
      "offset": -3,
      "hem": "s"
    },
    "America/Indiana/Knox": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/Indiana/Tell_City": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/North_Dakota/Beulah": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/North_Dakota/Center": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/North_Dakota/New_Salem": {
      "offset": -6,
      "hem": "n",
      "dst": "usa"
    },
    "America/Indiana/Marengo": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Indiana/Petersburg": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Indiana/Vevay": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Indiana/Vincennes": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Indiana/Winamac": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    },
    "America/Kentucky/Monticello": {
      "offset": -5,
      "hem": "n",
      "dst": "usa"
    }
  };

  const MAXOFFSET = -DAY * 2;
  const memo$1 = {};

  const utcStart = function (year) {
    // try and compute this only once
    if (memo$1.hasOwnProperty(year)) {
      return memo$1[year]
    }
    let epoch = 0;
    // count up from 1970
    if (year > 1970) {
      for (let y = 1970; y < year; y += 1) {
        if (isLeapYear$1(y)) {
          epoch += LEAPYEAR;
        } else {
          epoch += YEAR;
        }
        memo$1[y + 1] = epoch;
      }
    } else {
      // count down from 1970
      let y = 1970;
      while (y > year) {
        y -= 1;
        if (isLeapYear$1(y)) {
          epoch -= LEAPYEAR;
        } else {
          epoch -= YEAR;
        }
        memo$1[y] = epoch;
      }
    }
    return epoch
  };

  const januaryOffset = function (tz) {
    // apply timezone offset to it
    if (tz && zones$1.hasOwnProperty(tz)) {
      let zone = zones$1[tz];
      let offset = zone.offset || 0;
      // are we in DST on Jan 1st?
      // all 16 southern hemisphere zones w/ DST
      if (zone.hem === 's' && zone.dst) {
        offset += zone.change || 1;
      }
      return offset * HOUR
    }
    return 0
  };

  // get UTC epoch for jan 1
  const getStart = function (year, tz) {
    let epoch = utcStart(year);
    epoch -= januaryOffset(tz);
    return epoch
  };

  // from a random epoch, get it's Jan 1st alignment
  const getYear = function (target, tz) {
    let epoch = 0;
    // apply timezone offset to it
    epoch -= januaryOffset(tz);
    let year = 1970;
    // count upwards from 1970
    if (target > MAXOFFSET) {
      while (epoch <= target) {
        let size = YEAR;
        if (isLeapYear$1(year)) {
          size = LEAPYEAR;
        }
        let tmp = epoch + size;
        if (tmp > target) {
          break
        }
        epoch = tmp;
        year += 1;
      }
    } else {
      // count downwards from 1970
      while (epoch > target) {
        let size = YEAR;
        if (isLeapYear$1(year)) {
          size = LEAPYEAR;
        }
        epoch -= size;
        year -= 1;
      }
    }
    return { start: epoch, year }
  };

  var MONTHS = [
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
  ];

  const monthLengths$1 = MONTHS.map(o => o.len);

  const getDate = function (diffDays, year) {
    let res = { month: 1, date: 1 };
    let total = 0;
    for (let i = 0; i < MONTHS.length - 1; i += 1) {
      let inMonth = monthLengths$1[i];
      if (i === 1 && isLeapYear$1(year)) {
        inMonth = 29;
      }
      if (total + inMonth > diffDays) {
        break
      }
      total += inMonth;
      res.month += 1;
    }
    // add remainder to days
    res.date += diffDays - total;
    return res
  };

  const getTime = function (ms) {
    let res = { hour: 0, minute: 0, second: 0, ms: 0 };
    // get hour
    res.hour = Math.floor(ms / HOUR);
    ms -= res.hour * HOUR;
    // get minute
    res.minute = Math.floor(ms / MIN);
    ms -= res.minute * MIN;
    // get second
    res.second = Math.floor(ms / SEC);
    ms -= res.second * SEC;
    // remainder milliseconds
    res.ms = ms;
    return res
  };

  // these are the folk heuristics that timezones use to set their dst change dates
  // for example, the US changes:
  // the second Sunday of March -> first Sunday of November
  // http://www.webexhibits.org/daylightsaving/g.html
  let zones = {
    usa: '2nd-sun-mar-2h|1st-sun-nov-2h',// (From 1987 to 2006)
    // mexico
    mex: '1st-sun-apr-2h|last-sun-oct-2h',

    // European Union zone
    eu0: 'last-sun-mar-0h|last-sun-oct-1h',
    eu1: 'last-sun-mar-1h|last-sun-oct-2h',
    eu2: 'last-sun-mar-2h|last-sun-oct-3h',
    eu3: 'last-sun-mar-3h|last-sun-oct-4h',
    //greenland
    green: 'last-sat-mar-22h|last-sat-oct-23h',

    // australia
    aus: '1st-sun-apr-1h|1st-sun-oct-2h',
    //lord howe australia
    lhow: '1st-sun-apr-0.5h|1st-sun-oct-2h',
    // new zealand
    chat: '1st-sun-apr-2h|last-sun-sep-2h', //technically 3:45h -> 2:45h
    // new Zealand, antarctica 
    nz: '1st-sun-apr-1h|last-sun-sep-2h',
    // casey - antarctica
    ant: '2nd-sun-mar-0h|1st-sun-oct-0h',
    // troll - antarctica
    troll: 'last-sun-mar-2h|last-sun-oct-3h',

    //jordan
    jord: 'last-fri-feb-0h|last-fri-oct-1h',
    // lebanon
    leb: 'last-sun-mar-0h|last-sun-oct-0h',
    // syria
    syr: 'last-fri-mar-0h|last-fri-oct-0h',
    //israel
    // Start: Last Friday before April 2 -> The Sunday between Rosh Hashana and Yom Kippur
    isr: 'last-fri-mar-2h|last-sun-oct-2h',
    //palestine
    pal: 'last-sun-mar-0h|last-fri-oct-1h',

    // el aaiun
    //this one seems to be on arabic calendar?
    saha: 'last-sun-mar-3h|1st-sun-may-2h',

    // paraguay
    par: 'last-sat-mar-22h|1st-sun-oct-0h',
    //cuba
    cuba: '2nd-sun-mar-0h|1st-sun-nov-1h',
    //chile
    chile: '1st-sat-apr-22h|1st-sun-sep-0h',
    //easter island
    east: '1st-sat-apr-20h|1st-sat-sep-22h',
    //fiji
    fiji: '3rd-sun-jan-3h|2nd-sun-nov-2h',
    // iran
    iran: '4th-mon-march-0h|3rd-fri-sep-0h',//arabic calendar?

  };
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat',];

  const parse = function (str) {
    let [num, day, month, hour] = str.split(/-/g);
    hour = hour.replace(/h$/, '');
    hour = Number(hour);

    if (num !== 'last') {
      num = num.replace(/(st|nd|rd|th)$/, '');
      num = Number(num) || num;
    }
    //convert to numbers
    month = months.indexOf(month) + 1;
    day = days.indexOf(day);
    return {
      num, day, month, hour
    }
  };

  Object.keys(zones).forEach(k => {
    let str = zones[k];
    let [start, end] = str.split(/\|/);
    zones[k] = {
      start: parse(start),
      end: parse(end),
    };
  });

  var patterns = zones;
  // console.log(zones)

  // determine current day (mon, tues)
  // using 'Key-Value Method' from - https://artofmemory.com/blog/how-to-calculate-the-day-of-the-week/

  // const DAYS = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ];

  const month_code = function (n) {
    let month_codes = [
      null,
      0, //January
      3, //February
      3, //March
      6, //April
      1, //May
      4, //June
      6, //July
      2, //August
      5, //September
      0, //October
      3, //November
      5, //December
    ];
    return month_codes[n]
  };

  const year_code = function (year) {
    let yy = year % 100;
    return (yy + parseInt(yy / 4, 10)) % 7;
  };

  const century_code = function (year) {
    //julian
    if (year < 1752) {
      let c = parseInt(year / 100, 10);
      return 18 - c % 7;
    }
    //gregorian
    let c = parseInt(year / 100, 10);
    let codes = {
      '17': 4, // 1700s = 4
      '18': 2, // 1800s = 2
      '19': 0, // 1900s = 0
      '20': 6, // 2000s = 6
      '21': 4, // 2100s = 4
      '22': 2, // 2200s = 2
      '23': 0, // 2300s = 0
    };
    return codes[String(c)] || 0
  };

  // https://www.timeanddate.com/date/leapyear.html
  const leap_code = function (year) {
    let is_leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (is_leap === true) {
      return -1
    } else {
      return 0
    }
  };

  // which day of the week is it?
  const getDay = function (year, month, date) {
    let yc = year_code(year);
    let mc = month_code(month);
    let cc = century_code(year);
    let dc = date;
    let lc = leap_code(year);
    // (Year Code + Month Code + Century Code + Date Number - Leap Year Code) mod 7
    let day = (yc + mc + cc + dc + lc) % 7;
    return day
    // return DAYS[day]
  };
  var getDay$1 = getDay;


  // 1969-07-20 - sunday
  // 1897-03-14 - sunday
  //1066-10-14 -sat
  // let cal = { year: 2022, month: 10, date: 13 }
  // let cal = { year: 1066, month: 10, date: 14 }
  // let cal = { year: 1897, month: 3, date: 14 }
  // let cal = { year: 1969, month: 7, date: 20 }

  const monthLengths = MONTHS.map(o => o.len);

  const addMonths = function (months, year) {
    let ms = 0;
    for (let i = 0; i < months - 1; i += 1) {
      let days = monthLengths[i];
      if (i === 1 && isLeapYear$1(year)) {
        days = 29;
      }
      ms += days * DAY;
    }
    return ms
  };

  // click forward to the proper weekday
  const toWeekDay = function (obj, year) {
    let day = getDay$1(year, obj.month, 1);
    let want = obj.day;
    let diff = 0;
    for (let i = 0; i < 7; i += 1) {
      if (day === want) {
        return diff //* DAY
      }
      day += 1;
      day = day % 7;
      diff += 1;
    }
    return 0
  };


  const toRightWeek = function (num, day, month) {
    if (num === 'first' || num <= 1) {
      return 0
    }
    if (num === 'last') {
      let max = monthLengths[month + 1] || 31;
      let days = 0;
      for (let i = 0; i < 5; i += 1) {
        days += 7;
        if (days + day >= max) {
          return days - 7 //went too far
        }
      }
      console.log('fixme [toRightWeek]');//eslint-disable-line
      return 3
    }
    let days = (num - 1) * 7;
    return days // * DAY
  };


  const calc = function (obj, year, offset) {
    let date = 1;
    let month = obj.month;
    let epoch = getStart(year);
    // go to the correct month
    epoch += addMonths(obj.month, year);
    // go to the correct day
    let days = toWeekDay(obj, year);
    date += days;
    epoch += days * DAY;
    // go to the correct week
    days = toRightWeek(obj.num, days, obj.month);
    epoch += days * DAY;
    date += days;
    // go to the correct hour
    epoch += (obj.hour || 0) * HOUR;
    // go to the correct offset
    epoch -= offset * 60 * 60 * 1000;
    // console.log(new Date(epoch))

    return { epoch, month, date }
  };
  // 2nd tuesday
  // console.log(calc({ month: 10, day: 2, num: 2, hour: 2 }, 2022))

  var calc$1 = calc;

  let memo = {};

  // calculate DST times, for this timezone
  const getDst = function (tz, year) {
    // try and calculate each tz+year pair only once
    if (memo.hasOwnProperty(tz) && memo[tz].hasOwnProperty(year)) {
      return memo[tz][year]
    }
    memo[tz] = memo[tz] || {};

    let { dst, offset, change, hem } = zones$1[tz] || {};
    change = change || 1;

    let changes = [];

    let obj = patterns[dst];
    // if it has no dst..
    if (!obj) {
      memo[tz][year] = [];
      return changes
    }
    // get epoch for spring dst change
    let res = calc$1(obj.start, year, offset);
    // console.log(res)
    let delta = hem === 'n' ? change : 0;
    changes.push({
      epoch: res.epoch,
      cal: {
        year,
        month: res.month,
        date: res.date,
        hour: obj.start.hour,
        minute: 0,
      },
      delta,
      offset: offset + delta
    });


    // get epoch for fall dst change
    res = calc$1(obj.end, year, offset);
    delta = hem === 's' ? change : 0;
    changes.push({
      epoch: res.epoch - HOUR, //todo fixme
      cal: {
        year,
        month: res.month,
        date: res.date,
        hour: obj.end.hour,
        minute: 0,
      },
      delta,
      offset: offset + delta
    });
    // store it for next time
    memo[tz][year] = changes;
    return changes
  };

  var getDst$1 = getDst;

  // console.log(getDst('America/Toronto', 2023))
  // console.log(getDst('Australia/Adelaide', 2023))
  console.log(getDst('Australia/Melbourne', 2010));

  // take an epoch, return {month, year, date...}
  const computeCal = function (epoch, tz) {
    // get Jan 1 of the year
    let { start, year } = getYear(epoch, tz);
    let cal = {
      year,
      month: 1,
      date: 1,
      hour: 0,
      second: 0,
      millisecond: 0
    };

    // kick the epoch around, according to our DST offset
    let changes = getDst$1(tz, year);
    for (let i = changes.length - 1; i >= 0; i -= 1) {
      if (epoch >= changes[i].epoch) {
        epoch += changes[i].delta * HOUR;
        break
      }
    }

    // walk the days
    let diff = epoch - start;
    let daysDiff = Math.floor(diff / DAY);
    // compute month, date
    let resDate = getDate(daysDiff, year);
    Object.assign(cal, resDate);

    // compute hour, min, sec..
    let deltaMs = diff - (daysDiff * DAY);
    let resMins = getTime(deltaMs);
    Object.assign(cal, resMins);
    // consult any DST changes
    // let changes = getDst(tz, year)
    // // find the latest change
    // for (let i = changes.length - 1; i >= 0; i -= 1) {
    //   if (epoch >= changes[i].epoch) {
    //     let delta = changes[i].delta
    //     if (isInt(delta)) {
    //       cal.hour += delta
    //       if (cal.hour === 24) {
    //         cal.date += 1 //this sucks
    //         cal.hour = 0
    //       }
    //     } else {
    //       cal.minute += delta * 60  //TODO: this sucks
    //     }
    //     break
    //   }
    // }

    return cal
  };
  var getCal = computeCal;

  var get = {
    year: (epoch, tz) => getCal(epoch, tz).year,
    month: (epoch, tz) => getCal(epoch, tz).month,
    date: (epoch, tz) => getCal(epoch, tz).date,
    hour: (epoch, tz) => getCal(epoch, tz).hour,
    minute: (epoch, tz) => getCal(epoch, tz).minute,
    second: (epoch, tz) => getCal(epoch, tz).second,
    ampm: (epoch, tz) => {
      let hour = getCal(epoch, tz).hour;
      return hour < 12 ? 'am' : 'pm'
    },
  };

  var set = {
    year: (epoch, tz, year) => {
      return new Spacetime(epoch, tz)
    }
  };

  function ordinal(i) {
    let j = i % 10;
    let k = i % 100;
    if (j === 1 && k !== 11) {
      return i + 'st'
    }
    if (j === 2 && k !== 12) {
      return i + 'nd'
    }
    if (j === 3 && k !== 13) {
      return i + 'rd'
    }
    return i + 'th'
  }

  function zeroPad(str, len = 2) {
    let pad = '0';
    str = str + '';
    return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str
  }

  const formats = {

    // day: (c) => titleCase(s.dayName()),
    // 'day-short': (c) => titleCase(_short()[s.day()]),
    // 'day-number': (c) => s.day(),
    // 'day-ordinal': (c) => ordinal(s.day()),
    // 'day-pad': (c) => zeroPad(s.day()),

    date: (c) => c.date,
    'date-ordinal': (c) => ordinal(c.date),
    'date-pad': (c) => zeroPad(c.date),

    // month: (c) => titleCase(c.monthName()),
    // 'month-short': (c) => titleCase(short()[c.month]),
    'month-number': (c) => c.month,
    'month-ordinal': (c) => ordinal(c.month),
    'month-pad': (c) => zeroPad(c.month),
    'iso-month': (c) => zeroPad(c.month + 1), //1-based months
    'iso-short': (c) => `${c.year}-${zeroPad(c.month)}-${zeroPad(c.date)}`,
    'iso': (c) => `${c.year}-${zeroPad(c.month)}-${zeroPad(c.date)}T${zeroPad(c.hour)}:${zeroPad(c.minute)}:${zeroPad(c.second)}.${zeroPad(c.ms, 3)}`,

    year: (c) => c.year > 0 ? c.year : `${Math.abs(c.year)} BC`,
    'year-short': (c) => {
      let y = c.year;
      if (y > 0) {
        return `'${String(y).substr(2, 4)}`
      }
      return Math.abs(y) + ' BC'
    },
    'iso-year': (c) => {
      let str = zeroPad(Math.abs(c.year), 4); //0-padded
      if (c.year < 0) {
        str = '-' + zeroPad(str, 6);  //negative years are for some reason 6-digits ('-00008')
      }
      return str
    },

    time: (c) => c.time(),
    'time-24': (c) => `${c.hour}:${zeroPad(c.minute)}`,

    hour: (c) => c.hour % 12,
    'hour-pad': (c) => zeroPad(c.hour % 12),
    'hour-24': (c) => c.hour,
    'hour-24-pad': (c) => zeroPad(c.hour),

    minute: (c) => c.minute,
    'minute-pad': (c) => zeroPad(c.minute),
    second: (c) => c.second,
    'second-pad': (c) => zeroPad(c.second),
    ms: (c) => c.ms,
    millisecond: (c) => c.ms,
    'millisecond-pad': (c) => zeroPad(c.ms, 3),

    ampm: (c) => c.hour < 12 ? 'am' : 'pm',
    AMPM: (c) => c.hour < 12 ? 'AM' : 'PM',
    quarter: (c) => {
      if (c.month < 3) {
        return 'Q1'
      } else if (c.month < 6) {
        return 'Q2'
      } else if (c.month < 9) {
        return 'Q3'
      }
      return 'Q4'
    }

  };
  // aliases
  const aliases$1 = {
    'hour-12': 'hour',
    'hour-12-pad': 'hour-pad',
    'day-name': 'day',
    'month-name': 'month',
    'iso 8601': 'iso',
    'time-h24': 'time-24',
    'time-12': 'time',
    'time-h12': 'time',
    tz: 'timezone',
    'day-num': 'day-number',
    'month-num': 'month-number',
    'month-iso': 'iso-month',
    'year-iso': 'iso-year',
    'nice-short': 'nice',
    'nice-short-24': 'nice-24',
    mdy: 'numeric-us',
    dmy: 'numeric-uk',
    ymd: 'numeric',
    'yyyy/mm/dd': 'numeric',
    'mm/dd/yyyy': 'numeric-us',
    'dd/mm/yyyy': 'numeric-us',
    'little-endian': 'numeric-uk',
    'big-endian': 'numeric',
    'day-nice': 'nice-day'
  };
  Object.keys(aliases$1).forEach((k) => (formats[k] = formats[aliases$1[k]]));

  var formats$1 = formats;

  const replace = function (cal, str) {
    let sections = /\{(.+?)\}/g;
    str = str.replace(sections, (_, name) => {
      name = name.toLowerCase().trim();
      if (formats$1.hasOwnProperty(name)) {
        return formats$1[name](cal)
      }
      return `{${name}}`
    });
    return str
  };
  var replace$1 = replace;

  let methods$2 = {
    format: function (fmt) {
      let cal = getCal(this.epoch, this.tz);
      if (fmt && formats$1.hasOwnProperty(fmt)) {
        return formats$1[fmt](cal)
      }
      return replace$1(cal, fmt)
    }
  };

  // format methods
  let deriv = [
    ['iso', '{iso-year}-{month-pad}-{date-pad}T{hour-24-pad}:{minute-pad}:{second-pad}.{millisecond-pad}'],//{offset}
    ['time', '{hour-12}:{minute-pad}{ampm}'],
  ];
  deriv.forEach(a => {
    let [fn, fmt] = a;
    methods$2[fn] = function () {
      let cal = getCal(this.epoch, this.tz);
      return replace$1(cal, fmt)
    };
  });

  var fmts = methods$2;

  let methods = {};
  let units = ['year', 'month', 'date', 'hour', 'minute', 'second'];

  // generate all getter/setter function pairs
  units.forEach(fn => {
    methods[fn] = function (input) {
      let { epoch, tz } = this;
      if (input !== undefined) {
        return set[fn](epoch, tz, input)
      }
      return get[fn](epoch, tz)
    };
  });

  // add format methods
  Object.assign(methods, fmts);

  var methods$1 = methods;

  const SpaceTime = function (input, tz) {
    //the holy UNIX moment
    this.epoch = toEpoch(input);
    //the shift for the given timezone
    this.tz = tz || config.fallbackTz;
  };

  Object.assign(SpaceTime.prototype, methods$1);

  // add method aliases
  const aliases = [
    ['hours', 'hour'],
    ['minutes', 'minute'],
    ['seconds', 'second'],
  ];
  aliases.forEach(a => {
    SpaceTime.prototype[a[0]] = SpaceTime.prototype[a[1]];
  });

  var Spacetime = SpaceTime;

  const main = (input, tz) => new Spacetime(input, tz);

  //some helper functions on the main method
  main.now = (tz) => new Spacetime(config.now(), tz);

  main.today = (tz) => new Spacetime(new Date().getTime(), tz).startOf('day');

  return main;

}));
