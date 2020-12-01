// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
const ms = require('../../data/milliseconds')
const months = require('../../data/months')
const monthLength = require('../../data/monthLengths')
const walkTo = require('./walk')
const isLeapYear = require('../../fns').isLeapYear

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

module.exports = {
  milliseconds: (s, n) => {
    n = validate(n)
    let current = s.millisecond()
    let diff = current - n //milliseconds to shift by
    return s.epoch - diff
  },

  seconds: (s, n) => {
    n = validate(n)
    let diff = s.second() - n
    let shift = diff * ms.second
    return s.epoch - shift
  },

  minutes: (s, n) => {
    n = validate(n)
    let old = s.clone()
    let diff = s.minute() - n
    let shift = diff * ms.minute
    s.epoch -= shift
    // check against a screw-up
    // if (old.hour() != s.hour()) {
    //   walkTo(old, {
    //     minute: n
    //   })
    //   return old.epoch
    // }
    confirm(s, old, 'second')
    return s.epoch
  },

  hours: (s, n) => {
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
    return s.epoch
  },

  //support setting time by '4:25pm' - this isn't very-well developed..
  time: (s, str) => {
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
    s = s.hour(hour)
    s = s.minute(minute)
    s = s.second(sec)
    s = s.millisecond(0)
    return s.epoch
  },

  date: (s, n) => {
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
    walkTo(s, {
      date: n
    })
    return s.epoch
  },

  //this one's tricky
  month: (s, n) => {
    if (typeof n === 'string') {
      n = months.mapping()[n.toLowerCase()]
    }
    n = validate(n)
    //don't go past december
    if (n >= 12) {
      n = 11
    }
    if (n <= 0) {
      n = 0
    }

    let date = s.date()
    //there's no 30th of february, etc.
    if (date > monthLength[n]) {
      //make it as close as we can..
      date = monthLength[n]
    }
    walkTo(s, {
      month: n,
      date
    })
    return s.epoch
  },

  year: (s, n) => {
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
  },

  dayOfYear: (s, n) => {
    n = validate(n)
    let old = s.clone()
    n -= 1 //days are 1-based
    if (n <= 0) {
      n = 0
    } else if (n >= 365) {
      n = 364
    }
    s = s.startOf('year')
    s = s.add(n, 'day')
    confirm(s, old, 'hour')
    return s.epoch
  }
}
