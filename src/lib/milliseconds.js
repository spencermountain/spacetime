'use strict';
let o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e+6;
o.day = 8.64e+7;
o.week = 6.048e+8;
o.year = 3.154e+10; //TODO:support leaps
//add plurals
Object.keys(o).forEach((k) => {
  o[k + 's'] = o[k];
});
module.exports = o;
