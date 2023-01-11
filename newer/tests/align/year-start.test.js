import test from 'tape'
import { getStart } from '../../src/compute/_lib/yearStart.js'


test('paris jan 1st epochs', (t) => {
  let tz = "Europe/Paris"
  let paris = [
    -63162000000, -31539600000, -3600000, 31532400000, 63068400000, 94690800000, 126226800000, 157762800000, 189298800000, 220921200000, 252457200000, 283993200000, 315529200000, 347151600000, 378687600000, 410223600000, 441759600000, 473382000000, 504918000000, 536454000000,
    567990000000, 599612400000, 631148400000, 662684400000, 694220400000, 725842800000, 757378800000, 788914800000, 820450800000, 852073200000, 883609200000, 915145200000, 946681200000, 978303600000, 1009839600000, 1041375600000, 1072911600000, 1104534000000, 1136070000000, 1167606000000,
    1199142000000, 1230764400000, 1262300400000, 1293836400000, 1325372400000, 1356994800000, 1388530800000, 1420066800000, 1451602800000, 1483225200000, 1514761200000, 1546297200000, 1577833200000, 1609455600000, 1640991600000, 1672527600000, 1704063600000, 1735686000000, 1767222000000, 1798758000000, 1830294000000, 1861916400000
  ]
  for (let i = 0; i < paris.length; i += 1) {
    let year = 1968 + i
    let epoch = getStart(year, tz)
    t.equal(epoch, paris[i], `paris ${year}`)
    // let iso = spacetime(paris[i]).format('{iso-short}')
    // t.equal(iso, `${year}-01-01`, `paris iso ${year}`)
  }
  t.end()
})

test('vancouver jan 1st epochs', (t) => {
  let vancouver = [
    -63129600000, -31507200000, 28800000, 31564800000, 63100800000, 94723200000, 126259200000, 157795200000, 189331200000, 220953600000, 252489600000, 284025600000, 315561600000, 347184000000, 378720000000, 410256000000,
    441792000000, 473414400000, 504950400000, 536486400000, 568022400000, 599644800000, 631180800000, 662716800000, 694252800000, 725875200000, 757411200000, 788947200000, 820483200000, 852105600000, 883641600000, 915177600000,
    946713600000, 978336000000, 1009872000000, 1041408000000, 1072944000000, 1104566400000, 1136102400000, 1167638400000, 1199174400000, 1230796800000, 1262332800000, 1293868800000, 1325404800000, 1357027200000, 1388563200000, 1420099200000,
    1451635200000, 1483257600000, 1514793600000, 1546329600000, 1577865600000, 1609488000000, 1641024000000, 1672560000000, 1704096000000, 1735718400000, 1767254400000, 1798790400000, 1830326400000, 1861948800000
  ]
  for (let i = 0; i < vancouver.length; i += 1) {
    let year = 1968 + i
    let epoch = getStart(year, "America/Vancouver")
    t.equal(epoch, vancouver[i], `vancouver ${year}`)
  }
  t.end()
})
test('Cambodia jan 1st epochs', (t) => {
  let arr = [
    -63183600000, -31561200000, -25200000, 31510800000, 63046800000, 94669200000, 126205200000, 157741200000, 189277200000, 220899600000, 252435600000, 283971600000,
    315507600000, 347130000000, 378666000000, 410202000000, 441738000000, 473360400000, 504896400000, 536432400000, 567968400000, 599590800000, 631126800000, 662662800000,
    694198800000, 725821200000, 757357200000, 788893200000, 820429200000, 852051600000, 883587600000, 915123600000, 946659600000, 978282000000, 1009818000000, 1041354000000,
    1072890000000, 1104512400000, 1136048400000, 1167584400000, 1199120400000, 1230742800000, 1262278800000, 1293814800000, 1325350800000, 1356973200000, 1388509200000, 1420045200000,
    1451581200000, 1483203600000, 1514739600000, 1546275600000, 1577811600000, 1609434000000, 1640970000000, 1672506000000, 1704042000000, 1735664400000, 1767200400000, 1798736400000, 1830272400000, 1861894800000
  ]
  for (let i = 0; i < arr.length; i += 1) {
    let year = 1968 + i
    let epoch = getStart(year, "Asia/Phnom_Penh")
    t.equal(epoch, arr[i], `Cambodia ${year}`)
  }
  t.end()
})

