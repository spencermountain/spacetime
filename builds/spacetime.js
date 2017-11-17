/* spacetime v2.1.0
  
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetime = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

//used for summer/winter things
module.exports = {
  south: {
    'America/Argentina': true,
    'America/Lima': true,
    'America/La_Paz': true,
    'America/Manaus': true,
    'America/Asuncion': true,
    'America/Buenos_Aires': true,
    'America/Montevideo': true,
    'America/Cordoba': true,
    'America/Stanley': true,
    'America/Santiago': true,
    'Brazil/Acre': true,

    'Africa/Luanda': true,
    'Africa/Windhoek': true,
    'Africa/Maseru': true,
    'Africa/Gaborone': true,
    'Africa/Maputo': true,
    'Africa/Mbabane': true,
    'Africa/Lusaka': true,
    'Africa/Kinshasa': true,
    'Africa/Johannesburg': true,
    'Africa/Lubumbashi': true,
    'Africa/Harare': true,

    'Asia/Dili': true,
    'Asia/Makassar': true,
    'Asia/Jakarta': true,
    'Asia/Singapore': true,
    'Asia/Kuala_Lumpur': true,
    'Chile/EasterIsland': true,
    'Pacific/Apia': true,
    'Pacific/Chatham': true,
    'Pacific/Easter': true,

    'Indian/Reunion': true,
    'Indian/Antananarivo': true,
    'Indian/Kerguelen': true
  }
};

},{}],2:[function(_dereq_,module,exports){
'use strict';

var zonefile = _dereq_('./zonefile.2017.json');
var hemispheres = _dereq_('./hemisphere');

//assumed hemisphere, based on continent
var southern = {
  Australia: true,
  Chile: true,
  Brazil: true,
  Antarctica: true
};

//compress timezone data by continent
var unpack = function unpack(obj) {
  var all = {};
  var keys = Object.keys(obj);
  keys.forEach(function (cont) {
    var cities = Object.keys(obj[cont]);
    cities.forEach(function (city) {
      var tz = cont + '/' + city;
      var arr = obj[cont][city];

      all[tz] = {
        o: arr[0],
        h: arr[1]
      };
      if (arr[2]) {
        all[tz].dst = arr[2];
      }
      //assume north, unless it says otherwise (sorry!)
      all[tz].h = all[tz].h || 'n';
      if (southern[cont] === true || hemispheres.south[tz]) {
        all[tz].h = 's';
      }
    });
  });
  //add this rando
  all['Etc/UTC'] = {
    o: 0,
    h: "n"
  };
  all.UTC = all['Etc/UTC'];
  return all;
};

var data = unpack(zonefile);
// console.log(data);
module.exports = data;

},{"./hemisphere":1,"./zonefile.2017.json":3}],3:[function(_dereq_,module,exports){
module.exports={
  "Africa": {
    "Abidjan": [
      0,
      "n"
    ],
    "Accra": [
      0,
      "n"
    ],
    "Addis_Ababa": [
      3,
      "n"
    ],
    "Algiers": [
      1,
      "n"
    ],
    "Asmara": [
      3,
      "n"
    ],
    "Asmera": [
      3,
      "n"
    ],
    "Bamako": [
      0,
      "n"
    ],
    "Bangui": [
      1,
      "n"
    ],
    "Banjul": [
      0,
      "n"
    ],
    "Bissau": [
      0,
      "n"
    ],
    "Blantyre": [
      2,
      "n"
    ],
    "Brazzaville": [
      1,
      "n"
    ],
    "Bujumbura": [
      2,
      "n"
    ],
    "Cairo": [
      2,
      "n"
    ],
    "Casablanca": [
      1,
      "n",
      "07/02:03->10/29:02"
    ],
    "Ceuta": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Conakry": [
      0,
      "n"
    ],
    "Dakar": [
      0,
      "n"
    ],
    "Dar_es_Salaam": [
      3,
      "n"
    ],
    "Djibouti": [
      3,
      "n"
    ],
    "Douala": [
      1,
      "n"
    ],
    "El_Aaiun": [
      1,
      "n",
      "07/02:03->10/29:02"
    ],
    "Freetown": [
      0,
      "n"
    ],
    "Gaborone": [
      2,
      "s"
    ],
    "Harare": [
      2,
      "s"
    ],
    "Johannesburg": [
      2,
      "s"
    ],
    "Juba": [
      3,
      "n"
    ],
    "Kampala": [
      3,
      "n"
    ],
    "Khartoum": [
      3,
      "n"
    ],
    "Kigali": [
      2,
      "n"
    ],
    "Kinshasa": [
      1,
      "s"
    ],
    "Lagos": [
      1,
      "n"
    ],
    "Libreville": [
      1,
      "n"
    ],
    "Lome": [
      0,
      "n"
    ],
    "Luanda": [
      1,
      "s"
    ],
    "Lubumbashi": [
      2,
      "s"
    ],
    "Lusaka": [
      2,
      "s"
    ],
    "Malabo": [
      1,
      "n"
    ],
    "Maputo": [
      2,
      "s"
    ],
    "Maseru": [
      2,
      "s"
    ],
    "Mbabane": [
      2,
      "s"
    ],
    "Mogadishu": [
      3,
      "n"
    ],
    "Monrovia": [
      0,
      "n"
    ],
    "Nairobi": [
      3,
      "n"
    ],
    "Ndjamena": [
      1,
      "n"
    ],
    "Niamey": [
      1,
      "n"
    ],
    "Nouakchott": [
      0,
      "n"
    ],
    "Ouagadougou": [
      0,
      "n"
    ],
    "Porto-Novo": [
      1,
      "n"
    ],
    "Sao_Tome": [
      0,
      "n"
    ],
    "Timbuktu": [
      0,
      "n"
    ],
    "Tripoli": [
      2,
      "n"
    ],
    "Tunis": [
      1,
      "n"
    ],
    "Windhoek": [
      1,
      "s",
      "04/02:01->09/03:03"
    ]
  },
  "America": {
    "Adak": [
      -9,
      "n",
      "03/12:03->11/05:01"
    ],
    "Anchorage": [
      -8,
      "n",
      "03/12:03->11/05:01"
    ],
    "Anguilla": [
      -4,
      "n"
    ],
    "Antigua": [
      -4,
      "n"
    ],
    "Araguaina": [
      -3,
      "n"
    ],
    "Argentina": [
      -3,
      "s"
    ],
    "Aruba": [
      -4,
      "n"
    ],
    "Asuncion": [
      -4,
      "s",
      "03/25:23->10/01:01"
    ],
    "Atikokan": [
      -5,
      "n"
    ],
    "Atka": [
      -9,
      "n",
      "03/12:03->11/05:01"
    ],
    "Bahia": [
      -3,
      "n"
    ],
    "Bahia_Banderas": [
      -5,
      "n",
      "04/02:03->10/29:01"
    ],
    "Barbados": [
      -4,
      "n"
    ],
    "Belem": [
      -3,
      "n"
    ],
    "Belize": [
      -6,
      "n"
    ],
    "Blanc-Sablon": [
      -4,
      "n"
    ],
    "Boa_Vista": [
      -4,
      "n"
    ],
    "Bogota": [
      -5,
      "n"
    ],
    "Boise": [
      -6,
      "n",
      "03/12:03->11/05:01"
    ],
    "Buenos_Aires": [
      -3,
      "s"
    ],
    "Cambridge_Bay": [
      -6,
      "n",
      "03/12:03->11/05:01"
    ],
    "Campo_Grande": [
      -4,
      "s",
      "02/18:23->10/15:01"
    ],
    "Cancun": [
      -5,
      "n"
    ],
    "Caracas": [
      -4.5,
      "n"
    ],
    "Catamarca": [
      -3,
      "n"
    ],
    "Cayenne": [
      -3,
      "n"
    ],
    "Cayman": [
      -5,
      "n"
    ],
    "Chicago": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Chihuahua": [
      -6,
      "n",
      "04/02:03->10/29:01"
    ],
    "Coral_Harbour": [
      -5,
      "n"
    ],
    "Cordoba": [
      -3,
      "s"
    ],
    "Costa_Rica": [
      -6,
      "n"
    ],
    "Creston": [
      -7,
      "n"
    ],
    "Cuiaba": [
      -4,
      "s",
      "02/18:23->10/15:01"
    ],
    "Curacao": [
      -4,
      "n"
    ],
    "Danmarkshavn": [
      0,
      "n"
    ],
    "Dawson": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ],
    "Dawson_Creek": [
      -7,
      "n"
    ],
    "Denver": [
      -6,
      "n",
      "03/12:03->11/05:01"
    ],
    "Detroit": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Dominica": [
      -4,
      "n"
    ],
    "Edmonton": [
      -6,
      "n",
      "03/12:03->11/05:01"
    ],
    "Eirunepe": [
      -5,
      "n"
    ],
    "El_Salvador": [
      -6,
      "n"
    ],
    "Ensenada": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ],
    "Fort_Wayne": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Fortaleza": [
      -3,
      "n"
    ],
    "Glace_Bay": [
      -3,
      "n",
      "03/12:03->11/05:01"
    ],
    "Godthab": [
      -3,
      "n",
      "03/25:23->10/28:22"
    ],
    "Goose_Bay": [
      -3,
      "n",
      "03/12:03->11/05:01"
    ],
    "Grand_Turk": [
      -4,
      "n"
    ],
    "Grenada": [
      -4,
      "n"
    ],
    "Guadeloupe": [
      -4,
      "n"
    ],
    "Guatemala": [
      -6,
      "n"
    ],
    "Guayaquil": [
      -5,
      "n"
    ],
    "Guyana": [
      -4,
      "n"
    ],
    "Halifax": [
      -3,
      "n",
      "03/12:03->11/05:01"
    ],
    "Havana": [
      -4,
      "n",
      "03/12:01->11/05:00"
    ],
    "Hermosillo": [
      -7,
      "n"
    ],
    "Indiana": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Indianapolis": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Inuvik": [
      -6,
      "n",
      "03/12:03->11/05:01"
    ],
    "Iqaluit": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Jamaica": [
      -5,
      "n"
    ],
    "Jujuy": [
      -3,
      "n"
    ],
    "Juneau": [
      -8,
      "n",
      "03/12:03->11/05:01"
    ],
    "Kentucky": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Knox_IN": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Kralendijk": [
      -4,
      "n"
    ],
    "La_Paz": [
      -4,
      "s"
    ],
    "Lima": [
      -5,
      "s"
    ],
    "Los_Angeles": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ],
    "Louisville": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Lower_Princes": [
      -4,
      "n"
    ],
    "Maceio": [
      -3,
      "n"
    ],
    "Managua": [
      -6,
      "n"
    ],
    "Manaus": [
      -4,
      "s"
    ],
    "Marigot": [
      -4,
      "n"
    ],
    "Martinique": [
      -4,
      "n"
    ],
    "Matamoros": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Mazatlan": [
      -6,
      "n",
      "04/02:03->10/29:01"
    ],
    "Mendoza": [
      -3,
      "n"
    ],
    "Menominee": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Merida": [
      -5,
      "n",
      "04/02:03->10/29:01"
    ],
    "Metlakatla": [
      -8,
      "n",
      "03/12:03->11/05:01"
    ],
    "Mexico_City": [
      -5,
      "n",
      "04/02:03->10/29:01"
    ],
    "Miquelon": [
      -2,
      "n",
      "03/12:03->11/05:01"
    ],
    "Moncton": [
      -3,
      "n",
      "03/12:03->11/05:01"
    ],
    "Monterrey": [
      -5,
      "n",
      "04/02:03->10/29:01"
    ],
    "Montevideo": [
      -3,
      "s"
    ],
    "Montreal": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Montserrat": [
      -4,
      "n"
    ],
    "Nassau": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "New_York": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Nipigon": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Nome": [
      -8,
      "n",
      "03/12:03->11/05:01"
    ],
    "Noronha": [
      -2,
      "n"
    ],
    "North_Dakota": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Ojinaga": [
      -6,
      "n",
      "03/12:03->11/05:01"
    ],
    "Panama": [
      -5,
      "n"
    ],
    "Pangnirtung": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Paramaribo": [
      -3,
      "n"
    ],
    "Phoenix": [
      -7,
      "n"
    ],
    "Port-au-Prince": [
      -4,
      "n"
    ],
    "Port_of_Spain": [
      -4,
      "n"
    ],
    "Porto_Acre": [
      -5,
      "n"
    ],
    "Porto_Velho": [
      -4,
      "n"
    ],
    "Puerto_Rico": [
      -4,
      "n"
    ],
    "Rainy_River": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Rankin_Inlet": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Recife": [
      -3,
      "n"
    ],
    "Regina": [
      -6,
      "n"
    ],
    "Resolute": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Rio_Branco": [
      -5,
      "n"
    ],
    "Rosario": [
      -3,
      "n"
    ],
    "Santa_Isabel": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ],
    "Santarem": [
      -3,
      "n"
    ],
    "Santiago": [
      -4,
      "s",
      "05/13:23->08/13:01"
    ],
    "Santo_Domingo": [
      -4,
      "n"
    ],
    "Sao_Paulo": [
      -3,
      "s",
      "02/18:23->10/15:01"
    ],
    "Scoresbysund": [
      0,
      "n",
      "03/26:01->10/29:00"
    ],
    "Shiprock": [
      -6,
      "n",
      "03/12:03->11/05:01"
    ],
    "Sitka": [
      -8,
      "n",
      "03/12:03->11/05:01"
    ],
    "St_Barthelemy": [
      -4,
      "n"
    ],
    "St_Johns": [
      -2.5,
      "n",
      "03/12:03->11/05:01"
    ],
    "St_Kitts": [
      -4,
      "n"
    ],
    "St_Lucia": [
      -4,
      "n"
    ],
    "St_Thomas": [
      -4,
      "n"
    ],
    "St_Vincent": [
      -4,
      "n"
    ],
    "Swift_Current": [
      -6,
      "n"
    ],
    "Tegucigalpa": [
      -6,
      "n"
    ],
    "Thule": [
      -3,
      "n",
      "03/12:03->11/05:01"
    ],
    "Thunder_Bay": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Tijuana": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ],
    "Toronto": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Tortola": [
      -4,
      "n"
    ],
    "Vancouver": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ],
    "Virgin": [
      -4,
      "n"
    ],
    "Whitehorse": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ],
    "Winnipeg": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Yakutat": [
      -8,
      "n",
      "03/12:03->11/05:01"
    ],
    "Yellowknife": [
      -6,
      "n",
      "03/12:03->11/05:01"
    ]
  },
  "Antarctica": {
    "Casey": [
      8,
      "s"
    ],
    "Davis": [
      7,
      "s"
    ],
    "DumontDUrville": [
      10,
      "s"
    ],
    "Macquarie": [
      11,
      "s"
    ],
    "Mawson": [
      5,
      "s"
    ],
    "McMurdo": [
      12,
      "s",
      "04/02:02->09/24:03"
    ],
    "Palmer": [
      -4,
      "s",
      "05/13:23->08/13:01"
    ],
    "Rothera": [
      -3,
      "s"
    ],
    "South_Pole": [
      12,
      "s",
      "04/02:02->09/24:03"
    ],
    "Syowa": [
      3,
      "s"
    ],
    "Troll": [
      2,
      "s",
      "03/26:03->10/29:01"
    ],
    "Vostok": [
      6,
      "s"
    ]
  },
  "Arctic": {
    "Longyearbyen": [
      2,
      "n",
      "03/26:03->10/29:02"
    ]
  },
  "Asia": {
    "Aden": [
      3,
      "n"
    ],
    "Almaty": [
      6,
      "n"
    ],
    "Amman": [
      3,
      "n",
      "03/31:01->10/27:00"
    ],
    "Anadyr": [
      12,
      "n"
    ],
    "Aqtau": [
      5,
      "n"
    ],
    "Aqtobe": [
      5,
      "n"
    ],
    "Ashgabat": [
      5,
      "n"
    ],
    "Ashkhabad": [
      5,
      "n"
    ],
    "Baghdad": [
      3,
      "n"
    ],
    "Bahrain": [
      3,
      "n"
    ],
    "Baku": [
      5,
      "n"
    ],
    "Bangkok": [
      7,
      "n"
    ],
    "Beirut": [
      3,
      "n",
      "03/26:01->10/28:23"
    ],
    "Bishkek": [
      6,
      "n"
    ],
    "Brunei": [
      8,
      "n"
    ],
    "Calcutta": [
      5.5,
      "n"
    ],
    "Chita": [
      10,
      "n"
    ],
    "Choibalsan": [
      8,
      "n",
      "03/25:03->09/29:23"
    ],
    "Chongqing": [
      8,
      "n"
    ],
    "Chungking": [
      8,
      "n"
    ],
    "Colombo": [
      5.5,
      "n"
    ],
    "Dacca": [
      6,
      "n"
    ],
    "Damascus": [
      3,
      "n",
      "03/31:01->10/26:23"
    ],
    "Dhaka": [
      6,
      "n"
    ],
    "Dili": [
      9,
      "s"
    ],
    "Dubai": [
      4,
      "n"
    ],
    "Dushanbe": [
      5,
      "n"
    ],
    "Gaza": [
      3,
      "n",
      "03/25:02->10/28:00"
    ],
    "Harbin": [
      8,
      "n"
    ],
    "Hebron": [
      3,
      "n",
      "03/25:02->10/28:00"
    ],
    "Ho_Chi_Minh": [
      7,
      "n"
    ],
    "Hong_Kong": [
      8,
      "n"
    ],
    "Hovd": [
      7,
      "n",
      "03/25:03->09/29:23"
    ],
    "Irkutsk": [
      9,
      "n"
    ],
    "Istanbul": [
      3,
      "n"
    ],
    "Jakarta": [
      7,
      "s"
    ],
    "Jayapura": [
      9,
      "n"
    ],
    "Jerusalem": [
      3,
      "n",
      "03/24:03->10/29:01"
    ],
    "Kabul": [
      4.5,
      "n"
    ],
    "Kamchatka": [
      13,
      "n"
    ],
    "Karachi": [
      5,
      "n"
    ],
    "Kashgar": [
      6,
      "n"
    ],
    "Kathmandu": [
      5.75,
      "n"
    ],
    "Katmandu": [
      5.75,
      "n"
    ],
    "Khandyga": [
      10,
      "n"
    ],
    "Kolkata": [
      5.5,
      "n"
    ],
    "Krasnoyarsk": [
      8,
      "n"
    ],
    "Kuala_Lumpur": [
      8,
      "s"
    ],
    "Kuching": [
      8,
      "n"
    ],
    "Kuwait": [
      3,
      "n"
    ],
    "Macao": [
      8,
      "n"
    ],
    "Macau": [
      8,
      "n"
    ],
    "Magadan": [
      12,
      "n"
    ],
    "Makassar": [
      8,
      "s"
    ],
    "Manila": [
      8,
      "n"
    ],
    "Muscat": [
      4,
      "n"
    ],
    "Nicosia": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Novokuznetsk": [
      7,
      "n"
    ],
    "Novosibirsk": [
      7,
      "n"
    ],
    "Omsk": [
      7,
      "n"
    ],
    "Oral": [
      5,
      "n"
    ],
    "Phnom_Penh": [
      7,
      "n"
    ],
    "Pontianak": [
      7,
      "n"
    ],
    "Pyongyang": [
      9,
      "n"
    ],
    "Qatar": [
      3,
      "n"
    ],
    "Qyzylorda": [
      6,
      "n"
    ],
    "Rangoon": [
      6.5,
      "n"
    ],
    "Riyadh": [
      3,
      "n"
    ],
    "Saigon": [
      7,
      "n"
    ],
    "Sakhalin": [
      11,
      "n"
    ],
    "Samarkand": [
      5,
      "n"
    ],
    "Seoul": [
      9,
      "n"
    ],
    "Shanghai": [
      8,
      "n"
    ],
    "Singapore": [
      8,
      "s"
    ],
    "Srednekolymsk": [
      12,
      "n"
    ],
    "Taipei": [
      8,
      "n"
    ],
    "Tashkent": [
      5,
      "n"
    ],
    "Tbilisi": [
      4,
      "n"
    ],
    "Tehran": [
      4.5,
      "n",
      "03/22:01->09/21:23"
    ],
    "Tel_Aviv": [
      3,
      "n",
      "03/24:03->10/29:01"
    ],
    "Thimbu": [
      6,
      "n"
    ],
    "Thimphu": [
      6,
      "n"
    ],
    "Tokyo": [
      9,
      "n"
    ],
    "Ujung_Pandang": [
      8,
      "n"
    ],
    "Ulaanbaatar": [
      8,
      "n",
      "03/25:03->09/29:23"
    ],
    "Ulan_Bator": [
      8,
      "n",
      "03/25:03->09/29:23"
    ],
    "Urumqi": [
      6,
      "n"
    ],
    "Ust-Nera": [
      11,
      "n"
    ],
    "Vientiane": [
      7,
      "n"
    ],
    "Vladivostok": [
      11,
      "n"
    ],
    "Yakutsk": [
      10,
      "n"
    ],
    "Yekaterinburg": [
      6,
      "n"
    ],
    "Yerevan": [
      4,
      "n"
    ]
  },
  "Atlantic": {
    "Azores": [
      0,
      "n",
      "03/26:01->10/29:00"
    ],
    "Bermuda": [
      -3,
      "n",
      "03/12:03->11/05:01"
    ],
    "Canary": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Cape_Verde": [
      -1,
      "n"
    ],
    "Faeroe": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Faroe": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Jan_Mayen": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Madeira": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Reykjavik": [
      0,
      "n"
    ],
    "South_Georgia": [
      -2,
      "n"
    ],
    "St_Helena": [
      0,
      "n"
    ],
    "Stanley": [
      -3,
      "n"
    ]
  },
  "Australia": {
    "ACT": [
      10,
      "s",
      "04/02:02->10/01:03"
    ],
    "Adelaide": [
      9.5,
      "s",
      "04/02:02->10/01:03"
    ],
    "Brisbane": [
      10,
      "s"
    ],
    "Broken_Hill": [
      9.5,
      "s",
      "04/02:02->10/01:03"
    ],
    "Canberra": [
      10,
      "s",
      "04/02:02->10/01:03"
    ],
    "Currie": [
      10,
      "s",
      "04/02:02->10/01:03"
    ],
    "Darwin": [
      9.5,
      "s"
    ],
    "Eucla": [
      8.75,
      "s"
    ],
    "Hobart": [
      10,
      "s",
      "04/02:02->10/01:03"
    ],
    "LHI": [
      10.5,
      "s",
      "04/02:01->10/01:02"
    ],
    "Lindeman": [
      10,
      "s"
    ],
    "Lord_Howe": [
      10.5,
      "s",
      "04/02:01->10/01:02"
    ],
    "Melbourne": [
      10,
      "s",
      "04/02:02->10/01:03"
    ],
    "NSW": [
      10,
      "s",
      "04/02:02->10/01:03"
    ],
    "North": [
      9.5,
      "s"
    ],
    "Perth": [
      8,
      "s"
    ],
    "Queensland": [
      10,
      "s"
    ],
    "South": [
      9.5,
      "s",
      "04/02:02->10/01:03"
    ],
    "Sydney": [
      10,
      "s",
      "04/02:02->10/01:03"
    ],
    "Tasmania": [
      10,
      "s",
      "04/02:02->10/01:03"
    ],
    "Victoria": [
      10,
      "s",
      "04/02:02->10/01:03"
    ],
    "West": [
      8,
      "s"
    ],
    "Yancowinna": [
      9.5,
      "s",
      "04/02:02->10/01:03"
    ]
  },
  "Brazil": {
    "Acre": [
      -5,
      "s"
    ],
    "DeNoronha": [
      -2,
      "s"
    ],
    "East": [
      -3,
      "s",
      "02/18:23->10/15:01"
    ],
    "West": [
      -4,
      "s"
    ]
  },
  "Canada": {
    "Atlantic": [
      -3,
      "n",
      "03/12:03->11/05:01"
    ],
    "Central": [
      -5,
      "n",
      "03/12:03->11/05:01"
    ],
    "East-Saskatchewan": [
      -6,
      "n"
    ],
    "Eastern": [
      -4,
      "n",
      "03/12:03->11/05:01"
    ],
    "Mountain": [
      -6,
      "n",
      "03/12:03->11/05:01"
    ],
    "Newfoundland": [
      -2.5,
      "n",
      "03/12:03->11/05:01"
    ],
    "Pacific": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ],
    "Saskatchewan": [
      -6,
      "n"
    ],
    "Yukon": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ]
  },
  "Chile": {
    "Continental": [
      -3,
      "s",
      "05/13:23->08/13:01"
    ],
    "EasterIsland": [
      -5,
      "s",
      "05/13:21->08/12:23"
    ]
  },
  "Etc": {
    "GMT": [
      0,
      "n"
    ],
    "GMT+0": [
      0,
      "n"
    ],
    "GMT+1": [
      -1,
      "n"
    ],
    "GMT+10": [
      -10,
      "n"
    ],
    "GMT+11": [
      -11,
      "n"
    ],
    "GMT+12": [
      -12,
      "n"
    ],
    "GMT+2": [
      -2,
      "n"
    ],
    "GMT+3": [
      -3,
      "n"
    ],
    "GMT+4": [
      -4,
      "n"
    ],
    "GMT+5": [
      -5,
      "n"
    ],
    "GMT+6": [
      -6,
      "n"
    ],
    "GMT+7": [
      -7,
      "n"
    ],
    "GMT+8": [
      -8,
      "n"
    ],
    "GMT+9": [
      -9,
      "n"
    ],
    "GMT-0": [
      0,
      "n"
    ],
    "GMT-1": [
      1,
      "n"
    ],
    "GMT-10": [
      10,
      "n"
    ],
    "GMT-11": [
      11,
      "n"
    ],
    "GMT-12": [
      12,
      "n"
    ],
    "GMT-13": [
      13,
      "n"
    ],
    "GMT-14": [
      14,
      "n"
    ],
    "GMT-2": [
      2,
      "n"
    ],
    "GMT-3": [
      3,
      "n"
    ],
    "GMT-4": [
      4,
      "n"
    ],
    "GMT-5": [
      5,
      "n"
    ],
    "GMT-6": [
      6,
      "n"
    ],
    "GMT-7": [
      7,
      "n"
    ],
    "GMT-8": [
      8,
      "n"
    ],
    "GMT-9": [
      9,
      "n"
    ],
    "GMT0": [
      0,
      "n"
    ],
    "Greenwich": [
      0,
      "n"
    ],
    "UCT": [
      0,
      "n"
    ],
    "UTC": [
      0,
      "n"
    ],
    "Universal": [
      0,
      "n"
    ],
    "Zulu": [
      0,
      "n"
    ]
  },
  "Europe": {
    "Amsterdam": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Andorra": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Athens": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Belfast": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Belgrade": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Berlin": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Bratislava": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Brussels": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Bucharest": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Budapest": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Busingen": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Chisinau": [
      3,
      "n",
      "03/26:03->10/29:02"
    ],
    "Copenhagen": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Dublin": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Gibraltar": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Guernsey": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Helsinki": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Isle_of_Man": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Istanbul": [
      3,
      "n"
    ],
    "Jersey": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Kaliningrad": [
      3,
      "n"
    ],
    "Kiev": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Lisbon": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Ljubljana": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "London": [
      1,
      "n",
      "03/26:02->10/29:01"
    ],
    "Luxembourg": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Madrid": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Malta": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Mariehamn": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Minsk": [
      3,
      "n"
    ],
    "Monaco": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Moscow": [
      3,
      "n"
    ],
    "Nicosia": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Oslo": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Paris": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Podgorica": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Prague": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Riga": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Rome": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Samara": [
      4,
      "n"
    ],
    "San_Marino": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Sarajevo": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Simferopol": [
      3,
      "n"
    ],
    "Skopje": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Sofia": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Stockholm": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Tallinn": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Tirane": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Tiraspol": [
      3,
      "n",
      "03/26:03->10/29:02"
    ],
    "Uzhgorod": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Vaduz": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Vatican": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Vienna": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Vilnius": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Volgograd": [
      3,
      "n"
    ],
    "Warsaw": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Zagreb": [
      2,
      "n",
      "03/26:03->10/29:02"
    ],
    "Zaporozhye": [
      3,
      "n",
      "03/26:04->10/29:03"
    ],
    "Zurich": [
      2,
      "n",
      "03/26:03->10/29:02"
    ]
  },
  "Indian": {
    "Antananarivo": [
      3,
      "s"
    ],
    "Chagos": [
      6,
      "n"
    ],
    "Christmas": [
      7,
      "n"
    ],
    "Cocos": [
      6.5,
      "n"
    ],
    "Comoro": [
      3,
      "n"
    ],
    "Kerguelen": [
      5,
      "s"
    ],
    "Mahe": [
      4,
      "n"
    ],
    "Maldives": [
      5,
      "n"
    ],
    "Mauritius": [
      4,
      "n"
    ],
    "Mayotte": [
      3,
      "n"
    ],
    "Reunion": [
      4,
      "s"
    ]
  },
  "Mexico": {
    "BajaNorte": [
      -7,
      "n",
      "03/12:03->11/05:01"
    ],
    "BajaSur": [
      -6,
      "n",
      "04/02:03->10/29:01"
    ],
    "General": [
      -5,
      "n",
      "04/02:03->10/29:01"
    ]
  },
  "Pacific": {
    "Apia": [
      13,
      "s",
      "04/02:03->09/24:04"
    ],
    "Auckland": [
      12,
      "s",
      "04/02:02->09/24:03"
    ],
    "Chatham": [
      12.75,
      "s",
      "04/02:02->09/24:03"
    ],
    "Chuuk": [
      10,
      "n"
    ],
    "Easter": [
      -5,
      "s",
      "05/13:21->08/12:23"
    ],
    "Efate": [
      11,
      "n"
    ],
    "Enderbury": [
      13,
      "n"
    ],
    "Fakaofo": [
      13,
      "n"
    ],
    "Fiji": [
      12,
      "s",
      "01/15:02->11/05:03"
    ],
    "Funafuti": [
      12,
      "n"
    ],
    "Galapagos": [
      -6,
      "n"
    ],
    "Gambier": [
      -9,
      "n"
    ],
    "Guadalcanal": [
      11,
      "n"
    ],
    "Guam": [
      10,
      "n"
    ],
    "Honolulu": [
      -10,
      "n"
    ],
    "Johnston": [
      -10,
      "n"
    ],
    "Kiritimati": [
      14,
      "n"
    ],
    "Kosrae": [
      11,
      "n"
    ],
    "Kwajalein": [
      12,
      "n"
    ],
    "Majuro": [
      12,
      "n"
    ],
    "Marquesas": [
      -9.5,
      "n"
    ],
    "Midway": [
      -11,
      "n"
    ],
    "Nauru": [
      12,
      "n"
    ],
    "Niue": [
      -11,
      "n"
    ],
    "Norfolk": [
      11.5,
      "n"
    ],
    "Noumea": [
      11,
      "n"
    ],
    "Pago_Pago": [
      -11,
      "n"
    ],
    "Palau": [
      9,
      "n"
    ],
    "Pitcairn": [
      -8,
      "n"
    ],
    "Pohnpei": [
      11,
      "n"
    ],
    "Ponape": [
      11,
      "n"
    ],
    "Port_Moresby": [
      10,
      "n"
    ],
    "Rarotonga": [
      -10,
      "n"
    ],
    "Saipan": [
      10,
      "n"
    ],
    "Samoa": [
      -11,
      "n"
    ],
    "Tahiti": [
      -10,
      "n"
    ],
    "Tarawa": [
      12,
      "n"
    ],
    "Tongatapu": [
      13,
      "s",
      "01/15:02->11/05:03"
    ],
    "Truk": [
      10,
      "n"
    ],
    "Wake": [
      12,
      "n"
    ],
    "Wallis": [
      12,
      "n"
    ],
    "Yap": [
      10,
      "n"
    ]
  }
}

},{}],4:[function(_dereq_,module,exports){
module.exports={
  "name": "spacetime",
  "version": "2.1.0",
  "description": "represent dates in remote timezones",
  "main": "./builds/spacetime.js",
  "license": "Apache-2.0",
  "scripts": {
    "precommit": "lint-staged",
    "build": "node ./scripts/build.js",
    "demo": "node ./scripts/demo.js",
    "watch": "node ./scripts/watch.js",
    "test": "TESTENV=dev tape ./test/**/*.test.js | tap-dot",
    "testb": "TESTENV=prod tape ./test/**/*.test.js | tap-dot",
    "lint": "eslint .",
    "size": "./node_modules/.bin/size-limit",
    "prepublish": "./node_modules/.bin/size-limit",
    "coverage": "node ./scripts/coverage.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/smallwins/spacetime.git"
  },
  "files": [
    "builds/"
  ],
  "dependencies": {},
  "devDependencies": {
    "babel-preset-es2015": "6.9.0",
    "babel-preset-stage-2": "^6.11.0",
    "babelify": "7.3.0",
    "browserify": "13.0.1",
    "derequire": "^2.0.3",
    "eslint": "^3.1.1",
    "eslint-plugin-prettier": "^2.1.2",
    "gaze": "^1.1.1",
    "nyc": "^8.4.0",
    "prettier": "^1.5.3",
    "shelljs": "^0.7.2",
    "size-limit": "^0.8.0",
    "tap-dot": "^1.0.5",
    "tape": "4.6.0",
    "timekeeper": "^1.0.0",
    "uglify-js": "2.7.0"
  },
  "size-limit": [
    {
      "path": "builds/spacetime.js",
      "limit": "12 KB"
    }
  ]
}

},{}],5:[function(_dereq_,module,exports){
'use strict';

var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

module.exports = {
  short: function short() {
    return shortDays;
  },
  long: function long() {
    return longDays;
  },
  set: function set(i18n) {
    shortDays = i18n.short;
    longDays = i18n.long;
  }
};

},{}],6:[function(_dereq_,module,exports){
'use strict';

var o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e6; // dst is supported post-hoc
o.day = 8.64e7;
o.date = 8.64e7;
o.month = 8.64e7 * 29.5; //(average)
o.week = 6.048e8;
o.year = 3.154e10; // leap-years are supported post-hoc
//add plurals
Object.keys(o).forEach(function (k) {
  o[k + 's'] = o[k];
});
module.exports = o;

},{}],7:[function(_dereq_,module,exports){
"use strict";

module.exports = [31, //January - 31 days
28, //February - 28 days in a common year and 29 days in leap years
31, //March - 31 days
30, //April - 30 days
31, //May - 31 days
30, //June - 30 days
31, //July - 31 days
31, //August - 31 days
30, //September - 30 days
31, //October - 31 days
30, //November - 30 days
31];

},{}],8:[function(_dereq_,module,exports){
'use strict';

var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function buildMapping() {
  var obj = {};
  for (var i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i;
  }
  for (var _i = 0; _i < longMonths.length; _i++) {
    obj[longMonths[_i]] = _i;
  }
  return obj;
}

module.exports = {
  short: function short() {
    return shortMonths;
  },
  long: function long() {
    return longMonths;
  },
  mapping: function mapping() {
    return buildMapping();
  },
  set: function set(i18n) {
    shortMonths = i18n.short;
    longMonths = i18n.long;
  }
};

},{}],9:[function(_dereq_,module,exports){
"use strict";

module.exports = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1]];

},{}],10:[function(_dereq_,module,exports){
'use strict';

//https://www.timeanddate.com/calendar/aboutseasons.html
// Spring - from March 1 to May 31;
// Summer - from June 1 to August 31;
// Fall (autumn) - from September 1 to November 30; and,
// Winter - from December 1 to February 28 (February 29 in a leap year).
module.exports = {
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

},{}],11:[function(_dereq_,module,exports){
'use strict';

var Spacetime = _dereq_('./spacetime');
var timezones = _dereq_('../data');

exports.whereIts = function (a, b) {
  var start = new Spacetime(null);
  var end = new Spacetime(null);
  start.time(a);
  //if b is undefined, use as 'within one hour'
  if (b) {
    end.time(b);
  } else {
    end = start.clone().add(59, 'minutes');
  }

  var startHour = start.hour();
  var endHour = end.hour();
  var tzs = Object.keys(timezones).filter(function (tz) {
    var m = new Spacetime(null, tz);
    var hour = m.hour();
    //do 'calendar-compare' not real-time-compare
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

},{"../data":2,"./spacetime":33}],12:[function(_dereq_,module,exports){
'use strict';

exports.isDate = function (d) {
  return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
};
exports.isArray = function (input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};
exports.isObject = function (input) {
  return Object.prototype.toString.call(input) === '[object Object]';
};

exports.zeroPad = function (str, len) {
  len = len || 2;
  var pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
};

exports.titleCase = function (str) {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
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
};

exports.normalize = function (str) {
  str = str.toLowerCase();
  str = str.replace(/s$/, '');
  if (str === 'day') {
    return 'date';
  }
  return str;
};

exports.getEpoch = function (tmp) {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp;
  }
  //suport date objects
  if (exports.isDate(tmp)) {
    return tmp.getTime();
  }
  if (tmp.epoch) {
    return tmp.epoch;
  }
  return null;
};

},{}],13:[function(_dereq_,module,exports){
'use strict';

var Spacetime = _dereq_('./spacetime');
var whereIts = _dereq_('./findTz').whereIts;
var pkg = _dereq_('../package.json');

var main = function main(input, tz) {
  return new Spacetime(input, tz);
};

//some helper functions on the main method
main.now = function (tz) {
  return new Spacetime(new Date().getTime(), tz);
};
main.today = function (tz) {
  var s = new Spacetime(new Date().getTime(), tz);
  return s.startOf('day');
};
main.tomorrow = function (tz) {
  var s = new Spacetime(new Date().getTime(), tz);
  return s.add(1, 'day').startOf('day');
};
main.yesterday = function (tz) {
  var s = new Spacetime(new Date().getTime(), tz);
  return s.subtract(1, 'day').startOf('day');
};
//find tz by time
main.whereIts = whereIts;
//this is handy
main.version = pkg.version;

module.exports = main;

},{"../package.json":4,"./findTz":11,"./spacetime":33}],14:[function(_dereq_,module,exports){
'use strict';

var strFmt = _dereq_('./strParse');
var fns = _dereq_('../fns');
//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

//support [2016, 03, 01] format
var handleArray = function handleArray(s, arr) {
  var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
  for (var i = 0; i < arr.length; i++) {
    var num = arr[i] || 0;
    s[order[i]](num);
  }
  return s;
};
//support {year:2016, month:3} format
var handleObject = function handleObject(s, obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var unit = keys[i];
    if (s[unit] !== undefined) {
      var num = obj[unit] || 0;
      s[unit](num);
    }
  }
  return s;
};

//find the epoch from different input styles
var parseInput = function parseInput(s, input) {
  if (typeof input === 'number') {
    s.epoch = input;
    return;
  }
  //set tmp time
  s.epoch = Date.now();
  if (input === null || input === undefined) {
    return; //k, we're good.
  }
  //support input of Date() object
  if (fns.isDate(input) === true) {
    s.epoch = input.getTime();
    return;
  }
  //support [2016, 03, 01] format
  if (fns.isArray(input) === true) {
    handleArray(s, input);
    return;
  }
  //support {year:2016, month:3} format
  if (fns.isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch;
      return;
    }
    handleObject(s, input);
    return;
  }
  if (typeof input !== 'string') {
    return;
  }
  for (var i = 0; i < strFmt.length; i++) {
    var m = input.match(strFmt[i].reg);
    if (m) {
      strFmt[i].parse(s, m);
      return;
    }
  }
  s.epoch = null;
  s.valid = false;
  return;
};
module.exports = parseInput;

},{"../fns":12,"./strParse":15}],15:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('../methods/set/walk');
var months = _dereq_('../data/months');

var parseHour = function parseHour(s, str) {
  str = str.replace(/^\s+/, ''); //trim
  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);
  if (arr) {
    s.hour(arr[1]);
    s.minute(arr[2]);
    if (arr[3]) {
      s.seconds(arr[3]);
    }
    if (arr[4]) {
      s.millisecond(arr[4]);
    }
  }
};

