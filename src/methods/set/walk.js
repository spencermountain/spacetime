/* eslint-disable no-console */
import ms from '../../data/milliseconds.js'

//basically, step-forward/backward until js Date object says we're there.
const walk = (s, n, fn, unit, previous) => {
  let current = s.d[fn]()
  if (current === n) {
    return //already there
  }
  let startUnit = previous === null ? null : s.d[previous]()
  let original = s.epoch
  //try to get it as close as we can
  let diff = n - current
  s.epoch += ms[unit] * diff
  //DST edge-case: if we are going many days, be a little conservative
  // console.log(unit, diff)
  if (unit === 'day') {
    // s.epoch -= ms.minute
    //but don't push it over a month
    if (Math.abs(diff) > 28 && n < 28) {
      s.epoch += ms.hour
    }
  }
  // 1st time: oops, did we change previous unit? revert it.
  if (previous !== null && startUnit !== s.d[previous]()) {
    // console.warn('spacetime warning: missed setting ' + unit)
    s.epoch = original
    // s.epoch += ms[unit] * diff * 0.89 // maybe try and make it close...?
  }
  //repair it if we've gone too far or something
  //(go by half-steps, just in case)
  const halfStep = ms[unit] / 2
  while (s.d[fn]() < n) {
    s.epoch += halfStep
  }

  while (s.d[fn]() > n) {
    s.epoch -= halfStep
  }
  // 2nd time: did we change previous unit? revert it.
  if (previous !== null && startUnit !== s.d[previous]()) {
    // console.warn('spacetime warning: missed setting ' + unit)
    s.epoch = original
  }
}
//find the desired date by a increment/check while loop
const units = {
  year: {
    valid: (n) => n > -4000 && n < 4000,
    walkTo: (s, n) => walk(s, n, 'getFullYear', 'year', null)
  },
  month: {
    valid: (n) => n >= 0 && n <= 11,
    walkTo: (s, n) => {
      let d = s.d
      let current = d.getMonth()
      let original = s.epoch
      let startUnit = d.getFullYear()
      if (current === n) {
        return
      }
      //try to get it as close as we can..
      let diff = n - current
      s.epoch += ms.day * (diff * 28) //special case
      //oops, did we change the year? revert it.
      if (startUnit !== s.d.getFullYear()) {
        s.epoch = original
      }
      //increment by day
      while (s.d.getMonth() < n) {
        s.epoch += ms.day
      }
      while (s.d.getMonth() > n) {
        s.epoch -= ms.day
      }
    }
  },
  date: {
    valid: (n) => n > 0 && n <= 31,
    walkTo: (s, n) => walk(s, n, 'getDate', 'day', 'getMonth')
  },
  hour: {
    valid: (n) => n >= 0 && n < 24,
    walkTo: (s, n) => walk(s, n, 'getHours', 'hour', 'getDate')
  },
  minute: {
    valid: (n) => n >= 0 && n < 60,
    walkTo: (s, n) => walk(s, n, 'getMinutes', 'minute', 'getHours')
  },
  second: {
    valid: (n) => n >= 0 && n < 60,
    walkTo: (s, n) => {
      //do this one directly
      s.epoch = s.seconds(n).epoch
    }
  },
  millisecond: {
    valid: (n) => n >= 0 && n < 1000,
    walkTo: (s, n) => {
      //do this one directly
      s.epoch = s.milliseconds(n).epoch
    }
  }
}

const walkTo = (s, wants) => {
  let keys = Object.keys(units)
  let old = s.clone()
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i]
    let n = wants[k]
    if (n === undefined) {
      n = old[k]()
    }
    if (typeof n === 'string') {
      n = parseInt(n, 10)
    }
    //make-sure it's valid
    if (!units[k].valid(n)) {
      s.epoch = null
      if (s.silent === false) {
        console.warn('invalid ' + k + ': ' + n)
      }
      return
    }
    units[k].walkTo(s, n)
  }
  return
}

export default walkTo
