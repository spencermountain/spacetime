/* spencermountain/spacetime 7.17.0 Apache-2.0 */
'use strict';

const isLeapYear = (year) => year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
const isObject = (input) => Object.prototype.toString.call(input) === "[object Object]";
const isBoolean = (input) => Object.prototype.toString.call(input) === "[object Boolean]";
const isDate = (d) => Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.valueOf());
const zeroPad = (str, len = 2) => {
  const pad = "0";
  str = str + "";
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
};
const titleCase$1 = (str) => {
  if (!str) {
    return "";
  }
  return str[0].toUpperCase() + str.substr(1);
};
const ordinal = (i) => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
};
const toCardinal = (str) => {
  str = String(str);
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, "$1");
  return parseInt(str, 10);
};
const normalize$2 = (str = "") => {
  str = str.toLowerCase().trim();
  str = str.replace(/ies$/, "y");
  str = str.replace(/s$/, "");
  str = str.replace(/-/g, "");
  if (str === "day" || str === "days") {
    return "date";
  }
  if (str === "min" || str === "mins") {
    return "minute";
  }
  return str;
};
const getEpoch = (tmp) => {
  if (typeof tmp === "number") {
    return tmp;
  }
  if (isDate(tmp)) {
    return tmp.getTime();
  }
  if (tmp.epoch || tmp.epoch === 0) {
    return tmp.epoch;
  }
  return null;
};
const beADate = (d, s) => {
  if (isObject(d) === false) {
    return s.clone().set(d);
  }
  return d;
};
const formatTimezone = (offset, delimiter = "") => {
  const sign = offset > 0 ? "+" : "-";
  const absOffset = Math.abs(offset);
  const hours = zeroPad(parseInt("" + absOffset, 10));
  const minutes = zeroPad(absOffset % 1 * 60);
  return `${sign}${hours}${delimiter}${minutes}`;
};

const warn = (s, message) => {
  if (s.silent === false) {
    console.warn(`Warn: ${message}`);
  }
};
const isoCalendar = (s, value) => {
  if (value.calendarId !== "iso8601") {
    warn(s, `Temporal calendar "${value.calendarId}" converted to iso8601`);
    return value.withCalendar("iso8601");
  }
  return value;
};
const incomplete = (input, T) => input instanceof T.PlainTime || input instanceof T.PlainYearMonth || input instanceof T.PlainMonthDay || input instanceof T.Duration;

const getTemporal = () => typeof globalThis === "undefined" ? void 0 : globalThis.Temporal;
const temporalZone = (s) => {
  const match = s.tz.match(/^etc\/gmt([+-][0-9]+(?:\.[0-9]+)?)$/i);
  return match ? formatTimezone(-Number(match[1]), ":") : s.timezone().name;
};
const inputTimezone = (input) => {
  const T = getTemporal();
  return T && input instanceof T.ZonedDateTime ? input.timeZoneId : void 0;
};
const parseTemporal = (s, input) => {
  const T = getTemporal();
  if (!T) {
    return null;
  }
  if (input instanceof T.ZonedDateTime || input instanceof T.Instant) {
    if (input instanceof T.ZonedDateTime) {
      input = isoCalendar(s, input);
    }
    if (input.epochNanoseconds % 1000000n !== 0n) {
      warn(s, "Temporal sub-millisecond precision discarded; use spacetime/temporal to preserve it");
    }
    s.epoch = input.epochMilliseconds;
    const native = input instanceof T.Instant ? input.toZonedDateTimeISO(temporalZone(s)) : input.withTimeZone(temporalZone(s));
    if (Math.round(s.offset() * 6e10) !== native.offsetNanoseconds) {
      warn(s, "Spacetime timezone rules differ from Temporal at this instant; use spacetime/temporal for native wall-clock values");
    }
    return s;
  }
  if (input instanceof T.PlainDate || input instanceof T.PlainDateTime) {
    return parseTemporal(s, isoCalendar(s, input).toZonedDateTime(temporalZone(s)));
  }
  if (incomplete(input, T)) {
    warn(s, "Temporal input requires a complete date; convert it to a PlainDateTime or ZonedDateTime first");
    s.epoch = null;
    return s;
  }
  return null;
};
const toTemporal = (s) => {
  const T = getTemporal();
  if (!T) {
    throw new Error("toTemporal() requires native Temporal (or a globally installed polyfill)");
  }
  if (!s.isValid()) {
    return null;
  }
  return T.Instant.fromEpochMilliseconds(Math.trunc(s.epoch)).toZonedDateTimeISO(temporalZone(s));
};

const MSEC_IN_HOUR = 60 * 60 * 1e3;
const toUtc = (dstChange, offset, year) => {
  const [month, rest] = dstChange.split("/");
  const [day, hour, minute = 0] = rest.split(":");
  return Date.UTC(year, month - 1, day, hour, minute) - offset * MSEC_IN_HOUR;
};
const inSummerTime = (epoch, start, end, summerOffset, winterOffset) => {
  const year = new Date(epoch).getUTCFullYear();
  const startUtc = toUtc(start, winterOffset, year);
  const endUtc = toUtc(end, summerOffset, year);
  return epoch >= startUtc && epoch < endUtc;
};

var getDstShift = (tz) => {
  if (tz === "australia/lord_howe" || tz === "australia/lhi") {
    return 0.5;
  }
  if (tz === "antarctica/troll") {
    return 2;
  }
  return 1;
};

const quickOffset = (s) => {
  const zones = s.timezones;
  const obj = zones[s.tz];
  if (obj === void 0) {
    console.warn("Warning: couldn't find timezone " + s.tz);
    return 0;
  }
  if (obj.dst === void 0) {
    return obj.offset;
  }
  const jul = obj.offset;
  const shift = getDstShift(s.tz);
  let dec = obj.offset + shift;
  if (obj.hem === "n") {
    dec = jul - shift;
  }
  const split = obj.dst.split("->");
  const inSummer = inSummerTime(s.epoch, split[0], split[1], jul, dec);
  if (inSummer === true) {
    return jul;
  }
  return dec;
};

const tzdbVersion = "2026f";
var data = {
  "9|s": "2/dili,2/jayapura",
  "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,2/yakutsk,11/palau,japan,rok",
  "9.5|s|04/05:03->10/04:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
  "9.5|s": "4/darwin,4/north",
  "8|s": "12/casey,2/makassar,4/perth,2/ujung_pandang,4/west",
  "8|n": "2/brunei,2/hong_kong,2/irkutsk,2/kuala_lumpur,2/kuching,2/macau,2/manila,2/shanghai,2/singapore,2/taipei,2/ulaanbaatar,2/chongqing,2/chungking,2/harbin,2/macao,2/ulan_bator,2/choibalsan,hongkong,prc,roc,singapore",
  "8.75|s": "4/eucla",
  "7|s": "12/davis,2/jakarta,2/pontianak,9/christmas",
  "7|n": "2/bangkok,2/barnaul,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/ho_chi_minh,2/tomsk,2/vientiane,2/saigon",
  "6|s": "9/chagos",
  "6|n": "2/bishkek,2/dhaka,2/omsk,2/thimphu,2/urumqi,2/dacca,2/kashgar,2/thimbu",
  "6.5|s": "9/cocos",
  "6.5|n": "2/yangon,2/rangoon",
  "5|s": "12/mawson,12/vostok,9/kerguelen",
  "5|n": "2/almaty,2/aqtau,2/aqtobe,2/ashgabat,2/atyrau,2/dushanbe,2/karachi,2/oral,2/qyzylorda,2/qostanay,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives,2/ashkhabad",
  "5.75|n": "2/kathmandu,2/katmandu",
  "5.5|n": "2/kolkata,2/colombo,2/calcutta",
  "4|s": "9/mahe,9/mauritius,9/reunion",
  "4|n": "2/baku,2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk",
  "4.5|n": "2/kabul",
  "3|s": "0/dar_es_salaam,0/nairobi,12/syowa,9/antananarivo,9/comoro,9/mayotte",
  "3|n|04/24:00->10/29:24": "0/cairo,egypt",
  "3|n|03/29:03->10/25:04": "2/famagusta,2/nicosia,8/athens,8/bucharest,8/chisinau,8/helsinki,8/kyiv,8/mariehamn,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye,8/nicosia,8/tiraspol,8/kiev,eet",
  "3|n|03/29:00->10/24:24": "2/beirut",
  "3|n|03/28:02->10/24:02": "2/gaza,2/hebron",
  "3|n|03/27:02->10/25:02": "2/jerusalem,2/tel_aviv,israel",
  "3|n": "0/addis_ababa,0/asmara,0/asmera,0/djibouti,0/kampala,0/mogadishu,2/aden,2/amman,2/baghdad,2/bahrain,2/damascus,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,8/volgograd,2/volgograd,2/istanbul,turkey,w-su",
  "3.5|n": "2/tehran,iran",
  "2|s": "0/blantyre,0/bujumbura,0/gaborone,0/harare,0/johannesburg,0/kigali,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane,0/windhoek",
  "2|n|03/29:02->10/25:03": "0/ceuta,arctic/longyearbyen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich,3/jan_mayen,poland,cet,met",
  "2|n|03/29:01->10/25:03": "12/troll",
  "2|n": "0/juba,0/khartoum,0/tripoli,8/kaliningrad,libya",
  "1|s": "0/brazzaville,0/kinshasa,0/luanda",
  "1|n|03/29:01->10/25:02": "3/canary,3/faroe,3/madeira,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london,3/faeroe,eire,8/belfast,gb-eire,gb,portugal,wet",
  "1|n": "0/algiers,0/bangui,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
  "14|n": "11/kiritimati",
  "13|s": "11/apia,11/enderbury,11/kanton,11/fakaofo,11/tongatapu",
  "12|s|04/05:03->09/27:02": "12/mcmurdo,11/auckland,12/south_pole,nz",
  "12|s": "11/fiji,11/funafuti,11/nauru,11/wallis",
  "12|n": "2/anadyr,2/kamchatka,11/kwajalein,11/majuro,11/tarawa,11/wake,kwajalein",
  "12.75|s|04/05:03:45->09/27:02:45": "11/chatham,nz-chat",
  "11|s|04/05:03->10/04:02": "11/norfolk",
  "11|s": "11/bougainville,11/efate,11/guadalcanal,11/noumea",
  "11|n": "2/magadan,2/sakhalin,2/srednekolymsk,11/kosrae,11/pohnpei,11/ponape",
  "10|s|04/05:03->10/04:02": "12/macquarie,4/currie,4/hobart,4/melbourne,4/sydney,4/act,4/canberra,4/nsw,4/tasmania,4/victoria",
  "10|s": "12/dumontdurville,4/brisbane,4/lindeman,11/port_moresby,4/queensland",
  "10|n": "2/ust-nera,2/vladivostok,11/guam,11/saipan,11/chuuk,11/truk,11/yap",
  "10.5|s|04/05:02->10/04:02": "4/lord_howe,4/lhi",
  "0|s": "0/casablanca,0/el_aaiun,3/st_helena",
  "0|n|03/29:00->10/25:01": "3/azores",
  "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,1/danmarkshavn,3/reykjavik,13/gmt,13/utc,0/timbuktu,13/greenwich,13/uct,13/universal,13/zulu,gmt-0,gmt+0,gmt0,greenwich,iceland,uct,universal,utc,zulu,13/unknown,factory",
  "-9|s": "11/gambier",
  "-9|n|03/08:02->11/01:02": "1/adak,1/atka,us/aleutian",
  "-9.5|s": "11/marquesas",
  "-8|s": "11/pitcairn",
  "-8|n|03/08:02->11/01:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat,us/alaska",
  "-7|n|03/08:02->11/01:02": "1/los_angeles,1/santa_isabel,1/tijuana,1/ensenada,10/bajanorte,us/pacific-new,us/pacific,pst8pdt",
  "-7|n": "1/creston,1/dawson,1/dawson_creek,1/fort_nelson,1/hermosillo,1/mazatlan,1/phoenix,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajasur,us/arizona,mst",
  "-6|s|04/04:22->09/05:22": "11/easter,7/easterisland",
  "-6|s": "11/galapagos",
  "-6|n|03/08:02->11/01:02": "1/boise,1/cambridge_bay,1/denver,1/ciudad_juarez,1/shiprock,navajo,us/mountain,mst7mdt",
  "-6|n": "1/bahia_banderas,1/belize,1/chihuahua,1/costa_rica,1/edmonton,1/el_salvador,1/guatemala,1/inuvik,1/managua,1/merida,1/mexico_city,1/monterrey,1/regina,1/swift_current,1/tegucigalpa,1/yellowknife,6/east-saskatchewan,6/mountain,6/saskatchewan,10/general",
  "-5|s": "1/eirunepe,1/guayaquil,1/lima,1/rio_branco,1/porto_acre,5/acre",
  "-5|n|03/08:02->11/01:02": "1/chicago,1/matamoros,1/menominee,1/north_dakota,1/ojinaga,1/rankin_inlet,1/resolute,1/indiana/knox,1/indiana/tell_city,1/north_dakota/beulah,1/north_dakota/center,1/north_dakota/new_salem,1/knox_in,us/central,us/indiana-starke,cst6cdt",
  "-5|n": "1/bogota,1/cancun,1/cayman,1/coral_harbour,1/jamaica,1/panama,1/rainy_river,1/winnipeg,1/atikokan,6/central,jamaica,est",
  "-4|s|04/04:24->09/06:00": "1/santiago,7/continental",
  "-4|s": "1/campo_grande,1/cuiaba,1/la_paz,1/manaus,1/porto_velho,5/west",
  "-4|n|03/08:02->11/01:02": "1/detroit,1/grand_turk,1/indiana,1/indianapolis,1/iqaluit,1/kentucky,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,1/indiana/marengo,1/indiana/petersburg,1/indiana/vevay,1/indiana/vincennes,1/indiana/winamac,1/kentucky/monticello,1/fort_wayne,1/indiana/indianapolis,1/kentucky/louisville,6/eastern,us/east-indiana,us/eastern,us/michigan,est5edt",
  "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/havana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin,cuba",
  "-3|s": "1/araguaina,1/argentina,1/asuncion,1/bahia,1/belem,1/buenos_aires,1/catamarca,1/cordoba,1/coyhaique,1/fortaleza,1/jujuy,1/maceio,1/mendoza,1/montevideo,1/punta_arenas,1/recife,1/santarem,1/sao_paulo,12/palmer,12/rothera,3/stanley,1/argentina/la_rioja,1/argentina/rio_gallegos,1/argentina/salta,1/argentina/san_juan,1/argentina/san_luis,1/argentina/tucuman,1/argentina/ushuaia,1/argentina/comodrivadavia,1/argentina/buenos_aires,1/argentina/catamarca,1/argentina/cordoba,1/argentina/jujuy,1/argentina/mendoza,1/argentina/rosario,1/rosario,5/east",
  "-3|n|03/08:02->11/01:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
  "-3|n": "1/cayenne,1/paramaribo",
  "-2|s": "1/noronha,3/south_georgia,5/denoronha",
  "-2|n|03/08:02->11/01:02": "1/miquelon",
  "-2.5|n|03/08:02->11/01:02": "1/st_johns,6/newfoundland",
  "-1|n|03/28:23->10/24:24": "1/nuuk,1/scoresbysund,1/godthab",
  "-1|n": "3/cape_verde",
  "-11|s": "11/niue,11/pago_pago,11/samoa,us/samoa",
  "-11|n": "11/midway",
  "-10|s": "11/rarotonga,11/tahiti",
  "-10|n": "11/honolulu,11/johnston,us/hawaii,hst"
};

