const test = require('tape')
const spacetime = require('./lib')

const june = 1401660600207 //june 1, 6:10pm
const jan = 1515368004641 //january 7th, 6:30pm

test('toronto/Santiago same in june', (t) => {
  let a = spacetime(june, 'America/Toronto')
  t.equal(-4, a.timezone().current.offset, 'toronto -4')
  t.equal(true, a.timezone().current.isDST, 'toronto in dst')
  t.equal('North', a.hemisphere(), 'toronto in north')

  let b = spacetime(june, 'America/Santiago')
  t.equal(-4, b.timezone().current.offset, 'santiago -4')
  t.equal(false, b.timezone().current.isDST, 'santiago not dst')
  t.equal('South', b.hemisphere(), 'santiago in south')

  t.ok(a.format('nice'), b.format('nice'), 'same-calendar-time')
  t.end()
})

test('toronto/Santiago -2hrs in january', (t) => {
  let a = spacetime(jan, 'America/Toronto')
  t.equal(-5, a.timezone().current.offset, 'toronto -5')
  t.equal(false, a.timezone().current.isDST, 'toronto not dst')
  t.equal('North', a.hemisphere(), 'toronto in north')

  let b = spacetime(jan, 'America/Santiago')
  t.equal(-3, b.timezone().current.offset, 'santiago -3')
  t.equal(true, b.timezone().current.isDST, 'santiago is dst')
  t.equal('South', b.hemisphere(), 'santiago in south')
  t.notEqual(a.format('nice'), b.format('nice'), 'not same-calendar-time')
  t.end()
})

test('northern-hemisphere spring-ahead', (t) => {
  //regina is always -6, mexico city goes -5 in the summer (dst+1)
  //so both are -6 in january
  let jan1 = spacetime('January 21, 2017 20:42:00', 'America/Mexico_City')
  let jan2 = jan1.clone().goto('America/Regina')
  t.equal(jan1.format('nice'), jan2.format('nice'), 'same-calendar-time')
  t.equal(false, jan1.isDST(), 'Mexico_City-not-dst-in-january')
  t.equal(false, jan2.isDST(), 'Regina-never-dst')

  //not the same in september
  let sep1 = spacetime('September 21, 2017 20:42:00', 'America/Mexico_City')
  let sep2 = jan1.clone().goto('America/Regina')
  t.notEqual(sep1.format('nice'), sep2.format('nice'), 'not-same-calendar-time-anymore')
  t.equal(true, sep1.isDST(), 'Mexico_City-is-dst-in-sep')
  t.equal(false, sep2.isDST(), 'Regina-never-dst2')
  t.end()
})

test('southern-hemisphere spring-back', (t) => {
  //so both are -3 in january
  let jan1 = spacetime('January 21, 2017 20:42:00', 'America/Santiago')
  let jan2 = jan1.clone().goto('America/Cordoba')
  t.equal(jan1.epoch, jan2.epoch, 'same-time')
  t.equal(true, jan1.isDST(), 'Santiago-in-dst-in-january')
  t.equal(false, jan2.isDST(), 'argentina-never-dst')

  //but then, in may, santiago is -4 and argentina is still -3
  let jul1 = spacetime('May 21, 2017 20:42:00', 'America/Santiago')
  let jul2 = jul1.clone().goto('America/Cordoba')
  t.equal(20, jul1.hour(), 'not-same-time')
  t.equal(21, jul2.hour(), 'not-same-time')
  t.equal(false, jul1.isDST(), 'Santiago-not-dst-in-july')
  t.equal(false, jul2.isDST(), 'argentina-never-dst2')
  t.end()
})
