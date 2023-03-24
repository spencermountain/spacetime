import toAscii from './out/toAscii.js'
import toUnicode from './out/toUnicode.js'


const makeMonth = function (s) {
  let d = s.startOf('month').startOf('week')
  let days = []
  // couple weeks
  for (let n = 0; n <= 6; n += 1) {
    let week = []
    // don't start a new week in a new month
    if (n > 0 && !d.isSame('month', s)) {
      break
    }
    // 7 days
    for (let i = 0; i < 7; i += 1) {
      d = d.add(1, 'day')
      week.push(d)
    }
    days.push(week)
  }
  return days
}

class Calendar {
  constructor(s) {
    Object.defineProperty(this, 's', { value: s })
    Object.defineProperty(this, 'days', { value: makeMonth(s) })
  }
  json(opts) {
    opts = opts || {}
    opts.dst = false
    return this.days.map(week => {
      return week.map(d => {
        let obj = d.json(opts)

        return obj
      })
    })
  }
  toUnicode() {
    return toUnicode(this.days)
  }
  toAscii() {
    return toAscii(this.days)
  }
}


export default {

  // create a month calendar
  calendar: function () {
    return new Calendar(this)
  }
}