// this is a very rough list of informal and abbreviated timezones
// i am not an expert, or even half-knowledgeable in this subject.
// please help.
// partially from: https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations

const abbrs = {

  //australia
  acdt: 'Australia/Adelaide', //Australian Central Daylight Savings Time
  acst: 'Australia/Adelaide', //Australian Central Standard Time
  acwst: 8.75, //Australian Central Western Standard Time (unofficial)
  aedt: 'Antarctica/Macquarie', //Australian Eastern Daylight Savings Time
  aest: 'Australia/Broken_Hill', //Australian Eastern Standard Time
  awdt: 'Australia/Perth',
  awst: 'Australia/Perth', //Australian Western Standard Time
  nzdt: 'Pacific/Auckland',
  nzmt: 'Pacific/Auckland',
  nzst: 'Pacific/Auckland',
  'australian central': 'Australia/Adelaide',
  'australian western': 'Australia/Perth',
  'australian eastern': 'Australia/Macquarie',
  cwst: 8.75, //Central Western Standard Time (Australia) unofficial
  'australian central western': 8.75,

  //alaska
  ahdt: 'America/Anchorage',
  ahst: 'America/Anchorage',
  akdt: 'America/Anchorage',
  akst: 'America/Anchorage',
  'alaska': 'America/Anchorage',

  //north america
  ast: 'America/Halifax', //Atlantic Standard Time
  awt: 'America/Blanc-Sablon',
  addt: 'America/Pangnirtung',
  adt: 'America/Halifax',
  apt: 'America/Blanc-Sablon',
  bost: 'America/La_Paz',
  cddt: 'America/Rankin_Inlet',
  cdt: 'America/Winnipeg', //Central Daylight Time
  'central daylight': 'America/Winnipeg',
  cst: 'America/Thunder_Bay', //Central Standard Time
  'central': 'America/Winnipeg',
  cwt: 'America/Mexico_City',
  cpt: 'America/Atikokan',
  eddt: 'America/Iqaluit',
  ept: 'America/Detroit',
  edt: 'America/New_York', //Eastern Daylight Time
  'eastern daylight': 'America/New_York',
  est: 'America/New_York', //Eastern Standard Time
  ewt: 'America/Detroit',
  ect: -4, //Eastern Caribbean Time (does not recognise DST)
  'eastern caribbean': -4,
  ffmt: 'America/Martinique',
  kmt: 'America/Grand_Turk',
  mddt: 'America/Cambridge_Bay',
  mdt: 'America/Denver', //Mountain Daylight Time
  mst: 'America/Creston', //Mountain Standard Time
  mpt: 'America/Boise',
  mwt: 'America/Phoenix',
  nt: -3.5, //Newfoundland Time
  nst: -3.5, //Newfoundland Standard Time
  nddt: 'America/St_Johns',
  ndt: 'America/St_Johns', //Newfoundland Daylight Time
  nwt: 'America/Adak',
  // npt: 'America/Goose_Bay',
  pddt: 'America/Inuvik',
  pdt: 'America/Los_Angeles', //Pacific Daylight Time
  pst: 'America/Los_Angeles', //Pacific Standard Time
  ppmt: 'America/Port-au-Prince',
  ppt: 'America/Dawson_Creek',
  pwt: 'America/Dawson_Creek',
  qmt: 'America/Guayaquil',
  sdmt: 'America/Santo_Domingo',
  sjmt: 'America/Costa_Rica',
  ydt: 'America/Dawson', //yukon
  ypt: 'America/Dawson',
  yddt: 'America/Dawson',
  ywt: 'America/Dawson',
  yst: 'America/Whitehorse',

  //europe
  ace: 'Europe/Dublin',
  amt: 'Europe/Amsterdam',
  bdst: 'Europe/Gibraltar',
  bmt: 'Europe/Brussels',
  bst: 'Europe/Gibraltar', //British Summer Time
  'british summer': 1,
  dmt: 'Europe/Dublin',
  cest: 2, //Central European Summer Time (Cf. HAEC)
  'central european summer': 2,
  cet: 'Europe/Budapest', //Central European Time
  'central european': 'Europe/Budapest',
  dft: 1, //AIX-specific equivalent of Central European Time
  eet: 2, //Eastern European Time
  eest: 'Europe/Istanbul', //Eastern European Standard Time
  'eastern european': 2,
  fet: 3, //Further-eastern European Time
  'further eastern european': 3,
  gmt: 0, //Greenwich Mean Time
  cmt: 'Europe/Copenhagen',
  // ist: 'Europe/Dublin',
  imt: 'Europe/Sofia',
  lst: 'Europe/Riga',
  mest: 2, //Middle European Summer Time Same zone as CEST
  met: 1, //Middle European Time Same zone as CET
  'middle european': 1,
  pmt: 'Europe/Prague',
  rmt: 'Europe/Rome',
  set: 'Europe/Stockholm',
  wemt: 'Europe/Madrid',
  wet: 'Europe/Brussels', //Western European Time
  west: 'Europe/Brussels',
  'western european time': 'Europe/Brussels',
  tmt: 'Europe/Tallinn', //Turkmenistan Time
  'turkmenistan': 5,
  tse: 'Europe/Dublin',
  utc: 'Etc/UTC', //Coordinated Universal Time
  'coordinated universal': 'Etc/UTC',

  //russia
  irkt: 8, //Irkutsk Time
  kalt: 2, //Kaliningrad Time
  mdst: 'Europe/Moscow',
  msd: 'Europe/Moscow',
  msk: 'Europe/Moscow',
  kgt: 6, //Kyrgyzstan Time
  'kyrgyzstan': 6,
  uzt: 5, //Uzbekistan Time
  'uzbekistan': 5,
  wmt: 'Europe/Warsaw',
  vlat: 10, //Vladivostok Time
  volt: 4, //Volgograd Time
  vost: 6, //Vostok Station Time

  //south america
  act: -5, //Acre Time
  amst: -3, //Amazon Summer Time (Brazil)
  art: -3, //Argentina Time
  bot: -4, //Bolivia Time
  'bolivia': -4,
  brst: -2, //Brasília Summer Time
  brt: -3, //Brasilia Time
  clst: -3, //Chile Summer Time
  clt: -4, //Chile Standard Time
  'chile': 'Chile/Continental',
  cost: -4, //Colombia Summer Time
  cot: -5, //Colombia Time
  'colombia': -5,
  fnt: -2, //Fernando de Noronha Time
  gft: -3, //French Guiana Time
  pmdt: -2, //Saint Pierre and Miquelon Daylight Time
  pmst: -3, //Saint Pierre and Miquelon Standard Time
  pet: -5, //Peru Time
  'peru': -5,
  rott: -3, //Rothera Research Station Time
  srt: -3, //Suriname Time
  pyst: -3, //Paraguay Summer Time
  pyt: -4, //Paraguay Time
  'paraguay': 'America/Asuncion',
  uyst: -2, //Uruguay Summer Time
  uyt: -3, //Uruguay Standard Time
  'uruguay': 'America/Montevideo',
  vet: -4, //Venezuelan Standard Time
  'venezuela': 'America/Caracas',

  //africa
  cat: 'Africa/Khartoum', //Central Africa Time
  cast: 'Africa/Khartoum',
  'central africa': 'Africa/Khartoum',
  cvt: -1, //Cape Verde Time
  eat: 'Africa/Nairobi', //eastern africa
  'east african': 'Africa/Nairobi',
  'eastern africa': 'Africa/Nairobi',
  ret: 4, //Réunion Time
  sast: 'Africa/Johannesburg', //south african
  'south african': 'Africa/Johannesburg',
  wast: 'Africa/Ndjamena', //west african
  'west african': 'Africa/Ndjamena',
  'wester africa': 'Africa/Ndjamena',
  wat: 'Africa/Ndjamena',

  //atlantic
  azost: 0, //Azores Summer Time
  azot: -1, //Azores Standard Time
  egst: 0, //Eastern Greenland Summer Time
  egt: -1, //Eastern Greenland Time
  'eastern greenland summer': 0,
  'eastern greenland': -1,
  fmt: 'Atlantic/Madeira',
  hmt: 'Atlantic/Azores',

  //middle-east
  aft: 4.5, //Afghanistan Time
  'afghanistan': 4.5,
  azt: 4, //Azerbaijan Time
  idt: 'Asia/Jerusalem', //Israel Daylight Time
  // ist: 2, //Israel Standard Time
  'israel': 'Asia/Jerusalem',
  irdt: 4.5, //Iran Daylight Time
  'iran daylight': 4.5, //Iran Daylight Time
  irst: 3.5, //Iran Standard Time
  'iran standard': 3.5,
  'iran': 'Asia/Tehran',
  jmt: 'Asia/Jerusalem',
  iddt: 'Asia/Jerusalem',
  pkst: 'Asia/Karachi',
  pkt: 'Asia/Karachi',
  trt: 3, //Turkey Time
  turkey: 'Europe/Istanbul',
  tjt: 5, //Tajikistan Time

  //india
  biot: 6, //British Indian Ocean Time
  ict: 7, //Indochina Time
  'indochina': 7,
  iot: 3, //Indian Ocean Time
  npt: 5.75, //Nepal Time
  mvt: 5, //Maldives Time
  slst: 5.5, //Sri Lanka Standard Time
  'sri lanka': 5.5,
  tft: 5, //Indian/Kerguelen
  btt: 6, //Bhutan Time
  'bhutan': 6,
  ist: 5.5, //Indian Standard Time
  'india': 5.5,

  //asia
  ct: 8, //China Time
  'china': 8,
  hkst: 'Asia/Hong_Kong',
  hkt: 'Asia/Hong_Kong',
  jdt: 'Asia/Tokyo',
  jst: 'Asia/Pyongyang',
  kdt: 'Asia/Seoul',
  kst: 'Asia/Seoul',
  'korea': 'Asia/Seoul',
  'korean': 'Asia/Seoul',
  mmt: 'Asia/Colombo',
  sgt: 8, //Singapore Time
  plmt: 'Asia/Ho_Chi_Minh',
  tbmt: 'Asia/Tbilisi',
  tha: 7, //Thailand Standard Time
  wit: 'Asia/Jayapura',
  wita: 'Asia/Pontianak',

  //pacific
  bit: -12, //Baker Island Time
  bdt: 8, //Brunei Time
  cit: 8, //Central Indonesia Time
  'central indonesian': 8,
  eit: 9, //Eastern Indonesian Time
  'eastern indonesian': 9,
  cist: -8, //Clipperton Island Standard Time
  chadt: 13.75, //Chatham Daylight Time
  chast: 12.75, //Chatham Standard Time
  chst: 'Pacific/Guam',
  cxt: 7, //Christmas Island Time
  'christmas island': 7,
  ckt: -10, //Cook Island Time
  'cook island': -10,
  chut: 10, //Chuuk Time
  ddut: 10, //Dumont dUrville Time
  emt: 'Pacific/Easter',
  easst: -5, //Easter Island Summer Time
  east: -6, //Easter Island Standard Time
  'easter island': 'Pacific/Easter',
  fjt: 12, //Fiji Time
  fkst: -3, //Falkland Islands Summer Time
  fkt: -4, //Falkland Islands Time
  galt: -6, //Galápagos Time
  gyt: -4, //Guyana Time
  gst: 'Pacific/Guam',
  gamt: -9, //Gambier Islands Time
  git: -9, //Gambier Island Time
  gilt: 12, //Gilbert Island Time
  hdt: 'Pacific/Honolulu',
  hst: 'Pacific/Honolulu',
  idlw: -12, //International Day Line West time zone
  'international day line west': -12,
  kost: 11, //Kosrae Time
  lhst: 10.5, //Lord Howe Standard Time
  lint: 14, //Line Islands Time
  magt: 12, //Magadan Time
  mist: 11, //Macquarie Island Station Time
  nct: 11, //New Caledonia Time
  nft: 11, //Norfolk Island Time
  phot: 13, //Phoenix Island Time
  pont: 11, //Pohnpei Standard Time
  pett: 12, //Kamchatka Time
  mart: -9.5, //Marquesas Islands Time
  mit: -9.5, //Marquesas Islands Time
  myt: 8, //Malaysia Time
  mht: 12, //Marshall Islands Time
  nut: -11, //Niue Time
  pht: 8, //Philippine Time
  pgt: 10, //Papua New Guinea Time
  pmmt: 'Pacific/Bougainville',
  smt: 'Asia/Singapore',
  sakt: 11, //Sakhalin Island Time
  sbt: 11, //Solomon Islands Time
  sret: 11, //Srednekolymsk Time
  sdt: -10, //Samoa Daylight Time
  sst: 'Pacific/Pago_Pago',
  taht: -10, //Tahiti Time
  tlt: 9, //Timor Leste Time
  tvt: 12, //Tuvalu Time
  tkt: 13, //Tokelau Time
  tot: 13, //Tonga Time
  vut: 11, //Vanuatu Time
  wib: 'Asia/Jakarta',
  wakt: 12, //Wake Island Time

  //i forget (sorry!)
  haec: 2, //Heure Avancée dEurope Centrale French-language name for CEST
  syot: 3, //Showa Station Time
  yekt: 5, //Yekaterinburg Time
  get: 4, //Georgia Standard Time
  samt: 4, //Samara Time
  mut: 4, //Mauritius Time
  sct: 4, //Seychelles Time
  orat: 5, //Oral Time
  mawt: 5, //Mawson Station Time
  cct: 6.5, //Cocos Islands Time
  omst: 6, //Omsk Time
  hovt: 7, //Khovd Standard Time
  hovst: 8, //Khovd Summer Time
  krat: 7, //Krasnoyarsk Time
  ulat: 8, //Ulaanbaatar Standard Time
  davt: 7, //Davis Time
  chost: 9, //Choibalsan Summer Time
  chot: 8, //Choibalsan Standard Time
  wst: 8, //Western Standard Time
  ulast: 9, //Ulaanbaatar Summer Time
  yakt: 9, //Yakutsk Time

}

module.exports = abbrs
