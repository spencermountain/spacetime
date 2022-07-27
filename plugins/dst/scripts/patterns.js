let zones = {

  // the second Sunday of March -> first Sunday of November
  // (From 1987 to 2006)
  usa: '2nd-sun-mar-2h|1st-sun-nov-2h',

  // European Union zone
  // last Sunday in March -> the last Sunday in October.
  eu1: 'last-sun-mar-1h|last-sun-oct-2h',

  // australia
  // first Sunday in April -> first Sunday in October
  aus: '1st-sun-apr-3h|1st-sun-oct-2h',

  // mexico
  // First Sunday in April -> Last Sunday in October
  mexico: '1st-sun-apr-2h|last-sun-oct-2h',
  // new Zealand, antarctica 
  // Last Sunday in September -> First Sunday in April
  nz: 'last-sun-sep-3h|1st-sun-apr-2h',
  //palestine
  pal: 'last-sun-mar-0h|last-fri-oct-1h',
  // paraguay
  par: 'last-sun-mar-0h|1st-sun-oct-0h',
  //greenland
  green: 'last-sat-mar-22h|last-sat-oct-23h',
  //cuba
  //Second Sunday in March -> first Sunday of november
  cuba: '2nd-sun-mar-0h|1st-sun-nov-1h',
  //chile
  chile: '1st-sun-apr-0h|1st-sun-sep-0h',

  // antarctica
  //casey
  ant: '2nd-sun-mar-0h|1st-sun-oct-0h',
  // troll
  troll: '3rd-sun-mar-1h|last-sun-oct-3h',

  //jordan
  // amman
  jord: 'last-fri-mar-0h|last-fri-oct-1h',

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