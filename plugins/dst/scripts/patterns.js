let zones = {

  // the second Sunday of March -> first Sunday of November
  // (From 1987 to 2006)
  usa: '2nd-sun-mar-2h|1st-sun-nov-2h',

  // European Union zone
  // last Sunday in March -> the last Sunday in October.
  eu0: 'last-sun-mar-0h|last-sun-oct-1h',
  eu1: 'last-sun-mar-1h|last-sun-oct-2h',
  eu2: 'last-sun-mar-2h|last-sun-oct-3h',
  eu3: 'last-sun-mar-3h|last-sun-oct-4h',

  // australia
  // first Sunday in April -> first Sunday in October
  aus: '1st-sun-apr-3h|1st-sun-oct-2h',
  //lord howe australia
  lhow: '1st-sun-apr-2h|1st-sun-oct-2h',
  // new zealand
  chat: '1st-sun-apr-3.45h|1st-sun-oct-2.45h',


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

  // lebanon
  leb: 'last-sun-mar-0h|last-sun-oct-1h',

  // syria
  syr: 'last-fri-mar-0h|last-fri-oct-0h',

  //israel
  isr: 'last-fri-mar-2h|last-sun-oct-2h',
  // iran
  //appears to be hardcoded for mar-22 & sep 22
  // (ending this year)

  // chile
  //easter island
  east: '1st-sat-apr-22h|1st-sat-sep-22h',
  //fiji
  fiji: '2nd-sun-jan-3h|2nd-sun-nov-2h'

}


export default zones