test('new zealand jan 1st epochs', (t) => {
  let arr = [
    157719600000, 189255600000, 220878000000, 252414000000, 283950000000, 315486000000, 347108400000, 378644400000, 410180400000,
    441716400000, 473338800000, 504874800000, 536410800000, 567946800000, 599569200000, 631105200000, 662641200000,
    694177200000, 725799600000, 757335600000, 788871600000, 820407600000, 852030000000, 883566000000, 915102000000,
    946638000000, 978260400000, 1009796400000, 1041332400000, 1072868400000, 1104490800000, 1136026800000, 1167562800000,
    1199098800000, 1230721200000, 1262257200000, 1293793200000, 1325329200000, 1356951600000, 1388487600000, 1420023600000,
    1451559600000, 1483182000000, 1514718000000, 1546254000000, 1577790000000, 1609412400000, 1640948400000, 1672484400000,
    1704020400000, 1735642800000, 1767178800000, 1798714800000, 1830250800000, 1861873200000
  ]
  for (let i = 0; i < arr.length; i += 1) {
    let year = 1975 + i
    let epoch = getStart(year, "Pacific/Auckland")
    t.equal(epoch, arr[i], `auckland ${year}`)
  }
  t.end()
})


test('random jan 1st epochs', (t) => {
  let arr = [
    [2027, "Asia/Phnom_Penh", 1798736400000],
    [2028, "Asia/Phnom_Penh", 1830272400000],
    [2029, "Asia/Phnom_Penh", 1861894800000],
    [2033, "America/Hermosillo", 1988175600000],
    [2035, "America/Buenos_Aires", 2051233200000],
    [2036, "Africa/Monrovia", 2082758400000],
    [2026, "Asia/Ust-nera", 1767189600000],
    [2023, "America/Bahia", 1672542000000],
    [2032, "America/Denver", 1956553200000],
    [2028, "Atlantic/Azores", 1830301200000],
    [2029, "America/Edmonton", 1861945200000],
    [2036, "America/Port-au-prince", 2082776400000],
    [2023, "Africa/Ouagadougou", 1672531200000],
    [2036, "Europe/Skopje", 2082754800000],
    [2034, "Australia/Eucla", 2019654900000],
    [2025, "Africa/Lubumbashi", 1735682400000],
    [2025, "Pacific/Fiji", 1735642800000],
    [2029, "America/Swift_Current", 1861941600000],
    [2035, "Pacific/Funafuti", 2051179200000],
    [2032, "Asia/Manila", 1956499200000],
    [2037, "America/Hermosillo", 2114406000000],
    [2029, "Asia/Brunei", 1861891200000],
    [2029, "Africa/Khartoum", 1861912800000],
    [2037, "Europe/Moscow", 2114370000000],
    [2033, "Europe/Bucharest", 1988143200000],
    [2035, "Asia/Tehran", 2051209800000],
    [2034, "Europe/Dublin", 2019686400000],
    [2025, "Atlantic/Azores", 1735693200000],
    [2035, "America/Punta_Arenas", 2051233200000],
    [2037, "Pacific/Rarotonga", 2114416800000],
    [2035, "Africa/Cairo", 2051215200000],
    [2023, "America/Toronto", 1672549200000],
    [2035, "Asia/Aqtobe", 2051204400000],
    [2036, "Europe/Zaporozhye", 2082751200000],
    [2027, "America/Maceio", 1798772400000],
    [2037, "Africa/Brazzaville", 2114377200000],
    [2032, "America/St_Barthelemy", 1956542400000],
    [2024, "America/Miquelon", 1704078000000],
    [2025, "Europe/Isle_Of_Man", 1735689600000],
    [2033, "America/Yellowknife", 1988175600000],
    [2032, "America/Montserrat", 1956542400000],
    [2023, "America/Jujuy", 1672542000000],
    [2035, "Asia/Chita", 2051190000000],
    [2023, "Pacific/Rarotonga", 1672567200000],
    [2024, "America/Dominica", 1704081600000],
    [2025, "Europe/Kaliningrad", 1735682400000],
    [2028, "Pacific/Tongatapu", 1830250800000],
    [2032, "Pacific/Kosrae", 1956488400000],
    [2034, "Africa/Porto-novo", 2019682800000],
    [2031, "Africa/Gaborone", 1924984800000],
    [2033, "Asia/Omsk", 1988128800000],
    [2029, "Europe/Riga", 1861912800000],
    [2034, "Pacific/Kanton", 2019639600000],
    [2028, "America/Matamoros", 1830319200000],
    [2036, "Europe/Moscow", 2082747600000],
    [2034, "Europe/San_Marino", 2019682800000],
    [2031, "Europe/Luxembourg", 1924988400000],
    [2032, "Asia/Kuwait", 1956517200000],
    [2030, "America/Kralendijk", 1893470400000],
    [2037, "Antarctica/Rothera", 2114391600000],
    [2025, "America/Blanc-sablon", 1735704000000],
    [2029, "America/Cayenne", 1861930800000],
    [2033, "Asia/Tashkent", 1988132400000],
    [2033, "America/St_Lucia", 1988164800000],
    [2031, "Asia/Damascus", 1924984800000],
    [1951, "America/Vancouver", -599587200000],
    [2001, "Europe/Warsaw", 978303600000],
    [1968, "America/Nuuk", -63147600000],
    [1991, "Indian/Comoro", 662677200000],
    [1959, "America/Menominee", -347133600000],
    [1981, "Asia/Kolkata", 347135400000],
    [1978, "Indian/Kerguelen", 252442800000],
    [1950, "Asia/Baghdad", -631162800000],
    [1991, "Europe/Kaliningrad", 662680800000],
    [2006, "Australia/Brisbane", 1136037600000],
    [1927, "Australia/Lindeman", -1357034400000],
    [1973, "America/Rio_Branco", 94712400000],
    [2007, "Africa/Nairobi", 1167598800000],
    [1933, "America/El_Salvador", -1167588000000],
    [1959, "Europe/Amsterdam", -347158800000],
    [1942, "Indian/Cocos", -883636200000],
    [1941, "America/Argentina/La_Rioja", -915138000000],
    [2021, "America/St_Kitts", 1609473600000],
    [2003, "America/Ojinaga", 1041404400000],
    [1987, "Africa/Dar_Es_Salaam", 536446800000],
    [1921, "America/Montserrat", -1546286400000],
    [1963, "America/Dominica", -220910400000],
    [2013, "Indian/Comoro", 1356987600000],
    [1978, "Australia/Eucla", 252429300000],
    [1987, "Asia/Baku", 536443200000],
    [1954, "America/Campo_Grande", -504907200000],
    [1963, "America/Argentina/Tucuman", -220914000000],
    [2000, "America/Buenos_Aires", 946695600000],
    [2018, "Asia/Jayapura", 1514732400000],
    [2011, "Africa/Sao_Tome", 1293840000000],
    [1955, "America/Anguilla", -473371200000],
    [1956, "Asia/Manila", -441878400000],
    [2023, "Asia/Ulaanbaatar", 1672502400000],
    [1995, "Asia/Beirut", 788911200000],
    [1974, "Africa/Cairo", 126223200000],
    [1955, "Arctic/Longyearbyen", -473389200000],
    [1987, "Atlantic/South_Georgia", 536464800000],
    [1982, "Pacific/Wallis", 378648000000],
    [1929, "Africa/Blantyre", -1293847200000],
    [1946, "America/Tortola", -757368000000],
    [2007, "Asia/Kuwait", 1167598800000],
    [2025, "America/Indiana/Knox", 1735711200000],
    [1985, "Africa/Nouakchott", 473385600000],
    [2025, "Asia/Jakarta", 1735664400000],
    [2024, "America/Argentina/La_Rioja", 1704078000000],
    [2021, "Africa/Libreville", 1609455600000],
    [1947, "America/Tegucigalpa", -725824800000],
    [1973, "Pacific/Majuro", 94651200000],
    [2005, "America/Lima", 1104555600000],
    [2020, "Australia/Broken_Hill", 1577799000000],
    [2020, "Pacific/Galapagos", 1577858400000],
    [2020, "Asia/Tehran", 1577824200000],
    [2020, "America/Managua", 1577858400000],
    [2023, "Atlantic/Stanley", 1672542000000],
    [2022, "Australia/Sydney", 1640955600000],
    [2022, "Asia/Kamchatka", 1640952000000],
    [2021, "Asia/Amman", 1609452000000],
    [2022, "Asia/Urumqi", 1640973600000],
    [2023, "Indian/Mayotte", 1672520400000],
    [2021, "Asia/Riyadh", 1609448400000],
    [2020, "America/Yakutat", 1577869200000],
    [2020, "America/Guayaquil", 1577854800000],
    [2022, "America/Jujuy", 1641006000000],
    [2021, "Asia/Tashkent", 1609441200000],
    [2021, "America/Mexico_City", 1609480800000],
    [2022, "America/Dawson_Creek", 1641020400000],
    [2023, "America/Aruba", 1672545600000],
    [2023, "Europe/Bucharest", 1672524000000],
    [2020, "Asia/Pontianak", 1577811600000],
    [2022, "America/Pangnirtung", 1641013200000],
    [2023, "Antarctica/Syowa", 1672520400000],
    [2022, "Africa/Monrovia", 1640995200000],
    [2021, "Europe/Minsk", 1609448400000],
    [2020, "America/Aruba", 1577851200000],
    [2023, "America/Tijuana", 1672560000000],
    [2023, "Asia/Samarkand", 1672513200000],
    [2020, "Pacific/Kanton", 1577790000000],
    [2020, "Europe/Brussels", 1577833200000],
    [2023, "America/St_Thomas", 1672545600000],
    [2022, "America/Buenos_Aires", 1641006000000],
    [2020, "Pacific/Wake", 1577793600000],
    [2023, "Africa/Mogadishu", 1672520400000],
    [2020, "America/Argentina/Rio_Gallegos", 1577847600000],
    [2021, "America/Yakutat", 1609491600000],
    [2020, "America/Creston", 1577862000000],
    [2023, "America/Indiana/Petersburg", 1672549200000],
    [2021, "Asia/Amman", 1609452000000],
    [2022, "Antarctica/Davis", 1640970000000],
    [2022, "Asia/Pyongyang", 1640962800000],
    [2023, "Antarctica/Palmer", 1672542000000],
    [2021, "Europe/Lisbon", 1609459200000],
    [2020, "Asia/Dhaka", 1577815200000],
    [2023, "Australia/Eucla", 1672499700000],
    [2023, "America/Regina", 1672552800000],
    [2022, "America/Yakutat", 1641027600000],
    [2023, "America/Atikokan", 1672549200000],
    [2022, "America/St_Kitts", 1641009600000],
    [2020, "America/Dominica", 1577851200000],
    [2020, "America/St_Thomas", 1577851200000],
    [2022, "Pacific/Efate", 1640955600000],
    [2021, "Atlantic/Stanley", 1609470000000],
    [2023, "America/Matamoros", 1672552800000],
    [2020, "Pacific/Chuuk", 1577800800000],
    [2020, "Africa/Djibouti", 1577826000000],
    [2021, "Atlantic/South_Georgia", 1609466400000],
    [2022, "Indian/Mahe", 1640980800000],
    [2023, "Europe/Berlin", 1672527600000],
    [2023, "Africa/Maseru", 1672524000000],
    [2021, "America/Nuuk", 1609470000000],
    // pre-1970
    [1967, "Asia/Dhaka", -94716000000],
    [1969, "America/Jujuy", -31525200000],
    [1961, "Asia/Kuwait", -284007600000],
    [1962, "America/Moncton", -252446400000],
    [1962, "America/Phoenix", -252435600000],
    [1961, "America/Port-au-prince", -283978800000],
    [1964, "Europe/Lisbon", -189388800000],
    [1968, "America/Argentina/San_Luis", -63147600000],
    [1964, "America/Tegucigalpa", -189367200000],
    [1966, "America/Resolute", -126208800000],
    [1969, "America/Cayman", -31518000000],
    [1969, "Pacific/Midway", -31496400000],
    [1968, "Africa/Lubumbashi", -63165600000],
    [1965, "America/Puerto_Rico", -157752000000],
    [1968, "America/St_Kitts", -63144000000],
    [1969, "America/Bogota", -31518000000],
    [1967, "Asia/Colombo", -94714200000],
    [1963, "America/Argentina/San_Luis", -220914000000],
    [1966, "Antarctica/Vostok", -126252000000],
    [1960, "America/Matamoros", -315597600000],
    [1960, "Africa/Accra", -315619200000],
    [1963, "America/St_Thomas", -220910400000],
    [1967, "Africa/Brazzaville", -94698000000],
    [1962, "America/Anguilla", -252446400000],
    [1960, "America/Eirunepe", -315601200000],
    [1967, "America/Barbados", -94680000000],
    [1960, "America/Argentina/Salta", -315608400000],
    [1965, "America/Monterrey", -157744800000],
    [1967, "Asia/Krasnoyarsk", -94719600000],
    [1964, "Europe/Gibraltar", -189392400000],
    [1969, "Asia/Tokyo", -31568400000],
    [1967, "America/Kralendijk", -94680000000],
    [1969, "Europe/Bucharest", -31543200000],
    [1966, "America/Guayaquil", -126212400000],
    [1965, "Europe/Amsterdam", -157770000000],
    [1965, "Africa/Asmara", -157777200000],
    [1964, "America/Argentina/San_Juan", -189378000000],
    [1960, "Africa/Lome", -315619200000],
    [1967, "America/Merida", -94672800000],
    [1965, "Africa/Harare", -157773600000],
    [1963, "America/Tegucigalpa", -220903200000],
    [1968, "Asia/Barnaul", -63183600000],
    [1965, "America/St_Kitts", -157752000000],
    [1967, "Africa/Lagos", -94698000000],
    [1968, "Africa/Brazzaville", -63162000000],
    [1966, "Atlantic/Canary", -126230400000]
  ]

  arr.forEach(a => {
    let [year, tz, epoch] = a

    let n = getStart(year, tz)
    t.equal(n, epoch, `year-start ${year} ${tz}`)

    // let iso = spacetime(epoch, tz).format('iso-short')
    // t.equal(iso, `${year}-01-01`, `iso ${year} ${tz}`)

  })

  t.end()
})