'use strict';
let o = {
  millisecond: 1
};
o.second = o.millisecond * 1000;
o.minute = o.second * 60;
o.hour = o.minute * 60;
o.day = o.hour * 24;
o.week = o.day * 7;

//add plurals
Object.keys(o).forEach((k) => {
  o[k + 's'] = o[k];
});
module.exports = o;
