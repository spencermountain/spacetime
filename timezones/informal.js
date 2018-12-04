// this is a very rough list of informal and abbreviated timezones
// i am not an expert, or even half-knowledgeable in this subject.
// please help.
// partially from: https://en.wikipedia.org/wiki/list_of_time_zone_abbreviations

//format:  'best/iana': [standard, daylight, alias...]
const north = {

  //australia
  'australia/adelaide': ['acst', 'acdt', 'australian central'], //australian central daylight savings time
  'australia/eucla': ['acwst', null, 'cwst', 'australian central western'], //australian central western standard time (unofficial)
  'australia/brisbane': ['aest', 'aedt', 'australian eastern'], //australian eastern standard time
  'australia/perth': ['awst', 'awdt', 'australian western'], //australian western standard time
  'australia/auckland': ['nzst', 'nzdt', 'nzmt'],



  //atlantic
  'america/halifax': ['ast', 'adt', 'atlantic'],
  //eastern
  'america/new_york': ['est', 'edt', 'eastern'],
  //central
  'america/chicago': ['cst', 'cdt', 'central'],
  //mountain
  'america/denver': ['mst', 'mdt', 'mountain'],
  //pacific
  'america/los_angeles': ['pst', 'pdt', 'pacific'],
  //alaska
  'america/anchorage': ['ahst', 'ahdt', 'akst', 'akdt', 'alaska'], //Alaska Standard Time
  //newfoundland
  'america/st_johns': ['nst', 'ndt', 'nt', 'newfoundland', 'nddt'],
  //yukon
  // 'america/whitehorse':['yst','']

  // awt: 'america/blanc-sablon',
  // addt: 'america/pangnirtung',
  // apt: 'america/blanc-sablon',
  // bost: 'america/la_paz',
  // cddt: 'america/rankin_inlet',
  // cwt: 'america/mexico_city',
  // cpt: 'america/atikokan',
  // eddt: 'america/iqaluit',
  // ept: 'america/detroit',
  // ewt: 'america/detroit',
  // ect: 'america/anguilla', //eastern caribbean time (does not recognise dst)
  // 'eastern caribbean': 'america/anguilla',
  // ffmt: 'america/martinique',
  // kmt: 'america/grand_turk',
  // mddt: 'america/cambridge_bay',
  // mpt: 'america/boise',
  // mwt: 'america/phoenix',
  // nwt: 'america/adak',
  // // npt: 'america/goose_bay',
  // pddt: 'america/inuvik',
  // ppmt: 'america/port-au-prince',
  // ppt: 'america/dawson_creek',
  // pwt: 'america/dawson_creek',
  // qmt: 'america/guayaquil',
  // sdmt: 'america/santo_domingo',
  // sjmt: 'america/costa_rica',
  // ydt: 'america/dawson', //yukon
  // ypt: 'america/dawson',
  // yddt: 'america/dawson',
  // ywt: 'america/dawson',
  // yst: 'america/whitehorse',

  //europe
  'europe/london': ['gmt', 'bst', 'british'], //england
  'europe/lisbon': ['wet', 'west', 'western europe'], //western europe
  'europe/berlin': ['cet', 'cest', 'central europe', 'middle european', 'met', 'mest'], //central europe
  'europe/riga': ['eet', 'eest', 'eastern europe', 'kalt'], //eastern europe
  // 'europe/minsk': ['feet', 'feest', 'eastern europe'], //further eastern europe (discontinued)



  //europe
  // ace: 'europe/dublin',
  // amt: 'europe/amsterdam',
  // bdst: 'europe/gibraltar',
  // bmt: 'europe/brussels',
  // bst: 'europe/gibraltar', //british summer time
  // 'british summer': 1,
  // dmt: 'europe/dublin',
  // dft: 1, //aix-specific equivalent of central european time
  // gmt: 0, //greenwich mean time
  // cmt: 'europe/copenhagen',
  // // ist: 'europe/dublin',
  // imt: 'europe/sofia',
  // lst: 'europe/riga',
  // pmt: 'europe/prague',
  // rmt: 'europe/rome',
  // set: 'europe/stockholm',
  // wemt: 'europe/madrid',
  // tmt: 'europe/tallinn', //turkmenistan time
  // 'turkmenistan': 5,
  // tse: 'europe/dublin',
  // utc: 'etc/utc', //coordinated universal time
  // 'coordinated universal': 'etc/utc',

  //russia
  'europe/moscow': ['msk', null, 'fet', 'mdst', 'msd'], //'further eastern europe'
  'europe/samara': ['samt'],
  'asia/yekaterinburg': ['yekt'],
  'asia/omsk': ['omst'],
  'asia/krasnoyarsk': ['krat'],
  'asia/novosibirsk': ['novt'],
  'asia/irkutsk': ['irkt'],
  'asia/yakutsk': ['yakt'],
  'asia/vladivostok': ['vlat'],
  'asia/magadan': ['magt'],
  'asia/sakhalin': ['sakt'],
  'asia/srednekolymsk': ['sret'],
  'asia/anadyr': ['anat'],
  'asia/kamchatka': ['pett'],

  //near-russia
  'asia/tashkent': ['uzt', 'uzbekistan'], //uzbekistan time
  'asia/bishkek': ['kgt', 'kyrgyzstan'], //kyrgyzstan time
  'antarctica/vostok': ['vost'],

  // wmt: 'europe/warsaw',
  // 'europe/volgograd':['volt']
  // volt: 4, //volgograd time

  //africa (northern hemisphere)
  'africa/lagos': ['wat', 'wast', 'west africa'], //west african
  'africa/khartoum': ['cat', null, 'central africa'],
  'africa/nairobi': ['eat', null, 'central africa'],
  'atlantic/cape_verde': ['cvt'],

  //atlantic
  azost: 0, //azores summer time
  azot: -1, //azores standard time
  egst: 0, //eastern greenland summer time
  egt: -1, //eastern greenland time
  'eastern greenland summer': 0,
  'eastern greenland': -1,
  fmt: 'atlantic/madeira',
  hmt: 'atlantic/azores',

  //middle-east
  aft: 4.5, //afghanistan time
  'afghanistan': 4.5,
  azt: 4, //azerbaijan time
  idt: 'asia/jerusalem', //israel daylight time
  // ist: 2, //israel standard time
  'israel': 'asia/jerusalem',
  irdt: 4.5, //iran daylight time
  'iran daylight': 4.5, //iran daylight time
  irst: 3.5, //iran standard time
  'iran standard': 3.5,
  'iran': 'asia/tehran',
  jmt: 'asia/jerusalem',
  iddt: 'asia/jerusalem',
  pkst: 'asia/karachi',
  pkt: 'asia/karachi',
  trt: 3, //turkey time
  turkey: 'europe/istanbul',
  tjt: 5, //tajikistan time

  //india
  biot: 6, //british indian ocean time
  ict: 7, //indochina time
  'indochina': 7,
  iot: 3, //indian ocean time
  npt: 5.75, //nepal time
  mvt: 5, //maldives time
  slst: 5.5, //sri lanka standard time
  'sri lanka': 5.5,
  tft: 5, //indian/kerguelen
  btt: 6, //bhutan time
  'bhutan': 6,
  ist: 5.5, //indian standard time
  'india': 5.5,

  //asia
  ct: 8, //china time
  'china': 8,
  hkst: 'asia/hong_kong',
  hkt: 'asia/hong_kong',
  jdt: 'asia/tokyo',
  jst: 'asia/pyongyang',
  kdt: 'asia/seoul',
  kst: 'asia/seoul',
  'korea': 'asia/seoul',
  'korean': 'asia/seoul',
  mmt: 'asia/colombo',
  sgt: 8, //singapore time
  plmt: 'asia/ho_chi_minh',
  tbmt: 'asia/tbilisi',
  tha: 7, //thailand standard time
  wit: 'asia/jayapura',
  wita: 'asia/pontianak',

  //pacific
  bit: -12, //baker island time
  bdt: 8, //brunei time
  cist: -8, //clipperton island standard time
  chadt: 13.75, //chatham daylight time
  chast: 12.75, //chatham standard time
  chst: 'pacific/guam',
  ckt: -10, //cook island time
  'cook island': -10,
  chut: 10, //chuuk time
  ddut: 10, //dumont durville time
  gst: 'pacific/guam',
  gamt: -9, //gambier islands time
  git: -9, //gambier island time
  gilt: 12, //gilbert island time
  hdt: 'pacific/honolulu',
  hst: 'pacific/honolulu',
  idlw: -12, //international day line west time zone
  'international day line west': -12,
  kost: 11, //kosrae time
  lhst: 10.5, //lord howe standard time
  lint: 14, //line islands time
  magt: 12, //magadan time
  mist: 11, //macquarie island station time
  nct: 11, //new caledonia time
  nft: 11, //norfolk island time
  phot: 13, //phoenix island time
  pont: 11, //pohnpei standard time
  pett: 12, //kamchatka time
  mart: -9.5, //marquesas islands time
  mit: -9.5, //marquesas islands time
  myt: 8, //malaysia time
  nut: -11, //niue time
  pht: 8, //philippine time
  pgt: 10, //papua new guinea time
  pmmt: 'pacific/bougainville',
  smt: 'asia/singapore',
  sakt: 11, //sakhalin island time
  sret: 11, //srednekolymsk time
  sst: 'pacific/pago_pago',
  taht: -10, //tahiti time
  tvt: 12, //tuvalu time
  tkt: 13, //tokelau time
  tot: 13, //tonga time
  vut: 11, //vanuatu time
  wakt: 12, //wake island time

  //i forget (sorry!)
  haec: 2, //heure avancée deurope centrale french-language name for cest
  syot: 3, //showa station time
  yekt: 5, //yekaterinburg time
  get: 4, //georgia standard time
  samt: 4, //samara time
  mut: 4, //mauritius time
  sct: 4, //seychelles time
  orat: 5, //oral time
  mawt: 5, //mawson station time
  cct: 6.5, //cocos islands time
  omst: 6, //omsk time
  hovt: 7, //khovd standard time
  hovst: 8, //khovd summer time
  krat: 7, //krasnoyarsk time
  ulat: 8, //ulaanbaatar standard time
  davt: 7, //davis time
  chost: 9, //choibalsan summer time
  chot: 8, //choibalsan standard time
  wst: 8, //western standard time
  ulast: 9, //ulaanbaatar summer time
  yakt: 9, //yakutsk time

  //south america (northern hemisphere)
  cost: -4, //colombia summer time
  cot: -5, //colombia time
  'colombia': -5,
  gft: -3, //french guiana time
  srt: -3, //suriname time
  vet: -4, //venezuelan standard time
  'venezuela': 'america/caracas',
  gyt: -4, //guyana time

}

