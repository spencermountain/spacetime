const set = require('../set/set')
const months = require('../../data/months')
const quarters = require('../../data/quarters')
const seasons = require('../../data/seasons')
const ms = require('../../data/milliseconds')

const clearMinutes = s => {
  s = s.minute(0)
  s = s.second(0)
  s = s.millisecond(1)
  return s
}

const methods = {
  // day 0-366
  dayOfYear: function(num) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = set.dayOfYear(s, num)
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
      tmp.setYear(this.d.getFullYear()) //the year matters, because leap-years
      tmp.setHours(1)
      tmp.setMinutes(1)
      tmp.setMonth(i)
      tmp.setHours(-2) //the last day of the month
      sum += tmp.getDate()
    }
    return sum + this.d.getDate()
  },

  //since the start of the year
  week: function(num) {
    if (num !== undefined) {
      let s = this.clone()
      s = s.month(0)
      s = s.date(1)
      s = s.day('monday')
      s = clearMinutes(s)
      //don't go into last-year
      if (s.monthName() === 'december') {
        s = s.add(1, 'week')
      }
      num -= 1 //1-based
      s = s.add(num, 'weeks')
      return s
    }
    //find-out which week it is
    let tmp = this.clone()
    tmp = tmp.month(0)
    tmp = tmp.date(1)
    tmp = clearMinutes(tmp)
    tmp = tmp.day('monday')
    //don't go into last-year
    if (tmp.monthName() === 'december') {
      tmp = tmp.add(1, 'week')
    }
    const thisOne = this.epoch
    //if the week technically hasn't started yet
    if (tmp.epoch > thisOne) {
      return 1
    }
    //speed it up, if we can
    let i = 0
    let skipWeeks = this.month() * 4
    tmp.epoch += ms.week * skipWeeks
    i += skipWeeks
    for (; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i
      }
      tmp = tmp.add(1, 'week')
    }
    return 52
  },

  //'january'
  monthName: function(input) {
    if (input === undefined) {
      return months.long()[this.month()]
    }
    let s = this.clone()
    s = s.month(input)
    return s
  },

  //q1, q2, q3, q4
  quarter: function(num) {
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '')
        num = parseInt(num, 10)
      }
      if (quarters[num]) {
        let s = this.clone()
        let month = quarters[num][0]
        s = s.month(month)
        s = s.date(1)
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
  season: function(input) {
    let hem = 'north'
    if (this.hemisphere() === 'South') {
      hem = 'south'
    }
    if (input !== undefined) {
      let s = this.clone()
      for (let i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          s = s.month(seasons[hem][i][1])
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
    return 'winter'
  },

  //the year number
  year: function(num) {
    if (num !== undefined) {
      let s = this.clone()
      s.epoch = set.year(s, num)
      return s
    }
    return this.d.getFullYear()
  },

  //bc/ad years
  era: function(str) {
    if (str !== undefined) {
      let s = this.clone()
      str = str.toLowerCase()
      //TODO: there is no year-0AD i think. may have off-by-1 error here
      let year = s.d.getFullYear()
      //make '1992' into 1992bc..
      if (str === 'bc' && year > 0) {
        s.epoch = set.year(s, year * -1)
      }
      //make '1992bc' into '1992'
      if (str === 'ad' && year < 0) {
        s.epoch = set.year(s, year * -1)
      }
      return s
    }
    if (this.d.getFullYear() < 0) {
      return 'BC'
    }
    return 'AD'
  }
}
module.exports = methods
