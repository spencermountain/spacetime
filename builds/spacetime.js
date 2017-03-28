/* @smallwins/spacetime v0.0.11
  
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetime = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports={
  "Africa/Abidjan": {
    "o": 0
  },
  "Africa/Accra": {
    "o": 0
  },
  "Africa/Addis_Ababa": {
    "o": 180
  },
  "Africa/Algiers": {
    "o": 60
  },
  "Africa/Asmara": {
    "o": 180
  },
  "Africa/Asmera": {
    "o": 180
  },
  "Africa/Bamako": {
    "o": 0
  },
  "Africa/Bangui": {
    "o": 60
  },
  "Africa/Banjul": {
    "o": 0
  },
  "Africa/Bissau": {
    "o": 0
  },
  "Africa/Blantyre": {
    "o": 120
  },
  "Africa/Brazzaville": {
    "o": 60
  },
  "Africa/Bujumbura": {
    "o": 120
  },
  "Africa/Cairo": {
    "o": 120
  },
  "Africa/Casablanca": {
    "o": 60,
    "hem": "n",
    "dst": "6/2/3 -> 9/29/2"
  },
  "Africa/Ceuta": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Africa/Conakry": {
    "o": 0
  },
  "Africa/Dakar": {
    "o": 0
  },
  "Africa/Dar_es_Salaam": {
    "o": 180
  },
  "Africa/Djibouti": {
    "o": 180
  },
  "Africa/Douala": {
    "o": 60
  },
  "Africa/El_Aaiun": {
    "o": 60,
    "hem": "n",
    "dst": "6/2/3 -> 9/29/2"
  },
  "Africa/Freetown": {
    "o": 0
  },
  "Africa/Gaborone": {
    "o": 120
  },
  "Africa/Harare": {
    "o": 120
  },
  "Africa/Johannesburg": {
    "o": 120
  },
  "Africa/Juba": {
    "o": 180
  },
  "Africa/Kampala": {
    "o": 180
  },
  "Africa/Khartoum": {
    "o": 180
  },
  "Africa/Kigali": {
    "o": 120
  },
  "Africa/Kinshasa": {
    "o": 60
  },
  "Africa/Lagos": {
    "o": 60
  },
  "Africa/Libreville": {
    "o": 60
  },
  "Africa/Lome": {
    "o": 0
  },
  "Africa/Luanda": {
    "o": 60
  },
  "Africa/Lubumbashi": {
    "o": 120
  },
  "Africa/Lusaka": {
    "o": 120
  },
  "Africa/Malabo": {
    "o": 60
  },
  "Africa/Maputo": {
    "o": 120
  },
  "Africa/Maseru": {
    "o": 120
  },
  "Africa/Mbabane": {
    "o": 120
  },
  "Africa/Mogadishu": {
    "o": 180
  },
  "Africa/Monrovia": {
    "o": 0
  },
  "Africa/Nairobi": {
    "o": 180
  },
  "Africa/Ndjamena": {
    "o": 60
  },
  "Africa/Niamey": {
    "o": 60
  },
  "Africa/Nouakchott": {
    "o": 0
  },
  "Africa/Ouagadougou": {
    "o": 0
  },
  "Africa/Porto-Novo": {
    "o": 60
  },
  "Africa/Sao_Tome": {
    "o": 0
  },
  "Africa/Timbuktu": {
    "o": 0
  },
  "Africa/Tripoli": {
    "o": 120
  },
  "Africa/Tunis": {
    "o": 60
  },
  "Africa/Windhoek": {
    "o": 60,
    "hem": "s",
    "dst": "8/3/3 -> 3/2/1"
  },
  "America/Adak": {
    "o": -540,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Anchorage": {
    "o": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Anguilla": {
    "o": -240
  },
  "America/Antigua": {
    "o": -240
  },
  "America/Araguaina": {
    "o": -180
  },
  "America/Argentina/Buenos_Aires": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/Catamarca": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/ComodRivadavia": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/Cordoba": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/Jujuy": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/La_Rioja": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/Mendoza": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/Rio_Gallegos": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/Salta": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/San_Juan": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/San_Luis": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/Tucuman": {
    "o": -180,
    "hem": "s"
  },
  "America/Argentina/Ushuaia": {
    "o": -180,
    "hem": "s"
  },
  "America/Aruba": {
    "o": -240
  },
  "America/Asuncion": {
    "o": -240,
    "hem": "s",
    "dst": "9/1/1 -> 2/25/23"
  },
  "America/Atikokan": {
    "o": -300
  },
  "America/Atka": {
    "o": -540,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Bahia": {
    "o": -180
  },
  "America/Bahia_Banderas": {
    "o": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Barbados": {
    "o": -240
  },
  "America/Belem": {
    "o": -180
  },
  "America/Belize": {
    "o": -360
  },
  "America/Blanc-Sablon": {
    "o": -240
  },
  "America/Boa_Vista": {
    "o": -240
  },
  "America/Bogota": {
    "o": -300
  },
  "America/Boise": {
    "o": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Buenos_Aires": {
    "o": -180
  },
  "America/Cambridge_Bay": {
    "o": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Campo_Grande": {
    "o": -240,
    "hem": "s",
    "dst": "9/15/1 -> 1/18/23"
  },
  "America/Cancun": {
    "o": -300
  },
  "America/Caracas": {
    "o": -270
  },
  "America/Catamarca": {
    "o": -180
  },
  "America/Cayenne": {
    "o": -180
  },
  "America/Cayman": {
    "o": -300
  },
  "America/Chicago": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Chihuahua": {
    "o": -360,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Coral_Harbour": {
    "o": -300
  },
  "America/Cordoba": {
    "o": -180
  },
  "America/Costa_Rica": {
    "o": -360,
    "hem": "s"
  },
  "America/Creston": {
    "o": -420
  },
  "America/Cuiaba": {
    "o": -240,
    "hem": "s",
    "dst": "9/15/1 -> 1/18/23"
  },
  "America/Curacao": {
    "o": -240
  },
  "America/Danmarkshavn": {
    "o": 0
  },
  "America/Dawson": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Dawson_Creek": {
    "o": -420
  },
  "America/Denver": {
    "o": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Detroit": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Dominica": {
    "o": -240
  },
  "America/Edmonton": {
    "o": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Eirunepe": {
    "o": -300
  },
  "America/El_Salvador": {
    "o": -360
  },
  "America/Ensenada": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Fort_Wayne": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Fortaleza": {
    "o": -180
  },
  "America/Glace_Bay": {
    "o": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Godthab": {
    "o": -120,
    "hem": "n",
    "dst": "2/25/23 -> 9/28/22"
  },
  "America/Goose_Bay": {
    "o": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Grand_Turk": {
    "o": -240
  },
  "America/Grenada": {
    "o": -240
  },
  "America/Guadeloupe": {
    "o": -240
  },
  "America/Guatemala": {
    "o": -360
  },
  "America/Guayaquil": {
    "o": -300
  },
  "America/Guyana": {
    "o": -240
  },
  "America/Halifax": {
    "o": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Havana": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/1 -> 10/5/0"
  },
  "America/Hermosillo": {
    "o": -420
  },
  "America/Indiana/Indianapolis": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Knox": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Marengo": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Petersburg": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Tell_City": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Vevay": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Vincennes": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Winamac": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indianapolis": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Inuvik": {
    "o": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Iqaluit": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Jamaica": {
    "o": -300
  },
  "America/Jujuy": {
    "o": -180
  },
  "America/Juneau": {
    "o": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Kentucky/Louisville": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Kentucky/Monticello": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Knox_IN": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Kralendijk": {
    "o": -240
  },
  "America/La_Paz": {
    "o": -240
  },
  "America/Lima": {
    "o": -300
  },
  "America/Los_Angeles": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Louisville": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Lower_Princes": {
    "o": -240
  },
  "America/Maceio": {
    "o": -180
  },
  "America/Managua": {
    "o": -360
  },
  "America/Manaus": {
    "o": -240
  },
  "America/Marigot": {
    "o": -240
  },
  "America/Martinique": {
    "o": -240
  },
  "America/Matamoros": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Mazatlan": {
    "o": -360,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Mendoza": {
    "o": -180
  },
  "America/Menominee": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Merida": {
    "o": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Metlakatla": {
    "o": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Mexico_City": {
    "o": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Miquelon": {
    "o": -120,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Moncton": {
    "o": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Monterrey": {
    "o": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Montevideo": {
    "o": -180
  },
  "America/Montreal": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Montserrat": {
    "o": -240
  },
  "America/Nassau": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/New_York": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Nipigon": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Nome": {
    "o": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Noronha": {
    "o": -120
  },
  "America/North_Dakota/Beulah": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/North_Dakota/Center": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/North_Dakota/New_Salem": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Ojinaga": {
    "o": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Panama": {
    "o": -300
  },
  "America/Pangnirtung": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Paramaribo": {
    "o": -180
  },
  "America/Phoenix": {
    "o": -420
  },
  "America/Port-au-Prince": {
    "o": -240
  },
  "America/Port_of_Spain": {
    "o": -240
  },
  "America/Porto_Acre": {
    "o": -300
  },
  "America/Porto_Velho": {
    "o": -240
  },
  "America/Puerto_Rico": {
    "o": -240
  },
  "America/Rainy_River": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Rankin_Inlet": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Recife": {
    "o": -180
  },
  "America/Regina": {
    "o": -360
  },
  "America/Resolute": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Rio_Branco": {
    "o": -300
  },
  "America/Rosario": {
    "o": -180
  },
  "America/Santa_Isabel": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Santarem": {
    "o": -180
  },
  "America/Santiago": {
    "o": -180,
    "hem": "s",
    "dst": "7/13/1 -> 4/13/23"
  },
  "America/Santo_Domingo": {
    "o": -240
  },
  "America/Sao_Paulo": {
    "o": -180,
    "hem": "s",
    "dst": "9/15/1 -> 1/18/23"
  },
  "America/Scoresbysund": {
    "o": 0,
    "hem": "n",
    "dst": "2/26/1 -> 9/29/0"
  },
  "America/Shiprock": {
    "o": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Sitka": {
    "o": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/St_Barthelemy": {
    "o": -240
  },
  "America/St_Johns": {
    "o": -150,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/St_Kitts": {
    "o": -240
  },
  "America/St_Lucia": {
    "o": -240
  },
  "America/St_Thomas": {
    "o": -240
  },
  "America/St_Vincent": {
    "o": -240
  },
  "America/Swift_Current": {
    "o": -360
  },
  "America/Tegucigalpa": {
    "o": -360
  },
  "America/Thule": {
    "o": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Thunder_Bay": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Tijuana": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Toronto": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Tortola": {
    "o": -240
  },
  "America/Vancouver": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Virgin": {
    "o": -240
  },
  "America/Whitehorse": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Winnipeg": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Yakutat": {
    "o": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Yellowknife": {
    "o": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Antarctica/Casey": {
    "o": 480,
    "hem": "s"
  },
  "Antarctica/Davis": {
    "o": 420,
    "hem": "s"
  },
  "Antarctica/DumontDUrville": {
    "o": 600,
    "hem": "s"
  },
  "Antarctica/Macquarie": {
    "o": 660,
    "hem": "s"
  },
  "Antarctica/Mawson": {
    "o": 300,
    "hem": "s"
  },
  "Antarctica/McMurdo": {
    "o": 720,
    "hem": "s",
    "dst": "8/24/3 -> 3/2/2"
  },
  "Antarctica/Palmer": {
    "o": -180,
    "hem": "s",
    "dst": "7/13/1 -> 4/13/23"
  },
  "Antarctica/Rothera": {
    "o": -180,
    "hem": "s"
  },
  "Antarctica/South_Pole": {
    "o": 720,
    "hem": "s",
    "dst": "8/24/3 -> 3/2/2"
  },
  "Antarctica/Syowa": {
    "o": 180,
    "hem": "s"
  },
  "Antarctica/Troll": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/1"
  },
  "Antarctica/Vostok": {
    "o": 360,
    "hem": "s"
  },
  "Arctic/Longyearbyen": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Asia/Aden": {
    "o": 180,
    "hem": "n"
  },
  "Asia/Almaty": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Amman": {
    "o": 180,
    "hem": "n",
    "dst": "2/31/1 -> 9/27/0"
  },
  "Asia/Anadyr": {
    "o": 720,
    "hem": "n"
  },
  "Asia/Aqtau": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Aqtobe": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Ashgabat": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Ashkhabad": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Baghdad": {
    "o": 180,
    "hem": "n"
  },
  "Asia/Bahrain": {
    "o": 180,
    "hem": "n"
  },
  "Asia/Baku": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Bangkok": {
    "o": 420,
    "hem": "n"
  },
  "Asia/Beirut": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/1 -> 9/28/23"
  },
  "Asia/Bishkek": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Brunei": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Calcutta": {
    "o": 330,
    "hem": "n"
  },
  "Asia/Chita": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Choibalsan": {
    "o": 480,
    "hem": "n",
    "dst": "2/25/3 -> 8/29/23"
  },
  "Asia/Chongqing": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Chungking": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Colombo": {
    "o": 330,
    "hem": "n"
  },
  "Asia/Dacca": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Damascus": {
    "o": 180,
    "hem": "n",
    "dst": "2/31/1 -> 9/26/23"
  },
  "Asia/Dhaka": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Dili": {
    "o": 540,
    "hem": "n"
  },
  "Asia/Dubai": {
    "o": 240,
    "hem": "n"
  },
  "Asia/Dushanbe": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Gaza": {
    "o": 180,
    "hem": "n",
    "dst": "2/25/2 -> 9/28/0"
  },
  "Asia/Harbin": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Hebron": {
    "o": 180,
    "hem": "n",
    "dst": "2/25/2 -> 9/28/0"
  },
  "Asia/Ho_Chi_Minh": {
    "o": 420,
    "hem": "n"
  },
  "Asia/Hong_Kong": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Hovd": {
    "o": 420,
    "hem": "n",
    "dst": "2/25/3 -> 8/29/23"
  },
  "Asia/Irkutsk": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Istanbul": {
    "o": 180,
    "hem": "n"
  },
  "Asia/Jakarta": {
    "o": 420,
    "hem": "n"
  },
  "Asia/Jayapura": {
    "o": 540,
    "hem": "n"
  },
  "Asia/Jerusalem": {
    "o": 180,
    "hem": "n",
    "dst": "2/24/3 -> 9/29/1"
  },
  "Asia/Kabul": {
    "o": 270,
    "hem": "n"
  },
  "Asia/Kamchatka": {
    "o": 720,
    "hem": "n"
  },
  "Asia/Karachi": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Kashgar": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Kathmandu": {
    "o": 345,
    "hem": "n"
  },
  "Asia/Katmandu": {
    "o": 345,
    "hem": "n"
  },
  "Asia/Khandyga": {
    "o": 540,
    "hem": "n"
  },
  "Asia/Kolkata": {
    "o": 330,
    "hem": "n"
  },
  "Asia/Krasnoyarsk": {
    "o": 420,
    "hem": "n"
  },
  "Asia/Kuala_Lumpur": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Kuching": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Kuwait": {
    "o": 180,
    "hem": "n"
  },
  "Asia/Macao": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Macau": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Magadan": {
    "o": 600,
    "hem": "n"
  },
  "Asia/Makassar": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Manila": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Muscat": {
    "o": 240,
    "hem": "n"
  },
  "Asia/Nicosia": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Asia/Novokuznetsk": {
    "o": 420,
    "hem": "n"
  },
  "Asia/Novosibirsk": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Omsk": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Oral": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Phnom_Penh": {
    "o": 420,
    "hem": "n"
  },
  "Asia/Pontianak": {
    "o": 420,
    "hem": "n"
  },
  "Asia/Pyongyang": {
    "o": 540,
    "hem": "n"
  },
  "Asia/Qatar": {
    "o": 180,
    "hem": "n"
  },
  "Asia/Qyzylorda": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Rangoon": {
    "o": 390,
    "hem": "n"
  },
  "Asia/Riyadh": {
    "o": 180,
    "hem": "n"
  },
  "Asia/Saigon": {
    "o": 420,
    "hem": "n"
  },
  "Asia/Sakhalin": {
    "o": 600,
    "hem": "n"
  },
  "Asia/Samarkand": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Seoul": {
    "o": 540,
    "hem": "n"
  },
  "Asia/Shanghai": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Singapore": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Srednekolymsk": {
    "o": 660,
    "hem": "n"
  },
  "Asia/Taipei": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Tashkent": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Tbilisi": {
    "o": 240,
    "hem": "n"
  },
  "Asia/Tehran": {
    "o": 270,
    "hem": "n",
    "dst": "2/22/1 -> 8/21/23"
  },
  "Asia/Tel_Aviv": {
    "o": 180,
    "hem": "n",
    "dst": "2/24/3 -> 9/29/1"
  },
  "Asia/Thimbu": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Thimphu": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Tokyo": {
    "o": 540,
    "hem": "n"
  },
  "Asia/Ujung_Pandang": {
    "o": 480,
    "hem": "n"
  },
  "Asia/Ulaanbaatar": {
    "o": 480,
    "hem": "n",
    "dst": "2/25/3 -> 8/29/23"
  },
  "Asia/Ulan_Bator": {
    "o": 480,
    "hem": "n",
    "dst": "2/25/3 -> 8/29/23"
  },
  "Asia/Urumqi": {
    "o": 360,
    "hem": "n"
  },
  "Asia/Ust-Nera": {
    "o": 600,
    "hem": "n"
  },
  "Asia/Vientiane": {
    "o": 420,
    "hem": "n"
  },
  "Asia/Vladivostok": {
    "o": 600,
    "hem": "n"
  },
  "Asia/Yakutsk": {
    "o": 540,
    "hem": "n"
  },
  "Asia/Yekaterinburg": {
    "o": 300,
    "hem": "n"
  },
  "Asia/Yerevan": {
    "o": 240,
    "hem": "n"
  },
  "Atlantic/Azores": {
    "o": 0,
    "hem": "n",
    "dst": "2/26/1 -> 9/29/0"
  },
  "Atlantic/Bermuda": {
    "o": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Atlantic/Canary": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Atlantic/Cape_Verde": {
    "o": -60
  },
  "Atlantic/Faeroe": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Atlantic/Faroe": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Atlantic/Jan_Mayen": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Atlantic/Madeira": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Atlantic/Reykjavik": {
    "o": 0
  },
  "Atlantic/South_Georgia": {
    "o": -120
  },
  "Atlantic/St_Helena": {
    "o": 0
  },
  "Atlantic/Stanley": {
    "o": -180
  },
  "Australia/ACT": {
    "o": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Adelaide": {
    "o": 570,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Brisbane": {
    "o": 600,
    "hem": "s"
  },
  "Australia/Broken_Hill": {
    "o": 570,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Canberra": {
    "o": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Currie": {
    "o": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Darwin": {
    "o": 570,
    "hem": "s"
  },
  "Australia/Eucla": {
    "o": 525,
    "hem": "s"
  },
  "Australia/Hobart": {
    "o": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/LHI": {
    "o": 630,
    "hem": "s",
    "dst": "9/1/2 -> 3/2/1"
  },
  "Australia/Lindeman": {
    "o": 600,
    "hem": "s"
  },
  "Australia/Lord_Howe": {
    "o": 630,
    "hem": "s",
    "dst": "9/1/2 -> 3/2/1"
  },
  "Australia/Melbourne": {
    "o": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/NSW": {
    "o": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/North": {
    "o": 570,
    "hem": "s"
  },
  "Australia/Perth": {
    "o": 480,
    "hem": "s"
  },
  "Australia/Queensland": {
    "o": 600,
    "hem": "s"
  },
  "Australia/South": {
    "o": 570,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Sydney": {
    "o": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Tasmania": {
    "o": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Victoria": {
    "o": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/West": {
    "o": 480,
    "hem": "s"
  },
  "Australia/Yancowinna": {
    "o": 570,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Brazil/Acre": {
    "o": -300
  },
  "Brazil/DeNoronha": {
    "o": -120
  },
  "Brazil/East": {
    "o": -180,
    "hem": "s",
    "dst": "9/15/1 -> 1/18/23"
  },
  "Brazil/West": {
    "o": -240
  },
  "Canada/Atlantic": {
    "o": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Central": {
    "o": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/East-Saskatchewan": {
    "o": -360,
    "hem": "n"
  },
  "Canada/Eastern": {
    "o": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Mountain": {
    "o": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Newfoundland": {
    "o": -150,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Pacific": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Saskatchewan": {
    "o": -360,
    "hem": "n"
  },
  "Canada/Yukon": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Chile/Continental": {
    "o": -180,
    "hem": "s",
    "dst": "7/13/1 -> 4/13/23"
  },
  "Chile/EasterIsland": {
    "o": -300,
    "hem": "s",
    "dst": "7/12/23 -> 4/13/21"
  },
  "Etc/GMT": {
    "o": 0
  },
  "Etc/GMT+0": {
    "o": 0
  },
  "Etc/GMT+1": {
    "o": -60
  },
  "Etc/GMT+10": {
    "o": -600
  },
  "Etc/GMT+11": {
    "o": -660
  },
  "Etc/GMT+12": {
    "o": -720
  },
  "Etc/GMT+2": {
    "o": -120
  },
  "Etc/GMT+3": {
    "o": -180
  },
  "Etc/GMT+4": {
    "o": -240
  },
  "Etc/GMT+5": {
    "o": -300
  },
  "Etc/GMT+6": {
    "o": -360
  },
  "Etc/GMT+7": {
    "o": -420
  },
  "Etc/GMT+8": {
    "o": -480
  },
  "Etc/GMT+9": {
    "o": -540
  },
  "Etc/GMT-0": {
    "o": 0
  },
  "Etc/GMT-1": {
    "o": 60
  },
  "Etc/GMT-10": {
    "o": 600
  },
  "Etc/GMT-11": {
    "o": 660
  },
  "Etc/GMT-12": {
    "o": 720
  },
  "Etc/GMT-13": {
    "o": 780
  },
  "Etc/GMT-14": {
    "o": 840
  },
  "Etc/GMT-2": {
    "o": 120
  },
  "Etc/GMT-3": {
    "o": 180
  },
  "Etc/GMT-4": {
    "o": 240
  },
  "Etc/GMT-5": {
    "o": 300
  },
  "Etc/GMT-6": {
    "o": 360
  },
  "Etc/GMT-7": {
    "o": 420
  },
  "Etc/GMT-8": {
    "o": 480
  },
  "Etc/GMT-9": {
    "o": 540
  },
  "Etc/GMT0": {
    "o": 0
  },
  "Etc/Greenwich": {
    "o": 0
  },
  "Etc/UCT": {
    "o": 0
  },
  "Etc/UTC": {
    "o": 0
  },
  "Etc/Universal": {
    "o": 0
  },
  "Etc/Zulu": {
    "o": 0
  },
  "Europe/Amsterdam": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Andorra": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Athens": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Belfast": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Belgrade": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Berlin": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Bratislava": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Brussels": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Bucharest": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Budapest": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Busingen": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Chisinau": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Copenhagen": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Dublin": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Gibraltar": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Guernsey": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Helsinki": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Isle_of_Man": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Istanbul": {
    "o": 180,
    "hem": "n"
  },
  "Europe/Jersey": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Kaliningrad": {
    "o": 120,
    "hem": "n"
  },
  "Europe/Kiev": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Lisbon": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Ljubljana": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/London": {
    "o": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Luxembourg": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Madrid": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Malta": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Mariehamn": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Minsk": {
    "o": 180,
    "hem": "n"
  },
  "Europe/Monaco": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Moscow": {
    "o": 180,
    "hem": "n"
  },
  "Europe/Nicosia": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Oslo": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Paris": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Podgorica": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Prague": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Riga": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Rome": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Samara": {
    "o": 240,
    "hem": "n"
  },
  "Europe/San_Marino": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Sarajevo": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Simferopol": {
    "o": 180,
    "hem": "n"
  },
  "Europe/Skopje": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Sofia": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Stockholm": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Tallinn": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Tirane": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Tiraspol": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Uzhgorod": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Vaduz": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Vatican": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Vienna": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Vilnius": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Volgograd": {
    "o": 180,
    "hem": "n"
  },
  "Europe/Warsaw": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Zagreb": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Zaporozhye": {
    "o": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Zurich": {
    "o": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Indian/Antananarivo": {
    "o": 180
  },
  "Indian/Chagos": {
    "o": 360
  },
  "Indian/Christmas": {
    "o": 420
  },
  "Indian/Cocos": {
    "o": 390
  },
  "Indian/Comoro": {
    "o": 180
  },
  "Indian/Kerguelen": {
    "o": 300
  },
  "Indian/Mahe": {
    "o": 240
  },
  "Indian/Maldives": {
    "o": 300
  },
  "Indian/Mauritius": {
    "o": 240
  },
  "Indian/Mayotte": {
    "o": 180
  },
  "Indian/Reunion": {
    "o": 240
  },
  "Mexico/BajaNorte": {
    "o": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Mexico/BajaSur": {
    "o": -360,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "Mexico/General": {
    "o": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "Pacific/Apia": {
    "o": 780,
    "hem": "s",
    "dst": "8/24/4 -> 3/2/3"
  },
  "Pacific/Auckland": {
    "o": 720,
    "hem": "s",
    "dst": "8/24/3 -> 3/2/2"
  },
  "Pacific/Chatham": {
    "o": 765,
    "hem": "s",
    "dst": "8/24/3 -> 3/2/2"
  },
  "Pacific/Chuuk": {
    "o": 600
  },
  "Pacific/Easter": {
    "o": -300,
    "hem": "s",
    "dst": "7/12/23 -> 4/13/21"
  },
  "Pacific/Efate": {
    "o": 660
  },
  "Pacific/Enderbury": {
    "o": 780
  },
  "Pacific/Fakaofo": {
    "o": 780
  },
  "Pacific/Fiji": {
    "o": 720,
    "hem": "s",
    "dst": "10/5/3 -> 0/15/2"
  },
  "Pacific/Funafuti": {
    "o": 720
  },
  "Pacific/Galapagos": {
    "o": -360
  },
  "Pacific/Gambier": {
    "o": -540
  },
  "Pacific/Guadalcanal": {
    "o": 660
  },
  "Pacific/Guam": {
    "o": 600
  },
  "Pacific/Honolulu": {
    "o": -600
  },
  "Pacific/Johnston": {
    "o": -600
  },
  "Pacific/Kiritimati": {
    "o": 840
  },
  "Pacific/Kosrae": {
    "o": 660
  },
  "Pacific/Kwajalein": {
    "o": 720
  },
  "Pacific/Majuro": {
    "o": 720
  },
  "Pacific/Marquesas": {
    "o": -570
  },
  "Pacific/Midway": {
    "o": -660
  },
  "Pacific/Nauru": {
    "o": 720
  },
  "Pacific/Niue": {
    "o": -660
  },
  "Pacific/Norfolk": {
    "o": 690
  },
  "Pacific/Noumea": {
    "o": 660
  },
  "Pacific/Pago_Pago": {
    "o": -660
  },
  "Pacific/Palau": {
    "o": 540
  },
  "Pacific/Pitcairn": {
    "o": -480
  },
  "Pacific/Pohnpei": {
    "o": 660
  },
  "Pacific/Ponape": {
    "o": 660
  },
  "Pacific/Port_Moresby": {
    "o": 600
  },
  "Pacific/Rarotonga": {
    "o": -600
  },
  "Pacific/Saipan": {
    "o": 600
  },
  "Pacific/Samoa": {
    "o": -660
  },
  "Pacific/Tahiti": {
    "o": -600
  },
  "Pacific/Tarawa": {
    "o": 720
  },
  "Pacific/Tongatapu": {
    "o": 780,
    "hem": "s",
    "dst": "10/5/3 -> 0/15/2"
  },
  "Pacific/Truk": {
    "o": 600
  },
  "Pacific/Wake": {
    "o": 720
  },
  "Pacific/Wallis": {
    "o": 720
  },
  "Pacific/Yap": {
    "o": 600
  }
}

},{}],2:[function(_dereq_,module,exports){
module.exports={
  "name": "@smallwins/spacetime",
  "version": "0.0.11",
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
  "dependencies": {},
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

},{}],3:[function(_dereq_,module,exports){
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

},{}],11:[function(_dereq_,module,exports){
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
  return space.startOf('day');
};
main.tomorrow = function (tz) {
  var space = new Spacetime(new Date().getTime(), tz);
  return space.add(1, 'day').startOf('day');
};

//this is handy
main.version = pkg.version;

module.exports = main;

},{"../package.json":2,"./spacetime":30}],12:[function(_dereq_,module,exports){
'use strict';

var strFmt = _dereq_('./strParse');

//we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================

var isArray = function isArray(input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};
var isObject = function isObject(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
};
var isDate = function isDate(d) {
  return d instanceof Date && !isNaN(d.valueOf());
};

//support [2016, 03, 01] format
var handleArray = function handleArray(s, arr) {
  var units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
  for (var i = 0; i < arr.length; i++) {
    var unit = units[i];
    var num = arr[i] || 0;
    s[unit](num);
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
  if (isDate(input) === true) {
    s.epoch = input.getTime();
    return;
  }
  //support [2016, 03, 01] format
  if (isArray(input) === true) {
    handleArray(s, input);
    return;
  }
  //support {year:2016, month:3} format
  if (isObject(input) === true) {
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

},{"./strParse":13}],13:[function(_dereq_,module,exports){
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

},{"../data/months":7,"../methods/set/walk":28}],14:[function(_dereq_,module,exports){
'use strict';

//days since newyears - jan 1st is 1, jan 2nd is 2...

var dayOfYear = function dayOfYear(d) {
  var sum = 0;
  var month = d.getMonth();
  var tmp = void 0;
  for (var i = 0; i < month; i++) {
    tmp = new Date();
    tmp.setMonth(i);
    tmp.setDate(1);
    tmp.setHours(-2);
    sum += tmp.getDate();
  }
  return sum + d.getDate();
};

module.exports = dayOfYear;

},{}],15:[function(_dereq_,module,exports){
'use strict';

function zeroPad(str, len) {
  len = len || 2;
  var pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
}

function titleCase(str) {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

function ordinal(i) {
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
}

module.exports = {
  zeroPad: zeroPad,
  titleCase: titleCase,
  ordinal: ordinal
};

},{}],16:[function(_dereq_,module,exports){
'use strict';

exports.isDate = function (d) {
  return Object.prototype.toString.call(d) === '[object Date]';
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

},{}],17:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('./set/walk');
var ms = _dereq_('../data/milliseconds');
var monthLength = _dereq_('../data/monthLength');

var normalize = function normalize(str) {
  str = str.toLowerCase();
  str = str.replace(/s$/, '');
  if (str === 'day') {
    return 'date';
  }
  return str;
};

var keep = {
  second: ['millisecond'],
  minute: ['millisecond', 'second'],
  hour: ['millisecond', 'second', 'minute'],
  date: ['millisecond', 'second', 'minute', 'hour'],
  month: ['millisecond', 'second', 'minute', 'hour'],
  quarter: ['millisecond', 'second', 'minute', 'hour'],
  season: ['millisecond', 'second', 'minute', 'hour'],
  year: ['millisecond', 'second', 'minute', 'hour', 'date', 'month']
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

var addMethods = function addMethods(Space) {

  var methods = {

    add: function add(num, unit) {
      var old = this.clone();
      unit = normalize(unit);
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

},{"../data/milliseconds":5,"../data/monthLength":6,"./set/walk":28}],18:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../lib/fns');

var addMethods = function addMethods(Space) {

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
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;

},{"../lib/fns":16}],19:[function(_dereq_,module,exports){
'use strict';
// const ms = require('../data/milliseconds');

//

var normalize = function normalize(str) {
  str = str.toLowerCase();
  str = str.replace(/s$/, '');
  if (str === 'day') {
    return 'date';
  }
  return str;
};

//increment until same
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
  unit = normalize(unit);
  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    //reverse it
    return climb(b, a, unit) * -1;
  }
};
module.exports = diff;

},{}],20:[function(_dereq_,module,exports){
'use strict';

var fmt = _dereq_('../lib/fmt');
var months = _dereq_('../data/months');
var days = _dereq_('../data/days');

//
var format = function format(s) {
  var year = s.year();
  var date = s.date();
  var month = s.month();
  var day = s.day();
  var minute = s.minute();
  var hour24 = s.hour();
  var hour12 = hour24;
  if (hour24 > 12) {
    hour12 = hour24 - 12;
  }
  if (hour12 === 0) {
    hour12 = 12;
  }
  var all = {
    numeric: {
      uk: fmt.zeroPad(date) + '/' + fmt.zeroPad(month) + '/' + year, //dd/mm/yyyy
      us: fmt.zeroPad(month) + '/' + fmt.zeroPad(date) + '/' + year },
    time: {
      h12: hour12 + ':' + fmt.zeroPad(minute) + s.ampm(), //3:45pm
      h24: hour24 + ':' + fmt.zeroPad(minute) //15:45
    },
    date: {
      ordinal: fmt.ordinal(date), //12th
      cardinal: '' + date, //12
      short: fmt.titleCase(months.short[month]) + ' ' + fmt.ordinal(date), //Apr 12
      long: fmt.titleCase(months.long[month]) + ' ' + fmt.ordinal(date) },
    year: {
      long: '' + year,
      short: '\'' + ('' + year).substr(2, 4)
    },
    iso: {
      short: year + '-' + fmt.zeroPad(month) + '-' + fmt.zeroPad(date), //2017-02-15
      local: year + '-' + fmt.zeroPad(month + 1) + '-' + fmt.zeroPad(date) + 'T' + hour24 + ':' + fmt.zeroPad(minute) + ':' + fmt.zeroPad(s.second()) + ':' + fmt.zeroPad(s.millisecond(), 3) + 'Z', //2017-03-08T19:45:28.367Z
      utc: new Date(s.epoch).toISOString() },
    day: {
      short: fmt.titleCase(days.short[day]), //wed
      long: fmt.titleCase(days.long[day]) },
    month: {
      short: fmt.titleCase(months.short[month]), //Sept
      long: fmt.titleCase(months.long[month]) }
  };
  all.nice = {
    short: fmt.titleCase(months.short[month]) + ' ' + fmt.ordinal(date) + ', ' + all.time.h12,
    long: all.day.long + ' ' + fmt.titleCase(months.long[month]) + ' ' + fmt.ordinal(date) + ', ' + all.time.h12
  };
  all.full = {
    short: fmt.titleCase(days.short[day]) + ' ' + fmt.titleCase(months.short[month]) + ' ' + fmt.ordinal(date) + ' ' + year + ', ' + all.time.h12,
    long: fmt.titleCase(days.long[day]) + ' ' + fmt.titleCase(months.long[month]) + ' ' + fmt.ordinal(date) + ' ' + year + ', ' + all.time.h12
  };
  return all;
};
module.exports = format;

},{"../data/days":4,"../data/months":7,"../lib/fmt":15}],21:[function(_dereq_,module,exports){
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

},{}],22:[function(_dereq_,module,exports){
'use strict';

var quarters = _dereq_('../../data/quarters');
var seasons = _dereq_('../../data/seasons');
var set = _dereq_('../set/set');
//destructive setters change the seconds, milliseconds, etc
//- not just the unit they're setting

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
    return this.format().time.h12;
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
  },

  emoji: function emoji() {
    var obj = {
      seasons: {
        spring: '🌱',
        winter: '⛄',
        summer: '☀️️',
        fall: '🍂'
      },
      times: {
        breakfast: '🍳',
        morning: '☕',
        noon: '🌞',
        lunch: '🎒',
        afternoon: '🌤️',
        dinner: '🍽️',
        evening: '🌆',
        night: '🛌'
      }
    };
    return {
      time: obj.times[this.timeOfDay()] || '',
      season: obj.seasons[this.season()] || ''
    };
  }
};

},{"../../data/quarters":8,"../../data/seasons":9,"../set/set":27}],23:[function(_dereq_,module,exports){
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

  return Space;
};

module.exports = addMethods;

},{"./destructive":22,"./normal":24,"./tricky":25}],24:[function(_dereq_,module,exports){
'use strict';

var set = _dereq_('../set/set');
var _dayOfYear = _dereq_('../../lib/dayOfYear');

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
  dayOfYear: function dayOfYear(num) {
    if (num !== undefined) {
      this.epoch = set.dayOfYear(this, num);
      return this;
    }
    return _dayOfYear(this.d);
  }

};
//aliases
methods.milliseconds = methods.millisecond;
methods.seconds = methods.second;
methods.minutes = methods.minute;
methods.hours = methods.hour;
methods.days = methods.day;

module.exports = methods;

},{"../../lib/dayOfYear":14,"../set/set":27}],25:[function(_dereq_,module,exports){
'use strict';

var days = _dereq_('../../data/days');
var dayTimes = _dereq_('../../data/dayTimes');
var months = _dereq_('../../data/months');

//non-destructive getters/setters with fancy moves to do
module.exports = {

  //
  // //this one's tricky
  // month: (s, n) => {
  //   n = validate(n);
  //   let old = s.clone();
  //   let diff = n - s.month();
  //   let shift = diff * ms.month;
  //   s.epoch += shift;
  //   confirm(s, old, 'date');
  //   return s.epoch;
  // },


  //like 'wednesday' (hard!)
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
    var d = this.d;
    var current = d.getDay();
    if (num > current) {
      var diff = num - current;
      d.setDate(d.getDate() + diff);
    } else if (num < current) {
      //should go backwards
      var _diff = current - num;
      d.setDate(d.getDate() - _diff);
    }
    this.epoch = d.getTime();
    return this;
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

},{"../../data/dayTimes":3,"../../data/days":4,"../../data/months":7}],26:[function(_dereq_,module,exports){
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

},{}],27:[function(_dereq_,module,exports){
'use strict';

// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
var dayTimes = _dereq_('../../data/dayTimes');
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

var units = {
  second: ['second', 'millisecond'],
  minute: ['minute', 'second', 'millisecond'],
  hour: ['hour', 'minute', 'second', 'millisecond'],
  date: ['date', 'hour', 'minute', 'second', 'millisecond'],
  month: ['month', 'date', 'hour', 'minute', 'second', 'millisecond'],
  year: ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']
};
//reduce hostile micro-changes when moving dates by millisecond
var confirm = function confirm(s, tmp, unit) {
  var arr = units[unit];
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
      return s.epoch;
    }
    var h24 = false;
    var hour = parseInt(m[1], 10);
    var minute = parseInt(m[2], 10);
    if (hour > 12) {
      h24 = true;
    }
    if (!h24 && m[3] === 'pm') {
      hour += 12;
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

},{"../../data/dayTimes":3,"../../data/milliseconds":5,"../../data/monthLength":6,"../../data/months":7,"./walk":28}],28:[function(_dereq_,module,exports){
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

// const preProcess = function(want) {
//   const sizes = {
//     millisecond: 1000,
//     second: 60,
//     minute: 60,
//   };
//   const units = Object.keys(sizes);
//   for(let i = 0; i < units.length - 1; i++) {
//     let unit = units[i];
//     let nextUnit = units[i + 1];
//     if (want[unit] >= sizes[unit]) {
//       want.second += parseInt(want.millisecond / 1000, 10);
//       want.millisecond = want.millisecond % 1000;
//     }
//   }
//   return want;
// };

// const postProcess = function(s, wants) {
//   Object.keys(wants).forEach((k) => {
//     if (s[k]() !== wants[k]) {
//       console.warn('invalid ' + k + ':   - want ' + wants[k]);
//     }
//   });
//   return s;
// };

var walkTo = function walkTo(s, wants) {
  // wants = preProcess(wants);
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
      console.log('invalid ' + k + ': ' + n);
      return;
    }
    // console.log('walking ' + k + ' to ' + n);
    units[k].walkTo(s, n);
  }
  //if we've gone over a dst-change or something..
  if (wants.hour === undefined && s.hour() !== old.hour()) {
    s.hour(old.hour());
  }
  // s = postProcess(s, wants);
  return;
};
module.exports = walkTo;

},{"../../data/milliseconds":5}],29:[function(_dereq_,module,exports){
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
    var original = s.epoch;
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

},{"../data/quarters":8,"../data/seasons":9,"./set/walk":28}],30:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getBias = _dereq_('./getBias');
var guessTz = _dereq_('./timezone/guessTz');
var _timezone = _dereq_('./timezone/index');
var _format = _dereq_('./methods/format');
var _progress = _dereq_('./methods/progress');
var _diff = _dereq_('./methods/diff');
var ends = _dereq_('./methods/startOf');
var handleInput = _dereq_('./input');

//fake timezone-support, for fakers

var SpaceTime = function () {
  function SpaceTime(input, tz) {
    _classCallCheck(this, SpaceTime);

    //the shift for the given timezone
    this.tz = tz || guessTz();
    //this computer's built-in offset
    this.bias = getBias();
    //parse the various formats
    handleInput(this, input);
  }

  _createClass(SpaceTime, [{
    key: 'set',
    value: function set(input) {
      handleInput(this, input);
      return this;
    }
  }, {
    key: 'timezone',
    value: function timezone() {
      return _timezone(this);
    }
  }, {
    key: 'format',
    value: function format() {
      return _format(this);
    }
  }, {
    key: 'startOf',
    value: function startOf(unit) {
      return ends.startOf(this, unit);
    }
  }, {
    key: 'endOf',
    value: function endOf(unit) {
      return ends.endOf(this, unit);
    }
  }, {
    key: 'leapYear',
    value: function leapYear() {
      var year = this.year();
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
  }, {
    key: 'log',
    value: function log() {
      console.log('');
      console.log(_format(this).nice.short);
      return this;
    }
  }, {
    key: 'logYear',
    value: function logYear() {
      console.log('');
      console.log(_format(this).date.short + ' ' + this.year());
      return this;
    }
  }, {
    key: 'progress',
    value: function progress() {
      return _progress(this);
    }
  }, {
    key: 'diff',
    value: function diff(d, unit) {
      return _diff(this, d, unit);
    }

    //a js date object

  }, {
    key: 'isValid',
    value: function isValid() {
      return !isNaN(this.d.getTime());
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
      // let meta = timezone(this);
      // //current offset in minutes
      // this.offset = meta.current.offset;
      return this;
    }
  }, {
    key: 'd',
    get: function get() {
      var meta = _timezone(this);
      //movement in milliseconds
      var shift = meta.current.epochShift;
      //remove this computer's offset
      shift = shift + this.bias * 60 * 1000;
      var epoch = this.epoch + shift;
      var d = new Date(epoch);
      return d;
    }
  }]);

  return SpaceTime;
}();
//append methods


SpaceTime = _dereq_('./methods/query')(SpaceTime);
SpaceTime = _dereq_('./methods/add')(SpaceTime);
SpaceTime = _dereq_('./methods/same')(SpaceTime);
SpaceTime = _dereq_('./methods/compare')(SpaceTime);

module.exports = SpaceTime;

},{"./getBias":10,"./input":12,"./methods/add":17,"./methods/compare":18,"./methods/diff":19,"./methods/format":20,"./methods/progress":21,"./methods/query":23,"./methods/same":26,"./methods/startOf":29,"./timezone/guessTz":31,"./timezone/index":32}],31:[function(_dereq_,module,exports){
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

},{}],32:[function(_dereq_,module,exports){
'use strict';

var zones = _dereq_('../../data/zonefile.2017');
var isDst = _dereq_('./isDst');

var parseDst = function parseDst(dst) {
  if (!dst) {
    return {};
  }
  var arr = dst.split(' -> ').map(function (s) {
    var tmp = s.split('/');
    return {
      month: parseInt(tmp[0], 10),
      date: parseInt(tmp[1], 10),
      hour: parseInt(tmp[2], 10)
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
    return {};
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
  if (zones[tz].hem === 'n') {
    meta.hemisphere = 'North';
  } else if (zones[tz].hem === 's') {
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

},{"../../data/zonefile.2017":1,"./isDst":33}],33:[function(_dereq_,module,exports){
'use strict';

function zeroPad(str, len) {
  len = len || 2;
  var pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
}

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

},{}]},{},[11])(11)
});