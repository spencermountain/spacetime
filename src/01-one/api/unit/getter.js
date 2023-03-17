const getCal = (s) => {
  return s.world.methods.getCal(s.epoch, s.tz, s.world)
}

let getter = {
  year: (s) => getCal(s).year,
  month: (s) => getCal(s).month,
  date: (s) => getCal(s).date,
  hour: (s) => getCal(s).hour,
  minute: (s) => getCal(s).minute,
  second: (s) => getCal(s).second,
  millisecond: (s) => getCal(s).millisecond,
  ampm: (s) => getCal(s).hour < 12 ? 'am' : 'pm',
  decade: (s) => Math.floor(getCal(s).year / 10) * 10,//  eg '1970'
  century: (s) => Math.floor(getCal(s).year / 100) * 100,//  eg '1900'
  millenium: (s) => {
    let num = Math.floor(getCal(s).year / 1000)
    return num >= 0 ? num + 1 : num// millenia are 1-based, in AD
  },
  era: (s) => getCal(s).year < 0 ? 'BC' : 'AD',
  quarter: (s) => {
    let m = getCal(s).month
    if (m < 3) {
      return 1
    } else if (m < 6) {
      return 2
    } else if (m < 9) {
      return 3
    }
    return 4
  },
  hour12: (s) => {
    let h = getCal(s).hour
    if (h > 12) {
      return h - 12
    }
    if (h === 0) {
      return 12
    }
    return h
  },
  hourFloat: (s) => {
    let { minute, hour } = getCal(s)
    return hour + (minute / 60)
  },
  offset: (s) => s.world.methods.getCal(s.epoch, s.tz, s.world).offset,
  monthName: s => s.world.model.months[s.month()].longForm,
  time: s => s.format('time')
}

// console.log(Object.keys(getter))
export default getter