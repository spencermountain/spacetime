// this is a very rough list of informal and abbreviated timezones
// i am not an expert, or even half-knowledgeable in this subject.
// please help.
// partially from: https://en.wikipedia.org/wiki/list_of_time_zone_abbreviations

//format:  'best/iana': [standard, daylight, alias...]
const north = {
  //america
  //atlantic
  'america/halifax': ['ast', 'adt', 'atlantic'], //or 'arabia standard time'
  //eastern
  'america/new_york': ['est', 'edt', 'eastern'], //or 'Ecuador Time'
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
  //south america (northern hemisphere)
  'america/caracas': ['vet', null, 'venezuela'],
  'america/bogota': ['cot', null, 'colombia'],
  'america/cayenne': ['gft', null, 'french guiana'],
  'america/paramaribo': ['srt', null, 'suriname'],
  'america/guyana': ['gyt'],

  // awt: 'america/blanc-sablon',
  // addt: 'america/pangnirtung',
  // apt: 'america/blanc-sablon',
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
  'europe/london': ['gmt', 'bst', 'british'], //britain is different
  'europe/lisbon': ['wet', 'west', 'western europe'], //western europe
  'europe/berlin': ['cet', 'cest', 'central europe', 'middle european', 'met', 'mest'], //central europe
  'europe/riga': ['eet', 'eest', 'eastern europe', 'kalt'], //eastern europe
  // -- these are old european ones, i think before the EU:
  // 'europe/minsk': ['feet', 'feest', 'eastern europe'], //further eastern europe (discontinued)
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
  'asia/hovd': ['hovt'],
  'asia/ashgabat': ['tmt', null, 'turkmenistan'],
  // wmt: 'europe/warsaw',
  // 'europe/volgograd':['volt']

  //africa (northern hemisphere)
  'africa/lagos': ['wat', 'wast', 'west africa'], //west african
  'africa/khartoum': ['cat', null, 'central africa'],
  'africa/nairobi': ['eat', null, 'central africa'],
  'atlantic/cape_verde': ['cvt'],
  'indian/mauritius': ['mut'],

  //atlantic
  'atlantic/azores': ['azot', 'azost', 'hmt'],
  'america/godthab': ['wgt', 'wgst', 'western greenland'],
  'america/scoresbysund': ['egt', 'egst', 'eastern greenland'],

  //middle-east
  'europe/istanbul': ['trt', null, 'turkey'],
  'asia/tbilisi': ['get', null, 'georgia'],
  'asia/yerevan': ['amt', null, 'armenia'],
  'asia/baku': ['azt', null, 'azerbaijan'],
  'asia/jerusalem': ['ist', 'idt', 'israel', 'jmt', 'iddt'],
  'asia/tehran': ['irst', 'irdt', 'iran'],
  'asia/karachi': ['pkt', null, 'pakistan'],
  'asia/kabul': ['aft', null, 'afghanistan'],
  'asia/dushanbe': ['tjt', null, 'tajikistan'],
  'asia/almaty': ['almt', null, 'tajikistan'],
  'asia/dubai': ['gst', null, 'gulf'],

  //india
  'asia/kolkata': ['ist', null, 'india', 'slst'],
  'asia/dhaka': ['bst', null, 'bangladesh'],
  'asia/thimbu': ['btt', null, 'bhutan'],
  'indian/maldives': ['mvt'],
  'asia/kathmandu': ['npt', null, 'nepal'],
  'indian/cocos': ['cct', null, 'cocos island'],
  'indian/chagos': ['iot', null, 'indian chagos'],
  'indian/kerguelen': ['tft', null, 'french southern and antarctic'],
  // biot: 6, //british indian ocean time
  // iot: 3, //indian ocean time

  //asia
  'asia/shanghai': ['ct', null, 'china', 'hkt'],
  'asia/ulaanbaatar': ['ulat'],
  'asia/seoul': ['kst', null, 'korea'],
  'asia/tokyo': ['jst', null, 'japan'],
  'asia/phnom_penh': ['ict', null, 'indochina'],
  'asia/manila': ['pht', null, 'philippines'],
  'asia/singapore': ['sgt'],
  // mmt: 'asia/colombo',

  //australia
  'australia/adelaide': ['acst', 'acdt', 'australian central'], //australian central daylight savings time
  'australia/eucla': ['acwst', null, 'cwst', 'australian central western'], //australian central western standard time (unofficial)
  'australia/brisbane': ['aest', 'aedt', 'australian eastern'], //australian eastern standard time
  'australia/perth': ['awst', 'awdt', 'australian western'], //australian western standard time
  'australia/auckland': ['nzst', 'nzdt', 'nzmt'],
  'australia/lord_howe': ['lhst', 'lhdt'],

  //pacific (northern hemisphere)
  'pacific/guam': ['chst'],
  'pacific/chatham': ['chast', 'chadt'],
  'pacific/honolulu': ['hst'],
  'asia/brunei': ['bnt', null, 'bdt'],
  'pacific/midway': ['sst', null, 'samoa', 'sdt'],
  'pacific/niue': ['nut'],
  'pacific/fakaofo': ['tkt'],
  'pacific/rarotonga': ['ckt', null, 'cook islands'],
  'chile/easterisland': ['east', 'easst', 'easter island', 'emt'],
  // bit: -12, //baker island time
  // cist: -8, //clipperton island standard time
  // chut: 10, //chuuk time
  // ddut: 10, //dumont durville time
  // gst: 'pacific/guam',
  // gamt: -9, //gambier islands time
  // git: -9, //gambier island time
  // gilt: 12, //gilbert island time
  // idlw: -12, //international day line west time zone
  // 'international day line west': -12,
  // kost: 11, //kosrae time
  // lint: 14, //line islands time
  // magt: 12, //magadan time
  // mist: 11, //macquarie island station time
  // nct: 11, //new caledonia time
  // nft: 11, //norfolk island time
  // phot: 13, //phoenix island time
  // pont: 11, //pohnpei standard time
  // pett: 12, //kamchatka time
  // mart: -9.5, //marquesas islands time
  // mit: -9.5, //marquesas islands time
  // myt: 8, //malaysia time
  // nut: -11, //niue time
  // pht: 8, //philippine time
  // pgt: 10, //papua new guinea time
  // pmmt: 'pacific/bougainville',
  // // smt: 'asia/singapore',
  // sakt: 11, //sakhalin island time
  // sret: 11, //srednekolymsk time
  // sst: 'pacific/pago_pago',
  // taht: -10, //tahiti time
  // tvt: 12, //tuvalu time
  // tkt: 13, //tokelau time
  // tot: 13, //tonga time
  // vut: 11, //vanuatu time
  // wakt: 12, //wake island time

//i forget (sorry!)
// haec: 2, //heure avancée deurope centrale french-language name for cest
// syot: 3, //showa station time
// yekt: 5, //yekaterinburg time
// sct: 4, //seychelles time
// orat: 5, //oral time
// mawt: 5, //mawson station time
// hovt: 7, //khovd standard time
// hovst: 8, //khovd summer time
// davt: 7, //davis time
// chost: 9, //choibalsan summer time
// chot: 8, //choibalsan standard time
// wst: 8, //western standard time
}