var prefixes = [
  "africa",
  "america",
  "asia",
  "atlantic",
  "australia",
  "brazil",
  "canada",
  "chile",
  "europe",
  "indian",
  "mexico",
  "pacific",
  "antarctica",
  "etc"
];

const all = {};
Object.keys(data).forEach((k) => {
  const split = k.split("|");
  const obj = {
    offset: Number(split[0]),
    hem: split[1]
  };
  if (split[2]) {
    obj.dst = split[2];
  }
  const names = data[k].split(",");
  names.forEach((str) => {
    str = str.replace(/(^[0-9]+)\//, (before, num) => {
      num = Number(num);
      return prefixes[num] + "/";
    });
    all[str] = obj;
  });
});
all.utc = {
  offset: 0,
  hem: "n"
  //default to northern hemisphere - (sorry!)
};
for (let i = -14; i <= 14; i += 0.25) {
  let num = i;
  if (num > 0) {
    num = "+" + num;
  }
  let name = "etc/gmt" + num;
  all[name] = {
    offset: i * -1,
    //they're negative!
    hem: "n"
    //(sorry)
  };
  name = "utc/gmt" + num;
  all[name] = {
    offset: i * -1,
    hem: "n"
  };
}

const fallbackTZ = "utc";
const safeIntl = () => {
  if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
    return null;
  }
  const format = Intl.DateTimeFormat();
  if (typeof format === "undefined" || typeof format.resolvedOptions === "undefined") {
    return null;
  }
  const timezone = format.resolvedOptions().timeZone;
  if (!timezone) {
    return null;
  }
  return timezone.toLowerCase();
};
const guessTz = () => {
  const timezone = safeIntl();
  if (timezone === null) {
    return fallbackTZ;
  }
  return timezone;
};

const offsetPattern = /^(?:(utc|gmt)\s*)?([+-]?)(\d+)(?:(\.\d+)|:([0-5]\d))?(?:\s*(?:h|hrs?|hours?))?$/i;
const embeddedHours = /(?:^|\s)([+-]?\d+(?:\.\d+|:[0-5]\d)?\s*(?:h|hrs?|hours?))$/i;
const parseOffset$1 = (tz) => {
  const input = tz.trim();
  let match = input.match(offsetPattern);
  if (!match) {
    const embedded = input.match(embeddedHours);
    if (embedded) {
      match = embedded[1].match(offsetPattern);
    }
  }
  if (!match) {
    return null;
  }
  const [, prefix, sign, hours, fraction = "0", minutes = "0"] = match;
  let num = Number(hours) + Number(fraction) + Number(minutes) / 60;
  if (num > 14 || !Number.isInteger(num * 4)) {
    return null;
  }
  if (sign === "-") {
    num *= -1;
  }
  if (prefix == null || prefix.toLowerCase() !== "gmt") {
    num *= -1;
  }
  return "etc/gmt" + (num > 0 ? "+" : "") + num;
};

let local = guessTz();
const cities = Object.keys(all).reduce((h, k) => {
  let city = k.split("/").pop();
  city = city.replace(/_/g, " ");
  h[city] = k;
  return h;
}, {});
const normalize$1 = (tz) => {
  tz = tz.replace(/ time/g, "");
  tz = tz.replace(/ (standard|daylight|summer)/g, "");
  tz = tz.replace(/\b(east|west|north|south)ern/g, "$1");
  tz = tz.replace(/\b(africa|america|australia)n/g, "$1");
  tz = tz.replace(/\beuropean/g, "europe");
  tz = tz.replace(/islands/g, "island");
  return tz;
};
const lookupTz = (str, zones) => {
  if (!str) {
    if (!zones.hasOwnProperty(local)) {
      console.warn(`Unrecognized IANA id '${local}'. Setting fallback tz to UTC.`);
      local = "utc";
    }
    return local;
  }
  if (typeof str !== "string") {
    console.error("Timezone must be a string - recieved: '", str, "'\n");
  }
  let tz = str.trim();
  tz = tz.toLowerCase();
  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  }
  tz = normalize$1(tz);
  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  }
  if (cities.hasOwnProperty(tz) === true) {
    return cities[tz];
  }
  if (/[0-9]/.test(tz) === true) {
    const id = parseOffset$1(tz);
    if (id) {
      return id;
    }
  }
  throw new Error(
    "Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id."
  );
};

const defaults$1 = {
  year: (/* @__PURE__ */ new Date()).getFullYear(),
  month: 0,
  date: 1
};
const units$6 = ["year", "month", "date", "hour", "minute", "second", "millisecond"];
const parseArray$1 = (s, arr, today) => {
  if (arr.length === 0) {
    return s;
  }
  for (let i = 0; i < units$6.length; i++) {
    let num = arr[i];
    if (num == null) {
      num = today[units$6[i]];
    }
    if (num == null) {
      num = defaults$1[units$6[i]];
    }
    if (num == null) {
      num = 0;
    }
    s = s[units$6[i]](num);
  }
  return s;
};
const parseObject$1 = (s, obj) => {
  if (Object.keys(obj).length === 0) {
    return s;
  }
  obj = Object.assign({}, defaults$1, obj);
  if (obj.timezone) {
    s.tz = obj.timezone;
  }
  for (let i = 0; i < units$6.length; i++) {
    const unit = units$6[i];
    if (obj[unit] !== void 0) {
      s = s[unit](obj[unit]);
    }
  }
  return s;
};
const parseNumber$1 = function(s, input) {
  const minimumEpoch = 25e8;
  if (input > 0 && input < minimumEpoch && s.silent === false) {
    console.warn("  - Warning: You are setting the date to January 1970.");
    console.warn("       -   did input seconds instead of milliseconds?");
  }
  s.epoch = input;
  return s;
};
var fns = {
  parseArray: parseArray$1,
  parseObject: parseObject$1,
  parseNumber: parseNumber$1
};

const getNow = function(s) {
  s.epoch = Date.now();
  Object.keys(s._today || {}).forEach((k) => {
    if (typeof s[k] === "function") {
      s = s[k](s._today[k]);
    }
  });
  return s;
};
const dates = {
  now: (s) => {
    return getNow(s);
  },
  today: (s) => {
    return getNow(s);
  },
  tonight: (s) => {
    s = getNow(s);
    s = s.hour(18);
    return s;
  },
  tomorrow: (s) => {
    s = getNow(s);
    s = s.add(1, "day");
    s = s.startOf("day");
    return s;
  },
  yesterday: (s) => {
    s = getNow(s);
    s = s.subtract(1, "day");
    s = s.startOf("day");
    return s;
  },
  christmas: (s) => {
    const year = getNow(s).year();
    s = s.set([year, 11, 25, 18, 0, 0]);
    return s;
  },
  "new years": (s) => {
    const year = getNow(s).year();
    s = s.set([year, 11, 31, 18, 0, 0]);
    return s;
  }
};
dates["new years eve"] = dates["new years"];

const normalize = function(str) {
  str = str.replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i, "");
  str = str.replace(/([0-9])(th|rd|st|nd)/, "$1");
  str = str.replace(/,/g, "");
  str = str.replace(/ +/g, " ").trim();
  return str;
};

const monthLengths = [
  31,
  // January - 31 days
  28,
  // February - 28 days in a common year and 29 days in leap years
  31,
  // March - 31 days
  30,
  // April - 30 days
  31,
  // May - 31 days
  30,
  // June - 30 days
  31,
  // July - 31 days
  31,
  // August - 31 days
  30,
  // September - 30 days
  31,
  // October - 31 days
  30,
  // November - 30 days
  31
  // December - 31 days
];

const parseMs = function(str = "") {
  str = String(str);
  if (str.length > 3) {
    str = str.substring(0, 3);
  } else if (str.length === 1) {
    str = str + "00";
  } else if (str.length === 2) {
    str = str + "0";
  }
  return Number(str) || 0;
};
const parseTime = (s, str = "") => {
  str = str.trim().toLowerCase();
  if (!str) {
    return s.startOf("day");
  }
  let arr = str.match(/^([0-9]{1,2}):([0-9]{2})(?::([0-9]{1,2}))?(?:[:.]([0-9]+))?(?: ?(am|pm|gmt))?$/);
  if (arr !== null) {
    const [, hour, minute, sec, ms, suffix] = arr;
    const h = Number(hour);
    const m = Number(minute);
    const ampm = suffix === "am" || suffix === "pm";
    if (h > 23 || m > 59 || Number(sec || 0) > 59 || ampm && (h < 1 || h > 12)) {
      s.epoch = null;
      return s;
    }
    s = s.hour(h);
    s = s.minute(m);
    s = s.seconds(sec || 0);
    s = s.millisecond(parseMs(ms));
    if (ampm) {
      s = s.ampm(suffix);
    }
    return s;
  }
  arr = str.match(/^([0-9]{1,2}) ?(am|pm)$/);
  if (arr !== null && arr[1]) {
    const h = Number(arr[1]);
    if (h > 12 || h < 1) {
      s.epoch = null;
      return s;
    }
    s = s.hour(arr[1] || 0);
    s = s.ampm(arr[2]);
    s = s.startOf("hour");
    return s;
  }
  s.epoch = null;
  return s;
};

let shortMonths = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];
let longMonths = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];
function buildMapping() {
  const obj = {
    sep: 8
    //support this format
  };
  for (let i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i;
  }
  for (let i = 0; i < longMonths.length; i++) {
    obj[longMonths[i]] = i;
  }
  return obj;
}
function short$1() {
  return shortMonths;
}
function long$1() {
  return longMonths;
}
function mapping$1() {
  return buildMapping();
}
function set$5(i18n) {
  shortMonths = i18n.short || shortMonths;
  longMonths = i18n.long || longMonths;
}

