// this is a very rough list i've made
// i am not an expert, or even half-knowledgeable.
// partially from: https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations
// please help.

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
  // bdt: 'America/Adak',
  bost: 'America/La_Paz',
  cddt: 'America/Rankin_Inlet',
  cdt: 'America/Winnipeg',
  cpt: 'America/Atikokan',
  cst: 'America/Thunder_Bay',
  eddt: 'America/Iqaluit',
  edt: 'America/New_York',
  ept: 'America/Detroit',
  est: 'America/Moncton',
  ewt: 'America/Detroit',
  ffmt: 'America/Martinique',
  cwt: 'America/Mexico_City',
  kmt: 'America/Grand_Turk',
  mddt: 'America/Cambridge_Bay',
  mdt: 'America/Denver',
  mpt: 'America/Boise',
  mst: 'America/Creston',
  mwt: 'America/Phoenix',
  nddt: 'America/St_Johns',
  ndt: 'America/St_Johns',
  nwt: 'America/Adak',
  npt: 'America/Goose_Bay',
  pddt: 'America/Inuvik',
  pdt: 'America/Boise',
  ppmt: 'America/Port-au-Prince',
  ppt: 'America/Dawson_Creek',
  pst: 'America/Boise',
  pwt: 'America/Dawson_Creek',
  qmt: 'America/Guayaquil',
  sdmt: 'America/Santo_Domingo',
  sjmt: 'America/Costa_Rica',
  yddt: 'America/Dawson',
  ydt: 'America/Dawson',
  ypt: 'America/Dawson',
  yst: 'America/Whitehorse',
  ywt: 'America/Dawson',
  ect: -4, //Eastern Caribbean Time (does not recognise DST)
  nt: -3.5, //Newfoundland Time

  //europe
  ace: 'Europe/Dublin',
  amt: 'Europe/Amsterdam',
  bdst: 'Europe/Gibraltar',
  bmt: 'Europe/Brussels',
  bst: 'Europe/Gibraltar', //British Summer Time
  'british summer': 1,
  dmt: 'Europe/Dublin',
  cest: 2, //Central European Summer Time (Cf. HAEC)
  cet: 'Europe/Budapest',
  dft: 1, //AIX-specific equivalent of Central European Time
  eest: 'Europe/Istanbul',
  eet: 'Europe/Istanbul',
  gmt: 'Europe/London',
  cmt: 'Europe/Copenhagen',
  ist: 'Europe/Dublin',
  lst: 'Europe/Riga',
  mdst: 'Europe/Moscow',
  msd: 'Europe/Moscow',
  msk: 'Europe/Moscow',
  mest: 2, //Middle European Summer Time Same zone as CEST
  met: 1, //Middle European Time Same zone as CET
  imt: 'Europe/Sofia',
  nst: 'Europe/Amsterdam',
  pmt: 'Europe/Prague',
  rmt: 'Europe/Rome',
  set: 'Europe/Stockholm',
  wemt: 'Europe/Madrid',
  wet: 'Europe/Brussels',
  wmt: 'Europe/Warsaw',
  tmt: 'Europe/Tallinn',
  tse: 'Europe/Dublin',
  utc: 'Etc/UTC',

  //south america
  clst: -3, //Chile Summer Time
  clt: -4, //Chile Standard Time
  art: -3, //Argentina Time
  bot: -4, //Bolivia Time
  brst: -2, //Brasília Summer Time
  brt: -3, //Brasilia Time
  cost: -4, //Colombia Summer Time
  cot: -5, //Colombia Time
  srt: -3, //Suriname Time
  pyst: -3, //Paraguay Summer Time
  pyt: -4, //Paraguay Time
  uyst: -2, //Uruguay Summer Time
  uyt: -3, //Uruguay Standard Time
  vet: -4, //Venezuelan Standard Time
  pet: -5, //Peru Time
  gft: -3, //French Guiana Time

  //africa
  cast: 'Africa/Khartoum',
  cat: 'Africa/Khartoum',
  wast: 'Africa/Ndjamena',
  wat: 'Africa/Ndjamena',
  west: 'Africa/Algiers',
  eat: 'Africa/Nairobi',
  sast: 'Africa/Johannesburg',
  ret: 4, //Réunion Time

  //atlantic
  fmt: 'Atlantic/Madeira',
  hmt: 'Atlantic/Azores',
  egst: 0, //Eastern Greenland Summer Time
  egt: -1, //Eastern Greenland Time
  azost: 0, //Azores Summer Time
  azot: -1, //Azores Standard Time

  //middle-east
  aft: 4.5, //Afghanistan Time
  azt: 4, //Azerbaijan Time
  irdt: 4.5, //Iran Daylight Time
  irst: 3.5, //Iran Standard Time
  jmt: 'Asia/Jerusalem',
  iddt: 'Asia/Jerusalem',
  pkst: 'Asia/Karachi',
  pkt: 'Asia/Karachi',
  trt: 3, //Turkey Time
  tjt: 5, //Tajikistan Time

  //india
  ict: 7, //Indochina Time
  iot: 3, //Indian Ocean Time
  slst: 5.5, //Sri Lanka Standard Time
  mvt: 5, //Maldives Time
  tft: 5, //Indian/Kerguelen
  biot: 6, //British Indian Ocean Time

  //asia
  ct: 8, //China Time
  hkst: 'Asia/Hong_Kong',
  hkt: 'Asia/Hong_Kong',
  jdt: 'Asia/Tokyo',
  idt: 'Asia/Jerusalem',
  jst: 'Asia/Pyongyang',
  kdt: 'Asia/Seoul',
  kst: 'Asia/Seoul',
  wit: 'Asia/Jayapura',
  wita: 'Asia/Pontianak',
  plmt: 'Asia/Ho_Chi_Minh',
  tbmt: 'Asia/Tbilisi',
  mmt: 'Asia/Colombo',
  sgt: 8, //Singapore Time
  tha: 7, //Thailand Standard Time

  //pacific
  smt: 'Asia/Singapore',
  wib: 'Asia/Jakarta',
  pmmt: 'Pacific/Bougainville',
  sst: 'Pacific/Pago_Pago',
  chst: 'Pacific/Guam',
  fjt: 12, //Fiji Time
  fkst: -3, //Falkland Islands Summer Time
  fkt: -4, //Falkland Islands Time
  galt: -6, //Galápagos Time
  gyt: -4, //Guyana Time
  hdt: 'Pacific/Honolulu',
  hst: 'Pacific/Honolulu',
  idlw: -12, //International Day Line West time zone
  gst: 'Pacific/Guam',
  emt: 'Pacific/Easter',
  mht: 12, //Marshall Islands Time
  easst: -5, //Easter Island Summer Time
  east: -6, //Easter Island Standard Time
  eit: 9, //Eastern Indonesian Time
  pht: 8, //Philippine Time
  myt: 8, //Malaysia Time
  cit: 8, //Central Indonesia Time

  //russia
  vlat: 10, //Vladivostok Time
  volt: 4, //Volgograd Time
  vost: 6, //Vostok Station Time
  kalt: 2, //Kaliningrad Time
  kgt: 6, //Kyrgyzstan Time
  uzt: 5, //Uzbekistan Time
  irkt: 8, //Irkutsk Time

  //i forget (sorry!)
  cvt: -1, //Cape Verde Time
  fnt: -2, //Fernando de Noronha Time
  amst: -3, //Amazon Summer Time (Brazil)
  pmdt: -2, //Saint Pierre and Miquelon Daylight Time
  pmst: -3, //Saint Pierre and Miquelon Standard Time
  rott: -3, //Rothera Research Station Time
  act: -5, //Acre Time
  git: -9, //Gambier Island Time
  cist: -8, //Clipperton Island Standard Time
  gamt: -9, //Gambier Islands Time
  sdt: -10, //Samoa Daylight Time
  taht: -10, //Tahiti Time
  mart: -9.5, //Marquesas Islands Time
  mit: -9.5, //Marquesas Islands Time
  ckt: -10, //Cook Island Time
  nut: -11, //Niue Time
  bit: -12, //Baker Island Time

  haec: 2, //Heure Avancée dEurope Centrale French-language name for CEST
  fet: 3, //Further-eastern European Time
  syot: 3, //Showa Station Time
  yekt: 5, //Yekaterinburg Time
  get: 4, //Georgia Standard Time
  samt: 4, //Samara Time
  mut: 4, //Mauritius Time
  sct: 4, //Seychelles Time
  orat: 5, //Oral Time
  mawt: 5, //Mawson Station Time
  btt: 6, //Bhutan Time
  cct: 6.5, //Cocos Islands Time
  omst: 6, //Omsk Time
  hovt: 7, //Khovd Standard Time
  hovst: 8, //Khovd Summer Time
  krat: 7, //Krasnoyarsk Time
  davt: 7, //Davis Time
  cxt: 7, //Christmas Island Time
  cwst: 8.75, //Central Western Standard Time (Australia) unofficial
  ulat: 8, //Ulaanbaatar Standard Time
  chost: 9, //Choibalsan Summer Time
  chot: 8, //Choibalsan Standard Time
  wst: 8, //Western Standard Time
  bdt: 8, //Brunei Time
  ulast: 9, //Ulaanbaatar Summer Time
  tlt: 9, //Timor Leste Time
  yakt: 9, //Yakutsk Time
  sakt: 11, //Sakhalin Island Time
  sbt: 11, //Solomon Islands Time
  sret: 11, //Srednekolymsk Time
  vut: 11, //Vanuatu Time
  wakt: 12, //Wake Island Time
  tvt: 12, //Tuvalu Time
  tkt: 13, //Tokelau Time
  tot: 13, //Tonga Time
  chut: 10, //Chuuk Time
  ddut: 10, //Dumont dUrville Time
  pgt: 10, //Papua New Guinea Time
  kost: 11, //Kosrae Time
  lhst: 10.5, //Lord Howe Standard Time
  lint: 14, //Line Islands Time
  mist: 11, //Macquarie Island Station Time
  nct: 11, //New Caledonia Time
  nft: 11, //Norfolk Island Time
  pont: 11, //Pohnpei Standard Time
  pett: 12, //Kamchatka Time
  gilt: 12, //Gilbert Island Time
  magt: 12, //Magadan Time
  chast: 12.75, //Chatham Standard Time
  phot: 13, //Phoenix Island Time
  chadt: 13.75, //Chatham Daylight Time

