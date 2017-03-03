/* @smallwins/spacetime v0.0.1
  
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetime = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports={
  "name": "@smallwins/spacetime",
  "version": "0.0.1",
  "description": "represent dates in remote timezones",
  "main": "./builds/spacetime.js",
  "license": "UNLICENSED",
  "scripts": {
    "build": "node ./scripts/build.js",
    "demo": "node ./scripts/demo.js",
    "watch": "node ./scripts/watch.js",
    "test": "./node_modules/tape/bin/tape ./test/**/*.test.js | ./node_modules/tap-spec/bin/cmd.js",
    "coverage": "node ./scripts/coverage.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/smallwins/spacetime.git"
  },
  "files": [
    "builds/"
  ],
  "dependencies": {
    "cli-table": "^0.3.1",
    "dst": "0.0.4"
  },
  "devDependencies": {
    "babel-preset-es2015": "6.9.0",
    "babel-preset-stage-2": "^6.11.0",
    "babelify": "7.3.0",
    "browserify": "13.0.1",
    "derequire": "^2.0.3",
    "eslint": "^3.1.1",
    "gaze": "^1.1.1",
    "shelljs": "^0.7.2",
    "tap-spec": "4.1.1",
    "tape": "4.6.0",
    "nyc": "^8.4.0",
    "uglify-js": "2.7.0"
  }
}

},{}],2:[function(_dereq_,module,exports){
'use strict';
//every computer is somewhere, and this effects their interpretation in the date object
//find the offset this computer has

var getBias = function getBias() {
  //get it with the new es6 Intl method
  // if (typeof Intl !== 'undefined') {
  //   let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // }
  var d = new Date();
  return d.getTimezoneOffset() || 0;
};
module.exports = getBias;

},{}],3:[function(_dereq_,module,exports){
'use strict';
// const dst = require('dst');

var timezones = _dereq_('./timezones');

var getOffset = function getOffset(tz) {
  if (!tz) {
    return 0;
  }
  //get offset from timezone file
  var offset = timezones[tz] || 0;

  //add another hour to offset if dst is currently off (in winter)
  //this is not perfect, but it handles us + europe mostly.
  var inDst = false; //dst(new Date());
  if (inDst === false) {
    offset -= 60;
  }
  return offset;
};
module.exports = getOffset;

},{"./timezones":4}],4:[function(_dereq_,module,exports){
'use strict';

//https://github.com/substack/timezone-name-offsets
module.exports = {
  'Africa/Abidjan': 0,
  'Africa/Accra': 0,
  'Africa/Addis_Ababa': 180,
  'Africa/Algiers': 60,
  'Africa/Asmara': 180,
  'Africa/Asmera': 180,
  'Africa/Bamako': 0,
  'Africa/Bangui': 60,
  'Africa/Banjul': 0,
  'Africa/Bissau': 0,
  'Africa/Blantyre': 120,
  'Africa/Brazzaville': 60,
  'Africa/Bujumbura': 120,
  'Africa/Cairo': 120,
  'Africa/Casablanca': 60,
  'Africa/Ceuta': 120,
  'Africa/Conakry': 0,
  'Africa/Dakar': 0,
  'Africa/Dar_es_Salaam': 180,
  'Africa/Djibouti': 180,
  'Africa/Douala': 60,
  'Africa/El_Aaiun': 60,
  'Africa/Freetown': 0,
  'Africa/Gaborone': 120,
  'Africa/Harare': 120,
  'Africa/Johannesburg': 120,
  'Africa/Juba': 180,
  'Africa/Kampala': 180,
  'Africa/Khartoum': 180,
  'Africa/Kigali': 120,
  'Africa/Kinshasa': 60,
  'Africa/Lagos': 60,
  'Africa/Libreville': 60,
  'Africa/Lome': 0,
  'Africa/Luanda': 60,
  'Africa/Lubumbashi': 120,
  'Africa/Lusaka': 120,
  'Africa/Malabo': 60,
  'Africa/Maputo': 120,
  'Africa/Maseru': 120,
  'Africa/Mbabane': 120,
  'Africa/Mogadishu': 180,
  'Africa/Monrovia': 0,
  'Africa/Nairobi': 180,
  'Africa/Ndjamena': 60,
  'Africa/Niamey': 60,
  'Africa/Nouakchott': 0,
  'Africa/Ouagadougou': 0,
  'Africa/Porto-Novo': 60,
  'Africa/Sao_Tome': 0,
  'Africa/Timbuktu': 0,
  'Africa/Tripoli': 120,
  'Africa/Tunis': 60,
  'Africa/Windhoek': 60,
  'America/Adak': -540,
  'America/Anchorage': -480,
  'America/Anguilla': -240,
  'America/Antigua': -240,
  'America/Araguaina': -180,
  'America/Argentina/Buenos_Aires': -180,
  'America/Argentina/Catamarca': -180,
  'America/Argentina/ComodRivadavia': -180,
  'America/Argentina/Cordoba': -180,
  'America/Argentina/Jujuy': -180,
  'America/Argentina/La_Rioja': -180,
  'America/Argentina/Mendoza': -180,
  'America/Argentina/Rio_Gallegos': -180,
  'America/Argentina/Salta': -180,
  'America/Argentina/San_Juan': -180,
  'America/Argentina/San_Luis': -180,
  'America/Argentina/Tucuman': -180,
  'America/Argentina/Ushuaia': -180,
  'America/Aruba': -240,
  'America/Asuncion': -240,
  'America/Atikokan': -300,
  'America/Atka': -540,
  'America/Bahia': -180,
  'America/Bahia_Banderas': -300,
  'America/Barbados': -240,
  'America/Belem': -180,
  'America/Belize': -360,
  'America/Blanc-Sablon': -240,
  'America/Boa_Vista': -240,
  'America/Bogota': -300,
  'America/Boise': -360,
  'America/Buenos_Aires': -180,
  'America/Cambridge_Bay': -360,
  'America/Campo_Grande': -240,
  'America/Cancun': -300,
  'America/Caracas': -270,
  'America/Catamarca': -180,
  'America/Cayenne': -180,
  'America/Cayman': -300,
  'America/Chicago': -300,
  'America/Chihuahua': -360,
  'America/Coral_Harbour': -300,
  'America/Cordoba': -180,
  'America/Costa_Rica': -360,
  'America/Creston': -420,
  'America/Cuiaba': -240,
  'America/Curacao': -240,
  'America/Danmarkshavn': 0,
  'America/Dawson': -420,
  'America/Dawson_Creek': -420,
  'America/Denver': -360,
  'America/Detroit': -240,
  'America/Dominica': -240,
  'America/Edmonton': -360,
  'America/Eirunepe': -300,
  'America/El_Salvador': -360,
  'America/Ensenada': -420,
  'America/Fort_Wayne': -240,
  'America/Fortaleza': -180,
  'America/Glace_Bay': -180,
  'America/Godthab': -120,
  'America/Goose_Bay': -180,
  'America/Grand_Turk': -240,
  'America/Grenada': -240,
  'America/Guadeloupe': -240,
  'America/Guatemala': -360,
  'America/Guayaquil': -300,
  'America/Guyana': -240,
  'America/Halifax': -180,
  'America/Havana': -240,
  'America/Hermosillo': -420,
  'America/Indiana/Indianapolis': -240,
  'America/Indiana/Knox': -300,
  'America/Indiana/Marengo': -240,
  'America/Indiana/Petersburg': -240,
  'America/Indiana/Tell_City': -300,
  'America/Indiana/Vevay': -240,
  'America/Indiana/Vincennes': -240,
  'America/Indiana/Winamac': -240,
  'America/Indianapolis': -240,
  'America/Inuvik': -360,
  'America/Iqaluit': -240,
  'America/Jamaica': -300,
  'America/Jujuy': -180,
  'America/Juneau': -480,
  'America/Kentucky/Louisville': -240,
  'America/Kentucky/Monticello': -240,
  'America/Knox_IN': -300,
  'America/Kralendijk': -240,
  'America/La_Paz': -240,
  'America/Lima': -300,
  'America/Los_Angeles': -420,
  'America/Louisville': -240,
  'America/Lower_Princes': -240,
  'America/Maceio': -180,
  'America/Managua': -360,
  'America/Manaus': -240,
  'America/Marigot': -240,
  'America/Martinique': -240,
  'America/Matamoros': -300,
  'America/Mazatlan': -360,
  'America/Mendoza': -180,
  'America/Menominee': -300,
  'America/Merida': -300,
  'America/Metlakatla': -480,
  'America/Mexico_City': -300,
  'America/Miquelon': -120,
  'America/Moncton': -180,
  'America/Monterrey': -300,
  'America/Montevideo': -180,
  'America/Montreal': -240,
  'America/Montserrat': -240,
  'America/Nassau': -240,
  'America/New_York': -240,
  'America/Nipigon': -240,
  'America/Nome': -480,
  'America/Noronha': -120,
  'America/North_Dakota/Beulah': -300,
  'America/North_Dakota/Center': -300,
  'America/North_Dakota/New_Salem': -300,
  'America/Ojinaga': -360,
  'America/Panama': -300,
  'America/Pangnirtung': -240,
  'America/Paramaribo': -180,
  'America/Phoenix': -420,
  'America/Port-au-Prince': -240,
  'America/Port_of_Spain': -240,
  'America/Porto_Acre': -300,
  'America/Porto_Velho': -240,
  'America/Puerto_Rico': -240,
  'America/Rainy_River': -300,
  'America/Rankin_Inlet': -300,
  'America/Recife': -180,
  'America/Regina': -360,
  'America/Resolute': -300,
  'America/Rio_Branco': -300,
  'America/Rosario': -180,
  'America/Santa_Isabel': -420,
  'America/Santarem': -180,
  'America/Santiago': -180,
  'America/Santo_Domingo': -240,
  'America/Sao_Paulo': -180,
  'America/Scoresbysund': 0,
  'America/Shiprock': -360,
  'America/Sitka': -480,
  'America/St_Barthelemy': -240,
  'America/St_Johns': -150,
  'America/St_Kitts': -240,
  'America/St_Lucia': -240,
  'America/St_Thomas': -240,
  'America/St_Vincent': -240,
  'America/Swift_Current': -360,
  'America/Tegucigalpa': -360,
  'America/Thule': -180,
  'America/Thunder_Bay': -240,
  'America/Tijuana': -420,
  'America/Toronto': -240,
  'America/Tortola': -240,
  'America/Vancouver': -420,
  'America/Virgin': -240,
  'America/Whitehorse': -420,
  'America/Winnipeg': -300,
  'America/Yakutat': -480,
  'America/Yellowknife': -360,
  'Antarctica/Casey': 480,
  'Antarctica/Davis': 420,
  'Antarctica/DumontDUrville': 600,
  'Antarctica/Macquarie': 660,
  'Antarctica/Mawson': 300,
  'Antarctica/McMurdo': 720,
  'Antarctica/Palmer': -180,
  'Antarctica/Rothera': -180,
  'Antarctica/South_Pole': 720,
  'Antarctica/Syowa': 180,
  'Antarctica/Troll': 120,
  'Antarctica/Vostok': 360,
  'Arctic/Longyearbyen': 120,
  'Asia/Aden': 180,
  'Asia/Almaty': 360,
  'Asia/Amman': 180,
  'Asia/Anadyr': 720,
  'Asia/Aqtau': 300,
  'Asia/Aqtobe': 300,
  'Asia/Ashgabat': 300,
  'Asia/Ashkhabad': 300,
  'Asia/Baghdad': 180,
  'Asia/Bahrain': 180,
  'Asia/Baku': 300,
  'Asia/Bangkok': 420,
  'Asia/Beirut': 180,
  'Asia/Bishkek': 360,
  'Asia/Brunei': 480,
  'Asia/Calcutta': 330,
  'Asia/Chita': 480,
  'Asia/Choibalsan': 480,
  'Asia/Chongqing': 480,
  'Asia/Chungking': 480,
  'Asia/Colombo': 330,
  'Asia/Dacca': 360,
  'Asia/Damascus': 180,
  'Asia/Dhaka': 360,
  'Asia/Dili': 540,
  'Asia/Dubai': 240,
  'Asia/Dushanbe': 300,
  'Asia/Gaza': 180,
  'Asia/Harbin': 480,
  'Asia/Hebron': 180,
  'Asia/Ho_Chi_Minh': 420,
  'Asia/Hong_Kong': 480,
  'Asia/Hovd': 420,
  'Asia/Irkutsk': 480,
  'Asia/Istanbul': 180,
  'Asia/Jakarta': 420,
  'Asia/Jayapura': 540,
  'Asia/Jerusalem': 180,
  'Asia/Kabul': 270,
  'Asia/Kamchatka': 720,
  'Asia/Karachi': 300,
  'Asia/Kashgar': 360,
  'Asia/Kathmandu': 345,
  'Asia/Katmandu': 345,
  'Asia/Khandyga': 540,
  'Asia/Kolkata': 330,
  'Asia/Krasnoyarsk': 420,
  'Asia/Kuala_Lumpur': 480,
  'Asia/Kuching': 480,
  'Asia/Kuwait': 180,
  'Asia/Macao': 480,
  'Asia/Macau': 480,
  'Asia/Magadan': 600,
  'Asia/Makassar': 480,
  'Asia/Manila': 480,
  'Asia/Muscat': 240,
  'Asia/Nicosia': 180,
  'Asia/Novokuznetsk': 420,
  'Asia/Novosibirsk': 360,
  'Asia/Omsk': 360,
  'Asia/Oral': 300,
  'Asia/Phnom_Penh': 420,
  'Asia/Pontianak': 420,
  'Asia/Pyongyang': 540,
  'Asia/Qatar': 180,
  'Asia/Qyzylorda': 360,
  'Asia/Rangoon': 390,
  'Asia/Riyadh': 180,
  'Asia/Saigon': 420,
  'Asia/Sakhalin': 600,
  'Asia/Samarkand': 300,
  'Asia/Seoul': 540,
  'Asia/Shanghai': 480,
  'Asia/Singapore': 480,
  'Asia/Srednekolymsk': 660,
  'Asia/Taipei': 480,
  'Asia/Tashkent': 300,
  'Asia/Tbilisi': 240,
  'Asia/Tehran': 270,
  'Asia/Tel_Aviv': 180,
  'Asia/Thimbu': 360,
  'Asia/Thimphu': 360,
  'Asia/Tokyo': 540,
  'Asia/Ujung_Pandang': 480,
  'Asia/Ulaanbaatar': 480,
  'Asia/Ulan_Bator': 480,
  'Asia/Urumqi': 360,
  'Asia/Ust-Nera': 600,
  'Asia/Vientiane': 420,
  'Asia/Vladivostok': 600,
  'Asia/Yakutsk': 540,
  'Asia/Yekaterinburg': 300,
  'Asia/Yerevan': 240,
  'Atlantic/Azores': 0,
  'Atlantic/Bermuda': -180,
  'Atlantic/Canary': 60,
  'Atlantic/Cape_Verde': -60,
  'Atlantic/Faeroe': 60,
  'Atlantic/Faroe': 60,
  'Atlantic/Jan_Mayen': 120,
  'Atlantic/Madeira': 60,
  'Atlantic/Reykjavik': 0,
  'Atlantic/South_Georgia': -120,
  'Atlantic/St_Helena': 0,
  'Atlantic/Stanley': -180,
  'Australia/ACT': 600,
  'Australia/Adelaide': 570,
  'Australia/Brisbane': 600,
  'Australia/Broken_Hill': 570,
  'Australia/Canberra': 600,
  'Australia/Currie': 600,
  'Australia/Darwin': 570,
  'Australia/Eucla': 525,
  'Australia/Hobart': 600,
  'Australia/LHI': 630,
  'Australia/Lindeman': 600,
  'Australia/Lord_Howe': 630,
  'Australia/Melbourne': 600,
  'Australia/NSW': 600,
  'Australia/North': 570,
  'Australia/Perth': 480,
  'Australia/Queensland': 600,
  'Australia/South': 570,
  'Australia/Sydney': 600,
  'Australia/Tasmania': 600,
  'Australia/Victoria': 600,
  'Australia/West': 480,
  'Australia/Yancowinna': 570,
  'Brazil/Acre': -300,
  'Brazil/DeNoronha': -120,
  'Brazil/East': -180,
  'Brazil/West': -240,
  'Canada/Atlantic': -180,
  'Canada/Central': -300,
  'Canada/East-Saskatchewan': -360,
  'Canada/Eastern': -240,
  'Canada/Mountain': -360,
  'Canada/Newfoundland': -150,
  'Canada/Pacific': -420,
  'Canada/Saskatchewan': -360,
  'Canada/Yukon': -420,
  'Chile/Continental': -180,
  'Chile/EasterIsland': -300,
  'Etc/GMT': 0,
  'Etc/GMT+0': 0,
  'Etc/GMT+1': -60,
  'Etc/GMT+10': -600,
  'Etc/GMT+11': -660,
  'Etc/GMT+12': -720,
  'Etc/GMT+2': -120,
  'Etc/GMT+3': -180,
  'Etc/GMT+4': -240,
  'Etc/GMT+5': -300,
  'Etc/GMT+6': -360,
  'Etc/GMT+7': -420,
  'Etc/GMT+8': -480,
  'Etc/GMT+9': -540,
  'Etc/GMT-0': 0,
  'Etc/GMT-1': 60,
  'Etc/GMT-10': 600,
  'Etc/GMT-11': 660,
  'Etc/GMT-12': 720,
  'Etc/GMT-13': 780,
  'Etc/GMT-14': 840,
  'Etc/GMT-2': 120,
  'Etc/GMT-3': 180,
  'Etc/GMT-4': 240,
  'Etc/GMT-5': 300,
  'Etc/GMT-6': 360,
  'Etc/GMT-7': 420,
  'Etc/GMT-8': 480,
  'Etc/GMT-9': 540,
  'Etc/GMT0': 0,
  'Etc/Greenwich': 0,
  'Etc/UCT': 0,
  'Etc/UTC': 0,
  'Etc/Universal': 0,
  'Etc/Zulu': 0,
  'Europe/Amsterdam': 120,
  'Europe/Andorra': 120,
  'Europe/Athens': 180,
  'Europe/Belfast': 60,
  'Europe/Belgrade': 120,
  'Europe/Berlin': 120,
  'Europe/Bratislava': 120,
  'Europe/Brussels': 120,
  'Europe/Bucharest': 180,
  'Europe/Budapest': 120,
  'Europe/Busingen': 120,
  'Europe/Chisinau': 180,
  'Europe/Copenhagen': 120,
  'Europe/Dublin': 60,
  'Europe/Gibraltar': 120,
  'Europe/Guernsey': 60,
  'Europe/Helsinki': 180,
  'Europe/Isle_of_Man': 60,
  'Europe/Istanbul': 180,
  'Europe/Jersey': 60,
  'Europe/Kaliningrad': 120,
  'Europe/Kiev': 180,
  'Europe/Lisbon': 60,
  'Europe/Ljubljana': 120,
  'Europe/London': 60,
  'Europe/Luxembourg': 120,
  'Europe/Madrid': 120,
  'Europe/Malta': 120,
  'Europe/Mariehamn': 180,
  'Europe/Minsk': 180,
  'Europe/Monaco': 120,
  'Europe/Moscow': 180,
  'Europe/Nicosia': 180,
  'Europe/Oslo': 120,
  'Europe/Paris': 120,
  'Europe/Podgorica': 120,
  'Europe/Prague': 120,
  'Europe/Riga': 180,
  'Europe/Rome': 120,
  'Europe/Samara': 240,
  'Europe/San_Marino': 120,
  'Europe/Sarajevo': 120,
  'Europe/Simferopol': 180,
  'Europe/Skopje': 120,
  'Europe/Sofia': 180,
  'Europe/Stockholm': 120,
  'Europe/Tallinn': 180,
  'Europe/Tirane': 120,
  'Europe/Tiraspol': 180,
  'Europe/Uzhgorod': 180,
  'Europe/Vaduz': 120,
  'Europe/Vatican': 120,
  'Europe/Vienna': 120,
  'Europe/Vilnius': 180,
  'Europe/Volgograd': 180,
  'Europe/Warsaw': 120,
  'Europe/Zagreb': 120,
  'Europe/Zaporozhye': 180,
  'Europe/Zurich': 120,
  'Indian/Antananarivo': 180,
  'Indian/Chagos': 360,
  'Indian/Christmas': 420,
  'Indian/Cocos': 390,
  'Indian/Comoro': 180,
  'Indian/Kerguelen': 300,
  'Indian/Mahe': 240,
  'Indian/Maldives': 300,
  'Indian/Mauritius': 240,
  'Indian/Mayotte': 180,
  'Indian/Reunion': 240,
  'Mexico/BajaNorte': -420,
  'Mexico/BajaSur': -360,
  'Mexico/General': -300,
  'Pacific/Apia': 780,
  'Pacific/Auckland': 720,
  'Pacific/Chatham': 765,
  'Pacific/Chuuk': 600,
  'Pacific/Easter': -300,
  'Pacific/Efate': 660,
  'Pacific/Enderbury': 780,
  'Pacific/Fakaofo': 780,
  'Pacific/Fiji': 720,
  'Pacific/Funafuti': 720,
  'Pacific/Galapagos': -360,
  'Pacific/Gambier': -540,
  'Pacific/Guadalcanal': 660,
  'Pacific/Guam': 600,
  'Pacific/Honolulu': -600,
  'Pacific/Johnston': -600,
  'Pacific/Kiritimati': 840,
  'Pacific/Kosrae': 660,
  'Pacific/Kwajalein': 720,
  'Pacific/Majuro': 720,
  'Pacific/Marquesas': -570,
  'Pacific/Midway': -660,
  'Pacific/Nauru': 720,
  'Pacific/Niue': -660,
  'Pacific/Norfolk': 690,
  'Pacific/Noumea': 660,
  'Pacific/Pago_Pago': -660,
  'Pacific/Palau': 540,
  'Pacific/Pitcairn': -480,
  'Pacific/Pohnpei': 660,
  'Pacific/Ponape': 660,
  'Pacific/Port_Moresby': 600,
  'Pacific/Rarotonga': -600,
  'Pacific/Saipan': 600,
  'Pacific/Samoa': -660,
  'Pacific/Tahiti': -600,
  'Pacific/Tarawa': 720,
  'Pacific/Tongatapu': 780,
  'Pacific/Truk': 600,
  'Pacific/Wake': 720,
  'Pacific/Wallis': 720,
  'Pacific/Yap': 600
};

},{}],5:[function(_dereq_,module,exports){
'use strict';

var Spacetime = _dereq_('./spacetime');
var pkg = _dereq_('../package.json');

var main = function main(input, tz) {
  return new Spacetime(input, tz);
};

//some helper fns
main.now = function (tz) {
  return new Spacetime(new Date().getTime(), tz);
};
main.today = function (tz) {
  var space = new Spacetime(new Date().getTime(), tz);
  return space.morning();
};

//this is handy
main.version = pkg.version;

module.exports = main;

},{"../package.json":1,"./spacetime":19}],6:[function(_dereq_,module,exports){
'use strict';

var fmt = _dereq_('./lib/fmt');
// const world = require('./lib/world');

var addMethods = function addMethods(Space) {

  var methods = {

    niceTime: function niceTime() {
      return fmt.time(this.d);
    },
    niceDate: function niceDate() {
      return fmt.day(this.d);
    },
    format: function format() {
      return fmt.daytime(this.d);
    },
    log: function log() {
      console.log(fmt.daytime(this.d));
      return this;
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;

},{"./lib/fmt":10}],7:[function(_dereq_,module,exports){
'use strict';

//

var dayOfYear = function dayOfYear(d) {
  var sum = 0;
  var month = d.getMonth();
  var tmp = void 0;
  for (var i = 0; i < month; i++) {
    tmp = new Date();
    tmp.setMonth(i);
    tmp.setDate(1);
    tmp.setHours(-2);
    // console.log(i + '   ' + tmp.getDate());
    sum += tmp.getDate();
  }
  return sum + d.getDate();
};

// function leapYear(year){
//   return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
// }

module.exports = dayOfYear;

},{}],8:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  breakfast: 8,
  morning: 9,
  noon: 12,
  lunch: 13,
  afternoon: 14,
  dinner: 18,
  supper: 18,
  evening: 19,
  night: 20
};

},{}],9:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  short: ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'],
  long: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
};

},{}],10:[function(_dereq_,module,exports){
'use strict';

var months = _dereq_('./months').short;

var day = function day(d) {
  return months[d.getMonth()] + ' ' + d.getDate();
};

var time = function time(d) {
  //hours
  var hour = d.getHours();
  var am = 'am ';
  if (hour > 12) {
    hour -= 12;
    am = 'pm ';
  } else if (hour === 0) {
    hour = 12;
  }
  hour = '' + hour;
  if (hour.length === 1) {
    hour = ' ' + hour;
  }
  //minutes
  var minutes = d.getMinutes();
  if (('' + minutes).length === 1) {
    minutes = '0' + minutes;
  }
  var str = hour + ':' + minutes + am;
  return str;
};

var daytime = function daytime(d) {
  return '  ' + day(d) + '  ' + time(d);
};

module.exports = {
  day: day,
  time: time,
  daytime: daytime
};

},{"./months":11}],11:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  short: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'],
  long: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
};

},{}],12:[function(_dereq_,module,exports){
'use strict';

var second = 1000;
var minute = 60 * second;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
//
module.exports = {
  second: second,
  seconds: second,

  minute: minute,
  minutes: minute,

  hour: hour,
  hours: hour,

  day: day,
  days: day,

  week: week,
  weeks: week
};

},{}],13:[function(_dereq_,module,exports){
"use strict";

module.exports = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1]];

},{}],14:[function(_dereq_,module,exports){
'use strict';

//https://www.timeanddate.com/calendar/aboutseasons.html
//northern hemisphere hard-coded for now (eep!)

// Spring - from March 1 to May 31;
// Summer - from June 1 to August 31;
// Fall (autumn) - from September 1 to November 30; and,
// Winter - from December 1 to February 28 (February 29 in a leap year).
module.exports = [['spring', 2, 1], //spring march 1
['summer', 5, 1], //june 1
['fall', 8, 1], //sept 1
['autumn', 8, 1], //sept 1
['winter', 11, 1]];

},{}],15:[function(_dereq_,module,exports){
'use strict';

// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
var dayTimes = _dereq_('./dayTimes');
var ms = _dereq_('./ms');

module.exports = {

  seconds: function seconds(s, n) {
    var current = s.second();
    var diff = current - n;
    //milliseconds to shift by
    var shift = diff * ms.second;
    return s.epoch - shift;
  },
  minutes: function minutes(s, n) {
    var current = s.minute();
    var diff = current - n;
    //milliseconds to shift by
    var shift = diff * ms.minute;
    return s.epoch - shift;
  },

  hours: function hours(s, n) {
    var current = s.hour();
    var diff = current - n;
    //milliseconds to shift by
    var shift = diff * ms.hour;
    return s.epoch - shift;
  },

  date: function date(s, want) {
    var diff = want - s.date();
    var epoch = s.epoch;
    return epoch + diff * ms.day;
  },

  dayOfYear: function dayOfYear(s, want) {
    var diff = want - s.dayOfYear();
    var epoch = s.epoch;
    return epoch + diff * ms.day;
  },

  timeOfDay: function timeOfDay(s, str) {
    if (dayTimes[str] !== undefined) {
      s.hour(dayTimes[str]);
      s.minute(0);
      s.second(0);
      return s.epoch;
    }
    return null;
  }

};

},{"./dayTimes":8,"./ms":12}],16:[function(_dereq_,module,exports){
'use strict';

var ms = _dereq_('./lib/ms');

var addMethods = function addMethods(Space) {

  var methods = {
    add: function add(num, unit) {
      if (ms[unit] !== undefined) {
        var shift = num * ms[unit];
        this.epoch += shift;
      } else if (unit === 'month' || unit === 'months') {
        var n = this.month();
        this.month(n + num);
      } else if (unit === 'quarter' || unit === 'quarters') {
        var _n = this.quarter();
        this.quarter(_n + num);
      } else if (unit === 'year' || unit === 'years') {
        var _n2 = this.year();
        this.year(_n2 + num);
      }
      return this;
    },
    subtract: function subtract(num, unit) {
      this.add(num * -1, unit);
      return this;
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;

},{"./lib/ms":12}],17:[function(_dereq_,module,exports){
'use strict';

var months = _dereq_('./lib/months');
var days = _dereq_('./lib/days');
var quarters = _dereq_('./lib/quarters');
var seasons = _dereq_('./lib/seasons');
var dayTimes = _dereq_('./lib/dayTimes');
var set = _dereq_('./lib/set');
var _dayOfYear = _dereq_('./lib/dayOfYear');

var addMethods = function addMethods(Space) {

  var methods = {

    second: function second(num) {
      if (num !== undefined) {
        this.epoch = set.seconds(this, num);
        return this;
      }
      return this.d.getSeconds();
    },
    minute: function minute(num) {
      if (num !== undefined) {
        this.epoch = set.minutes(this, num);
        return this;
      }
      return this.d.getMinutes();
    },

    hour: function hour(num) {
      var d = this.d;
      if (num !== undefined) {
        this.epoch = set.hours(this, num);
        return this;
      }
      return d.getHours();
    },

    //'3:30' is 3.5
    hourFloat: function hourFloat(num) {
      if (num !== undefined) {
        var _minute = num % 1;
        _minute = _minute * 60;
        var _hour = parseInt(num, 10);
        this.epoch = set.hours(this, _hour);
        this.epoch = set.minutes(this, _minute);
        return this;
      }
      var d = this.d;
      var hour = d.getHours();
      var minute = d.getMinutes();
      minute = minute / 60;
      return hour + minute;
    },

    ampm: function ampm(input) {
      var which = 'am';
      var hour = this.hour();
      if (hour >= 12) {
        which = 'pm';
      }
      if (input === undefined) {
        return which;
      }
      if (input === which) {
        return this;
      }
      if (input === 'am') {
        this.subtract(12, 'hours');
      } else {
        this.add(12, 'hours');
      }
      return this;
    },

    timeOfDay: function timeOfDay(str) {
      //set the time of day
      if (str !== undefined) {
        this.epoch = set.timeOfDay(this, str);
        return this;
      }
      //which time of day is it?
      var hour = this.hour();
      if (hour < dayTimes[hour]) {
        return 'night';
      }
      var keys = Object.keys(dayTimes);
      for (var i = 0; i < keys.length; i++) {
        if (hour <= dayTimes[keys[i]]) {
          return keys[i];
        }
      }
      return 'night';
    },

    date: function date(num) {
      if (num !== undefined) {
        this.epoch = set.date(this, num);
        return this;
      }
      return this.d.getDate();
    },

    dayOfYear: function dayOfYear(num) {
      if (num !== undefined) {
        this.epoch = set.dayOfYear(this, num);
        return this;
      }
      return _dayOfYear(this.d);
    },

    //since the start of the year
    week: function week(num) {
      if (num !== undefined) {
        this.month(0);
        this.date(1);
        this.day(1); //monday
        num -= 1; //1-based
        this.add(num, 'weeks');
        return this;
      }
      //find-out which week it is
      var tmp = this.clone();
      tmp.month(0);
      tmp.date(1);
      tmp.hour(0);
      tmp.minute(1);
      tmp.day(1); //monday
      var thisOne = this.epoch;
      //if the week technically hasn't started yet
      if (tmp.epoch > thisOne) {
        return 1;
      }
      for (var i = 0; i < 52; i++) {
        if (tmp.epoch > thisOne) {
          return i;
        }
        tmp.add(1, 'week');
      }
      return 52;
    },

    quarter: function quarter(num) {
      if (num !== undefined && quarters[num]) {
        var _month = quarters[num][0];
        this.month(_month);
        this.date(1);
        return this;
      }
      var month = this.d.getMonth();
      for (var i = 1; i < quarters.length; i++) {
        if (month < quarters[i][0]) {
          return i - 1;
        }
      }
      return 4;
    },
    season: function season(input) {
      if (input !== undefined) {
        for (var i = 0; i < seasons.length; i++) {
          if (input === seasons[i][0]) {
            this.month(seasons[i][1]);
            this.date(1);
          }
        }
        return this;
      }
      var month = this.d.getMonth();
      if (month < seasons[0][1]) {
        return 'winter';
      }
      for (var _i = 1; _i < seasons.length; _i++) {
        if (month <= seasons[_i][1]) {
          return seasons[_i][0];
        }
      }
      return 'winter';
    },

    year: function year(num) {
      if (num !== undefined) {
        var d = this.d;
        d.setFullYear(num);
        this.epoch = d.getTime();
        return this;
      }
      return this.d.getFullYear();
    },

    month: function month(input) {
      var d = this.d;
      if (input !== undefined) {
        if (typeof input === 'number') {
          d.setMonth(input);
          this.epoch = d.getTime();
          return this;
        }
        //input by month name
        input = input.toLowerCase();
        var index = months.short.indexOf(input);
        if (index === -1) {
          index = months.long.indexOf(input);
        }
        if (index !== -1) {
          d.setMonth(index);
          this.epoch = d.getTime();
          return this;
        }
      }
      return this.d.getMonth();
    },

    monthName: function monthName(input) {
      var d = this.d;
      if (input !== undefined) {
        if (typeof input === 'number') {
          d.setMonth(input);
          this.epoch = d.getTime();
          return this;
        }
        //input by month name
        input = input.toLowerCase();
        var index = months.short.indexOf(input);
        if (index === -1) {
          index = months.long.indexOf(input);
        }
        if (index !== -1) {
          d.setMonth(index);
          this.epoch = d.getTime();
          return this;
        }
      }
      return months.long[this.d.getMonth()];
    },

    day: function day(input) {
      if (input === undefined) {
        return this.d.getDay();
      }
      var num = input;
      //take 'wednesday'
      if (typeof input === 'string') {
        input = input.toLowerCase();
        num = days.short.indexOf(input);
        if (num === -1) {
          num = days.long.indexOf(input);
        }
      }
      //fail silent
      if (typeof num !== 'number' || num < 0 || num > 6) {
        return this;
      }
      //set the day, based on a number
      //always move it forward..
      var d = this.d;
      var current = d.getDay();
      if (num > current) {
        var diff = num - current;
        d.setDate(d.getDate() + diff);
      } else if (num < current) {
        var toAdd = num + (7 - current);
        d.setDate(d.getDate() + toAdd);
      }
      this.epoch = d.getTime();
      return this;
    },

    dayName: function dayName(input) {
      if (input === undefined) {
        return days.long[this.d.getDay()];
      }
      this.day(input);
      return this;
    }

  };

  //aliases
  methods.seconds = methods.second;
  methods.minutes = methods.minute;
  methods.hours = methods.hour;
  methods.days = methods.day;

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;

},{"./lib/dayOfYear":7,"./lib/dayTimes":8,"./lib/days":9,"./lib/months":11,"./lib/quarters":13,"./lib/seasons":14,"./lib/set":15}],18:[function(_dereq_,module,exports){
'use strict';

var print = {
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

var addMethods = function addMethods(Space) {

  var methods = {
    isSame: function isSame(b, unit) {
      var a = this;
      if (typeof b === 'string' || typeof b === 'number') {
        b = new Space(b);
      }
      if (unit === 'hour' || unit === 'hours') {
        return print.hour(a) === print.hour(b);
      }
      if (unit === 'day' || unit === 'days' || unit === 'date') {
        return print.day(a) === print.day(b);
      }
      if (unit === 'week' || unit === 'weeks') {
        return print.week(a) === print.week(b);
      }
      if (unit === 'month' || unit === 'months') {
        return print.month(a) === print.month(b);
      }
      if (unit === 'quarter' || unit === 'quarters') {
        return print.quarter(a) === print.quarter(b);
      }
      if (unit === 'year' || unit === 'years') {
        return print.year(a) === print.year(b);
      }
      return null;
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;

},{}],19:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getOffset = _dereq_('./gears/getOffset');
var getBias = _dereq_('./gears/getBias');

//fake timezone-support, for fakers

var SpaceTime = function () {
  function SpaceTime(input, tz) {
    _classCallCheck(this, SpaceTime);

    //the shift for the given timezone
    this.offset = getOffset(tz);
    this.tz = tz;
    //this computer's built-in offset
    this.bias = getBias();

    if (typeof input === 'number') {
      this.epoch = input;
    } else {
      var d = new Date(input);
      this.epoch = d.getTime() - this.shift();
    }
  }

  _createClass(SpaceTime, [{
    key: 'shift',
    value: function shift() {
      //movement in milliseconds
      var shift = this.offset * 60 * 1000;
      //remove this computer's offset
      shift = shift + this.bias * 60 * 1000;
      return shift;
    }
    //a js date object

  }, {
    key: 'isValid',
    value: function isValid() {
      return isNaN(this.d.getTime());
    }
  }, {
    key: 'here',
    value: function here() {
      var d = new Date(this.epoch);
      // d.setYear(this.year());
      // d.setMonth(this.monthNum());
      // d.setDate(this.date());
      // d.setHours(this.hour());
      return d;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new SpaceTime(this.epoch, this.tz);
    }

    //travel to this timezone

  }, {
    key: 'goto',
    value: function goto(tz) {
      this.tz = tz;
      this.offset = getOffset(tz);
      return this;
    }
  }, {
    key: 'd',
    get: function get() {
      var epoch = this.epoch + this.shift();
      //delete this after..
      Date.prototype.log = function () {
        console.log(this.toLocaleDateString().replace(/\/[0-9]{4}/, '') + '  -  ' + this.toLocaleTimeString());
      };
      var d = new Date(epoch);
      return d;
    }
  }]);

  return SpaceTime;
}();
//append methods


SpaceTime = _dereq_('./methods/query')(SpaceTime);
SpaceTime = _dereq_('./methods/move')(SpaceTime);
SpaceTime = _dereq_('./methods/same')(SpaceTime);
SpaceTime = _dereq_('./methods/format')(SpaceTime);

module.exports = SpaceTime;

},{"./gears/getBias":2,"./gears/getOffset":3,"./methods/format":6,"./methods/move":16,"./methods/query":17,"./methods/same":18}]},{},[5])(5)
});