const south = {
  //pacific (southern hemisphere)
  cit: 8, //central indonesia time
  'central indonesian': 8,
  eit: 9, //eastern indonesian time
  'eastern indonesian': 9,
  emt: 'pacific/easter',
  easst: -5, //easter island summer time
  east: -6, //easter island standard time
  'easter island': 'pacific/easter',
  fkst: -3, //falkland islands summer time
  fkt: -4, //falkland islands time
  galt: -6, //galápagos time
  sbt: 11, //solomon islands time
  fjt: 12, //fiji time
  tlt: 9, //timor leste time
  wib: 'asia/jakarta',
  mht: 12, //marshall islands time
  sdt: -10, //samoa daylight time
  cxt: 7, //christmas island time
  'christmas island': 7,

  //africa (southern hemisphere)
  ret: 4, //réunion time
  sast: 'africa/johannesburg', //south african
  'south african': 'africa/johannesburg',

  //south america
  act: -5, //acre time
  amst: -3, //amazon summer time (brazil)
  art: -3, //argentina time
  bot: -4, //bolivia time
  'bolivia': -4,
  brst: -2, //brasília summer time
  brt: -3, //brasilia time
  clst: -3, //chile summer time
  clt: -4, //chile standard time
  'chile': 'chile/continental',
  fnt: -2, //fernando de noronha time
  pmdt: -2, //saint pierre and miquelon daylight time
  pmst: -3, //saint pierre and miquelon standard time
  pet: -5, //peru time
  'peru': -5,
  rott: -3, //rothera research station time
  pyst: -3, //paraguay summer time
  pyt: -4, //paraguay time
  'paraguay': 'america/asuncion',
  uyst: -2, //uruguay summer time
  uyt: -3, //uruguay standard time
  'uruguay': 'america/montevideo',
}

module.exports = {
  north: north,
  south: south
}
