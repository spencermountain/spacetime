'use strict'
//how far it is along, from 0-1
const progress = s => {
  const units = [
    'year',
    'season',
    'quarter',
    'month',
    'week',
    'day',
    'quarterHour',
    'hour',
    'minute'
  ]
  let obj = {}
  units.forEach(k => {
    let start = s.clone().startOf(k)
    let end = s.clone().endOf(k)
    let duration = end.epoch - start.epoch
    let percent = (s.epoch - start.epoch) / duration
    obj[k] = parseFloat(percent.toFixed(2))
  })
  return obj
}

module.exports = progress
