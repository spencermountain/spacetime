let test = require('tape')
const spacetime = require('spacetime')
const daylight = require('../src')
spacetime.extend(daylight)

let winters = [
  // these are from timeanddate.com
  // [1971, 'Dec 22 1971 7:23am'],
  // [1982, 'Dec 21 1982 11:38pm'],
  // [1988, 'Dec 21 1988 10:27am'],
  [1993, 'Dec 21 1993 3:25pm'],
  [2000, 'Dec 21 2000 8:37am'],
  [2006, 'Dec 21 2006 7:22pm'],
  [2019, 'Dec 21 2019 11:19pm'],
  [2020, 'Dec 21 2020 5:02am'],
  [2030, 'Dec 21 2030 3:09pm'],
  [2043, 'Dec 21 2043 7:01pm'],
  [2047, 'Dec 21 2047 6:07pm'],

  // these are from spacetime
  [1998, 'dec 21st 1998 8:20pm'],
  [1999, 'dec 22nd 1999 2:11am'],
  [2000, 'dec 21st 2000 8:02am'],
  [2001, 'dec 21st 2001 1:53pm'],
  [2002, 'dec 21st 2002 7:44pm'],
  [2003, 'dec 22nd 2003 1:35am'],
  [2004, 'dec 21st 2004 7:26am'],
  [2005, 'dec 21st 2005 1:17pm'],
  [2013, 'dec 21st 2013 12:05pm'],
  [2014, 'dec 21st 2014 5:56pm'],
  [2016, 'dec 21st 2016 5:38am'],
  [2017, 'dec 21st 2017 11:29am'],
  [2018, 'dec 21st 2018 5:20pm'],
  [2019, 'dec 21st 2019 11:11pm'],
  [2020, 'dec 21st 2020 5:02am'],
  [2021, 'dec 21st 2021 10:53am'],
  [2022, 'dec 21st 2022 4:44pm'],
  [2023, 'dec 21st 2023 10:35pm'],
  [2024, 'dec 21st 2024 4:26am'],
  [2025, 'dec 21st 2025 10:17am'],
]
test('winter solstices', function (t) {
  winters.forEach((a) => {
    let s = spacetime('march 2 ' + String(a[0]))
    let have = s.winterSolstice()
    let want = spacetime(a[1])
    // console.log(have.diff(want, 'minute'))
    t.ok(have.isSame(want, 'hour'), a[1])
  })
  t.end()
})

let summers = [
  // [2007, 'Jun 21 2007 2:06pm'],
  // [1988, 'Jun 20 1988 11:56pm'],
  // [1999, 'Jun 21 1999 3:49pm'],
  // [1995, 'Jun 21 1995 4:34pm'],
  [2019, 'Jun 21 2019 11:54am'],
  [2015, 'Jun 21 2015 12:37pm'],
  [2021, 'Jun 20 2021 11:32pm'],
  // [2024, 'Jun 20 2024 4:50pm'],
]
test('summer solstices', function (t) {
  summers.forEach((a) => {
    let s = spacetime('march 2 ' + String(a[0]))
    let have = s.summerSolstice()
    let want = spacetime(a[1])
    // console.log(have.diff(want, 'minute'))
    t.ok(have.isSame(want, 'hour'), a[1])
  })
  t.end()
})
