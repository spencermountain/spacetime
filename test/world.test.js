const test = require('tape')
const spacetime = require('./lib')
const useOldTz = require('./lib/useOldTz')

let timezones = [
  'Africa/Accra',
  'Europe/Jersey',
  'Asia/Ujung_Pandang',
  'Africa/Kinshasa',
  'Africa/Asmera',
  'Africa/Brazzaville',
  'Africa/Casablanca',
  'Asia/Ulaanbaatar',
  'Atlantic/Faroe',
  'Australia/Eucla',
  'Australia/Hobart',
  'Australia/Melbourne',
  'Brazil/West',
  'Canada/Atlantic',
  'Canada/Central',
  'Etc/GMT-7',
  'Etc/GMT-4',
  'Etc/Greenwich',
  'Europe/Amsterdam',
  'Europe/Bucharest',
  'Europe/Brussels',
  'Europe/Kaliningrad',
  'Europe/Sofia',
  'Indian/Comoro',
  'Indian/Reunion',
  'Pacific/Fiji',
  'Pacific/Nauru',
  'Pacific/Tongatapu',
  'Asia/Magadan',
  'Pacific/Yap'
]

test('epochs dont move on goto', (t) => {
  let a = spacetime('January 13 2018', 'Pacific/Fiji')
  timezones.forEach((tz) => {
    let b = a.clone()
    b = b.goto(tz)
    t.ok(a.isEqual(b), tz + ' stable epoch')
  })
  t.end()
})

test('is-always-input-date', (t) => {
  timezones.forEach((tz) => {
    let a = spacetime([2030, 3, 2], tz)
    t.equal(a.monthName(), 'april', tz + ' is april')
    t.equal(a.date(), 2, tz + ' 2nd')
    t.equal(a.year(), 2030, tz + ' is 2030')

    let b = spacetime(new Date(), tz)
    t.equal(b.timezone().name, tz, tz + ' is right tz')

    let c = spacetime('03/01/2015', tz)
    t.equal(c.monthName(), 'march', tz + ' is march')
    t.equal(c.date(), 1, tz + ' 1st')
    t.equal(c.year(), 2015, tz + ' is 2015')

    let d = spacetime('January 7 2018', tz)
    t.equal(d.monthName(), 'january', tz + ' is january')
    t.equal(d.date(), 7, tz + ' 7th')
    t.equal(d.year(), 2018, tz + ' is 2018')

    let e = spacetime('March 28, 1998', tz)
    t.equal(e.monthName(), 'march', tz + ' is march')
    t.equal(e.date(), 28, tz + ' 28th')
    t.equal(e.year(), 1998, tz + ' is 1998')
  })
  t.end()
})

test('all-timezones-move', (t) => {
  timezones.forEach((tz) => {
    let d = spacetime('January 13 2018', tz)
    d = useOldTz(d)
    t.equal(d.dayName(), 'saturday', tz + ' saturday')
    d = d.date(12)
    t.equal(d.dayName(), 'friday', tz + ' friday')
    d = d.day('saturday')
    t.equal(d.dayName(), 'saturday', tz + ' set-saturday')
    d = d.startOf('week')
    t.equal(d.dayName(), 'monday', tz + ' monday')
    d = d.endOf('week')
    t.equal(d.dayName(), 'sunday', tz + ' sunday')
  })
  t.end()
})

test('all-timezones-have-leap-years', (t) => {
  timezones.forEach((tz) => {
    let d = spacetime('February 28 2020', tz)
    d = d.time('11:30pm')
    d = d.add(1, 'hour')
    t.equal(d.format('nice'), 'Feb 29th, 12:30am', 'leap year in ' + tz)
  })
  t.end()
})
