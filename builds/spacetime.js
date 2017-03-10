/* @smallwins/spacetime v0.0.1
  
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetime = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports={
  "Africa/Abidjan": {
    "min": 0
  },
  "Africa/Accra": {
    "min": 0
  },
  "Africa/Addis_Ababa": {
    "min": 180
  },
  "Africa/Algiers": {
    "min": 60
  },
  "Africa/Asmara": {
    "min": 180
  },
  "Africa/Asmera": {
    "min": 180
  },
  "Africa/Bamako": {
    "min": 0
  },
  "Africa/Bangui": {
    "min": 60
  },
  "Africa/Banjul": {
    "min": 0
  },
  "Africa/Bissau": {
    "min": 0
  },
  "Africa/Blantyre": {
    "min": 120
  },
  "Africa/Brazzaville": {
    "min": 60
  },
  "Africa/Bujumbura": {
    "min": 120
  },
  "Africa/Cairo": {
    "min": 120
  },
  "Africa/Casablanca": {
    "min": 60,
    "hem": "n",
    "dst": "6/2/3 -> 9/29/2"
  },
  "Africa/Ceuta": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Africa/Conakry": {
    "min": 0
  },
  "Africa/Dakar": {
    "min": 0
  },
  "Africa/Dar_es_Salaam": {
    "min": 180
  },
  "Africa/Djibouti": {
    "min": 180
  },
  "Africa/Douala": {
    "min": 60
  },
  "Africa/El_Aaiun": {
    "min": 60,
    "hem": "n",
    "dst": "6/2/3 -> 9/29/2"
  },
  "Africa/Freetown": {
    "min": 0
  },
  "Africa/Gaborone": {
    "min": 120
  },
  "Africa/Harare": {
    "min": 120
  },
  "Africa/Johannesburg": {
    "min": 120
  },
  "Africa/Juba": {
    "min": 180
  },
  "Africa/Kampala": {
    "min": 180
  },
  "Africa/Khartoum": {
    "min": 180
  },
  "Africa/Kigali": {
    "min": 120
  },
  "Africa/Kinshasa": {
    "min": 60
  },
  "Africa/Lagos": {
    "min": 60
  },
  "Africa/Libreville": {
    "min": 60
  },
  "Africa/Lome": {
    "min": 0
  },
  "Africa/Luanda": {
    "min": 60
  },
  "Africa/Lubumbashi": {
    "min": 120
  },
  "Africa/Lusaka": {
    "min": 120
  },
  "Africa/Malabo": {
    "min": 60
  },
  "Africa/Maputo": {
    "min": 120
  },
  "Africa/Maseru": {
    "min": 120
  },
  "Africa/Mbabane": {
    "min": 120
  },
  "Africa/Mogadishu": {
    "min": 180
  },
  "Africa/Monrovia": {
    "min": 0
  },
  "Africa/Nairobi": {
    "min": 180
  },
  "Africa/Ndjamena": {
    "min": 60
  },
  "Africa/Niamey": {
    "min": 60
  },
  "Africa/Nouakchott": {
    "min": 0
  },
  "Africa/Ouagadougou": {
    "min": 0
  },
  "Africa/Porto-Novo": {
    "min": 60
  },
  "Africa/Sao_Tome": {
    "min": 0
  },
  "Africa/Timbuktu": {
    "min": 0
  },
  "Africa/Tripoli": {
    "min": 120
  },
  "Africa/Tunis": {
    "min": 60
  },
  "Africa/Windhoek": {
    "min": 60,
    "hem": "s",
    "dst": "8/3/3 -> 3/2/1"
  },
  "America/Adak": {
    "min": -540,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Anchorage": {
    "min": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Anguilla": {
    "min": -240
  },
  "America/Antigua": {
    "min": -240
  },
  "America/Araguaina": {
    "min": -180
  },
  "America/Argentina/Buenos_Aires": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/Catamarca": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/ComodRivadavia": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/Cordoba": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/Jujuy": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/La_Rioja": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/Mendoza": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/Rio_Gallegos": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/Salta": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/San_Juan": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/San_Luis": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/Tucuman": {
    "min": -180,
    "hem": "s"
  },
  "America/Argentina/Ushuaia": {
    "min": -180,
    "hem": "s"
  },
  "America/Aruba": {
    "min": -240
  },
  "America/Asuncion": {
    "min": -240,
    "hem": "s",
    "dst": "9/1/1 -> 2/25/23"
  },
  "America/Atikokan": {
    "min": -300
  },
  "America/Atka": {
    "min": -540,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Bahia": {
    "min": -180
  },
  "America/Bahia_Banderas": {
    "min": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Barbados": {
    "min": -240
  },
  "America/Belem": {
    "min": -180
  },
  "America/Belize": {
    "min": -360
  },
  "America/Blanc-Sablon": {
    "min": -240
  },
  "America/Boa_Vista": {
    "min": -240
  },
  "America/Bogota": {
    "min": -300
  },
  "America/Boise": {
    "min": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Buenos_Aires": {
    "min": -180
  },
  "America/Cambridge_Bay": {
    "min": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Campo_Grande": {
    "min": -240,
    "hem": "s",
    "dst": "9/15/1 -> 1/18/23"
  },
  "America/Cancun": {
    "min": -300
  },
  "America/Caracas": {
    "min": -270
  },
  "America/Catamarca": {
    "min": -180
  },
  "America/Cayenne": {
    "min": -180
  },
  "America/Cayman": {
    "min": -300
  },
  "America/Chicago": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Chihuahua": {
    "min": -360,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Coral_Harbour": {
    "min": -300
  },
  "America/Cordoba": {
    "min": -180
  },
  "America/Costa_Rica": {
    "min": -360,
    "hem": "s"
  },
  "America/Creston": {
    "min": -420
  },
  "America/Cuiaba": {
    "min": -240,
    "hem": "s",
    "dst": "9/15/1 -> 1/18/23"
  },
  "America/Curacao": {
    "min": -240
  },
  "America/Danmarkshavn": {
    "min": 0
  },
  "America/Dawson": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Dawson_Creek": {
    "min": -420
  },
  "America/Denver": {
    "min": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Detroit": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Dominica": {
    "min": -240
  },
  "America/Edmonton": {
    "min": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Eirunepe": {
    "min": -300
  },
  "America/El_Salvador": {
    "min": -360
  },
  "America/Ensenada": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Fort_Wayne": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Fortaleza": {
    "min": -180
  },
  "America/Glace_Bay": {
    "min": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Godthab": {
    "min": -120,
    "hem": "n",
    "dst": "2/25/23 -> 9/28/22"
  },
  "America/Goose_Bay": {
    "min": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Grand_Turk": {
    "min": -240
  },
  "America/Grenada": {
    "min": -240
  },
  "America/Guadeloupe": {
    "min": -240
  },
  "America/Guatemala": {
    "min": -360
  },
  "America/Guayaquil": {
    "min": -300
  },
  "America/Guyana": {
    "min": -240
  },
  "America/Halifax": {
    "min": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Havana": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/1 -> 10/5/0"
  },
  "America/Hermosillo": {
    "min": -420
  },
  "America/Indiana/Indianapolis": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Knox": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Marengo": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Petersburg": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Tell_City": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Vevay": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Vincennes": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indiana/Winamac": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Indianapolis": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Inuvik": {
    "min": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Iqaluit": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Jamaica": {
    "min": -300
  },
  "America/Jujuy": {
    "min": -180
  },
  "America/Juneau": {
    "min": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Kentucky/Louisville": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Kentucky/Monticello": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Knox_IN": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Kralendijk": {
    "min": -240
  },
  "America/La_Paz": {
    "min": -240
  },
  "America/Lima": {
    "min": -300
  },
  "America/Los_Angeles": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Louisville": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Lower_Princes": {
    "min": -240
  },
  "America/Maceio": {
    "min": -180
  },
  "America/Managua": {
    "min": -360
  },
  "America/Manaus": {
    "min": -240
  },
  "America/Marigot": {
    "min": -240
  },
  "America/Martinique": {
    "min": -240
  },
  "America/Matamoros": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Mazatlan": {
    "min": -360,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Mendoza": {
    "min": -180
  },
  "America/Menominee": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Merida": {
    "min": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Metlakatla": {
    "min": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Mexico_City": {
    "min": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Miquelon": {
    "min": -120,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Moncton": {
    "min": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Monterrey": {
    "min": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "America/Montevideo": {
    "min": -180
  },
  "America/Montreal": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Montserrat": {
    "min": -240
  },
  "America/Nassau": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/New_York": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Nipigon": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Nome": {
    "min": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Noronha": {
    "min": -120
  },
  "America/North_Dakota/Beulah": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/North_Dakota/Center": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/North_Dakota/New_Salem": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Ojinaga": {
    "min": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Panama": {
    "min": -300
  },
  "America/Pangnirtung": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Paramaribo": {
    "min": -180
  },
  "America/Phoenix": {
    "min": -420
  },
  "America/Port-au-Prince": {
    "min": -240
  },
  "America/Port_of_Spain": {
    "min": -240
  },
  "America/Porto_Acre": {
    "min": -300
  },
  "America/Porto_Velho": {
    "min": -240
  },
  "America/Puerto_Rico": {
    "min": -240
  },
  "America/Rainy_River": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Rankin_Inlet": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Recife": {
    "min": -180
  },
  "America/Regina": {
    "min": -360
  },
  "America/Resolute": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Rio_Branco": {
    "min": -300
  },
  "America/Rosario": {
    "min": -180
  },
  "America/Santa_Isabel": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Santarem": {
    "min": -180
  },
  "America/Santiago": {
    "min": -180,
    "hem": "s",
    "dst": "7/13/1 -> 4/13/23"
  },
  "America/Santo_Domingo": {
    "min": -240
  },
  "America/Sao_Paulo": {
    "min": -180,
    "hem": "s",
    "dst": "9/15/1 -> 1/18/23"
  },
  "America/Scoresbysund": {
    "min": 0,
    "hem": "n",
    "dst": "2/26/1 -> 9/29/0"
  },
  "America/Shiprock": {
    "min": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Sitka": {
    "min": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/St_Barthelemy": {
    "min": -240
  },
  "America/St_Johns": {
    "min": -150,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/St_Kitts": {
    "min": -240
  },
  "America/St_Lucia": {
    "min": -240
  },
  "America/St_Thomas": {
    "min": -240
  },
  "America/St_Vincent": {
    "min": -240
  },
  "America/Swift_Current": {
    "min": -360
  },
  "America/Tegucigalpa": {
    "min": -360
  },
  "America/Thule": {
    "min": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Thunder_Bay": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Tijuana": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Toronto": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Tortola": {
    "min": -240
  },
  "America/Vancouver": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Virgin": {
    "min": -240
  },
  "America/Whitehorse": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Winnipeg": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Yakutat": {
    "min": -480,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "America/Yellowknife": {
    "min": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Antarctica/Casey": {
    "min": 480,
    "hem": "s"
  },
  "Antarctica/Davis": {
    "min": 420,
    "hem": "s"
  },
  "Antarctica/DumontDUrville": {
    "min": 600,
    "hem": "s"
  },
  "Antarctica/Macquarie": {
    "min": 660,
    "hem": "s"
  },
  "Antarctica/Mawson": {
    "min": 300,
    "hem": "s"
  },
  "Antarctica/McMurdo": {
    "min": 720,
    "hem": "s",
    "dst": "8/24/3 -> 3/2/2"
  },
  "Antarctica/Palmer": {
    "min": -180,
    "hem": "s",
    "dst": "7/13/1 -> 4/13/23"
  },
  "Antarctica/Rothera": {
    "min": -180,
    "hem": "s"
  },
  "Antarctica/South_Pole": {
    "min": 720,
    "hem": "s",
    "dst": "8/24/3 -> 3/2/2"
  },
  "Antarctica/Syowa": {
    "min": 180,
    "hem": "s"
  },
  "Antarctica/Troll": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/1"
  },
  "Antarctica/Vostok": {
    "min": 360,
    "hem": "s"
  },
  "Arctic/Longyearbyen": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Asia/Aden": {
    "min": 180,
    "hem": "n"
  },
  "Asia/Almaty": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Amman": {
    "min": 180,
    "hem": "n",
    "dst": "2/31/1 -> 9/27/0"
  },
  "Asia/Anadyr": {
    "min": 720,
    "hem": "n"
  },
  "Asia/Aqtau": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Aqtobe": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Ashgabat": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Ashkhabad": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Baghdad": {
    "min": 180,
    "hem": "n"
  },
  "Asia/Bahrain": {
    "min": 180,
    "hem": "n"
  },
  "Asia/Baku": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Bangkok": {
    "min": 420,
    "hem": "n"
  },
  "Asia/Beirut": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/1 -> 9/28/23"
  },
  "Asia/Bishkek": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Brunei": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Calcutta": {
    "min": 330,
    "hem": "n"
  },
  "Asia/Chita": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Choibalsan": {
    "min": 480,
    "hem": "n",
    "dst": "2/25/3 -> 8/29/23"
  },
  "Asia/Chongqing": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Chungking": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Colombo": {
    "min": 330,
    "hem": "n"
  },
  "Asia/Dacca": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Damascus": {
    "min": 180,
    "hem": "n",
    "dst": "2/31/1 -> 9/26/23"
  },
  "Asia/Dhaka": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Dili": {
    "min": 540,
    "hem": "n"
  },
  "Asia/Dubai": {
    "min": 240,
    "hem": "n"
  },
  "Asia/Dushanbe": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Gaza": {
    "min": 180,
    "hem": "n",
    "dst": "2/25/2 -> 9/28/0"
  },
  "Asia/Harbin": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Hebron": {
    "min": 180,
    "hem": "n",
    "dst": "2/25/2 -> 9/28/0"
  },
  "Asia/Ho_Chi_Minh": {
    "min": 420,
    "hem": "n"
  },
  "Asia/Hong_Kong": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Hovd": {
    "min": 420,
    "hem": "n",
    "dst": "2/25/3 -> 8/29/23"
  },
  "Asia/Irkutsk": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Istanbul": {
    "min": 180,
    "hem": "n"
  },
  "Asia/Jakarta": {
    "min": 420,
    "hem": "n"
  },
  "Asia/Jayapura": {
    "min": 540,
    "hem": "n"
  },
  "Asia/Jerusalem": {
    "min": 180,
    "hem": "n",
    "dst": "2/24/3 -> 9/29/1"
  },
  "Asia/Kabul": {
    "min": 270,
    "hem": "n"
  },
  "Asia/Kamchatka": {
    "min": 720,
    "hem": "n"
  },
  "Asia/Karachi": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Kashgar": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Kathmandu": {
    "min": 345,
    "hem": "n"
  },
  "Asia/Katmandu": {
    "min": 345,
    "hem": "n"
  },
  "Asia/Khandyga": {
    "min": 540,
    "hem": "n"
  },
  "Asia/Kolkata": {
    "min": 330,
    "hem": "n"
  },
  "Asia/Krasnoyarsk": {
    "min": 420,
    "hem": "n"
  },
  "Asia/Kuala_Lumpur": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Kuching": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Kuwait": {
    "min": 180,
    "hem": "n"
  },
  "Asia/Macao": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Macau": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Magadan": {
    "min": 600,
    "hem": "n"
  },
  "Asia/Makassar": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Manila": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Muscat": {
    "min": 240,
    "hem": "n"
  },
  "Asia/Nicosia": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Asia/Novokuznetsk": {
    "min": 420,
    "hem": "n"
  },
  "Asia/Novosibirsk": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Omsk": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Oral": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Phnom_Penh": {
    "min": 420,
    "hem": "n"
  },
  "Asia/Pontianak": {
    "min": 420,
    "hem": "n"
  },
  "Asia/Pyongyang": {
    "min": 540,
    "hem": "n"
  },
  "Asia/Qatar": {
    "min": 180,
    "hem": "n"
  },
  "Asia/Qyzylorda": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Rangoon": {
    "min": 390,
    "hem": "n"
  },
  "Asia/Riyadh": {
    "min": 180,
    "hem": "n"
  },
  "Asia/Saigon": {
    "min": 420,
    "hem": "n"
  },
  "Asia/Sakhalin": {
    "min": 600,
    "hem": "n"
  },
  "Asia/Samarkand": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Seoul": {
    "min": 540,
    "hem": "n"
  },
  "Asia/Shanghai": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Singapore": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Srednekolymsk": {
    "min": 660,
    "hem": "n"
  },
  "Asia/Taipei": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Tashkent": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Tbilisi": {
    "min": 240,
    "hem": "n"
  },
  "Asia/Tehran": {
    "min": 270,
    "hem": "n",
    "dst": "2/22/1 -> 8/21/23"
  },
  "Asia/Tel_Aviv": {
    "min": 180,
    "hem": "n",
    "dst": "2/24/3 -> 9/29/1"
  },
  "Asia/Thimbu": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Thimphu": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Tokyo": {
    "min": 540,
    "hem": "n"
  },
  "Asia/Ujung_Pandang": {
    "min": 480,
    "hem": "n"
  },
  "Asia/Ulaanbaatar": {
    "min": 480,
    "hem": "n",
    "dst": "2/25/3 -> 8/29/23"
  },
  "Asia/Ulan_Bator": {
    "min": 480,
    "hem": "n",
    "dst": "2/25/3 -> 8/29/23"
  },
  "Asia/Urumqi": {
    "min": 360,
    "hem": "n"
  },
  "Asia/Ust-Nera": {
    "min": 600,
    "hem": "n"
  },
  "Asia/Vientiane": {
    "min": 420,
    "hem": "n"
  },
  "Asia/Vladivostok": {
    "min": 600,
    "hem": "n"
  },
  "Asia/Yakutsk": {
    "min": 540,
    "hem": "n"
  },
  "Asia/Yekaterinburg": {
    "min": 300,
    "hem": "n"
  },
  "Asia/Yerevan": {
    "min": 240,
    "hem": "n"
  },
  "Atlantic/Azores": {
    "min": 0,
    "hem": "n",
    "dst": "2/26/1 -> 9/29/0"
  },
  "Atlantic/Bermuda": {
    "min": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Atlantic/Canary": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Atlantic/Cape_Verde": {
    "min": -60
  },
  "Atlantic/Faeroe": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Atlantic/Faroe": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Atlantic/Jan_Mayen": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Atlantic/Madeira": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Atlantic/Reykjavik": {
    "min": 0
  },
  "Atlantic/South_Georgia": {
    "min": -120
  },
  "Atlantic/St_Helena": {
    "min": 0
  },
  "Atlantic/Stanley": {
    "min": -180
  },
  "Australia/ACT": {
    "min": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Adelaide": {
    "min": 570,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Brisbane": {
    "min": 600,
    "hem": "s"
  },
  "Australia/Broken_Hill": {
    "min": 570,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Canberra": {
    "min": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Currie": {
    "min": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Darwin": {
    "min": 570,
    "hem": "s"
  },
  "Australia/Eucla": {
    "min": 525,
    "hem": "s"
  },
  "Australia/Hobart": {
    "min": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/LHI": {
    "min": 630,
    "hem": "s",
    "dst": "9/1/2 -> 3/2/1"
  },
  "Australia/Lindeman": {
    "min": 600,
    "hem": "s"
  },
  "Australia/Lord_Howe": {
    "min": 630,
    "hem": "s",
    "dst": "9/1/2 -> 3/2/1"
  },
  "Australia/Melbourne": {
    "min": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/NSW": {
    "min": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/North": {
    "min": 570,
    "hem": "s"
  },
  "Australia/Perth": {
    "min": 480,
    "hem": "s"
  },
  "Australia/Queensland": {
    "min": 600,
    "hem": "s"
  },
  "Australia/South": {
    "min": 570,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Sydney": {
    "min": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Tasmania": {
    "min": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/Victoria": {
    "min": 600,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Australia/West": {
    "min": 480,
    "hem": "s"
  },
  "Australia/Yancowinna": {
    "min": 570,
    "hem": "s",
    "dst": "9/1/3 -> 3/2/2"
  },
  "Brazil/Acre": {
    "min": -300
  },
  "Brazil/DeNoronha": {
    "min": -120
  },
  "Brazil/East": {
    "min": -180,
    "hem": "s",
    "dst": "9/15/1 -> 1/18/23"
  },
  "Brazil/West": {
    "min": -240
  },
  "Canada/Atlantic": {
    "min": -180,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Central": {
    "min": -300,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/East-Saskatchewan": {
    "min": -360,
    "hem": "n"
  },
  "Canada/Eastern": {
    "min": -240,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Mountain": {
    "min": -360,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Newfoundland": {
    "min": -150,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Pacific": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Canada/Saskatchewan": {
    "min": -360,
    "hem": "n"
  },
  "Canada/Yukon": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Chile/Continental": {
    "min": -180,
    "hem": "s",
    "dst": "7/13/1 -> 4/13/23"
  },
  "Chile/EasterIsland": {
    "min": -300,
    "hem": "s",
    "dst": "7/12/23 -> 4/13/21"
  },
  "Etc/GMT": {
    "min": 0
  },
  "Etc/GMT+0": {
    "min": 0
  },
  "Etc/GMT+1": {
    "min": -60
  },
  "Etc/GMT+10": {
    "min": -600
  },
  "Etc/GMT+11": {
    "min": -660
  },
  "Etc/GMT+12": {
    "min": -720
  },
  "Etc/GMT+2": {
    "min": -120
  },
  "Etc/GMT+3": {
    "min": -180
  },
  "Etc/GMT+4": {
    "min": -240
  },
  "Etc/GMT+5": {
    "min": -300
  },
  "Etc/GMT+6": {
    "min": -360
  },
  "Etc/GMT+7": {
    "min": -420
  },
  "Etc/GMT+8": {
    "min": -480
  },
  "Etc/GMT+9": {
    "min": -540
  },
  "Etc/GMT-0": {
    "min": 0
  },
  "Etc/GMT-1": {
    "min": 60
  },
  "Etc/GMT-10": {
    "min": 600
  },
  "Etc/GMT-11": {
    "min": 660
  },
  "Etc/GMT-12": {
    "min": 720
  },
  "Etc/GMT-13": {
    "min": 780
  },
  "Etc/GMT-14": {
    "min": 840
  },
  "Etc/GMT-2": {
    "min": 120
  },
  "Etc/GMT-3": {
    "min": 180
  },
  "Etc/GMT-4": {
    "min": 240
  },
  "Etc/GMT-5": {
    "min": 300
  },
  "Etc/GMT-6": {
    "min": 360
  },
  "Etc/GMT-7": {
    "min": 420
  },
  "Etc/GMT-8": {
    "min": 480
  },
  "Etc/GMT-9": {
    "min": 540
  },
  "Etc/GMT0": {
    "min": 0
  },
  "Etc/Greenwich": {
    "min": 0
  },
  "Etc/UCT": {
    "min": 0
  },
  "Etc/UTC": {
    "min": 0
  },
  "Etc/Universal": {
    "min": 0
  },
  "Etc/Zulu": {
    "min": 0
  },
  "Europe/Amsterdam": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Andorra": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Athens": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Belfast": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Belgrade": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Berlin": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Bratislava": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Brussels": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Bucharest": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Budapest": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Busingen": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Chisinau": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Copenhagen": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Dublin": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Gibraltar": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Guernsey": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Helsinki": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Isle_of_Man": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Istanbul": {
    "min": 180,
    "hem": "n"
  },
  "Europe/Jersey": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Kaliningrad": {
    "min": 120,
    "hem": "n"
  },
  "Europe/Kiev": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Lisbon": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Ljubljana": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/London": {
    "min": 60,
    "hem": "n",
    "dst": "2/26/2 -> 9/29/1"
  },
  "Europe/Luxembourg": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Madrid": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Malta": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Mariehamn": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Minsk": {
    "min": 180,
    "hem": "n"
  },
  "Europe/Monaco": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Moscow": {
    "min": 180,
    "hem": "n"
  },
  "Europe/Nicosia": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Oslo": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Paris": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Podgorica": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Prague": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Riga": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Rome": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Samara": {
    "min": 240,
    "hem": "n"
  },
  "Europe/San_Marino": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Sarajevo": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Simferopol": {
    "min": 180,
    "hem": "n"
  },
  "Europe/Skopje": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Sofia": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Stockholm": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Tallinn": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Tirane": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Tiraspol": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Uzhgorod": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Vaduz": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Vatican": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Vienna": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Vilnius": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Volgograd": {
    "min": 180,
    "hem": "n"
  },
  "Europe/Warsaw": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Zagreb": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Europe/Zaporozhye": {
    "min": 180,
    "hem": "n",
    "dst": "2/26/4 -> 9/29/3"
  },
  "Europe/Zurich": {
    "min": 120,
    "hem": "n",
    "dst": "2/26/3 -> 9/29/2"
  },
  "Indian/Antananarivo": {
    "min": 180
  },
  "Indian/Chagos": {
    "min": 360
  },
  "Indian/Christmas": {
    "min": 420
  },
  "Indian/Cocos": {
    "min": 390
  },
  "Indian/Comoro": {
    "min": 180
  },
  "Indian/Kerguelen": {
    "min": 300
  },
  "Indian/Mahe": {
    "min": 240
  },
  "Indian/Maldives": {
    "min": 300
  },
  "Indian/Mauritius": {
    "min": 240
  },
  "Indian/Mayotte": {
    "min": 180
  },
  "Indian/Reunion": {
    "min": 240
  },
  "Mexico/BajaNorte": {
    "min": -420,
    "hem": "n",
    "dst": "2/12/3 -> 10/5/1"
  },
  "Mexico/BajaSur": {
    "min": -360,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "Mexico/General": {
    "min": -300,
    "hem": "n",
    "dst": "3/2/3 -> 9/29/1"
  },
  "Pacific/Apia": {
    "min": 780,
    "hem": "s",
    "dst": "8/24/4 -> 3/2/3"
  },
  "Pacific/Auckland": {
    "min": 720,
    "hem": "s",
    "dst": "8/24/3 -> 3/2/2"
  },
  "Pacific/Chatham": {
    "min": 765,
    "hem": "s",
    "dst": "8/24/3 -> 3/2/2"
  },
  "Pacific/Chuuk": {
    "min": 600
  },
  "Pacific/Easter": {
    "min": -300,
    "hem": "s",
    "dst": "7/12/23 -> 4/13/21"
  },
  "Pacific/Efate": {
    "min": 660
  },
  "Pacific/Enderbury": {
    "min": 780
  },
  "Pacific/Fakaofo": {
    "min": 780
  },
  "Pacific/Fiji": {
    "min": 720,
    "hem": "s",
    "dst": "10/5/3 -> 0/15/2"
  },
  "Pacific/Funafuti": {
    "min": 720
  },
  "Pacific/Galapagos": {
    "min": -360
  },
  "Pacific/Gambier": {
    "min": -540
  },
  "Pacific/Guadalcanal": {
    "min": 660
  },
  "Pacific/Guam": {
    "min": 600
  },
  "Pacific/Honolulu": {
    "min": -600
  },
  "Pacific/Johnston": {
    "min": -600
  },
  "Pacific/Kiritimati": {
    "min": 840
  },
  "Pacific/Kosrae": {
    "min": 660
  },
  "Pacific/Kwajalein": {
    "min": 720
  },
  "Pacific/Majuro": {
    "min": 720
  },
  "Pacific/Marquesas": {
    "min": -570
  },
  "Pacific/Midway": {
    "min": -660
  },
  "Pacific/Nauru": {
    "min": 720
  },
  "Pacific/Niue": {
    "min": -660
  },
  "Pacific/Norfolk": {
    "min": 690
  },
  "Pacific/Noumea": {
    "min": 660
  },
  "Pacific/Pago_Pago": {
    "min": -660
  },
  "Pacific/Palau": {
    "min": 540
  },
  "Pacific/Pitcairn": {
    "min": -480
  },
  "Pacific/Pohnpei": {
    "min": 660
  },
  "Pacific/Ponape": {
    "min": 660
  },
  "Pacific/Port_Moresby": {
    "min": 600
  },
  "Pacific/Rarotonga": {
    "min": -600
  },
  "Pacific/Saipan": {
    "min": 600
  },
  "Pacific/Samoa": {
    "min": -660
  },
  "Pacific/Tahiti": {
    "min": -600
  },
  "Pacific/Tarawa": {
    "min": 720
  },
  "Pacific/Tongatapu": {
    "min": 780,
    "hem": "s",
    "dst": "10/5/3 -> 0/15/2"
  },
  "Pacific/Truk": {
    "min": 600
  },
  "Pacific/Wake": {
    "min": 720
  },
  "Pacific/Wallis": {
    "min": 720
  },
  "Pacific/Yap": {
    "min": 600
  }
}
},{}],2:[function(_dereq_,module,exports){
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

},{}],3:[function(_dereq_,module,exports){
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

},{}],4:[function(_dereq_,module,exports){
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

},{"../package.json":2,"./spacetime":18}],5:[function(_dereq_,module,exports){
'use strict';

var fmt = _dereq_('./lib/fmt');
var months = _dereq_('./lib/months');
var days = _dereq_('./lib/days');

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
  var all = {
    numeric: {
      uk: fmt.zeroPad(date) + '/' + fmt.zeroPad(month) + '/' + year, //dd/mm/yyyy
      us: fmt.zeroPad(month) + '/' + fmt.zeroPad(date) + '/' + year },
    time: {
      h12: hour12 + ':' + fmt.zeroPad(minute) + s.ampm(), //3:45pm
      h24: hour24 + ':' + fmt.zeroPad(minute) //15:45
    },
    date: {
      short: fmt.titleCase(months.short[month]) + ' ' + fmt.ordinal(date) + ' ' + year, //Apr 12 2016
      long: fmt.titleCase(months.long[month]) + ' ' + fmt.ordinal(date) + ' ' + year },
    iso: {
      local: year + '-' + fmt.zeroPad(month) + '-' + fmt.zeroPad(date) + 'T' + hour24 + ':' + fmt.zeroPad(minute) + ':' + fmt.zeroPad(s.second()) + ':' + fmt.zeroPad(s.millisecond(), 3) + 'Z', //2017-03-08T19:45:28.367Z
      utc: new Date(s.epoch).toISOString() //2017-03-08T19:45:28.367Z
    },
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

},{"./lib/days":8,"./lib/fmt":9,"./lib/months":10}],6:[function(_dereq_,module,exports){
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

},{}],7:[function(_dereq_,module,exports){
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

},{}],8:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  short: ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'],
  long: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
};

},{}],9:[function(_dereq_,module,exports){
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

},{}],10:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  short: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'],
  long: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
};

},{}],11:[function(_dereq_,module,exports){
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

},{}],12:[function(_dereq_,module,exports){
"use strict";

module.exports = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1]];

},{}],13:[function(_dereq_,module,exports){
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

},{}],14:[function(_dereq_,module,exports){
'use strict';

// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
var dayTimes = _dereq_('./dayTimes');
var ms = _dereq_('./ms');

module.exports = {

  milliseconds: function milliseconds(s, n) {
    var current = s.millisecond();
    var diff = current - n; //milliseconds to shift by
    return s.epoch - diff;
  },

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

},{"./dayTimes":7,"./ms":11}],15:[function(_dereq_,module,exports){
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

},{"./lib/ms":11}],16:[function(_dereq_,module,exports){
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
      for (var _i = 0; _i < seasons.length - 1; _i++) {
        if (month >= seasons[_i][1] && month < seasons[_i + 1][1]) {
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
    },

    emoji: function emoji() {
      var seasons = {
        spring: '🌱',
        winter: '⛄',
        summer: '☀️️',
        fall: '🍂'
      };
      var times = {
        breakfast: '🍳',
        morning: '☕',
        noon: '🌞',
        lunch: '🎒',
        afternoon: '🌤️',
        dinner: '🍽️',
        evening: '🌆',
        night: '🛌'
      };
      return {
        time: times[this.timeOfDay()] || '',
        season: seasons[this.season()] || ''
      };
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

},{"./lib/dayOfYear":6,"./lib/dayTimes":7,"./lib/days":8,"./lib/months":10,"./lib/quarters":12,"./lib/seasons":13,"./lib/set":14}],17:[function(_dereq_,module,exports){
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

},{}],18:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getBias = _dereq_('./getBias');
var guessTz = _dereq_('./timezone/guessTz');
var _timezone = _dereq_('./timezone/index');
var _format = _dereq_('./methods/format');

//fake timezone-support, for fakers

var SpaceTime = function () {
  function SpaceTime(input, tz) {
    _classCallCheck(this, SpaceTime);

    //the shift for the given timezone
    this.tz = tz || guessTz();
    //this computer's built-in offset
    this.bias = getBias();

    if (typeof input === 'number') {
      this.epoch = input;
    } else {
      var d = new Date(input);
      this.epoch = d.getTime();
      var meta = _timezone(this);
      // console.log(meta);
      this.epoch = d.getTime() - meta.current.epochShift - this.bias * 60 * 1000;
    }
  }

  _createClass(SpaceTime, [{
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
    key: 'log',
    value: function log() {
      console.log('');
      console.log(_format(this).nice.short);
      return this;
    }

    //a js date object

  }, {
    key: 'isValid',
    value: function isValid() {
      return isNaN(this.d.getTime());
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
SpaceTime = _dereq_('./methods/move')(SpaceTime);
SpaceTime = _dereq_('./methods/same')(SpaceTime);

module.exports = SpaceTime;

},{"./getBias":3,"./methods/format":5,"./methods/move":15,"./methods/query":16,"./methods/same":17,"./timezone/guessTz":19,"./timezone/index":20}],19:[function(_dereq_,module,exports){
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

},{}],20:[function(_dereq_,module,exports){
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
    base: zones[tz].min + meta.dst.change,
    dst: zones[tz].min
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

},{"../../data/zonefile.2017":1,"./isDst":21}],21:[function(_dereq_,module,exports){
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

},{}]},{},[4])(4)
});