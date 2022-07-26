let zones = {

  // the second Sunday of March -> first Sunday of November
  // (From 1987 to 2006)
  usa: {
    start: {
      day: 'sunday',
      num: 2,
      month: 'mar',
      hour: 2
    },
    end: {
      day: 'sunday',
      num: 1,
      month: 'nov',
      hour: 2
    }
  },

  // European Union zone
  // last Sunday in March -> the last Sunday in October.
  eu1: {
    start: {
      day: 'sunday',
      num: 'last',
      month: 'mar',
      hour: 1
    },
    end: {
      day: 'sunday',
      num: 'last',
      month: 'oct',
      hour: 2
    }
  },

  // australia
  // first Sunday in April -> first Sunday in October
  aus: {
    start: {
      day: 'sunday',
      num: 1,
      month: 'apr',
      hour: 3
    },
    end: {
      day: 'sunday',
      num: 1,
      month: 'oct',
      hour: 2
    }
  },

  // mexico
  // First Sunday in April -> Last Sunday in October
  mexico: {
    start: {
      day: 'sunday',
      num: 1,
      month: 'apr',
      hour: 2
    },
    end: {
      day: 'sunday',
      num: 'last',
      month: 'oct',
      hour: 2
    }
  },
  // new Zealand, antarctica 
  // Last Sunday in September -> First Sunday in April
  nz: {
    start: {
      day: 'sunday',
      num: 'last',
      month: 'sep',
      hour: 3
    },
    end: {
      day: 'sunday',
      num: 1,
      month: 'apr',
      hour: 2
    }
  },
  //palestine
  pal: {
    start: {
      day: 'sunday',
      num: 'last',
      month: 'mar',
      hour: 0
    },
    end: {
      day: 'friday',
      num: 'last',
      month: 'oct',
      hour: 1
    }
  },
  // paraguay
  // _ Sunday in March -> _ Sunday in October
  par: {
    start: {
      day: 'sunday',
      num: 'last',
      month: 'mar',
      hour: 0
    },
    end: {
      day: 'sunday',
      num: 1,
      month: 'oct',
      hour: 0
    },
  },
  green: {
    start: {
      day: 'saturday',
      num: 'last',
      month: 'mar',
      hour: 22
    },
    end: {
      day: 'saturday',
      num: 'last',
      month: 'oct',
      hour: 23
    }
  },
  //cuba
  //Second Sunday in March -> first Sunday of november
  cuba: {
    start: {
      day: 'sunday',
      num: 2,
      month: 'mar',
      hour: 0
    },
    end: {
      day: 'sunday',
      num: 1,
      month: 'nov',
      hour: 1
    },
  },
  //chile
  chile: {
    start: {
      day: 'sunday',
      num: 1,
      month: 'apr',
      hour: 0
    },
    end: {
      day: 'sunday',
      num: 1,
      month: 'sep',
      hour: 0
    },
  },
}
// add different EU starting hours
//(greenland)
zones.eu0 = {
  start: Object.assign({}, zones.eu1.start, { hour: 0 }),
  end: Object.assign({}, zones.eu1.end, { hour: 1 }),
}
zones.eu2 = {
  start: Object.assign({}, zones.eu1.start, { hour: 2 }),
  end: Object.assign({}, zones.eu1.end, { hour: 3 }),
}
zones.eu3 = {
  start: Object.assign({}, zones.eu1.start, { hour: 3 }),
  end: Object.assign({}, zones.eu1.end, { hour: 4 }),
}

export default zones