var strFmt = [
//iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
{
  reg: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})T([0-9:-\\.]+)(Z|[0-9\-\+]+)?$/,
  parse: function parse(s, arr) {
    var month = parseInt(arr[2], 10) - 1;
    walkTo(s, {
      year: arr[1],
      month: month,
      date: arr[3]
    });
    parseHour(s, arr[4]);
  }
},
//iso "2015-03-25" or "2015/03/25" //0-based-months!
{
  reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
  parse: function parse(s, arr) {
    var month = parseInt(arr[2], 10) - 1;
    var date = parseInt(arr[3], 10);
    if (month >= 12) {
      //support yyyy/dd/mm (weird, but ok)
      date = parseInt(arr[2], 10);
      month = parseInt(arr[3], 10) - 1;
    }
    walkTo(s, {
      year: arr[1],
      month: month,
      date: date
    });
  }
},
//short - uk "03/25/2015"  //0-based-months!
{
  reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]([0-9]{4})$/,
  parse: function parse(s, arr) {
    var month = parseInt(arr[1], 10) - 1;
    var date = parseInt(arr[2], 10);
    if (month >= 12) {
      //support yyyy/dd/mm (weird, but ok)
      month = parseInt(arr[2], 10) - 1;
      date = parseInt(arr[1], 10);
    }
    walkTo(s, {
      year: arr[3],
      month: month,
      date: date
    });
  }
},
//Long "Mar 25 2015"
//February 22, 2017 15:30:00
{
  reg: /^([a-z]+) ([0-9]{1,2}),? ([0-9]{4})( ([0-9:]+))?$/i,
  parse: function parse(s, arr) {
    var month = months.mapping()[arr[1].toLowerCase()];
    walkTo(s, {
      year: arr[3],
      month: month,
      date: arr[2]
    });
    if (arr[4]) {
      parseHour(s, arr[4]);
    }
  }
},
//Long "25 Mar 2015"
{
  reg: /^([0-9]{1,2}) ([a-z]+),? ([0-9]{4})$/i,
  parse: function parse(s, arr) {
    var month = months.mapping()[arr[2].toLowerCase()];
    walkTo(s, {
      year: arr[3],
      month: month,
      date: arr[1]
    });
  }
}];

