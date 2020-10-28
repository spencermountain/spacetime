const test = require('tape')
const spacetime = require('./lib')

//local time of fall dst change-over
const getDstChange = (dstChange) => {
  let fall = dstChange.split('->')[1]
  const [month, rest] = fall.split('/')
  let [day, hour] = rest.split(':')
  if (hour === '24') {
    hour = 0
  }
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
    'america/indianapolis',
    'america/tijuana', //11/01:02  -7hrs
    'mexico/bajanorte', //11/01:02  -7hrs
    'america/havana',
    'america/indiana',
    'america/kentucky',
    'america/north_dakota',
    'america/scoresbysund',
    'asia/amman',
    'asia/gaza',
    'asia/hebron',
    'atlantic/azores'

    // not working
    // 'asia/beirut' //10/24:24
    // 'asia/damascus', //10/29:24  3hrs
  ]
  arr.forEach((tz) => {
    // get fall dst change
    let dstStr = spacetime().timezones[tz].dst
    let change = getDstChange(dstStr)
    //create a date 2mins after dst change
    let after = spacetime(change, tz)
    // create a time 2hrs before a dst change (-3hrs)
    let before = after.clone().minus(3, 'hours')
    // start rolling towards the dst shift (but don't hit it)
    for (let i = 0; i < 12; i += 1) {
      let time = before.time()
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
