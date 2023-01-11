import test from 'tape'
import { getYear } from '../../src/compute/_lib/yearStart.js'
import misc from './times/misc.js'
import vancouver2023 from './times/vancouver-2021.js'
import adelaide2021 from './times/adelaide-2023.js'
import jan1s from './times/jan-1s.js'
import spacetime from '../../src/index.js'

test('get Year - misc', (t) => {
  misc.forEach(a => {
    let [epoch, iso, tz] = a
    // which year is the epoch in?
    let { year, start } = getYear(epoch, tz)
    let want = Number(iso.substring(0, 4))
    t.equal(year, want, `[year] ${tz} - ${iso}`)

    // is the epoch-start of the year correct?
    let str = spacetime(start, tz).format('{year}-{month-pad}-{date-pad}')
    t.equal(str, `${year}-01-01`, `[iso-start] ${tz} - ${iso}`)
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
    t.equal(str, `${year}-01-01`, `[iso-start] ${tz} - ${iso}`)
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
    t.equal(str, `${year}-01-01`, `[iso-start] ${tz} - ${iso}`)
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
      t.equal(str, `${year}-01-01`, `[iso-start] ${want} ${tz}`)
    }
  })
  t.end()
})