module.exports = strFmt;

},{"../data/months":8,"../methods/set/walk":31}],16:[function(_dereq_,module,exports){
'use strict';

var _format = _dereq_('./methods/format');
var _progress = _dereq_('./methods/progress');
var _nearest = _dereq_('./methods/nearest');
var _diff = _dereq_('./methods/diff');
var ends = _dereq_('./methods/startOf');
var _timezone = _dereq_('./timezone/index');
var handleInput = _dereq_('./input');

//the spacetime instance methods (also, the API)
var methods = {
  set: function set(input) {
    handleInput(this, input);
    return this;
  },
  timezone: function timezone() {
    return _timezone(this);
  },
  isDST: function isDST() {
    return _timezone(this).current.isDST;
  },
  hasDST: function hasDST() {
    return _timezone(this).hasDst;
  },
  offset: function offset() {
    return _timezone(this).current.offset / 60;
  },
  hemisphere: function hemisphere() {
    return _timezone(this).hemisphere;
  },

  format: function format(fmt) {
    return _format(this, fmt);
  },
  startOf: function startOf(unit) {
    return ends.startOf(this, unit);
  },
  endOf: function endOf(unit) {
    return ends.endOf(this, unit);
  },
  leapYear: function leapYear() {
    var year = this.year();
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  },
  progress: function progress() {
    return _progress(this);
  },
  nearest: function nearest(unit) {
    return _nearest(this, unit);
  },
  diff: function diff(d, unit) {
    return _diff(this, d, unit);
  },
  isValid: function isValid() {
    return this.valid && !isNaN(this.d.getTime());
  },
  //travel to this timezone
  goto: function goto(tz) {
    this.tz = tz; //science!
    return this;
  },
  isAsleep: function isAsleep() {
    var hour = this.hour();
    if (hour < 8 || hour > 22) {
      //10pm -> 8am
      return true;
    }
    return false;
  },
  //pretty-printing
  log: function log() {
    console.log('');
    console.log(_format(this, 'nice-short'));
    return this;
  },
  logYear: function logYear() {
    console.log('');
    console.log(_format(this, 'full-short'));
    return this;
  }
};
methods.inDST = methods.isDST;
methods.round = methods.nearest;
module.exports = methods;

},{"./input":14,"./methods/diff":19,"./methods/format":20,"./methods/nearest":23,"./methods/progress":24,"./methods/startOf":32,"./timezone/index":35}],17:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('./set/walk');
var ms = _dereq_('../data/milliseconds');
var monthLength = _dereq_('../data/monthLength');
var fns = _dereq_('../fns');

