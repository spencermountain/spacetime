module.exports = [
  {
    name: 'India Time',
    abbr: null,
    aliases: [
      'india',
      'indian',
      'india standard time',
      'chennai',
      'kolkata',
      'mumbai',
      'new delhi'
    ],
    ids: ['Asia/Kolkata', 'Asia/Calcutta', 'Asia/Colombo'],
    std: {
      name: 'India Standard Time',
      abbr: 'IST',
      offset: 5.5
    },
    dst: {},
    long: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    hem: 'n'
  },
  {
    name: 'China Time',
    abbr: null,
    aliases: ['china', 'china standard time', 'beijing', 'chongqing', 'hong kong', 'urumqi'],
    ids: ['Asia/Shanghai', 'Asia/Macau', 'Asia/Urumqi'],
    std: {
      abbr: 'CST',
      name: 'China Standard Time',
      offset: 8
    },
    dst: {},
    long: '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
    hem: 'n'
  },
  {
    name: 'Central European Time',
    abbr: null,
    aliases: [
      'europe central',
      'romance standard time',
      'brussels',
      'copenhagen',
      'madrid',
      'paris',
      'romance'
    ],
    ids: [
      'Europe/Paris',
      'Africa/Ceuta',
      'Arctic/Longyearbyen',
      'Europe/Amsterdam',
      'Europe/Andorra',
      'Europe/Belgrade',
      'Europe/Berlin',
      'Europe/Bratislava',
      'Europe/Brussels',
      'Europe/Budapest',
      'Europe/Busingen',
      'Europe/Copenhagen',
      'Europe/Gibraltar',
      'Europe/Ljubljana',
      'Europe/Luxembourg',
      'Europe/Madrid',
      'Europe/Malta',
      'Europe/Monaco',
      'Europe/Oslo',
      'Europe/Podgorica',
      'Europe/Prague',
      'Europe/Rome',
      'Europe/San_Marino',
      'Europe/Sarajevo',
      'Europe/Skopje',
      'Europe/Stockholm',
      'Europe/Tirane',
      'Europe/Vaduz',
      'Europe/Vatican',
      'Europe/Vienna',
      'Europe/Warsaw',
      'Europe/Zagreb',
      'Europe/Zurich'
    ],
    std: {
      abbr: 'CET',
      name: 'Central European Standard Time',
      offset: 1
    },
    dst: {
      abbr: 'CEST',
      name: 'Central European Summer Time',
      offset: 2
    },
    long: '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris',
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    ids: [
      'America/Puerto_Rico',
      'America/Montserrat',
      'America/Port_of_Spain',
      'America/Santo_Domingo',
      'America/St_Barthelemy',
      'America/St_Kitts',
      'America/St_Lucia',
      'America/St_Thomas',
      'America/St_Vincent',
      'America/Tortola',
      'America/Grenada',
      'America/Guadeloupe',
      'America/Kralendijk',
      'America/Lower_Princes',
      'America/Marigot',
      'America/Martinique',
      'America/Anguilla',
      'America/Antigua',
      'America/Aruba',
      'America/Barbados',
      'America/Blanc-Sablon',
      'America/Curacao',
      'America/Dominica'
    ],
    std: {
      name: 'Atlantic Standard Time',
      abbr: 'AST',
      offset: -4
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Greenwich Mean Time',
    abbr: null,
    aliases: ['gmt', 'zulu', 'utc', 'coordinated universal time'],
    ids: [
      'Etc/GMT',
      'Africa/Abidjan',
      'Africa/Accra',
      'Africa/Bamako',
      'Africa/Banjul',
      'Africa/Bissau',
      'Africa/Conakry',
      'Africa/Dakar',
      'Africa/Freetown',
      'Africa/Lome',
      'Africa/Monrovia',
      'Africa/Nouakchott',
      'Africa/Ouagadougou',
      'Africa/Sao_Tome',
      'America/Danmarkshavn',
      'Atlantic/Reykjavik',
      'Atlantic/St_Helena',
      'Etc/UTC'
    ],
    std: {
      name: 'Greenwich Mean Time',
      abbr: 'GMT',
      offset: 0
    },
    dst: {},
    long: '(UTC) Coordinated Universal Time',
    hem: 'n'
  },
  {
    name: 'Eastern European Time',
    abbr: null,
    aliases: ['europe eastern'],
    ids: [
      'Asia/Beirut',
      'Asia/Famagusta',
      'Asia/Nicosia',
      'Europe/Athens',
      'Europe/Bucharest',
      'Europe/Chisinau',
      'Europe/Helsinki',
      'Europe/Kiev',
      'Europe/Mariehamn',
      'Europe/Riga',
      'Europe/Sofia',
      'Europe/Tallinn',
      'Europe/Uzhgorod',
      'Europe/Vilnius',
      'Europe/Zaporozhye'
    ],
    std: {
      abbr: 'EET',
      name: 'Eastern European Standard Time',
      offset: 2
    },
    dst: {
      abbr: 'EEST',
      name: 'Eastern European Summer Time',
      offset: 3
    },
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    ids: [
      'America/Indiana',
      'America/North_Dakota',
      'America/Belize',
      'America/Costa_Rica',
      'America/El_Salvador',
      'America/Guatemala',
      'America/Indiana/Knox',
      'America/Indiana/Tell_City',
      'America/Managua',
      'America/North_Dakota/Beulah',
      'America/North_Dakota/Center',
      'America/North_Dakota/New_Salem',
      'America/Regina',
      'America/Swift_Current',
      'America/Tegucigalpa'
    ],
    std: {
      name: 'Central Standard Time',
      abbr: 'CST',
      offset: -6
    },
    hem: 'n'
  },
  {
    name: 'Eastern Time',
    abbr: 'ET',
    aliases: ['america eastern', 'eastern standard time', 'eastern'],
    ids: [
      'America/New_York',
      'America/Detroit',
      'America/Grand_Turk',
      'America/Indianapolis',
      'America/Iqaluit',
      'America/Louisville',
      'America/Nassau',
      'America/Nipigon',
      'America/Pangnirtung',
      'America/Port-au-Prince',
      'America/Thunder_Bay',
      'America/Toronto',
      'America/Montreal',
      'America/Kentucky'
    ],
    std: {
      name: 'Eastern Standard Time',
      abbr: 'EST',
      offset: -5
    },
    dst: {
      name: 'Eastern Daylight Time',
      abbr: 'EDT',
      offset: -4
    },
    long: '(UTC-05:00) Eastern Time (US & Canada)',
    hem: 'n'
  },
  {
    name: 'Argentina Time',
    abbr: 'ART',
    aliases: ['argentina', 'arst', 'argentina standard time', 'buenos aires'],
    ids: [
      'America/Buenos_Aires',
      'America/Argentina/La_Rioja',
      'America/Argentina/Rio_Gallegos',
      'America/Argentina/Salta',
      'America/Argentina/San_Juan',
      'America/Argentina/San_Luis',
      'America/Argentina/Tucuman',
      'America/Argentina/Ushuaia',
      'America/Catamarca',
      'America/Cordoba',
      'America/Jujuy',
      'America/Mendoza',
      'Antarctica/Rothera',
      'America/Argentina'
    ],
    std: {
      name: 'Argentina Standard Time',
      abbr: 'ART',
      offset: -3
    },
    dst: {},
    long: '(UTC-03:00) City of Buenos Aires',
    hem: 's'
  },
  {
    name: '',
    dupe: true,
    ids: [
      'America/Coral_Harbour',
      'America/Indiana/Marengo',
      'America/Indiana/Petersburg',
      'America/Indiana/Vevay',
      'America/Indiana/Vincennes',
      'America/Indiana/Winamac',
      'America/Kentucky/Monticello',
      'America/Cancun',
      'America/Cayman',
      'America/Jamaica',
      'America/Panama'
    ],
    std: {
      name: 'Eastern Standard Time',
      abbr: 'EST',
      offset: -5
    },
    hem: 'n'
  },
  {
    name: 'East Africa Time',
    abbr: null,
    aliases: [
      'africa eastern',
      'e. africa standard time',
      'nairobi',
      'east africa',
      'eastern africa'
    ],
    ids: [
      'Africa/Nairobi',
      'Africa/Addis_Ababa',
      'Africa/Asmera',
      'Africa/Dar_es_Salaam',
      'Africa/Djibouti',
      'Africa/Kampala',
      'Africa/Mogadishu',
      'Indian/Comoro',
      'Indian/Mayotte'
    ],
    std: {
      name: 'East Africa Time',
      abbr: 'EAT',
      offset: 3
    },
    dst: {},
    long: '(UTC+03:00) Nairobi',
    hem: 'n'
  },
  {
    name: 'West Africa Time',
    abbr: 'WAT',
    aliases: [
      'africa western',
      'wast',
      'western africa',
      'w. central africa standard time',
      'west central africa',
      'w. central africa'
    ],
    ids: [
      'Africa/Lagos',
      'Africa/Bangui',
      'Africa/Douala',
      'Africa/Libreville',
      'Africa/Malabo',
      'Africa/Ndjamena',
      'Africa/Niamey',
      'Africa/Porto-Novo'
    ],
    std: {
      name: 'West Africa Standard Time',
      abbr: 'WAT',
      offset: 1
    },
    long: '(UTC+01:00) West Central Africa',
    hem: 'n'
  },
  {
    name: 'Moscow Time',
    abbr: null,
    aliases: ['moscow', 'russian standard time', 'st. petersburg', 'russian', 'volgograd time'],
    ids: [
      'Europe/Moscow',
      'Europe/Astrakhan',
      'Europe/Minsk',
      'Europe/Simferopol',
      'Europe/Ulyanovsk',
      'Europe/Kirov',
      'Europe/Volgograd',
      'Asia/Volgograd'
    ],
    std: {
      abbr: 'MSK',
      name: 'Moscow Standard Time',
      offset: 3
    },
    dst: {},
    long: '(UTC+03:00) Moscow, St. Petersburg',
    hem: 'n'
  },
  {
    name: 'Brasilia Time',
    abbr: null,
    aliases: ['brasilia', 'e. south america standard time', 'east south america'],
    ids: [
      'America/Sao_Paulo',
      'America/Araguaina',
      'America/Bahia',
      'America/Belem',
      'America/Fortaleza',
      'America/Maceio',
      'America/Recife',
      'America/Santarem'
    ],
    std: {
      abbr: 'BRT',
      name: 'Brasilia Standard Time',
      offset: -3
    },
    dst: {},
    long: '(UTC-03:00) Brasilia',
    hem: 's'
  },
  {
    name: 'Mountain Time',
    abbr: 'MT',
    aliases: ['america mountain', 'mountain standard time', 'mountain'],
    ids: [
      'America/Boise',
      'America/Cambridge_Bay',
      'America/Denver',
      'America/Edmonton',
      'America/Inuvik',
      'America/Ojinaga',
      'America/Yellowknife'
    ],
    std: {
      name: 'Mountain Standard Time',
      abbr: 'MST',
      offset: -7
    },
    dst: {
      name: 'Mountain Daylight Time',
      abbr: 'MDT',
      offset: -6
    },
    long: '(UTC-07:00) Mountain Time (US & Canada)',
    hem: 'n'
  },
  {
    name: 'Central Time',
    abbr: 'CT',
    aliases: ['america central', 'central standard time', 'central'],
    ids: [
      'America/Chicago',
      'America/Matamoros',
      'America/Menominee',
      'America/Rainy_River',
      'America/Rankin_Inlet',
      'America/Resolute',
      'America/Winnipeg'
    ],
    std: {
      name: 'Central Standard Time',
      abbr: 'CST',
      offset: -6
    },
    dst: {
      name: 'Central Daylight Time',
      abbr: 'CDT',
      offset: -5
    },
    long: '(UTC-06:00) Central Time (US & Canada)',
    hem: 'n'
  },
  {
    name: 'Central Africa Time',
    abbr: null,
    aliases: ['africa central', 'namibia standard time', 'windhoek', 'namibia'],
    ids: [
      'Africa/Windhoek',
      'Africa/Gaborone',
      'Africa/Harare',
      'Africa/Lubumbashi',
      'Africa/Lusaka',
      'Africa/Maputo'
    ],
    std: {
      name: 'Central Africa Time',
      abbr: 'CAT',
      offset: 2
    },
    dst: {},
    long: '(UTC+02:00) Windhoek',
    hem: 's'
  },
  {
    name: 'Arabian Time',
    abbr: null,
    aliases: ['arabian', 'arab standard time', 'kuwait', 'riyadh', 'arab', 'arabia', 'arabic'],
    ids: ['Asia/Baghdad', 'Asia/Aden', 'Asia/Bahrain', 'Asia/Kuwait', 'Asia/Qatar', 'Asia/Riyadh'],
    std: {
      abbr: 'AST',
      name: 'Arabian Standard Time',
      offset: 3
    },
    dst: {},
    long: '(UTC+03:00) Kuwait, Riyadh',
    hem: 'n'
  },
  {
    name: 'Alaska Time',
    abbr: 'AKT',
    aliases: ['alaska', 'alaskan standard time', 'alaskan'],
    ids: [
      'America/Anchorage',
      'America/Juneau',
      'America/Metlakatla',
      'America/Nome',
      'America/Sitka',
      'America/Yakutat'
    ],
    std: {
      name: 'Alaska Standard Time',
      abbr: 'AKST',
      offset: -9
    },
    dst: {
      name: 'Alaska Daylight Time',
      abbr: 'AKDT',
      offset: -8
    },
    long: '(UTC-09:00) Alaska',
    hem: 'n'
  },
  {
    name: 'Atlantic Time',
    abbr: 'AT',
    aliases: ['atlantic', 'atlantic standard time'],
    ids: [
      'America/Halifax',
      'America/Glace_Bay',
      'America/Goose_Bay',
      'America/Moncton',
      'America/Thule',
      'Atlantic/Bermuda'
    ],
    std: {
      name: 'Atlantic Standard Time',
      abbr: 'AST',
      offset: -4
    },
    dst: {
      name: 'Atlantic Daylight Time',
      abbr: 'ADT',
      offset: -3
    },
    long: '(UTC-04:00) Atlantic Time (Canada)',
    hem: 'n'
  },
  {
    name: 'British Time',
    abbr: null,
    aliases: ['gmt', 'gmt standard time', 'dublin', 'edinburgh', 'lisbon', 'london'],
    ids: [
      'Europe/London',
      'Europe/Dublin',
      'Europe/Guernsey',
      'Europe/Isle_of_Man',
      'Europe/Jersey'
    ],
    std: {
      name: 'Greenwich Mean Time',
      abbr: 'GMT',
      offset: 0
    },
    dst: {
      name: 'British Summer Time',
      abbr: 'BST',
      offset: 1
    },
    long: '(UTC+00:00) Dublin, Edinburgh, Lisbon, London',
    hem: 'n'
  },
  {
    name: 'Central Africa Time',
    dupe: true,
    ids: ['Africa/Blantyre', 'Africa/Bujumbura', 'Africa/Juba', 'Africa/Khartoum', 'Africa/Kigali'],
    std: {
      name: 'Central Africa Time',
      abbr: 'CAT',
      offset: 2
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'West Kazakhstan Time',
    abbr: null,
    aliases: [
      'kazakhstan western',
      'west asia standard time',
      'ashgabat',
      'tashkent',
      'west asia',
      'alma ata'
    ],
    ids: ['Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Atyrau', 'Asia/Oral', 'Asia/Qyzylorda'],
    std: {
      abbr: 'ALMT',
      name: 'Alma-Ata Time',
      offset: 5
    },
    dst: {},
    long: '(UTC+05:00) Ashgabat, Tashkent',
    hem: 'n'
  },
  {
    name: 'Eastern Australia Time',
    abbr: 'AET',
    aliases: [
      'australia eastern',
      'aus eastern standard time',
      'canberra',
      'melbourne',
      'sydney',
      'aus eastern',
      'aus east'
    ],
    ids: [
      'Australia/Sydney',
      'Antarctica/Macquarie',
      'Australia/Currie',
      'Australia/Hobart',
      'Australia/Melbourne'
    ],
    std: {
      name: 'Australian Eastern Standard Time',
      abbr: 'AEST',
      offset: 10
    },
    dst: {
      name: 'Australian Eastern Daylight Time',
      abbr: 'AEDT',
      offset: 11
    },
    long: '(UTC+10:00) Canberra, Melbourne, Sydney',
    hem: 's'
  },
  {
    name: 'Western European Time',
    abbr: null,
    aliases: ['europe western'],
    ids: ['Europe/Lisbon', 'Atlantic/Canary', 'Atlantic/Faeroe', 'Atlantic/Madeira'],
    std: {
      abbr: 'WET',
      name: 'Western European Standard Time',
      offset: 0
    },
    dst: {
      abbr: 'WEST',
      name: 'Western European Summer Time',
      offset: 1
    },
    hem: 'n'
  },
  {
    name: 'Indochina Time',
    abbr: null,
    aliases: [
      'indochina',
      'se asia standard time',
      'bangkok',
      'hanoi',
      'jakarta',
      'se asia',
      'south east asia'
    ],
    ids: ['Asia/Bangkok', 'Asia/Phnom_Penh', 'Asia/Saigon', 'Asia/Vientiane'],
    std: {
      abbr: 'ICT',
      name: 'Indochina Time',
      offset: 7
    },
    dst: {},
    long: '(UTC+07:00) Bangkok, Hanoi, Jakarta',
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    abbr: 'MT',
    std: {
      name: 'Mountain Standard Time',
      abbr: 'MST',
      offset: -7
    },
    ids: ['America/Phoenix', 'America/Creston', 'America/Dawson_Creek', 'America/Fort_Nelson'],
    hem: 'n'
  },
  {
    name: 'Central Mexico Time',
    long: '(UTC-06:00) Guadalajara, Mexico City, Monterrey',
    aliases: ['guadalajara', 'mexico city', 'monterrey', 'central mexico', 'central mexican'],
    ids: ['America/Mexico_City', 'America/Merida', 'America/Monterrey', 'America/Bahia_Banderas'],
    std: {
      name: 'Central Standard Time',
      abbr: 'CST',
      offset: -6
    },
    dst: {
      name: 'Central Daylight Time',
      abbr: 'CDT',
      offset: -5
    },
    hem: 'n'
  },
  {
    name: 'West Africa Time',
    dupe: true,
    ids: ['Africa/Luanda', 'Africa/Kinshasa', 'Africa/Brazzaville'],
    std: {
      name: 'West Africa Standard Time',
      abbr: 'WAT',
      offset: 1
    },
    hem: 's'
  },
  {
    name: '',
    dupe: true,
    ids: ['Africa/Cairo', 'Africa/Tripoli', 'Europe/Kaliningrad'],
    std: {
      abbr: 'EET',
      name: 'Eastern European Standard Time',
      offset: 2
    },
    hem: 'n'
  },
  {
    name: 'South Africa Time',
    abbr: null,
    aliases: [
      'africa southern',
      'south africa standard time',
      'harare',
      'pretoria',
      'south africa'
    ],
    ids: ['Africa/Johannesburg', 'Africa/Maseru', 'Africa/Mbabane'],
    std: {
      name: 'South Africa Standard Time',
      abbr: 'SAST',
      offset: 2
    },
    dst: {},
    long: '(UTC+02:00) Harare, Pretoria',
    hem: 's'
  },
  {
    name: 'Krasnoyarsk Time',
    abbr: null,
    aliases: ['krasnoyarsk', 'north asia standard time', 'north asia'],
    ids: ['Asia/Krasnoyarsk', 'Asia/Novokuznetsk', 'Asia/Barnaul'],
    std: {
      abbr: 'KRAT',
      name: 'Krasnoyarsk Standard Time',
      offset: 7
    },
    dst: {},
    long: '(UTC+07:00) Krasnoyarsk',
    hem: 'n'
  },
  {
    name: 'Yakutsk Time',
    abbr: null,
    aliases: ['yakutsk', 'yakutsk standard time'],
    ids: ['Asia/Yakutsk', 'Asia/Chita', 'Asia/Khandyga'],
    std: {
      abbr: 'YAKT',
      name: 'Yakutsk Standard Time',
      offset: 9
    },
    dst: {},
    long: '(UTC+09:00) Yakutsk',
    hem: 'n'
  },
  {
    name: 'Pacific Time',
    abbr: 'PT',
    aliases: ['america pacific', 'pacific standard time', 'pacific'],
    ids: ['America/Los_Angeles', 'America/Tijuana', 'America/Vancouver'],
    std: {
      name: 'Pacific Standard Time',
      abbr: 'PST',
      offset: -8
    },
    dst: {
      name: 'Pacific Daylight Time',
      abbr: 'PDT',
      offset: -7
    },
    long: '(UTC-08:00) Pacific Time (US & Canada)',
    hem: 'n'
  },
  {
    name: 'Amazon Time',
    abbr: null,
    aliases: [
      'amazon',
      'central brazilian standard time',
      'cuiaba',
      'central brazilian',
      'central brazil'
    ],
    ids: ['America/Boa_Vista', 'America/Manaus', 'America/Porto_Velho'],
    std: {
      abbr: 'AMT',
      name: 'Amazon Standard Time',
      offset: -4
    },
    dst: {},
    long: '(UTC-04:00) Cuiaba',
    hem: 'n'
  },
  {
    name: 'Morocco Standard Time',
    offset: 1,
    long: '(UTC+00:00) Casablanca',
    aliases: ['casablanca', 'morocco'],
    ids: ['Africa/Casablanca', 'Africa/El_Aaiun'],
    std: {
      abbr: 'WET',
      name: 'Western European Standard Time',
      offset: 1
    },
    dst: {
      abbr: 'WEST',
      name: 'Western European Summer Time',
      offset: 0
    },
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    ids: ['Africa/Algiers', 'Africa/Tunis'],
    std: {
      abbr: 'CET',
      name: 'Central European Standard Time',
      offset: 1
    },
    dst: {
      abbr: 'CEST',
      name: 'Central European Summer Time',
      offset: 2
    },
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    ids: ['Asia/Gaza', 'Asia/Hebron'],
    std: {
      abbr: 'EET',
      name: 'Eastern European Standard Time',
      offset: 2
    },
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    ids: ['Asia/Damascus', 'Asia/Amman'],
    std: {
      abbr: 'EET',
      name: 'Eastern European Standard Time',
      offset: 2
    },
    hem: 'n'
  },
  {
    name: 'Gulf Time',
    abbr: null,
    aliases: ['gulf', 'arabian standard time', 'abu dhabi', 'muscat', 'arabian'],
    ids: ['Asia/Dubai', 'Asia/Muscat'],
    std: {
      name: 'Gulf Standard Time',
      abbr: 'GST',
      offset: 4
    },
    dst: {},
    long: '(UTC+04:00) Abu Dhabi, Muscat',
    hem: 'n'
  },
  {
    name: 'Samara Time',
    abbr: null,
    aliases: ['samara', 'russia time zone 3', 'izhevsk'],
    ids: ['Europe/Samara', 'Europe/Saratov'],
    std: {
      abbr: 'SAMT',
      name: 'Samara Standard Time',
      offset: 4
    },
    dst: {},
    long: '(UTC+04:00) Izhevsk, Samara',
    hem: 'n'
  },
  {
    name: 'Uzbekistan Time',
    abbr: null,
    aliases: ['uzbekistan'],
    ids: ['Asia/Samarkand', 'Asia/Tashkent'],
    std: {
      abbr: 'UZT',
      name: 'Uzbekistan Standard Time',
      offset: 5
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'East Kazakhstan Time',
    abbr: null,
    aliases: ['kazakhstan eastern', 'central asia standard time', 'astana', 'central asia'],
    ids: ['Asia/Almaty', 'Asia/Qostanay'],
    std: {
      abbr: 'ALMT',
      name: 'East Kazakhstan Time',
      offset: 6
    },
    dst: {},
    long: '(UTC+06:00) Astana',
    hem: 'n'
  },
  {
    name: 'Omsk Time',
    abbr: null,
    aliases: ['omsk', 'omsk standard time'],
    ids: ['Asia/Omsk', 'Asia/Tomsk'],
    std: {
      abbr: 'OMST',
      name: 'Omsk Standard Time',
      offset: 6
    },
    dst: {},
    long: '(UTC+06:00) Omsk',
    hem: 'n'
  },
  {
    name: 'Western Indonesia Time',
    abbr: null,
    aliases: ['indonesia western'],
    ids: ['Asia/Jakarta', 'Asia/Pontianak'],
    std: {
      name: 'Western Indonesia Time',
      abbr: 'WIB',
      offset: 7
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Ulaanbaatar Time',
    abbr: null,
    aliases: ['mongolia', 'ulaanbaatar standard time', 'ulaanbaatar'],
    ids: ['Asia/Ulaanbaatar', 'Asia/Choibalsan'],
    std: {
      abbr: 'ULAT',
      name: 'Ulaanbaatar Standard Time',
      offset: 8
    },
    dst: {},
    long: '(UTC+08:00) Ulaanbaatar',
    hem: 'n'
  },
  {
    name: 'Malaysia Time',
    abbr: null,
    aliases: ['malaysia'],
    ids: ['Asia/Kuala_Lumpur', 'Asia/Kuching'],
    std: {
      name: 'Malaysia Time',
      abbr: 'MYT',
      offset: 8
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Korean Time',
    abbr: null,
    aliases: ['korea', 'korea standard time', 'seoul'],
    ids: ['Asia/Seoul', 'Asia/Pyongyang'],
    std: {
      abbr: 'KST',
      name: 'Korean Standard Time',
      offset: 9
    },
    dst: {},
    long: '(UTC+09:00) Seoul',
    hem: 'n'
  },
  {
    name: 'Central Australia Time',
    abbr: 'ACT',
    aliases: ['australia central', 'cen. australia standard time', 'adelaide', 'central australia'],
    ids: ['Australia/Adelaide', 'Australia/Broken_Hill'],
    std: {
      name: 'Australian Central Standard Time',
      abbr: 'ACST',
      offset: 9.5
    },
    dst: {
      name: 'Australian Central Daylight Time',
      abbr: 'ACDT',
      offset: 10.5
    },
    long: '(UTC+09:30) Adelaide',
    hem: 's'
  },
  {
    name: 'Brisbane Time',
    dupe: true,
    ids: ['Australia/Brisbane', 'Australia/Lindeman'],
    std: {
      name: 'Australian Eastern Standard Time',
      abbr: 'AEST',
      offset: 10
    },
    hem: 's'
  },
  {
    name: 'Vladivostok Time',
    abbr: null,
    aliases: ['vladivostok', 'vladivostok standard time'],
    ids: ['Asia/Vladivostok', 'Asia/Ust-Nera'],
    std: {
      abbr: 'VLAT',
      name: 'Vladivostok Standard Time',
      offset: 10
    },
    dst: {},
    long: '(UTC+10:00) Vladivostok',
    hem: 'n'
  },
  {
    name: 'Chamorro Time',
    abbr: null,
    aliases: [
      'chamorro',
      'west pacific standard time',
      'guam',
      'port moresby',
      'west pacific',
      'western pacific'
    ],
    ids: ['Pacific/Guam', 'Pacific/Saipan'],
    std: {
      name: 'Chamorro Standard Time',
      abbr: 'ChST',
      offset: 10
    },
    dst: {},
    long: '(UTC+10:00) Guam, Port Moresby',
    hem: 'n'
  },
  {
    name: 'Papua New Guinea Time',
    abbr: null,
    aliases: ['papua new guinea', 'guinea', 'guinean'],
    ids: ['Pacific/Bougainville', 'Pacific/Port_Moresby'],
    std: {
      abbr: 'PGT',
      name: 'Papua New Guinea Time',
      offset: 11
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'New Zealand Time',
    abbr: 'NZT',
    aliases: ['new zealand', 'new zealand standard time', 'auckland', 'wellington'],
    ids: ['Pacific/Auckland', 'Antarctica/McMurdo'],
    std: {
      name: 'New Zealand Standard Time',
      abbr: 'NZST',
      offset: 12
    },
    dst: {
      name: 'New Zealand Daylight Time',
      abbr: 'NZDT',
      offset: 13
    },
    long: '(UTC+12:00) Auckland, Wellington',
    hem: 's'
  },
  {
    name: 'Marshall Islands Time',
    abbr: null,
    aliases: ['marshall islands'],
    ids: ['Pacific/Kwajalein', 'Pacific/Majuro'],
    std: {
      abbr: 'MHT',
      name: 'Marshall Islands Time',
      offset: 12
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Samoa Time',
    abbr: 'SST',
    aliases: ['samoa', 'samoa standard time'],
    ids: ['Pacific/Midway', 'Pacific/Pago_Pago'],
    std: {
      abbr: 'SST',
      name: 'Samoa Standard Time',
      offset: -11
    },
    dst: {},
    long: '(UTC+13:00) Samoa',
    hem: 'n'
  },
  {
    name: 'Hawaii-Aleutian Time',
    abbr: 'HAT',
    aliases: ['hawaii aleutian', 'aleutian standard time', 'aleutian'],
    ids: ['Pacific/Honolulu', 'Pacific/Johnston'],
    std: {
      name: 'Hawaii-Aleutian Standard Time',
      abbr: 'HAST',
      offset: -9
    },
    dst: {
      name: 'Hawaii-Aleutian Daylight Time',
      abbr: 'HADT',
      offset: -8
    },
    long: '(UTC-09:00) Aleutian Islands',
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    std: {
      name: 'Mountain Standard Time',
      abbr: 'MST',
      offset: -7
    },
    ids: ['America/Dawson', 'America/Whitehorse'],
    hem: 'n'
  },
  {
    name: 'Mexican Pacific Time',
    abbr: 'HPMX',
    aliases: [
      'mexico pacific',
      'mountain standard time (mexico)',
      'chihuahua',
      'la paz',
      'mazatlan',
      'mountain mexico'
    ],
    ids: ['America/Chihuahua', 'America/Mazatlan'],
    std: {
      name: 'Mexican Pacific Standard Time',
      abbr: 'HNPMX',
      offset: -7
    },
    dst: {
      name: 'Mexican Pacific Daylight Time',
      abbr: 'HEPMX',
      offset: -6
    },
    long: '(UTC-07:00) Chihuahua, La Paz, Mazatlan',
    hem: 'n'
  },
  {
    name: 'Colombia Time',
    abbr: 'COT',
    aliases: ['colombia', 'cost'],
    ids: ['America/Bogota', 'Pacific/Galapagos'],
    std: {
      name: 'Colombia Standard Time',
      abbr: 'COT',
      offset: -5
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Acre Time',
    abbr: null,
    aliases: ['acre'],
    ids: ['America/Eirunepe', 'America/Rio_Branco'],
    std: {
      abbr: 'ACT',
      name: 'Acre Standard Time',
      offset: -5
    },
    dst: {},
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    ids: ['America/Campo_Grande', 'America/Cuiaba'],
    std: {
      abbr: 'AMT',
      name: 'Amazon Standard Time',
      offset: -4
    },
    hem: 's'
  },
  {
    name: '',
    dupe: true,
    ids: ['Antarctica/Palmer', 'America/Punta_Arenas'],
    std: {
      name: 'Chile Standard Time',
      abbr: 'CLT',
      offset: -3
    },
    hem: 's'
  },
  {
    name: 'Troll Time',
    dupe: true,
    abbr: null,
    aliases: ['troll research station'],
    ids: ['Antarctica/Troll'],
    std: {
      name: 'Greenwich Mean Time',
      abbr: 'GMT',
      offset: 0
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'East Greenland Time',
    abbr: 'HEG',
    aliases: ['greenland eastern'],
    ids: ['America/Scoresbysund'],
    std: {
      name: 'East Greenland Standard Time',
      abbr: 'HNEG',
      offset: 0
    },
    dst: {
      name: 'East Greenland Summer Time',
      abbr: 'HEEG',
      offset: 1
    },
    hem: 'n'
  },
  {
    name: 'Israel Time',
    abbr: null,
    aliases: ['israel', 'israel standard time', 'jerusalem'],
    ids: ['Asia/Jerusalem'],
    std: {
      abbr: 'IST',
      name: 'Israel Standard Time',
      offset: 2
    },
    dst: {
      name: 'Israel Daylight Time',
      offset: 3
    },
    long: '(UTC+02:00) Jerusalem',
    hem: 'n'
  },
  {
    name: 'East Africa Time',
    dupe: true,
    ids: ['Indian/Antananarivo'],
    std: {
      name: 'East Africa Time',
      abbr: 'EAT',
      offset: 3
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Syowa Time',
    abbr: null,
    aliases: ['syowa'],
    ids: ['Antarctica/Syowa'],
    std: {
      abbr: 'SYOT',
      name: 'Syowa Time',
      offset: 3
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Turkey Time',
    abbr: 'TRT',
    aliases: ['turkey', 'turkey standard time', 'istanbul'],
    ids: ['Europe/Istanbul'],
    std: {
      name: 'Turkey Time',
      abbr: 'TRT',
      offset: 3
    },
    dst: {},
    long: '(UTC+03:00) Istanbul',
    hem: 'n'
  },
  {
    name: 'Iran Time',
    abbr: null,
    aliases: ['iran', 'iran standard time', 'tehran'],
    ids: ['Asia/Tehran'],
    std: {
      abbr: 'IRST',
      name: 'Iran Standard Time',
      offset: 3.5
    },
    dst: {
      abbr: 'IRDT',
      name: 'Iran Daylight Time',
      offset: 4.5
    },
    long: '(UTC+03:30) Tehran',
    hem: 'n'
  },
  {
    name: 'Azerbaijan Time',
    abbr: null,
    aliases: ['azerbaijan', 'azerbaijan standard time', 'baku'],
    ids: ['Asia/Baku'],
    std: {
      abbr: 'AZT',
      name: 'Azerbaijan Standard Time',
      offset: 4
    },
    dst: {},
    long: '(UTC+04:00) Baku',
    hem: 'n'
  },
  {
    name: 'Georgia Time',
    abbr: 'GET',
    aliases: ['georgia', 'georgian standard time', 'tbilisi', 'georgian'],
    ids: ['Asia/Tbilisi'],
    std: {
      abbr: 'GET',
      name: 'Georgia Standard Time',
      offset: 4
    },
    dst: {},
    long: '(UTC+04:00) Tbilisi',
    hem: 'n'
  },
  {
    name: 'Armenia Time',
    abbr: 'AMT',
    aliases: ['armenia', 'caucasus standard time', 'yerevan', 'caucasus'],
    ids: ['Asia/Yerevan'],
    std: {
      abbr: 'AMT',
      name: 'Armenia Standard Time',
      offset: 4
    },
    dst: {},
    long: '(UTC+04:00) Yerevan',
    hem: 'n'
  },
  {
    name: 'Seychelles Time',
    abbr: null,
    aliases: ['seychelles'],
    ids: ['Indian/Mahe'],
    std: {
      abbr: 'SCT',
      name: 'Seychelles Time',
      offset: 4
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Mauritius Time',
    abbr: null,
    aliases: ['mauritius', 'mauritius standard time', 'port louis'],
    ids: ['Indian/Mauritius'],
    std: {
      abbr: 'MUT',
      name: 'Mauritius Standard Time',
      offset: 4
    },
    dst: {},
    long: '(UTC+04:00) Port Louis',
    hem: 'n'
  },
  {
    name: 'Réunion Time',
    abbr: null,
    aliases: ['reunion'],
    ids: ['Indian/Reunion'],
    std: {
      abbr: 'RET',
      name: 'Réunion Time',
      offset: 4
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Afghanistan Time',
    abbr: null,
    aliases: ['afghanistan', 'afghanistan standard time', 'kabul'],
    ids: ['Asia/Kabul'],
    std: {
      abbr: 'AFT',
      name: 'Afghanistan Time',
      offset: 4.5
    },
    dst: {},
    long: '(UTC+04:30) Kabul',
    hem: 'n'
  },
  {
    name: 'Mawson Time',
    abbr: null,
    aliases: ['mawson'],
    ids: ['Antarctica/Mawson'],
    std: {
      abbr: 'MAWT',
      name: 'Mawson Time',
      offset: 5
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Turkmenistan Time',
    abbr: 'TMT',
    aliases: ['turkmenistan', 'tmst'],
    ids: ['Asia/Ashgabat'],
    std: {
      name: 'Turkmenistan Standard Time',
      abbr: 'TMT',
      offset: 5
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Tajikistan Time',
    abbr: null,
    aliases: ['tajikistan'],
    ids: ['Asia/Dushanbe'],
    std: {
      abbr: 'TJT',
      name: 'Tajikistan Time',
      offset: 5
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Pakistan Time',
    abbr: null,
    aliases: ['pakistan', 'pakistan standard time', 'islamabad', 'karachi'],
    ids: ['Asia/Karachi'],
    std: {
      abbr: 'PKT',
      name: 'Pakistan Standard Time',
      offset: 5
    },
    dst: {},
    long: '(UTC+05:00) Islamabad, Karachi',
    hem: 'n'
  },
  {
    name: 'Yekaterinburg Time',
    abbr: 'YEKT',
    aliases: ['yekaterinburg', 'ekaterinburg standard time', 'ekaterinburg'],
    ids: ['Asia/Yekaterinburg'],
    std: {
      abbr: 'YEKT',
      name: 'Yekaterinburg Standard Time',
      offset: 5
    },
    dst: {},
    long: '(UTC+05:00) Ekaterinburg',
    hem: 'n'
  },
  {
    name: 'French Southern & Antarctic Time',
    abbr: null,
    aliases: ['french southern'],
    ids: ['Indian/Kerguelen'],
    std: {
      abbr: 'TFT',
      name: 'French Southern & Antarctic Time',
      offset: 5
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Maldives Time',
    abbr: null,
    aliases: ['maldives'],
    ids: ['Indian/Maldives'],
    std: {
      abbr: 'MVT',
      name: 'Maldives Time',
      offset: 5
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Nepal Time',
    abbr: null,
    aliases: ['nepal', 'nepal standard time', 'kathmandu'],
    ids: ['Asia/Katmandu'],
    std: {
      abbr: 'NPT',
      name: 'Nepal Time',
      offset: 5.75
    },
    dst: {},
    long: '(UTC+05:45) Kathmandu',
    hem: 'n'
  },
  {
    name: 'Vostok Time',
    abbr: null,
    aliases: ['vostok'],
    ids: ['Antarctica/Vostok'],
    std: {
      abbr: 'MSK+4',
      name: 'Vostok Time',
      offset: 6
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Kyrgyzstan Time',
    abbr: null,
    aliases: ['kyrgystan'],
    ids: ['Asia/Bishkek'],
    std: {
      abbr: 'KGT',
      name: 'Kyrgyzstan Time',
      offset: 6
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Bangladesh Time',
    abbr: 'BST',
    aliases: ['bangladesh', 'bangladesh standard time', 'dhaka'],
    ids: ['Asia/Dhaka'],
    std: {
      abbr: 'BST',
      name: 'Bangladesh Standard Time',
      offset: 6
    },
    dst: {},
    long: '(UTC+06:00) Dhaka',
    hem: 'n'
  },
  {
    name: 'Bhutan Time',
    abbr: null,
    aliases: ['bhutan'],
    ids: ['Asia/Thimphu'],
    std: {
      name: 'Bhutan Time',
      abbr: 'BT',
      offset: 6
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Indian Ocean Time',
    abbr: null,
    aliases: ['indian ocean', 'indian chagos'],
    ids: ['Indian/Chagos'],
    std: {
      abbr: 'IOT',
      name: 'Indian Ocean Time',
      offset: 6
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Myanmar Time',
    abbr: null,
    aliases: ['myanmar', 'myanmar standard time'],
    ids: ['Asia/Rangoon'],
    std: {
      abbr: 'MMT',
      name: 'Myanmar Time',
      offset: 6.5
    },
    dst: {},
    long: '(UTC+06:30) Yangon (Rangoon)',
    hem: 'n'
  },
  {
    name: 'Cocos Islands Time',
    abbr: null,
    aliases: ['cocos'],
    ids: ['Indian/Cocos'],
    std: {
      abbr: 'CCT',
      name: 'Cocos Islands Time',
      offset: 6.5
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Davis Time',
    abbr: null,
    aliases: ['davis'],
    ids: ['Antarctica/Davis'],
    std: {
      abbr: 'DAVT',
      name: 'Davis Time',
      offset: 7
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Hovd Time',
    abbr: null,
    aliases: ['hovd', 'w. mongolia standard time', 'west mongolia', 'western mongolia'],
    ids: ['Asia/Hovd'],
    std: {
      abbr: 'HOVT',
      name: 'Hovd Standard Time',
      offset: 7
    },
    dst: {},
    long: '(UTC+07:00) Hovd',
    hem: 'n'
  },
  {
    name: 'Novosibirsk Time',
    abbr: null,
    aliases: ['novosibirsk', 'n. central asia standard time', 'north central asia'],
    ids: ['Asia/Novosibirsk'],
    std: {
      abbr: 'NOVT',
      name: 'Novosibirsk Standard Time',
      offset: 7
    },
    dst: {},
    long: '(UTC+07:00) Novosibirsk',
    hem: 'n'
  },
  {
    name: 'Christmas Island Time',
    abbr: null,
    aliases: ['christmas'],
    ids: ['Indian/Christmas'],
    std: {
      abbr: 'CXT',
      name: 'Christmas Island Time',
      offset: 7
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Brunei Darussalam Time',
    abbr: null,
    aliases: ['brunei'],
    ids: ['Asia/Brunei'],
    std: {
      abbr: 'BNT',
      name: 'Brunei Darussalam Time',
      offset: 8
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Hong Kong Time',
    abbr: 'HKT',
    aliases: ['hong kong', 'hkst'],
    ids: ['Asia/Hong_Kong'],
    std: {
      name: 'Hong Kong Standard Time',
      abbr: 'HKT',
      offset: 8
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Irkutsk Time',
    abbr: null,
    aliases: ['irkutsk', 'north asia east standard time', 'north asia east'],
    ids: ['Asia/Irkutsk'],
    std: {
      abbr: 'IRKT',
      name: 'Irkutsk Standard Time',
      offset: 8
    },
    dst: {},
    long: '(UTC+08:00) Irkutsk',
    hem: 'n'
  },
  {
    name: 'Central Indonesia Time',
    abbr: null,
    aliases: ['indonesia central'],
    ids: ['Asia/Makassar'],
    std: {
      name: 'Central Indonesia Time',
      abbr: 'WITA',
      offset: 8
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Philippine Time',
    abbr: null,
    aliases: ['philippines'],
    ids: ['Asia/Manila'],
    std: {
      abbr: 'PHST',
      name: 'Philippine Standard Time',
      offset: 8
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Singapore Time',
    abbr: null,
    aliases: ['singapore', 'singapore standard time', 'kuala lumpur'],
    ids: ['Asia/Singapore'],
    std: {
      name: 'Singapore Standard Time',
      abbr: 'SGT',
      offset: 8
    },
    dst: {},
    long: '(UTC+08:00) Kuala Lumpur, Singapore',
    hem: 's'
  },
  {
    name: 'Taipei Time',
    abbr: null,
    aliases: ['taipei', 'taipei standard time'],
    ids: ['Asia/Taipei'],
    std: {
      abbr: 'CST',
      name: 'Taipei Standard Time',
      offset: 8
    },
    dst: {},
    long: '(UTC+08:00) Taipei',
    hem: 'n'
  },
  {
    name: 'Western Australia Time',
    abbr: 'AWT',
    aliases: [
      'australia western',
      'awdt',
      'w. australia standard time',
      'perth',
      'western australia',
      'west australia'
    ],
    ids: ['Australia/Perth'],
    std: {
      name: 'Australian Western Standard Time',
      abbr: 'AWST',
      offset: 8
    },
    dst: {},
    long: '(UTC+08:00) Perth',
    hem: 's'
  },
  {
    name: 'Australian Central Western Time',
    abbr: 'ACWT',
    aliases: [
      'australia centralwestern',
      'acwdt',
      'aus central w. standard time',
      'eucla',
      'aus central west'
    ],
    ids: ['Australia/Eucla'],
    std: {
      name: 'Australian Central Western Standard Time',
      abbr: 'ACWST',
      offset: 8.75
    },
    dst: {},
    long: '(UTC+08:45) Eucla',
    hem: 's'
  },
  {
    name: 'East Timor Time',
    abbr: 'TLT',
    aliases: ['east timor'],
    ids: ['Asia/Dili'],
    std: {
      abbr: 'TLT',
      name: 'East Timor Time',
      offset: 9
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Eastern Indonesia Time',
    abbr: null,
    aliases: ['indonesia eastern'],
    ids: ['Asia/Jayapura'],
    std: {
      name: 'Eastern Indonesia Time',
      abbr: 'WIT',
      offset: 9
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Japan Time',
    abbr: null,
    aliases: ['japan', 'jdt', 'tokyo standard time', 'osaka', 'sapporo', 'tokyo'],
    ids: ['Asia/Tokyo'],
    std: {
      name: 'Japan Standard Time',
      abbr: 'JST',
      offset: 9
    },
    dst: {},
    long: '(UTC+09:00) Osaka, Sapporo, Tokyo',
    hem: 'n'
  },
  {
    name: 'Palau Time',
    abbr: null,
    aliases: ['palau'],
    ids: ['Pacific/Palau'],
    std: {
      abbr: 'PWT',
      name: 'Palau Time',
      offset: 9
    },
    dst: {},
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    ids: ['Australia/Darwin'],
    std: {
      name: 'Australian Central Standard Time',
      abbr: 'ACST',
      offset: 9.5
    },
    hem: 's'
  },
  {
    name: 'Dumont-d’Urville Time',
    abbr: null,
    aliases: ['dumontdurville'],
    ids: ['Antarctica/DumontDUrville'],
    std: {
      abbr: 'CLST',
      name: 'Dumont-d’Urville Time',
      offset: 10
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Chuuk Time',
    abbr: null,
    aliases: ['truk'],
    ids: ['Pacific/Truk'],
    std: {
      abbr: 'CHUT',
      name: 'Chuuk Time',
      offset: 10
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Lord Howe Time',
    abbr: 'LHT',
    aliases: ['lord howe', 'lord howe standard time'],
    ids: ['Australia/Lord_Howe'],
    std: {
      name: 'Lord Howe Standard Time',
      abbr: 'LHST',
      offset: 10.5
    },
    dst: {
      name: 'Lord Howe Daylight Time',
      abbr: 'LHDT',
      offset: 11.5
    },
    long: '(UTC+10:30) Lord Howe Island',
    hem: 's'
  },
  {
    name: 'Casey Time',
    abbr: 'CAST',
    aliases: ['casey'],
    ids: ['Antarctica/Casey'],
    std: {
      abbr: 'CAST',
      name: 'Casey Time',
      offset: 11
    },
    dst: {
      name: 'Casey Summer Time',
      offset: 8
    },
    hem: 's'
  },
  {
    name: 'Magadan Time',
    abbr: null,
    aliases: ['magadan', 'magadan standard time'],
    ids: ['Asia/Magadan'],
    std: {
      abbr: 'MAGT',
      name: 'Magadan Standard Time',
      offset: 11
    },
    dst: {},
    long: '(UTC+11:00) Magadan',
    hem: 'n'
  },
  {
    name: 'Sakhalin Time',
    abbr: null,
    aliases: ['sakhalin', 'sakhalin standard time'],
    ids: ['Asia/Sakhalin'],
    std: {
      abbr: 'SAKT',
      name: 'Sakhalin Standard Time',
      offset: 11
    },
    dst: {},
    long: '(UTC+11:00) Sakhalin',
    hem: 'n'
  },
  {
    name: 'Srednekolymsk Time',
    abbr: 'SRET',
    aliases: ['srednekolymsk', 'russia time zone 10', 'chokurdakh'],
    ids: ['Asia/Srednekolymsk'],
    std: {
      abbr: 'SRET',
      name: 'Srednekolymsk Standard Time',
      offset: 11
    },
    dst: {},
    long: '(UTC+11:00) Chokurdakh',
    hem: 'n'
  },
  {
    name: 'Vanuatu Time',
    abbr: null,
    aliases: ['vanuatu'],
    ids: ['Pacific/Efate'],
    std: {
      abbr: 'VUT',
      name: 'Vanuatu Standard Time',
      offset: 11
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Solomon Islands Time',
    abbr: null,
    aliases: ['solomon'],
    ids: ['Pacific/Guadalcanal'],
    std: {
      abbr: 'SBT',
      name: 'Solomon Islands Time',
      offset: 11
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Kosrae Time',
    abbr: null,
    aliases: ['kosrae'],
    ids: ['Pacific/Kosrae'],
    std: {
      abbr: 'KOST',
      name: 'Kosrae Time',
      offset: 11
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'New Caledonia Time',
    abbr: null,
    aliases: ['new caledonia'],
    ids: ['Pacific/Noumea'],
    std: {
      abbr: 'NCT',
      name: 'New Caledonia Standard Time',
      offset: 11
    },
    dst: {
      name: 'New Caledonia Summer Time'
    },
    hem: 'n'
  },
  {
    name: 'Ponape Time',
    abbr: null,
    aliases: ['ponape'],
    ids: ['Pacific/Ponape'],
    std: {
      abbr: 'PONT',
      name: 'Ponape Time',
      offset: 11
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Anadyr Time',
    abbr: null,
    aliases: ['anadyr', 'russia time zone 11', 'petropavlovsk kamchatsky'],
    ids: ['Asia/Anadyr'],
    std: {
      abbr: 'ANAT',
      name: 'Anadyr Standard Time',
      offset: 12
    },
    dst: {},
    long: '(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky',
    hem: 'n'
  },
  {
    name: 'Petropavlovsk-Kamchatski Time',
    abbr: null,
    aliases: ['kamchatka', 'russia time zone 11', 'anadyr', 'petropavlovsk kamchatsky'],
    ids: ['Asia/Kamchatka'],
    std: {
      abbr: 'PETT',
      name: 'Petropavlovsk-Kamchatski Standard Time',
      offset: 12
    },
    dst: {},
    long: '(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky',
    hem: 'n'
  },
  {
    name: 'Fiji Time',
    abbr: 'FJT',
    aliases: ['fiji', 'fiji standard time'],
    ids: ['Pacific/Fiji'],
    std: {
      abbr: 'FJT',
      name: 'Fiji Standard Time',
      offset: 12
    },
    dst: {
      abbr: 'FJT',
      name: 'Fiji Summer Time',
      offset: 13
    },
    long: '(UTC+12:00) Fiji',
    hem: 's'
  },
  {
    name: 'Tuvalu Time',
    abbr: 'TVT',
    aliases: ['tuvalu'],
    ids: ['Pacific/Funafuti'],
    std: {
      abbr: 'TVT',
      name: 'Tuvalu Time',
      offset: 12
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Nauru Time',
    abbr: null,
    aliases: ['nauru'],
    ids: ['Pacific/Nauru'],
    std: {
      abbr: 'NRT',
      name: 'Nauru Time',
      offset: 12
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Norfolk Island Time',
    abbr: null,
    aliases: ['norfolk', 'norfolk standard time', 'norfolk island'],
    ids: ['Pacific/Norfolk'],
    std: {
      abbr: 'NFT',
      name: 'Norfolk Island Standard Time',
      offset: 12
    },
    dst: {
      abbr: 'NFDT',
      name: 'Norfolk Island Daylight Time',
      offset: 11
    },
    long: '(UTC+11:00) Norfolk Island',
    hem: 'n'
  },
  {
    name: 'Gilbert Islands Time',
    abbr: null,
    aliases: ['gilbert islands'],
    ids: ['Pacific/Tarawa'],
    std: {
      abbr: 'GILT',
      name: 'Gilbert Islands Time',
      offset: 12
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Wake Island Time',
    abbr: null,
    aliases: ['wake'],
    ids: ['Pacific/Wake'],
    std: {
      abbr: 'WAKT',
      name: 'Wake Island Time',
      offset: 12
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Wallis & Futuna Time',
    abbr: null,
    aliases: ['wallis'],
    ids: ['Pacific/Wallis'],
    std: {
      abbr: 'WFT',
      name: 'Wallis & Futuna Time',
      offset: 12
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Chatham Time',
    abbr: 'CHAT',
    aliases: ['chatham', 'chatham islands standard time', 'chatham islands'],
    ids: ['Pacific/Chatham'],
    std: {
      name: 'Chatham Standard Time',
      abbr: 'CHAST',
      offset: 12.75
    },
    dst: {
      name: 'Chatham Daylight Time',
      abbr: 'CHADT',
      offset: 13.75
    },
    long: '(UTC+12:45) Chatham Islands',
    hem: 's'
  },
  {
    name: 'West Samoa Time',
    abbr: 'WST',
    aliases: ['apia'],
    ids: ['Pacific/Apia'],
    std: {
      abbr: 'WST',
      name: 'West Samoa Time',
      offset: 13
    },
    dst: {
      abbr: 'WST',
      name: 'West Samoa Summer Time',
      offset: 14
    },
    hem: 's'
  },
  {
    name: 'Phoenix Islands Time',
    abbr: null,
    aliases: ['phoenix islands'],
    ids: ['Pacific/Enderbury'],
    std: {
      abbr: 'PHOT',
      name: 'Phoenix Islands Time',
      offset: 13
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Tokelau Time',
    abbr: null,
    aliases: ['tokelau'],
    ids: ['Pacific/Fakaofo'],
    std: {
      abbr: 'TKT',
      name: 'Tokelau Time',
      offset: 13
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Tonga Time',
    abbr: null,
    aliases: ['tonga', 'tonga standard time', "nuku'alofa"],
    ids: ['Pacific/Tongatapu'],
    std: {
      abbr: 'TOT',
      name: 'Tonga Standard Time',
      offset: 13
    },
    dst: {
      name: 'Tonga Summer Time',
      offset: 14
    },
    long: "(UTC+13:00) Nuku'alofa",
    hem: 's'
  },
  {
    name: 'Line Islands Time',
    abbr: null,
    aliases: ['line islands', 'line islands standard time', 'kiritimati island'],
    ids: ['Pacific/Kiritimati'],
    std: {
      abbr: 'LINT',
      name: 'Line Islands Time',
      offset: 14
    },
    dst: {},
    long: '(UTC+14:00) Kiritimati Island',
    hem: 'n'
  },
  {
    name: 'Niue Time',
    abbr: null,
    aliases: ['niue'],
    ids: ['Pacific/Niue'],
    std: {
      abbr: 'NUT',
      name: 'Niue Time',
      offset: -11
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Cook Islands Time',
    abbr: 'CKT',
    aliases: ['cook'],
    ids: ['Pacific/Rarotonga'],
    std: {
      abbr: 'CKT',
      name: 'Cook Islands Standard Time',
      offset: -10
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Tahiti Time',
    abbr: null,
    aliases: ['tahiti'],
    ids: ['Pacific/Tahiti'],
    std: {
      abbr: 'TAHT',
      name: 'Tahiti Time',
      offset: -10
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Marquesas Time',
    abbr: null,
    aliases: ['marquesas', 'marquesas standard time'],
    ids: ['Pacific/Marquesas'],
    std: {
      abbr: 'MART',
      name: 'Marquesas Time',
      offset: -9.5
    },
    dst: {},
    long: '(UTC-09:30) Marquesas Islands',
    hem: 'n'
  },
  {
    name: 'Aleutian Standard Time',
    iso: '(UTC-10:00) Aleutian Islands',
    aliases: ['aleutian'],
    ids: ['America/Adak'],
    abbr: 'HST',
    std: {
      name: 'Hawaii Standard Time',
      abbr: 'HST',
      offset: -10
    },
    dst: {
      name: 'Hawaii Daylight Time',
      abbr: 'HDT',
      offset: -9
    },
    hem: 'n'
  },
  {
    name: 'Gambier Time',
    abbr: null,
    aliases: ['gambier', 'utc-09', 'coordinated universal time-09'],
    ids: ['Pacific/Gambier'],
    std: {
      abbr: 'GAMT',
      name: 'Gambier Time',
      offset: -9
    },
    dst: {},
    long: '(UTC-09:00) Coordinated Universal Time-09',
    hem: 'n'
  },
  {
    name: 'Pitcairn Time',
    abbr: null,
    aliases: ['pitcairn', 'utc-08', 'coordinated universal time-08'],
    ids: ['Pacific/Pitcairn'],
    std: {
      abbr: 'PST',
      name: 'Pitcairn Time',
      offset: -8
    },
    dst: {},
    long: '(UTC-08:00) Coordinated Universal Time-08',
    hem: 'n'
  },
  {
    name: '',
    dupe: true,
    ids: ['America/Hermosillo'],
    std: {
      name: 'Mexican Pacific Standard Time',
      abbr: 'HNPMX',
      offset: -7
    },
    hem: 'n'
  },
  {
    name: 'Northwest Mexico Time',
    abbr: 'HNOMX',
    aliases: [
      'mexico northwest',
      'pacific standard time (mexico)',
      'baja california',
      'pacific mexico'
    ],
    ids: ['America/Santa_Isabel'],
    std: {
      name: 'Northwest Mexico Standard Time',
      abbr: 'HNNOMX',
      offset: -6
    },
    dst: {
      name: 'Northwest Mexico Daylight Time',
      abbr: 'HENOMX',
      offset: -5
    },
    long: '(UTC-08:00) Baja California',
    hem: 'n'
  },
  {
    name: 'Easter Island Time',
    abbr: null,
    aliases: ['easter', 'easter island standard time', 'easter island'],
    ids: ['Pacific/Easter'],
    std: {
      name: 'Easter Island Standard Time',
      abbr: 'EAST',
      offset: -6
    },
    dst: {
      name: 'Easter Island Summer Time',
      abbr: 'EASST',
      offset: -5
    },
    long: '(UTC-06:00) Easter Island',
    hem: 's'
  },
  {
    name: 'Ecuador Time',
    abbr: null,
    aliases: ['ecuador'],
    ids: ['America/Guayaquil'],
    std: {
      name: 'Ecuador Time',
      abbr: 'ECT',
      offset: -5
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Cuba Time',
    abbr: 'HCU',
    aliases: ['cuba', 'cuba standard time', 'havana'],
    ids: ['America/Havana'],
    std: {
      name: 'Cuba Standard Time',
      abbr: 'HNCU',
      offset: -5
    },
    dst: {
      name: 'Cuba Daylight Time',
      abbr: 'HECU',
      offset: -4
    },
    long: '(UTC-05:00) Havana',
    hem: 'n'
  },
  {
    name: 'Peru Time',
    abbr: null,
    aliases: ['peru'],
    ids: ['America/Lima'],
    std: {
      abbr: 'PET',
      name: 'Peru Standard Time',
      offset: -5
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Paraguay Time',
    abbr: null,
    aliases: ['paraguay', 'paraguay standard time', 'asuncion'],
    ids: ['America/Asuncion'],
    std: {
      abbr: 'PYT',
      name: 'Paraguay Standard Time',
      offset: -4
    },
    dst: {
      name: 'Paraguay Summer Time',
      offset: -3
    },
    long: '(UTC-04:00) Asuncion',
    hem: 's'
  },
  {
    name: 'Venezuela Time',
    abbr: null,
    aliases: ['venezuela', 'venezuelan', 'venezuela standard time', 'caracas'],
    ids: ['America/Caracas'],
    std: {
      name: 'Venezuela Time',
      abbr: 'VET',
      offset: -4
    },
    dst: {},
    long: '(UTC-04:00) Caracas',
    hem: 'n'
  },
  {
    name: 'Guyana Time',
    abbr: null,
    aliases: ['guyana'],
    ids: ['America/Guyana'],
    std: {
      name: 'Guyana Time',
      abbr: 'GYT',
      offset: -4
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Bolivia Time',
    abbr: null,
    aliases: ['bolivia'],
    ids: ['America/La_Paz'],
    std: {
      name: 'Bolivia Time',
      abbr: 'BOT',
      offset: -4
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Newfoundland Time',
    abbr: 'HTN',
    aliases: ['newfoundland', 'newfoundland standard time'],
    ids: ['America/St_Johns'],
    std: {
      name: 'Newfoundland Standard Time',
      abbr: 'HNTN',
      offset: -3.5
    },
    dst: {
      name: 'Newfoundland Daylight Time',
      abbr: 'HETN',
      offset: -2.5
    },
    long: '(UTC-03:30) Newfoundland',
    hem: 'n'
  },
  {
    name: 'French Guiana Time',
    abbr: null,
    aliases: ['french guiana'],
    ids: ['America/Cayenne'],
    std: {
      name: 'French Guiana Time',
      abbr: 'GFT',
      offset: -3
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'West Greenland Time',
    abbr: 'HOG',
    aliases: ['greenland western', 'greenland standard time', 'greenland'],
    ids: ['America/Godthab'],
    std: {
      name: 'West Greenland Standard Time',
      abbr: 'HNOG',
      offset: -3
    },
    dst: {
      name: 'West Greenland Summer Time',
      abbr: 'HEOG',
      offset: -2
    },
    long: '(UTC-03:00) Greenland',
    hem: 'n'
  },
  {
    name: 'St. Pierre & Miquelon Time',
    abbr: 'HPM',
    aliases: [
      'pierre miquelon',
      'saint pierre standard time',
      'saint pierre and miquelon',
      'saint pierre'
    ],
    ids: ['America/Miquelon'],
    std: {
      name: 'St. Pierre & Miquelon Standard Time',
      abbr: 'HNPM',
      offset: -3
    },
    dst: {
      name: 'St. Pierre & Miquelon Daylight Time',
      abbr: 'HEPM',
      offset: -2
    },
    long: '(UTC-03:00) Saint Pierre and Miquelon',
    hem: 'n'
  },
  {
    name: 'Uruguay Time',
    abbr: 'UYT',
    aliases: ['uruguay', 'uyst', 'montevideo standard time', 'montevideo'],
    ids: ['America/Montevideo'],
    std: {
      name: 'Uruguay Standard Time',
      abbr: 'UYT',
      offset: -3
    },
    dst: {},
    long: '(UTC-03:00) Montevideo',
    hem: 's'
  },
  {
    name: 'Suriname Time',
    abbr: null,
    aliases: ['suriname'],
    ids: ['America/Paramaribo'],
    std: {
      name: 'Suriname Time',
      abbr: 'SRT',
      offset: -3
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Chile Time',
    abbr: 'CLT',
    aliases: ['chile'],
    ids: ['America/Santiago'],
    std: {
      name: 'Chile Standard Time',
      abbr: 'CLT',
      offset: -3
    },
    dst: {
      name: 'Chile Summer Time',
      abbr: 'CLST',
      offset: -4
    },
    hem: 's'
  },
  {
    name: 'Falkland Islands Time',
    abbr: 'FKT',
    aliases: ['falkland'],
    ids: ['Atlantic/Stanley'],
    std: {
      abbr: 'FKST',
      name: 'Falkland Islands Summer Time',
      offset: -3
    },
    dst: {},
    hem: 's'
  },
  {
    name: 'Fernando de Noronha Time',
    abbr: null,
    aliases: ['noronha'],
    ids: ['America/Noronha'],
    std: {
      abbr: 'FNT',
      name: 'Fernando de Noronha Standard Time',
      offset: -2
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'South Georgia Time',
    abbr: null,
    aliases: ['south georgia'],
    ids: ['Atlantic/South_Georgia'],
    std: {
      abbr: 'GST',
      name: 'South Georgia Time',
      offset: -2
    },
    dst: {},
    hem: 'n'
  },
  {
    name: 'Azores Time',
    abbr: 'AZOT',
    aliases: ['azores', 'azores standard time'],
    ids: ['Atlantic/Azores'],
    std: {
      abbr: 'AZOT',
      name: 'Azores Standard Time',
      offset: -1
    },
    dst: {
      name: 'Azores Summer Time',
      abbr: 'AZOST',
      offset: 0
    },
    long: '(UTC-01:00) Azores',
    hem: 'n'
  },
  {
    name: 'Cape Verde Time',
    abbr: null,
    aliases: ['cape verde', 'cape verde standard time', 'cabo verde'],
    ids: ['Atlantic/Cape_Verde'],
    std: {
      abbr: 'CVT',
      name: 'Cape Verde Standard Time',
      offset: -1
    },
    dst: {},
    long: '(UTC-01:00) Cabo Verde Is.',
    hem: 'n'
  }
]
