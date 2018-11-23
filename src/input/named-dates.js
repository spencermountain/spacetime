'use strict';
const dates = {
  now: (s) => {
    s.epoch = Date.now();
    return s
  },
  tonight: (s) => {
    s.epoch = Date.now();
    s.hour(18)
    return s
  },
  today: (s) => {
    s.epoch = Date.now();
    return s
  },
  tomorrow: (s) => {
    s.epoch = Date.now();
    s.add(1, 'day')
    s.startOf('day')
    return s
  },
  yesterday: (s) => {
    s.epoch = Date.now();
    s.subtract(1, 'day')
    s.startOf('day')
    return s
  },
  christmas: (s) => {
    let year = new Date().getFullYear()
    s.set([year, 11, 25, 18, 0, 0]) // Dec 25
    return s
  },
  'new years': (s) => {
    let year = new Date().getFullYear()
    s.set([year, 11, 31, 18, 0, 0]) // Dec 31
    return s
  },
}
dates['new years eve'] = dates['new years']
module.exports = dates