var order = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
var keep = {
  second: order.slice(0, 1),
  minute: order.slice(0, 2),
  quarterhour: order.slice(0, 2),
  hour: order.slice(0, 3),
  date: order.slice(0, 4),
  month: order.slice(0, 4),
  quarter: order.slice(0, 4),
  season: order.slice(0, 4),
  year: order
};
keep.week = keep.date;
keep.season = keep.date;
keep.quarter = keep.date;

var keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true
};
//month is the only thing we 'model/compute'
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
    want.year = old.year() - _years;
    //ignore extras
    want.month = want.month % 12;
    want.month = want.month + 12;
    if (want.month === 12) {
      want.month = 0;
    }
  }
  return want;
};

var addMethods = function addMethods(SpaceTime) {
  SpaceTime.prototype.add = function (num, unit) {
    var old = this.clone();
    unit = fns.normalize(unit);
    //move forward by the estimated milliseconds (rough)
    if (ms[unit]) {
      this.epoch += ms[unit] * num;
    } else if (unit === 'week') {
      this.epoch += ms.day * (num * 7);
    } else if (unit === 'quarter' || unit === 'season') {
      this.epoch += ms.month * (num * 4);
    } else if (unit === 'season') {
      this.epoch += ms.month * (num * 4);
    } else if (unit === 'quarterhour') {
      this.epoch += ms.minute * 15;
    }
    //now ensure our milliseconds/etc are in-line
    var want = {};
    if (keep[unit]) {
      keep[unit].forEach(function (u) {
        want[u] = old[u]();
      });
    }
    //ensure month/year has ticked-over
    if (unit === 'month') {
      want.month = old.month() + num;
      //month is the one unit we 'model' directly
      want = rollMonth(want, old);
    }
    //support 25-hour day-changes on dst-changes
    else if (unit === 'date' && num !== 0 && old.isSame(this, 'day')) {
        want.date = old.date() + num;
      }
      //ensure year has changed (leap-years)
      else if (unit === 'year' && this.year() === old.year()) {
          this.epoch += ms.week;
        }
    //keep current date, unless the month doesn't have it.
    if (keepDate[unit]) {
      var max = monthLength[want.month];
      want.date = old.date();
      if (want.date > max) {
        want.date = max;
      }
    }
    walkTo(this, want);
    return this;
  };

  //subtract is only add *-1
  SpaceTime.prototype.subtract = function (num, unit) {
    this.add(num * -1, unit);
    return this;
  };
};

