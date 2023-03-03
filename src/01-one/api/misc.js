import monthLen from '../compute/_lib/monthLen.js'
import isLeap from '../compute/_lib/isLeap.js'


const getter = {
  week: (s) => {
    let start = s.startOf('year').startOf('week')
    return start.diff(s, 'week')
  },
  dayOfYear: (s) => {
    let start = s.startOf('year')
    return start.diff(s, 'day')
  }
}

const setter = {
  week: (s, input) => {
    let d = s.startOf('year').startOf('week')
    return d.add(input, 'week')
  },
  dayOfYear: (s, input) => {
    let d = s.startOf('year')
    return d.add(input, 'day')
  }
}

export default {
  week: function (input) {
    if (input !== undefined) {
      return setter.week(this, input)
    }
    return getter.week(this)
  },

  dayOfYear: function (input) {
    if (input !== undefined) {
      return setter.dayOfYear(this, input)
    }
    return getter.dayOfYear(this)
  },
  daysInMonth: function () {
    return monthLen(this.month() + 1, this.year())
  },
  isLeapYear: function () {
    return isLeap(this.year())
  },
  timezone: function () {
    return {
      name: this.tz,
      // hasDst: true,
      // default_offset: -4,
      // hemisphere: 'North',
      // current: { offset: -5, isDST: false },
      // change: { start: '03/12:02', back: '11/05:02' }
    }
  }
}