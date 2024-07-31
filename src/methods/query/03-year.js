/* eslint-disable no-console */
import { dayOfYear as _dayOfYear, week as _week, month as _month, year as _year } from '../set/set.js'
import { long } from '../../data/months.js'
import quarters from '../../data/quarters.js'
import seasons from '../../data/seasons.js'
import ms from '../../data/milliseconds.js'

const clearMinutes = (s) => {
  s = s.minute(0)
  s = s.second(0)
  s = s.millisecond(1)
  return s
}

const methods = {
  // day 0-366
  dayOfYear: function (num, goFwd) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = _dayOfYear(s, num, goFwd)
      return s
    }
    //days since newyears - jan 1st is 1, jan 2nd is 2...
    let sum = 0
    let month = this.d.getMonth()
    let tmp
    //count the num days in each month
    for (let i = 1; i <= month; i++) {
      tmp = new Date()
      tmp.setDate(1)
      tmp.setFullYear(this.d.getFullYear()) //the year matters, because leap-years
      tmp.setHours(1)
      tmp.setMinutes(1)
      tmp.setMonth(i)
      tmp.setHours(-2) //the last day of the month
      sum += tmp.getDate()
    }
    return sum + this.d.getDate()
  },

  //since the start of the year
  week: function (num, goFwd) {
    // week-setter
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = _week(this, num, goFwd)
      s = clearMinutes(s)
      return s
    }
    //find-out which week it is
    let tmp = this.clone()
    tmp = tmp.month(0)
    tmp = tmp.date(1)
    tmp = clearMinutes(tmp)
    tmp = tmp.day('monday')
    //don't go into last-year
    if (tmp.month() === 11 && tmp.date() >= 25) {
      tmp = tmp.add(1, 'week')
    }

    // is first monday the 1st?
    let toAdd = 1
    if (tmp.date() === 1) {
      toAdd = 0
    }
    tmp = tmp.minus(1, 'second')
    const thisOne = this.epoch
    //if the week technically hasn't started yet
    if (tmp.epoch > thisOne) {
      return 1
    }
    //speed it up, if we can
    let i = 0
    let skipWeeks = this.month() * 4
    // console.log(ms.week+ " "+ skipWeeks);
    tmp.epoch += ms.week * skipWeeks
    i += skipWeeks
    for (; i <= 52; i++) {
      if (tmp.epoch > thisOne) {
        return i + toAdd
      }
      tmp = tmp.add(1, 'week')
    }
    return 52
  },
  //either name or number
  month: function (input, goFwd) {
    if (input !== undefined) {
      let s = this.clone()
      s.epoch = _month(s, input, goFwd)
      return s
    }
    return this.d.getMonth()
  },
  //'january'
  monthName: function (input, goFwd) {
    if (input !== undefined) {
      let s = this.clone()
      s = s.month(input, goFwd)
      return s
    }
    return long()[this.month()]
  },

  //q1, q2, q3, q4
  quarter: function (num, goFwd) {
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '')
        num = parseInt(num, 10)
      }
      if (quarters[num]) {
        let s = this.clone()
        let month = quarters[num][0]
        s = s.month(month, goFwd)
        s = s.date(1, goFwd)
        s = s.startOf('day')
        return s
      }
    }
    let month = this.d.getMonth()
    for (let i = 1; i < quarters.length; i++) {
      if (month < quarters[i][0]) {
        return i - 1
      }
    }
    return 4
  },

  //spring, summer, winter, fall
  season: function (input, goFwd) {
    let hem = 'north'
    if (this.hemisphere() === 'South') {
      hem = 'south'
    }
    if (input !== undefined) {    // setter
      let s = this.clone()
      for (let i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          s = s.month(seasons[hem][i][1], goFwd)
          s = s.date(1)
          s = s.startOf('day')
        }
      }
      return s
    }
    let month = this.d.getMonth()
    for (let i = 0; i < seasons[hem].length - 1; i++) {
      if (month >= seasons[hem][i][1] && month < seasons[hem][i + 1][1]) {
        return seasons[hem][i][0]
      }
    }
    return hem === 'north' ? 'winter' : 'summer'
  },

  //the year number
  year: function (num) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = _year(s, num)
      return s
    }
    return this.d.getFullYear()
  },

  //bc/ad years
  era: function (str) {
    if (str !== undefined) {
      let s = this.clone()
      str = str.toLowerCase()
      //TODO: there is no year-0AD i think. may have off-by-1 error here
      let year = s.d.getFullYear()
      //make '1992' into 1992bc..
      if (str === 'bc' && year > 0) {
        s.epoch = _year(s, year * -1)
      }
      //make '1992bc' into '1992'
      if (str === 'ad' && year < 0) {
        s.epoch = _year(s, year * -1)
      }
      return s
    }
    if (this.d.getFullYear() < 0) {
      return 'BC'
    }
    return 'AD'
  },

  // 2019 -> 2010
  decade: function (input) {
    if (input !== undefined) {
      input = String(input)
      input = input.replace(/([0-9])'?s$/, '$1') //1950's
      input = input.replace(/([0-9])(th|rd|st|nd)/, '$1') //fix ordinals
      if (!input) {
        console.warn('Spacetime: Invalid decade input')
        return this
      }
      // assume 20th century?? for '70s'.
      if (input.length === 2 && /[0-9][0-9]/.test(input)) {
        input = '19' + input
      }
      let year = Number(input)
      if (isNaN(year)) {
        return this
      }
      // round it down to the decade
      year = Math.floor(year / 10) * 10
      return this.year(year) //.startOf('decade')
    }
    return this.startOf('decade').year()
  },
  // 1950 -> 19+1
  century: function (input) {
    if (input !== undefined) {
      if (typeof input === 'string') {
        input = input.replace(/([0-9])(th|rd|st|nd)/, '$1') //fix ordinals
        input = input.replace(/([0-9]+) ?(b\.?c\.?|a\.?d\.?)/i, (a, b, c) => {
          if (c.match(/b\.?c\.?/i)) {
            b = '-' + b
          }
          return b
        })
        input = input.replace(/c$/, '') //20thC
      }
      let year = Number(input)
      if (isNaN(input)) {
        console.warn('Spacetime: Invalid century input')
        return this
      }
      // there is no century 0
      if (year === 0) {
        year = 1
      }
      if (year >= 0) {
        year = (year - 1) * 100
      } else {
        year = (year + 1) * 100
      }
      return this.year(year)
    }
    // century getter
    let num = this.startOf('century').year()
    num = Math.floor(num / 100)
    if (num < 0) {
      return num - 1
    }
    return num + 1
  },
  // 2019 -> 2+1
  millenium: function (input) {
    if (input !== undefined) {
      if (typeof input === 'string') {
        input = input.replace(/([0-9])(th|rd|st|nd)/, '$1') //fix ordinals
        input = Number(input)
        if (isNaN(input)) {
          console.warn('Spacetime: Invalid millenium input')
          return this
        }
      }
      if (input > 0) {
        input -= 1
      }
      let year = input * 1000
      // there is no year 0
      if (year === 0) {
        year = 1
      }
      return this.year(year)
    }
    // get the current millenium
    let num = Math.floor(this.year() / 1000)
    if (num >= 0) {
      num += 1
    }
    return num
  }
}
export default methods
