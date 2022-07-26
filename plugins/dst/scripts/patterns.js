let zones = {

  // the second Sunday of March -> first Sunday of November
  // (From 1987 to 2006)
  northAmerica: {
    start: {
      day: 'sunday',
      num: 2,
      month: 'march',
      hour: 2
    },
    end: {
      day: 'sunday',
      num: 1,
      month: 'november',
      hour: 2
    }
  },

  // European Union zone
  // last Sunday in March -> the last Sunday in October.
  eu1: {
    start: {
      day: 'sunday',
      num: 'last',
      month: 'march',
      hour: 1
    },
    end: {
      day: 'sunday',
      num: 'last',
      month: 'october',
      hour: 2
    }
  },

  // australia
  // first Sunday in April -> first Sunday in October
  aus: {
    start: {
      day: 'sunday',
      num: 1,
      month: 'april',
      hour: 3
    },
    end: {
      day: 'sunday',
      num: 1,
      month: 'october',
      hour: 2
    }
  },

  // mexico
  // First Sunday in April -> Last Sunday in October
  mexico: {
    start: {
      day: 'sunday',
      num: 1,
      month: 'april',
      hour: 2
    },
    end: {
      day: 'sunday',
      num: 'last',
      month: 'october',
      hour: 2
    }
  },
}
// add different EU starting hours
zones.eu2 = {
  start: Object.assign({}, zones.eu1.start, { hour: 2 }),
  end: Object.assign({}, zones.eu1.end, { hour: 3 }),
}
zones.eu3 = {
  start: Object.assign({}, zones.eu1.start, { hour: 3 }),
  end: Object.assign({}, zones.eu1.end, { hour: 4 }),
}

export default zones