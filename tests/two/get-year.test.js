import test from 'tape'
import { getYear } from '../../src/01-one/compute/_lib/yearStart.js'
import spacetime from './_lib.js'
import { misc, vancouver2023, karachi2011, adelaide2021, panama1980, jan1s } from './times/index.js'

test('get Year - misc', (t) => {
  misc.forEach(a => {
    let [epoch, iso, tz] = a
    // which year is the epoch in?
    let { year, start } = getYear(epoch, tz)
    let want = Number(iso.substring(0, 4))
    t.equal(year, want, `[year] ${tz} - ${iso}`)

    // is the epoch-start of the year correct?
    let str = spacetime(start, tz).format('{year}-{month-pad}-{date-pad}')
    t.equal(str, `${year}-01-01`, `[year-start-misc] ${tz} - ${iso}`)
  })
  t.end()
})

test('get Year - vancouver 2023', (t) => {
  vancouver2023.forEach(a => {
    let [epoch, iso, tz] = a
    // which year is the epoch in?
    let { year, start } = getYear(epoch, tz)
    let want = Number(iso.substring(0, 4))
    t.equal(year, want, `[year] ${tz} - ${iso}`)

    // is the epoch-start of the year correct?
    let str = spacetime(start, tz).format('{year}-{month-pad}-{date-pad}')
    t.equal(str, `${year}-01-01`, `[year-start-van] ${tz} - ${iso}`)
  })
  t.end()
})

test('get Year - adelaide2021 2021', (t) => {
  adelaide2021.forEach(a => {
    let [epoch, iso, tz] = a
    // which year is the epoch in?
    let { year, start } = getYear(epoch, tz)
    let want = Number(iso.substring(0, 4))
    t.equal(year, want, `[year] ${tz} - ${iso}`)

    // is the epoch-start of the year correct?
    let str = spacetime(start, tz).format('{year}-{month-pad}-{date-pad}')
    t.equal(str, `${year}-01-01`, `[year-start-aus] ${tz} - ${iso}`)
  })
  t.end()
})

test('get Year - jan1s', (t) => {
  jan1s.forEach(a => {
    let [want, tz, epoch] = a
    // skip anything really old (for now)
    if (want > 1970) {
      let { year } = getYear(epoch, tz)
      t.equal(year, want, `[year] ${want} ${tz} `)
      // is the epoch-start of the year correct?
      let str = spacetime(epoch, tz).format('{year}-{month-pad}-{date-pad}')
      t.equal(str, `${year}-01-01`, `[year-start-jan1s] ${want} ${tz}`)
    }
  })
  t.end()
})
