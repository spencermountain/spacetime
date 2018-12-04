'use strict'
//round to either current, or +1 of this unit
const nearest = function(s, unit) {
  unit = unit.toLowerCase();
  unit = unit.replace(/s$/, ''); //singular form...
  let prog = s.progress();
  if (prog[unit] !== undefined) {
    if (prog[unit] > 0.5) {
      s = s.add(1, unit);
    }
    s = s.startOf(unit);
  } else if (s.silent === false) {
    console.warn("no known unit '" + unit + "'");
  }
  return s;
};
module.exports = nearest;
