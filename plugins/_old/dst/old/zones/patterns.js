// (From 1987 to 2006, DST began on the first Sunday in April and ended on the last Sunday of October)
const northAmerica = {
  // the second Sunday of March
  start: {
    day: 'sunday',
    num: 2,
    month: 'march',
    hour: 2
  },
  // first Sunday of November
  end: {
    day: 'sunday',
    num: 1,
    month: 'november',
    hour: 2
  }
}

const eu = {
  // last Sunday in March
  start: {
    day: 'sunday',
    num: 'last',
    month: 'march'
    // hour: ()=>{}
  },
  // the last Sunday in October.
  end: {
    day: 'sunday',
    num: 'last',
    month: 'october'
    // hour: ()=>{}
  }
}

export default {
  northAmerica,
  eu
}