module.exports = addMethods;

},{"../data/milliseconds":6,"../data/monthLength":7,"../fns":12,"./set/walk":31}],18:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

var addMethods = function addMethods(SpaceTime) {
  var methods = {
    isAfter: function isAfter(d) {
      var epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch > epoch;
    },
    isBefore: function isBefore(d) {
      var epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch < epoch;
    },
    isEqual: function isEqual(d) {
      var epoch = fns.getEpoch(d);
      if (epoch === null) {
        return null;
      }
      return this.epoch === epoch;
    },
    isBetween: function isBetween(start, end) {
      var startEpoch = fns.getEpoch(start);
      if (startEpoch === null) {
        return null;
      }
      var endEpoch = fns.getEpoch(end);
      if (endEpoch === null) {
        return null;
      }
      return startEpoch < this.epoch && this.epoch < endEpoch;
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../fns":12}],19:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

//increment until dates are the same
var climb = function climb(a, b, unit) {
  var i = 0;
  a = a.clone();
  while (a.isBefore(b)) {
    a.add(1, unit);
    i += 1;
  }
  if (!a.isSame(b, unit)) {
    i -= 1;
  }
  return i;
};

var diff = function diff(a, b, unit) {
  unit = fns.normalize(unit);
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    //reverse it
    return climb(b, a, unit) * -1;
  }
};
module.exports = diff;

},{"../fns":12}],20:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../../fns');
var months = _dereq_('../../data/months');
var days = _dereq_('../../data/days');
var unixFmt = _dereq_('./unixFmt');

