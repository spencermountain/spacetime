/* @smallwins/spacetime v0.0.14
  
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetime = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var zonefile = _dereq_('./zonefile.2017.json');

//compress timezone data by continent
var unpack = function unpack(obj) {
  var all = {};
  var keys = Object.keys(obj);
  keys.forEach(function (cont) {
    var cities = Object.keys(obj[cont]);
    cities.forEach(function (city) {
      var tz = cont + '/' + city;
      all[tz] = obj[cont][city];
      if (typeof all[tz] === 'number') {
        all[tz] = {
          o: all[tz]
        };
      }
      all[tz].tz = tz;
    });
  });
  //alias this one
  all.UTC = all['Etc/UTC'];
  return all;
};

var data = unpack(zonefile);
// console.log(data);
module.exports = data;

},{"./zonefile.2017.json":2}],2:[function(_dereq_,module,exports){
module.exports={
  "Africa": {
    "Abidjan": 0,
    "Accra": 0,
    "Addis_Ababa": 180,
    "Algiers": 60,
    "Asmara": 180,
    "Asmera": 180,
    "Bamako": 0,
    "Bangui": 60,
    "Banjul": 0,
    "Bissau": 0,
    "Blantyre": 120,
    "Brazzaville": 60,
    "Bujumbura": 120,
    "Cairo": 120,
    "Casablanca": {
      "o": 60,
      "h": "n",
      "dst": "6/2/3 -> 9/29/2"
    },
    "Ceuta": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Conakry": 0,
    "Dakar": 0,
    "Dar_es_Salaam": 180,
    "Djibouti": 180,
    "Douala": 60,
    "El_Aaiun": {
      "o": 60,
      "h": "n",
      "dst": "6/2/3 -> 9/29/2"
    },
    "Freetown": 0,
    "Gaborone": 120,
    "Harare": 120,
    "Johannesburg": 120,
    "Juba": 180,
    "Kampala": 180,
    "Khartoum": 180,
    "Kigali": 120,
    "Kinshasa": 60,
    "Lagos": 60,
    "Libreville": 60,
    "Lome": 0,
    "Luanda": 60,
    "Lubumbashi": 120,
    "Lusaka": 120,
    "Malabo": 60,
    "Maputo": 120,
    "Maseru": 120,
    "Mbabane": 120,
    "Mogadishu": 180,
    "Monrovia": 0,
    "Nairobi": 180,
    "Ndjamena": 60,
    "Niamey": 60,
    "Nouakchott": 0,
    "Ouagadougou": 0,
    "Porto-Novo": 60,
    "Sao_Tome": 0,
    "Timbuktu": 0,
    "Tripoli": 120,
    "Tunis": 60,
    "Windhoek": {
      "o": 60,
      "h": "s",
      "dst": "8/3/3 -> 3/2/1"
    }
  },
  "America": {
    "Adak": {
      "o": -540,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Anchorage": {
      "o": -480,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Anguilla": -240,
    "Antigua": -240,
    "Araguaina": -180,
    "Argentina": -180,
    "Aruba": -240,
    "Asuncion": {
      "o": -240,
      "h": "s",
      "dst": "9/1/1 -> 2/25/23"
    },
    "Atikokan": -300,
    "Atka": {
      "o": -540,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Bahia": -180,
    "Bahia_Banderas": {
      "o": -300,
      "h": "n",
      "dst": "3/2/3 -> 9/29/1"
    },
    "Barbados": -240,
    "Belem": -180,
    "Belize": -360,
    "Blanc-Sablon": -240,
    "Boa_Vista": -240,
    "Bogota": -300,
    "Boise": {
      "o": -360,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Buenos_Aires": -180,
    "Cambridge_Bay": {
      "o": -360,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Campo_Grande": {
      "o": -240,
      "h": "s",
      "dst": "9/15/1 -> 1/18/23"
    },
    "Cancun": -300,
    "Caracas": -270,
    "Catamarca": -180,
    "Cayenne": -180,
    "Cayman": -300,
    "Chicago": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Chihuahua": {
      "o": -360,
      "h": "n",
      "dst": "3/2/3 -> 9/29/1"
    },
    "Coral_Harbour": -300,
    "Cordoba": -180,
    "Costa_Rica": -360,
    "Creston": -420,
    "Cuiaba": {
      "o": -240,
      "h": "s",
      "dst": "9/15/1 -> 1/18/23"
    },
    "Curacao": -240,
    "Danmarkshavn": 0,
    "Dawson": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Dawson_Creek": -420,
    "Denver": {
      "o": -360,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Detroit": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Dominica": -240,
    "Edmonton": {
      "o": -360,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Eirunepe": -300,
    "El_Salvador": -360,
    "Ensenada": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Fort_Wayne": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Fortaleza": -180,
    "Glace_Bay": {
      "o": -180,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Godthab": {
      "o": -120,
      "h": "n",
      "dst": "2/25/23 -> 9/28/22"
    },
    "Goose_Bay": {
      "o": -180,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Grand_Turk": -240,
    "Grenada": -240,
    "Guadeloupe": -240,
    "Guatemala": -360,
    "Guayaquil": -300,
    "Guyana": -240,
    "Halifax": {
      "o": -180,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Havana": {
      "o": -240,
      "h": "n",
      "dst": "2/12/1 -> 10/5/0"
    },
    "Hermosillo": -420,
    "Indiana": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Indianapolis": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Inuvik": {
      "o": -360,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Iqaluit": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Jamaica": -300,
    "Jujuy": -180,
    "Juneau": {
      "o": -480,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Kentucky": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Knox_IN": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Kralendijk": -240,
    "La_Paz": -240,
    "Lima": -300,
    "Los_Angeles": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Louisville": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Lower_Princes": -240,
    "Maceio": -180,
    "Managua": -360,
    "Manaus": -240,
    "Marigot": -240,
    "Martinique": -240,
    "Matamoros": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Mazatlan": {
      "o": -360,
      "h": "n",
      "dst": "3/2/3 -> 9/29/1"
    },
    "Mendoza": -180,
    "Menominee": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Merida": {
      "o": -300,
      "h": "n",
      "dst": "3/2/3 -> 9/29/1"
    },
    "Metlakatla": {
      "o": -480,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Mexico_City": {
      "o": -300,
      "h": "n",
      "dst": "3/2/3 -> 9/29/1"
    },
    "Miquelon": {
      "o": -120,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Moncton": {
      "o": -180,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Monterrey": {
      "o": -300,
      "h": "n",
      "dst": "3/2/3 -> 9/29/1"
    },
    "Montevideo": -180,
    "Montreal": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Montserrat": -240,
    "Nassau": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "New_York": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Nipigon": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Nome": {
      "o": -480,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Noronha": -120,
    "North_Dakota": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Ojinaga": {
      "o": -360,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Panama": -300,
    "Pangnirtung": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Paramaribo": -180,
    "Phoenix": -420,
    "Port-au-Prince": -240,
    "Port_of_Spain": -240,
    "Porto_Acre": -300,
    "Porto_Velho": -240,
    "Puerto_Rico": -240,
    "Rainy_River": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Rankin_Inlet": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Recife": -180,
    "Regina": -360,
    "Resolute": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Rio_Branco": -300,
    "Rosario": -180,
    "Santa_Isabel": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Santarem": -180,
    "Santiago": {
      "o": -180,
      "h": "s",
      "dst": "7/13/1 -> 4/13/23"
    },
    "Santo_Domingo": -240,
    "Sao_Paulo": {
      "o": -180,
      "h": "s",
      "dst": "9/15/1 -> 1/18/23"
    },
    "Scoresbysund": {
      "o": 0,
      "h": "n",
      "dst": "2/26/1 -> 9/29/0"
    },
    "Shiprock": {
      "o": -360,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Sitka": {
      "o": -480,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "St_Barthelemy": -240,
    "St_Johns": {
      "o": -150,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "St_Kitts": -240,
    "St_Lucia": -240,
    "St_Thomas": -240,
    "St_Vincent": -240,
    "Swift_Current": -360,
    "Tegucigalpa": -360,
    "Thule": {
      "o": -180,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Thunder_Bay": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Tijuana": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Toronto": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Tortola": -240,
    "Vancouver": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Virgin": -240,
    "Whitehorse": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Winnipeg": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Yakutat": {
      "o": -480,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Yellowknife": {
      "o": -360,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    }
  },
  "Antarctica": {
    "Casey": 480,
    "Davis": 420,
    "DumontDUrville": 600,
    "Macquarie": 660,
    "Mawson": 300,
    "McMurdo": {
      "o": 720,
      "h": "s",
      "dst": "8/24/3 -> 3/2/2"
    },
    "Palmer": {
      "o": -180,
      "h": "s",
      "dst": "7/13/1 -> 4/13/23"
    },
    "Rothera": -180,
    "South_Pole": {
      "o": 720,
      "h": "s",
      "dst": "8/24/3 -> 3/2/2"
    },
    "Syowa": 180,
    "Troll": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/1"
    },
    "Vostok": 360
  },
  "Arctic": {
    "Longyearbyen": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    }
  },
  "Asia": {
    "Aden": 180,
    "Almaty": 360,
    "Amman": {
      "o": 180,
      "h": "n",
      "dst": "2/31/1 -> 9/27/0"
    },
    "Anadyr": 720,
    "Aqtau": 300,
    "Aqtobe": 300,
    "Ashgabat": 300,
    "Ashkhabad": 300,
    "Baghdad": 180,
    "Bahrain": 180,
    "Baku": 300,
    "Bangkok": 420,
    "Beirut": {
      "o": 180,
      "h": "n",
      "dst": "2/26/1 -> 9/28/23"
    },
    "Bishkek": 360,
    "Brunei": 480,
    "Calcutta": 330,
    "Chita": 480,
    "Choibalsan": {
      "o": 480,
      "h": "n",
      "dst": "2/25/3 -> 8/29/23"
    },
    "Chongqing": 480,
    "Chungking": 480,
    "Colombo": 330,
    "Dacca": 360,
    "Damascus": {
      "o": 180,
      "h": "n",
      "dst": "2/31/1 -> 9/26/23"
    },
    "Dhaka": 360,
    "Dili": 540,
    "Dubai": 240,
    "Dushanbe": 300,
    "Gaza": {
      "o": 180,
      "h": "n",
      "dst": "2/25/2 -> 9/28/0"
    },
    "Harbin": 480,
    "Hebron": {
      "o": 180,
      "h": "n",
      "dst": "2/25/2 -> 9/28/0"
    },
    "Ho_Chi_Minh": 420,
    "Hong_Kong": 480,
    "Hovd": {
      "o": 420,
      "h": "n",
      "dst": "2/25/3 -> 8/29/23"
    },
    "Irkutsk": 480,
    "Istanbul": 180,
    "Jakarta": 420,
    "Jayapura": 540,
    "Jerusalem": {
      "o": 180,
      "h": "n",
      "dst": "2/24/3 -> 9/29/1"
    },
    "Kabul": 270,
    "Kamchatka": 720,
    "Karachi": 300,
    "Kashgar": 360,
    "Kathmandu": 345,
    "Katmandu": 345,
    "Khandyga": 540,
    "Kolkata": 330,
    "Krasnoyarsk": 420,
    "Kuala_Lumpur": 480,
    "Kuching": 480,
    "Kuwait": 180,
    "Macao": 480,
    "Macau": 480,
    "Magadan": 600,
    "Makassar": 480,
    "Manila": 480,
    "Muscat": 240,
    "Nicosia": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Novokuznetsk": 420,
    "Novosibirsk": 360,
    "Omsk": 360,
    "Oral": 300,
    "Phnom_Penh": 420,
    "Pontianak": 420,
    "Pyongyang": 540,
    "Qatar": 180,
    "Qyzylorda": 360,
    "Rangoon": 390,
    "Riyadh": 180,
    "Saigon": 420,
    "Sakhalin": 600,
    "Samarkand": 300,
    "Seoul": 540,
    "Shanghai": 480,
    "Singapore": 480,
    "Srednekolymsk": 660,
    "Taipei": 480,
    "Tashkent": 300,
    "Tbilisi": 240,
    "Tehran": {
      "o": 270,
      "h": "n",
      "dst": "2/22/1 -> 8/21/23"
    },
    "Tel_Aviv": {
      "o": 180,
      "h": "n",
      "dst": "2/24/3 -> 9/29/1"
    },
    "Thimbu": 360,
    "Thimphu": 360,
    "Tokyo": 540,
    "Ujung_Pandang": 480,
    "Ulaanbaatar": {
      "o": 480,
      "h": "n",
      "dst": "2/25/3 -> 8/29/23"
    },
    "Ulan_Bator": {
      "o": 480,
      "h": "n",
      "dst": "2/25/3 -> 8/29/23"
    },
    "Urumqi": 360,
    "Ust-Nera": 600,
    "Vientiane": 420,
    "Vladivostok": 600,
    "Yakutsk": 540,
    "Yekaterinburg": 300,
    "Yerevan": 240
  },
  "Atlantic": {
    "Azores": {
      "o": 0,
      "h": "n",
      "dst": "2/26/1 -> 9/29/0"
    },
    "Bermuda": {
      "o": -180,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Canary": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Cape_Verde": -60,
    "Faeroe": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Faroe": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Jan_Mayen": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Madeira": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Reykjavik": 0,
    "South_Georgia": -120,
    "St_Helena": 0,
    "Stanley": -180
  },
  "Australia": {
    "ACT": {
      "o": 600,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Adelaide": {
      "o": 570,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Brisbane": 600,
    "Broken_Hill": {
      "o": 570,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Canberra": {
      "o": 600,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Currie": {
      "o": 600,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Darwin": 570,
    "Eucla": 525,
    "Hobart": {
      "o": 600,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "LHI": {
      "o": 630,
      "h": "s",
      "dst": "9/1/2 -> 3/2/1"
    },
    "Lindeman": 600,
    "Lord_Howe": {
      "o": 630,
      "h": "s",
      "dst": "9/1/2 -> 3/2/1"
    },
    "Melbourne": {
      "o": 600,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "NSW": {
      "o": 600,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "North": 570,
    "Perth": 480,
    "Queensland": 600,
    "South": {
      "o": 570,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Sydney": {
      "o": 600,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Tasmania": {
      "o": 600,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "Victoria": {
      "o": 600,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    },
    "West": 480,
    "Yancowinna": {
      "o": 570,
      "h": "s",
      "dst": "9/1/3 -> 3/2/2"
    }
  },
  "Brazil": {
    "Acre": -300,
    "DeNoronha": -120,
    "East": {
      "o": -180,
      "h": "s",
      "dst": "9/15/1 -> 1/18/23"
    },
    "West": -240
  },
  "Canada": {
    "Atlantic": {
      "o": -180,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Central": {
      "o": -300,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "East-Saskatchewan": -360,
    "Eastern": {
      "o": -240,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Mountain": {
      "o": -360,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Newfoundland": {
      "o": -150,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Pacific": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "Saskatchewan": -360,
    "Yukon": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    }
  },
  "Chile": {
    "Continental": {
      "o": -180,
      "h": "s",
      "dst": "7/13/1 -> 4/13/23"
    },
    "EasterIsland": {
      "o": -300,
      "h": "s",
      "dst": "7/12/23 -> 4/13/21"
    }
  },
  "Etc": {
    "GMT": 0,
    "GMT+0": 0,
    "GMT+1": -60,
    "GMT+10": -600,
    "GMT+11": -660,
    "GMT+12": -720,
    "GMT+2": -120,
    "GMT+3": -180,
    "GMT+4": -240,
    "GMT+5": -300,
    "GMT+6": -360,
    "GMT+7": -420,
    "GMT+8": -480,
    "GMT+9": -540,
    "GMT-0": 0,
    "GMT-1": 60,
    "GMT-10": 600,
    "GMT-11": 660,
    "GMT-12": 720,
    "GMT-13": 780,
    "GMT-14": 840,
    "GMT-2": 120,
    "GMT-3": 180,
    "GMT-4": 240,
    "GMT-5": 300,
    "GMT-6": 360,
    "GMT-7": 420,
    "GMT-8": 480,
    "GMT-9": 540,
    "GMT0": 0,
    "Greenwich": 0,
    "UCT": 0,
    "UTC": 0,
    "Universal": 0,
    "Zulu": 0
  },
  "Europe": {
    "Amsterdam": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Andorra": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Athens": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Belfast": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Belgrade": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Berlin": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Bratislava": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Brussels": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Bucharest": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Budapest": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Busingen": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Chisinau": {
      "o": 180,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Copenhagen": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Dublin": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Gibraltar": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Guernsey": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Helsinki": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Isle_of_Man": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Istanbul": 180,
    "Jersey": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Kaliningrad": 120,
    "Kiev": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Lisbon": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Ljubljana": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "London": {
      "o": 60,
      "h": "n",
      "dst": "2/26/2 -> 9/29/1"
    },
    "Luxembourg": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Madrid": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Malta": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Mariehamn": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Minsk": 180,
    "Monaco": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Moscow": 180,
    "Nicosia": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Oslo": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Paris": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Podgorica": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Prague": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Riga": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Rome": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Samara": 240,
    "San_Marino": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Sarajevo": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Simferopol": 180,
    "Skopje": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Sofia": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Stockholm": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Tallinn": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Tirane": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Tiraspol": {
      "o": 180,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Uzhgorod": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Vaduz": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Vatican": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Vienna": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Vilnius": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Volgograd": 180,
    "Warsaw": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Zagreb": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    },
    "Zaporozhye": {
      "o": 180,
      "h": "n",
      "dst": "2/26/4 -> 9/29/3"
    },
    "Zurich": {
      "o": 120,
      "h": "n",
      "dst": "2/26/3 -> 9/29/2"
    }
  },
  "Indian": {
    "Antananarivo": 180,
    "Chagos": 360,
    "Christmas": 420,
    "Cocos": 390,
    "Comoro": 180,
    "Kerguelen": 300,
    "Mahe": 240,
    "Maldives": 300,
    "Mauritius": 240,
    "Mayotte": 180,
    "Reunion": 240
  },
  "Mexico": {
    "BajaNorte": {
      "o": -420,
      "h": "n",
      "dst": "2/12/3 -> 10/5/1"
    },
    "BajaSur": {
      "o": -360,
      "h": "n",
      "dst": "3/2/3 -> 9/29/1"
    },
    "General": {
      "o": -300,
      "h": "n",
      "dst": "3/2/3 -> 9/29/1"
    }
  },
  "Pacific": {
    "Apia": {
      "o": 780,
      "h": "s",
      "dst": "8/24/4 -> 3/2/3"
    },
    "Auckland": {
      "o": 720,
      "h": "s",
      "dst": "8/24/3 -> 3/2/2"
    },
    "Chatham": {
      "o": 765,
      "h": "s",
      "dst": "8/24/3 -> 3/2/2"
    },
    "Chuuk": 600,
    "Easter": {
      "o": -300,
      "h": "s",
      "dst": "7/12/23 -> 4/13/21"
    },
    "Efate": 660,
    "Enderbury": 780,
    "Fakaofo": 780,
    "Fiji": {
      "o": 720,
      "h": "s",
      "dst": "10/5/3 -> 0/15/2"
    },
    "Funafuti": 720,
    "Galapagos": -360,
    "Gambier": -540,
    "Guadalcanal": 660,
    "Guam": 600,
    "Honolulu": -600,
    "Johnston": -600,
    "Kiritimati": 840,
    "Kosrae": 660,
    "Kwajalein": 720,
    "Majuro": 720,
    "Marquesas": -570,
    "Midway": -660,
    "Nauru": 720,
    "Niue": -660,
    "Norfolk": 690,
    "Noumea": 660,
    "Pago_Pago": -660,
    "Palau": 540,
    "Pitcairn": -480,
    "Pohnpei": 660,
    "Ponape": 660,
    "Port_Moresby": 600,
    "Rarotonga": -600,
    "Saipan": 600,
    "Samoa": -660,
    "Tahiti": -600,
    "Tarawa": 720,
    "Tongatapu": {
      "o": 780,
      "h": "s",
      "dst": "10/5/3 -> 0/15/2"
    },
    "Truk": 600,
    "Wake": 720,
    "Wallis": 720,
    "Yap": 600
  }
}
},{}],3:[function(_dereq_,module,exports){
module.exports={
  "name": "@smallwins/spacetime",
  "version": "0.0.14",
  "description": "represent dates in remote timezones",
  "main": "./builds/spacetime.js",
  "license": "Apache 2.0",
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
  "dependencies": {},
  "devDependencies": {
    "babel-preset-es2015": "6.9.0",
    "babel-preset-stage-2": "^6.11.0",
    "babelify": "7.3.0",
    "browserify": "13.0.1",
    "derequire": "^2.0.3",
    "eslint": "^3.1.1",
    "gaze": "^1.1.1",
    "nyc": "^8.4.0",
    "shelljs": "^0.7.2",
    "tap-spec": "4.1.1",
    "tape": "4.6.0",
    "timekeeper": "^1.0.0",
    "uglify-js": "2.7.0"
  }
}

},{}],4:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  short: ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'],
  long: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
};

},{}],5:[function(_dereq_,module,exports){
'use strict';

var o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e+6; // dst is supported post-hoc
o.day = 8.64e+7;
o.date = 8.64e+7;
o.month = 8.64e+7 * 29.5; //(average)
o.week = 6.048e+8;
o.year = 3.154e+10; // leap-years are supported post-hoc
//add plurals
Object.keys(o).forEach(function (k) {
  o[k + 's'] = o[k];
});
module.exports = o;

},{}],6:[function(_dereq_,module,exports){
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

},{}],7:[function(_dereq_,module,exports){
'use strict';

var shortMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
var longMonth = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

var obj = {
  'sep': 8
};
for (var i = 0; i < shortMonth.length; i++) {
  obj[shortMonth[i]] = i;
}
for (var _i = 0; _i < longMonth.length; _i++) {
  obj[longMonth[_i]] = _i;
}

module.exports = {
  short: shortMonth,
  long: longMonth,
  mapping: obj
};

},{}],8:[function(_dereq_,module,exports){
"use strict";

module.exports = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1]];

},{}],9:[function(_dereq_,module,exports){
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

},{}],10:[function(_dereq_,module,exports){
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

},{}],11:[function(_dereq_,module,exports){
'use strict';

var Spacetime = _dereq_('./spacetime');
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

//this is handy
main.version = pkg.version;

module.exports = main;

},{"../package.json":3,"./spacetime":28}],12:[function(_dereq_,module,exports){
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
  return;
};
module.exports = parseInput;

},{"../fns":10,"./strParse":13}],13:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('../methods/set/walk');
var months = _dereq_('../data/months');

var parseHour = function parseHour(s, str) {
  str = str.replace(/^\s+/, ''); //trim
  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?:?([0-9]{1,4})?/);
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
//iso-this 1998-05-30T22:00:00:000Z
{
  reg: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})T([0-9:]+)Z$/,
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
    walkTo(s, {
      year: arr[1],
      month: month,
      date: arr[3]
    });
  }
},
//short - uk "03/25/2015"  //0-based-months!
{
  reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]([0-9]{4})$/,
  parse: function parse(s, arr) {
    var month = parseInt(arr[1], 10) - 1;
    walkTo(s, {
      year: arr[3],
      month: month,
      date: arr[2]
    });
  }
},
//Long "Mar 25 2015"
//February 22, 2017 15:30:00
{
  reg: /^([a-z]+) ([0-9]{1,2}),? ([0-9]{4})( ([0-9:]+))?$/i,
  parse: function parse(s, arr) {
    var month = months.mapping[arr[1].toLowerCase()];
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
    var month = months.mapping[arr[2].toLowerCase()];
    walkTo(s, {
      year: arr[3],
      month: month,
      date: arr[1]
    });
  }
}];

module.exports = strFmt;

},{"../data/months":7,"../methods/set/walk":26}],14:[function(_dereq_,module,exports){
'use strict';

var _format = _dereq_('./methods/format');
var _progress = _dereq_('./methods/progress');
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
    return _timezone(this).current.isDst;
  },
  hasDST: function hasDST() {
    return _timezone(this).dst.change !== 0;
  },
  offset: function offset() {
    return _timezone(this).current.offset / 60;
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
  diff: function diff(d, unit) {
    return _diff(this, d, unit);
  },
  isValid: function isValid() {
    return !isNaN(this.d.getTime());
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
    console.log(_format(this).nice.short);
    return this;
  },
  logYear: function logYear() {
    console.log('');
    console.log(_format(this).date.short + ' ' + this.year());
    return this;
  }
};
methods.inDST = methods.isDST;
module.exports = methods;

},{"./input":12,"./methods/diff":17,"./methods/format":18,"./methods/progress":19,"./methods/startOf":27,"./timezone/index":30}],15:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('./set/walk');
var ms = _dereq_('../data/milliseconds');
var monthLength = _dereq_('../data/monthLength');
var fns = _dereq_('../fns');

var order = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
var keep = {
  second: order.slice(0, 1),
  minute: order.slice(0, 2),
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
    //ensure year has changed (leap-years)
    if (unit === 'year' && this.year() === old.year()) {
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

},{"../data/milliseconds":5,"../data/monthLength":6,"../fns":10,"./set/walk":26}],16:[function(_dereq_,module,exports){
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
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../fns":10}],17:[function(_dereq_,module,exports){
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

},{"../fns":10}],18:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');
var months = _dereq_('../data/months');
var days = _dereq_('../data/days');

var fmt = {
  day: function day(s) {
    return fns.titleCase(days.long[s.day()]);
  },
  'day-short': function dayShort(s) {
    return fns.titleCase(days.short[s.day()]);
  },
  date: function date(s) {
    return '' + s.date();
  },
  'date-ordinal': function dateOrdinal(s) {
    return fns.ordinal(s.date());
  },
  'month': function month(s) {
    return fns.titleCase(months.long[s.month()]);
  },
  'month-short': function monthShort(s) {
    return fns.titleCase(months.short[s.month()]);
  },
  'time': function time(s) {
    return s.h12() + ':' + fns.zeroPad(s.minute()) + s.ampm(); //3:45pm
  },
  'time-24h': function time24h(s) {
    return s.hour() + ':' + fns.zeroPad(s.minute()); //13:45
  },
  'year': function year(s) {
    return '' + s.year();
  },
  'year-short': function yearShort(s) {
    return '\'' + ('' + s.year()).substr(2, 4);
  },
  'numeric-us': function numericUs(s) {
    return fns.zeroPad(s.month()) + '/' + fns.zeroPad(s.date()) + '/' + s.year(); //mm/dd/yyyy
  },
  'numeric-uk': function numericUk(s) {
    return fns.zeroPad(s.date()) + '/' + fns.zeroPad(s.month()) + '/' + s.year(); //dd/mm/yyyy
  },
  'numeric-cn': function numericCn(s) {
    return s.year() + '/' + fns.zeroPad(s.month()) + '/' + fns.zeroPad(s.date()); //yyyy/mm/dd
  },
  'iso': function iso(s) {
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
fmt['time-h12'] = fmt['time-12h'];
fmt['time-h24'] = fmt['time-24h'];
fmt['numeric'] = fmt['numeric-us']; //sorry!
fmt['mdy'] = fmt['numeric-us'];
fmt['dmy'] = fmt['numeric-uk'];
fmt['ymd'] = fmt['numeric-cn'];
fmt['little-endian'] = fmt['numeric-uk'];
fmt['big-endian'] = fmt['numeric-cn'];

//
var format = function format(s, type) {
  if (fmt && fmt[type]) {
    return fmt[type](s);
  }
  //start building format object
  var all = Object.keys(fmt).reduce(function (h, k) {
    h[k] = fmt[k](s);
    return h;
  }, {});

  return all;
};
module.exports = format;

},{"../data/days":4,"../data/months":7,"../fns":10}],19:[function(_dereq_,module,exports){
'use strict';
//how far it is along, from 0-1

var progress = function progress(s) {
  var units = ['year', 'season', 'quarter', 'month', 'week', 'day', 'hour', 'minute'];
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

},{}],20:[function(_dereq_,module,exports){
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
    if (input !== undefined) {
      for (var i = 0; i < seasons.length; i++) {
        if (input === seasons[i][0]) {
          this.month(seasons[i][1]);
          this.date(1);
          this.hour(0);
          clearMinutes(this);
        }
      }
      return this;
    }
    var month = this.d.getMonth();
    for (var _i = 0; _i < seasons.length - 1; _i++) {
      if (month >= seasons[_i][1] && month < seasons[_i + 1][1]) {
        return seasons[_i][0];
      }
    }
    return 'winter';
  }

};

},{"../../data/quarters":8,"../../data/seasons":9,"../set/set":25}],21:[function(_dereq_,module,exports){
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

},{"./destructive":20,"./normal":22,"./tricky":23}],22:[function(_dereq_,module,exports){
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

},{"../set/set":25}],23:[function(_dereq_,module,exports){
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
      want = days.short.indexOf(input);
      if (want === -1) {
        want = days.long.indexOf(input);
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
      return days.long[this.day()];
    }
    this.day(input);
    return this;
  },

  monthName: function monthName(input) {
    if (input === undefined) {
      return months.long[this.month()];
    }
    this.month(input);
    return this;
  }
};

},{"../../data/days":4,"../../data/months":7,"../set/walk":26}],24:[function(_dereq_,module,exports){
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

},{}],25:[function(_dereq_,module,exports){
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
      n = months.mapping[n.toLowerCase()];
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

},{"../../data/milliseconds":5,"../../data/monthLength":6,"../../data/months":7,"./walk":26}],26:[function(_dereq_,module,exports){
'use strict';

var ms = _dereq_('../../data/milliseconds');

//find the desired date by a increment/check while loop
var units = {
  year: {
    valid: function valid(n) {
      return n > 0 && n < 4000;
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

},{"../../data/milliseconds":5}],27:[function(_dereq_,module,exports){
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
    for (var i = 0; i < seasons.length; i++) {
      if (seasons[i][0] === current) {
        //winter goes between years
        var year = s.year();
        if (current === 'winter' && s.month() < 3) {
          year -= 1;
        }
        walkTo(s, {
          year: year,
          month: seasons[i][1],
          date: seasons[i][2],
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

},{"../data/quarters":8,"../data/seasons":9,"./set/walk":26}],28:[function(_dereq_,module,exports){
'use strict';

var guessTz = _dereq_('./timezone/guessTz');
var timezone = _dereq_('./timezone/index');
var handleInput = _dereq_('./input');
var methods = _dereq_('./methods');

//fake timezone-support, for fakers (es5 class)
var SpaceTime = function SpaceTime(input, tz) {
  //the shift for the given timezone
  this.tz = tz || guessTz();
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

module.exports = SpaceTime;

},{"./input":12,"./methods":14,"./methods/add":15,"./methods/compare":16,"./methods/query":21,"./methods/same":24,"./timezone/guessTz":29,"./timezone/index":30}],29:[function(_dereq_,module,exports){
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

},{}],30:[function(_dereq_,module,exports){
'use strict';

var zones = _dereq_('../../data');
var isDst = _dereq_('./isDst');

var parseDst = function parseDst(dst) {
  if (!dst) {
    return {};
  }
  var arr = dst.split(' -> ').map(function (s) {
    var tmp = s.split('/').map(function (n) {
      return parseInt(n, 10);
    });
    return {
      month: tmp[0],
      date: tmp[1],
      hour: tmp[2]
    };
  });
  return {
    start: arr[0],
    end: arr[1]
  };
};

//get metadata about this timezone
var timezone = function timezone(s) {
  var tz = s.tz;
  if (!zones[tz]) {
    console.warn('Warn: could not find given or local timezone - \'' + tz + '\'');
    return {
      current: {
        epochShift: 0
      }
    };
  }
  var meta = {
    name: tz
  };
  meta.dst = parseDst(zones[tz].dst);
  meta.dst.change = 0;
  if (meta.dst.start && meta.dst.end) {
    meta.dst.change = -60;
    //the only exception to this rule is 'lord howe'
    if (meta.name === 'Australia/Lord_Howe') {
      meta.dst.change = -30;
    }
  }
  //include hemisphere (for seasons)
  meta.hemisphere = null;
  if (zones[tz].h === 'n') {
    meta.hemisphere = 'North';
  } else if (zones[tz].h === 's') {
    meta.hemisphere = 'South';
  }

  //both offsets (in mins)
  meta.offsets = {
    base: zones[tz].o + meta.dst.change,
    dst: zones[tz].o
  };

  if (isDst(s, meta.dst)) {
    meta.current = {
      isDst: true,
      offset: meta.offsets.dst
    };
  } else {
    meta.current = {
      isDst: false,
      offset: meta.offsets.base
    };
  }
  meta.current.epochShift = meta.current.offset * 60 * 1000;
  return meta;
};
module.exports = timezone;

},{"../../data":1,"./isDst":31}],31:[function(_dereq_,module,exports){
'use strict';

var zeroPad = _dereq_('../fns').zeroPad;

var toString = function toString(o) {
  return [zeroPad(o.month), zeroPad(o.date), zeroPad(o.hour)].join('-');
};

//is this time between dst.start and dst.end?
var isDst = function isDst(s, dst) {
  if (!dst.start || !dst.end) {
    return false;
  }
  var d = new Date(s.epoch); //this has a order-of-operations issue
  var current = {
    month: d.getMonth(),
    date: d.getDate(),
    hour: d.getHours()
  };
  current = toString(current);
  var start = toString(dst.start);
  var end = toString(dst.end);
  //in dst, in summer (easy)
  if (start < end) {
    if (current > start && current < end) {
      return true;
    }
    return false;
  } else {
    //in dst, over new-years (trickier)
    if (current > start) {
      return true;
    }
    if (current < end) {
      return true;
    }
  }
  return false;
};
module.exports = isDst;

},{"../fns":10}]},{},[11])(11)
});