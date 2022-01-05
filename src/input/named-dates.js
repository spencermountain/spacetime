// pull in 'today' data for the baseline moment
const getNow = function (s) {
  s.epoch = Date.now()
  Object.keys(s._today || {}).forEach((k) => {
    if (typeof s[k] === 'function') {
      s = s[k](s._today[k])
    }
  })
  return s
}

const dates = {
  now: (s) => {
    return getNow(s)
  },
  today: (s) => {
    return getNow(s)
  },
  tonight: (s) => {
    s = getNow(s)
    s = s.hour(18) //6pm
    return s
  },
  tomorrow: (s) => {
    s = getNow(s)
    s = s.add(1, 'day')
    s = s.startOf('day')
    return s
  },
  yesterday: (s) => {
    s = getNow(s)
    s = s.subtract(1, 'day')
    s = s.startOf('day')
    return s
  },
  christmas: (s) => {
    let year = getNow(s).year()
    s = s.set([year, 11, 25, 18, 0, 0]) // Dec 25
    return s
  },
  'new years': (s) => {
    let year = getNow(s).year()
    s = s.set([year, 11, 31, 18, 0, 0]) // Dec 31
    return s
  }
}
dates['new years eve'] = dates['new years']
export default dates