var fmt = {
  day: function day(s) {
    return fns.titleCase(days.long()[s.day()]);
  },
  'day-short': function dayShort(s) {
    return fns.titleCase(days.short()[s.day()]);
  },
  date: function date(s) {
    return '' + s.date();
  },
  'date-ordinal': function dateOrdinal(s) {
    return fns.ordinal(s.date());
  },
  month: function month(s) {
    return fns.titleCase(months.long()[s.month()]);
  },
  'month-short': function monthShort(s) {
    return fns.titleCase(months.short()[s.month()]);
  },
  time: function time(s) {
    return s.h12() + ':' + fns.zeroPad(s.minute()) + s.ampm(); //3:45pm
  },
  'time-24h': function time24h(s) {
    return s.hour() + ':' + fns.zeroPad(s.minute()); //13:45
  },
  year: function year(s) {
    return '' + s.year();
  },
  'year-short': function yearShort(s) {
    return "'" + ('' + s.year()).substr(2, 4);
  },
  'numeric-us': function numericUs(s) {
    return fns.zeroPad(s.month() + 1) + '/' + fns.zeroPad(s.date()) + '/' + s.year(); //mm/dd/yyyy
  },
  'numeric-uk': function numericUk(s) {
    return fns.zeroPad(s.date()) + '/' + fns.zeroPad(s.month() + 1) + '/' + s.year(); //dd/mm/yyyy
  },
  'numeric-cn': function numericCn(s) {
    return s.year() + '/' + fns.zeroPad(s.month() + 1) + '/' + fns.zeroPad(s.date()); //yyyy/mm/dd
  },
  iso: function iso(s) {
    var month = fns.zeroPad(s.month() + 1); //1-based months
    var date = fns.zeroPad(s.date());
    var hour = fns.zeroPad(s.h24());
    var minute = fns.zeroPad(s.minute());
    var second = fns.zeroPad(s.second());
    var ms = fns.zeroPad(s.millisecond(), 3);
    return s.year() + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + second + ':' + ms + 'Z'; //2017-03-08T19:45:28.367Z
  },
  'iso-short': function isoShort(s) {
    var month = fns.zeroPad(s.month() + 1); //1-based months
    var date = fns.zeroPad(s.date());
    return s.year() + '-' + month + '-' + date; //2017-02-15
  },
  'iso-utc': function isoUtc(s) {
    return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
  }
};
fmt['nice'] = function (s) {
  var month = fmt.month(s);
  var ord = fmt['date-ordinal'](s);
  var time = fmt.time(s);
  return month + ' ' + ord + ', ' + time;
};
fmt['nice-day'] = function (s) {
  var day = fmt.day(s);
  var month = fmt.month(s);
  var ord = fmt['date-ordinal'](s);
  var time = fmt.time(s);
  return day + ' ' + month + ' ' + ord + ', ' + time;
};
fmt['nice-short'] = function (s) {
  var month = fmt['month-short'](s);
  var ord = fmt['date-ordinal'](s);
  var time = fmt.time(s);
  return month + ' ' + ord + ', ' + time;
};
fmt['full'] = function (s) {
  var day = fmt.day(s);
  var month = fmt.month(s);
  var ord = fmt['date-ordinal'](s);
  var year = s.year();
  return day + ' ' + month + ' ' + ord + ', ' + year;
};
fmt['full-short'] = function (s) {
  var day = fmt['day-short'](s);
  var month = fmt['month-short'](s);
  var ord = fmt['date-ordinal'](s);
  var year = s.year();
  return day + ' ' + month + ' ' + ord + ', ' + year;
};
//aliases
fmt['ordinal'] = fmt['date-ordinal'];
fmt['date-short'] = fmt.date;
fmt['time-12h'] = fmt.time;
fmt['time-12'] = fmt.time;
fmt['time-h12'] = fmt['time-12h'];
fmt['time-h24'] = fmt['time-24h'];
fmt['time-24'] = fmt['time-24h'];
fmt['numeric'] = fmt['numeric-us']; //sorry!
fmt['mdy'] = fmt['numeric-us'];
fmt['dmy'] = fmt['numeric-uk'];
fmt['ymd'] = fmt['numeric-cn'];
fmt['little-endian'] = fmt['numeric-uk'];
fmt['big-endian'] = fmt['numeric-cn'];

//
var format = function format(s, str) {
  //don't print anything if it's invalid
  if (s.isValid() !== true) {
    return '';
  }
  if (fmt && fmt[str]) {
    return fmt[str](s);
  }
  if (typeof str === 'string') {
    return unixFmt(str, s);
  }
  //start building format object
  var all = Object.keys(fmt).reduce(function (h, k) {
    h[k] = fmt[k](s);
    return h;
  }, {});

  return all;
};
module.exports = format;

},{"../../data/days":5,"../../data/months":8,"../../fns":12,"./unixFmt":21}],21:[function(_dereq_,module,exports){
'use strict';

//parse this insane unix-time-templating thing, from the 19th century
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
    return s.month();
  },
  MM: function MM(s) {
    return s.format('month-short');
  },
  MMM: function MMM(s) {
    return s.format('month');
  },
  MMMM: function MMMM(s) {
    return s.format('month');
  },

  //week
  w: function w(s) {
    return s.week();
  },
  ww: function ww(s) {
    return s.week();
  },
  //week of month
  // W: (s) => s.week(),

  //date of month
  d: function d(s) {
    return s.date();
  },
  dd: function dd(s) {
    return s.date();
  },
  //date of year
  D: function D(s) {
    return s.dayOfYear();
  },
  DD: function DD(s) {
    return s.dayOfYear();
  },
  DDD: function DDD(s) {
    return s.dayOfYear();
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
    return s.h12();
  },
  H: function H(s) {
    return s.hour();
  },
  HH: function HH(s) {
    return s.hour();
  },
  // j: (s) => {},//weird hour format

  m: function m(s) {
    return s.minute();
  },
  mm: function mm(s) {
    return s.minute();
  },
  s: function s(_s) {
    return _s.second();
  },
  ss: function ss(s) {
    return s.second();
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
    return s.timezone().current.offset + '00';
  },
  ZZ: function ZZ(s) {
    return s.timezone().current.offset + '00';
  },
  ZZZ: function ZZZ(s) {
    return s.timezone().current.offset + '00';
  },
  ZZZZ: function ZZZZ(s) {
    return s.timezone().current.offset + ':00';
  }

};

