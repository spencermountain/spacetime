import test from 'tape'
import spacetime from './lib/index.js'

test('first week', (t) => {
  let arr = [
    { "year": 2019, "w1": "2018-12-31" },
    { "year": 2020, "w1": "2019-12-30" },
    { "year": 2021, "w1": "2021-01-04" },
    { "year": 2022, "w1": "2022-01-03" },
    { "year": 2023, "w1": "2023-01-02" },
    { "year": 2024, "w1": "2024-01-01", "leap": true },
    { "year": 2025, "w1": "2024-12-30" },
    { "year": 2026, "w1": "2025-12-29" },
    { "year": 2027, "w1": "2027-01-04" },
    { "year": 2028, "w1": "2028-01-03", "leap": true },
    { "year": 2029, "w1": "2029-01-01" },
    { "year": 2030, "w1": "2029-12-31" },
    { "year": 2031, "w1": "2030-12-30" },
    { "year": 2032, "w1": "2031-12-29", "leap": true },
    { "year": 2033, "w1": "2033-01-03" },
    { "year": 2034, "w1": "2034-01-02" },
    { "year": 2035, "w1": "2035-01-01" },
    { "year": 2036, "w1": "2035-12-31", "leap": true },
    { "year": 2037, "w1": "2036-12-29" },
    { "year": 2038, "w1": "2038-01-04" },
    { "year": 2039, "w1": "2039-01-03" },
    { "year": 2040, "w1": "2040-01-02", "leap": true }
  ]
  arr.forEach(obj => {
    let s = spacetime(`${obj.year}-01-01`);
    s = s.week(1)//first week
    t.equal(s.format('iso-short'), obj.w1, obj.year + ' first-week')
  })
  t.end()
})

test('jan 1 is always first week', (t) => {
  for (let year = 1950; year < 2070; year += 1) {
    let s = spacetime(`${year}-01-01`);
    t.equal(year, s.year(), year + ' year')
    t.equal(s.week(), 1, year + ' week')
  }
  t.end()
})


test('week input=output more-years', (t) => {
  let years = [2024, 2025, 2026, 1984, 1999, 2018, 2022]
  years.forEach((year) => {
    for (let w = 1; w < 52; w += 1) {
      const date = spacetime.now().year(year).week(w);
      t.equal(date.week(), w, `year ${year}, week ${w}`)
    }
  })
  t.end()
})

test('week input=output current-uear', (t) => {
  for (let w = 1; w < 52; w += 1) {
    const date = spacetime.now().week(w);
    t.equal(date.week(), w, `week ${w}`)
  }

  let tz = 'africa/addis_ababa'
  for (let w = 1; w < 52; w += 1) {
    const date = spacetime.now(tz).week(w);
    t.equal(date.week(), w, `${tz} week ${w}`)
  }
  tz = 'america/chicago'
  for (let w = 1; w < 52; w += 1) {
    const date = spacetime.now(tz).week(w);
    t.equal(date.week(), w, `${tz} week ${w}`)
  }
  t.end()
})


test('week 1 stays week 1', (t) => {
  let isos = [
    '2014-12-29',//monday
    '2014-12-30',//tues
    '2014-12-31',//wed
    '2014-01-01',//thurs
    // '2014-01-02',//fri
    // '2014-01-03',//sat
    // '2014-01-04',//sun
  ]
  isos.forEach(iso => {
    let s = spacetime(iso)
    t.equal(s.week(), 1, 'init wk1' + iso)
    s = s.week(1)//set it as same week
    t.equal(s.week(), 1, 'still wk1' + iso)
    t.equal(s.year(), 2014, 'still year ' + iso)
    t.equal(s.format('iso-short'), iso, 'same-day ' + iso)
  })
  t.end()
})