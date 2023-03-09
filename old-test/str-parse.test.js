import test from 'tape'
import spacetime from './_lib.js'

test('string-parse', (t) => {
  let today = {
    year: 2012,
    month: 2,
    date: 8,
    hour: 9
  }
  let arr = [
    ['Sun Mar 14 15:09:48 1999', 'March 14 1999 3:09:48pm'],
    ['Tue Mar 16 21:49', 'Tues Mar 16 9:49pm'],
    ['Sun Mar 14 15:09:48 +0000 2012', 'March 14 15:09:48 GMT'],
    // dmy
    ['2 February 2003', '2003-02-02'],
    ['08 February 1986', '1986-02-08'],
    ["8th February '86", '1986-02-08'],
    ['5th feb 2002', '2002-02-05'],
    ['5 february 2002', '2002-02-05'],
    ['5-february-2002', '2002-02-05'],
    ['5-feb-2002', '2002-02-05'],
    ['5.feb.2002', '2002-02-05'],
    // mdy
    ['feb.5.2002', '2002-02-05'],
    ['feb 5th 2002', '2002-02-05'],
    ["feb 5th '02", '2002-02-05'],
    ["february 5 '02", '2002-02-05'],
    ['feb-5-2002', '2002-02-05'],
    ['april.5.2002', '2002-04-05'],
    ['feb/5/2002', '2002-02-05'],
    ['february-05-2002', '2002-02-05'],
    // ymd
    ['2002.03.20', "march 20th '02"],
    ['2002-03-20', 'march 20 2002'],
    ['2002/03/20', 'march 20th 2002'],
    ['2002 03 20', 'mar 20 2002'],
    ['2002-mar-20', '20 march 2002'],
    ['2002.mar.20', 'march 20th 2002'],
    ['2002/mar/20', 'march 20th 2002'],
    ['2002 mar 20', 'march 20th 2002'],
    // times
    ['1 january 2020 2pm', '2020-01-01 2pm'],
    ['5-feb-2002 2pm', '2002-02-05 2:00pm'],
    ['5.feb.2002 14:00', '2002-02-05 2:00pm'],
    ['feb.5.2002 2:30pm', '2002-02-05 2:30pm'],
    ['2002.feb.5 14:00:00', '2002-02-05 2:00pm'],
    // millisecond varieties
    ['2021-11-02T19:55:30.087+01', '2021-11-02T19:55:30.087+01'],//leading zero
    ['2021-11-02T19:55:30.0872+01', '2021-11-02T19:55:30.087+01'],//4 digits
    ['2021-11-02T19:55:30.00872+01', '2021-11-02T19:55:30.008+01'],//5 digits
    ['2021-11-02T19:55:30.008722+01', '2021-11-02T19:55:30.008+01'],//6 digits
    ['2021-11-02T19:55:30.9898989+01', '2021-11-02T19:55:30.989+01'],//lots
  ]
  arr.forEach((a) => {
    let left = spacetime(a[0], null, { today })
    let right = spacetime(a[1], null, { today })
    t.equal(left.iso(), right.iso(), a[0])
  })
  t.end()
})