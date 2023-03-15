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


  // this one is tricky!
  day: function (input, fwd) {
    const { epoch, tz, world } = this
    const { getDay, getCal } = world.methods
    let cal = world.methods.getCal(epoch, tz, world)
    if (input !== undefined) {
      let day = getDay(cal.year, cal.month, cal.date)
      if (day === input) {
        return cal
      }
      let diff = input - day
      // go in a specific direction
      if (diff < 0 && fwd === true) {
        diff = 7 + diff
      } else if (diff > 0 && fwd === false) {
        diff = diff - 7
      }
      return tick(cal, diff, 'date')
    }
    return world.methods.getDay(cal)
  },
  // wednesday/friday
  dayName: function (input) {
    const { world } = this
    if (input !== undefined) { }
    let n = this.day()
    return world.model.days[n].longForm
  },
  monthName: function (input) {
    const { world } = this
    if (input !== undefined) { }
    let n = this.month()
    return world.model.months[n].longForm
  },
  week: function (input) {
    if (input !== undefined) {
      return setter.week(this, input)
    }
    return getter.week(this)
  },

  dayOfYear: function (input) {
    if (input !== undefined) {
      let s = this.startOf('year')
      return s.add(input, 'day')
    }
    return getter.dayOfYear(this)
  },
  daysInMonth: function () {
    const monthLen = this.world.methods.monthLen
    return monthLen(this.month(), this.year(), this.world)
  },
  isLeapYear: function () {
    const isLeapYear = this.methods.isLeapYear
    return isLeapYear(this.year())
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