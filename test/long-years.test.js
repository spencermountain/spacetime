const test = require('tape')
const spacetime = require('./lib')

test('get-decade', (t) => {
  let s = spacetime('Nov 2 2019', 'America/New_York')
  t.equal(s.decade(), 2010, '2010')
  s = spacetime('jan 1 2020')
  t.equal(s.decade(), 2020, '2020')

  s = spacetime('300BC', 'America/New_York')
  t.equal(s.decade(), -300, '-300th century?')

  s = spacetime('2AD')
  t.equal(s.decade(), 0, '0th decade')

  t.end()
})

test('set-decade', (t) => {
  let s = spacetime.now().year(2019)
  s.decade(1950)
  t.equal(s.year(), 2019, 'decade doesnt mutate')

  s = s.decade('1950')
  t.equal(s.year(), 1950, '1950 decade')
  s = s.decade('1950 AD')
  t.equal(s.year(), 1950, '1950 AD')
  s = s.decade('1860s')
  t.equal(s.year(), 1860, '1860s decade')
  s = s.decade(1954)
  t.equal(s.year(), 1950, 'round-down decade')
  s = s.decade('60s')
  t.equal(s.year(), 1960, '60s decade')
  // s = s.decade(50)
  // t.equal(s.year(), 50, '50 decade')
  // s = s.decade(0)
  // t.equal(s.year(), 1, '0th decade')
  s = s.decade(-50)
  t.equal(s.year(), -50, '-50 decade')
  s = s.decade(-1950)
  t.equal(s.year(), -1950, '-1950 decade')
  s = s.decade('1950bc')
  t.equal(s.year(), -1950, '1950bc decade')
  s = s.decade(-1954)
  t.equal(s.year(), -1960, '-round down negative')

  t.end()
})

test('get-century', (t) => {
  let s = spacetime('Nov 2 2019', 'America/New_York')
  t.equal(s.century(), 21, '21st century')

  s = spacetime('1892', 'America/New_York')
  t.equal(s.century(), 19, '19th century')

  s = spacetime('300BC', 'America/New_York')
  t.equal(s.century(), -4, '4rth century bc')

  s = spacetime('2AD', 'America/Chicago')
  t.equal(s.century(), 1, '1st century?')

  t.end()
})
test('set-century', (t) => {
  let s = spacetime('Nov 2 2019', 'America/New_York')
  s.century('2nd')
  t.equal(s.year(), 2019, 'doesnt mutate')

  s = s.century('21st')
  t.equal(s.year(), 2000, '21st century')
  s = s.century(20)
  t.equal(s.year(), 1900, '20 century')
  s = s.century('19th c')
  t.equal(s.year(), 1800, '19th c')
  s = s.century('17c')
  t.equal(s.year(), 1600, '17c')

  // s = s.century('1')
  // t.equal(s.year(), 1, '1 century')
  // s = s.century('-100')
  // t.equal(s.year(), 100, '1 century bc')
  s = s.century(-20)
  t.equal(s.year(), -1900, '20 century bc is -1990')

  t.end()
})

test('get-millenium', (t) => {
  let s = spacetime('Nov 2 2019', 'America/New_York')
  t.equal(s.millenium(), 3, '3rd millenium')
  s = spacetime('Nov 2 1219', 'America/New_York')
  t.equal(s.millenium(), 2, '2nd millenium')
  s = spacetime('83AD', 'America/New_York')
  t.equal(s.millenium(), 1, '1st millenium')
  s = spacetime('83BC', 'America/New_York')
  t.equal(s.millenium(), -1, '-1 millenium')
  s = spacetime('1218BC', 'America/New_York')
  t.equal(s.millenium(), -2, '-2 millenium')
  s = spacetime('2018BC', 'America/New_York')
  t.equal(s.millenium(), -3, '-3 millenium')
  t.end()
})

test('set-millenium', (t) => {
  let s = spacetime.now().year(2019)
  s.millenium('2nd')
  t.equal(s.year(), 2019, 'millenium doesnt mutate')

  s = s.millenium('3rd')
  t.equal(s.year(), 2000, 'millenium year 2000')
  s = s.millenium('2')
  t.equal(s.year(), 1000, 'millenium year 1000')

  s = s.millenium('1st')
  t.equal(s.year(), 1, 'millenium year 1')
  s = s.millenium(1)
  t.equal(s.year(), 1, 'millenium year 1')
  t.end()
})
