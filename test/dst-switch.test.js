const test = require('tape')
const spacetime = require('./lib')

//local time of fall dst change-over
const getDstChange = (dstChange) => {
  let fall = dstChange.split('->')[1]
  const [month, rest] = fall.split('/')
  const [day, hour] = rest.split(':')
  return {
    year: new Date().getFullYear(),
    month: Number(month) - 1, //
    date: Number(day),
    hour: Number(hour),
    minute: 2
  }
}

test('increment-to-dst-fall-change', (t) => {
  // some northern hemisphere zones with dst changes
  let arr = [
    'europe/london',
    'europe/ljubljana',
    'europe/kiev',
    'europe/vilnius',
    'atlantic/madeira',
    'america/thunder_bay',
    'america/nassau',
    'asia/famagusta',
    'asia/beirut',
    'america/indianapolis'
    // working:
    // 10/25:02   1hrs
    // 10/25:03   2hrs
    // 10/25:04   3hrs
    // 10/25:04   3hrs
    // 10/25:02   1hrs
    // 11/01:02   -4hrs
    // 11/01:02   -4hrs
    // 10/25:04   3hrs
    // 10/24:24   3hrs
    // 11/01:02   -4hrs

    // not working

    // 'asia/damascus' //10/29:24  3hrs
    // 'america/tijuana' //11/01:02  -7hrs
    // 'mexico/bajanorte' //11/01:02  -7hrs

    // 1am changes
    // 'america/havana',
    // 'america/indiana',
    // 'america/kentucky',
    // 'america/north_dakota',
    // 'america/scoresbysund',
    // 'asia/amman',
    // 'asia/gaza',
    // 'asia/hebron',
    // 'atlantic/azores'
    // 11/01:01    -4hrs
    // 11/05:01    -4hrs
    // 11/05:01    -4hrs
    // 11/05:01    -5hrs
    // 10/25:01    0hrs
    // 10/30:01    3hrs
    // 10/31:01    3hrs
    // 10/31:01    3hrs
    // 10/25:01    0hrs
  ]
  arr.forEach((tz) => {
    // get fall dst change
    let dstStr = spacetime().timezones[tz].dst
    let change = getDstChange(dstStr)
    //create an object 2mins after
    let after = spacetime(change, tz)
    // create a time 2hrs before a dst change
    change.hour -= 2
    let before = spacetime(change, tz)
    // start rolling towards the dst shift (but don't hit it)
    for (let i = 0; i < 12; i += 1) {
      let time = before.time()
      // console.log(before.format('{time} {nice}'), before.timezone().current.isDST)
      t.equal(before.isBefore(after), true, time + ' before-change ' + tz)
      t.equal(before.timezone().current.isDST, true, time + ' dst-on ' + tz)
      before = before.add(10, 'minutes')
    }
    for (let i = 0; i < 14; i += 1) {
      let time = before.time()
      t.equal(before.timezone().current.isDST, false, time + ' dst-now-off ' + tz)
      before = before.add(10, 'minutes')
    }
  })

  t.end()
})