// acdt: 10.5, //Australian Central Daylight Savings Time
// acst: 9.5, //Australian Central Standard Time
// act: 6.5 – UTC9, //ASEAN Common Time
// adt: -3, //Atlantic Daylight Time
// aedt: 11, //Australian Eastern Daylight Savings Time
// aest: 10, //Australian Eastern Standard Time
// akdt: -8, //Alaska Daylight Time
// akst: -9, //Alaska Standard Time
// amt: -4, //Amazon Time (Brazil)
// amt: 4, //Armenia Time
// ast: -4, //Atlantic Standard Time
// ast: 3, //Arabia Standard Time
// awst: 8, //Australian Western Standard Time
// bst: 1, //British Summer Time (British Standard Time from Feb 1968 to Oct 1971)
// bst: 11, //Bougainville Standard Time
// bst: 6, //Bangladesh Standard Time
// cat: 2, //Central Africa Time
// cdt: -4, //Cuba Daylight Time
// cdt: -5, //Central Daylight Time (North America)
// cet: 1, //Central European Time
// chst: 10, //Chamorro Standard Time
// cst: -5, //Cuba Standard Time
// cst: -6, //Central Standard Time (North America)
// cst: 8, //China Standard Time
// eat: 3, //East Africa Time
// ect: -5, //Ecuador Time
// edt: -4, //Eastern Daylight Time (North America)
// eest: 3, //Eastern European Summer Time
// eet: 2, //Eastern European Time
// est: -5, //Eastern Standard Time (North America)
// gmt: 0, //Greenwich Mean Time
// gst: -2, //South Georgia and the South Sandwich Islands Time
// gst: 4, //Gulf Standard Time
// hdt: -9, //Hawaii–Aleutian Daylight Time
// hkt: 8, //Hong Kong Time
// hmt: 5, //Heard and McDonald Islands Time
// hst: -10, //Hawaii–Aleutian Standard Time
// idt: 3, //Israel Daylight Time
// ist: 1, //Irish Standard Time
// ist: 2, //Israel Standard Time
// ist: 5.5, //Indian Standard Time
// jst: 9, //Japan Standard Time
// kst: 9, //Korea Standard Time
// lhst: 11, //Lord Howe Summer Time
// mdt: -6, //Mountain Daylight Time (North America)
// mmt: 6.5, //Myanmar Standard Time
// msk: 3, //Moscow Time
// mst: -7, //Mountain Standard Time (North America)
// mst: 8, //Malaysia Standard Time
// ndt: -2.5, //Newfoundland Daylight Time
// npt: 5.75, //Nepal Time
// nst: -3.5, //Newfoundland Standard Time
// nzdt: 13, //New Zealand Daylight Time
// nzst: 12, //New Zealand Standard Time
// pdt: -7, //Pacific Daylight Time (North America)
// pkt: 5, //Pakistan Standard Time
// pst: -8, //Pacific Standard Time (North America)
// pst: 8, //Philippine Standard Time
// sast: 2, //South African Standard Time
// sst: -11, //Samoa Standard Time
// sst: 8, //Singapore Standard Time
// tmt: 5, //Turkmenistan Time
// utc: 0, //Coordinated Universal Time
// wast: 2, //West Africa Summer Time
// wat: 1, //West Africa Time
// west: 1, //Western European Summer Time
// wet: 0, //Western European Time
// wit: 7, //Western Indonesian Time
}

module.exports = abbrs
