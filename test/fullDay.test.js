const test = require('tape')
const spacetime = require('./lib')

const right = [
  'Europe/Zurich', //+1
  'Europe/Athens', //+2
  'Europe/Volgograd', //3
  'Indian/Reunion', //4
  'Etc/GMT-5', //5
  'Asia/Dhaka', //6
  'Asia/Phnom_Penh', //7
  'Australia/West', //8
  'Asia/Tokyo', //9
  'Pacific/Saipan', //10
  'Pacific/Kosrae', //11
  'Pacific/Fiji' //12
]
// 'Europe/London', //0
const left = [
  'Atlantic/Cape_Verde', //-1
  'Brazil/DeNoronha', //-2
  'America/Araguaina', //-3
  'America/Campo_Grande', //-4
  'America/Havana', //-5
  'America/Guatemala', //-6
  'America/Dawson_Creek', //-7
  'Pacific/Pitcairn', //-8
  'Etc/GMT+9', //-9
  'America/Adak', //-10
  'Pacific/Pago_Pago', //-11
  'Etc/GMT+12' //-12
]

test('test-date-line-at-180deg', (t) => {
  let s = spacetime([2018, 2, 5, 0, 0, 0, 0], 'Europe/London')
  s = s.startOf('day')
  t.equal(s.time(), '12:00am', 'the first millisecond of the day')
  t.equal(s.timezone().current.offset, 0, 'start at 0 offset')
  //everything to the right is today
  right.forEach((timezone) => {
    let d = s.clone()
    d = d.goto(timezone)
    t.equal(d.date(), 5, timezone + ' is today')
  })
  //everything to the left is yesterday
  left.forEach((timezone) => {
    let d = s.clone()
    d = d.goto(timezone)
    t.equal(d.date(), 4, timezone + ' is yesterday')
  })
  t.end()
})

test('test-date-line-at-0deg', (t) => {
  let s = spacetime([2018, 2, 5, 0, 0, 0, 0], 'Europe/London')
  s = s.endOf('day')
  t.equal(s.time(), '11:59pm', 'the last millisecond of the day')
  t.equal(s.timezone().current.offset, 0, 'start at 0 offset')
  //everything to the right is tomorrow
  right.forEach((timezone) => {
    let d = s.clone()
    d = d.goto(timezone)
    t.equal(d.date(), 6, timezone + ' is tomorrow')
  })
  //everything to the left is today
  left.forEach((timezone) => {
    let d = s.clone()
    d = d.goto(timezone)
    t.equal(d.date(), 5, timezone + ' is today')
  })
  t.end()
})

test('never cross the intl dateline moving right', (t) => {
  for (let h = 0; h < 24; h++) {
    //h ocklock on right side of the map
    let rightSide = spacetime([2022, 8, 24, h, 1], 'Pacific/Fiji')
    let time = h + ':01'
    t.equal(rightSide.format('time-24'), time, 'time is ' + time)
    t.equal(rightSide.date(), 24, 'date is 24th')
    //try move across dateline (to left side of the map)
    let leftSide = rightSide.clone().goto('Pacific/Midway')
    t.ok(leftSide.epoch === rightSide.epoch, 'we never actually moved')
    //but...
    if (leftSide.date() === rightSide.date()) {
      t.ok(leftSide.hour() < rightSide.hour(), '.. but hour moved backward')
    } else {
      t.ok(leftSide.date() + 1 === rightSide.date(), '..but date moved backward')
      t.ok(leftSide.hour() > rightSide.hour(), '..and hour moved < 24')
    }
  }
  t.end()
})

test('never cross the intl dateline moving left', (t) => {
  for (let h = 0; h < 24; h++) {
    //h ocklock on right side of the map
    let rightSide = spacetime([2022, 8, 24, h, 1], 'Pacific/Midway')
    let time = h + ':01'
    t.equal(rightSide.format('time-24'), time, 'time is ' + time)
    t.equal(rightSide.date(), 24, 'date is 24th')
    //try move across dateline (to left side of the map)
    let leftSide = rightSide.clone().goto('Pacific/Fiji')
    t.ok(leftSide.epoch === rightSide.epoch, 'we never actually moved')
    //but...
    if (leftSide.date() === rightSide.date()) {
      t.ok(leftSide.hour() > rightSide.hour(), '.. but hour moved forward')
    } else {
      t.ok(leftSide.date() - 1 === rightSide.date(), '..but date moved forward')
      t.ok(leftSide.hour() <= rightSide.hour(), '..and hour moved < 24')
    }
  }
  t.end()
})
