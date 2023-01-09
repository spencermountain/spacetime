import test from 'tape'
import spacetime from '../index.js'
import { getStart } from '../../newer/compute/_lib/yearStart.js'

test('random jan 1 epochs', (t) => {
  let arr = [
    [2043, "Europe/Jersey", 2303683200000],
    [2066, "Asia/Aden", 3029518800000],
    [2047, "America/Regina", 2398399200000],
    [2063, "Asia/Aqtobe", 2934817200000],
    [2032, "Asia/Tokyo", 1956495600000],
    [1973, "America/Glace_Bay", 94708800000],
    [2041, "Asia/Bishkek", 2240589600000],
    [1999, "Europe/Tirane", 915145200000],
    [2075, "Asia/Phnom_Penh", 3313501200000],
    [2014, "America/Antigua", 1388548800000],
    [1950, "Asia/Ust-nera", -631184400000],
    [1957, "America/Anguilla", -410212800000],
    [2022, "Africa/Brazzaville", 1640991600000],
    [2014, "America/Caracas", 1388550600000],
    [2057, "Pacific/Tarawa", 2745489600000],
    [2062, "America/North_Dakota/New_Salem", 2871784800000],
    [2089, "Asia/Kuwait", 3755365200000],
    [2005, "Europe/Kiev", 1104530400000],
    [2042, "Asia/Kamchatka", 2272104000000],
    [2042, "Pacific/Apia", 2272100400000]
  ]
  arr.forEach(a => {
    let [year, tz, epoch] = a

    let n = getStart(year, tz)
    t.equal(n, epoch, `year-start ${year} ${tz}`)

    // let s = spacetime(n, tz)
    // console.log(s.iso())
    // let str = spacetime(epoch, tz).iso()
    // t.equal(str, iso, iso)
  })

  t.end()
})