const months$1 = mapping$1();
const validate$1 = (obj) => {
  if (monthLengths.hasOwnProperty(obj.month) !== true || Number(obj.date) < 1) {
    return false;
  }
  if (obj.month === 1) {
    if (isLeapYear(Number(obj.year)) && Number(obj.date) <= 29) {
      return true;
    } else {
      return Number(obj.date) <= 28;
    }
  }
  const max = monthLengths[Number(obj.month)] || 0;
  if (Number(obj.date) <= max) {
    return true;
  }
  return false;
};
const parseYear = (str = "", today) => {
  str = str.trim();
  if (/^'?[0-9][0-9]$/.test(str) === true) {
    const num = Number(str.replace(/'/, ""));
    if (num > 50) {
      return 1900 + num;
    }
    return 2e3 + num;
  }
  let year = parseInt(str, 10);
  if (!year && today) {
    year = Number(today.year);
  }
  year = year || (/* @__PURE__ */ new Date()).getFullYear();
  return year;
};
const parseMonth = function(str) {
  str = str.toLowerCase().trim();
  if (str === "sept") {
    return months$1.sep;
  }
  return months$1[str];
};
const parseTz = function(str) {
  str = str.trim();
  str = str.replace(/[[\]]/g, "");
  return str;
};

const create$3 = (walkTo, parseOffset) => [
  // =====
  //  y-m-d
  // =====
  //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  // optionally supports Temporal fmt w/ [IANA]
  {
    // offset must start with 'Z' or a sign, so it shares no leading char with
    // the preceding time group ([0-9.:]+) -> no ambiguous split -> linear match.
    reg: /^(-?0{0,2}[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T ]([0-9.:]+)(Z|[+-][0-9:]+)?(\[[^[\]]*\])?(\[[^[\]]*\])?$/i,
    parse: (s, m) => {
      const obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: m[3]
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      if (m[6]) {
        const tz = parseTz(m[6]);
        if (tz) {
          s = s.timezone(tz);
        }
      } else {
        parseOffset(s, m[5]);
      }
      walkTo(s, obj);
      s = parseTime(s, m[4]);
      return s;
    }
  },
  //short-iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
  {
    reg: /^([0-9]{4})[\-/. ]([0-9]{1,2})[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      const obj = {
        year: m[1],
        month: parseInt(m[2], 10) - 1,
        date: parseInt(m[3], 10)
      };
      if (obj.month >= 12) {
        obj.date = parseInt(m[2], 10);
        obj.month = parseInt(m[3], 10) - 1;
      }
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      walkTo(s, obj);
      s = parseTime(s, m[4]);
      return s;
    }
  },
  //text-month "2015-feb-25"
  {
    reg: /^([0-9]{4})[\-/. ]([a-z]+)[\-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      const obj = {
        year: parseYear(m[1], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[3] || "")
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      walkTo(s, obj);
      s = parseTime(s, m[4]);
      return s;
    }
  }
];

const create$2 = (walkTo, parseOffset) => [
  // =====
  //  m-d-y
  // =====
  //mm/dd/yyyy or mm/dd/yy - "6/28/2019, 12:26:14 PM"
  {
    reg: /^([0-9]{1,2})[-/.]([0-9]{1,2})(?:[\-/.]([0-9]{4}|[0-9]{2}))?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
    parse: (s, arr) => {
      let month = parseInt(arr[1], 10) - 1;
      let date = parseInt(arr[2], 10);
      if (s.british || month >= 12) {
        date = parseInt(arr[1], 10);
        month = parseInt(arr[2], 10) - 1;
      }
      const obj = {
        date,
        month,
        year: parseYear(arr[3], s._today) || (/* @__PURE__ */ new Date()).getFullYear()
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      walkTo(s, obj);
      s = parseTime(s, arr[4]);
      return s;
    }
  },
  //alt short format - "feb-25-2015"
  {
    reg: /^([a-z]+)[\-/. ]([0-9]{1,2})[\-/. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, arr) => {
      const obj = {
        year: parseYear(arr[3], s._today),
        month: parseMonth(arr[1]),
        date: toCardinal(arr[2] || "")
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      walkTo(s, obj);
      s = parseTime(s, arr[4]);
      return s;
    }
  },
  //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
    parse: (s, arr) => {
      const obj = {
        year: parseYear(arr[3], s._today),
        month: parseMonth(arr[1]),
        date: toCardinal(arr[2] || "")
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      walkTo(s, obj);
      s = parseTime(s, arr[4]);
      return s;
    }
  },
  // 'Sun Mar 14 15:09:48 +0000 2021'
  {
    reg: /^([a-z]+) ([0-9]{1,2}) ([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2})( \+[0-9]{4})?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      const [, month, date, time, tz, year] = arr;
      const obj = {
        year: parseYear(year, s._today),
        month: parseMonth(month),
        date: toCardinal(date || "")
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      s = parseOffset(s, tz);
      walkTo(s, obj);
      s = parseTime(s, time);
      return s;
    }
  },
  // Date.toString() - 'Mon Jun 17 2019 11:00:00 GMT-0700 (Pacific Daylight Time)'
  // (the weekday is already stripped by normalize)
  {
    reg: /^([a-z]+) ([0-9]{1,2}) ([0-9]{4}) ([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2}) (?:gmt)?([+-][0-9]{4})/i,
    parse: (s, arr) => {
      const [, month, date, year, time, tz] = arr;
      const obj = {
        year: parseYear(year, s._today),
        month: parseMonth(month),
        date: toCardinal(date || "")
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      s = parseOffset(s, tz);
      walkTo(s, obj);
      s = parseTime(s, time);
      return s;
    }
  }
];

const create$1 = (walkTo) => [
  // =====
  //  d-m-y
  // =====
  //common british format - "25-feb-2015"
  {
    reg: /^([0-9]{1,2})[-/]([a-z]+)[\-/]?([0-9]{4})?$/i,
    parse: (s, m) => {
      const obj = {
        year: parseYear(m[3], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[1] || "")
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      walkTo(s, obj);
      s = parseTime(s, m[4]);
      return s;
    }
  },
  // "25 Mar 2015"
  {
    reg: /^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
    parse: (s, m) => {
      const obj = {
        year: parseYear(m[3], s._today),
        month: parseMonth(m[2]),
        date: toCardinal(m[1])
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      walkTo(s, obj);
      s = parseTime(s, m[4]);
      return s;
    }
  },
  // 01-jan-2020
  {
    reg: /^([0-9]{1,2})[. \-/]([a-z]+)[. \-/]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
    parse: (s, m) => {
      const obj = {
        date: Number(m[1]),
        month: parseMonth(m[2]),
        year: Number(m[3])
      };
      if (validate$1(obj) === false) {
        s.epoch = null;
        return s;
      }
      walkTo(s, obj);
      s = s.startOf("day");
      s = parseTime(s, m[4]);
      return s;
    }
  }
];

const create = (walkTo) => [
  // =====
  // no dates
  // =====
  // '2012-06' month-only
  {
    reg: /^([0-9]{4})[\-/]([0-9]{2})$/,
    parse: (s, m) => {
      const obj = {
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
  },
  //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: (s, arr) => {
      const obj = {
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
  },
  {
    // 'q2 2002'
    reg: /^(q[1-4])( of)?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      const quarter = arr[1] || "";
      s = s.quarter(quarter);
      let year = arr[3] || "";
      if (year) {
        year = year.trim();
        s = s.year(year);
      }
      return s;
    }
  },
  {
    // 'summer 2002'
    reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?$/i,
    parse: (s, arr) => {
      const season = arr[1] || "";
      s = s.season(season);
      let year = arr[3] || "";
      if (year) {
        year = year.trim();
        s = s.year(year);
      }
      return s;
    }
  },
  {
    // '200bc'
    reg: /^[0-9,]+ ?b\.?c\.?$/i,
    parse: (s, arr) => {
      let str = arr[0] || "";
      str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, "-$1");
      const d = /* @__PURE__ */ new Date();
      const obj = {
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
  },
  {
    // '200ad'
    reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
    parse: (s, arr) => {
      let str = arr[0] || "";
      str = str.replace(/,/g, "");
      const d = /* @__PURE__ */ new Date();
      const obj = {
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
  },
  {
    // '1992'
    reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
    parse: (s, arr) => {
      const today = s._today;
      if (today.month && !today.date) {
        today.date = 1;
      }
      const d = /* @__PURE__ */ new Date();
      const obj = {
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
  }
];

const o = {
  millisecond: 1
};
o.second = 1e3;
o.minute = 6e4;
o.hour = 36e5;
o.day = 864e5;
o.date = o.day;
o.month = 864e5 * 29.5;
o.week = 6048e5;
o.year = 3154e7;
Object.keys(o).forEach((k) => {
  o[k + "s"] = o[k];
});

const walk = (s, n, fn, unit, previous) => {
  const current = s.d[fn]();
  if (current === n) {
    return;
  }
  const startUnit = previous === null ? null : s.d[previous]();
  const original = s.epoch;
  const diff = n - current;
  s.epoch += o[unit] * diff;
  if (unit === "day") {
    if (Math.abs(diff) > 28 && n < 28) {
      s.epoch += o.hour;
    }
  }
  if (previous !== null && startUnit !== s.d[previous]()) {
    s.epoch = original;
  }
  const halfStep = o[unit] / 2;
  while (s.d[fn]() < n) {
    s.epoch += halfStep;
  }
  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  }
  if (previous !== null && startUnit !== s.d[previous]()) {
    s.epoch = original;
  }
};
const units$5 = {
  year: {
    valid: (n) => n > -4e3 && n < 4e3,
    walkTo: (s, n) => walk(s, n, "getUTCFullYear", "year", null)
  },
  month: {
    valid: (n) => n >= 0 && n <= 11,
    walkTo: (s, n) => {
      const d = s.d;
      const current = d.getUTCMonth();
      const original = s.epoch;
      const startUnit = d.getUTCFullYear();
      if (current === n) {
        return;
      }
      const diff = n - current;
      s.epoch += o.day * (diff * 28);
      if (startUnit !== s.d.getUTCFullYear()) {
        s.epoch = original;
      }
      while (s.d.getUTCMonth() < n) {
        s.epoch += o.day;
      }
      while (s.d.getUTCMonth() > n) {
        s.epoch -= o.day;
      }
    }
  },
  date: {
    valid: (n) => n > 0 && n <= 31,
    walkTo: (s, n) => walk(s, n, "getUTCDate", "day", "getUTCMonth")
  },
  hour: {
    valid: (n) => n >= 0 && n < 24,
    walkTo: (s, n) => walk(s, n, "getUTCHours", "hour", "getUTCDate")
  },
  minute: {
    valid: (n) => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, "getUTCMinutes", "minute", "getUTCHours")
  },
  second: {
    valid: (n) => n >= 0 && n < 60,
    walkTo: (s, n) => {
      s.epoch = s.seconds(n).epoch;
    }
  },
  millisecond: {
    valid: (n) => n >= 0 && n < 1e3,
    walkTo: (s, n) => {
      s.epoch = s.milliseconds(n).epoch;
    }
  }
};
const walkTo = (s, wants) => {
  const keys = Object.keys(units$5);
  const old = s.clone();
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    let n = wants[k];
    if (n === void 0) {
      n = old[k]();
    }
    if (typeof n === "string") {
      n = parseInt(n, 10);
    }
    if (!units$5[k].valid(n)) {
      s.epoch = null;
      if (s.silent === false) {
        console.warn("invalid " + k + ": " + n);
      }
      return;
    }
    units$5[k].walkTo(s, n);
  }
  return;
};

const parseOffset = (s, offset) => {
  if (!offset) {
    return s;
  }
  offset = offset.trim().toLowerCase();
  if (offset === "z") {
    s.tz = "etc/gmt";
    return s;
  }
  const match = offset.match(/^([+-]?)([0-9]{2})(?::?([0-9]{2}))?$/);
  if (!match) {
    return s;
  }
  const hours = Number(match[2]);
  const minutes = Number(match[3] || 0);
  if (minutes > 59) {
    return s;
  }
  let num = (hours + minutes / 60) * (match[1] === "-" ? -1 : 1);
  if (num === 0) {
    s.tz = "etc/gmt";
    return s;
  }
  num *= -1;
  const tz = "etc/gmt" + (num >= 0 ? "+" + num : num);
  const zones = s.timezones;
  if (zones[tz]) {
    s.tz = tz;
  }
  return s;
};

const parsers = [...create$3(walkTo, parseOffset), ...create$2(walkTo, parseOffset), ...create$1(walkTo), ...create(walkTo)];

const parseString = function(s, input, givenTz) {
  for (let i = 0; i < parsers.length; i++) {
    const m = input.match(parsers[i].reg);
    if (m) {
      const res = parsers[i].parse(s.clone(), m, givenTz);
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

const { parseArray, parseObject, parseNumber } = fns;
const defaults = {
  year: (/* @__PURE__ */ new Date()).getFullYear(),
  month: 0,
  date: 1
};
const parseInput = (s, input, timezone) => {
  const today = s._today || defaults;
  if (typeof input === "number") {
    return parseNumber(s, input);
  }
  s.epoch = Date.now();
  if (s._today && isObject(s._today) && Object.keys(s._today).length > 0) {
    const res = parseObject(s, today);
    if (res.isValid()) {
      s.epoch = res.epoch;
    }
  }
  if (input === null || input === void 0 || input === "") {
    return s;
  }
  const native = parseTemporal(s, input);
  if (native) {
    return native;
  }
  if (input instanceof Date) {
    s.epoch = input.getTime();
    return s;
  }
  if (Array.isArray(input)) {
    s = parseArray(s, input, today);
    return s;
  }
  if (isObject(input)) {
    if ("epoch" in input) {
      s.epoch = typeof input.epoch === "number" ? input.epoch : NaN;
      if (timezone == null && "tz" in input && input.tz) {
        s.tz = input.tz;
      }
      return s;
    }
    const obj = Object.assign({}, today, input);
    s = parseObject(s, obj);
    return s;
  }
  if (typeof input !== "string") {
    return s;
  }
  input = normalize(input);
  if (dates.hasOwnProperty(input) === true) {
    s = dates[input](s);
    return s;
  }
  return parseString(s, input);
};

let shortDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let longDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
function short() {
  return shortDays;
}
function long() {
  return longDays;
}
function set$4(i18n) {
  shortDays = i18n.short || shortDays;
  longDays = i18n.long || longDays;
}
const aliases$1 = {
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
};

let titleCaseEnabled = true;
function useTitleCase() {
  return titleCaseEnabled;
}
function set$3(val) {
  titleCaseEnabled = val;
}

const isoOffset = (s) => {
  const offset = s.timezone().current.offset;
  return !offset ? "Z" : formatTimezone(offset, ":");
};

const applyCaseFormat = (str) => {
  if (useTitleCase()) {
    return titleCase$1(str);
  }
  return str;
};
const padYear = (num) => {
  if (num >= 0) {
    return zeroPad(num, 4);
  } else {
    num = Math.abs(num);
    return "-" + zeroPad(num, 4);
  }
};
const format = {
  day: (s) => applyCaseFormat(s.dayName()),
  "day-short": (s) => applyCaseFormat(short()[s.day()]),
  "day-number": (s) => s.day(),
  "day-ordinal": (s) => ordinal(s.day()),
  "day-pad": (s) => zeroPad(s.day()),
  date: (s) => s.date(),
  "date-ordinal": (s) => ordinal(s.date()),
  "date-pad": (s) => zeroPad(s.date()),
  month: (s) => applyCaseFormat(s.monthName()),
  "month-short": (s) => applyCaseFormat(short$1()[s.month()]),
  "month-number": (s) => s.month(),
  "month-ordinal": (s) => ordinal(s.month()),
  "month-pad": (s) => zeroPad(s.month()),
  "iso-month": (s) => zeroPad(s.month() + 1),
  //1-based months
  year: (s) => {
    let year = s.year();
    if (year > 0) {
      return year;
    }
    year = Math.abs(year);
    return year + " BC";
  },
  "year-short": (s) => {
    let year = s.year();
    if (year > 0) {
      return `'${String(s.year()).substr(2, 4)}`;
    }
    year = Math.abs(year);
    return year + " BC";
  },
  "iso-year": (s) => {
    const year = s.year();
    const isNegative = year < 0;
    let str = zeroPad(Math.abs(year), 4);
    if (isNegative) {
      str = zeroPad(str, 6);
      str = "-" + str;
    }
    return str;
  },
  time: (s) => s.time(),
  "time-24": (s) => `${s.hour24()}:${zeroPad(s.minute())}`,
  hour: (s) => s.hour12(),
  "hour-pad": (s) => zeroPad(s.hour12()),
  "hour-24": (s) => s.hour24(),
  "hour-24-pad": (s) => zeroPad(s.hour24()),
  minute: (s) => s.minute(),
  "minute-pad": (s) => zeroPad(s.minute()),
  second: (s) => s.second(),
  "second-pad": (s) => zeroPad(s.second()),
  millisecond: (s) => s.millisecond(),
  "millisecond-pad": (s) => zeroPad(s.millisecond(), 3),
  ampm: (s) => s.ampm(),
  AMPM: (s) => s.ampm().toUpperCase(),
  quarter: (s) => "Q" + s.quarter(),
  season: (s) => s.season(),
  era: (s) => s.era(),
  json: (s) => s.json(),
  timezone: (s) => s.timezone().name,
  offset: (s) => isoOffset(s),
  numeric: (s) => `${s.year()}/${zeroPad(s.month() + 1)}/${zeroPad(s.date())}`,
  // yyyy/mm/dd
  "numeric-us": (s) => `${zeroPad(s.month() + 1)}/${zeroPad(s.date())}/${s.year()}`,
  // mm/dd/yyyy
  "numeric-uk": (s) => `${zeroPad(s.date())}/${zeroPad(s.month() + 1)}/${s.year()}`,
  //dd/mm/yyyy
  "mm/dd": (s) => `${zeroPad(s.month() + 1)}/${zeroPad(s.date())}`,
  //mm/dd
  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: (s) => {
    const year = s.format("iso-year");
    const month = zeroPad(s.month() + 1);
    const date = zeroPad(s.date());
    const hour = zeroPad(s.h24());
    const minute = zeroPad(s.minute());
    const second = zeroPad(s.second());
    const ms = zeroPad(s.millisecond(), 3);
    const offset = isoOffset(s);
    return `${year}-${month}-${date}T${hour}:${minute}:${second}.${ms}${offset}`;
  },
  "iso-short": (s) => {
    const month = zeroPad(s.month() + 1);
    const date = zeroPad(s.date());
    const year = padYear(s.year());
    return `${year}-${month}-${date}`;
  },
  "iso-utc": (s) => {
    return new Date(s.epoch).toISOString();
  },
  "iso-full": (s) => {
    let iso = s.format("iso");
    const iana = s.timezone().name;
    if (iana) {
      iso += `[${iana}]`;
    }
    return iso;
  },
  sql: (s) => {
    const year = s.format("iso-year");
    const month = zeroPad(s.month() + 1);
    const date = zeroPad(s.date());
    const hour = zeroPad(s.h24());
    const minute = zeroPad(s.minute());
    const second = zeroPad(s.second());
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  },
  //i made these up
  nice: (s) => `${short$1()[s.month()]} ${ordinal(s.date())}, ${s.time()}`,
  "nice-24": (s) => `${short$1()[s.month()]} ${ordinal(s.date())}, ${s.hour24()}:${zeroPad(
    s.minute()
  )}`,
  "nice-year": (s) => `${short$1()[s.month()]} ${ordinal(s.date())}, ${s.year()}`,
  "nice-day": (s) => `${short()[s.day()]} ${applyCaseFormat(short$1()[s.month()])} ${ordinal(
    s.date()
  )}`,
  "nice-full": (s) => `${s.dayName()} ${applyCaseFormat(s.monthName())} ${ordinal(s.date())}, ${s.time()}`,
  "nice-full-24": (s) => `${s.dayName()} ${applyCaseFormat(s.monthName())} ${ordinal(
    s.date()
  )}, ${s.hour24()}:${zeroPad(s.minute())}`
};
const aliases = {
  "day-name": "day",
  "month-name": "month",
  "iso 8601": "iso",
  "iso 9075": "sql",
  "time-h24": "time-24",
  "time-12": "time",
  "time-h12": "time",
  tz: "timezone",
  iana: "timezone",
  "day-num": "day-number",
  "month-num": "month-number",
  "month-iso": "iso-month",
  "year-iso": "iso-year",
  "nice-short": "nice",
  "nice-short-24": "nice-24",
  mdy: "numeric-us",
  dmy: "numeric-uk",
  ymd: "numeric",
  "yyyy/mm/dd": "numeric",
  "mm/dd/yyyy": "numeric-us",
  "dd/mm/yyyy": "numeric-us",
  "little-endian": "numeric-uk",
  "big-endian": "numeric",
  "day-nice": "nice-day"
};
Object.keys(aliases).forEach((k) => format[k] = format[aliases[k]]);
const printFormat = (s, str = "", overrides) => {
  if (s.isValid() !== true) {
    return "";
  }
  const formats = format;
  if (formats.hasOwnProperty(str)) {
    let out = formats[str](s) || "";
    if (str !== "json") {
      out = String(out);
      if (str.toLowerCase() !== "ampm") {
        out = applyCaseFormat(out);
      }
    }
    return out;
  }
  if (str.indexOf("{") !== -1) {
    const sections = /\{(.[^}\r\n\u2028\u2029]*)(\})?/g;
    str = str.replace(sections, (section, fmt, closing) => {
      if (!closing) {
        return section;
      }
      fmt = fmt.trim();
      if (fmt !== "AMPM") {
        fmt = fmt.toLowerCase();
      }
      if (formats.hasOwnProperty(fmt)) {
        const out = String(formats[fmt](s));
        if (fmt.toLowerCase() !== "ampm") {
          return applyCaseFormat(out);
        }
        return out;
      }
      return "";
    });
    return str;
  }
  return s.format("iso-short");
};

const mapping = {
  G: (s) => s.era(),
  GG: (s) => s.era(),
  GGG: (s) => s.era(),
  GGGG: (s) => s.era() === "AD" ? "Anno Domini" : "Before Christ",
  //year
  y: (s) => s.year(),
  yy: (s) => {
    return zeroPad(Number(String(s.year()).substr(2, 4)));
  },
  yyy: (s) => s.year(),
  yyyy: (s) => s.year(),
  yyyyy: (s) => "0" + s.year(),
  // u: (s) => {},//extended non-gregorian years
  //quarter
  Q: (s) => s.quarter(),
  QQ: (s) => s.quarter(),
  QQQ: (s) => s.quarter(),
  QQQQ: (s) => s.quarter(),
  //month
  M: (s) => s.month() + 1,
  MM: (s) => zeroPad(s.month() + 1),
  MMM: (s) => s.format("month-short"),
  MMMM: (s) => s.format("month"),
  //week
  w: (s) => s.week(),
  ww: (s) => zeroPad(s.week()),
  //week of month
  // W: (s) => s.week(),
  //date of month
  d: (s) => s.date(),
  dd: (s) => zeroPad(s.date()),
  //date of year
  D: (s) => s.dayOfYear(),
  DD: (s) => zeroPad(s.dayOfYear()),
  DDD: (s) => zeroPad(s.dayOfYear(), 3),
  // F: (s) => {},//date of week in month
  // g: (s) => {},//modified julian day
  //day
  E: (s) => s.format("day-short"),
  EE: (s) => s.format("day-short"),
  EEE: (s) => s.format("day-short"),
  EEEE: (s) => s.format("day"),
  EEEEE: (s) => s.format("day")[0],
  e: (s) => s.day(),
  ee: (s) => s.day(),
  eee: (s) => s.format("day-short"),
  eeee: (s) => s.format("day"),
  eeeee: (s) => s.format("day")[0],
  //am/pm
  a: (s) => s.ampm().toUpperCase(),
  aa: (s) => s.ampm().toUpperCase(),
  aaa: (s) => s.ampm().toUpperCase(),
  aaaa: (s) => s.ampm().toUpperCase(),
  //hour
  h: (s) => s.h12(),
  hh: (s) => zeroPad(s.h12()),
  H: (s) => s.hour(),
  HH: (s) => zeroPad(s.hour()),
  // j: (s) => {},//weird hour format
  m: (s) => s.minute(),
  mm: (s) => zeroPad(s.minute()),
  s: (s) => s.second(),
  ss: (s) => zeroPad(s.second()),
  //milliseconds
  SSS: (s) => zeroPad(s.millisecond(), 3),
  //milliseconds in the day
  A: (s) => s.epoch - s.startOf("day").epoch,
  //timezone
  z: (s) => s.timezone().name,
  zz: (s) => s.timezone().name,
  zzz: (s) => s.timezone().name,
  zzzz: (s) => s.timezone().name,
  Z: (s) => formatTimezone(s.timezone().current.offset),
  ZZ: (s) => formatTimezone(s.timezone().current.offset),
  ZZZ: (s) => formatTimezone(s.timezone().current.offset),
  ZZZZ: (s) => formatTimezone(s.timezone().current.offset, ":")
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
addAlias("q", "Q", 4);
addAlias("L", "M", 4);
addAlias("Y", "y", 4);
addAlias("c", "e", 4);
addAlias("k", "H", 2);
addAlias("K", "h", 2);
addAlias("S", "s", 2);
addAlias("v", "z", 4);
addAlias("V", "Z", 4);
const escapeChars = function(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === `'`) {
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
  return arr.filter((ch) => ch);
};
const combineRepeated = function(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const c = arr[i];
    for (let o = i + 1; o < arr.length; o += 1) {
      if (arr[o] === c) {
        arr[i] += arr[o];
        arr[o] = null;
      } else {
        break;
      }
    }
  }
  arr = arr.filter((ch) => ch);
  arr = arr.map((str) => {
    if (str === `''`) {
      str = `'`;
    }
    return str;
  });
  return arr;
};
const unixFmt = (s, str) => {
  let arr = str.split("");
  arr = escapeChars(arr);
  arr = combineRepeated(arr);
  return arr.reduce((txt, c) => {
    if (mapping[c] !== void 0) {
      txt += mapping[c](s) || "";
    } else {
      if (/^'.+'$/.test(c)) {
        c = c.replace(/'/g, "");
      }
      txt += c;
    }
    return txt;
  }, "");
};

const units$4 = ["year", "season", "quarter", "month", "week", "day", "quarterHour", "hour", "minute"];
const doUnit = function(s, k) {
  const start = s.clone().startOf(k);
  const end = s.clone().endOf(k);
  const duration = end.epoch - start.epoch;
  const percent = (s.epoch - start.epoch) / duration;
  return parseFloat(percent.toFixed(2));
};
const progress = (s, unit) => {
  if (unit) {
    unit = normalize$2(unit);
    return doUnit(s, unit);
  }
  const obj = {};
  units$4.forEach((k) => {
    obj[k] = doUnit(s, k);
  });
  return obj;
};

const units$3 = ["year", "season", "quarter", "month", "week", "date", "quarterhour", "hour", "minute"];
const nearest = (s, unit) => {
  unit = normalize$2(unit);
  if (!units$3.includes(unit)) {
    if (s.silent === false) {
      console.warn("no known unit '" + unit + "'");
    }
    return s;
  }
  const lower = s.startOf(unit);
  const upper = lower.add(1, unit);
  if (s.epoch - lower.epoch > upper.epoch - s.epoch) {
    return upper;
  }
  return lower;
};

const climb = (a, b, unit) => {
  let i = 0;
  let next = a.clone();
  while (next.isBefore(b)) {
    i += 1;
    next = a.add(i, unit);
  }
  if (next.isAfter(b, unit)) {
    i -= 1;
  }
  return i;
};
const diffOne = (a, b, unit) => {
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    return climb(b, a, unit) * -1;
  }
};

const fastYear = (a, b) => {
  let years = b.year() - a.year();
  a = a.year(b.year());
  if (a.isAfter(b)) {
    years -= 1;
  }
  return years;
};
const diff = function(a, b) {
  const msDiff = b.epoch - a.epoch;
  const obj = {
    milliseconds: msDiff,
    seconds: parseInt(msDiff / 1e3, 10)
  };
  obj.minutes = parseInt(obj.seconds / 60, 10);
  obj.hours = parseInt(obj.minutes / 60, 10);
  let tmp = a.clone();
  obj.years = fastYear(tmp, b);
  tmp = a.add(obj.years, "year");
  obj.months = obj.years * 12;
  tmp = a.add(obj.months, "month");
  obj.months += diffOne(tmp, b, "month");
  obj.quarters = obj.years * 4;
  obj.quarters += parseInt(obj.months % 12 / 3, 10);
  obj.weeks = obj.years * 52;
  tmp = a.add(obj.weeks, "week");
  obj.weeks += diffOne(tmp, b, "week");
  obj.days = obj.weeks * 7;
  tmp = a.add(obj.days, "day");
  obj.days += diffOne(tmp, b, "day");
  return obj;
};

const reverseDiff = function(obj) {
  Object.keys(obj).forEach((k) => {
    obj[k] *= -1;
  });
  return obj;
};
const main$1 = function(a, b, unit) {
  b = beADate(b, a);
  let reversed = false;
  if (a.isAfter(b)) {
    const tmp = a;
    a = b;
    b = tmp;
    reversed = true;
  }
  let obj = diff(a, b);
  if (reversed) {
    obj = reverseDiff(obj);
  }
  if (unit) {
    unit = normalize$2(unit);
    if (/s$/.test(unit) !== true) {
      unit += "s";
    }
    if (unit === "dates") {
      unit = "days";
    }
    return obj[unit];
  }
  return obj;
};

const fmt = (n) => Math.abs(n) || 0;
const toISO = function(diff) {
  let iso = "P";
  iso += fmt(diff.years) + "Y";
  iso += fmt(diff.months) + "M";
  iso += fmt(diff.days) + "DT";
  iso += fmt(diff.hours) + "H";
  iso += fmt(diff.minutes) + "M";
  iso += fmt(diff.seconds) + "S";
  return iso;
};

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
  Object.keys(diff).forEach((unit) => {
    if (earlier.isSame(later, unit)) {
      return;
    }
    const max = earlier.diff(later, unit);
    earlier = earlier.add(max, unit);
    diff[unit] = max;
  });
  if (isBefore) {
    Object.keys(diff).forEach((u) => {
      if (diff[u] !== 0) {
        diff[u] *= -1;
      }
    });
  }
  return diff;
}

let units$2 = {
  second: "second",
  seconds: "seconds",
  minute: "minute",
  minutes: "minutes",
  hour: "hour",
  hours: "hours",
  day: "day",
  days: "days",
  month: "month",
  months: "months",
  year: "year",
  years: "years"
};
function unitsString(unit) {
  return units$2[unit] || "";
}
function set$2(i18n = {}) {
  units$2 = {
    second: i18n.second || units$2.second,
    seconds: i18n.seconds || units$2.seconds,
    minute: i18n.minute || units$2.minute,
    minutes: i18n.minutes || units$2.minutes,
    hour: i18n.hour || units$2.hour,
    hours: i18n.hours || units$2.hours,
    day: i18n.day || units$2.day,
    days: i18n.days || units$2.days,
    month: i18n.month || units$2.month,
    months: i18n.months || units$2.months,
    year: i18n.year || units$2.year,
    years: i18n.years || units$2.years
  };
}

let past = "past";
let future = "future";
let present = "present";
let now = "now";
let almost = "almost";
let over = "over";
let pastDistance = (value) => `${value} ago`;
let futureDistance = (value) => `in ${value}`;
function pastDistanceString(value) {
  return pastDistance(value);
}
function futureDistanceString(value) {
  return futureDistance(value);
}
function pastString() {
  return past;
}
function futureString() {
  return future;
}
function presentString() {
  return present;
}
function nowString() {
  return now;
}
function almostString() {
  return almost;
}
function overString() {
  return over;
}
function set$1(i18n) {
  pastDistance = i18n.pastDistance || pastDistance;
  futureDistance = i18n.futureDistance || futureDistance;
  past = i18n.past || past;
  future = i18n.future || future;
  present = i18n.present || present;
  now = i18n.now || now;
  almost = i18n.almost || almost;
  over = i18n.over || over;
}

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
};
function pluralize(value, unit) {
  if (value === 1) {
    return value + " " + unitsString(unit.slice(0, -1));
  }
  return value + " " + unitsString(unit);
}
const toSoft = function(diff) {
  let rounded = null;
  let qualified = null;
  const abbreviated = [];
  const englishValues = [];
  Object.keys(diff).forEach((unit, i, units) => {
    const value = Math.abs(diff[unit]);
    if (value === 0) {
      return;
    }
    abbreviated.push(value + unit[0]);
    const englishValue = pluralize(value, unit);
    englishValues.push(englishValue);
    if (!rounded) {
      rounded = englishValue;
      qualified = englishValue;
      if (i > 4) {
        return;
      }
      const nextUnit = units[i + 1];
      const nextValue = Math.abs(diff[nextUnit]);
      if (nextValue > qualifiers[nextUnit].almost) {
        rounded = pluralize(value + 1, unit);
        qualified = almostString() + " " + rounded;
      } else if (nextValue > qualifiers[nextUnit].over) {
        qualified = overString() + " " + englishValue;
      }
    }
  });
  return { qualified, rounded, abbreviated, englishValues };
};

const since = (start, end) => {
  end = beADate(end, start);
  const diff = getDiff(start, end);
  const isNow = Object.keys(diff).every((u) => !diff[u]);
  if (isNow === true) {
    return {
      diff,
      rounded: nowString(),
      qualified: nowString(),
      precise: nowString(),
      abbreviated: [],
      iso: "P0Y0M0DT0H0M0S",
      direction: presentString()
    };
  }
  let precise;
  let direction = futureString();
  let { rounded, qualified } = toSoft(diff);
  const { englishValues, abbreviated } = toSoft(diff);
  precise = englishValues.splice(0, 2).join(", ");
  if (start.isAfter(end) === true) {
    rounded = pastDistanceString(rounded);
    qualified = pastDistanceString(qualified);
    precise = pastDistanceString(precise);
    direction = pastString();
  } else {
    rounded = futureDistanceString(rounded);
    qualified = futureDistanceString(qualified);
    precise = futureDistanceString(precise);
  }
  const iso = toISO(diff);
  return {
    diff,
    rounded,
    qualified,
    precise,
    abbreviated,
    iso,
    direction
  };
};

const north = [
  ["spring", 2, 1],
  ["summer", 5, 1],
  ["fall", 8, 1],
  ["autumn", 8, 1],
  ["winter", 11, 1]
  //dec 1
];
const south = [
  ["fall", 2, 1],
  ["autumn", 2, 1],
  ["winter", 5, 1],
  ["spring", 8, 1],
  ["summer", 11, 1]
  //dec 1
];
var seasons = { north, south };

var quarters = [
  null,
  [0, 1],
  //jan 1
  [3, 1],
  //apr 1
  [6, 1],
  //july 1
  [9, 1]
  //oct 1
];

const units$1 = {
  second: (s) => {
    walkTo(s, {
      millisecond: 0
    });
    return s;
  },
  minute: (s) => {
    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarterhour: (s) => {
    const minute = s.minutes();
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
  hour: (s) => {
    walkTo(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  day: (s) => {
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  week: (s) => {
    const original = s.clone();
    s = s.day(s._weekStart);
    if (s.isAfter(original)) {
      s = s.subtract(1, "week");
    }
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  month: (s) => {
    walkTo(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarter: (s) => {
    const q = s.quarter();
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
  season: (s) => {
    const current = s.season();
    let hem = "north";
    if (s.hemisphere() === "South") {
      hem = "south";
    }
    for (let i = 0; i < seasons[hem].length; i++) {
      if (seasons[hem][i][0] === current) {
        let year = s.year();
        if (current === "winter" && s.month() < 3) {
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
  year: (s) => {
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
  decade: (s) => {
    s = s.startOf("year");
    const year = s.year();
    const decade = parseInt(year / 10, 10) * 10;
    s = s.year(decade);
    return s;
  },
  century: (s) => {
    s = s.startOf("year");
    const year = s.year();
    const decade = parseInt(year / 100, 10) * 100;
    s = s.year(decade);
    return s;
  }
};
units$1.date = units$1.day;
const startOf = (a, unit) => {
  let s = a.clone();
  if (!s.isValid()) {
    return s;
  }
  unit = normalize$2(unit);
  if (units$1[unit]) {
    return units$1[unit](s);
  }
  if (unit === "summer" || unit === "winter") {
    s = s.season(unit);
    return units$1.season(s);
  }
  return s;
};
const endOf = (a, unit) => {
  let s = a.clone();
  if (!s.isValid()) {
    return s;
  }
  unit = normalize$2(unit);
  if (units$1[unit]) {
    s = units$1[unit](s);
    s = s.add(1, unit);
    s = s.subtract(1, "millisecond");
    return s;
  }
  return s;
};

const isDay = function(unit) {
  if (short().find((s) => s === unit)) {
    return true;
  }
  if (long().find((s) => s === unit)) {
    return true;
  }
  return false;
};
const every = function(start, unit, end, stepCount = 1) {
  if (!unit || !end || !Number.isInteger(stepCount) || stepCount <= 0) {
    return [];
  }
  unit = normalize$2(unit);
  end = start.clone().set(end);
  if (!start.isValid() || !end.isValid()) {
    return [];
  }
  if (start.isAfter(end)) {
    const tmp = start;
    start = end;
    end = tmp;
  }
  if (start.diff(end, unit) < stepCount) {
    return [];
  }
  let d = start.clone();
  if (isDay(unit)) {
    d = d.next(unit);
    unit = "week";
  } else {
    const first = d.startOf(unit);
    if (first.isBefore(start)) {
      d = d.next(unit);
    }
  }
  const result = [];
  for (; d.isBefore(end); ) {
    result.push(d);
    const next = d.add(stepCount, unit);
    if (!next.isValid() || next.epoch <= d.epoch) {
      break;
    }
    d = next;
  }
  return result;
};

const titleCase = (str) => {
  str = str[0].toUpperCase() + str.substr(1);
  str = str.replace(/[/_-]([a-z])/gi, (s) => {
    return s.toUpperCase();
  });
  str = str.replace(/_(of|es)_/i, (s) => s.toLowerCase());
  str = str.replace(/\/gmt/i, "/GMT");
  str = str.replace(/\/utc/i, "/UTC");
  str = str.replace(/\/Dumontdurville$/i, "/DumontDUrville");
  str = str.replace(/\/Mcmurdo$/i, "/McMurdo");
  str = str.replace(/\/Port-au-prince$/i, "/Port-au-Prince");
  if (str === "Utc") {
    str = "UTC";
  }
  return str;
};

const parseDst = (dst) => {
  if (!dst) {
    return [];
  }
  return dst.split("->");
};
const timezone = (s) => {
  const zones = s.timezones;
  let tz = s.tz;
  if (zones.hasOwnProperty(tz) === false) {
    tz = lookupTz(s.tz, zones);
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
  const found = zones[tz];
  const result = {
    name: titleCase(tz),
    hasDst: Boolean(found.dst),
    default_offset: found.offset,
    //do north-hemisphere version as default (sorry!)
    hemisphere: found.hem === "s" ? "South" : "North",
    current: {}
  };
  if (result.hasDst) {
    const arr = parseDst(found.dst);
    result.change = {
      start: arr[0],
      back: arr[1]
    };
  }
  const summer = found.offset;
  let winter = summer;
  const dstShift = getDstShift(tz);
  if (result.hasDst === true) {
    if (result.hemisphere === "North") {
      winter = summer - dstShift;
    } else {
      winter = found.offset + dstShift;
    }
  }
  if (result.hasDst === false) {
    result.current.offset = summer;
    result.current.isDST = false;
  } else if (inSummerTime(s.epoch, result.change.start, result.change.back, summer, winter) === true) {
    result.current.offset = summer;
    result.current.isDST = result.hemisphere === "North";
  } else {
    result.current.offset = winter;
    result.current.isDST = result.hemisphere === "South";
  }
  return result;
};

const units = [
  "century",
  "decade",
  "year",
  "month",
  "date",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
const methods$7 = {
  set: function(input, tz) {
    let s = this.clone();
    s = parseInput(s, input, null);
    if (tz) {
      s.tz = lookupTz(tz, s.timezones);
    }
    return s;
  },
  timezone: function(tz) {
    if (tz !== void 0) {
      const json = this.json();
      json.timezone = tz;
      return this.set(json, tz);
    }
    return timezone(this);
  },
  isDST: function() {
    return timezone(this).current.isDST;
  },
  hasDST: function() {
    return timezone(this).hasDst;
  },
  offset: function() {
    return timezone(this).current.offset * 60;
  },
  hemisphere: function() {
    return timezone(this).hemisphere;
  },
  format: function(fmt) {
    return printFormat(this, fmt);
  },
  unixFmt: function(fmt) {
    return unixFmt(this, fmt);
  },
  startOf: function(unit) {
    return startOf(this, unit);
  },
  endOf: function(unit) {
    return endOf(this, unit);
  },
  leapYear: function() {
    const year = this.year();
    return isLeapYear(year);
  },
  progress: function(unit) {
    return progress(this, unit);
  },
  nearest: function(unit) {
    return nearest(this, unit);
  },
  diff: function(d, unit) {
    return main$1(this, d, unit);
  },
  since: function(d) {
    if (!d) {
      d = this.clone().set();
    }
    return since(this, d);
  },
  next: function(unit) {
    const s = this.add(1, unit);
    return s.startOf(unit);
  },
  //the start of the previous year/week/century
  last: function(unit) {
    const s = this.subtract(1, unit);
    return s.startOf(unit);
  },
  isValid: function() {
    if (!this.epoch && this.epoch !== 0) {
      return false;
    }
    return Number.isFinite(this.epoch) && !isNaN(new Date(this.epoch).getTime());
  },
  //travel to this timezone
  goto: function(tz) {
    const s = this.clone();
    s.tz = lookupTz(tz, s.timezones);
    return s;
  },
  //get each week/month/day between a -> b
  every: function(unit, to, stepCount) {
    if (typeof unit === "object" && typeof to === "string") {
      const tmp = to;
      to = unit;
      unit = tmp;
    }
    return every(this, unit, to, stepCount);
  },
  isAwake: function() {
    const hour = this.hour();
    if (hour < 8 || hour > 22) {
      return false;
    }
    return true;
  },
  isAsleep: function() {
    return !this.isAwake();
  },
  daysInMonth: function() {
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
        throw new Error("Invalid Month state.");
    }
  },
  //pretty-printing
  log: function() {
    console.log("\n" + printFormat(this, "nice-short"));
    return this;
  },
  logYear: function() {
    console.log("\n" + printFormat(this, "full-short"));
    return this;
  },
  json: function(input) {
    if (input !== void 0) {
      let s = this.clone();
      if (input.timezone) {
        s.tz = input.timezone;
      }
      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        if (input[unit] !== void 0) {
          s = s[unit](input[unit]);
        }
      }
      return s;
    }
    const obj = units.reduce((h, unit) => {
      h[unit] = this[unit]();
      return h;
    }, {});
    obj.offset = this.timezone().current.offset;
    obj.timezone = this.tz;
    return obj;
  },
  debug: function() {
    const tz = this.timezone();
    let date = this.format("MM") + " " + this.format("date-ordinal") + " " + this.year();
    date += "\n     - " + this.format("time");
    console.log("\n\n", date + "\n     - " + tz.name + " (" + tz.current.offset + ")");
    return this;
  },
  //alias of 'since' but opposite - like moment.js
  from: function(d) {
    d = this.clone().set(d);
    return d.since(this);
  },
  fromNow: function() {
    const d = this.clone().set(Date.now());
    return d.since(this);
  },
  weekStart: function(input) {
    if (typeof input === "number") {
      this._weekStart = input;
      return this;
    }
    if (typeof input === "string") {
      input = input.toLowerCase().trim();
      let num = short().indexOf(input);
      if (num === -1) {
        num = long().indexOf(input);
      }
      if (num === -1) {
        num = 1;
      }
      this._weekStart = num;
    } else {
      console.warn("Spacetime Error: Cannot understand .weekStart() input:", input);
    }
    return this;
  }
};
methods$7.inDST = methods$7.isDST;
methods$7.round = methods$7.nearest;
methods$7.each = methods$7.every;

const getMonthLength = function(month, year) {
  if (month === 1 && isLeapYear(year)) {
    return 29;
  }
  return monthLengths[month];
};
const rollMonth = (want, old) => {
  if (want.month > 0) {
    const years = parseInt(want.month / 12, 10);
    want.year = old.year() + years;
    want.month = want.month % 12;
  } else if (want.month < 0) {
    const m = Math.abs(want.month);
    let years = parseInt(m / 12, 10);
    if (m % 12 !== 0) {
      years += 1;
    }
    want.year = old.year() - years;
    want.month = want.month % 12;
    want.month = want.month + 12;
    if (want.month === 12) {
      want.month = 0;
    }
  }
  return want;
};
const rollDaysDown = (want, old, sum) => {
  want.year = old.year();
  want.month = old.month();
  const date = old.date();
  want.date = date - Math.abs(sum);
  while (want.date < 1) {
    want.month -= 1;
    if (want.month < 0) {
      want.month = 11;
      want.year -= 1;
    }
    const max = getMonthLength(want.month, want.year);
    want.date += max;
  }
  return want;
};
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
const months = rollMonth;
const days = rollDaysUp;
const daysBack = rollDaysDown;

const validate = (n) => {
  if (typeof n === "string") {
    n = parseInt(n, 10);
  }
  return n;
};
const order$1 = ["year", "month", "date", "hour", "minute", "second", "millisecond"];
const confirm = (s, tmp, unit) => {
  const n = order$1.indexOf(unit);
  const arr = order$1.slice(n, order$1.length);
  for (let i = 0; i < arr.length; i++) {
    const want = tmp[arr[i]]();
    s[arr[i]](want);
  }
  return s;
};
const fwdBkwd = function(s, old, goFwd, unit) {
  if (goFwd === true && s.isBefore(old)) {
    s = s.add(1, unit);
  } else if (goFwd === false && s.isAfter(old)) {
    s = s.minus(1, unit);
  }
  return s;
};
const milliseconds = function(s, n) {
  n = validate(n);
  const current = s.millisecond();
  const diff = current - n;
  return s.epoch - diff;
};
const seconds = function(s, n, goFwd) {
  n = validate(n);
  const old = s.clone();
  const diff = s.second() - n;
  const shift = diff * o.second;
  s.epoch = s.epoch - shift;
  s = fwdBkwd(s, old, goFwd, "minute");
  return s.epoch;
};
const minutes = function(s, n, goFwd) {
  n = validate(n);
  const old = s.clone();
  const diff = s.minute() - n;
  const shift = diff * o.minute;
  s.epoch -= shift;
  confirm(s, old, "second");
  s = fwdBkwd(s, old, goFwd, "hour");
  return s.epoch;
};
const hours = function(s, n, goFwd) {
  n = validate(n);
  if (n >= 24) {
    n = 23;
  } else if (n < 0) {
    n = 0;
  }
  const old = s.clone();
  let diff = s.hour() - n;
  let shift = diff * o.hour;
  s.epoch -= shift;
  if (s.date() !== old.date()) {
    s = old.clone();
    if (diff > 1) {
      diff -= 1;
    }
    if (diff < 1) {
      diff += 1;
    }
    shift = diff * o.hour;
    s.epoch -= shift;
  }
  walkTo(s, {
    hour: n
  });
  confirm(s, old, "minute");
  s = fwdBkwd(s, old, goFwd, "day");
  return s.epoch;
};
const time = function(s, str, goFwd) {
  let m = str.match(/([0-9]{1,2})[:h]([0-9]{1,2})(:[0-9]{1,2})? ?(am|pm)?/);
  if (!m) {
    m = str.match(/([0-9]{1,2}) ?(am|pm)/);
    if (!m) {
      return null;
    }
    m.splice(2, 0, "0");
    m.splice(3, 0, "");
  }
  let h24 = false;
  let hour = parseInt(m[1], 10);
  let minute = parseInt(m[2], 10);
  if (minute >= 60) {
    minute = 59;
  }
  if (hour > 12) {
    h24 = true;
  }
  if (h24 === false) {
    if (m[4] === "am" && hour === 12) {
      hour = 0;
    }
    if (m[4] === "pm" && hour < 12) {
      hour += 12;
    }
  }
  m[3] = m[3] || "";
  m[3] = m[3].replace(/:/, "");
  const sec = parseInt(m[3], 10) || 0;
  const old = s.clone();
  s = s.hour(hour);
  s = s.minute(minute);
  s = s.second(sec);
  s = s.millisecond(0);
  s = fwdBkwd(s, old, goFwd, "day");
  return s.epoch;
};
const date = function(s, n, goFwd) {
  n = validate(n);
  if (n > 28) {
    const max = getMonthLength(s.month(), s.year());
    if (n > max) {
      n = max;
    }
  }
  if (n <= 0) {
    n = 1;
  }
  const old = s.clone();
  walkTo(s, {
    date: n
  });
  s = fwdBkwd(s, old, goFwd, "month");
  return s.epoch;
};
const month = function(s, n, goFwd) {
  if (typeof n === "string") {
    if (n === "sept") {
      n = "sep";
    }
    n = mapping$1()[n.toLowerCase()];
  }
  n = validate(n);
  if (n >= 12) {
    n = 11;
  }
  if (n <= 0) {
    n = 0;
  }
  let d = s.date();
  const max = getMonthLength(n, s.year());
  if (d > max) {
    d = max;
  }
  const old = s.clone();
  walkTo(s, {
    month: n,
    date: d
  });
  s = fwdBkwd(s, old, goFwd, "year");
  return s.epoch;
};
const year = function(s, n) {
  if (typeof n === "string" && /^'[0-9]{2}$/.test(n)) {
    n = n.replace(/'/, "").trim();
    n = Number(n);
    if (n > 30) {
      n = 1900 + n;
    } else {
      n = 2e3 + n;
    }
  }
  n = validate(n);
  const targetMonth = s.month();
  const targetDate = Math.min(s.date(), getMonthLength(targetMonth, n));
  walkTo(s, {
    year: n,
    month: targetMonth,
    date: targetDate
  });
  return s.epoch;
};
const week = function(s, n, goFwd) {
  const old = s.clone();
  n = validate(n);
  if (n === 1) {
    if (s.monthName() === "december" && s.date() >= 29) {
      if (s.week() === 1) {
        return s;
      }
    }
  }
  s = s.month(0);
  s = s.date(1);
  s = s.day("monday", false);
  if (s.monthName() === "december" && s.date() < 29) {
    s = s.add(1, "week");
  }
  n -= 1;
  s = s.add(n, "weeks");
  s = fwdBkwd(s, old, goFwd, "year");
  return s;
};
const dayOfYear = function(s, n, goFwd) {
  n = validate(n);
  const old = s.clone();
  n -= 1;
  if (n <= 0) {
    n = 0;
  } else if (n >= 365) {
    if (isLeapYear(s.year())) {
      n = 365;
    } else {
      n = 364;
    }
  }
  s = s.startOf("year");
  s = s.add(n, "day");
  confirm(s, old, "hour");
  s = fwdBkwd(s, old, goFwd, "year");
  return s.epoch;
};

let morning = "am";
let evening = "pm";
function am() {
  return morning;
}
function pm() {
  return evening;
}
function set(i18n) {
  morning = i18n.am || morning;
  evening = i18n.pm || evening;
}

const methods$6 = {
  millisecond: function(num) {
    if (num !== void 0) {
      const s = this.clone();
      s.epoch = milliseconds(s, num);
      return s;
    }
    return this.d.getUTCMilliseconds();
  },
  second: function(num, goFwd) {
    if (num !== void 0) {
      const s = this.clone();
      s.epoch = seconds(s, num, goFwd);
      return s;
    }
    return this.d.getUTCSeconds();
  },
  minute: function(num, goFwd) {
    if (num !== void 0) {
      const s = this.clone();
      s.epoch = minutes(s, num, goFwd);
      return s;
    }
    return this.d.getUTCMinutes();
  },
  hour: function(num, goFwd) {
    const d = this.d;
    if (num !== void 0) {
      const s = this.clone();
      s.epoch = hours(s, num, goFwd);
      return s;
    }
    return d.getUTCHours();
  },
  //'3:30' is 3.5
  hourFloat: function(num, goFwd) {
    if (num !== void 0) {
      const s = this.clone();
      let minute2 = num % 1;
      minute2 = minute2 * 60;
      const hour2 = parseInt(num, 10);
      s.epoch = hours(s, hour2, goFwd);
      s.epoch = minutes(s, minute2, goFwd);
      return s;
    }
    const d = this.d;
    const hour = d.getUTCHours();
    let minute = d.getUTCMinutes();
    minute = minute / 60;
    return hour + minute;
  },
  // hour in 12h format
  hour12: function(str, goFwd) {
    const d = this.d;
    if (str !== void 0) {
      const s = this.clone();
      str = "" + str;
      const m = str.match(/^([0-9]+)(am|pm)$/);
      if (m) {
        let hour = parseInt(m[1], 10);
        if (hour === 12) {
          hour = 0;
        }
        if (m[2] === "pm") {
          hour += 12;
        }
        s.epoch = hours(s, hour, goFwd);
      }
      return s;
    }
    let hour12 = d.getUTCHours();
    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }
    if (hour12 === 0) {
      hour12 = 12;
    }
    return hour12;
  },
  //some ambiguity here with 12/24h
  time: function(str, goFwd) {
    if (str !== void 0) {
      const s = this.clone();
      str = str.toLowerCase().trim();
      s.epoch = time(s, str, goFwd);
      return s;
    }
    return `${this.h12()}:${zeroPad(this.minute())}${this.ampm()}`;
  },
  // either 'am' or 'pm'
  ampm: function(input, goFwd) {
    let which = am();
    let hour = this.hour();
    if (hour >= 12) {
      which = pm();
    }
    if (typeof input !== "string") {
      return which;
    }
    const s = this.clone();
    input = input.toLowerCase().trim();
    if (hour >= 12 && input === "am") {
      hour -= 12;
      return s.hour(hour, goFwd);
    }
    if (hour < 12 && input === "pm") {
      hour += 12;
      return s.hour(hour, goFwd);
    }
    return s;
  },
  //some hard-coded times of day, like 'noon'
  dayTime: function(str, goFwd) {
    if (str !== void 0) {
      const times = {
        morning: "7:00",
        breakfast: "7:00",
        noon: "12:00",
        lunch: "12:00",
        afternoon: "14:00",
        evening: "18:00",
        dinner: "18:00",
        night: "23:00",
        midnight: "00:00"
      };
      let s = this.clone();
      str = str || "";
      str = str.toLowerCase();
      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str], goFwd);
      }
      return s;
    }
    const h = this.hour();
    if (h < 6) {
      return "night";
    }
    if (h < 12) {
      return "morning";
    }
    if (h < 17) {
      return "afternoon";
    }
    if (h < 22) {
      return "evening";
    }
    return "night";
  },
  //get/set a traditional iso string
  iso: function(num) {
    if (num !== void 0) {
      return this.set(num);
    }
    return this.format("iso");
  },
  // get/set a new iso string
  isoFull: function(num) {
    if (num !== void 0) {
      return this.set(num);
    }
    return this.format("iso-full");
  },
  epochSeconds: function(num) {
    if (num !== void 0) {
      this.epoch = num * 1e3;
      return this;
    }
    if (!this.isValid()) {
      return null;
    }
    return Math.floor(this.epoch / 1e3);
  }
};

const methods$5 = {
  // # day in the month
  date: function(num, goFwd) {
    if (num !== void 0) {
      const s = this.clone();
      num = parseInt(num, 10);
      if (!Number.isNaN(num)) {
        s.epoch = date(s, num, goFwd);
      }
      return s;
    }
    return this.d.getUTCDate();
  },
  //like 'wednesday' (hard!)
  day: function(input, goFwd) {
    if (input === void 0) {
      return this.d.getUTCDay();
    }
    const original = this.clone();
    let want = input;
    if (typeof input === "string") {
      input = input.toLowerCase();
      if (aliases$1.hasOwnProperty(input)) {
        want = aliases$1[input];
      } else {
        want = short().indexOf(input);
        if (want === -1) {
          want = long().indexOf(input);
        }
      }
    }
    const day = this.d.getUTCDay();
    let diff = day - want;
    if (goFwd === true && diff > 0) {
      diff = diff - 7;
    }
    if (goFwd === false && diff < 0) {
      diff = diff + 7;
    }
    const s = this.subtract(diff, "days");
    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    return s;
  },
  //these are helpful name-wrappers
  dayName: function(input, goFwd) {
    if (input === void 0) {
      return long()[this.day()];
    }
    let s = this.clone();
    s = s.day(input, goFwd);
    return s;
  }
};

const clearMinutes = (s) => {
  s = s.minute(0);
  s = s.second(0);
  s = s.millisecond(1);
  return s;
};
const millennium = function(input) {
  if (input !== void 0) {
    if (typeof input === "string") {
      input = input.replace(/([0-9])(th|rd|st|nd)/, "$1");
      input = Number(input);
      if (isNaN(input)) {
        console.warn("Spacetime: Invalid millennium input");
        return this;
      }
    }
    if (input > 0) {
      input -= 1;
    }
    let year = input * 1e3;
    if (year === 0) {
      year = 1;
    }
    return this.year(year);
  }
  let num = Math.floor(this.year() / 1e3);
  if (num >= 0) {
    num += 1;
  }
  return num;
};
const methods$4 = {
  // day 0-366
  dayOfYear: function(num, goFwd) {
    if (num !== void 0) {
      const s = this.clone();
      s.epoch = dayOfYear(s, num, goFwd);
      return s;
    }
    const d = this.d;
    let sum = d.getUTCDate();
    const month = d.getUTCMonth();
    const year = d.getUTCFullYear();
    for (let i = 0; i < month; i++) {
      sum += getMonthLength(i, year);
    }
    return sum;
  },
  //since the start of the year
  week: function(num, goFwd) {
    if (num !== void 0) {
      let s = this.clone();
      s = week(s, num, goFwd);
      s = clearMinutes(s);
      return s;
    }
    const thisOne = this.epoch;
    let tmp = this.clone();
    if (tmp.monthName() === "december" && tmp.date() >= 29) {
      const startNext = week(tmp.add(15, "days"), 1, false);
      if (startNext.epoch <= tmp.epoch) {
        return 1;
      }
    }
    tmp = tmp.month(0);
    tmp = tmp.date(1);
    tmp = clearMinutes(tmp);
    tmp = tmp.day("monday", false);
    if (tmp.monthName() === "december" && tmp.date() < 29) {
      tmp = tmp.add(1, "week");
    }
    tmp = tmp.minus(2, "hours");
    if (tmp.epoch > thisOne) {
      return 1;
    }
    let i = 0;
    const skipWeeks = this.month() * 4;
    tmp.epoch += o.week * skipWeeks;
    i += skipWeeks;
    for (; i <= 52; i++) {
      if (tmp.epoch > thisOne) {
        return i;
      }
      tmp = tmp.add(1, "week");
    }
    return 52;
  },
  //either name or number
  month: function(input, goFwd) {
    if (input !== void 0) {
      const s = this.clone();
      s.epoch = month(s, input, goFwd);
      return s;
    }
    return this.d.getUTCMonth();
  },
  //'january'
  monthName: function(input, goFwd) {
    if (input !== void 0) {
      let s = this.clone();
      s = s.month(input, goFwd);
      return s;
    }
    return long$1()[this.month()];
  },
  //q1, q2, q3, q4
  quarter: function(num, goFwd) {
    if (num !== void 0) {
      if (typeof num === "string") {
        num = num.replace(/^q/i, "");
        num = parseInt(num, 10);
      }
      if (quarters[num]) {
        let s = this.clone();
        const month2 = quarters[num][0];
        s = s.month(month2, goFwd);
        s = s.date(1, goFwd);
        s = s.startOf("day");
        return s;
      }
    }
    const month = this.d.getUTCMonth();
    for (let i = 1; i < quarters.length; i++) {
      if (month < quarters[i][0]) {
        return i - 1;
      }
    }
    return 4;
  },
  //spring, summer, winter, fall
  season: function(input, goFwd) {
    let hem = "north";
    if (this.hemisphere() === "South") {
      hem = "south";
    }
    if (input !== void 0) {
      let s = this.clone();
      for (let i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          s = s.month(seasons[hem][i][1], goFwd);
          s = s.date(1);
          s = s.startOf("day");
        }
      }
      return s;
    }
    const month = this.d.getUTCMonth();
    for (let i = 0; i < seasons[hem].length - 1; i++) {
      if (month >= seasons[hem][i][1] && month < seasons[hem][i + 1][1]) {
        return seasons[hem][i][0];
      }
    }
    return hem === "north" ? "winter" : "summer";
  },
  //the year number
  year: function(num) {
    if (num !== void 0) {
      const s = this.clone();
      s.epoch = year(s, num);
      return s;
    }
    return this.d.getUTCFullYear();
  },
  //bc/ad years
  era: function(str) {
    if (str !== void 0) {
      const s = this.clone();
      str = str.toLowerCase();
      const year$1 = s.d.getUTCFullYear();
      if (str === "bc" && year$1 > 0) {
        s.epoch = year(s, year$1 * -1);
      }
      if (str === "ad" && year$1 < 0) {
        s.epoch = year(s, year$1 * -1);
      }
      return s;
    }
    if (this.d.getUTCFullYear() < 0) {
      return "BC";
    }
    return "AD";
  },
  // 2019 -> 2010
  decade: function(input) {
    if (input !== void 0) {
      input = String(input);
      input = input.replace(/([0-9])'?s$/, "$1");
      input = input.replace(/([0-9])(th|rd|st|nd)/, "$1");
      if (!input) {
        console.warn("Spacetime: Invalid decade input");
        return this;
      }
      if (input.length === 2 && /[0-9][0-9]/.test(input)) {
        input = "19" + input;
      }
      let year = Number(input);
      if (isNaN(year)) {
        return this;
      }
      year = Math.floor(year / 10) * 10;
      return this.year(year);
    }
    return this.startOf("decade").year();
  },
  // 1950 -> 19+1
  century: function(input) {
    if (input !== void 0) {
      if (typeof input === "string") {
        input = input.replace(/([0-9])(th|rd|st|nd)/, "$1");
        input = input.replace(/(?<![0-9])([0-9]+) ?(b\.?c\.?|a\.?d\.?)/i, (a, b, c) => {
          if (/b\.?c\.?/i.test(c)) {
            b = "-" + b;
          }
          return b;
        });
        input = input.replace(/c$/, "");
      }
      let year = Number(input);
      if (isNaN(input)) {
        console.warn("Spacetime: Invalid century input");
        return this;
      }
      if (year === 0) {
        year = 1;
      }
      if (year >= 0) {
        year = (year - 1) * 100;
      } else {
        year = (year + 1) * 100;
      }
      return this.year(year);
    }
    let num = this.startOf("century").year();
    num = Math.floor(num / 100);
    if (num < 0) {
      return num - 1;
    }
    return num + 1;
  },
  // 2019 -> 2+1
  millenium: millennium,
  // alias without typo
  millennium
};

const methods$3 = {
  ...methods$6,
  ...methods$5,
  ...methods$4,
  //aliases
  milliseconds: methods$6.millisecond,
  seconds: methods$6.second,
  minutes: methods$6.minute,
  hours: methods$6.hour,
  hour24: methods$6.hour,
  h12: methods$6.hour12,
  h24: methods$6.hour,
  days: methods$5.day
};

const precision = {
  second: "millisecond",
  minute: "second",
  quarterhour: "minute",
  hour: "minute",
  date: "hour",
  week: "day",
  month: "day",
  quarter: "day",
  season: "day",
  year: "day"
};
const years = { decade: 10, century: 100 };
const addFraction = (s, num, unit) => {
  if (Object.prototype.hasOwnProperty.call(years, unit)) {
    return s.add(num * years[unit], "year");
  }
  if (!Object.prototype.hasOwnProperty.call(precision, unit)) {
    return null;
  }
  let duration = o[unit];
  if (unit === "month" || unit === "quarter" || unit === "season" || unit === "year") {
    s = s.add(Math.trunc(num), unit);
    num %= 1;
    duration = s.add(1, unit).epoch - s.epoch;
    if (unit === "month") {
      duration = 28 * o.day;
    }
  } else if (unit === "quarterhour") {
    duration = 15 * o.minute;
  }
  s.epoch += num * duration;
  const subunit = precision[unit];
  if (subunit === "millisecond") {
    s.epoch = Math.round(s.epoch);
    return s;
  }
  const lower = s.startOf(subunit);
  const upper = lower.add(1, subunit);
  if (s.epoch - lower.epoch <= upper.epoch - s.epoch) {
    return lower;
  }
  return upper;
};

const order = ["millisecond", "second", "minute", "hour", "date", "month"];
const keep = {
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
keep.quarter = keep.date;
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
  year: true,
  decade: true,
  century: true
};
const add = function(num, unit) {
  let s = this.clone();
  if (!s.isValid() || !unit || num === 0) {
    return s;
  }
  const old = this.clone();
  const inputUnit = unit;
  unit = normalize$2(unit);
  if (unit === "millisecond") {
    s.epoch += num;
    return s;
  }
  if (unit === "fortnight") {
    num *= 2;
    unit = "week";
  }
  if (unit === "millennium") {
    return s.add(num * 1e3, "year");
  }
  if (Number.isFinite(num) && !Number.isInteger(num)) {
    const fractional = addFraction(s, num, unit);
    if (fractional) {
      return fractional;
    }
  }
  if (!Object.prototype.hasOwnProperty.call(o, unit) && !Object.prototype.hasOwnProperty.call(keep, unit) && unit !== "weekend") {
    if (s.silent === false) {
      console.warn(`Warn: unsupported arithmetic unit "${inputUnit}"`);
    }
    return s;
  }
  if (o[unit]) {
    s.epoch += o[unit] * num;
  } else if (unit === "week" || unit === "weekend") {
    s.epoch += o.day * (num * 7);
  } else if (unit === "quarter" || unit === "season") {
    s.epoch += o.month * (num * 3);
  } else if (unit === "quarterhour") {
    s.epoch += o.minute * 15 * num;
  }
  let want = {};
  if (keep[unit]) {
    keep[unit].forEach((u) => {
      want[u] = old[u]();
    });
  }
  if (dstAwareUnits[unit]) {
    const diff = old.timezone().current.offset - s.timezone().current.offset;
    s.epoch += diff * 3600 * 1e3;
  }
  if (unit === "month") {
    want.month = old.month() + num;
    want = months(want, old);
  }
  if (unit === "week") {
    const sum = old.date() + num * 7;
    if (sum <= 28 && sum > 1) {
      want.date = sum;
    }
  }
  if (unit === "weekend" && s.dayName() !== "saturday") {
    s = s.day("saturday", true);
  } else if (unit === "date") {
    if (num < 0) {
      want = daysBack(want, old, num);
    } else {
      const sum = old.date() + num;
      want = days(want, old, sum);
    }
    if (num !== 0 && old.isSame(s, "day")) {
      want.date = old.date() + num;
    }
  } else if (unit === "quarter") {
    want.month = old.month() + num * 3;
    want.year = old.year();
    if (want.month < 0) {
      const years = Math.floor(want.month / 12);
      const remainder = want.month + Math.abs(years) * 12;
      want.month = remainder;
      want.year += years;
    } else if (want.month >= 12) {
      const years = Math.floor(want.month / 12);
      want.month = want.month % 12;
      want.year += years;
    }
    want.date = old.date();
  } else if (unit === "year") {
    const wantYear = old.year() + num;
    const haveYear = s.year();
    want.year = wantYear;
    if (haveYear < wantYear) {
      const toAdd = Math.floor(num / 4) || 1;
      s.epoch += Math.abs(o.day * toAdd);
    } else if (haveYear > wantYear) {
      const toAdd = Math.floor(num / 4) || 1;
      s.epoch += o.day * toAdd;
    }
  } else if (unit === "decade") {
    want.year = old.year() + num * 10;
  } else if (unit === "century") {
    want.year = old.year() + num * 100;
  }
  if (keepDate[unit]) {
    const year = want.year !== void 0 ? want.year : old.year();
    const max = getMonthLength(want.month, year);
    want.date = old.date();
    if (want.date > max) {
      want.date = max;
    }
  }
  if (Object.keys(want).length > 1) {
    walkTo(s, want);
  }
  return s;
};
const subtract = function(num, unit) {
  const s = this.clone();
  return s.add(num * -1, unit);
};
const methods$2 = { add, subtract, minus: subtract, plus: add };

const print = {
  millisecond: (s) => {
    return s.epoch;
  },
  second: (s) => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join("-");
  },
  minute: (s) => {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join("-");
  },
  hour: (s) => {
    return [s.year(), s.month(), s.date(), s.hour()].join("-");
  },
  day: (s) => {
    return [s.year(), s.month(), s.date()].join("-");
  },
  week: (s) => {
    return [s.year(), s.week()].join("-");
  },
  month: (s) => {
    return [s.year(), s.month()].join("-");
  },
  quarter: (s) => {
    return [s.year(), s.quarter()].join("-");
  },
  year: (s) => {
    return s.year();
  }
};
print.date = print.day;
const isSame = function(b, unit, tzAware = true) {
  const a = this;
  if (!unit) {
    return null;
  }
  if (typeof b === "string" && typeof unit === "object") {
    const tmp = b;
    b = unit;
    unit = tmp;
  }
  if (typeof b === "string" || typeof b === "number") {
    b = new this.constructor(b, this.timezone.name);
  }
  if (!a.isValid() || b == null || b.isValid == null || !b.isValid()) {
    return false;
  }
  unit = unit.replace(/s$/, "");
  if (tzAware === true && a.tz !== b.tz) {
    b = b.clone();
    b.tz = a.tz;
  }
  if (print[unit]) {
    return print[unit](a) === print[unit](b);
  }
  return null;
};
var sameFns = { isSame };

const validEpoch = (epoch) => Number.isFinite(epoch) && !isNaN(new Date(epoch).getTime());
const methods$1 = {
  isAfter: function(d) {
    d = beADate(d, this);
    const epoch = getEpoch(d);
    if (!this.isValid() || !validEpoch(epoch)) {
      return false;
    }
    return this.epoch > epoch;
  },
  isBefore: function(d) {
    d = beADate(d, this);
    const epoch = getEpoch(d);
    if (!this.isValid() || !validEpoch(epoch)) {
      return false;
    }
    return this.epoch < epoch;
  },
  isEqual: function(d) {
    d = beADate(d, this);
    const epoch = getEpoch(d);
    if (!this.isValid() || !validEpoch(epoch)) {
      return false;
    }
    return this.epoch === epoch;
  },
  isBetween: function(start, end, isInclusive = false) {
    start = beADate(start, this);
    end = beADate(end, this);
    const startEpoch = getEpoch(start);
    if (!this.isValid() || !validEpoch(startEpoch)) {
      return false;
    }
    const endEpoch = getEpoch(end);
    if (!validEpoch(endEpoch)) {
      return false;
    }
    if (isInclusive) {
      return this.isBetween(start, end) || this.isEqual(start) || this.isEqual(end);
    }
    return startEpoch < this.epoch && this.epoch < endEpoch;
  }
};

const methods = {
  i18n: function(data) {
    if (isObject(data.days)) {
      set$4(data.days);
    }
    if (isObject(data.months)) {
      set$5(data.months);
    }
    if (isBoolean(data.useTitleCase)) {
      set$3(data.useTitleCase);
    }
    if (isObject(data.ampm)) {
      set(data.ampm);
    }
    if (isObject(data.distance)) {
      set$1(data.distance);
    }
    if (isObject(data.units)) {
      set$2(data.units);
    }
    return this;
  }
};

let timezones = all;
class Spacetime {
  epoch;
  tz;
  silent;
  british;
  _weekStart;
  _today;
  constructor(input, tz, options = {}) {
    this.epoch = null;
    this.tz = lookupTz(tz == null ? inputTimezone(input) : tz, timezones);
    this.silent = options.silent !== void 0 ? options.silent : true;
    this.british = options.dmy || options.british;
    this._weekStart = options.weekStart !== void 0 ? options.weekStart : 1;
    this._today = options.today !== void 0 ? options.today : {};
    const tmp = parseInput(this, input, tz);
    this.epoch = tmp.epoch;
    if (tmp.tz) {
      this.tz = tmp.tz;
    }
  }
  // Internal clock view: read its UTC fields, not the host's local fields.
  get d() {
    if (!Number.isFinite(this.epoch)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    const offset = quickOffset(this);
    return new Date(this.epoch + offset * 36e5);
  }
  // timezone data lives on the instance, to allow adding new timezones
  get timezones() {
    return timezones;
  }
  set timezones(obj) {
    timezones = obj;
  }
  clone() {
    return new Spacetime(this.isValid() ? this.epoch : NaN, this.tz, {
      silent: this.silent,
      dmy: this.british,
      weekStart: this._weekStart,
      today: this._today
    });
  }
  /**
   * @deprecated use toNativeDate()
   * @returns native date object at the same epoch
   */
  toLocalDate() {
    return this.toNativeDate();
  }
  /**
   * @returns native date object at the same epoch
   */
  toNativeDate() {
    return new Date(this.isValid() ? this.epoch : NaN);
  }
  toTemporal() {
    return toTemporal(this);
  }
}
Object.assign(Spacetime.prototype, methods$7, methods$3, methods$2, sameFns, methods$1, methods);

const whereIts = (a, b) => {
  let start = new Spacetime(null);
  let end = new Spacetime(null);
  start = start.time(a);
  if (b) {
    end = end.time(b);
  } else {
    end = start.add(59, "minutes");
  }
  const startHour = start.hour();
  const endHour = end.hour();
  const tzs = Object.keys(start.timezones).filter((tz) => {
    if (tz.indexOf("/") === -1) {
      return false;
    }
    const m = new Spacetime(null, tz);
    const hour = m.hour();
    if (hour >= startHour && hour <= endHour) {
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
  return tzs.map(titleCase);
};

var version = "7.17.0";

const main = (input, tz, options) => new Spacetime(input, tz, options);
const setToday = function(s) {
  const today = s._today || {};
  Object.keys(today).forEach((k) => {
    s = s[k](today[k]);
  });
  return s;
};
main.now = (tz, options) => {
  let s = new Spacetime((/* @__PURE__ */ new Date()).getTime(), tz, options);
  s = setToday(s);
  return s;
};
main.today = (tz, options) => {
  let s = new Spacetime((/* @__PURE__ */ new Date()).getTime(), tz, options);
  s = setToday(s);
  return s.startOf("day");
};
main.tomorrow = (tz, options) => {
  let s = new Spacetime((/* @__PURE__ */ new Date()).getTime(), tz, options);
  s = setToday(s);
  return s.add(1, "day").startOf("day");
};
main.yesterday = (tz, options) => {
  let s = new Spacetime((/* @__PURE__ */ new Date()).getTime(), tz, options);
  s = setToday(s);
  return s.subtract(1, "day").startOf("day");
};
main.fromUnixSeconds = (secs, tz, options) => {
  return new Spacetime(secs * 1e3, tz, options);
};
main.extend = function(obj = {}) {
  Object.keys(obj).forEach((k) => {
    if (k in Spacetime.prototype && Spacetime.prototype[k] !== obj[k]) {
      console.warn(`Spacetime Warning: .extend() is overriding the existing method '${k}'`);
    }
    Spacetime.prototype[k] = obj[k];
  });
  return this;
};
main.timezones = function() {
  const s = new Spacetime();
  return s.timezones;
};
main.max = function(tz, options) {
  const s = new Spacetime(null, tz, options);
  s.epoch = 864e13;
  return s;
};
main.min = function(tz, options) {
  const s = new Spacetime(null, tz, options);
  s.epoch = -864e13;
  return s;
};
main.whereIts = whereIts;
main.version = version;
main.tzdbVersion = tzdbVersion;
main.plugin = main.extend;

module.exports = main;
