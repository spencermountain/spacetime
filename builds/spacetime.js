/* spencermountain/spacetime 6.16.3 Apache 2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.spacetime = factory());
}(this, (function () { 'use strict';

  const MSEC_IN_HOUR = 60 * 60 * 1000; //convert our local date syntax a javascript UTC date

  const toUtc = (dstChange, offset, year) => {
    const [month, rest] = dstChange.split('/');
    const [day, hour] = rest.split(':');
    return Date.UTC(year, month - 1, day, hour) - offset * MSEC_IN_HOUR;
  }; // compare epoch with dst change events (in utc)


  const inSummerTime$1 = (epoch, start, end, summerOffset, winterOffset) => {
    const year = new Date(epoch).getUTCFullYear();
    const startUtc = toUtc(start, winterOffset, year);
    const endUtc = toUtc(end, summerOffset, year); // simple number comparison now

    return epoch >= startUtc && epoch < endUtc;
  };

  var summerTime = inSummerTime$1;

  var inSummerTime = summerTime;

  // it reproduces some things in ./index.js, but speeds up spacetime considerably

  const quickOffset$1 = s => {
    let zones = s.timezones;
    let obj = zones[s.tz];

    if (obj === undefined) {
      console.warn("Warning: couldn't find timezone " + s.tz);
      return 0;
    }

    if (obj.dst === undefined) {
      return obj.offset;
    } //get our two possible offsets


    let jul = obj.offset;
    let dec = obj.offset + 1; // assume it's the same for now

    if (obj.hem === 'n') {
      dec = jul - 1;
    }

    let split = obj.dst.split('->');
    let inSummer = inSummerTime(s.epoch, split[0], split[1], jul, dec);

    if (inSummer === true) {
      return jul;
    }

    return dec;
  };

  var quick = quickOffset$1;

  var _build = {
  	"9|s": "2/dili,2/jayapura",
  	"9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
  	"9.5|s|04/04:03->10/03:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
  	"9.5|s": "4/darwin,4/north",
  	"8|s|03/08:01->10/04:00": "12/casey",
  	"8|s": "2/kuala_lumpur,2/makassar,2/singapore,4/perth,2/ujung_pandang,4/west",
  	"8|n": "2/brunei,2/choibalsan,2/hong_kong,2/irkutsk,2/kuching,2/macau,2/manila,2/shanghai,2/taipei,2/ulaanbaatar,2/chongqing,2/chungking,2/harbin,2/macao,2/ulan_bator",
  	"8.75|s": "4/eucla",
  	"7|s": "12/davis,2/jakarta,9/christmas",
  	"7|n": "2/bangkok,2/barnaul,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane,2/ho_chi_minh",
  	"6|s": "12/vostok",
  	"6|n": "2/almaty,2/bishkek,2/dhaka,2/omsk,2/qyzylorda,2/qostanay,2/thimphu,2/urumqi,9/chagos,2/dacca,2/kashgar,2/thimbu",
  	"6.5|n": "2/rangoon,9/cocos,2/yangon",
  	"5|s": "12/mawson,9/kerguelen",
  	"5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives,2/ashkhabad",
  	"5.75|n": "2/katmandu,2/kathmandu",
  	"5.5|n": "2/calcutta,2/colombo,2/kolkata",
  	"4|s": "9/reunion",
  	"4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
  	"4.5|n|03/22:00->09/21:24": "2/tehran",
  	"4.5|n": "2/kabul",
  	"3|s": "12/syowa,9/antananarivo",
  	"3|n|03/28:03->10/31:04": "2/famagusta,2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye,8/nicosia",
  	"3|n|03/28:02->10/31:03": "8/chisinau,8/tiraspol",
  	"3|n|03/28:00->10/30:24": "2/beirut",
  	"3|n|03/27:00->10/30:01": "2/gaza,2/hebron",
  	"3|n|03/26:02->10/31:02": "2/jerusalem,2/tel_aviv",
  	"3|n|03/26:00->10/29:01": "2/amman",
  	"3|n|03/26:00->10/28:24": "2/damascus",
  	"3|n": "0/addis_ababa,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte,0/asmara,2/istanbul",
  	"2|s|03/28:02->10/31:02": "12/troll",
  	"2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
  	"2|n|03/28:02->10/31:03": "0/ceuta,arctic/longyearbyen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich,3/jan_mayen",
  	"2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
  	"1|s": "0/brazzaville,0/kinshasa,0/luanda,0/windhoek",
  	"1|n|04/11:03->05/16:02": "0/casablanca,0/el_aaiun",
  	"1|n|03/28:01->10/31:02": "3/canary,3/faeroe,3/madeira,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london,3/faroe,8/belfast",
  	"1|n": "0/algiers,0/bangui,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
  	"14|n": "11/kiritimati",
  	"13|s|04/04:04->09/26:03": "11/apia",
  	"13|s|01/15:02->11/05:03": "11/tongatapu",
  	"13|n": "11/enderbury,11/fakaofo",
  	"12|s|04/04:03->09/26:02": "12/mcmurdo,11/auckland,12/south_pole",
  	"12|s|01/17:03->11/14:02": "11/fiji",
  	"12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
  	"12.75|s|04/04:03->09/26:02": "11/chatham",
  	"11|s|04/04:03->10/03:02": "12/macquarie",
  	"11|s": "11/bougainville",
  	"11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/ponape,11/pohnpei",
  	"11.5|n|04/04:03->10/03:02": "11/norfolk",
  	"10|s|04/04:03->10/03:02": "4/currie,4/hobart,4/melbourne,4/sydney,4/act,4/canberra,4/nsw,4/tasmania,4/victoria",
  	"10|s": "12/dumontdurville,4/brisbane,4/lindeman,11/port_moresby,4/queensland",
  	"10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/guam,11/saipan,11/truk,11/chuuk,11/yap",
  	"10.5|s|04/04:01->10/03:02": "4/lord_howe,4/lhi",
  	"0|n|03/28:00->10/31:01": "1/scoresbysund,3/azores",
  	"0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/utc,0/timbuktu,13/gmt-0,13/gmt+0,13/gmt0,13/greenwich,13/uct,13/universal,13/zulu",
  	"-9|n|03/14:02->11/07:02": "1/adak,1/atka,us/aleutian",
  	"-9|n": "11/gambier",
  	"-9.5|n": "11/marquesas",
  	"-8|n|03/14:02->11/07:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat,us/alaska",
  	"-8|n": "11/pitcairn",
  	"-7|n|03/14:02->11/07:02": "1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/ensenada,6/pacific,10/bajanorte,us/pacific-new,us/pacific",
  	"-7|n|03/08:02->11/01:01": "1/dawson,1/whitehorse,6/yukon",
  	"-7|n": "1/creston,1/dawson_creek,1/fort_nelson,1/hermosillo,1/phoenix,us/arizona",
  	"-6|s|04/03:22->09/04:22": "11/easter,7/easterisland",
  	"-6|n|04/04:02->10/31:02": "1/chihuahua,1/mazatlan,10/bajasur",
  	"-6|n|03/14:02->11/07:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/yellowknife,1/shiprock,6/mountain,us/mountain",
  	"-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,11/galapagos,6/east-saskatchewan,6/saskatchewan",
  	"-5|s": "1/lima,1/rio_branco,1/porto_acre,5/acre",
  	"-5|n|04/04:02->10/31:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
  	"-5|n|03/14:02->11/07:02": "1/chicago,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,1/indiana/knox,1/indiana/tell_city,1/north_dakota/beulah,1/north_dakota/center,1/north_dakota/new_salem,1/knox_in,6/central,us/central,us/indiana-starke",
  	"-5|n|03/12:03->11/05:01": "1/north_dakota",
  	"-5|n": "1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/atikokan",
  	"-4|s|05/13:23->08/13:01": "12/palmer",
  	"-4|s|04/03:24->09/05:00": "1/santiago,7/continental",
  	"-4|s|03/27:24->10/03:00": "1/asuncion",
  	"-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
  	"-4|s": "1/la_paz,1/manaus,5/west",
  	"-4|n|03/14:02->11/07:02": "1/detroit,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,1/indiana/marengo,1/indiana/petersburg,1/indiana/vevay,1/indiana/vincennes,1/indiana/winamac,1/kentucky/monticello,1/fort_wayne,1/indiana/indianapolis,1/kentucky/louisville,6/eastern,us/east-indiana,us/eastern,us/michigan",
  	"-4|n|03/14:00->11/07:01": "1/havana",
  	"-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
  	"-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
  	"-3|s": "1/argentina,1/buenos_aires,1/catamarca,1/cordoba,1/fortaleza,1/jujuy,1/mendoza,1/montevideo,1/punta_arenas,1/sao_paulo,12/rothera,3/stanley,1/argentina/la_rioja,1/argentina/rio_gallegos,1/argentina/salta,1/argentina/san_juan,1/argentina/san_luis,1/argentina/tucuman,1/argentina/ushuaia,1/argentina/buenos_aires,1/argentina/catamarca,1/argentina/comodrivadavia,1/argentina/cordoba,1/argentina/jujuy,1/argentina/mendoza,1/rosario,5/east",
  	"-3|n|03/14:02->11/07:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
  	"-3|n": "1/araguaina,1/bahia,1/belem,1/cayenne,1/maceio,1/paramaribo,1/recife,1/santarem",
  	"-2|n|03/27:22->10/30:23": "1/godthab,1/nuuk",
  	"-2|n|03/14:02->11/07:02": "1/miquelon",
  	"-2|n": "1/noronha,3/south_georgia,5/denoronha",
  	"-2.5|n|03/14:02->11/07:02": "1/st_johns,6/newfoundland",
  	"-1|n": "3/cape_verde",
  	"-11|n": "11/midway,11/niue,11/pago_pago,11/samoa,us/samoa",
  	"-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti,us/hawaii"
  };

  var _build$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _build
  });

  //prefixes for iana names..
  var _prefixes = ['africa', 'america', 'asia', 'atlantic', 'australia', 'brazil', 'canada', 'chile', 'europe', 'indian', 'mexico', 'pacific', 'antarctica', 'etc'];

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var data = getCjsExportFromNamespace(_build$1);

  var prefixes = _prefixes;

  let all = {};
  Object.keys(data).forEach(k => {
    let split = k.split('|');
    let obj = {
      offset: Number(split[0]),
      hem: split[1]
    };

    if (split[2]) {
      obj.dst = split[2];
    }

    let names = data[k].split(',');
    names.forEach(str => {
      str = str.replace(/(^[0-9]+)\//, (before, num) => {
        num = Number(num);
        return prefixes[num] + '/';
      });
      all[str] = obj;
    });
  });
  all['utc'] = {
    offset: 0,
    hem: 'n' //default to northern hemisphere - (sorry!)

  }; //add etc/gmt+n

  for (let i = -14; i <= 14; i += 0.5) {
    let num = i;

    if (num > 0) {
      num = '+' + num;
    }

    let name = 'etc/gmt' + num;
    all[name] = {
      offset: i * -1,
      //they're negative!
      hem: 'n' //(sorry)

    };
    name = 'utc/gmt' + num; //this one too, why not.

    all[name] = {
      offset: i * -1,
      hem: 'n'
    };
  }

  var unpack = all;

  //find the implicit iana code for this machine.
  //safely query the Intl object
  //based on - https://bitbucket.org/pellepim/jstimezonedetect/src
  const fallbackTZ = 'utc'; //
  //this Intl object is not supported often, yet

  const safeIntl = () => {
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
      return null;
    }

    let format = Intl.DateTimeFormat();

    if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
      return null;
    }

    let timezone = format.resolvedOptions().timeZone;

    if (!timezone) {
      return null;
    }

    return timezone.toLowerCase();
  };

  const guessTz$1 = () => {
    let timezone = safeIntl();

    if (timezone === null) {
      return fallbackTZ;
    }

    return timezone;
  }; //do it once per computer


  var guessTz_1 = guessTz$1;

  const isOffset = /(\-?[0-9]+)h(rs)?/i;
  const isNumber = /(\-?[0-9]+)/;
  const utcOffset = /utc([\-+]?[0-9]+)/i;
  const gmtOffset = /gmt([\-+]?[0-9]+)/i;

  const toIana = function (num) {
    num = Number(num);

    if (num >= -13 && num <= 13) {
      num = num * -1; //it's opposite!

      num = (num > 0 ? '+' : '') + num; //add plus sign

      return 'etc/gmt' + num;
    }

    return null;
  };

  const parseOffset$3 = function (tz) {
    // '+5hrs'
    let m = tz.match(isOffset);

    if (m !== null) {
      return toIana(m[1]);
    } // 'utc+5'


    m = tz.match(utcOffset);

    if (m !== null) {
      return toIana(m[1]);
    } // 'GMT-5' (not opposite)


    m = tz.match(gmtOffset);

    if (m !== null) {
      let num = Number(m[1]) * -1;
      return toIana(num);
    } // '+5'


    m = tz.match(isNumber);

    if (m !== null) {
      return toIana(m[1]);
    }

    return null;
  };

  var parseOffset_1$1 = parseOffset$3;

  var require$$0$4 = unpack;

  var guessTz = guessTz_1;

  var parseOffset$2 = parseOffset_1$1;

  const local = guessTz(); //add all the city names by themselves

  const cities = Object.keys(require$$0$4).reduce((h, k) => {
    let city = k.split('/')[1] || '';
    city = city.replace(/_/g, ' ');
    h[city] = k;
    return h;
  }, {}); //try to match these against iana form

  const normalize$2 = tz => {
    tz = tz.replace(/ time/g, '');
    tz = tz.replace(/ (standard|daylight|summer)/g, '');
    tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
    tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
    tz = tz.replace(/\beuropean/g, 'europe');
    tz = tz.replace(/\islands/g, 'island');
    return tz;
  }; // try our best to reconcile the timzone to this given string


  const lookupTz = (str, zones) => {
    if (!str) {
      return local;
    }

    if (typeof str !== 'string') {
      console.error("Timezone must be a string - recieved: '", str, "'\n");
    }

    let tz = str.trim(); // let split = str.split('/')
    //support long timezones like 'America/Argentina/Rio_Gallegos'
    // if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
    //   tz = split[0] + '/' + split[1]
    // }

    tz = tz.toLowerCase();

    if (zones.hasOwnProperty(tz) === true) {
      return tz;
    } //lookup more loosely..


    tz = normalize$2(tz);

    if (zones.hasOwnProperty(tz) === true) {
      return tz;
    } //try city-names


    if (cities.hasOwnProperty(tz) === true) {
      return cities[tz];
    } // //try to parse '-5h'


    if (/[0-9]/.test(tz) === true) {
      let id = parseOffset$2(tz);

      if (id) {
        return id;
      }
    }

    throw new Error("Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id.");
  };

  var find = lookupTz;

  var fns$1 = createCommonjsModule(function (module, exports) {
    //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
    exports.isLeapYear = year => year % 4 === 0 && year % 100 !== 0 || year % 400 === 0; // unsurprisingly-nasty `typeof date` call


    exports.isDate = d => Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());

    exports.isArray = input => Object.prototype.toString.call(input) === '[object Array]';

    exports.isObject = input => Object.prototype.toString.call(input) === '[object Object]';

    exports.isBoolean = input => Object.prototype.toString.call(input) === '[object Boolean]';

    exports.zeroPad = (str, len = 2) => {
      let pad = '0';
      str = str + '';
      return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
    };

    exports.titleCase = str => {
      if (!str) {
        return '';
      }

      return str[0].toUpperCase() + str.substr(1);
    };

    exports.ordinal = i => {
      let j = i % 10;
      let k = i % 100;

      if (j === 1 && k !== 11) {
        return i + 'st';
      }

      if (j === 2 && k !== 12) {
        return i + 'nd';
      }

      if (j === 3 && k !== 13) {
        return i + 'rd';
      }

      return i + 'th';
    }; //strip 'st' off '1st'..


    exports.toCardinal = str => {
      str = String(str);
      str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
      return parseInt(str, 10);
    }; //used mostly for cleanup of unit names, like 'months'


    exports.normalize = (str = '') => {
      str = str.toLowerCase().trim();
      str = str.replace(/ies$/, 'y'); //'centuries'

      str = str.replace(/s$/, '');
      str = str.replace(/-/g, '');

      if (str === 'day' || str === 'days') {
        return 'date';
      }

      if (str === 'min' || str === 'mins') {
        return 'minute';
      }

      return str;
    };

    exports.getEpoch = tmp => {
      //support epoch
      if (typeof tmp === 'number') {
        return tmp;
      } //suport date objects


      if (exports.isDate(tmp)) {
        return tmp.getTime();
      }

      if (tmp.epoch) {
        return tmp.epoch;
      }

      return null;
    }; //make sure this input is a spacetime obj


    exports.beADate = (d, s) => {
      if (exports.isObject(d) === false) {
        return s.clone().set(d);
      }

      return d;
    };

    exports.formatTimezone = (offset, delimiter = '') => {
      const sign = offset > 0 ? '+' : '-';
      const absOffset = Math.abs(offset);
      const hours = exports.zeroPad(parseInt('' + absOffset, 10));
      const minutes = exports.zeroPad(absOffset % 1 * 60);
      return `${sign}${hours}${delimiter}${minutes}`;
    };
  });
  fns$1.isLeapYear;
  fns$1.isDate;
  fns$1.isArray;
  fns$1.isObject;
  fns$1.isBoolean;
  fns$1.zeroPad;
  fns$1.titleCase;
  fns$1.ordinal;
  fns$1.toCardinal;
  fns$1.normalize;
  fns$1.getEpoch;
  fns$1.beADate;
  fns$1.formatTimezone;

  const defaults$1 = {
    year: new Date().getFullYear(),
    month: 0,
    date: 1
  }; //support [2016, 03, 01] format

  const parseArray$1 = (s, arr, today) => {
    if (arr.length === 0) {
      return s;
    }

    let order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

    for (let i = 0; i < order.length; i++) {
      let num = arr[i] || today[order[i]] || defaults$1[order[i]] || 0;
      s = s[order[i]](num);
    }

    return s;
  }; //support {year:2016, month:3} format


  const parseObject$1 = (s, obj, today) => {
    // if obj is empty, do nothing
    if (Object.keys(obj).length === 0) {
      return s;
    }

    obj = Object.assign({}, defaults$1, today, obj);
    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      let unit = keys[i]; //make sure we have this method

      if (s[unit] === undefined || typeof s[unit] !== 'function') {
        continue;
      } //make sure the value is a number


      if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
        continue;
      }

      let num = obj[unit] || today[unit] || defaults$1[unit] || 0;
      s = s[unit](num);
    }

    return s;
  }; // this may seem like an arbitrary number, but it's 'within jan 1970'
  // this is only really ambiguous until 2054 or so


  const parseNumber$1 = function (s, input) {
    const minimumEpoch = 2500000000; // if the given epoch is really small, they've probably given seconds and not milliseconds
    // anything below this number is likely (but not necessarily) a mistaken input.

    if (input > 0 && input < minimumEpoch && s.silent === false) {
      console.warn('  - Warning: You are setting the date to January 1970.');
      console.warn('       -   did input seconds instead of milliseconds?');
    }

    s.epoch = input;
    return s;
  };

  var helpers = {
    parseArray: parseArray$1,
    parseObject: parseObject$1,
    parseNumber: parseNumber$1
  };

  // pull in 'today' data for the baseline moment
  const getNow = function (s) {
    s.epoch = Date.now();
    Object.keys(s._today || {}).forEach(k => {
      if (typeof s[k] === 'function') {
        s = s[k](s._today[k]);
      }
    });
    return s;
  };

  const dates = {
    now: s => {
      return getNow(s);
    },
    today: s => {
      return getNow(s);
    },
    tonight: s => {
      s = getNow(s);
      s = s.hour(18); //6pm

      return s;
    },
    tomorrow: s => {
      s = getNow(s);
      s = s.add(1, 'day');
      s = s.startOf('day');
      return s;
    },
    yesterday: s => {
      s = getNow(s);
      s = s.subtract(1, 'day');
      s = s.startOf('day');
      return s;
    },
    christmas: s => {
      let year = getNow(s).year();
      s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25

      return s;
    },
    'new years': s => {
      let year = getNow(s).year();
      s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31

      return s;
    }
  };
  dates['new years eve'] = dates['new years'];
  var namedDates$1 = dates;

  //little cleanup..
  const normalize$1 = function (str) {
    // remove all day-names
    str = str.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, ''); //remove ordinal ending

    str = str.replace(/([0-9])(th|rd|st|nd)/, '$1');
    str = str.replace(/,/g, '');
    str = str.replace(/ +/g, ' ').trim();
    return str;
  };

  var normalize_1 = normalize$1;

  let o = {
    millisecond: 1
  };
  o.second = 1000;
  o.minute = 60000;
  o.hour = 3.6e6; // dst is supported post-hoc

  o.day = 8.64e7; //

  o.date = o.day;
  o.month = 8.64e7 * 29.5; //(average)

  o.week = 6.048e8;
  o.year = 3.154e10; // leap-years are supported post-hoc
  //add plurals

  Object.keys(o).forEach(k => {
    o[k + 's'] = o[k];
  });
  var milliseconds = o;

  var ms = milliseconds;

  const walk = (s, n, fn, unit, previous) => {
    let current = s.d[fn]();

    if (current === n) {
      return; //already there
    }

    let startUnit = previous === null ? null : s.d[previous]();
    let original = s.epoch; //try to get it as close as we can

    let diff = n - current;
    s.epoch += ms[unit] * diff; //DST edge-case: if we are going many days, be a little conservative
    // console.log(unit, diff)

    if (unit === 'day') {
      // s.epoch -= ms.minute
      //but don't push it over a month
      if (Math.abs(diff) > 28 && n < 28) {
        s.epoch += ms.hour;
      }
    } // 1st time: oops, did we change previous unit? revert it.


    if (previous !== null && startUnit !== s.d[previous]()) {
      // console.warn('spacetime warning: missed setting ' + unit)
      s.epoch = original; // s.epoch += ms[unit] * diff * 0.89 // maybe try and make it close...?
    } //repair it if we've gone too far or something
    //(go by half-steps, just in case)


    const halfStep = ms[unit] / 2;

    while (s.d[fn]() < n) {
      s.epoch += halfStep;
    }

    while (s.d[fn]() > n) {
      s.epoch -= halfStep;
    } // 2nd time: did we change previous unit? revert it.


    if (previous !== null && startUnit !== s.d[previous]()) {
      // console.warn('spacetime warning: missed setting ' + unit)
      s.epoch = original;
    }
  }; //find the desired date by a increment/check while loop


  const units$3 = {
    year: {
      valid: n => n > -4000 && n < 4000,
      walkTo: (s, n) => walk(s, n, 'getFullYear', 'year', null)
    },
    month: {
      valid: n => n >= 0 && n <= 11,
      walkTo: (s, n) => {
        let d = s.d;
        let current = d.getMonth();
        let original = s.epoch;
        let startUnit = d.getFullYear();

        if (current === n) {
          return;
        } //try to get it as close as we can..


        let diff = n - current;
        s.epoch += ms.day * (diff * 28); //special case
        //oops, did we change the year? revert it.

        if (startUnit !== s.d.getFullYear()) {
          s.epoch = original;
        } //increment by day


        while (s.d.getMonth() < n) {
          s.epoch += ms.day;
        }

        while (s.d.getMonth() > n) {
          s.epoch -= ms.day;
        }
      }
    },
    date: {
      valid: n => n > 0 && n <= 31,
      walkTo: (s, n) => walk(s, n, 'getDate', 'day', 'getMonth')
    },
    hour: {
      valid: n => n >= 0 && n < 24,
      walkTo: (s, n) => walk(s, n, 'getHours', 'hour', 'getDate')
    },
    minute: {
      valid: n => n >= 0 && n < 60,
      walkTo: (s, n) => walk(s, n, 'getMinutes', 'minute', 'getHours')
    },
    second: {
      valid: n => n >= 0 && n < 60,
      walkTo: (s, n) => {
        //do this one directly
        s.epoch = s.seconds(n).epoch;
      }
    },
    millisecond: {
      valid: n => n >= 0 && n < 1000,
      walkTo: (s, n) => {
        //do this one directly
        s.epoch = s.milliseconds(n).epoch;
      }
    }
  };

  const walkTo$1 = (s, wants) => {
    let keys = Object.keys(units$3);
    let old = s.clone();

    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let n = wants[k];

      if (n === undefined) {
        n = old[k]();
      }

      if (typeof n === 'string') {
        n = parseInt(n, 10);
      } //make-sure it's valid


      if (!units$3[k].valid(n)) {
        s.epoch = null;

        if (s.silent === false) {
          console.warn('invalid ' + k + ': ' + n);
        }

        return;
      }

      units$3[k].walkTo(s, n);
    }

    return;
  };

  var walk_1 = walkTo$1;

  const monthLengths = [31, // January - 31 days
  28, // February - 28 days in a common year and 29 days in leap years
  31, // March - 31 days
  30, // April - 30 days
  31, // May - 31 days
  30, // June - 30 days
  31, // July - 31 days
  31, // August - 31 days
  30, // September - 30 days
  31, // October - 31 days
  30, // November - 30 days
  31 // December - 31 days
  ];
  var monthLengths_1 = monthLengths; // 28 - feb

  let shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
  let longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  function buildMapping() {
    const obj = {
      sep: 8 //support this format

    };

    for (let i = 0; i < shortMonths.length; i++) {
      obj[shortMonths[i]] = i;
    }

    for (let i = 0; i < longMonths.length; i++) {
      obj[longMonths[i]] = i;
    }

    return obj;
  }

  var months$2 = {
    short: () => shortMonths,
    long: () => longMonths,
    mapping: () => buildMapping(),
    set: i18n => {
      shortMonths = i18n.short || shortMonths;
      longMonths = i18n.long || longMonths;
    }
  };

  //pull-apart ISO offsets, like "+0100"
  const parseOffset$1 = (s, offset) => {
    if (!offset) {
      return s;
    } //this is a fancy-move


    if (offset === 'Z' || offset === 'z') {
      offset = '+0000';
    } // according to ISO8601, tz could be hh:mm, hhmm or hh
    // so need few more steps before the calculation.


    let num = 0; // for (+-)hh:mm

    if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
      //support "+01:00"
      if (/:00/.test(offset) === true) {
        offset = offset.replace(/:00/, '');
      } //support "+01:30"


      if (/:30/.test(offset) === true) {
        offset = offset.replace(/:30/, '.5');
      }
    } // for (+-)hhmm


    if (/^[\+-]?[0-9]{4}$/.test(offset)) {
      offset = offset.replace(/30$/, '.5');
    }

    num = parseFloat(offset); //divide by 100 or 10 - , "+0100", "+01"

    if (Math.abs(num) > 100) {
      num = num / 100;
    } //okay, try to match it to a utc timezone
    //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
    //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem


    num *= -1;

    if (num >= 0) {
      num = '+' + num;
    }

    let tz = 'etc/gmt' + num;
    let zones = s.timezones;

    if (zones[tz]) {
      // log a warning if we're over-writing a given timezone?
      // console.log('changing timezone to: ' + tz)
      s.tz = tz;
    }

    return s;
  };

  var parseOffset_1 = parseOffset$1;

  const parseTime$4 = (s, str = '') => {
    // remove all whitespace
    str = str.replace(/^\s+/, '').toLowerCase(); //formal time format - 04:30.23

    let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

    if (arr !== null) {
      //validate it a little
      let h = Number(arr[1]);

      if (h < 0 || h > 24) {
        return s.startOf('day');
      }

      let m = Number(arr[2]); //don't accept '5:3pm'

      if (arr[2].length < 2 || m < 0 || m > 59) {
        return s.startOf('day');
      }

      if (arr[4] > 999) {
        // fix overflow issue with milliseconds, if input is longer than standard (e.g. 2017-08-06T09:00:00.123456Z)
        arr[4] = parseInt(`${arr[4]}`.substring(0, 3), 10);
      }

      s = s.hour(h);
      s = s.minute(m);
      s = s.seconds(arr[3] || 0);
      s = s.millisecond(arr[4] || 0); //parse-out am/pm

      let ampm = str.match(/[\b0-9] ?(am|pm)\b/);

      if (ampm !== null && ampm[1]) {
        s = s.ampm(ampm[1]);
      }

      return s;
    } //try an informal form - 5pm (no minutes)


    arr = str.match(/([0-9]+) ?(am|pm)/);

    if (arr !== null && arr[1]) {
      let h = Number(arr[1]); //validate it a little..

      if (h > 12 || h < 1) {
        return s.startOf('day');
      }

      s = s.hour(arr[1] || 0);
      s = s.ampm(arr[2]);
      s = s.startOf('hour');
      return s;
    } //no time info found, use start-of-day


    s = s.startOf('day');
    return s;
  };

  var parseTime_1 = parseTime$4;

  var monthLength = monthLengths_1;

  var fns = fns$1;

  var months$1 = months$2;

  var require$$2$3 = parseOffset_1;

  var require$$3$2 = parseTime_1;

  const isLeapYear$2 = fns.isLeapYear;
  const months = months$1.mapping(); //given a month, return whether day number exists in it

  const validate$5 = obj => {
    //invalid values
    if (monthLength.hasOwnProperty(obj.month) !== true) {
      return false;
    } //support leap-year in february


    if (obj.month === 1) {
      if (isLeapYear$2(obj.year) && obj.date <= 29) {
        return true;
      } else {
        return obj.date <= 28;
      }
    } //is this date too-big for this month?


    let max = monthLength[obj.month] || 0;

    if (obj.date <= max) {
      return true;
    }

    return false;
  };

  const parseYear$4 = (str = '', today) => {
    str = str.trim(); // parse '86 shorthand

    if (/^'[0-9][0-9]$/.test(str) === true) {
      let num = Number(str.replace(/'/, ''));

      if (num > 50) {
        return 1900 + num;
      }

      return 2000 + num;
    }

    let year = parseInt(str, 10); // use a given year from options.today

    if (!year && today) {
      year = today.year;
    } // fallback to this year


    year = year || new Date().getFullYear();
    return year;
  };

  const parseMonth$4 = function (str) {
    str = str.toLowerCase().trim();
    return months[str];
  };

  const parsers$1 = {
    parseOffset: require$$2$3,
    parseTime: require$$3$2,
    parseYear: parseYear$4,
    parseMonth: parseMonth$4,
    validate: validate$5
  };
  var _parsers = parsers$1;

  var walkTo = walk_1;

  var require$$0$3 = _parsers;

  const {
    validate: validate$4,
    parseTime: parseTime$3,
    parseYear: parseYear$3,
    parseMonth: parseMonth$3,
    parseOffset
  } = require$$0$3;
  var _01Ymd = [// =====
  //  y-m-d
  // =====
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/i,
    parse: (s, m) => {
      let obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: m[3]
      };

      if (validate$4(obj) === false) {
        s.epoch = null;
        return s;
      }

      parseOffset(s, m[5]);
      walkTo(s, obj);
      s = parseTime$3(s, m[4]);
      return s;
    }
  }, //short-iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
  {
    reg: /^([0-9]{4})[\-\/\. ]([0-9]{1,2})[\-\/\. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      let obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: parseInt(m[3], 10)
      };

      if (obj.month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        obj.date = parseInt(m[2], 10);
        obj.month = parseInt(m[3], 10) - 1;
      }

      if (validate$4(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime$3(s, m[4]);
      return s;
    }
  }, //text-month "2015-feb-25"
  {
    reg: /^([0-9]{4})[\-\/\. ]([a-z]+)[\-\/\. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      let obj = {
        year: parseYear$3(m[1], s._today),
        month: parseMonth$3(m[2]),
        date: fns.toCardinal(m[3] || '')
      };

      if (validate$4(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime$3(s, m[4]);
      return s;
    }
  }];

  const {
    validate: validate$3,
    parseTime: parseTime$2,
    parseYear: parseYear$2,
    parseMonth: parseMonth$2
  } = require$$0$3;
  var _02Mdy = [// =====
  //  m-d-y
  // =====
  //mm/dd/yyyy - uk/canada "6/28/2019, 12:26:14 PM"
  {
    reg: /^([0-9]{1,2})[\-\/.]([0-9]{1,2})[\-\/.]?([0-9]{4})?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1;
      let date = parseInt(arr[2], 10); //support dd/mm/yyy

      if (s.british || month >= 12) {
        date = parseInt(arr[1], 10);
        month = parseInt(arr[2], 10) - 1;
      }

      let obj = {
        date,
        month,
        year: parseYear$2(arr[3], s._today) || new Date().getFullYear()
      };

      if (validate$3(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime$2(s, arr[4]);
      return s;
    }
  }, //alt short format - "feb-25-2015"
  {
    reg: /^([a-z]+)[\-\/\. ]([0-9]{1,2})[\-\/\. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear$2(arr[3], s._today),
        month: parseMonth$2(arr[1]),
        date: fns.toCardinal(arr[2] || '')
      };

      if (validate$3(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime$2(s, arr[4]);
      return s;
    }
  }, //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear$2(arr[3], s._today),
        month: parseMonth$2(arr[1]),
        date: fns.toCardinal(arr[2] || '')
      };

      if (validate$3(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime$2(s, arr[4]);
      return s;
    }
  }, // 'Sun Mar 14 15:09:48 +0000 2021'
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9:]+)?( \+[0-9]{4})?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear$2(arr[5], s._today),
        month: parseMonth$2(arr[1]),
        date: fns.toCardinal(arr[2] || '')
      };

      if (validate$3(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime$2(s, arr[3]);
      return s;
    }
  }];

  const {
    validate: validate$2,
    parseTime: parseTime$1,
    parseYear: parseYear$1,
    parseMonth: parseMonth$1
  } = require$$0$3;
  var _03Dmy = [// =====
  //  d-m-y
  // =====
  //common british format - "25-feb-2015"
  {
    reg: /^([0-9]{1,2})[\-\/]([a-z]+)[\-\/]?([0-9]{4})?$/i,
    parse: (s, m) => {
      let obj = {
        year: parseYear$1(m[3], s._today),
        month: parseMonth$1(m[2]),
        date: fns.toCardinal(m[1] || '')
      };

      if (validate$2(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime$1(s, m[4]);
      return s;
    }
  }, // "25 Mar 2015"
  {
    reg: /^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: (s, m) => {
      let obj = {
        year: parseYear$1(m[3], s._today),
        month: parseMonth$1(m[2]),
        date: fns.toCardinal(m[1])
      };

      if (!obj.month || validate$2(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime$1(s, m[4]);
      return s;
    }
  }, // 01-jan-2020
  {
    reg: /^([0-9]{1,2})[\. -/]([a-z]+)[\. -/]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      let obj = {
        date: Number(m[1]),
        month: parseMonth$1(m[2]),
        year: Number(m[3])
      };

      if (validate$2(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = s.startOf('day');
      s = parseTime$1(s, m[4]);
      return s;
    }
  }];

  const {
    validate: validate$1,
    parseTime,
    parseYear,
    parseMonth
  } = require$$0$3;
  var _04Misc = [// =====
  // no dates
  // =====
  // '2012-06' month-only
  {
    reg: /^([0-9]{4})[\-\/]([0-9]{2})$/i,
    parse: (s, m) => {
      let obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: 1
      };

      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime(s, m[4]);
      return s;
    }
  }, //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      let obj = {
        year: parseYear(arr[2], s._today),
        month: parseMonth(arr[1]),
        date: s._today.date || 1
      };

      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime(s, arr[4]);
      return s;
    }
  }, {
    // 'q2 2002'
    reg: /^(q[0-9])( of)?( [0-9]{4})?/i,
    parse: (s, arr) => {
      let quarter = arr[1] || '';
      s = s.quarter(quarter);
      let year = arr[3] || '';

      if (year) {
        year = year.trim();
        s = s.year(year);
      }

      return s;
    }
  }, {
    // 'summer 2002'
    reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,
    parse: (s, arr) => {
      let season = arr[1] || '';
      s = s.season(season);
      let year = arr[3] || '';

      if (year) {
        year = year.trim();
        s = s.year(year);
      }

      return s;
    }
  }, {
    // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (s, arr) => {
      let str = arr[0] || ''; //make year-negative

      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1');
      let d = new Date();
      let obj = {
        year: parseInt(str.trim(), 10),
        month: d.getMonth(),
        date: d.getDate()
      };

      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime(s);
      return s;
    }
  }, {
    // '200ad'
    reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
    parse: (s, arr) => {
      let str = arr[0] || ''; //remove commas

      str = str.replace(/,/g, '');
      let d = new Date();
      let obj = {
        year: parseInt(str.trim(), 10),
        month: d.getMonth(),
        date: d.getDate()
      };

      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime(s);
      return s;
    }
  }, {
    // '1992'
    reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
    parse: (s, arr) => {
      let today = s._today; // using today's date, but a new month is awkward.

      if (today.month && !today.date) {
        today.date = 1;
      }

      let d = new Date();
      let obj = {
        year: parseYear(arr[0], today),
        month: today.month || d.getMonth(),
        date: today.date || d.getDate()
      };

      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walkTo(s, obj);
      s = parseTime(s);
      return s;
    }
  }];

  var require$$0$2 = _01Ymd;

  var require$$1$2 = _02Mdy;

  var require$$2$2 = _03Dmy;

  var require$$3$1 = _04Misc;

  var formats = [].concat(require$$0$2, require$$1$2, require$$2$2, require$$3$1);

  var parsers = formats;

  const parseString$1 = function (s, input, givenTz) {
    // let parsers = s.parsers || []
    //try each text-parse template, use the first good result
    for (let i = 0; i < parsers.length; i++) {
      let m = input.match(parsers[i].reg);

      if (m) {
        // console.log(parsers[i].reg)
        let res = parsers[i].parse(s, m, givenTz);

        if (res !== null && res.isValid()) {
          return res;
        }
      }
    }

    if (s.silent === false) {
      console.warn("Warning: couldn't parse date-string: '" + input + "'");
    }

    s.epoch = null;
    return s;
  };

  var parse = parseString$1;

  var require$$0$1 = helpers;

  var namedDates = namedDates$1;

  var normalize = normalize_1;

  var parseString = parse;

  const {
    parseArray,
    parseObject,
    parseNumber
  } = require$$0$1; //we have to actually parse these inputs ourselves
  //  -  can't use built-in js parser ;(
  //=========================================
  // ISO Date	  "2015-03-25"
  // Short Date	"03/25/2015" or "2015/03/25"
  // Long Date	"Mar 25 2015" or "25 Mar 2015"
  // Full Date	"Wednesday March 25 2015"
  //=========================================

  const defaults = {
    year: new Date().getFullYear(),
    month: 0,
    date: 1
  }; //find the epoch from different input styles

  const parseInput = (s, input) => {
    let today = s._today || defaults; //if we've been given a epoch number, it's easy

    if (typeof input === 'number') {
      return parseNumber(s, input);
    } //set tmp time


    s.epoch = Date.now(); // overwrite tmp time with 'today' value, if exists

    if (s._today && fns.isObject(s._today) && Object.keys(s._today).length > 0) {
      let res = parseObject(s, today, defaults);

      if (res.isValid()) {
        s.epoch = res.epoch;
      }
    } // null input means 'now'


    if (input === null || input === undefined || input === '') {
      return s; //k, we're good.
    } //support input of Date() object


    if (fns.isDate(input) === true) {
      s.epoch = input.getTime();
      return s;
    } //support [2016, 03, 01] format


    if (fns.isArray(input) === true) {
      s = parseArray(s, input, today);
      return s;
    } //support {year:2016, month:3} format


    if (fns.isObject(input) === true) {
      //support spacetime object as input
      if (input.epoch) {
        s.epoch = input.epoch;
        s.tz = input.tz;
        return s;
      }

      s = parseObject(s, input, today);
      return s;
    } //input as a string..


    if (typeof input !== 'string') {
      return s;
    } //little cleanup..


    input = normalize(input); //try some known-words, like 'now'

    if (namedDates.hasOwnProperty(input) === true) {
      s = namedDates[input](s);
      return s;
    } //try each text-parse template, use the first good result


    return parseString(s, input);
  };

  var input = parseInput;

  let shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  let longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var days$1 = {
    short: () => shortDays,
    long: () => longDays,
    set: i18n => {
      shortDays = i18n.short || shortDays;
      longDays = i18n.long || longDays;
    },
    aliases: {
      mo: 1,
      tu: 2,
      we: 3,
      th: 4,
      fr: 5,
      sa: 6,
      su: 7,
      tues: 2,
      weds: 3,
      wedn: 3,
      thur: 4,
      thurs: 4
    }
  };

  let titleCaseEnabled = true;
  var caseFormat$1 = {
    useTitleCase: () => titleCaseEnabled,
    set: useTitleCase => {
      titleCaseEnabled = useTitleCase;
    }
  };

  // it's kind of nuts how involved this is
  // "+01:00", "+0100", or simply "+01"

  const isoOffset$1 = s => {
    let offset = s.timezone().current.offset;
    return !offset ? 'Z' : fns.formatTimezone(offset, ':');
  };

  var _offset = isoOffset$1;

  var days = days$1;

  var caseFormat = caseFormat$1;

  var isoOffset = _offset;

  const applyCaseFormat = str => {
    if (caseFormat.useTitleCase()) {
      return fns.titleCase(str);
    }

    return str;
  }; // iso-year padding


  const padYear = num => {
    if (num >= 0) {
      return fns.zeroPad(num, 4);
    } else {
      num = Math.abs(num);
      return '-' + fns.zeroPad(num, 4);
    }
  };

  const format$1 = {
    day: s => applyCaseFormat(s.dayName()),
    'day-short': s => applyCaseFormat(days.short()[s.day()]),
    'day-number': s => s.day(),
    'day-ordinal': s => fns.ordinal(s.day()),
    'day-pad': s => fns.zeroPad(s.day()),
    date: s => s.date(),
    'date-ordinal': s => fns.ordinal(s.date()),
    'date-pad': s => fns.zeroPad(s.date()),
    month: s => applyCaseFormat(s.monthName()),
    'month-short': s => applyCaseFormat(months$1.short()[s.month()]),
    'month-number': s => s.month(),
    'month-ordinal': s => fns.ordinal(s.month()),
    'month-pad': s => fns.zeroPad(s.month()),
    'iso-month': s => fns.zeroPad(s.month() + 1),
    //1-based months
    year: s => {
      let year = s.year();

      if (year > 0) {
        return year;
      }

      year = Math.abs(year);
      return year + ' BC';
    },
    'year-short': s => {
      let year = s.year();

      if (year > 0) {
        return `'${String(s.year()).substr(2, 4)}`;
      }

      year = Math.abs(year);
      return year + ' BC';
    },
    'iso-year': s => {
      let year = s.year();
      let isNegative = year < 0;
      let str = fns.zeroPad(Math.abs(year), 4); //0-padded

      if (isNegative) {
        //negative years are for some reason 6-digits ('-00008')
        str = fns.zeroPad(str, 6);
        str = '-' + str;
      }

      return str;
    },
    time: s => s.time(),
    'time-24': s => `${s.hour24()}:${fns.zeroPad(s.minute())}`,
    hour: s => s.hour12(),
    'hour-pad': s => fns.zeroPad(s.hour12()),
    'hour-24': s => s.hour24(),
    'hour-24-pad': s => fns.zeroPad(s.hour24()),
    minute: s => s.minute(),
    'minute-pad': s => fns.zeroPad(s.minute()),
    second: s => s.second(),
    'second-pad': s => fns.zeroPad(s.second()),
    millisecond: s => s.millisecond(),
    'millisecond-pad': s => fns.zeroPad(s.millisecond(), 3),
    ampm: s => s.ampm(),
    quarter: s => 'Q' + s.quarter(),
    season: s => s.season(),
    era: s => s.era(),
    json: s => s.json(),
    timezone: s => s.timezone().name,
    offset: s => isoOffset(s),
    numeric: s => `${s.year()}/${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`,
    // yyyy/mm/dd
    'numeric-us': s => `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}/${s.year()}`,
    // mm/dd/yyyy
    'numeric-uk': s => `${fns.zeroPad(s.date())}/${fns.zeroPad(s.month() + 1)}/${s.year()}`,
    //dd/mm/yyyy
    'mm/dd': s => `${fns.zeroPad(s.month() + 1)}/${fns.zeroPad(s.date())}`,
    //mm/dd
    // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
    iso: s => {
      let year = s.format('iso-year');
      let month = fns.zeroPad(s.month() + 1); //1-based months

      let date = fns.zeroPad(s.date());
      let hour = fns.zeroPad(s.h24());
      let minute = fns.zeroPad(s.minute());
      let second = fns.zeroPad(s.second());
      let ms = fns.zeroPad(s.millisecond(), 3);
      let offset = isoOffset(s);
      return `${year}-${month}-${date}T${hour}:${minute}:${second}.${ms}${offset}`; //2018-03-09T08:50:00.000-05:00
    },
    'iso-short': s => {
      let month = fns.zeroPad(s.month() + 1); //1-based months

      let date = fns.zeroPad(s.date());
      let year = padYear(s.year());
      return `${year}-${month}-${date}`; //2017-02-15
    },
    'iso-utc': s => {
      return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
    },
    //i made these up
    nice: s => `${months$1.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.time()}`,
    'nice-24': s => `${months$1.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.hour24()}:${fns.zeroPad(s.minute())}`,
    'nice-year': s => `${months$1.short()[s.month()]} ${fns.ordinal(s.date())}, ${s.year()}`,
    'nice-day': s => `${days.short()[s.day()]} ${applyCaseFormat(months$1.short()[s.month()])} ${fns.ordinal(s.date())}`,
    'nice-full': s => `${s.dayName()} ${applyCaseFormat(s.monthName())} ${fns.ordinal(s.date())}, ${s.time()}`,
    'nice-full-24': s => `${s.dayName()} ${applyCaseFormat(s.monthName())} ${fns.ordinal(s.date())}, ${s.hour24()}:${fns.zeroPad(s.minute())}`
  }; //aliases

  const aliases = {
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
  Object.keys(aliases).forEach(k => format$1[k] = format$1[aliases[k]]);

  const printFormat = (s, str = '') => {
    //don't print anything if it's an invalid date
    if (s.isValid() !== true) {
      return '';
    } //support .format('month')


    if (format$1.hasOwnProperty(str)) {
      let out = format$1[str](s) || '';

      if (str !== 'json') {
        out = String(out);

        if (str !== 'ampm') {
          out = applyCaseFormat(out);
        }
      }

      return out;
    } //support '{hour}:{minute}' notation


    if (str.indexOf('{') !== -1) {
      let sections = /\{(.+?)\}/g;
      str = str.replace(sections, (_, fmt) => {
        fmt = fmt.toLowerCase().trim();

        if (format$1.hasOwnProperty(fmt)) {
          let out = String(format$1[fmt](s));

          if (fmt !== 'ampm') {
            return applyCaseFormat(out);
          }

          return out;
        }

        return '';
      });
      return str;
    }

    return s.format('iso-short');
  };

  var format_1 = printFormat;

  const pad = fns.zeroPad;
  const formatTimezone = fns.formatTimezone; //parse this insane unix-time-templating thing, from the 19th century
  //http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
  //time-symbols we support

  const mapping = {
    G: s => s.era(),
    GG: s => s.era(),
    GGG: s => s.era(),
    GGGG: s => s.era() === 'AD' ? 'Anno Domini' : 'Before Christ',
    //year
    y: s => s.year(),
    yy: s => {
      //last two chars
      return parseInt(String(s.year()).substr(2, 4), 10);
    },
    yyy: s => s.year(),
    yyyy: s => s.year(),
    yyyyy: s => '0' + s.year(),
    // u: (s) => {},//extended non-gregorian years
    //quarter
    Q: s => s.quarter(),
    QQ: s => s.quarter(),
    QQQ: s => s.quarter(),
    QQQQ: s => s.quarter(),
    //month
    M: s => s.month() + 1,
    MM: s => pad(s.month() + 1),
    MMM: s => s.format('month-short'),
    MMMM: s => s.format('month'),
    //week
    w: s => s.week(),
    ww: s => pad(s.week()),
    //week of month
    // W: (s) => s.week(),
    //date of month
    d: s => s.date(),
    dd: s => pad(s.date()),
    //date of year
    D: s => s.dayOfYear(),
    DD: s => pad(s.dayOfYear()),
    DDD: s => pad(s.dayOfYear(), 3),
    // F: (s) => {},//date of week in month
    // g: (s) => {},//modified julian day
    //day
    E: s => s.format('day-short'),
    EE: s => s.format('day-short'),
    EEE: s => s.format('day-short'),
    EEEE: s => s.format('day'),
    EEEEE: s => s.format('day')[0],
    e: s => s.day(),
    ee: s => s.day(),
    eee: s => s.format('day-short'),
    eeee: s => s.format('day'),
    eeeee: s => s.format('day')[0],
    //am/pm
    a: s => s.ampm().toUpperCase(),
    aa: s => s.ampm().toUpperCase(),
    aaa: s => s.ampm().toUpperCase(),
    aaaa: s => s.ampm().toUpperCase(),
    //hour
    h: s => s.h12(),
    hh: s => pad(s.h12()),
    H: s => s.hour(),
    HH: s => pad(s.hour()),
    // j: (s) => {},//weird hour format
    m: s => s.minute(),
    mm: s => pad(s.minute()),
    s: s => s.second(),
    ss: s => pad(s.second()),
    //milliseconds
    SSS: s => pad(s.millisecond(), 3),
    //milliseconds in the day
    A: s => s.epoch - s.startOf('day').epoch,
    //timezone
    z: s => s.timezone().name,
    zz: s => s.timezone().name,
    zzz: s => s.timezone().name,
    zzzz: s => s.timezone().name,
    Z: s => formatTimezone(s.timezone().current.offset),
    ZZ: s => formatTimezone(s.timezone().current.offset),
    ZZZ: s => formatTimezone(s.timezone().current.offset),
    ZZZZ: s => formatTimezone(s.timezone().current.offset, ':')
  };

  const addAlias = (char, to, n) => {
    let name = char;
    let toName = to;

    for (let i = 0; i < n; i += 1) {
      mapping[name] = mapping[toName];
      name += char;
      toName += to;
    }
  };

  addAlias('q', 'Q', 4);
  addAlias('L', 'M', 4);
  addAlias('Y', 'y', 4);
  addAlias('c', 'e', 4);
  addAlias('k', 'H', 2);
  addAlias('K', 'h', 2);
  addAlias('S', 's', 2);
  addAlias('v', 'z', 4);
  addAlias('V', 'Z', 4); // support unix-style escaping with ' character

  const escapeChars = function (arr) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === `'`) {
        // greedy-search for next apostrophe
        for (let o = i + 1; o < arr.length; o += 1) {
          if (arr[o]) {
            arr[i] += arr[o];
          }

          if (arr[o] === `'`) {
            arr[o] = null;
            break;
          }

          arr[o] = null;
        }
      }
    }

    return arr.filter(ch => ch);
  }; //combine consecutive chars, like 'yyyy' as one.


  const combineRepeated = function (arr) {
    for (let i = 0; i < arr.length; i += 1) {
      let c = arr[i]; // greedy-forward

      for (let o = i + 1; o < arr.length; o += 1) {
        if (arr[o] === c) {
          arr[i] += arr[o];
          arr[o] = null;
        } else {
          break;
        }
      }
    } // '' means one apostrophe


    arr = arr.filter(ch => ch);
    arr = arr.map(str => {
      if (str === `''`) {
        str = `'`;
      }

      return str;
    });
    return arr;
  };

  const unixFmt$1 = (s, str) => {
    let arr = str.split(''); // support character escaping

    arr = escapeChars(arr); //combine 'yyyy' as string.

    arr = combineRepeated(arr);
    return arr.reduce((txt, c) => {
      if (mapping[c] !== undefined) {
        txt += mapping[c](s) || '';
      } else {
        // 'unescape'
        if (/^'.{1,}'$/.test(c)) {
          c = c.replace(/'/g, '');
        }

        txt += c;
      }

      return txt;
    }, '');
  };

  var unixFmt_1 = unixFmt$1;

  const units$2 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

  const doUnit = function (s, k) {
    let start = s.clone().startOf(k);
    let end = s.clone().endOf(k);
    let duration = end.epoch - start.epoch;
    let percent = (s.epoch - start.epoch) / duration;
    return parseFloat(percent.toFixed(2));
  }; //how far it is along, from 0-1


  const progress$1 = (s, unit) => {
    if (unit) {
      unit = fns.normalize(unit);
      return doUnit(s, unit);
    }

    let obj = {};
    units$2.forEach(k => {
      obj[k] = doUnit(s, k);
    });
    return obj;
  };

  var progress_1 = progress$1;

  const nearest$1 = (s, unit) => {
    //how far have we gone?
    let prog = s.progress();
    unit = fns.normalize(unit); //fix camel-case for this one

    if (unit === 'quarterhour') {
      unit = 'quarterHour';
    }

    if (prog[unit] !== undefined) {
      // go forward one?
      if (prog[unit] > 0.5) {
        s = s.add(1, unit);
      } // go to start


      s = s.startOf(unit);
    } else if (s.silent === false) {
      console.warn("no known unit '" + unit + "'");
    }

    return s;
  };

  var nearest_1 = nearest$1;

  //increment until dates are the same
  const climb = (a, b, unit) => {
    let i = 0;
    a = a.clone();

    while (a.isBefore(b)) {
      //do proper, expensive increment to catch all-the-tricks
      a = a.add(1, unit);
      i += 1;
    } //oops, we went too-far..


    if (a.isAfter(b, unit)) {
      i -= 1;
    }

    return i;
  }; // do a thurough +=1 on the unit, until they match
  // for speed-reasons, only used on day, month, week.


  const diffOne$1 = (a, b, unit) => {
    if (a.isBefore(b)) {
      return climb(a, b, unit);
    } else {
      return climb(b, a, unit) * -1; //reverse it
    }
  };

  var one = diffOne$1;

  var diffOne = one;

  // 2020 - 2019 may be 1 year, or 0 years
  // - '1 year difference' means 366 days during a leap year

  const fastYear = (a, b) => {
    let years = b.year() - a.year(); // should we decrement it by 1?

    a = a.year(b.year());

    if (a.isAfter(b)) {
      years -= 1;
    }

    return years;
  }; // use a waterfall-method for computing a diff of any 'pre-knowable' units
  // compute years, then compute months, etc..
  // ... then ms-math for any very-small units


  const diff$2 = function (a, b) {
    // an hour is always the same # of milliseconds
    // so these units can be 'pre-calculated'
    let msDiff = b.epoch - a.epoch;
    let obj = {
      milliseconds: msDiff,
      seconds: parseInt(msDiff / 1000, 10)
    };
    obj.minutes = parseInt(obj.seconds / 60, 10);
    obj.hours = parseInt(obj.minutes / 60, 10); //do the year

    let tmp = a.clone();
    obj.years = fastYear(tmp, b);
    tmp = a.add(obj.years, 'year'); //there's always 12 months in a year...

    obj.months = obj.years * 12;
    tmp = a.add(obj.months, 'month');
    obj.months += diffOne(tmp, b, 'month'); // there's always atleast 52 weeks in a year..
    // (month * 4) isn't as close

    obj.weeks = obj.years * 52;
    tmp = a.add(obj.weeks, 'week');
    obj.weeks += diffOne(tmp, b, 'week'); // there's always atleast 7 days in a week

    obj.days = obj.weeks * 7;
    tmp = a.add(obj.days, 'day');
    obj.days += diffOne(tmp, b, 'day');
    return obj;
  };

  var waterfall$1 = diff$2;

  var waterfall = waterfall$1;

  const reverseDiff = function (obj) {
    Object.keys(obj).forEach(k => {
      obj[k] *= -1;
    });
    return obj;
  }; // this method counts a total # of each unit, between a, b.
  // '1 month' means 28 days in february
  // '1 year' means 366 days in a leap year


  const main$1 = function (a, b, unit) {
    b = fns.beADate(b, a); //reverse values, if necessary

    let reversed = false;

    if (a.isAfter(b)) {
      let tmp = a;
      a = b;
      b = tmp;
      reversed = true;
    } //compute them all (i know!)


    let obj = waterfall(a, b);

    if (reversed) {
      obj = reverseDiff(obj);
    } //return just the requested unit


    if (unit) {
      //make sure it's plural-form
      unit = fns.normalize(unit);

      if (/s$/.test(unit) !== true) {
        unit += 's';
      }

      if (unit === 'dates') {
        unit = 'days';
      }

      return obj[unit];
    }

    return obj;
  };

  var diff$1 = main$1;

  //our conceptual 'break-points' for each unit

  const qualifiers = {
    months: {
      almost: 10,
      over: 4
    },
    days: {
      almost: 25,
      over: 10
    },
    hours: {
      almost: 20,
      over: 8
    },
    minutes: {
      almost: 50,
      over: 20
    },
    seconds: {
      almost: 50,
      over: 20
    }
  }; //get number of hours/minutes... between the two dates

  function getDiff(a, b) {
    const isBefore = a.isBefore(b);
    const later = isBefore ? b : a;
    let earlier = isBefore ? a : b;
    earlier = earlier.clone();
    const diff = {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    Object.keys(diff).forEach(unit => {
      if (earlier.isSame(later, unit)) {
        return;
      }

      let max = earlier.diff(later, unit);
      earlier = earlier.add(max, unit);
      diff[unit] = max;
    }); //reverse it, if necessary

    if (isBefore) {
      Object.keys(diff).forEach(u => {
        if (diff[u] !== 0) {
          diff[u] *= -1;
        }
      });
    }

    return diff;
  } // Expects a plural unit arg


  function pluralize(value, unit) {
    if (value === 1) {
      unit = unit.slice(0, -1);
    }

    return value + ' ' + unit;
  } //create the human-readable diff between the two dates


  const since$1 = (start, end) => {
    end = fns.beADate(end, start);
    const diff = getDiff(start, end);
    const isNow = Object.keys(diff).every(u => !diff[u]);

    if (isNow === true) {
      return {
        diff,
        rounded: 'now',
        qualified: 'now',
        precise: 'now'
      };
    }

    let rounded;
    let qualified;
    let precise;
    let englishValues = []; //go through each value and create its text-representation

    Object.keys(diff).forEach((unit, i, units) => {
      const value = Math.abs(diff[unit]);

      if (value === 0) {
        return;
      }

      const englishValue = pluralize(value, unit);
      englishValues.push(englishValue);

      if (!rounded) {
        rounded = qualified = englishValue;

        if (i > 4) {
          return;
        } //is it a 'almost' something, etc?


        const nextUnit = units[i + 1];
        const nextValue = Math.abs(diff[nextUnit]);

        if (nextValue > qualifiers[nextUnit].almost) {
          rounded = pluralize(value + 1, unit);
          qualified = 'almost ' + rounded;
        } else if (nextValue > qualifiers[nextUnit].over) qualified = 'over ' + englishValue;
      }
    }); //make them into a string

    precise = englishValues.splice(0, 2).join(', '); //handle before/after logic

    if (start.isAfter(end) === true) {
      rounded += ' ago';
      qualified += ' ago';
      precise += ' ago';
    } else {
      rounded = 'in ' + rounded;
      qualified = 'in ' + qualified;
      precise = 'in ' + precise;
    }

    return {
      diff,
      rounded,
      qualified,
      precise
    };
  };

  var since_1 = since$1;

  //https://www.timeanddate.com/calendar/aboutseasons.html
  // Spring - from March 1 to May 31;
  // Summer - from June 1 to August 31;
  // Fall (autumn) - from September 1 to November 30; and,
  // Winter - from December 1 to February 28 (February 29 in a leap year).
  var seasons$1 = {
    north: [['spring', 2, 1], //spring march 1
    ['summer', 5, 1], //june 1
    ['fall', 8, 1], //sept 1
    ['autumn', 8, 1], //sept 1
    ['winter', 11, 1] //dec 1
    ],
    south: [['fall', 2, 1], //march 1
    ['autumn', 2, 1], //march 1
    ['winter', 5, 1], //june 1
    ['spring', 8, 1], //sept 1
    ['summer', 11, 1] //dec 1
    ]
  };

  var quarters$1 = [null, [0, 1], //jan 1
  [3, 1], //apr 1
  [6, 1], //july 1
  [9, 1] //oct 1
  ];

  var seasons = seasons$1;

  var quarters = quarters$1;

  const units$1 = {
    minute: s => {
      walkTo(s, {
        second: 0,
        millisecond: 0
      });
      return s;
    },
    quarterhour: s => {
      let minute = s.minutes();

      if (minute >= 45) {
        s = s.minutes(45);
      } else if (minute >= 30) {
        s = s.minutes(30);
      } else if (minute >= 15) {
        s = s.minutes(15);
      } else {
        s = s.minutes(0);
      }

      walkTo(s, {
        second: 0,
        millisecond: 0
      });
      return s;
    },
    hour: s => {
      walkTo(s, {
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    day: s => {
      walkTo(s, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    week: s => {
      let original = s.clone();
      s = s.day(s._weekStart); //monday

      if (s.isAfter(original)) {
        s = s.subtract(1, 'week');
      }

      walkTo(s, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    month: s => {
      walkTo(s, {
        date: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    quarter: s => {
      let q = s.quarter();

      if (quarters[q]) {
        walkTo(s, {
          month: quarters[q][0],
          date: quarters[q][1],
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        });
      }

      return s;
    },
    season: s => {
      let current = s.season();
      let hem = 'north';

      if (s.hemisphere() === 'South') {
        hem = 'south';
      }

      for (let i = 0; i < seasons[hem].length; i++) {
        if (seasons[hem][i][0] === current) {
          //winter goes between years
          let year = s.year();

          if (current === 'winter' && s.month() < 3) {
            year -= 1;
          }

          walkTo(s, {
            year,
            month: seasons[hem][i][1],
            date: seasons[hem][i][2],
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
          });
          return s;
        }
      }

      return s;
    },
    year: s => {
      walkTo(s, {
        month: 0,
        date: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    decade: s => {
      s = s.startOf('year');
      let year = s.year();
      let decade = parseInt(year / 10, 10) * 10;
      s = s.year(decade);
      return s;
    },
    century: s => {
      s = s.startOf('year');
      let year = s.year(); // near 0AD goes '-1 | +1'

      let decade = parseInt(year / 100, 10) * 100;
      s = s.year(decade);
      return s;
    }
  };
  units$1.date = units$1.day;

  const startOf = (a, unit) => {
    let s = a.clone();
    unit = fns.normalize(unit);

    if (units$1[unit]) {
      return units$1[unit](s);
    }

    if (unit === 'summer' || unit === 'winter') {
      s = s.season(unit);
      return units$1.season(s);
    }

    return s;
  }; //piggy-backs off startOf


  const endOf = (a, unit) => {
    let s = a.clone();
    unit = fns.normalize(unit);

    if (units$1[unit]) {
      // go to beginning, go to next one, step back 1ms
      s = units$1[unit](s); // startof

      s = s.add(1, unit);
      s = s.subtract(1, 'millisecond');
      return s;
    }

    return s;
  };

  var startOf_1 = {
    startOf,
    endOf
  };

  const isDay = function (unit) {
    if (days.short().find(s => s === unit)) {
      return true;
    }

    if (days.long().find(s => s === unit)) {
      return true;
    }

    return false;
  }; // return a list of the weeks/months/days between a -> b
  // returns spacetime objects in the timezone of the input


  const every$1 = function (start, unit = '', end) {
    if (!unit || !end) {
      return [];
    } //cleanup unit param


    unit = fns.normalize(unit); //cleanup to param

    end = start.clone().set(end); //swap them, if they're backwards

    if (start.isAfter(end)) {
      let tmp = start;
      start = end;
      end = tmp;
    } //support 'every wednesday'


    let d = start.clone();

    if (isDay(unit)) {
      d = d.next(unit);
      unit = 'week';
    } else {
      d = d.next(unit);
    } //okay, actually start doing it


    let result = [];

    while (d.isBefore(end)) {
      result.push(d);
      d = d.add(1, unit);
    }

    return result;
  };

  var every_1 = every$1;

  var findTz = find;

  const parseDst = dst => {
    if (!dst) {
      return [];
    }

    return dst.split('->');
  };

  const titleCase = str => {
    str = str[0].toUpperCase() + str.substr(1);
    str = str.replace(/\/gmt/, '/GMT');
    str = str.replace(/[\/_]([a-z])/gi, s => {
      return s.toUpperCase();
    });
    return str;
  }; //get metadata about this timezone


  const timezone$1 = s => {
    let zones = s.timezones;
    let tz = s.tz;

    if (zones.hasOwnProperty(tz) === false) {
      tz = findTz(s.tz, zones);
    }

    if (tz === null) {
      if (s.silent === false) {
        console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
      }

      return {
        current: {
          epochShift: 0
        }
      };
    }

    let found = zones[tz];
    let result = {
      name: titleCase(tz),
      hasDst: Boolean(found.dst),
      default_offset: found.offset,
      //do north-hemisphere version as default (sorry!)
      hemisphere: found.hem === 's' ? 'South' : 'North',
      current: {}
    };

    if (result.hasDst) {
      let arr = parseDst(found.dst);
      result.change = {
        start: arr[0],
        back: arr[1]
      };
    } //find the offsets for summer/winter times
    //(these variable names are north-centric)


    let summer = found.offset; // (july)

    let winter = summer; // (january) assume it's the same for now

    if (result.hasDst === true) {
      if (result.hemisphere === 'North') {
        winter = summer - 1;
      } else {
        //southern hemisphere
        winter = found.offset + 1;
      }
    } //find out which offset to use right now
    //use 'summer' time july-time


    if (result.hasDst === false) {
      result.current.offset = summer;
      result.current.isDST = false;
    } else if (inSummerTime(s.epoch, result.change.start, result.change.back, summer, winter) === true) {
      result.current.offset = summer;
      result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
    } else {
      //use 'winter' january-time
      result.current.offset = winter;
      result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
    }

    return result;
  };

  var timezone_1 = timezone$1;

  var format = format_1;

  var unixFmt = unixFmt_1;

  var progress = progress_1;

  var nearest = nearest_1;

  var diff = diff$1;

  var since = since_1;

  var ends = startOf_1;

  var every = every_1;

  var timezone = timezone_1;

  var handleInput = input;

  const units = ['century', 'decade', 'year', 'month', 'date', 'day', 'hour', 'minute', 'second', 'millisecond']; //the spacetime instance methods (also, the API)

  const methods$5 = {
    set: function (input, tz) {
      let s = this.clone();
      s = handleInput(s, input, null);

      if (tz) {
        this.tz = findTz(tz);
      }

      return s;
    },
    timezone: function () {
      return timezone(this);
    },
    isDST: function () {
      return timezone(this).current.isDST;
    },
    hasDST: function () {
      return timezone(this).hasDst;
    },
    offset: function () {
      return timezone(this).current.offset * 60;
    },
    hemisphere: function () {
      return timezone(this).hemisphere;
    },
    format: function (fmt) {
      return format(this, fmt);
    },
    unixFmt: function (fmt) {
      return unixFmt(this, fmt);
    },
    startOf: function (unit) {
      return ends.startOf(this, unit);
    },
    endOf: function (unit) {
      return ends.endOf(this, unit);
    },
    leapYear: function () {
      let year = this.year();
      return fns.isLeapYear(year);
    },
    progress: function (unit) {
      return progress(this, unit);
    },
    nearest: function (unit) {
      return nearest(this, unit);
    },
    diff: function (d, unit) {
      return diff(this, d, unit);
    },
    since: function (d) {
      if (!d) {
        d = this.clone().set();
      }

      return since(this, d);
    },
    next: function (unit) {
      let s = this.add(1, unit);
      return s.startOf(unit);
    },
    //the start of the previous year/week/century
    last: function (unit) {
      let s = this.subtract(1, unit);
      return s.startOf(unit);
    },
    isValid: function () {
      //null/undefined epochs
      if (!this.epoch && this.epoch !== 0) {
        return false;
      }

      return !isNaN(this.d.getTime());
    },
    //travel to this timezone
    goto: function (tz) {
      let s = this.clone();
      s.tz = findTz(tz, s.timezones); //science!

      return s;
    },
    //get each week/month/day between a -> b
    every: function (unit, to) {
      // allow swapping these params:
      if (typeof unit === 'object' && typeof to === 'string') {
        let tmp = to;
        to = unit;
        unit = tmp;
      }

      return every(this, unit, to);
    },
    isAwake: function () {
      let hour = this.hour(); //10pm -> 8am

      if (hour < 8 || hour > 22) {
        return false;
      }

      return true;
    },
    isAsleep: function () {
      return !this.isAwake();
    },
    daysInMonth: function () {
      switch (this.month()) {
        case 0:
          return 31;

        case 1:
          return this.leapYear() ? 29 : 28;

        case 2:
          return 31;

        case 3:
          return 30;

        case 4:
          return 31;

        case 5:
          return 30;

        case 6:
          return 31;

        case 7:
          return 31;

        case 8:
          return 30;

        case 9:
          return 31;

        case 10:
          return 30;

        case 11:
          return 31;

        default:
          throw new Error('Invalid Month state.');
      }
    },
    //pretty-printing
    log: function () {
      console.log('');
      console.log(format(this, 'nice-short'));
      return this;
    },
    logYear: function () {
      console.log('');
      console.log(format(this, 'full-short'));
      return this;
    },
    json: function () {
      return units.reduce((h, unit) => {
        h[unit] = this[unit]();
        return h;
      }, {});
    },
    debug: function () {
      let tz = this.timezone();
      let date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
      date += '\n     - ' + this.format('time');
      console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
      return this;
    },
    //alias of 'since' but opposite - like moment.js
    from: function (d) {
      d = this.clone().set(d);
      return d.since(this);
    },
    fromNow: function () {
      let d = this.clone().set(Date.now());
      return d.since(this);
    },
    weekStart: function (input) {
      //accept a number directly
      if (typeof input === 'number') {
        this._weekStart = input;
        return this;
      }

      if (typeof input === 'string') {
        // accept 'wednesday'
        input = input.toLowerCase().trim();
        let num = days.short().indexOf(input);

        if (num === -1) {
          num = days.long().indexOf(input);
        }

        if (num === -1) {
          num = 1; //go back to default
        }

        this._weekStart = num;
      } else {
        console.warn('Spacetime Error: Cannot understand .weekStart() input:', input);
      }

      return this;
    }
  }; // aliases

  methods$5.inDST = methods$5.isDST;
  methods$5.round = methods$5.nearest;
  methods$5.each = methods$5.every;
  var methods_1 = methods$5;

  //these methods wrap around them.

  const isLeapYear$1 = fns.isLeapYear;

  const validate = n => {
    //handle number as a string
    if (typeof n === 'string') {
      n = parseInt(n, 10);
    }

    return n;
  };

  const order$1 = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']; //reduce hostile micro-changes when moving dates by millisecond

  const confirm = (s, tmp, unit) => {
    let n = order$1.indexOf(unit);
    let arr = order$1.slice(n, order$1.length);

    for (let i = 0; i < arr.length; i++) {
      let want = tmp[arr[i]]();
      s[arr[i]](want);
    }

    return s;
  }; // allow specifying setter direction


  const fwdBkwd = function (s, old, goFwd, unit) {
    if (goFwd === true && s.isBefore(old)) {
      s = s.add(1, unit);
    } else if (goFwd === false && s.isAfter(old)) {
      s = s.minus(1, unit);
    }

    return s;
  };

  var set$1 = {
    milliseconds: (s, n) => {
      n = validate(n);
      let current = s.millisecond();
      let diff = current - n; //milliseconds to shift by

      return s.epoch - diff;
    },
    seconds: (s, n, goFwd) => {
      n = validate(n);
      let old = s.clone();
      let diff = s.second() - n;
      let shift = diff * ms.second;
      s.epoch = s.epoch - shift;
      s = fwdBkwd(s, old, goFwd, 'minute'); // specify direction

      return s.epoch;
    },
    minutes: (s, n, goFwd) => {
      n = validate(n);
      let old = s.clone();
      let diff = s.minute() - n;
      let shift = diff * ms.minute;
      s.epoch -= shift;
      confirm(s, old, 'second');
      s = fwdBkwd(s, old, goFwd, 'hour'); // specify direction

      return s.epoch;
    },
    hours: (s, n, goFwd) => {
      n = validate(n);

      if (n >= 24) {
        n = 24;
      } else if (n < 0) {
        n = 0;
      }

      let old = s.clone();
      let diff = s.hour() - n;
      let shift = diff * ms.hour;
      s.epoch -= shift; // oops, did we change the day?

      if (s.date() !== old.date()) {
        s = old.clone();

        if (diff > 1) {
          diff -= 1;
        }

        if (diff < 1) {
          diff += 1;
        }

        shift = diff * ms.hour;
        s.epoch -= shift;
      }

      walkTo(s, {
        hour: n
      });
      confirm(s, old, 'minute');
      s = fwdBkwd(s, old, goFwd, 'day'); // specify direction

      return s.epoch;
    },
    //support setting time by '4:25pm'
    time: (s, str, goFwd) => {
      let m = str.match(/([0-9]{1,2})[:h]([0-9]{1,2})(:[0-9]{1,2})? ?(am|pm)?/);

      if (!m) {
        //fallback to support just '2am'
        m = str.match(/([0-9]{1,2}) ?(am|pm)/);

        if (!m) {
          return s.epoch;
        }

        m.splice(2, 0, '0'); //add implicit 0 minutes

        m.splice(3, 0, ''); //add implicit seconds
      }

      let h24 = false;
      let hour = parseInt(m[1], 10);
      let minute = parseInt(m[2], 10);

      if (minute >= 60) {
        minute = 59;
      }

      if (hour > 12) {
        h24 = true;
      } //make the hour into proper 24h time


      if (h24 === false) {
        if (m[4] === 'am' && hour === 12) {
          //12am is midnight
          hour = 0;
        }

        if (m[4] === 'pm' && hour < 12) {
          //12pm is noon
          hour += 12;
        }
      } // handle seconds


      m[3] = m[3] || '';
      m[3] = m[3].replace(/:/, '');
      let sec = parseInt(m[3], 10) || 0;
      let old = s.clone();
      s = s.hour(hour);
      s = s.minute(minute);
      s = s.second(sec);
      s = s.millisecond(0);
      s = fwdBkwd(s, old, goFwd, 'day'); // specify direction

      return s.epoch;
    },
    date: (s, n, goFwd) => {
      n = validate(n); //avoid setting february 31st

      if (n > 28) {
        let month = s.month();
        let max = monthLength[month]; // support leap day in february

        if (month === 1 && n === 29 && isLeapYear$1(s.year())) {
          max = 29;
        }

        if (n > max) {
          n = max;
        }
      } //avoid setting < 0


      if (n <= 0) {
        n = 1;
      }

      let old = s.clone();
      walkTo(s, {
        date: n
      });
      s = fwdBkwd(s, old, goFwd, 'month'); // specify direction

      return s.epoch;
    },
    //this one's tricky
    month: (s, n, goFwd) => {
      if (typeof n === 'string') {
        n = months$1.mapping()[n.toLowerCase()];
      }

      n = validate(n); //don't go past december

      if (n >= 12) {
        n = 11;
      }

      if (n <= 0) {
        n = 0;
      }

      let date = s.date(); //there's no 30th of february, etc.

      if (date > monthLength[n]) {
        //make it as close as we can..
        date = monthLength[n];
      }

      let old = s.clone();
      walkTo(s, {
        month: n,
        date
      });
      s = fwdBkwd(s, old, goFwd, 'year'); // specify direction

      return s.epoch;
    },
    year: (s, n) => {
      // support '97
      if (typeof n === 'string' && /^'[0-9]{2}$/.test(n)) {
        n = n.replace(/'/, '').trim();
        n = Number(n); // '89 is 1989

        if (n > 30) {
          //change this in 10y
          n = 1900 + n;
        } else {
          // '12 is 2012
          n = 2000 + n;
        }
      }

      n = validate(n);
      walkTo(s, {
        year: n
      });
      return s.epoch;
    },
    // go to the nth week of the year
    week: (s, n, goFwd) => {
      let old = s.clone();
      n = validate(n);
      s = s.month(0);
      s = s.date(1);
      s = s.day('monday'); //first week starts first Thurs in Jan
      // so mon dec 28th is 1st week
      // so mon dec 29th is not the week

      if (s.monthName() === 'december' && s.date() >= 28) {
        s = s.add(1, 'week');
      }

      n -= 1; //1-based

      s = s.add(n, 'weeks');
      s = fwdBkwd(s, old, goFwd, 'year'); // specify direction

      return s.epoch;
    },
    // go to the nth day of the year
    dayOfYear: (s, n, goFwd) => {
      n = validate(n);
      let old = s.clone();
      n -= 1; //days are 1-based

      if (n <= 0) {
        n = 0;
      } else if (n >= 365) {
        n = 364;
      }

      s = s.startOf('year');
      s = s.add(n, 'day');
      confirm(s, old, 'hour');
      s = fwdBkwd(s, old, goFwd, 'year'); // specify direction

      return s.epoch;
    }
  };

  var set = set$1;

  const methods$4 = {
    millisecond: function (num) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = set.milliseconds(s, num);
        return s;
      }

      return this.d.getMilliseconds();
    },
    second: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = set.seconds(s, num, goFwd);
        return s;
      }

      return this.d.getSeconds();
    },
    minute: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = set.minutes(s, num, goFwd);
        return s;
      }

      return this.d.getMinutes();
    },
    hour: function (num, goFwd) {
      let d = this.d;

      if (num !== undefined) {
        let s = this.clone();
        s.epoch = set.hours(s, num, goFwd);
        return s;
      }

      return d.getHours();
    },
    //'3:30' is 3.5
    hourFloat: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        let minute = num % 1;
        minute = minute * 60;
        let hour = parseInt(num, 10);
        s.epoch = set.hours(s, hour, goFwd);
        s.epoch = set.minutes(s, minute, goFwd);
        return s;
      }

      let d = this.d;
      let hour = d.getHours();
      let minute = d.getMinutes();
      minute = minute / 60;
      return hour + minute;
    },
    // hour in 12h format
    hour12: function (str, goFwd) {
      let d = this.d;

      if (str !== undefined) {
        let s = this.clone();
        str = '' + str;
        let m = str.match(/^([0-9]+)(am|pm)$/);

        if (m) {
          let hour = parseInt(m[1], 10);

          if (m[2] === 'pm') {
            hour += 12;
          }

          s.epoch = set.hours(s, hour, goFwd);
        }

        return s;
      } //get the hour


      let hour12 = d.getHours();

      if (hour12 > 12) {
        hour12 = hour12 - 12;
      }

      if (hour12 === 0) {
        hour12 = 12;
      }

      return hour12;
    },
    //some ambiguity here with 12/24h
    time: function (str, goFwd) {
      if (str !== undefined) {
        let s = this.clone();
        str = str.toLowerCase().trim();
        s.epoch = set.time(s, str, goFwd);
        return s;
      }

      return `${this.h12()}:${fns.zeroPad(this.minute())}${this.ampm()}`;
    },
    // either 'am' or 'pm'
    ampm: function (input, goFwd) {
      let which = 'am';
      let hour = this.hour();

      if (hour >= 12) {
        which = 'pm';
      }

      if (typeof input !== 'string') {
        return which;
      } //okay, we're doing a setter


      let s = this.clone();
      input = input.toLowerCase().trim(); //ampm should never change the day
      // - so use `.hour(n)` instead of `.minus(12,'hour')`

      if (hour >= 12 && input === 'am') {
        //noon is 12pm
        hour -= 12;
        return s.hour(hour, goFwd);
      }

      if (hour < 12 && input === 'pm') {
        hour += 12;
        return s.hour(hour, goFwd);
      }

      return s;
    },
    //some hard-coded times of day, like 'noon'
    dayTime: function (str, goFwd) {
      if (str !== undefined) {
        const times = {
          morning: '7:00am',
          breakfast: '7:00am',
          noon: '12:00am',
          lunch: '12:00pm',
          afternoon: '2:00pm',
          evening: '6:00pm',
          dinner: '6:00pm',
          night: '11:00pm',
          midnight: '23:59pm'
        };
        let s = this.clone();
        str = str || '';
        str = str.toLowerCase();

        if (times.hasOwnProperty(str) === true) {
          s = s.time(times[str], goFwd);
        }

        return s;
      }

      let h = this.hour();

      if (h < 6) {
        return 'night';
      }

      if (h < 12) {
        //until noon
        return 'morning';
      }

      if (h < 17) {
        //until 5pm
        return 'afternoon';
      }

      if (h < 22) {
        //until 10pm
        return 'evening';
      }

      return 'night';
    },
    //parse a proper iso string
    iso: function (num) {
      if (num !== undefined) {
        return this.set(num);
      }

      return this.format('iso');
    }
  };
  var _01Time = methods$4;

  const methods$3 = {
    // # day in the month
    date: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        num = parseInt(num, 10);

        if (num) {
          s.epoch = set.date(s, num, goFwd);
        }

        return s;
      }

      return this.d.getDate();
    },
    //like 'wednesday' (hard!)
    day: function (input, goFwd) {
      if (input === undefined) {
        return this.d.getDay();
      }

      let original = this.clone();
      let want = input; // accept 'wednesday'

      if (typeof input === 'string') {
        input = input.toLowerCase();

        if (days.aliases.hasOwnProperty(input)) {
          want = days.aliases[input];
        } else {
          want = days.short().indexOf(input);

          if (want === -1) {
            want = days.long().indexOf(input);
          }
        }
      } //move approx


      let day = this.d.getDay();
      let diff = day - want;

      if (goFwd === true && diff > 0) {
        diff = diff - 7;
      }

      if (goFwd === false && diff < 0) {
        diff = diff + 7;
      }

      let s = this.subtract(diff, 'days'); //tighten it back up

      walkTo(s, {
        hour: original.hour(),
        minute: original.minute(),
        second: original.second()
      });
      return s;
    },
    //these are helpful name-wrappers
    dayName: function (input, goFwd) {
      if (input === undefined) {
        return days.long()[this.day()];
      }

      let s = this.clone();
      s = s.day(input, goFwd);
      return s;
    }
  };
  var _02Date = methods$3;

  const clearMinutes = s => {
    s = s.minute(0);
    s = s.second(0);
    s = s.millisecond(1);
    return s;
  };

  const methods$2 = {
    // day 0-366
    dayOfYear: function (num, goFwd) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = set.dayOfYear(s, num, goFwd);
        return s;
      } //days since newyears - jan 1st is 1, jan 2nd is 2...


      let sum = 0;
      let month = this.d.getMonth();
      let tmp; //count the num days in each month

      for (let i = 1; i <= month; i++) {
        tmp = new Date();
        tmp.setDate(1);
        tmp.setFullYear(this.d.getFullYear()); //the year matters, because leap-years

        tmp.setHours(1);
        tmp.setMinutes(1);
        tmp.setMonth(i);
        tmp.setHours(-2); //the last day of the month

        sum += tmp.getDate();
      }

      return sum + this.d.getDate();
    },
    //since the start of the year
    week: function (num, goFwd) {
      // week-setter
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = set.week(this, num, goFwd);
        s = clearMinutes(s);
        return s;
      } //find-out which week it is


      let tmp = this.clone();
      tmp = tmp.month(0);
      tmp = tmp.date(1);
      tmp = clearMinutes(tmp);
      tmp = tmp.day('monday'); //don't go into last-year

      if (tmp.monthName() === 'december' && tmp.date() >= 28) {
        tmp = tmp.add(1, 'week');
      } // is first monday the 1st?


      let toAdd = 1;

      if (tmp.date() === 1) {
        toAdd = 0;
      }

      tmp = tmp.minus(1, 'second');
      const thisOne = this.epoch; //if the week technically hasn't started yet

      if (tmp.epoch > thisOne) {
        return 1;
      } //speed it up, if we can


      let i = 0;
      let skipWeeks = this.month() * 4;
      tmp.epoch += ms.week * skipWeeks;
      i += skipWeeks;

      for (; i <= 52; i++) {
        if (tmp.epoch > thisOne) {
          return i + toAdd;
        }

        tmp = tmp.add(1, 'week');
      }

      return 52;
    },
    //either name or number
    month: function (input, goFwd) {
      if (input !== undefined) {
        let s = this.clone();
        s.epoch = set.month(s, input, goFwd);
        return s;
      }

      return this.d.getMonth();
    },
    //'january'
    monthName: function (input, goFwd) {
      if (input !== undefined) {
        let s = this.clone();
        s = s.month(input, goFwd);
        return s;
      }

      return months$1.long()[this.month()];
    },
    //q1, q2, q3, q4
    quarter: function (num, goFwd) {
      if (num !== undefined) {
        if (typeof num === 'string') {
          num = num.replace(/^q/i, '');
          num = parseInt(num, 10);
        }

        if (quarters[num]) {
          let s = this.clone();
          let month = quarters[num][0];
          s = s.month(month, goFwd);
          s = s.date(1, goFwd);
          s = s.startOf('day');
          return s;
        }
      }

      let month = this.d.getMonth();

      for (let i = 1; i < quarters.length; i++) {
        if (month < quarters[i][0]) {
          return i - 1;
        }
      }

      return 4;
    },
    //spring, summer, winter, fall
    season: function (input, goFwd) {
      let hem = 'north';

      if (this.hemisphere() === 'South') {
        hem = 'south';
      }

      if (input !== undefined) {
        let s = this.clone();

        for (let i = 0; i < seasons[hem].length; i++) {
          if (input === seasons[hem][i][0]) {
            s = s.month(seasons[hem][i][1], goFwd);
            s = s.date(1);
            s = s.startOf('day');
          }
        }

        return s;
      }

      let month = this.d.getMonth();

      for (let i = 0; i < seasons[hem].length - 1; i++) {
        if (month >= seasons[hem][i][1] && month < seasons[hem][i + 1][1]) {
          return seasons[hem][i][0];
        }
      }

      return 'winter';
    },
    //the year number
    year: function (num) {
      if (num !== undefined) {
        let s = this.clone();
        s.epoch = set.year(s, num);
        return s;
      }

      return this.d.getFullYear();
    },
    //bc/ad years
    era: function (str) {
      if (str !== undefined) {
        let s = this.clone();
        str = str.toLowerCase(); //TODO: there is no year-0AD i think. may have off-by-1 error here

        let year = s.d.getFullYear(); //make '1992' into 1992bc..

        if (str === 'bc' && year > 0) {
          s.epoch = set.year(s, year * -1);
        } //make '1992bc' into '1992'


        if (str === 'ad' && year < 0) {
          s.epoch = set.year(s, year * -1);
        }

        return s;
      }

      if (this.d.getFullYear() < 0) {
        return 'BC';
      }

      return 'AD';
    },
    // 2019 -> 2010
    decade: function (input) {
      if (input !== undefined) {
        input = String(input);
        input = input.replace(/([0-9])'?s$/, '$1'); //1950's

        input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals

        if (!input) {
          console.warn('Spacetime: Invalid decade input');
          return this;
        } // assume 20th century?? for '70s'.


        if (input.length === 2 && /[0-9][0-9]/.test(input)) {
          input = '19' + input;
        }

        let year = Number(input);

        if (isNaN(year)) {
          return this;
        } // round it down to the decade


        year = Math.floor(year / 10) * 10;
        return this.year(year); //.startOf('decade')
      }

      return this.startOf('decade').year();
    },
    // 1950 -> 19+1
    century: function (input) {
      if (input !== undefined) {
        if (typeof input === 'string') {
          input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals

          input = input.replace(/([0-9]+) ?(b\.?c\.?|a\.?d\.?)/i, (a, b, c) => {
            if (c.match(/b\.?c\.?/i)) {
              b = '-' + b;
            }

            return b;
          });
          input = input.replace(/c$/, ''); //20thC
        }

        let year = Number(input);

        if (isNaN(input)) {
          console.warn('Spacetime: Invalid century input');
          return this;
        } // there is no century 0


        if (year === 0) {
          year = 1;
        }

        if (year >= 0) {
          year = (year - 1) * 100;
        } else {
          year = (year + 1) * 100;
        }

        return this.year(year);
      } // century getter


      let num = this.startOf('century').year();
      num = Math.floor(num / 100);

      if (num < 0) {
        return num - 1;
      }

      return num + 1;
    },
    // 2019 -> 2+1
    millenium: function (input) {
      if (input !== undefined) {
        if (typeof input === 'string') {
          input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals

          input = Number(input);

          if (isNaN(input)) {
            console.warn('Spacetime: Invalid millenium input');
            return this;
          }
        }

        if (input > 0) {
          input -= 1;
        }

        let year = input * 1000; // there is no year 0

        if (year === 0) {
          year = 1;
        }

        return this.year(year);
      } // get the current millenium


      let num = Math.floor(this.year() / 1000);

      if (num >= 0) {
        num += 1;
      }

      return num;
    }
  };
  var _03Year = methods$2;

  var require$$0 = _01Time;

  var require$$1$1 = _02Date;

  var require$$2$1 = _03Year;

  const methods$1 = Object.assign({}, require$$0, require$$1$1, require$$2$1); //aliases

  methods$1.milliseconds = methods$1.millisecond;
  methods$1.seconds = methods$1.second;
  methods$1.minutes = methods$1.minute;
  methods$1.hours = methods$1.hour;
  methods$1.hour24 = methods$1.hour;
  methods$1.h12 = methods$1.hour12;
  methods$1.h24 = methods$1.hour24;
  methods$1.days = methods$1.day;

  const addMethods$4 = Space => {
    //hook the methods into prototype
    Object.keys(methods$1).forEach(k => {
      Space.prototype[k] = methods$1[k];
    });
  };

  var query = addMethods$4;

  const isLeapYear = fns.isLeapYear;

  const getMonthLength = function (month, year) {
    if (month === 1 && isLeapYear(year)) {
      return 29;
    }

    return monthLength[month];
  }; //month is the one thing we 'model/compute'
  //- because ms-shifting can be off by enough


  const rollMonth = (want, old) => {
    //increment year
    if (want.month > 0) {
      let years = parseInt(want.month / 12, 10);
      want.year = old.year() + years;
      want.month = want.month % 12;
    } else if (want.month < 0) {
      //decrement year
      let years = Math.floor(Math.abs(want.month) / 13, 10);
      years = Math.abs(years) + 1;
      want.year = old.year() - years; //ignore extras

      want.month = want.month % 12;
      want.month = want.month + 12;

      if (want.month === 12) {
        want.month = 0;
      }
    }

    return want;
  }; // briefly support day=-2 (this does not need to be perfect.)


  const rollDaysDown = (want, old, sum) => {
    want.year = old.year();
    want.month = old.month();
    let date = old.date();
    want.date = date - Math.abs(sum);

    while (want.date < 1) {
      want.month -= 1;

      if (want.month < 0) {
        want.month = 11;
        want.year -= 1;
      }

      let max = getMonthLength(want.month, want.year);
      want.date += max;
    }

    return want;
  }; // briefly support day=33 (this does not need to be perfect.)


  const rollDaysUp = (want, old, sum) => {
    let year = old.year();
    let month = old.month();
    let max = getMonthLength(month, year);

    while (sum > max) {
      sum -= max;
      month += 1;

      if (month >= 12) {
        month -= 12;
        year += 1;
      }

      max = getMonthLength(month, year);
    }

    want.month = month;
    want.date = sum;
    return want;
  };

  var _model = {
    months: rollMonth,
    days: rollDaysUp,
    daysBack: rollDaysDown
  };

  var model = _model;

  // but briefly:
  // millisecond-math, and some post-processing covers most-things
  // we 'model' the calendar here only a little bit
  // and that usually works-out...

  const order = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
  let keep = {
    second: order.slice(0, 1),
    minute: order.slice(0, 2),
    quarterhour: order.slice(0, 2),
    hour: order.slice(0, 3),
    date: order.slice(0, 4),
    month: order.slice(0, 4),
    quarter: order.slice(0, 4),
    season: order.slice(0, 4),
    year: order,
    decade: order,
    century: order
  };
  keep.week = keep.hour;
  keep.season = keep.date;
  keep.quarter = keep.date; // Units need to be dst adjuested

  const dstAwareUnits = {
    year: true,
    quarter: true,
    season: true,
    month: true,
    week: true,
    date: true
  };
  const keepDate = {
    month: true,
    quarter: true,
    season: true,
    year: true
  };

  const addMethods$3 = SpaceTime => {
    SpaceTime.prototype.add = function (num, unit) {
      let s = this.clone();

      if (!unit || num === 0) {
        return s; //don't bother
      }

      let old = this.clone();
      unit = fns.normalize(unit);

      if (unit === 'millisecond') {
        s.epoch += num;
        return s;
      } // support 'fortnight' alias


      if (unit === 'fortnight') {
        num *= 2;
        unit = 'week';
      } //move forward by the estimated milliseconds (rough)


      if (ms[unit]) {
        s.epoch += ms[unit] * num;
      } else if (unit === 'week' || unit === 'weekend') {
        s.epoch += ms.day * (num * 7);
      } else if (unit === 'quarter' || unit === 'season') {
        s.epoch += ms.month * (num * 3);
      } else if (unit === 'quarterhour') {
        s.epoch += ms.minute * 15 * num;
      } //now ensure our milliseconds/etc are in-line


      let want = {};

      if (keep[unit]) {
        keep[unit].forEach(u => {
          want[u] = old[u]();
        });
      }

      if (dstAwareUnits[unit]) {
        const diff = old.timezone().current.offset - s.timezone().current.offset;
        s.epoch += diff * 3600 * 1000;
      } //ensure month/year has ticked-over


      if (unit === 'month') {
        want.month = old.month() + num; //month is the one unit we 'model' directly

        want = model.months(want, old);
      } //support coercing a week, too


      if (unit === 'week') {
        let sum = old.date() + num * 7;

        if (sum <= 28 && sum > 1) {
          want.date = sum;
        }
      }

      if (unit === 'weekend' && s.dayName() !== 'saturday') {
        s = s.day('saturday', true); //ensure it's saturday
      } //support 25-hour day-changes on dst-changes
      else if (unit === 'date') {
        if (num < 0) {
          want = model.daysBack(want, old, num);
        } else {
          //specify a naive date number, if it's easy to do...
          let sum = old.date() + num; // ok, model this one too

          want = model.days(want, old, sum);
        } //manually punt it if we haven't moved at all..


        if (num !== 0 && old.isSame(s, 'day')) {
          want.date = old.date() + num;
        }
      } // ensure a quarter is 3 months over
      else if (unit === 'quarter') {
        want.month = old.month() + num * 3;
        want.year = old.year(); // handle rollover

        if (want.month < 0) {
          let years = Math.floor(want.month / 12);
          let remainder = want.month + Math.abs(years) * 12;
          want.month = remainder;
          want.year += years;
        } else if (want.month >= 12) {
          let years = Math.floor(want.month / 12);
          want.month = want.month % 12;
          want.year += years;
        }

        want.date = old.date();
      } //ensure year has changed (leap-years)
      else if (unit === 'year') {
        let wantYear = old.year() + num;
        let haveYear = s.year();

        if (haveYear < wantYear) {
          let toAdd = Math.floor(num / 4) || 1; //approx num of leap-days

          s.epoch += Math.abs(ms.day * toAdd);
        } else if (haveYear > wantYear) {
          let toAdd = Math.floor(num / 4) || 1; //approx num of leap-days

          s.epoch += ms.day * toAdd;
        }
      } //these are easier
      else if (unit === 'decade') {
        want.year = s.year() + 10;
      } else if (unit === 'century') {
        want.year = s.year() + 100;
      } //keep current date, unless the month doesn't have it.


      if (keepDate[unit]) {
        let max = monthLength[want.month];
        want.date = old.date();

        if (want.date > max) {
          want.date = max;
        }
      }

      if (Object.keys(want).length > 1) {
        walkTo(s, want);
      }

      return s;
    }; //subtract is only add *-1


    SpaceTime.prototype.subtract = function (num, unit) {
      let s = this.clone();
      return s.add(num * -1, unit);
    }; //add aliases


    SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
    SpaceTime.prototype.plus = SpaceTime.prototype.add;
  };

  var add = addMethods$3;

  //make a string, for easy comparison between dates
  const print = {
    millisecond: s => {
      return s.epoch;
    },
    second: s => {
      return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
    },
    minute: s => {
      return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
    },
    hour: s => {
      return [s.year(), s.month(), s.date(), s.hour()].join('-');
    },
    day: s => {
      return [s.year(), s.month(), s.date()].join('-');
    },
    week: s => {
      return [s.year(), s.week()].join('-');
    },
    month: s => {
      return [s.year(), s.month()].join('-');
    },
    quarter: s => {
      return [s.year(), s.quarter()].join('-');
    },
    year: s => {
      return s.year();
    }
  };
  print.date = print.day;

  const addMethods$2 = SpaceTime => {
    SpaceTime.prototype.isSame = function (b, unit, tzAware = true) {
      let a = this;

      if (!unit) {
        return null;
      } // support swapped params


      if (typeof b === 'string' && typeof unit === 'object') {
        let tmp = b;
        b = unit;
        unit = tmp;
      }

      if (typeof b === 'string' || typeof b === 'number') {
        b = new SpaceTime(b, this.timezone.name);
      } //support 'seconds' aswell as 'second'


      unit = unit.replace(/s$/, ''); // make them the same timezone for proper comparison

      if (tzAware === true && a.tz !== b.tz) {
        b = b.clone();
        b.tz = a.tz;
      }

      if (print[unit]) {
        return print[unit](a) === print[unit](b);
      }

      return null;
    };
  };

  var same = addMethods$2;

  const addMethods$1 = SpaceTime => {
    const methods = {
      isAfter: function (d) {
        d = fns.beADate(d, this);
        let epoch = fns.getEpoch(d);

        if (epoch === null) {
          return null;
        }

        return this.epoch > epoch;
      },
      isBefore: function (d) {
        d = fns.beADate(d, this);
        let epoch = fns.getEpoch(d);

        if (epoch === null) {
          return null;
        }

        return this.epoch < epoch;
      },
      isEqual: function (d) {
        d = fns.beADate(d, this);
        let epoch = fns.getEpoch(d);

        if (epoch === null) {
          return null;
        }

        return this.epoch === epoch;
      },
      isBetween: function (start, end, isInclusive = false) {
        start = fns.beADate(start, this);
        end = fns.beADate(end, this);
        let startEpoch = fns.getEpoch(start);

        if (startEpoch === null) {
          return null;
        }

        let endEpoch = fns.getEpoch(end);

        if (endEpoch === null) {
          return null;
        }

        if (isInclusive) {
          return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end);
        }

        return startEpoch < this.epoch && this.epoch < endEpoch;
      }
    }; //hook them into proto

    Object.keys(methods).forEach(k => {
      SpaceTime.prototype[k] = methods[k];
    });
  };

  var compare = addMethods$1;

  const addMethods = SpaceTime => {
    const methods = {
      i18n: data => {
        //change the day names
        if (fns.isObject(data.days)) {
          days.set(data.days);
        } //change the month names


        if (fns.isObject(data.months)) {
          months$1.set(data.months);
        } // change the the display style of the month / day names


        if (fns.isBoolean(data.useTitleCase)) {
          caseFormat.set(data.useTitleCase);
        }
      }
    }; //hook them into proto

    Object.keys(methods).forEach(k => {
      SpaceTime.prototype[k] = methods[k];
    });
  };

  var i18n = addMethods;

  var quickOffset = quick;

  var methods = methods_1;

  var require$$1 = query;

  var require$$2 = add;

  var require$$3 = same;

  var require$$4 = compare;

  var require$$5 = i18n;

  let timezones = require$$0$4; //fake timezone-support, for fakers (es5 class)

  const SpaceTime = function (input, tz, options = {}) {
    //the holy moment
    this.epoch = null; //the shift for the given timezone

    this.tz = findTz(tz, timezones); //whether to output warnings to console

    this.silent = options.silent || true; // favour british interpretation of 02/02/2018, etc

    this.british = options.dmy || options.british; //does the week start on sunday, or monday:

    this._weekStart = 1; //default to monday

    if (options.weekStart !== undefined) {
      this._weekStart = options.weekStart;
    } // the reference today date object, (for testing)


    this._today = {};

    if (options.today !== undefined) {
      this._today = options.today;
    } // dunno if this is a good idea, or not
    // Object.defineProperty(this, 'parsers', {
    //   enumerable: false,
    //   writable: true,
    //   value: parsers
    // })
    //add getter/setters


    Object.defineProperty(this, 'd', {
      //return a js date object
      get: function () {
        let offset = quickOffset(this); //every computer is somewhere- get this computer's built-in offset

        let bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

        let shift = bias + offset * 60; //in minutes

        shift = shift * 60 * 1000; //in ms
        //remove this computer's offset

        let epoch = this.epoch + shift;
        let d = new Date(epoch);
        return d;
      }
    }); //add this data on the object, to allow adding new timezones

    Object.defineProperty(this, 'timezones', {
      get: () => timezones,
      set: obj => {
        timezones = obj;
        return obj;
      }
    }); //parse the various formats

    let tmp = handleInput(this, input);
    this.epoch = tmp.epoch;
  }; //(add instance methods to prototype)


  Object.keys(methods).forEach(k => {
    SpaceTime.prototype[k] = methods[k];
  }); // ¯\_(ツ)_/¯

  SpaceTime.prototype.clone = function () {
    return new SpaceTime(this.epoch, this.tz, {
      silent: this.silent,
      weekStart: this._weekStart,
      today: this._today,
      parsers: this.parsers
    });
  };
  /**
   * @deprecated use toNativeDate()
   * @returns native date object at the same epoch
   */


  SpaceTime.prototype.toLocalDate = function () {
    return this.toNativeDate();
  };
  /**
   * @returns native date object at the same epoch
   */


  SpaceTime.prototype.toNativeDate = function () {
    return new Date(this.epoch);
  }; //append more methods


  require$$1(SpaceTime);
  require$$2(SpaceTime);
  require$$3(SpaceTime);
  require$$4(SpaceTime);
  require$$5(SpaceTime);
  var spacetime = SpaceTime;

  var Spacetime = spacetime;

  const whereIts$1 = (a, b) => {
    let start = new Spacetime(null);
    let end = new Spacetime(null);
    start = start.time(a); //if b is undefined, use as 'within one hour'

    if (b) {
      end = end.time(b);
    } else {
      end = start.add(59, 'minutes');
    }

    let startHour = start.hour();
    let endHour = end.hour();
    let tzs = Object.keys(start.timezones).filter(tz => {
      if (tz.indexOf('/') === -1) {
        return false;
      }

      let m = new Spacetime(null, tz);
      let hour = m.hour(); //do 'calendar-compare' not real-time-compare

      if (hour >= startHour && hour <= endHour) {
        //test minutes too, if applicable
        if (hour === startHour && m.minute() < start.minute()) {
          return false;
        }

        if (hour === endHour && m.minute() > end.minute()) {
          return false;
        }

        return true;
      }

      return false;
    });
    return tzs;
  };

  var whereIts_1 = whereIts$1;

  var _version = '6.16.3';

  var whereIts = whereIts_1;

  var version = _version;

  const main = (input, tz, options) => new Spacetime(input, tz, options); // set all properties of a given 'today' object


  const setToday = function (s) {
    let today = s._today || {};
    Object.keys(today).forEach(k => {
      s = s[k](today[k]);
    });
    return s;
  }; //some helper functions on the main method


  main.now = (tz, options) => {
    let s = new Spacetime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s;
  };

  main.today = (tz, options) => {
    let s = new Spacetime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s.startOf('day');
  };

  main.tomorrow = (tz, options) => {
    let s = new Spacetime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s.add(1, 'day').startOf('day');
  };

  main.yesterday = (tz, options) => {
    let s = new Spacetime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s.subtract(1, 'day').startOf('day');
  };

  main.extend = function (obj = {}) {
    Object.keys(obj).forEach(k => {
      Spacetime.prototype[k] = obj[k];
    });
    return this;
  };

  main.timezones = function () {
    let s = new Spacetime();
    return s.timezones;
  };

  main.max = function (tz, options) {
    let s = new Spacetime(null, tz, options);
    s.epoch = 8640000000000000;
    return s;
  };

  main.min = function (tz, options) {
    let s = new Spacetime(null, tz, options);
    s.epoch = -8640000000000000;
    return s;
  }; //find tz by time


  main.whereIts = whereIts;
  main.version = version; //aliases:

  main.plugin = main.extend;
  var src = main;

  return src;

})));
