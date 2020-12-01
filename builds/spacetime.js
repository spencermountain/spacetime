/* spencermountain/spacetime 6.12.1 Apache 2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.spacetime = factory());
}(this, (function () { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var MSEC_IN_HOUR = 60 * 60 * 1000; //convert our local date syntax a javascript UTC date

  var toUtc = function toUtc(dstChange, offset, year) {
    var _dstChange$split = dstChange.split('/'),
        _dstChange$split2 = _slicedToArray(_dstChange$split, 2),
        month = _dstChange$split2[0],
        rest = _dstChange$split2[1];

    var _rest$split = rest.split(':'),
        _rest$split2 = _slicedToArray(_rest$split, 2),
        day = _rest$split2[0],
        hour = _rest$split2[1];

    return Date.UTC(year, month - 1, day, hour) - offset * MSEC_IN_HOUR;
  }; // compare epoch with dst change events (in utc)


  var inSummerTime = function inSummerTime(epoch, start, end, summerOffset, winterOffset) {
    var year = new Date(epoch).getUTCFullYear();
    var startUtc = toUtc(start, winterOffset, year);
    var endUtc = toUtc(end, summerOffset, year); // console.log(epoch, endUtc)
    // simple number comparison now

    return epoch >= startUtc && epoch < endUtc;
  };

  var summerTime = inSummerTime;

  // it reproduces some things in ./index.js, but speeds up spacetime considerably

  var quickOffset = function quickOffset(s) {
    var zones = s.timezones;
    var obj = zones[s.tz];

    if (obj === undefined) {
      console.warn("Warning: couldn't find timezone " + s.tz);
      return 0;
    }

    if (obj.dst === undefined) {
      return obj.offset;
    } //get our two possible offsets


    var jul = obj.offset;
    var dec = obj.offset + 1; // assume it's the same for now

    if (obj.hem === 'n') {
      dec = jul - 1;
    }

    var split = obj.dst.split('->');
    var inSummer = summerTime(s.epoch, split[0], split[1], jul, dec);

    if (inSummer === true) {
      return jul;
    }

    return dec;
  };

  var quick = quickOffset;

  var _build = {
  	"9|s": "2/dili,2/jayapura",
  	"9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
  	"9.5|s|04/05:03->10/04:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
  	"9.5|s": "4/darwin,4/north",
  	"8|s|03/08:01->10/04:00": "12/casey",
  	"8|s": "2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
  	"8|n|03/25:03->09/29:23": "2/ulan_bator",
  	"8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
  	"8.75|s": "4/eucla",
  	"7|s": "12/davis,2/jakarta,9/christmas",
  	"7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
  	"6|s": "12/vostok",
  	"6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/qostanay,2/thimbu,2/thimphu,2/urumqi,9/chagos",
  	"6.5|n": "2/rangoon,2/yangon,9/cocos",
  	"5|s": "12/mawson,9/kerguelen",
  	"5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
  	"5.75|n": "2/kathmandu,2/katmandu",
  	"5.5|n": "2/calcutta,2/colombo,2/kolkata",
  	"4|s": "9/reunion",
  	"4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
  	"4.5|n|03/21:00->09/20:24": "2/tehran",
  	"4.5|n": "2/kabul",
  	"3|s": "12/syowa,9/antananarivo",
  	"3|n|03/29:03->10/25:04": "2/famagusta,2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
  	"3|n|03/29:02->10/25:03": "8/chisinau,8/tiraspol",
  	"3|n|03/29:00->10/24:24": "2/beirut",
  	"3|n|03/28:00->10/24:01": "2/gaza,2/hebron",
  	"3|n|03/27:02->10/25:02": "2/jerusalem,2/tel_aviv",
  	"3|n|03/27:00->10/30:01": "2/amman",
  	"3|n|03/27:00->10/29:24": "2/damascus",
  	"3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte",
  	"2|s|03/29:02->10/25:02": "12/troll",
  	"2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
  	"2|n|03/29:02->10/25:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
  	"2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
  	"1|s|04/02:01->09/03:03": "0/windhoek",
  	"1|s": "0/kinshasa,0/luanda",
  	"1|n|04/19:03->05/31:02": "0/casablanca,0/el_aaiun",
  	"1|n|03/29:01->10/25:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
  	"1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
  	"14|n": "11/kiritimati",
  	"13|s|04/05:04->09/27:03": "11/apia",
  	"13|s|01/15:02->11/05:03": "11/tongatapu",
  	"13|n": "11/enderbury,11/fakaofo",
  	"12|s|04/05:03->09/27:02": "12/mcmurdo,12/south_pole,11/auckland",
  	"12|s|01/12:03->12/20:02": "11/fiji",
  	"12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
  	"12.75|s|04/05:03->04/05:02": "11/chatham",
  	"11|s|04/05:03->10/04:02": "12/macquarie",
  	"11|s": "11/bougainville",
  	"11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
  	"11.5|n|04/05:03->10/04:02": "11/norfolk",
  	"10|s|04/05:03->10/04:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
  	"10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
  	"10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
  	"10.5|s|04/05:01->10/04:02": "4/lhi,4/lord_howe",
  	"0|n|03/29:00->10/25:01": "1/scoresbysund,3/azores",
  	"0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
  	"-9|n|03/08:02->11/01:02": "1/adak,1/atka",
  	"-9|n": "11/gambier",
  	"-9.5|n": "11/marquesas",
  	"-8|n|03/08:02->11/01:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
  	"-8|n": "11/pitcairn",
  	"-7|n|03/08:02->11/01:02": "1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,6/pacific,10/bajanorte",
  	"-7|n|03/08:02->11/01:01": "1/dawson,1/whitehorse,6/yukon",
  	"-7|n": "1/creston,1/dawson_creek,1/fort_nelson,1/hermosillo,1/phoenix",
  	"-6|s|04/04:22->09/05:22": "7/easterisland,11/easter",
  	"-6|n|04/05:02->10/25:02": "1/chihuahua,1/mazatlan,10/bajasur",
  	"-6|n|03/08:02->11/01:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
  	"-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
  	"-5|s": "1/lima,1/rio_branco,5/acre",
  	"-5|n|04/05:02->10/25:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
  	"-5|n|03/12:03->11/05:01": "1/north_dakota",
  	"-5|n|03/08:02->11/01:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
  	"-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
  	"-4|s|05/13:23->08/13:01": "12/palmer",
  	"-4|s|04/04:24->09/06:00": "1/santiago,7/continental",
  	"-4|s|03/21:24->10/04:00": "1/asuncion",
  	"-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
  	"-4|s": "1/la_paz,1/manaus,5/west",
  	"-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
  	"-4|n|03/08:02->11/01:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
  	"-4|n|03/08:00->11/01:01": "1/havana",
  	"-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
  	"-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,1/sao_paulo,12/rothera,3/stanley,5/east",
  	"-3|n|03/28:22->10/24:23": "1/nuuk",
  	"-3|n|03/08:02->11/01:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
  	"-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
  	"-2|s": "5/denoronha",
  	"-2|n|03/28:22->10/24:23": "1/godthab",
  	"-2|n|03/08:02->11/01:02": "1/miquelon",
  	"-2|n": "1/noronha,3/south_georgia",
  	"-2.5|n|03/08:02->11/01:02": "1/st_johns,6/newfoundland",
  	"-1|n": "3/cape_verde",
  	"-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
  	"-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
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

  var all = {};
  Object.keys(data).forEach(function (k) {
    var split = k.split('|');
    var obj = {
      offset: Number(split[0]),
      hem: split[1]
    };

    if (split[2]) {
      obj.dst = split[2];
    }

    var names = data[k].split(',');
    names.forEach(function (str) {
      str = str.replace(/(^[0-9]+)\//, function (before, num) {
        num = Number(num);
        return _prefixes[num] + '/';
      });
      all[str] = obj;
    });
  });
  all['utc'] = {
    offset: 0,
    hem: 'n' //(sorry)

  }; //add etc/gmt+n

  for (var i = -14; i <= 14; i += 0.5) {
    var num = i;

    if (num > 0) {
      num = '+' + num;
    }

    var name = 'etc/gmt' + num;
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
  } // console.log(all)
  // console.log(Object.keys(all).length)


  var unpack = all;

  //find the implicit iana code for this machine.
  //safely query the Intl object
  //based on - https://bitbucket.org/pellepim/jstimezonedetect/src
  var fallbackTZ = 'utc'; //
  //this Intl object is not supported often, yet

  var safeIntl = function safeIntl() {
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
      return null;
    }

    var format = Intl.DateTimeFormat();

    if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
      return null;
    }

    var timezone = format.resolvedOptions().timeZone;

    if (!timezone) {
      return null;
    }

    return timezone.toLowerCase();
  };

  var guessTz = function guessTz() {
    var timezone = safeIntl();

    if (timezone === null) {
      return fallbackTZ;
    }

    return timezone;
  }; //do it once per computer


  var guessTz_1 = guessTz;

  var isOffset = /(\-?[0-9]+)h(rs)?/i;
  var isNumber = /(\-?[0-9]+)/;
  var utcOffset = /utc([\-+]?[0-9]+)/i;
  var gmtOffset = /gmt([\-+]?[0-9]+)/i;

  var toIana = function toIana(num) {
    num = Number(num);

    if (num >= -13 && num <= 13) {
      num = num * -1; //it's opposite!

      num = (num > 0 ? '+' : '') + num; //add plus sign

      return 'etc/gmt' + num;
    }

    return null;
  };

  var parseOffset = function parseOffset(tz) {
    // '+5hrs'
    var m = tz.match(isOffset);

    if (m !== null) {
      return toIana(m[1]);
    } // 'utc+5'


    m = tz.match(utcOffset);

    if (m !== null) {
      return toIana(m[1]);
    } // 'GMT-5' (not opposite)


    m = tz.match(gmtOffset);

    if (m !== null) {
      var num = Number(m[1]) * -1;
      return toIana(num);
    } // '+5'


    m = tz.match(isNumber);

    if (m !== null) {
      return toIana(m[1]);
    }

    return null;
  };

  var parseOffset_1 = parseOffset;

  var local = guessTz_1(); //add all the city names by themselves

  var cities = Object.keys(unpack).reduce(function (h, k) {
    var city = k.split('/')[1] || '';
    city = city.replace(/_/g, ' ');
    h[city] = k;
    return h;
  }, {}); //try to match these against iana form

  var normalize = function normalize(tz) {
    tz = tz.replace(/ time/g, '');
    tz = tz.replace(/ (standard|daylight|summer)/g, '');
    tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
    tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
    tz = tz.replace(/\beuropean/g, 'europe');
    tz = tz.replace(/\islands/g, 'island');
    return tz;
  }; // try our best to reconcile the timzone to this given string


  var lookupTz = function lookupTz(str, zones) {
    if (!str) {
      return local;
    }

    if (typeof str !== 'string') {
      console.error("Timezone must be a string - recieved: '", str, "'\n");
    }

    var tz = str.trim();
    var split = str.split('/'); //support long timezones like 'America/Argentina/Rio_Gallegos'

    if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
      tz = split[0] + '/' + split[1];
    }

    tz = tz.toLowerCase();

    if (zones.hasOwnProperty(tz) === true) {
      return tz;
    } //lookup more loosely..


    tz = normalize(tz);

    if (zones.hasOwnProperty(tz) === true) {
      return tz;
    } //try city-names


    if (cities.hasOwnProperty(tz) === true) {
      return cities[tz];
    } // //try to parse '-5h'


    if (/[0-9]/.test(tz) === true) {
      var id = parseOffset_1(tz);

      if (id) {
        return id;
      }
    }

    throw new Error("Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id.");
  };

  var find = lookupTz;

  var o = {
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

  Object.keys(o).forEach(function (k) {
    o[k + 's'] = o[k];
  });
  var milliseconds = o;

  var walk = function walk(s, n, fn, unit, previous) {
    var current = s.d[fn]();

    if (current === n) {
      return; //already there
    }

    var startUnit = previous === null ? null : s.d[previous]();
    var original = s.epoch; //try to get it as close as we can

    var diff = n - current;
    s.epoch += milliseconds[unit] * diff; //DST edge-case: if we are going many days, be a little conservative
    // console.log(unit, diff)

    if (unit === 'day') {
      // s.epoch -= ms.minute
      //but don't push it over a month
      if (Math.abs(diff) > 28 && n < 28) {
        s.epoch += milliseconds.hour;
      }
    } // 1st time: oops, did we change previous unit? revert it.


    if (previous !== null && startUnit !== s.d[previous]()) {
      // console.warn('spacetime warning: missed setting ' + unit)
      s.epoch = original; // s.epoch += ms[unit] * diff * 0.89 // maybe try and make it close...?
    } //repair it if we've gone too far or something
    //(go by half-steps, just in case)


    var halfStep = milliseconds[unit] / 2;

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


  var units = {
    year: {
      valid: function valid(n) {
        return n > -4000 && n < 4000;
      },
      walkTo: function walkTo(s, n) {
        return walk(s, n, 'getFullYear', 'year', null);
      }
    },
    month: {
      valid: function valid(n) {
        return n >= 0 && n <= 11;
      },
      walkTo: function walkTo(s, n) {
        var d = s.d;
        var current = d.getMonth();
        var original = s.epoch;
        var startUnit = d.getFullYear();

        if (current === n) {
          return;
        } //try to get it as close as we can..


        var diff = n - current;
        s.epoch += milliseconds.day * (diff * 28); //special case
        //oops, did we change the year? revert it.

        if (startUnit !== s.d.getFullYear()) {
          s.epoch = original;
        } //incriment by day


        while (s.d.getMonth() < n) {
          s.epoch += milliseconds.day;
        }

        while (s.d.getMonth() > n) {
          s.epoch -= milliseconds.day;
        }
      }
    },
    date: {
      valid: function valid(n) {
        return n > 0 && n <= 31;
      },
      walkTo: function walkTo(s, n) {
        return walk(s, n, 'getDate', 'day', 'getMonth');
      }
    },
    hour: {
      valid: function valid(n) {
        return n >= 0 && n < 24;
      },
      walkTo: function walkTo(s, n) {
        return walk(s, n, 'getHours', 'hour', 'getDate');
      }
    },
    minute: {
      valid: function valid(n) {
        return n >= 0 && n < 60;
      },
      walkTo: function walkTo(s, n) {
        return walk(s, n, 'getMinutes', 'minute', 'getHours');
      }
    },
    second: {
      valid: function valid(n) {
        return n >= 0 && n < 60;
      },
      walkTo: function walkTo(s, n) {
        //do this one directly
        s.epoch = s.seconds(n).epoch;
      }
    },
    millisecond: {
      valid: function valid(n) {
        return n >= 0 && n < 1000;
      },
      walkTo: function walkTo(s, n) {
        //do this one directly
        s.epoch = s.milliseconds(n).epoch;
      }
    }
  };

  var walkTo = function walkTo(s, wants) {
    var keys = Object.keys(units);
    var old = s.clone();

    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var n = wants[k];

      if (n === undefined) {
        n = old[k]();
      }

      if (typeof n === 'string') {
        n = parseInt(n, 10);
      } //make-sure it's valid


      if (!units[k].valid(n)) {
        s.epoch = null;

        if (s.silent === false) {
          console.warn('invalid ' + k + ': ' + n);
        }

        return;
      }

      units[k].walkTo(s, n);
    }

    return;
  };

  var walk_1 = walkTo;

  var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
  var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  function buildMapping() {
    var obj = {
      sep: 8 //support this format

    };

    for (var i = 0; i < shortMonths.length; i++) {
      obj[shortMonths[i]] = i;
    }

    for (var _i = 0; _i < longMonths.length; _i++) {
      obj[longMonths[_i]] = _i;
    }

    return obj;
  }

  var months = {
    "short": function short() {
      return shortMonths;
    },
    "long": function long() {
      return longMonths;
    },
    mapping: function mapping() {
      return buildMapping();
    },
    set: function set(i18n) {
      shortMonths = i18n["short"] || shortMonths;
      longMonths = i18n["long"] || longMonths;
    }
  };

  //pull-apart ISO offsets, like "+0100"
  var parseOffset$1 = function parseOffset(s, offset) {
    if (!offset) {
      return s;
    } //this is a fancy-move


    if (offset === 'Z' || offset === 'z') {
      offset = '+0000';
    } // according to ISO8601, tz could be hh:mm, hhmm or hh
    // so need few more steps before the calculation.


    var num = 0; // for (+-)hh:mm

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

    var tz = 'etc/gmt' + num;
    var zones = s.timezones;

    if (zones[tz]) {
      // log a warning if we're over-writing a given timezone?
      // console.log('changing timezone to: ' + tz)
      s.tz = tz;
    }

    return s;
  };

  var parseOffset_1$1 = parseOffset$1;

  var parseTime = function parseTime(s) {
    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    str = str.replace(/^\s+/, '').toLowerCase(); //trim
    //formal time formats - 04:30.23

    var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

    if (arr !== null) {
      //validate it a little
      var h = Number(arr[1]);

      if (h < 0 || h > 24) {
        return s.startOf('day');
      }

      var m = Number(arr[2]); //don't accept '5:3pm'

      if (arr[2].length < 2 || m < 0 || m > 59) {
        return s.startOf('day');
      }

      if (arr[4] > 999) {
        // fix overflow issue with milliseconds, if input is longer than standard (e.g. 2017-08-06T09:00:00.123456Z)
        arr[4] = parseInt("".concat(arr[4]).substring(0, 3), 10);
      }

      s = s.hour(h);
      s = s.minute(m);
      s = s.seconds(arr[3] || 0);
      s = s.millisecond(arr[4] || 0); //parse-out am/pm

      var ampm = str.match(/[\b0-9](am|pm)\b/);

      if (ampm !== null && ampm[1]) {
        s = s.ampm(ampm[1]);
      }

      return s;
    } //try an informal form - 5pm (no minutes)


    arr = str.match(/([0-9]+) ?(am|pm)/);

    if (arr !== null && arr[1]) {
      var _h = Number(arr[1]); //validate it a little..


      if (_h > 12 || _h < 1) {
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

  var parseTime_1 = parseTime;

  var monthLengths = [31, // January - 31 days
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

  var fns = createCommonjsModule(function (module, exports) {
    //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
    exports.isLeapYear = function (year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }; // unsurprisingly-nasty `typeof date` call


    exports.isDate = function (d) {
      return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
    };

    exports.isArray = function (input) {
      return Object.prototype.toString.call(input) === '[object Array]';
    };

    exports.isObject = function (input) {
      return Object.prototype.toString.call(input) === '[object Object]';
    };

    exports.zeroPad = function (str) {
      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var pad = '0';
      str = str + '';
      return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
    };

    exports.titleCase = function (str) {
      if (!str) {
        return '';
      }

      return str[0].toUpperCase() + str.substr(1);
    };

    exports.ordinal = function (i) {
      var j = i % 10;
      var k = i % 100;

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


    exports.toCardinal = function (str) {
      str = String(str);
      str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
      return parseInt(str, 10);
    }; //used mostly for cleanup of unit names, like 'months'


    exports.normalize = function () {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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

    exports.getEpoch = function (tmp) {
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


    exports.beADate = function (d, s) {
      if (exports.isObject(d) === false) {
        return s.clone().set(d);
      }

      return d;
    };

    exports.formatTimezone = function (offset) {
      var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var sign = offset > 0 ? '+' : '-';
      var absOffset = Math.abs(offset);
      var hours = exports.zeroPad(parseInt('' + absOffset, 10));
      var minutes = exports.zeroPad(absOffset % 1 * 60);
      return "".concat(sign).concat(hours).concat(delimiter).concat(minutes);
    };
  });
  var fns_1 = fns.isLeapYear;
  var fns_2 = fns.isDate;
  var fns_3 = fns.isArray;
  var fns_4 = fns.isObject;
  var fns_5 = fns.zeroPad;
  var fns_6 = fns.titleCase;
  var fns_7 = fns.ordinal;
  var fns_8 = fns.toCardinal;
  var fns_9 = fns.normalize;
  var fns_10 = fns.getEpoch;
  var fns_11 = fns.beADate;
  var fns_12 = fns.formatTimezone;

  var isLeapYear = fns.isLeapYear; //given a month, return whether day number exists in it

  var hasDate = function hasDate(obj) {
    //invalid values
    if (monthLengths_1.hasOwnProperty(obj.month) !== true) {
      return false;
    } //support leap-year in february


    if (obj.month === 1) {
      if (isLeapYear(obj.year) && obj.date <= 29) {
        return true;
      } else {
        return obj.date <= 28;
      }
    } //is this date too-big for this month?


    var max = monthLengths_1[obj.month] || 0;

    if (obj.date <= max) {
      return true;
    }

    return false;
  };

  var hasDate_1 = hasDate;

  var months$1 = months.mapping();

  var parseYear = function parseYear() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var today = arguments.length > 1 ? arguments[1] : undefined;
    var year = parseInt(str.trim(), 10); // use a given year from options.today

    if (!year && today) {
      year = today.year;
    } // fallback to this year


    year = year || new Date().getFullYear();
    return year;
  };

  var strFmt = [//iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/i,
    parse: function parse(s, arr, givenTz, options) {
      var month = parseInt(arr[2], 10) - 1;
      var obj = {
        year: arr[1],
        month: month,
        date: arr[3]
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      parseOffset_1$1(s, arr[5]);
      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, //iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
  {
    reg: /^([0-9]{4})[\-\/.]([0-9]{1,2})[\-\/.]([0-9]{1,2}),?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: function parse(s, arr) {
      var obj = {
        year: arr[1],
        month: parseInt(arr[2], 10) - 1,
        date: parseInt(arr[3], 10)
      };

      if (obj.month >= 12) {
        //support yyyy/dd/mm (weird, but ok)
        obj.date = parseInt(arr[2], 10);
        obj.month = parseInt(arr[3], 10) - 1;
      }

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, //mm/dd/yyyy - uk/canada "6/28/2019, 12:26:14 PM"
  {
    reg: /^([0-9]{1,2})[\-\/.]([0-9]{1,2})[\-\/.]?([0-9]{4})?,?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: function parse(s, arr) {
      var month = parseInt(arr[1], 10) - 1;
      var date = parseInt(arr[2], 10); //support dd/mm/yyy

      if (s.british || month >= 12) {
        date = parseInt(arr[1], 10);
        month = parseInt(arr[2], 10) - 1;
      }

      var year = arr[3] || new Date().getFullYear();
      var obj = {
        year: year,
        month: month,
        date: date
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, // '2012-06' last attempt at iso-like format
  {
    reg: /^([0-9]{4})[\-\/]([0-9]{2})$/i,
    parse: function parse(s, arr, givenTz, options) {
      var month = parseInt(arr[2], 10) - 1;
      var obj = {
        year: arr[1],
        month: month,
        date: 1
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      parseOffset_1$1(s, arr[5]);
      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, //common british format - "25-feb-2015"
  {
    reg: /^([0-9]{1,2})[\-\/]([a-z]+)[\-\/]?([0-9]{4})?$/i,
    parse: function parse(s, arr) {
      var month = months$1[arr[2].toLowerCase()];
      var year = parseYear(arr[3], s._today);
      var obj = {
        year: year,
        month: month,
        date: fns.toCardinal(arr[1] || '')
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, //alt short format - "feb-25-2015"
  {
    reg: /^([a-z]+)[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/i,
    parse: function parse(s, arr) {
      var month = months$1[arr[1].toLowerCase()];
      var year = parseYear(arr[3], s._today);
      var obj = {
        year: year,
        month: month,
        date: fns.toCardinal(arr[2] || '')
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
    parse: function parse(s, arr) {
      var month = months$1[arr[1].toLowerCase()];
      var year = parseYear(arr[3], s._today);
      var obj = {
        year: year,
        month: month,
        date: fns.toCardinal(arr[2] || '')
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: function parse(s, arr) {
      var month = months$1[arr[1].toLowerCase()];
      var year = parseYear(arr[2], s._today);
      var obj = {
        year: year,
        month: month,
        date: s._today.date || 1
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, //Long "25 Mar 2015"
  {
    reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?,? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}? ?(am|pm|gmt))?$/i,
    parse: function parse(s, arr) {
      var month = months$1[arr[2].toLowerCase()];

      if (!month) {
        return null;
      }

      var year = parseYear(arr[3], s._today);
      var obj = {
        year: year,
        month: month,
        date: fns.toCardinal(arr[1])
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, {
    // 'q2 2002'
    reg: /^(q[0-9])( of)?( [0-9]{4})?/i,
    parse: function parse(s, arr) {
      var quarter = arr[1] || '';
      s = s.quarter(quarter);
      var year = arr[3] || '';

      if (year) {
        year = year.trim();
        s = s.year(year);
      }

      return s;
    }
  }, {
    // 'summer 2002'
    reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,
    parse: function parse(s, arr) {
      var season = arr[1] || '';
      s = s.season(season);
      var year = arr[3] || '';

      if (year) {
        year = year.trim();
        s = s.year(year);
      }

      return s;
    }
  }, {
    // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: function parse(s, arr) {
      var str = arr[0] || ''; //make negative-year

      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1'); //remove commas

      str = str.replace(/,/g, '');
      var year = parseInt(str.trim(), 10);
      var d = new Date();
      var obj = {
        year: year,
        month: d.getMonth(),
        date: d.getDate()
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s);
      return s;
    }
  }, {
    // '200ad'
    reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
    parse: function parse(s, arr) {
      var str = arr[0] || ''; //remove commas

      str = str.replace(/,/g, '');
      var year = parseInt(str.trim(), 10);
      var d = new Date();
      var obj = {
        year: year,
        month: d.getMonth(),
        date: d.getDate()
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s);
      return s;
    }
  }, {
    // '1992'
    reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
    parse: function parse(s, arr) {
      var today = s._today;
      var year = parseYear(arr[0], today);
      var d = new Date(); // using today's date, but a new month is awkward.

      if (today.month && !today.date) {
        today.date = 1;
      }

      var obj = {
        year: year,
        month: today.month || d.getMonth(),
        date: today.date || d.getDate()
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s);
      return s;
    }
  }];
  var strParse = strFmt;

  // pull in 'today' data for the baseline moment
  var getNow = function getNow(s) {
    s.epoch = Date.now();
    Object.keys(s._today || {}).forEach(function (k) {
      if (typeof s[k] === 'function') {
        s = s[k](s._today[k]);
      }
    });
    return s;
  };

  var dates = {
    now: function now(s) {
      return getNow(s);
    },
    today: function today(s) {
      return getNow(s);
    },
    tonight: function tonight(s) {
      s = getNow(s);
      s = s.hour(18); //6pm

      return s;
    },
    tomorrow: function tomorrow(s) {
      s = getNow(s);
      s = s.add(1, 'day');
      s = s.startOf('day');
      return s;
    },
    yesterday: function yesterday(s) {
      s = getNow(s);
      s = s.subtract(1, 'day');
      s = s.startOf('day');
      return s;
    },
    christmas: function christmas(s) {
      var year = getNow(s).year();
      s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25

      return s;
    },
    'new years': function newYears(s) {
      var year = getNow(s).year();
      s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31

      return s;
    }
  };
  dates['new years eve'] = dates['new years'];
  var namedDates = dates;

  //  -  can't use built-in js parser ;(
  //=========================================
  // ISO Date	  "2015-03-25"
  // Short Date	"03/25/2015" or "2015/03/25"
  // Long Date	"Mar 25 2015" or "25 Mar 2015"
  // Full Date	"Wednesday March 25 2015"
  //=========================================
  //-- also -
  // if the given epoch is really small, they've probably given seconds and not milliseconds
  // anything below this number is likely (but not necessarily) a mistaken input.
  // this may seem like an arbitrary number, but it's 'within jan 1970'
  // this is only really ambiguous until 2054 or so

  var minimumEpoch = 2500000000;
  var defaults = {
    year: new Date().getFullYear(),
    month: 0,
    date: 1
  }; //support [2016, 03, 01] format

  var handleArray = function handleArray(s, arr, today) {
    if (arr.length === 0) {
      return s;
    }

    var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

    for (var i = 0; i < order.length; i++) {
      var num = arr[i] || today[order[i]] || defaults[order[i]] || 0;
      s = s[order[i]](num);
    }

    return s;
  }; //support {year:2016, month:3} format


  var handleObject = function handleObject(s, obj, today) {
    // if obj is empty, do nothing
    if (Object.keys(obj).length === 0) {
      return s;
    }

    obj = Object.assign({}, defaults, today, obj);
    var keys = Object.keys(obj);

    for (var i = 0; i < keys.length; i++) {
      var unit = keys[i]; //make sure we have this method

      if (s[unit] === undefined || typeof s[unit] !== 'function') {
        continue;
      } //make sure the value is a number


      if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
        continue;
      }

      var num = obj[unit] || today[unit] || defaults[unit] || 0;
      s = s[unit](num);
    }

    return s;
  }; //find the epoch from different input styles


  var parseInput = function parseInput(s, input, givenTz) {
    var today = s._today || defaults; //if we've been given a epoch number, it's easy

    if (typeof input === 'number') {
      if (input > 0 && input < minimumEpoch && s.silent === false) {
        console.warn('  - Warning: You are setting the date to January 1970.');
        console.warn('       -   did input seconds instead of milliseconds?');
      }

      s.epoch = input;
      return s;
    } //set tmp time


    s.epoch = Date.now(); // overwrite tmp time with 'today' value, if exists

    if (s._today && fns.isObject(s._today) && Object.keys(s._today).length > 0) {
      var res = handleObject(s, today, defaults);

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
      s = handleArray(s, input, today);
      return s;
    } //support {year:2016, month:3} format


    if (fns.isObject(input) === true) {
      //support spacetime object as input
      if (input.epoch) {
        s.epoch = input.epoch;
        s.tz = input.tz;
        return s;
      }

      s = handleObject(s, input, today);
      return s;
    } //input as a string..


    if (typeof input !== 'string') {
      return s;
    } //little cleanup..


    input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '');
    input = input.replace(/,/g, '');
    input = input.replace(/ +/g, ' ').trim(); //try some known-words, like 'now'

    if (namedDates.hasOwnProperty(input) === true) {
      s = namedDates[input](s);
      return s;
    } //try each text-parse template, use the first good result


    for (var i = 0; i < strParse.length; i++) {
      var m = input.match(strParse[i].reg);

      if (m) {
        // console.log(strFmt[i].reg)
        var _res = strParse[i].parse(s, m, givenTz);

        if (_res !== null && _res.isValid()) {
          return _res;
        }
      }
    }

    if (s.silent === false) {
      console.warn("Warning: couldn't parse date-string: '" + input + "'");
    }

    s.epoch = null;
    return s;
  };

  var input = parseInput;

  var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var days = {
    "short": function short() {
      return shortDays;
    },
    "long": function long() {
      return longDays;
    },
    set: function set(i18n) {
      shortDays = i18n["short"] || shortDays;
      longDays = i18n["long"] || longDays;
    },
    aliases: {
      tues: 2,
      thur: 4,
      thurs: 4
    }
  };

  // it's kind of nuts how involved this is
  // "+01:00", "+0100", or simply "+01"

  var isoOffset = function isoOffset(s) {
    var offset = s.timezone().current.offset;
    return !offset ? 'Z' : fns.formatTimezone(offset, ':');
  };

  var _offset = isoOffset;

  var format = {
    day: function day(s) {
      return fns.titleCase(s.dayName());
    },
    'day-short': function dayShort(s) {
      return fns.titleCase(days["short"]()[s.day()]);
    },
    'day-number': function dayNumber(s) {
      return s.day();
    },
    'day-ordinal': function dayOrdinal(s) {
      return fns.ordinal(s.day());
    },
    'day-pad': function dayPad(s) {
      return fns.zeroPad(s.day());
    },
    date: function date(s) {
      return s.date();
    },
    'date-ordinal': function dateOrdinal(s) {
      return fns.ordinal(s.date());
    },
    'date-pad': function datePad(s) {
      return fns.zeroPad(s.date());
    },
    month: function month(s) {
      return fns.titleCase(s.monthName());
    },
    'month-short': function monthShort(s) {
      return fns.titleCase(months["short"]()[s.month()]);
    },
    'month-number': function monthNumber(s) {
      return s.month();
    },
    'month-ordinal': function monthOrdinal(s) {
      return fns.ordinal(s.month());
    },
    'month-pad': function monthPad(s) {
      return fns.zeroPad(s.month());
    },
    'iso-month': function isoMonth(s) {
      return fns.zeroPad(s.month() + 1);
    },
    //1-based months
    year: function year(s) {
      var year = s.year();

      if (year > 0) {
        return year;
      }

      year = Math.abs(year);
      return year + ' BC';
    },
    'year-short': function yearShort(s) {
      var year = s.year();

      if (year > 0) {
        return "'".concat(String(s.year()).substr(2, 4));
      }

      year = Math.abs(year);
      return year + ' BC';
    },
    'iso-year': function isoYear(s) {
      var year = s.year();
      var isNegative = year < 0;
      var str = fns.zeroPad(Math.abs(year), 4); //0-padded

      if (isNegative) {
        //negative years are for some reason 6-digits ('-00008')
        str = fns.zeroPad(str, 6);
        str = '-' + str;
      }

      return str;
    },
    time: function time(s) {
      return s.time();
    },
    'time-24': function time24(s) {
      return "".concat(s.hour24(), ":").concat(fns.zeroPad(s.minute()));
    },
    hour: function hour(s) {
      return s.hour12();
    },
    'hour-pad': function hourPad(s) {
      return fns.zeroPad(s.hour12());
    },
    'hour-24': function hour24(s) {
      return s.hour24();
    },
    'hour-24-pad': function hour24Pad(s) {
      return fns.zeroPad(s.hour24());
    },
    minute: function minute(s) {
      return s.minute();
    },
    'minute-pad': function minutePad(s) {
      return fns.zeroPad(s.minute());
    },
    second: function second(s) {
      return s.second();
    },
    'second-pad': function secondPad(s) {
      return fns.zeroPad(s.second());
    },
    ampm: function ampm(s) {
      return s.ampm();
    },
    quarter: function quarter(s) {
      return 'Q' + s.quarter();
    },
    season: function season(s) {
      return s.season();
    },
    era: function era(s) {
      return s.era();
    },
    json: function json(s) {
      return s.json();
    },
    timezone: function timezone(s) {
      return s.timezone().name;
    },
    offset: function offset(s) {
      return _offset(s);
    },
    numeric: function numeric(s) {
      return "".concat(s.year(), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
    },
    // yyyy/mm/dd
    'numeric-us': function numericUs(s) {
      return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()), "/").concat(s.year());
    },
    // mm/dd/yyyy
    'numeric-uk': function numericUk(s) {
      return "".concat(fns.zeroPad(s.date()), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(s.year());
    },
    //dd/mm/yyyy
    'mm/dd': function mmDd(s) {
      return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
    },
    //mm/dd
    // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
    iso: function iso(s) {
      var year = s.format('iso-year');
      var month = fns.zeroPad(s.month() + 1); //1-based months

      var date = fns.zeroPad(s.date());
      var hour = fns.zeroPad(s.h24());
      var minute = fns.zeroPad(s.minute());
      var second = fns.zeroPad(s.second());
      var ms = fns.zeroPad(s.millisecond(), 3);
      var offset = _offset(s);
      return "".concat(year, "-").concat(month, "-").concat(date, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms).concat(offset); //2018-03-09T08:50:00.000-05:00
    },
    'iso-short': function isoShort(s) {
      var month = fns.zeroPad(s.month() + 1); //1-based months

      var date = fns.zeroPad(s.date());
      return "".concat(s.year(), "-").concat(month, "-").concat(date); //2017-02-15
    },
    'iso-utc': function isoUtc(s) {
      return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
    },
    //i made these up
    nice: function nice(s) {
      return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
    },
    'nice-year': function niceYear(s) {
      return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year());
    },
    'nice-day': function niceDay(s) {
      return "".concat(days["short"]()[s.day()], " ").concat(fns.titleCase(months["short"]()[s.month()]), " ").concat(fns.ordinal(s.date()));
    },
    'nice-full': function niceFull(s) {
      return "".concat(s.dayName(), " ").concat(fns.titleCase(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
    }
  }; //aliases

  var aliases = {
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
  Object.keys(aliases).forEach(function (k) {
    return format[k] = format[aliases[k]];
  });

  var printFormat = function printFormat(s) {
    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    //don't print anything if it's an invalid date
    if (s.isValid() !== true) {
      return '';
    } //support .format('month')


    if (format.hasOwnProperty(str)) {
      var out = format[str](s) || '';

      if (str !== 'json') {
        out = String(out);

        if (str !== 'ampm') {
          out = fns.titleCase(out);
        }
      }

      return out;
    } //support '{hour}:{minute}' notation


    if (str.indexOf('{') !== -1) {
      var sections = /\{(.+?)\}/g;
      str = str.replace(sections, function (_, fmt) {
        fmt = fmt.toLowerCase().trim();

        if (format.hasOwnProperty(fmt)) {
          return String(format[fmt](s));
        }

        return '';
      });
      return str;
    }

    return s.format('iso-short');
  };

  var format_1 = printFormat;

  var pad = fns.zeroPad;
  var formatTimezone = fns.formatTimezone; //parse this insane unix-time-templating thing, from the 19th century
  //http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
  //time-symbols we support

  var mapping = {
    G: function G(s) {
      return s.era();
    },
    GG: function GG(s) {
      return s.era();
    },
    GGG: function GGG(s) {
      return s.era();
    },
    GGGG: function GGGG(s) {
      return s.era() === 'AD' ? 'Anno Domini' : 'Before Christ';
    },
    //year
    y: function y(s) {
      return s.year();
    },
    yy: function yy(s) {
      //last two chars
      return parseInt(String(s.year()).substr(2, 4), 10);
    },
    yyy: function yyy(s) {
      return s.year();
    },
    yyyy: function yyyy(s) {
      return s.year();
    },
    yyyyy: function yyyyy(s) {
      return '0' + s.year();
    },
    // u: (s) => {},//extended non-gregorian years
    //quarter
    Q: function Q(s) {
      return s.quarter();
    },
    QQ: function QQ(s) {
      return s.quarter();
    },
    QQQ: function QQQ(s) {
      return s.quarter();
    },
    QQQQ: function QQQQ(s) {
      return s.quarter();
    },
    //month
    M: function M(s) {
      return s.month() + 1;
    },
    MM: function MM(s) {
      return pad(s.month() + 1);
    },
    MMM: function MMM(s) {
      return s.format('month-short');
    },
    MMMM: function MMMM(s) {
      return s.format('month');
    },
    //week
    w: function w(s) {
      return s.week();
    },
    ww: function ww(s) {
      return pad(s.week());
    },
    //week of month
    // W: (s) => s.week(),
    //date of month
    d: function d(s) {
      return s.date();
    },
    dd: function dd(s) {
      return pad(s.date());
    },
    //date of year
    D: function D(s) {
      return s.dayOfYear();
    },
    DD: function DD(s) {
      return pad(s.dayOfYear());
    },
    DDD: function DDD(s) {
      return pad(s.dayOfYear(), 3);
    },
    // F: (s) => {},//date of week in month
    // g: (s) => {},//modified julian day
    //day
    E: function E(s) {
      return s.format('day-short');
    },
    EE: function EE(s) {
      return s.format('day-short');
    },
    EEE: function EEE(s) {
      return s.format('day-short');
    },
    EEEE: function EEEE(s) {
      return s.format('day');
    },
    EEEEE: function EEEEE(s) {
      return s.format('day')[0];
    },
    e: function e(s) {
      return s.day();
    },
    ee: function ee(s) {
      return s.day();
    },
    eee: function eee(s) {
      return s.format('day-short');
    },
    eeee: function eeee(s) {
      return s.format('day');
    },
    eeeee: function eeeee(s) {
      return s.format('day')[0];
    },
    //am/pm
    a: function a(s) {
      return s.ampm().toUpperCase();
    },
    aa: function aa(s) {
      return s.ampm().toUpperCase();
    },
    aaa: function aaa(s) {
      return s.ampm().toUpperCase();
    },
    aaaa: function aaaa(s) {
      return s.ampm().toUpperCase();
    },
    //hour
    h: function h(s) {
      return s.h12();
    },
    hh: function hh(s) {
      return pad(s.h12());
    },
    H: function H(s) {
      return s.hour();
    },
    HH: function HH(s) {
      return pad(s.hour());
    },
    // j: (s) => {},//weird hour format
    m: function m(s) {
      return s.minute();
    },
    mm: function mm(s) {
      return pad(s.minute());
    },
    s: function s(_s) {
      return _s.second();
    },
    ss: function ss(s) {
      return pad(s.second());
    },
    //milliseconds in the day
    A: function A(s) {
      return s.epoch - s.startOf('day').epoch;
    },
    //timezone
    z: function z(s) {
      return s.timezone().name;
    },
    zz: function zz(s) {
      return s.timezone().name;
    },
    zzz: function zzz(s) {
      return s.timezone().name;
    },
    zzzz: function zzzz(s) {
      return s.timezone().name;
    },
    Z: function Z(s) {
      return formatTimezone(s.timezone().current.offset);
    },
    ZZ: function ZZ(s) {
      return formatTimezone(s.timezone().current.offset);
    },
    ZZZ: function ZZZ(s) {
      return formatTimezone(s.timezone().current.offset);
    },
    ZZZZ: function ZZZZ(s) {
      return formatTimezone(s.timezone().current.offset, ':');
    }
  };

  var addAlias = function addAlias(_char, to, n) {
    var name = _char;
    var toName = to;

    for (var i = 0; i < n; i += 1) {
      mapping[name] = mapping[toName];
      name += _char;
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
  addAlias('V', 'Z', 4);

  var unixFmt = function unixFmt(s, str) {
    var chars = str.split(''); //combine consecutive chars, like 'yyyy' as one.

    var arr = [chars[0]];
    var quoteOn = false;

    for (var i = 1; i < chars.length; i += 1) {
      //support quoted substrings
      if (chars[i] === "'") {
        quoteOn = !quoteOn; //support '', meaning one tick

        if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
          quoteOn = true;
        } else {
          continue;
        }
      } //merge it with the last one


      if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
        arr[arr.length - 1] += chars[i];
      } else {
        arr.push(chars[i]);
      }
    }

    return arr.reduce(function (txt, c) {
      if (mapping[c] !== undefined) {
        txt += mapping[c](s) || '';
      } else {
        txt += c;
      }

      return txt;
    }, '');
  };

  var unixFmt_1 = unixFmt;

  var units$1 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

  var doUnit = function doUnit(s, k) {
    var start = s.clone().startOf(k);
    var end = s.clone().endOf(k);
    var duration = end.epoch - start.epoch;
    var percent = (s.epoch - start.epoch) / duration;
    return parseFloat(percent.toFixed(2));
  }; //how far it is along, from 0-1


  var progress = function progress(s, unit) {
    if (unit) {
      unit = fns.normalize(unit);
      return doUnit(s, unit);
    }

    var obj = {};
    units$1.forEach(function (k) {
      obj[k] = doUnit(s, k);
    });
    return obj;
  };

  var progress_1 = progress;

  var nearest = function nearest(s, unit) {
    //how far have we gone?
    var prog = s.progress();
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

  var nearest_1 = nearest;

  //increment until dates are the same
  var climb = function climb(a, b, unit) {
    var i = 0;
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


  var diffOne = function diffOne(a, b, unit) {
    if (a.isBefore(b)) {
      return climb(a, b, unit);
    } else {
      return climb(b, a, unit) * -1; //reverse it
    }
  };

  var one = diffOne;

  // 2020 - 2019 may be 1 year, or 0 years
  // - '1 year difference' means 366 days during a leap year

  var fastYear = function fastYear(a, b) {
    var years = b.year() - a.year(); // should we decrement it by 1?

    a = a.year(b.year());

    if (a.isAfter(b)) {
      years -= 1;
    }

    return years;
  }; // use a waterfall-method for computing a diff of any 'pre-knowable' units
  // compute years, then compute months, etc..
  // ... then ms-math for any very-small units


  var diff = function diff(a, b) {
    // an hour is always the same # of milliseconds
    // so these units can be 'pre-calculated'
    var msDiff = b.epoch - a.epoch;
    var obj = {
      milliseconds: msDiff,
      seconds: parseInt(msDiff / 1000, 10)
    };
    obj.minutes = parseInt(obj.seconds / 60, 10);
    obj.hours = parseInt(obj.minutes / 60, 10); //do the year

    var tmp = a.clone();
    obj.years = fastYear(tmp, b);
    tmp = a.add(obj.years, 'year'); //there's always 12 months in a year...

    obj.months = obj.years * 12;
    tmp = a.add(obj.months, 'month');
    obj.months += one(tmp, b, 'month'); // there's always atleast 52 weeks in a year..
    // (month * 4) isn't as close

    obj.weeks = obj.years * 52;
    tmp = a.add(obj.weeks, 'week');
    obj.weeks += one(tmp, b, 'week'); // there's always atleast 7 days in a week

    obj.days = obj.weeks * 7;
    tmp = a.add(obj.days, 'day');
    obj.days += one(tmp, b, 'day');
    return obj;
  };

  var waterfall = diff;

  var reverseDiff = function reverseDiff(obj) {
    Object.keys(obj).forEach(function (k) {
      obj[k] *= -1;
    });
    return obj;
  }; // this method counts a total # of each unit, between a, b.
  // '1 month' means 28 days in february
  // '1 year' means 366 days in a leap year


  var main = function main(a, b, unit) {
    b = fns.beADate(b, a); //reverse values, if necessary

    var reversed = false;

    if (a.isAfter(b)) {
      var tmp = a;
      a = b;
      b = tmp;
      reversed = true;
    } //compute them all (i know!)


    var obj = waterfall(a, b);

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

  var diff$1 = main;

  //our conceptual 'break-points' for each unit

  var qualifiers = {
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
    var isBefore = a.isBefore(b);
    var later = isBefore ? b : a;
    var earlier = isBefore ? a : b;
    earlier = earlier.clone();
    var diff = {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    Object.keys(diff).forEach(function (unit) {
      if (earlier.isSame(later, unit)) {
        return;
      }

      var max = earlier.diff(later, unit);
      earlier = earlier.add(max, unit);
      diff[unit] = max;
    }); //reverse it, if necessary

    if (isBefore) {
      Object.keys(diff).forEach(function (u) {
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


  var since = function since(start, end) {
    end = fns.beADate(end, start);
    var diff = getDiff(start, end);
    var isNow = Object.keys(diff).every(function (u) {
      return !diff[u];
    });

    if (isNow === true) {
      return {
        diff: diff,
        rounded: 'now',
        qualified: 'now',
        precise: 'now'
      };
    }

    var rounded;
    var qualified;
    var precise;
    var englishValues = []; //go through each value and create its text-representation

    Object.keys(diff).forEach(function (unit, i, units) {
      var value = Math.abs(diff[unit]);

      if (value === 0) {
        return;
      }

      var englishValue = pluralize(value, unit);
      englishValues.push(englishValue);

      if (!rounded) {
        rounded = qualified = englishValue;

        if (i > 4) {
          return;
        } //is it a 'almost' something, etc?


        var nextUnit = units[i + 1];
        var nextValue = Math.abs(diff[nextUnit]);

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
      diff: diff,
      rounded: rounded,
      qualified: qualified,
      precise: precise
    };
  };

  var since_1 = since;

  //https://www.timeanddate.com/calendar/aboutseasons.html
  // Spring - from March 1 to May 31;
  // Summer - from June 1 to August 31;
  // Fall (autumn) - from September 1 to November 30; and,
  // Winter - from December 1 to February 28 (February 29 in a leap year).
  var seasons = {
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

  var quarters = [null, [0, 1], //jan 1
  [3, 1], //apr 1
  [6, 1], //july 1
  [9, 1] //oct 1
  ];

  var units$2 = {
    minute: function minute(s) {
      walk_1(s, {
        second: 0,
        millisecond: 0
      });
      return s;
    },
    quarterhour: function quarterhour(s) {
      var minute = s.minutes();

      if (minute >= 45) {
        s = s.minutes(45);
      } else if (minute >= 30) {
        s = s.minutes(30);
      } else if (minute >= 15) {
        s = s.minutes(15);
      } else {
        s = s.minutes(0);
      }

      walk_1(s, {
        second: 0,
        millisecond: 0
      });
      return s;
    },
    hour: function hour(s) {
      walk_1(s, {
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    day: function day(s) {
      walk_1(s, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    week: function week(s) {
      var original = s.clone();
      s = s.day(s._weekStart); //monday

      if (s.isAfter(original)) {
        s = s.subtract(1, 'week');
      }

      walk_1(s, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    month: function month(s) {
      walk_1(s, {
        date: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    quarter: function quarter(s) {
      var q = s.quarter();

      if (quarters[q]) {
        walk_1(s, {
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
    season: function season(s) {
      var current = s.season();
      var hem = 'north';

      if (s.hemisphere() === 'South') {
        hem = 'south';
      }

      for (var i = 0; i < seasons[hem].length; i++) {
        if (seasons[hem][i][0] === current) {
          //winter goes between years
          var year = s.year();

          if (current === 'winter' && s.month() < 3) {
            year -= 1;
          }

          walk_1(s, {
            year: year,
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
    year: function year(s) {
      walk_1(s, {
        month: 0,
        date: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    decade: function decade(s) {
      s = s.startOf('year');
      var year = s.year();
      var decade = parseInt(year / 10, 10) * 10;
      s = s.year(decade);
      return s;
    },
    century: function century(s) {
      s = s.startOf('year');
      var year = s.year(); // near 0AD goes '-1 | +1'

      var decade = parseInt(year / 100, 10) * 100;
      s = s.year(decade);
      return s;
    }
  };
  units$2.date = units$2.day;

  var startOf = function startOf(a, unit) {
    var s = a.clone();
    unit = fns.normalize(unit);

    if (units$2[unit]) {
      return units$2[unit](s);
    }

    if (unit === 'summer' || unit === 'winter') {
      s = s.season(unit);
      return units$2.season(s);
    }

    return s;
  }; //piggy-backs off startOf


  var endOf = function endOf(a, unit) {
    var s = a.clone();
    unit = fns.normalize(unit);

    if (units$2[unit]) {
      s = units$2[unit](s);
      s = s.add(1, unit);
      s = s.subtract(1, 'milliseconds');
      return s;
    }

    return s;
  };

  var startOf_1 = {
    startOf: startOf,
    endOf: endOf
  };

  var isDay = function isDay(unit) {
    if (days["short"]().find(function (s) {
      return s === unit;
    })) {
      return true;
    }

    if (days["long"]().find(function (s) {
      return s === unit;
    })) {
      return true;
    }

    return false;
  }; // return a list of the weeks/months/days between a -> b
  // returns spacetime objects in the timezone of the input


  var every = function every(start) {
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var end = arguments.length > 2 ? arguments[2] : undefined;

    if (!unit || !end) {
      return [];
    } //cleanup unit param


    unit = fns.normalize(unit); //cleanup to param

    end = start.clone().set(end); //swap them, if they're backwards

    if (start.isAfter(end)) {
      var tmp = start;
      start = end;
      end = tmp;
    } //support 'every wednesday'


    var d = start.clone();

    if (isDay(unit)) {
      d = d.next(unit);
      unit = 'week';
    } else {
      d = d.next(unit);
    } //okay, actually start doing it


    var result = [];

    while (d.isBefore(end)) {
      result.push(d);
      d = d.add(1, unit);
    }

    return result;
  };

  var every_1 = every;

  var parseDst = function parseDst(dst) {
    if (!dst) {
      return [];
    }

    return dst.split('->');
  };

  var titleCase = function titleCase(str) {
    str = str[0].toUpperCase() + str.substr(1);
    str = str.replace(/\/gmt/, '/GMT');
    str = str.replace(/[\/_]([a-z])/gi, function (s) {
      return s.toUpperCase();
    });
    return str;
  }; //get metadata about this timezone


  var timezone = function timezone(s) {
    var zones = s.timezones;
    var tz = s.tz;

    if (zones.hasOwnProperty(tz) === false) {
      tz = find(s.tz, zones);
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

    var found = zones[tz];
    var result = {
      name: titleCase(tz),
      hasDst: Boolean(found.dst),
      default_offset: found.offset,
      //do north-hemisphere version as default (sorry!)
      hemisphere: found.hem === 's' ? 'South' : 'North',
      current: {}
    };

    if (result.hasDst) {
      var arr = parseDst(found.dst);
      result.change = {
        start: arr[0],
        back: arr[1]
      };
    } //find the offsets for summer/winter times
    //(these variable names are north-centric)


    var summer = found.offset; // (july)

    var winter = summer; // (january) assume it's the same for now

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
    } else if (summerTime(s.epoch, result.change.start, result.change.back, summer, winter) === true) {
      result.current.offset = summer;
      result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
    } else {
      //use 'winter' january-time
      result.current.offset = winter;
      result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
    }

    return result;
  };

  var timezone_1 = timezone;

  var units$3 = ['century', 'decade', 'year', 'month', 'date', 'day', 'hour', 'minute', 'second', 'millisecond']; //the spacetime instance methods (also, the API)

  var methods = {
    set: function set(input$1, tz) {
      var s = this.clone();
      s = input(s, input$1, null);

      if (tz) {
        this.tz = find(tz);
      }

      return s;
    },
    timezone: function timezone() {
      return timezone_1(this);
    },
    isDST: function isDST() {
      return timezone_1(this).current.isDST;
    },
    hasDST: function hasDST() {
      return timezone_1(this).hasDst;
    },
    offset: function offset() {
      return timezone_1(this).current.offset * 60;
    },
    hemisphere: function hemisphere() {
      return timezone_1(this).hemisphere;
    },
    format: function format(fmt) {
      return format_1(this, fmt);
    },
    unixFmt: function unixFmt(fmt) {
      return unixFmt_1(this, fmt);
    },
    startOf: function startOf(unit) {
      return startOf_1.startOf(this, unit);
    },
    endOf: function endOf(unit) {
      return startOf_1.endOf(this, unit);
    },
    leapYear: function leapYear() {
      var year = this.year();
      return fns.isLeapYear(year);
    },
    progress: function progress(unit) {
      return progress_1(this, unit);
    },
    nearest: function nearest(unit) {
      return nearest_1(this, unit);
    },
    diff: function diff(d, unit) {
      return diff$1(this, d, unit);
    },
    since: function since(d) {
      if (!d) {
        d = this.clone().set();
      }

      return since_1(this, d);
    },
    next: function next(unit) {
      var s = this.add(1, unit);
      return s.startOf(unit);
    },
    //the start of the previous year/week/century
    last: function last(unit) {
      var s = this.subtract(1, unit);
      return s.startOf(unit);
    },
    isValid: function isValid() {
      //null/undefined epochs
      if (!this.epoch && this.epoch !== 0) {
        return false;
      }

      return !isNaN(this.d.getTime());
    },
    //travel to this timezone
    "goto": function goto(tz) {
      var s = this.clone();
      s.tz = find(tz, s.timezones); //science!

      return s;
    },
    //get each week/month/day between a -> b
    every: function every(unit, to) {
      return every_1(this, unit, to);
    },
    isAwake: function isAwake() {
      var hour = this.hour(); //10pm -> 8am

      if (hour < 8 || hour > 22) {
        return false;
      }

      return true;
    },
    isAsleep: function isAsleep() {
      return !this.isAwake();
    },
    //pretty-printing
    log: function log() {
      console.log('');
      console.log(format_1(this, 'nice-short'));
      return this;
    },
    logYear: function logYear() {
      console.log('');
      console.log(format_1(this, 'full-short'));
      return this;
    },
    json: function json() {
      var _this = this;

      return units$3.reduce(function (h, unit) {
        h[unit] = _this[unit]();
        return h;
      }, {});
    },
    debug: function debug() {
      var tz = this.timezone();
      var date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
      date += '\n     - ' + this.format('time');
      console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
      return this;
    },
    //alias of 'since' but opposite - like moment.js
    from: function from(d) {
      d = this.clone().set(d);
      return d.since(this);
    },
    fromNow: function fromNow() {
      var d = this.clone().set(Date.now());
      return d.since(this);
    },
    weekStart: function weekStart(input) {
      //accept a number directly
      if (typeof input === 'number') {
        this._weekStart = input;
        return this;
      }

      if (typeof input === 'string') {
        // accept 'wednesday'
        input = input.toLowerCase().trim();
        var num = days["short"]().indexOf(input);

        if (num === -1) {
          num = days["long"]().indexOf(input);
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

  methods.inDST = methods.isDST;
  methods.round = methods.nearest;
  methods.each = methods.every;
  var methods_1 = methods;

  //these methods wrap around them.

  var isLeapYear$1 = fns.isLeapYear;

  var validate = function validate(n) {
    //handle number as a string
    if (typeof n === 'string') {
      n = parseInt(n, 10);
    }

    return n;
  };

  var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']; //reduce hostile micro-changes when moving dates by millisecond

  var confirm = function confirm(s, tmp, unit) {
    var n = order.indexOf(unit);
    var arr = order.slice(n, order.length);

    for (var i = 0; i < arr.length; i++) {
      var want = tmp[arr[i]]();
      s[arr[i]](want);
    }

    return s;
  };

  var set = {
    milliseconds: function milliseconds(s, n) {
      n = validate(n);
      var current = s.millisecond();
      var diff = current - n; //milliseconds to shift by

      return s.epoch - diff;
    },
    seconds: function seconds(s, n) {
      n = validate(n);
      var diff = s.second() - n;
      var shift = diff * milliseconds.second;
      return s.epoch - shift;
    },
    minutes: function minutes(s, n) {
      n = validate(n);
      var old = s.clone();
      var diff = s.minute() - n;
      var shift = diff * milliseconds.minute;
      s.epoch -= shift; // check against a screw-up
      // if (old.hour() != s.hour()) {
      //   walkTo(old, {
      //     minute: n
      //   })
      //   return old.epoch
      // }

      confirm(s, old, 'second');
      return s.epoch;
    },
    hours: function hours(s, n) {
      n = validate(n);

      if (n >= 24) {
        n = 24;
      } else if (n < 0) {
        n = 0;
      }

      var old = s.clone();
      var diff = s.hour() - n;
      var shift = diff * milliseconds.hour;
      s.epoch -= shift; // oops, did we change the day?

      if (s.date() !== old.date()) {
        s = old.clone();

        if (diff > 1) {
          diff -= 1;
        }

        if (diff < 1) {
          diff += 1;
        }

        shift = diff * milliseconds.hour;
        s.epoch -= shift;
      }

      walk_1(s, {
        hour: n
      });
      confirm(s, old, 'minute');
      return s.epoch;
    },
    //support setting time by '4:25pm' - this isn't very-well developed..
    time: function time(s, str) {
      var m = str.match(/([0-9]{1,2})[:h]([0-9]{1,2})(:[0-9]{1,2})? ?(am|pm)?/);

      if (!m) {
        //fallback to support just '2am'
        m = str.match(/([0-9]{1,2}) ?(am|pm)/);

        if (!m) {
          return s.epoch;
        }

        m.splice(2, 0, '0'); //add implicit 0 minutes

        m.splice(3, 0, ''); //add implicit seconds
      }

      var h24 = false;
      var hour = parseInt(m[1], 10);
      var minute = parseInt(m[2], 10);

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
      var sec = parseInt(m[3], 10) || 0;
      s = s.hour(hour);
      s = s.minute(minute);
      s = s.second(sec);
      s = s.millisecond(0);
      return s.epoch;
    },
    date: function date(s, n) {
      n = validate(n); //avoid setting february 31st

      if (n > 28) {
        var month = s.month();
        var max = monthLengths_1[month]; // support leap day in february

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

      walk_1(s, {
        date: n
      });
      return s.epoch;
    },
    //this one's tricky
    month: function month(s, n) {
      if (typeof n === 'string') {
        n = months.mapping()[n.toLowerCase()];
      }

      n = validate(n); //don't go past december

      if (n >= 12) {
        n = 11;
      }

      if (n <= 0) {
        n = 0;
      }

      var date = s.date(); //there's no 30th of february, etc.

      if (date > monthLengths_1[n]) {
        //make it as close as we can..
        date = monthLengths_1[n];
      }

      walk_1(s, {
        month: n,
        date: date
      });
      return s.epoch;
    },
    year: function year(s, n) {
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
      walk_1(s, {
        year: n
      });
      return s.epoch;
    },
    dayOfYear: function dayOfYear(s, n) {
      n = validate(n);
      var old = s.clone();
      n -= 1; //days are 1-based

      if (n <= 0) {
        n = 0;
      } else if (n >= 365) {
        n = 364;
      }

      s = s.startOf('year');
      s = s.add(n, 'day');
      confirm(s, old, 'hour');
      return s.epoch;
    }
  };

  var methods$1 = {
    millisecond: function millisecond(num) {
      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.milliseconds(s, num);
        return s;
      }

      return this.d.getMilliseconds();
    },
    second: function second(num) {
      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.seconds(s, num);
        return s;
      }

      return this.d.getSeconds();
    },
    minute: function minute(num) {
      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.minutes(s, num);
        return s;
      }

      return this.d.getMinutes();
    },
    hour: function hour(num) {
      var d = this.d;

      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.hours(s, num);
        return s;
      }

      return d.getHours();
    },
    //'3:30' is 3.5
    hourFloat: function hourFloat(num) {
      if (num !== undefined) {
        var s = this.clone();

        var _minute = num % 1;

        _minute = _minute * 60;

        var _hour = parseInt(num, 10);

        s.epoch = set.hours(s, _hour);
        s.epoch = set.minutes(s, _minute);
        return s;
      }

      var d = this.d;
      var hour = d.getHours();
      var minute = d.getMinutes();
      minute = minute / 60;
      return hour + minute;
    },
    // hour in 12h format
    hour12: function hour12(str) {
      var d = this.d;

      if (str !== undefined) {
        var s = this.clone();
        str = '' + str;
        var m = str.match(/^([0-9]+)(am|pm)$/);

        if (m) {
          var hour = parseInt(m[1], 10);

          if (m[2] === 'pm') {
            hour += 12;
          }

          s.epoch = set.hours(s, hour);
        }

        return s;
      } //get the hour


      var hour12 = d.getHours();

      if (hour12 > 12) {
        hour12 = hour12 - 12;
      }

      if (hour12 === 0) {
        hour12 = 12;
      }

      return hour12;
    },
    //some ambiguity here with 12/24h
    time: function time(str) {
      if (str !== undefined) {
        var s = this.clone();
        str = str.toLowerCase().trim();
        s.epoch = set.time(s, str);
        return s;
      }

      return "".concat(this.h12(), ":").concat(fns.zeroPad(this.minute())).concat(this.ampm());
    },
    // either 'am' or 'pm'
    ampm: function ampm(input) {
      var which = 'am';
      var hour = this.hour();

      if (hour >= 12) {
        which = 'pm';
      }

      if (typeof input !== 'string') {
        return which;
      } //okay, we're doing a setter


      var s = this.clone();
      input = input.toLowerCase().trim(); //ampm should never change the day
      // - so use `.hour(n)` instead of `.minus(12,'hour')`

      if (hour >= 12 && input === 'am') {
        //noon is 12pm
        hour -= 12;
        return s.hour(hour);
      }

      if (hour < 12 && input === 'pm') {
        hour += 12;
        return s.hour(hour);
      }

      return s;
    },
    //some hard-coded times of day, like 'noon'
    dayTime: function dayTime(str) {
      if (str !== undefined) {
        var times = {
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
        var s = this.clone();
        str = str || '';
        str = str.toLowerCase();

        if (times.hasOwnProperty(str) === true) {
          s = s.time(times[str]);
        }

        return s;
      }

      var h = this.hour();

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
    iso: function iso(num) {
      if (num !== undefined) {
        return this.set(num);
      }

      return this.format('iso');
    }
  };
  var _01Time = methods$1;

  var methods$2 = {
    // # day in the month
    date: function date(num) {
      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.date(s, num);
        return s;
      }

      return this.d.getDate();
    },
    //like 'wednesday' (hard!)
    day: function day(input) {
      if (input === undefined) {
        return this.d.getDay();
      }

      var original = this.clone();
      var want = input; // accept 'wednesday'

      if (typeof input === 'string') {
        input = input.toLowerCase();

        if (days.aliases.hasOwnProperty(input)) {
          want = days.aliases[input];
        } else {
          want = days["short"]().indexOf(input);

          if (want === -1) {
            want = days["long"]().indexOf(input);
          }
        }
      } //move approx


      var day = this.d.getDay();
      var diff = day - want;
      var s = this.subtract(diff, 'days'); //tighten it back up

      walk_1(s, {
        hour: original.hour(),
        minute: original.minute(),
        second: original.second()
      });
      return s;
    },
    //these are helpful name-wrappers
    dayName: function dayName(input) {
      if (input === undefined) {
        return days["long"]()[this.day()];
      }

      var s = this.clone();
      s = s.day(input);
      return s;
    },
    //either name or number
    month: function month(input) {
      if (input !== undefined) {
        var s = this.clone();
        s.epoch = set.month(s, input);
        return s;
      }

      return this.d.getMonth();
    }
  };
  var _02Date = methods$2;

  var clearMinutes = function clearMinutes(s) {
    s = s.minute(0);
    s = s.second(0);
    s = s.millisecond(1);
    return s;
  };

  var methods$3 = {
    // day 0-366
    dayOfYear: function dayOfYear(num) {
      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.dayOfYear(s, num);
        return s;
      } //days since newyears - jan 1st is 1, jan 2nd is 2...


      var sum = 0;
      var month = this.d.getMonth();
      var tmp; //count the num days in each month

      for (var i = 1; i <= month; i++) {
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
    week: function week(num) {
      // week-setter
      if (num !== undefined) {
        var s = this.clone();
        s = s.month(0);
        s = s.date(1);
        s = s.day('monday');
        s = clearMinutes(s); //first week starts first Thurs in Jan
        // so mon dec 28th is 1st week
        // so mon dec 29th is not the week

        if (s.monthName() === 'december' && s.date() >= 28) {
          s = s.add(1, 'week');
        }

        num -= 1; //1-based

        s = s.add(num, 'weeks');
        return s;
      } //find-out which week it is


      var tmp = this.clone();
      tmp = tmp.month(0);
      tmp = tmp.date(1);
      tmp = clearMinutes(tmp);
      tmp = tmp.day('monday'); //don't go into last-year

      if (tmp.monthName() === 'december' && tmp.date() >= 28) {
        tmp = tmp.add(1, 'week');
      } // is first monday the 1st?


      var toAdd = 1;

      if (tmp.date() === 1) {
        toAdd = 0;
      }

      tmp = tmp.minus(1, 'second');
      var thisOne = this.epoch; //if the week technically hasn't started yet

      if (tmp.epoch > thisOne) {
        return 1;
      } //speed it up, if we can


      var i = 0;
      var skipWeeks = this.month() * 4;
      tmp.epoch += milliseconds.week * skipWeeks;
      i += skipWeeks;

      for (; i < 52; i++) {
        if (tmp.epoch > thisOne) {
          return i + toAdd;
        }

        tmp = tmp.add(1, 'week');
      }

      return 52;
    },
    //'january'
    monthName: function monthName(input) {
      if (input === undefined) {
        return months["long"]()[this.month()];
      }

      var s = this.clone();
      s = s.month(input);
      return s;
    },
    //q1, q2, q3, q4
    quarter: function quarter(num) {
      if (num !== undefined) {
        if (typeof num === 'string') {
          num = num.replace(/^q/i, '');
          num = parseInt(num, 10);
        }

        if (quarters[num]) {
          var s = this.clone();
          var _month = quarters[num][0];
          s = s.month(_month);
          s = s.date(1);
          s = s.startOf('day');
          return s;
        }
      }

      var month = this.d.getMonth();

      for (var i = 1; i < quarters.length; i++) {
        if (month < quarters[i][0]) {
          return i - 1;
        }
      }

      return 4;
    },
    //spring, summer, winter, fall
    season: function season(input) {
      var hem = 'north';

      if (this.hemisphere() === 'South') {
        hem = 'south';
      }

      if (input !== undefined) {
        var s = this.clone();

        for (var i = 0; i < seasons[hem].length; i++) {
          if (input === seasons[hem][i][0]) {
            s = s.month(seasons[hem][i][1]);
            s = s.date(1);
            s = s.startOf('day');
          }
        }

        return s;
      }

      var month = this.d.getMonth();

      for (var _i = 0; _i < seasons[hem].length - 1; _i++) {
        if (month >= seasons[hem][_i][1] && month < seasons[hem][_i + 1][1]) {
          return seasons[hem][_i][0];
        }
      }

      return 'winter';
    },
    //the year number
    year: function year(num) {
      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.year(s, num);
        return s;
      }

      return this.d.getFullYear();
    },
    //bc/ad years
    era: function era(str) {
      if (str !== undefined) {
        var s = this.clone();
        str = str.toLowerCase(); //TODO: there is no year-0AD i think. may have off-by-1 error here

        var year = s.d.getFullYear(); //make '1992' into 1992bc..

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
    decade: function decade(input) {
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

        var year = Number(input);

        if (isNaN(year)) {
          return this;
        } // round it down to the decade


        year = Math.floor(year / 10) * 10;
        return this.year(year); //.startOf('decade')
      }

      return this.startOf('decade').year();
    },
    // 1950 -> 19+1
    century: function century(input) {
      if (input !== undefined) {
        if (typeof input === 'string') {
          input = input.replace(/([0-9])(th|rd|st|nd)/, '$1'); //fix ordinals

          input = input.replace(/([0-9]+) ?(b\.?c\.?|a\.?d\.?)/i, function (a, b, c) {
            if (c.match(/b\.?c\.?/i)) {
              b = '-' + b;
            }

            return b;
          });
          input = input.replace(/c$/, ''); //20thC
        }

        var year = Number(input);

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


      var num = this.startOf('century').year();
      num = Math.floor(num / 100);

      if (num < 0) {
        return num - 1;
      }

      return num + 1;
    },
    // 2019 -> 2+1
    millenium: function millenium(input) {
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

        var year = input * 1000; // there is no year 0

        if (year === 0) {
          year = 1;
        }

        return this.year(year);
      } // get the current millenium


      var num = Math.floor(this.year() / 1000);

      if (num >= 0) {
        num += 1;
      }

      return num;
    }
  };
  var _03Year = methods$3;

  var methods$4 = Object.assign({}, _01Time, _02Date, _03Year); //aliases

  methods$4.milliseconds = methods$4.millisecond;
  methods$4.seconds = methods$4.second;
  methods$4.minutes = methods$4.minute;
  methods$4.hours = methods$4.hour;
  methods$4.hour24 = methods$4.hour;
  methods$4.h12 = methods$4.hour12;
  methods$4.h24 = methods$4.hour24;
  methods$4.days = methods$4.day;

  var addMethods = function addMethods(Space) {
    //hook the methods into prototype
    Object.keys(methods$4).forEach(function (k) {
      Space.prototype[k] = methods$4[k];
    });
  };

  var query = addMethods;

  var isLeapYear$2 = fns.isLeapYear;

  var getMonthLength = function getMonthLength(month, year) {
    if (month === 1 && isLeapYear$2(year)) {
      return 29;
    }

    return monthLengths_1[month];
  }; //month is the one thing we 'model/compute'
  //- because ms-shifting can be off by enough


  var rollMonth = function rollMonth(want, old) {
    //increment year
    if (want.month > 0) {
      var years = parseInt(want.month / 12, 10);
      want.year = old.year() + years;
      want.month = want.month % 12;
    } else if (want.month < 0) {
      //decrement year
      var _years = Math.floor(Math.abs(want.month) / 13, 10);

      _years = Math.abs(_years) + 1;
      want.year = old.year() - _years; //ignore extras

      want.month = want.month % 12;
      want.month = want.month + 12;

      if (want.month === 12) {
        want.month = 0;
      }
    }

    return want;
  }; // briefly support day=-2 (this does not need to be perfect.)


  var rollDaysDown = function rollDaysDown(want, old, sum) {
    want.year = old.year();
    want.month = old.month();
    var date = old.date();
    want.date = date - Math.abs(sum);

    while (want.date < 1) {
      want.month -= 1;

      if (want.month < 0) {
        want.month = 11;
        want.year -= 1;
      }

      var max = getMonthLength(want.month, want.year);
      want.date += max;
    }

    return want;
  }; // briefly support day=33 (this does not need to be perfect.)


  var rollDaysUp = function rollDaysUp(want, old, sum) {
    var year = old.year();
    var month = old.month();
    var max = getMonthLength(month, year);

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

  // but briefly:
  // millisecond-math, and some post-processing covers most-things
  // we 'model' the calendar here only a little bit
  // and that usually works-out...

  var order$1 = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
  var keep = {
    second: order$1.slice(0, 1),
    minute: order$1.slice(0, 2),
    quarterhour: order$1.slice(0, 2),
    hour: order$1.slice(0, 3),
    date: order$1.slice(0, 4),
    month: order$1.slice(0, 4),
    quarter: order$1.slice(0, 4),
    season: order$1.slice(0, 4),
    year: order$1,
    decade: order$1,
    century: order$1
  };
  keep.week = keep.hour;
  keep.season = keep.date;
  keep.quarter = keep.date; // Units need to be dst adjuested

  var dstAwareUnits = {
    year: true,
    quarter: true,
    season: true,
    month: true,
    week: true,
    day: true
  };
  var keepDate = {
    month: true,
    quarter: true,
    season: true,
    year: true
  };

  var addMethods$1 = function addMethods(SpaceTime) {
    SpaceTime.prototype.add = function (num, unit) {
      var s = this.clone();

      if (!unit || num === 0) {
        return s; //don't bother
      }

      var old = this.clone();
      unit = fns.normalize(unit); // support 'fortnight' alias

      if (unit === 'fortnight') {
        num *= 2;
        unit = 'week';
      } //move forward by the estimated milliseconds (rough)


      if (milliseconds[unit]) {
        s.epoch += milliseconds[unit] * num;
      } else if (unit === 'week') {
        s.epoch += milliseconds.day * (num * 7);
      } else if (unit === 'quarter' || unit === 'season') {
        s.epoch += milliseconds.month * (num * 3);
      } else if (unit === 'season') {
        s.epoch += milliseconds.month * (num * 3);
      } else if (unit === 'quarterhour') {
        s.epoch += milliseconds.minute * 15 * num;
      } //now ensure our milliseconds/etc are in-line


      var want = {};

      if (keep[unit]) {
        keep[unit].forEach(function (u) {
          want[u] = old[u]();
        });
      }

      if (dstAwareUnits[unit]) {
        var diff = old.timezone().current.offset - s.timezone().current.offset;
        s.epoch += diff * 3600 * 1000;
      } //ensure month/year has ticked-over


      if (unit === 'month') {
        want.month = old.month() + num; //month is the one unit we 'model' directly

        want = _model.months(want, old);
      } //support coercing a week, too


      if (unit === 'week') {
        var sum = old.date() + num * 7;

        if (sum <= 28 && sum > 1) {
          want.date = sum;
        }
      } //support 25-hour day-changes on dst-changes
      else if (unit === 'date') {
          if (num < 0) {
            want = _model.daysBack(want, old, num);
          } else {
            //specify a naive date number, if it's easy to do...
            var _sum = old.date() + num; // ok, model this one too


            want = _model.days(want, old, _sum);
          } //manually punt it if we haven't moved at all..


          if (num !== 0 && old.isSame(s, 'day')) {
            want.date = old.date() + num;
          }
        } //ensure year has changed (leap-years)
        else if (unit === 'year') {
            var wantYear = old.year() + num;
            var haveYear = s.year();

            if (haveYear < wantYear) {
              s.epoch += milliseconds.day;
            } else if (haveYear > wantYear) {
              s.epoch += milliseconds.day;
            }
          } //these are easier
          else if (unit === 'decade') {
              want.year = s.year() + 10;
            } else if (unit === 'century') {
              want.year = s.year() + 100;
            } //keep current date, unless the month doesn't have it.


      if (keepDate[unit]) {
        var max = monthLengths_1[want.month];
        want.date = old.date();

        if (want.date > max) {
          want.date = max;
        }
      }

      walk_1(s, want);
      return s;
    }; //subtract is only add *-1


    SpaceTime.prototype.subtract = function (num, unit) {
      var s = this.clone();
      return s.add(num * -1, unit);
    }; //add aliases


    SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
    SpaceTime.prototype.plus = SpaceTime.prototype.add;
  };

  var add = addMethods$1;

  //make a string, for easy comparison between dates
  var print = {
    millisecond: function millisecond(s) {
      return s.epoch;
    },
    second: function second(s) {
      return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
    },
    minute: function minute(s) {
      return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
    },
    hour: function hour(s) {
      return [s.year(), s.month(), s.date(), s.hour()].join('-');
    },
    day: function day(s) {
      return [s.year(), s.month(), s.date()].join('-');
    },
    week: function week(s) {
      return [s.year(), s.week()].join('-');
    },
    month: function month(s) {
      return [s.year(), s.month()].join('-');
    },
    quarter: function quarter(s) {
      return [s.year(), s.quarter()].join('-');
    },
    year: function year(s) {
      return s.year();
    }
  };
  print.date = print.day;

  var addMethods$2 = function addMethods(SpaceTime) {
    SpaceTime.prototype.isSame = function (b, unit) {
      var tzAware = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var a = this;

      if (!unit) {
        return null;
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

  var addMethods$3 = function addMethods(SpaceTime) {
    var methods = {
      isAfter: function isAfter(d) {
        d = fns.beADate(d, this);
        var epoch = fns.getEpoch(d);

        if (epoch === null) {
          return null;
        }

        return this.epoch > epoch;
      },
      isBefore: function isBefore(d) {
        d = fns.beADate(d, this);
        var epoch = fns.getEpoch(d);

        if (epoch === null) {
          return null;
        }

        return this.epoch < epoch;
      },
      isEqual: function isEqual(d) {
        d = fns.beADate(d, this);
        var epoch = fns.getEpoch(d);

        if (epoch === null) {
          return null;
        }

        return this.epoch === epoch;
      },
      isBetween: function isBetween(start, end) {
        var isInclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        start = fns.beADate(start, this);
        end = fns.beADate(end, this);
        var startEpoch = fns.getEpoch(start);

        if (startEpoch === null) {
          return null;
        }

        var endEpoch = fns.getEpoch(end);

        if (endEpoch === null) {
          return null;
        }

        if (isInclusive) {
          return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end);
        }

        return startEpoch < this.epoch && this.epoch < endEpoch;
      }
    }; //hook them into proto

    Object.keys(methods).forEach(function (k) {
      SpaceTime.prototype[k] = methods[k];
    });
  };

  var compare = addMethods$3;

  var addMethods$4 = function addMethods(SpaceTime) {
    var methods = {
      i18n: function i18n(data) {
        //change the day names
        if (fns.isObject(data.days)) {
          days.set(data.days);
        } //change the month names


        if (fns.isObject(data.months)) {
          months.set(data.months);
        }
      }
    }; //hook them into proto

    Object.keys(methods).forEach(function (k) {
      SpaceTime.prototype[k] = methods[k];
    });
  };

  var i18n = addMethods$4;

  var timezones = unpack; //fake timezone-support, for fakers (es5 class)

  var SpaceTime = function SpaceTime(input$1, tz) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    //the holy moment
    this.epoch = null; //the shift for the given timezone

    this.tz = find(tz, timezones); //whether to output warnings to console

    this.silent = options.silent || true; // favour british interpretation of 02/02/2018, etc

    this.british = options.dmy || options.british; //does the week start on sunday, or monday:

    this._weekStart = 1; //default to monday

    if (options.weekStart !== undefined) {
      this._weekStart = options.weekStart;
    } // the reference today date object, (for testing)


    this._today = {};

    if (options.today !== undefined) {
      this._today = options.today;
    } //add getter/setters


    Object.defineProperty(this, 'd', {
      //return a js date object
      get: function get() {
        var offset = quick(this); //every computer is somewhere- get this computer's built-in offset

        var bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

        var shift = bias + offset * 60; //in minutes

        shift = shift * 60 * 1000; //in ms
        //remove this computer's offset

        var epoch = this.epoch + shift;
        var d = new Date(epoch);
        return d;
      }
    }); //add this data on the object, to allow adding new timezones

    Object.defineProperty(this, 'timezones', {
      get: function get() {
        return timezones;
      },
      set: function set(obj) {
        timezones = obj;
        return obj;
      }
    }); //parse the various formats

    var tmp = input(this, input$1, tz);
    this.epoch = tmp.epoch;
  }; //(add instance methods to prototype)


  Object.keys(methods_1).forEach(function (k) {
    SpaceTime.prototype[k] = methods_1[k];
  }); // ¯\_(ツ)_/¯

  SpaceTime.prototype.clone = function () {
    return new SpaceTime(this.epoch, this.tz, {
      silent: this.silent,
      weekStart: this._weekStart,
      today: this._today
    });
  }; //return native date object at the same epoch


  SpaceTime.prototype.toLocalDate = function () {
    return new Date(this.epoch);
  }; //append more methods


  query(SpaceTime);
  add(SpaceTime);
  same(SpaceTime);
  compare(SpaceTime);
  i18n(SpaceTime);
  var spacetime = SpaceTime;

  var whereIts = function whereIts(a, b) {
    var start = new spacetime(null);
    var end = new spacetime(null);
    start = start.time(a); //if b is undefined, use as 'within one hour'

    if (b) {
      end = end.time(b);
    } else {
      end = start.add(59, 'minutes');
    }

    var startHour = start.hour();
    var endHour = end.hour();
    var tzs = Object.keys(start.timezones).filter(function (tz) {
      if (tz.indexOf('/') === -1) {
        return false;
      }

      var m = new spacetime(null, tz);
      var hour = m.hour(); //do 'calendar-compare' not real-time-compare

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

  var whereIts_1 = whereIts;

  var _version = '6.12.1';

  var main$1 = function main(input, tz, options) {
    return new spacetime(input, tz, options);
  }; // set all properties of a given 'today' object


  var setToday = function setToday(s) {
    var today = s._today || {};
    Object.keys(today).forEach(function (k) {
      s = s[k](today[k]);
    });
    return s;
  }; //some helper functions on the main method


  main$1.now = function (tz, options) {
    var s = new spacetime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s;
  };

  main$1.today = function (tz, options) {
    var s = new spacetime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s.startOf('day');
  };

  main$1.tomorrow = function (tz, options) {
    var s = new spacetime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s.add(1, 'day').startOf('day');
  };

  main$1.yesterday = function (tz, options) {
    var s = new spacetime(new Date().getTime(), tz, options);
    s = setToday(s);
    return s.subtract(1, 'day').startOf('day');
  };

  main$1.extend = function (obj) {
    Object.keys(obj).forEach(function (k) {
      spacetime.prototype[k] = obj[k];
    });
    return this;
  }; //find tz by time


  main$1.whereIts = whereIts_1;
  main$1.version = _version; //aliases:

  main$1.plugin = main$1.extend;
  var src = main$1;

  return src;

})));
