let getter = {
  year: (cal) => cal.year,
  month: (cal) => cal.month - 1,//javascript uses 0-based months!
  date: (cal) => cal.date,//1-based dates!
  hour: (cal) => cal.hour,
  minute: (cal) => cal.minute,
  second: (cal) => cal.second,
  millisecond: (cal) => cal.millisecond,
  ampm: (cal) => cal.hour < 12 ? 'am' : 'pm',
  decade: (cal) => Math.floor(cal.year / 10) * 10,//  eg '1970'
  century: (cal) => Math.floor(cal.year / 100) * 100,//  eg '1900'
  millenium: (cal) => {
    let num = Math.floor(cal.year / 1000)
    return num >= 0 ? num + 1 : num// millenia are 1-based, in AD
  },
  // offset: (cal) => cal.offset * 60,
  era: (cal) => cal.year < 0 ? 'BC' : 'AD',
  quarter: (cal) => {
    let m = cal.month
    if (m < 3) {
      return 1
    } else if (m < 6) {
      return 2
    } else if (m < 9) {
      return 3
    }
    return 4
  },
  season: (cal) => { },
  dayTime: (cal) => { },
  hour12: (cal) => {
    let hour = cal.hour
    if (hour > 12) {
      return hour - 12
    }
    if (hour === 0) {
      return 12
    }
    return hour
  },
  hourFloat: (cal) => {
    let minute = cal.minute
    minute = minute / 60
    return cal.hour + minute
  }
}

export default getter