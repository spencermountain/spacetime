// these are the folk heuristics that timezones use to set their dst change dates
// for example, the US changes:
// the second Sunday of March -> first Sunday of November
// http://www.webexhibits.org/daylightsaving/g.html
let patterns = {
  usa: '2nd-sun-mar-2h|1st-sun-nov-2h',// (From 1987 to 2006)
  // mexico
  mex: '1st-sun-apr-2h|last-sun-oct-2h',

  // European Union zone
  eu0: 'last-sun-mar-0h|last-sun-oct-1h',
  eu1: 'last-sun-mar-1h|last-sun-oct-2h',
  eu2: 'last-sun-mar-2h|last-sun-oct-3h',
  eu3: 'last-sun-mar-3h|last-sun-oct-4h',
  //greenland
  green: 'last-sat-mar-22h|last-sat-oct-23h',

  // australia
  aus: '1st-sun-apr-3h|1st-sun-oct-2h',
  //lord howe australia
  lhow: '1st-sun-apr-2h|1st-sun-oct-2h',
  // new zealand
  chat: '1st-sun-apr-3h|last-sun-sep-2h', //technically 3:45h -> 2:45h
  // new Zealand, antarctica 
  nz: '1st-sun-apr-3h|last-sun-sep-2h',
  // casey - antarctica
  ant: '2nd-sun-mar-0h|1st-sun-oct-0h',
  // troll - antarctica
  troll: '3rd-sun-mar-1h|last-sun-oct-3h',

  //jordan
  jord: 'last-fri-feb-0h|last-fri-oct-1h',
  // lebanon
  leb: 'last-sun-mar-0h|last-sun-oct-0h',
  // syria
  syr: 'last-fri-mar-0h|last-fri-oct-0h',
  //israel
  // Start: Last Friday before April 2 -> The Sunday between Rosh Hashana and Yom Kippur
  isr: 'last-fri-mar-2h|last-sun-oct-2h',
  //palestine
  pal: 'last-sun-mar-0h|last-fri-oct-1h',

  // el aaiun
  //this one seems to be on arabic calendar?
  saha: 'last-sun-mar-3h|1st-sun-may-2h',

  // paraguay
  par: 'last-sun-mar-0h|1st-sun-oct-0h',
  //cuba
  cuba: '2nd-sun-mar-0h|1st-sun-nov-1h',
  //chile
  chile: '1st-sun-apr-0h|1st-sun-sep-0h',
  //easter island
  east: '1st-sat-apr-22h|1st-sat-sep-22h',
  //fiji
  fiji: '3rd-sun-jan-3h|2nd-sun-nov-2h',
}

export default patterns