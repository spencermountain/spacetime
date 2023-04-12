// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
import ms from '../../data/milliseconds.js'
import { mapping } from '../../data/months.js'
import monthLength from '../../data/monthLengths.js'
import walkTo from './walk.js'
import { isLeapYear } from '../../fns.js'

const validate = (n) => {
  //handle number as a string
  if (typeof n === 'string') {
    n = parseInt(n, 10)
  }
  return n
}

const order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']

//reduce hostile micro-changes when moving dates by millisecond
const confirm = (s, tmp, unit) => {
  let n = order.indexOf(unit)
  let arr = order.slice(n, order.length)
  for (let i = 0; i < arr.length; i++) {
    let want = tmp[arr[i]]()
    s[arr[i]](want)
  }
  return s
}

// allow specifying setter direction
const fwdBkwd = function (s, old, goFwd, unit) {
  if (goFwd === true && s.isBefore(old)) {
    s = s.add(1, unit)
  } else if (goFwd === false && s.isAfter(old)) {
    s = s.minus(1, unit)
  }
  return s
}

const milliseconds = function (s, n) {
  n = validate(n)
  let current = s.millisecond()
  let diff = current - n //milliseconds to shift by
  return s.epoch - diff
}

const seconds = function (s, n, goFwd) {
  n = validate(n)
  let old = s.clone()
  let diff = s.second() - n
  let shift = diff * ms.second
  s.epoch = s.epoch - shift
  s = fwdBkwd(s, old, goFwd, 'minute') // specify direction
  return s.epoch
}

const minutes = function (s, n, goFwd) {
  n = validate(n)
  let old = s.clone()
  let diff = s.minute() - n
  let shift = diff * ms.minute
  s.epoch -= shift
  confirm(s, old, 'second')
  s = fwdBkwd(s, old, goFwd, 'hour') // specify direction
  return s.epoch
}

const hours = function (s, n, goFwd) {
  n = validate(n)
  if (n >= 24) {
    n = 24
  } else if (n < 0) {
    n = 0
  }
  let old = s.clone()
  let diff = s.hour() - n
  let shift = diff * ms.hour
  s.epoch -= shift
  // oops, did we change the day?
  if (s.date() !== old.date()) {
    s = old.clone()
    if (diff > 1) {
      diff -= 1
    }
    if (diff < 1) {
      diff += 1
    }
    shift = diff * ms.hour
    s.epoch -= shift
  }
  walkTo(s, {
    hour: n
  })
  confirm(s, old, 'minute')
  s = fwdBkwd(s, old, goFwd, 'day') // specify direction
  return s.epoch
}

const time = function (s, str, goFwd) {
  let m = str.match(/([0-9]{1,2})[:h]([0-9]{1,2})(:[0-9]{1,2})? ?(am|pm)?/)
  if (!m) {
    //fallback to support just '2am'
    m = str.match(/([0-9]{1,2}) ?(am|pm)/)
    if (!m) {
      return s.epoch
    }
    m.splice(2, 0, '0') //add implicit 0 minutes
    m.splice(3, 0, '') //add implicit seconds
  }
  let h24 = false
  let hour = parseInt(m[1], 10)
  let minute = parseInt(m[2], 10)
  if (minute >= 60) {
    minute = 59
  }
  if (hour > 12) {
    h24 = true
  }
  //make the hour into proper 24h time
  if (h24 === false) {
    if (m[4] === 'am' && hour === 12) {
      //12am is midnight
      hour = 0
    }
    if (m[4] === 'pm' && hour < 12) {
      //12pm is noon
      hour += 12
    }
  }
  // handle seconds
  m[3] = m[3] || ''
  m[3] = m[3].replace(/:/, '')
  let sec = parseInt(m[3], 10) || 0
  let old = s.clone()
  s = s.hour(hour)
  s = s.minute(minute)
  s = s.second(sec)
  s = s.millisecond(0)
  s = fwdBkwd(s, old, goFwd, 'day') // specify direction
  return s.epoch
}

const date = function (s, n, goFwd) {
  n = validate(n)
  //avoid setting february 31st
  if (n > 28) {
    let month = s.month()
    let max = monthLength[month]
    // support leap day in february
    if (month === 1 && n === 29 && isLeapYear(s.year())) {
      max = 29
    }
    if (n > max) {
      n = max
    }
  }
  //avoid setting < 0
  if (n <= 0) {
    n = 1
  }
  let old = s.clone()
  walkTo(s, {
    date: n
  })
  s = fwdBkwd(s, old, goFwd, 'month') // specify direction
  return s.epoch
}

const month = function (s, n, goFwd) {
  if (typeof n === 'string') {
    if (n === 'sept') {
      n = 'sep'
    }
    n = mapping()[n.toLowerCase()]
  }
  n = validate(n)
  //don't go past december
  if (n >= 12) {
    n = 11
  }
  if (n <= 0) {
    n = 0
  }

  let d = s.date()
  //there's no 30th of february, etc.
  if (d > monthLength[n]) {
    //make it as close as we can..
    d = monthLength[n]
  }
  let old = s.clone()
  walkTo(s, {
    month: n,
    d
  })
  s = fwdBkwd(s, old, goFwd, 'year') // specify direction
  return s.epoch
}

const year = function (s, n) {
  // support '97
  if (typeof n === 'string' && /^'[0-9]{2}$/.test(n)) {
    n = n.replace(/'/, '').trim()
    n = Number(n)
    // '89 is 1989
    if (n > 30) {
      //change this in 10y
      n = 1900 + n
    } else {
      // '12 is 2012
      n = 2000 + n
    }
  }
  n = validate(n)
  walkTo(s, {
    year: n
  })
  return s.epoch
}

const week = function (s, n, goFwd) {
  let old = s.clone()
  n = validate(n)
  s = s.month(0)
  s = s.date(1)
  s = s.day('monday')
  //first week starts first Thurs in Jan
  // so mon dec 28th is 1st week
  // so mon dec 29th is not the week
  if (s.monthName() === 'december' && s.date() >= 28) {
    s = s.add(1, 'week')
  }
  n -= 1 //1-based
  s = s.add(n, 'weeks')
  s = fwdBkwd(s, old, goFwd, 'year') // specify direction
  return s.epoch
}

const dayOfYear = function (s, n, goFwd) {
  n = validate(n)
  let old = s.clone()
  n -= 1 //days are 1-based
  if (n <= 0) {
    n = 0
  } else if (n >= 365) {
    if (isLeapYear(s.year())) {
      n = 365
    } else {
      n = 364
    }
  }
  s = s.startOf('year')
  s = s.add(n, 'day')
  confirm(s, old, 'hour')
  s = fwdBkwd(s, old, goFwd, 'year') // specify direction
  return s.epoch
}

export {
  milliseconds,
  seconds,
  minutes,
  hours,
  time,
  date,
  month,
  year,
  week,
  dayOfYear,
}