var addAlias = function addAlias(char, to, n) {
  var name = char;
  var toName = to;
  for (var i = 0; i < n; i += 1) {
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
addAlias('V', 'Z', 4);

var unixFmt = function unixFmt(str, s) {
  var chars = str.split('');
  //combine consecutive chars, like 'yyyy' as one.
  var arr = [chars[0]];
  var quoteOn = false;
  for (var i = 1; i < chars.length; i += 1) {
    //support quoted substrings
    if (chars[i] === '\'') {
      quoteOn = !quoteOn;
      //support '', meaning one tick
      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
        quoteOn = true;
      } else {
        continue;
      }
    }
    //merge it with the last one
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
module.exports = unixFmt;

},{}],22:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');
var days = _dereq_('../data/days');
var months = _dereq_('../data/months');

var addMethods = function addMethods(SpaceTime) {
  var methods = {
    i18n: function i18n(data) {
      if (!fns.isObject(data) || !fns.isObject(data.days) || !fns.isObject(data.months) || !fns.isArray(data.days.short) || !fns.isArray(data.days.long) || !fns.isArray(data.months.short) || !fns.isArray(data.months.long)) {
        throw new Error('Invalid i18n payload passed.');
      }
      days.set(data.days);
      months.set(data.months);
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../data/days":5,"../data/months":8,"../fns":12}],23:[function(_dereq_,module,exports){
'use strict';
//round to either current, or +1 of this unit

var nearest = function nearest(s, unit) {
  unit = unit.toLowerCase();
  unit = unit.replace(/s$/, ''); //singular form...
  var prog = s.progress();
  if (prog[unit] !== undefined) {
    if (prog[unit] > 0.5) {
      s.add(1, unit);
    }
    s.startOf(unit);
  } else {
    console.warn("no known unit '" + unit + "'");
  }
  return s;
};
module.exports = nearest;

},{}],24:[function(_dereq_,module,exports){
'use strict';
//how far it is along, from 0-1

var progress = function progress(s) {
  var units = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];
  var obj = {};
  units.forEach(function (k) {
    var start = s.clone().startOf(k);
    var end = s.clone().endOf(k);
    var duration = end.epoch - start.epoch;
    var percent = (s.epoch - start.epoch) / duration;
    obj[k] = parseFloat(percent.toFixed(2));
  });
  return obj;
};

module.exports = progress;

},{}],25:[function(_dereq_,module,exports){
'use strict';

var quarters = _dereq_('../../data/quarters');
var seasons = _dereq_('../../data/seasons');
var set = _dereq_('../set/set');
//destructive setters change the seconds, milliseconds, etc
//- and not just the unit they're setting

var clearMinutes = function clearMinutes(s) {
  s.minute(0);
  s.second(0);
  s.millisecond(1);
};

module.exports = {
  //some ambiguity here with 12/24h
  time: function time(str) {
    if (str !== undefined) {
      this.epoch = set.time(this, str);
      return this;
    }
    return this.format('time-h12');
  },

  //since the start of the year
  week: function week(num) {
    if (num !== undefined) {
      this.month(0);
      this.date(1);
      this.day('monday');
      clearMinutes(this);
      //don't go into last-year
      if (this.monthName() === 'december') {
        this.add(1, 'week');
      }
      num -= 1; //1-based
      this.add(num, 'weeks');
      return this;
    }
    //find-out which week it is
    var tmp = this.clone();
    tmp.month(0);
    tmp.date(1);
    clearMinutes(tmp);
    tmp.day('monday');
    //don't go into last-year
    if (tmp.monthName() === 'december') {
      tmp.add(1, 'week');
    }
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
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '');
        num = parseInt(num, 10);
      }
      if (quarters[num]) {
        var _month = quarters[num][0];
        this.month(_month);
        this.date(1);
        this.hour(0);
        clearMinutes(this);
        return this;
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

  season: function season(input) {
    var hem = 'north';
    if (this.timezone().hemisphere === 'South') {
      hem = 'south';
    }
    if (input !== undefined) {
      for (var i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          this.month(seasons[hem][i][1]);
          this.date(1);
          this.hour(0);
          clearMinutes(this);
        }
      }
      return this;
    }
    var month = this.d.getMonth();
    for (var _i = 0; _i < seasons[hem].length - 1; _i++) {
      if (month >= seasons[hem][_i][1] && month < seasons[hem][_i + 1][1]) {
        return seasons[hem][_i][0];
      }
    }
    return 'winter';
  }
};

},{"../../data/quarters":9,"../../data/seasons":10,"../set/set":30}],26:[function(_dereq_,module,exports){
'use strict';

var normal = _dereq_('./normal');
var destructive = _dereq_('./destructive');
var tricky = _dereq_('./tricky');

var addMethods = function addMethods(Space) {
  //hook the methods into prototype
  Object.keys(normal).forEach(function (k) {
    Space.prototype[k] = normal[k];
  });
  Object.keys(destructive).forEach(function (k) {
    Space.prototype[k] = destructive[k];
  });
  Object.keys(tricky).forEach(function (k) {
    Space.prototype[k] = tricky[k];
  });
};

module.exports = addMethods;

},{"./destructive":25,"./normal":27,"./tricky":28}],27:[function(_dereq_,module,exports){
'use strict';

var set = _dereq_('../set/set');

//the most basic get/set methods
var methods = {
  millisecond: function millisecond(num) {
    if (num !== undefined) {
      this.epoch = set.milliseconds(this, num);
      return this;
    }
    return this.d.getMilliseconds();
  },
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
  hour12: function hour12(str) {
    var d = this.d;
    if (str !== undefined) {
      str = '' + str;
      var m = str.match(/^([0-9]+)(am|pm)$/);
      if (m) {
        var hour = parseInt(m[1], 10);
        if (m[2] === 'pm') {
          hour += 12;
        }
        this.epoch = set.hours(this, hour);
      }
      return this;
    }
    //get the hour
    var hour12 = d.getHours();
    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }
    if (hour12 === 0) {
      hour12 = 12;
    }
    return hour12;
  },

  date: function date(num) {
    if (num !== undefined) {
      this.epoch = set.date(this, num);
      return this;
    }
    return this.d.getDate();
  },
  month: function month(input) {
    if (input !== undefined) {
      this.epoch = set.month(this, input);
      return this;
    }
    return this.d.getMonth();
  },
  year: function year(num) {
    if (num !== undefined) {
      this.epoch = set.year(this, num);
      return this;
    }
    return this.d.getFullYear();
  },
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
      str = str || '';
      str = str.toLowerCase();
      if (times[str]) {
        this.time(times[str]);
      }
      return this;
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
  dayOfYear: function dayOfYear(num) {
    if (num !== undefined) {
      this.epoch = set.dayOfYear(this, num);
      return this;
    }
    //days since newyears - jan 1st is 1, jan 2nd is 2...
    var sum = 0;
    var month = this.d.getMonth();
    var tmp = void 0;
    for (var i = 0; i < month; i++) {
      tmp = new Date();
      tmp.setMonth(i);
      tmp.setDate(1);
      tmp.setHours(-2);
      sum += tmp.getDate();
    }
    return sum + this.d.getDate();
  },
  //bc/ad years
  era: function era(str) {
    if (str !== undefined) {
      str = str.toLowerCase();
      //TODO: there is no year-0AD i think. may have off-by-1 error here
      var year = this.d.getFullYear();
      //make '1992' into 1992bc..
      if (str === 'bc' && year > 0) {
        this.epoch = set.year(this, year * -1);
      }
      //make '1992bc' into '1992'
      if (str === 'ad' && year < 0) {
        this.epoch = set.year(this, year * -1);
      }
      return this;
    }
    if (this.d.getFullYear() < 0) {
      return 'BC';
    }
    return 'AD';
  }
};
//aliases
methods.milliseconds = methods.millisecond;
methods.seconds = methods.second;
methods.minutes = methods.minute;
methods.hours = methods.hour;
methods.hour24 = methods.hour;
methods.h12 = methods.hour12;
methods.h24 = methods.hour24;
methods.days = methods.day;

module.exports = methods;

},{"../set/set":30}],28:[function(_dereq_,module,exports){
'use strict';

var days = _dereq_('../../data/days');
var months = _dereq_('../../data/months');
var walkTo = _dereq_('../set/walk');

//non-destructive getters/setters with fancy moves to do
module.exports = {
  //like 'wednesday' (hard!)
  day: function day(input) {
    if (input === undefined) {
      return this.d.getDay();
    }
    var original = this.clone();
    var want = input;
    // accept 'wednesday'
    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days.short().indexOf(input);
      if (want === -1) {
        want = days.long().indexOf(input);
      }
    }
    //move approx
    var day = this.d.getDay();
    var diff = day - want;
    var s = this.subtract(diff * 24, 'hours');
    //tighten it back up
    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    this.epoch = s.epoch;
    return s;
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

  //these are helpful name-wrappers
  dayName: function dayName(input) {
    if (input === undefined) {
      return days.long()[this.day()];
    }
    this.day(input);
    return this;
  },

  monthName: function monthName(input) {
    if (input === undefined) {
      return months.long()[this.month()];
    }
    this.month(input);
    return this;
  }
};

},{"../../data/days":5,"../../data/months":8,"../set/walk":31}],29:[function(_dereq_,module,exports){
'use strict';

//easy comparison between dates

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

var addMethods = function addMethods(SpaceTime) {
  SpaceTime.prototype.isSame = function (b, unit) {
    var a = this;
    if (typeof b === 'string' || typeof b === 'number') {
      b = new SpaceTime(b, this.timezone.name);
    }
    //support 'seconds' aswell as 'second'
    unit = unit.replace(/s$/, '');

    if (print[unit]) {
      return print[unit](a) === print[unit](b);
    }
    return null;
  };
};

module.exports = addMethods;

},{}],30:[function(_dereq_,module,exports){
'use strict';
// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.

var ms = _dereq_('../../data/milliseconds');
var months = _dereq_('../../data/months');
var monthLength = _dereq_('../../data/monthLength');
var walkTo = _dereq_('./walk');

var validate = function validate(n) {
  //handle number as a string
  if (typeof n === 'string') {
    n = parseInt(n, 10);
  }
  return n;
};

var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

//reduce hostile micro-changes when moving dates by millisecond
var confirm = function confirm(s, tmp, unit) {
  var n = order.indexOf(unit);
  var arr = order.slice(n, order.length);
  for (var i = 0; i < arr.length; i++) {
    var want = tmp[arr[i]]();
    s[arr[i]](want);
  }
  return s;
};

module.exports = {
  milliseconds: function milliseconds(s, n) {
    n = validate(n);
    var current = s.millisecond();
    var diff = current - n; //milliseconds to shift by
    return s.epoch - diff;
  },

  seconds: function seconds(s, n) {
    n = validate(n);
    var diff = s.second() - n;
    var shift = diff * ms.second;
    return s.epoch - shift;
  },

  minutes: function minutes(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = s.minute() - n;
    var shift = diff * ms.minute;
    s.epoch -= shift;
    confirm(s, old, 'second');
    return s.epoch;
  },

  hours: function hours(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = s.hour() - n;
    var shift = diff * ms.hour;
    s.epoch -= shift;
    confirm(s, old, 'minute');
    return s.epoch;
  },

  //support setting time by '4:25pm' - this isn't very-well developed..
  time: function time(s, str) {
    var m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);
    if (!m) {
      //fallback to support just '2am'
      m = str.match(/([0-9]{1,2})(am|pm)/);
      if (!m) {
        return s.epoch;
      }
      m.splice(2, 0, '0'); //add implicit 0 minutes
    }
    var h24 = false;
    var hour = parseInt(m[1], 10);
    var minute = parseInt(m[2], 10);
    if (hour > 12) {
      h24 = true;
    }
    //make the hour into proper 24h time
    if (h24 === false) {
      if (m[3] === 'am' && hour === 12) {
        //12am is midnight
        hour = 0;
      }
      if (m[3] === 'pm' && hour < 12) {
        //12pm is noon
        hour += 12;
      }
    }
    s.hour(hour);
    s.minute(minute);
    s.second(0);
    s.millisecond(0);
    return s.epoch;
  },

  date: function date(s, n) {
    n = validate(n);
    walkTo(s, {
      date: n
    });
    return s.epoch;
  },

  //this one's tricky
  month: function month(s, n) {
    if (typeof n === 'string') {
      n = months.mapping()[n.toLowerCase()];
    }
    n = validate(n);
    var date = s.date();
    //there's no 30th of february, etc.
    if (date > monthLength[n]) {
      //make it as close as we can..
      date = monthLength[n];
    }
    walkTo(s, {
      month: n,
      date: date
    });
    return s.epoch;
  },

  year: function year(s, n) {
    n = validate(n);
    walkTo(s, {
      year: n
    });
    return s.epoch;
  },

  dayOfYear: function dayOfYear(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = n - s.dayOfYear();
    var shift = diff * ms.day;
    s.epoch += shift;
    confirm(s, old, 'hour');
    return s.epoch;
  }
};

},{"../../data/milliseconds":6,"../../data/monthLength":7,"../../data/months":8,"./walk":31}],31:[function(_dereq_,module,exports){
'use strict';

var ms = _dereq_('../../data/milliseconds');

//find the desired date by a increment/check while loop
var units = {
  year: {
    valid: function valid(n) {
      return n > -4000 && n < 4000;
    },
    walkTo: function walkTo(s, n) {
      while (s.year() < n) {
        s.epoch += ms.year;
      }
      while (s.year() > n) {
        s.epoch -= ms.year;
      }
    }
  },
  month: {
    valid: function valid(n) {
      return n >= 0 && n <= 11;
    },
    walkTo: function walkTo(s, n) {
      while (s.month() < n) {
        s.epoch += ms.day;
      }
      while (s.month() > n) {
        s.epoch -= ms.day;
      }
    }
  },
  date: {
    valid: function valid(n) {
      return n > 0 && n <= 31;
    },
    walkTo: function walkTo(s, n) {
      while (s.date() < n) {
        s.epoch += ms.day;
      }
      while (s.date() > n) {
        s.epoch -= ms.day;
      }
    }
  },
  hour: {
    valid: function valid(n) {
      return n >= 0 && n < 24;
    },
    walkTo: function walkTo(s, n) {
      while (s.hour() < n) {
        s.epoch += ms.hour;
      }
      while (s.hour() > n) {
        s.epoch -= ms.hour;
      }
    }
  },
  minute: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      while (s.minute() < n) {
        s.epoch += ms.minute;
      }
      while (s.minute() > n) {
        s.epoch -= ms.minute;
      }
    }
  },
  second: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      while (s.second() < n) {
        s.epoch += ms.second;
      }
      while (s.second() > n) {
        s.epoch -= ms.second;
      }
    }
  },
  millisecond: {
    valid: function valid(n) {
      return n >= 0 && n < 1000;
    },
    walkTo: function walkTo(s, n) {
      //do this one directly
      s.milliseconds(n);
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
    }
    //make-sure it's valid
    if (!units[k].valid(n)) {
      s.valid = false;
      s.epoch = null;
      console.warn('invalid ' + k + ': ' + n);
      return;
    }
    units[k].walkTo(s, n);
  }
  //if we've gone over a dst-change or something..
  if (wants.hour === undefined && s.hour() !== old.hour()) {
    s.hour(old.hour());
  }
  return;
};
module.exports = walkTo;

},{"../../data/milliseconds":6}],32:[function(_dereq_,module,exports){
'use strict';

var seasons = _dereq_('../data/seasons');
var quarters = _dereq_('../data/quarters');
var walkTo = _dereq_('./set/walk');

var units = {
  minute: function minute(s) {
    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarterHour: function quarterHour(s) {
    var minute = s.minutes();
    if (minute >= 45) {
      s.minutes(45);
    } else if (minute >= 30) {
      s.minutes(30);
    } else if (minute >= 15) {
      s.minutes(15);
    } else {
      s.minutes(0);
    }
    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  hour: function hour(s) {
    walkTo(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  day: function day(s) {
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  week: function week(s) {
    var original = s.clone();
    s.day(1); //monday
    if (s.isAfter(original)) {
      s.subtract(1, 'week');
    }
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  month: function month(s) {
    walkTo(s, {
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
  season: function season(s) {
    var current = s.season();
    var hem = 'north';
    if (s.timezone().hemisphere === 'South') {
      hem = 'south';
    }
    for (var i = 0; i < seasons[hem].length; i++) {
      if (seasons[hem][i][0] === current) {
        //winter goes between years
        var year = s.year();
        if (current === 'winter' && s.month() < 3) {
          year -= 1;
        }
        walkTo(s, {
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
    walkTo(s, {
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  }
};
units.date = units.day;

var startOf = function startOf(s, unit) {
  if (units[unit]) {
    return units[unit](s);
  }
  if (unit === 'summer' || unit === 'winter') {
    s.season(unit);
    return units.season(s);
  }
  return s;
};

//piggy-backs off startOf
var endOf = function endOf(s, unit) {
  if (units[unit]) {
    s = units[unit](s);
    s.add(1, unit);
    s.subtract(1, 'milliseconds');
    return s;
  }
  return s;
};
module.exports = {
  startOf: startOf,
  endOf: endOf
};

},{"../data/quarters":9,"../data/seasons":10,"./set/walk":31}],33:[function(_dereq_,module,exports){
'use strict';

var guessTz = _dereq_('./timezone/guessTz');
var timezone = _dereq_('./timezone/index');
var handleInput = _dereq_('./input');
var methods = _dereq_('./methods');

//fake timezone-support, for fakers (es5 class)
var SpaceTime = function SpaceTime(input, tz) {
  //the shift for the given timezone
  this.tz = tz || guessTz();
  //don't output anything if it's invalid
  this.valid = true;
  //every computer is somewhere- get this computer's built-in offset
  this.bias = new Date().getTimezoneOffset() || 0;
  //add getter/setters
  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function get() {
      var meta = timezone(this) || {};
      //movement in milliseconds
      var shift = meta.current.epochShift;
      //remove this computer's offset
      shift = shift + this.bias * 60 * 1000;
      var epoch = this.epoch + shift;
      var d = new Date(epoch);
      return d;
    }
  });
  //parse the various formats
  handleInput(this, input);
};

//(add instance methods to prototype)
Object.keys(methods).forEach(function (k) {
  SpaceTime.prototype[k] = methods[k];
});
SpaceTime.prototype.clone = function () {
  return new SpaceTime(this.epoch, this.tz);
};

//append more methods
_dereq_('./methods/query')(SpaceTime);
_dereq_('./methods/add')(SpaceTime);
_dereq_('./methods/same')(SpaceTime);
_dereq_('./methods/compare')(SpaceTime);
_dereq_('./methods/i18n')(SpaceTime);

module.exports = SpaceTime;

},{"./input":14,"./methods":16,"./methods/add":17,"./methods/compare":18,"./methods/i18n":22,"./methods/query":26,"./methods/same":29,"./timezone/guessTz":34,"./timezone/index":35}],34:[function(_dereq_,module,exports){
'use strict';
//find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src

var fallbackTZ = 'Canada/Pacific'; //eeeek!

var guessTz = function guessTz() {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return fallbackTZ;
  }
  var format = Intl.DateTimeFormat();
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return fallbackTZ;
  }
  var timezone = format.resolvedOptions().timeZone;
  if (timezone && (timezone.indexOf('/') > -1 || timezone === 'UTC')) {
    return timezone;
  }
  return fallbackTZ;
};
module.exports = guessTz;

},{}],35:[function(_dereq_,module,exports){
'use strict';

var zones = _dereq_('../../data');
var summerTime = _dereq_('./summerTime');

var parseDst = function parseDst(dst) {
  if (!dst) {
    return [];
  }
  return dst.split('->');
};

//get metadata about this timezone
var timezone = function timezone(s) {
  var tz = s.tz;
  if (!zones[tz]) {
    console.warn("Warn: could not find given or local timezone - '" + tz + "'");
    return {
      current: {
        epochShift: 0
      }
    };
  }
  //do north-hemisphere version as default (sorry!)
  var m = {
    name: tz,
    hasDst: Boolean(zones[tz].dst),
    hemisphere: zones[tz].h === 's' ? 'South' : 'North', //assume north, unless told
    change: {},
    current: {}
  };
  if (m.hasDst === true) {
    var arr = parseDst(zones[tz].dst);
    m.change = {
      start: arr[0],
      back: arr[1]
    };
  }
  //find the offsets for summer/winter times
  //(these variable names are north-centric)
  var summer = zones[tz].o; // (july)
  var winter = summer; // (january) assume it's the same for now
  if (m.hasDst === true) {
    if (m.hemisphere === 'North') {
      winter = summer - 1;
    } else {
      //southern hemisphere
      winter = zones[tz].o + 1;
    }
  }

  //find out which offset to use right now
  //use 'summer' time july-time
  if (m.hasDst === false) {
    m.current.offset = summer;
    m.current.isDST = false;
  } else if (summerTime(s, m) === true) {
    m.current.offset = summer;
    m.current.isDST = m.hemisphere === 'North'; //dst 'on' in winter in north
  } else {
    //use 'winter' january-time
    m.current.offset = winter;
    m.current.isDST = m.hemisphere === 'South'; //dst 'on' in summer in south
  }
  m.current.epochShift = m.current.offset * 60 * 60 * 1000;

  return m;
};
module.exports = timezone;

},{"../../data":2,"./summerTime":36}],36:[function(_dereq_,module,exports){
'use strict';

var zeroPad = _dereq_('../fns').zeroPad;

var toString = function toString(d) {
  return zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours());
};

// a timezone will begin with a specific offset in january
// then some will switch to something else between november-march
var shouldChange = function shouldChange(s, m) {
  if (m.hasDst !== true || !m.change.start || !m.change.back) {
    return false;
  }
  //note: this has a order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  // let diff = (m.offset * 60) + s.bias
  // let approx = s.epoch + (diff * 60 * 60 * 1000)
  var d = new Date(s.epoch);
  var current = toString(d);
  //eg. is it after ~november?
  if (current >= m.change.start) {
    //eg. is it before ~march~ too?
    if (current < m.change.back) {
      return true;
    }
  }
  return false;
};
module.exports = shouldChange;

},{"../fns":12}]},{},[13])(13)
});