const south = {
  //pacific (southern hemisphere)
  'asia/jayapura': ['wit', null, 'eastern indonesia'],
  'asia/jakarta': ['wib', null, 'western indonesia'],
  'asia/makassar': ['wta', null, 'central indonesia'],
  'atlantic/stanley': ['fkst', null, 'falkland island'],
  'pacific/galapagos': ['galt'],
  'pacific/fiji': ['fjt', 'fjst'],
  'asia/dili': ['tlt', null, 'east timor', 'tlt'],
  'indian/christmas': ['cxt'],
  // sbt: 11, //solomon islands time
  // mht: 12, //marshall islands time

  //africa (southern hemisphere)
  'indian/reunion': ['ret'],
  'africa/johannesburg': ['sast', null, 'south africa'],

  //south america
  'america/buenos_aires': ['art', null, 'argentina'],
  'america/la_paz': ['bot', null, 'bolivia'],
  'america/asuncion': ['pyt', 'pyst', 'paraguay'],
  'america/santiago': ['clt', 'clst', 'chile'],
  'america/lima': ['pet', null, 'peru'],
  'america/montevideo': ['uyt', null, 'uruguay'],
  //brazil
  'america/rio_branco': ['act'],
  'america/manaus': ['amt'],
  'america/sao_paulo': ['brt', 'brst'],
  'brazil/acre': ['act'],
// amst: -3, //amazon summer time (brazil)
// fnt: -2, //fernando de noronha time
// pmdt: -2, //saint pierre and miquelon daylight time
// pmst: -3, //saint pierre and miquelon standard time
// rott: -3, //rothera research station time
}

module.exports = {
  north: north,
  south: south
}
